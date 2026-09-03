import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { C, F, S } from "../theme";

/**
 * Navegação — barra superior.
 *
 * SUBSTITUI o rail lateral flutuante. O que havia antes era um cartão fixo no
 * meio da borda esquerda, com fundo próprio, sombra, `backdrop-filter`, um
 * rótulo "NAVEGAÇÃO" em caixa alta e uma barrinha de progresso com a
 * porcentagem escrita ao lado. Três problemas, e o pedido do Hugo foi o
 * terceiro:
 *
 * 1. Ele cobrava calha do conteúdo. Para não ficar por cima do texto, o CSS
 *    global empurrava TODA seção com `padding-left: 15.5rem !important` — ou
 *    seja, 248px da largura da página existiam para desviar da navegação, e o
 *    conteúdo ficava permanentemente descentralizado.
 * 2. "0%" não é informação que alguém use. Ninguém navega por porcentagem de
 *    rolagem; o número existia porque dava para calculá-lo.
 * 3. Cartão com fundo, borda, sombra e desfoque flutuando sobre o conteúdo é a
 *    assinatura de interface montada por gerador.
 *
 * Aqui o progresso continua, mas como FIO na aresta inferior da própria barra:
 * ocupa zero altura de layout, não pede rótulo e é lido de relance. A seção
 * ativa é marcada por um traço lima que DESLIZA entre os itens — é o único
 * movimento encenado da navegação, e ele existe porque comunica continuidade
 * (você se moveu de um lugar para outro), não porque anima.
 */

const SECOES = [
  { id: "sobre",       label: "Sobre" },
  { id: "servicos",    label: "Entregas" },
  { id: "habilidades", label: "Stack" },
  { id: "projetos",    label: "Projetos" },
  { id: "experiencia", label: "Experiência" },
];

/** Altura da barra. Exportada porque o `scroll-margin-top` das seções precisa
 *  bater com ela — âncora que para atrás da barra fixa é o defeito clássico.
 *  60 -> 78: o cabeçalho inteiro cresceu (fonte do menu, assinatura, cargo);
 *  a barra precisa da altura extra para não apertar o texto maior nela
 *  dentro. `GlobalStyles.tsx` tem o `scroll-margin-top` correspondente
 *  (78 + 16 de folga = 94px) — mudar aqui sem mudar lá volta a esconder o
 *  topo da seção atrás da barra fixa. */
export const ALTURA_BARRA = 78;

export function Topbar() {
  const [ativa, setAtiva]     = useState<string | null>(null);
  const [progresso, setProg]  = useState(0);
  const [solida, setSolida]   = useState(false);
  const [aberto, setAberto]   = useState(false);

  const listaRef = useRef<HTMLUListElement>(null);
  const marcaRef = useRef<HTMLSpanElement>(null);
  const itensRef = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const aoRolar = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProg(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
      setSolida(window.scrollY > 24);

      // O corte fica logo abaixo da barra: a seção ativa é a que está sob ela.
      const corte = ALTURA_BARRA + 24;
      let atual: string | null = null;
      for (const s of SECOES) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= corte) atual = s.id;
      }
      // No fim da página o contato ocupa a tela, mas ele não está na barra:
      // a última seção listada continua marcada em vez de tudo apagar.
      if (total > 0 && window.scrollY >= total - 8) atual = SECOES[SECOES.length - 1].id;
      setAtiva(atual);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  /**
   * Posiciona o traço do item ativo.
   *
   * A medida é escrita DIRETO no elemento, não guardada em estado. Guardar em
   * estado obrigaria a medir num efeito e chamar `setState` ali dentro, o que
   * dispara um segundo render em cascata a cada rolagem — e é exatamente o que
   * a regra `react-hooks/set-state-in-effect` proíbe. Aqui o efeito faz o que
   * um efeito deve fazer: sincronizar o DOM com o estado que o React já tem.
   */
  const medir = useCallback(() => {
    const marca = marcaRef.current;
    const lista = listaRef.current;
    if (!marca || !lista) return;

    const el = ativa ? itensRef.current[ativa] : null;
    if (!el) { marca.style.opacity = "0"; return; }

    const a = el.getBoundingClientRect();
    const b = lista.getBoundingClientRect();
    // O traço tem 1px de largura fixa e é ESTICADO por `scaleX`. Animar a
    // largura de verdade seria animar uma propriedade de layout: o navegador
    // remede a linha a cada quadro dos 320ms. Com `translateX` + `scaleX` o
    // deslize inteiro roda na camada de composição, sem tocar o layout.
    marca.style.transform = `translateX(${a.left - b.left}px) scaleX(${a.width})`;
    marca.style.opacity = "1";
  }, [ativa]);

  // `useLayoutEffect` porque medir depois da pintura faz o traço aparecer no
  // lugar errado por um quadro.
  useLayoutEffect(medir, [medir]);

  useEffect(() => {
    window.addEventListener("resize", medir);
    // A fonte carrega depois da primeira medida e muda a largura dos rótulos:
    // sem este reposicionamento, o traço fica com a largura da fonte de
    // fallback e some meio caractere para o lado.
    document.fonts?.ready.then(medir).catch(() => {});
    return () => window.removeEventListener("resize", medir);
  }, [medir]);

  const ir = (id: string) => {
    setAberto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const irTopo = () => {
    setAberto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: ALTURA_BARRA,
          // O CHÃO da barra é full-bleed (a faixa escura atravessa a tela),
          // mas o CONTEÚDO dela mora na caixa do site. Sem essa separação, ou
          // a faixa fica flutuando com as bordas cortadas, ou o nome desalinha
          // do título da seção logo abaixo — que era o defeito.
          background: solida ? "rgba(15,21,10,0.88)" : "transparent",
          backdropFilter: solida ? "saturate(140%) blur(12px)" : "none",
          WebkitBackdropFilter: solida ? "saturate(140%) blur(12px)" : "none",
          boxShadow: solida ? `inset 0 -1px 0 ${C.rule}` : "none",
          transition: "background 240ms ease, box-shadow 240ms ease",
          // A calha vai no elemento DE FORA e a caixa centrada vai dentro —
          // exatamente a ordem que toda `<section>` usa. Invertida (calha
          // dentro da caixa) ela soma à margem de centralização em vez de ser
          // absorvida por ela, e a barra fica 56px mais para dentro que o
          // título logo abaixo. Foi assim que o desalinhamento nasceu.
          padding: `0 ${S.gutter}`,
        }}
      >
      <div style={{
        maxWidth: S.maxw, margin: "0 auto", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1.5rem",
      }}>
        {/* Assinatura. Não é um logotipo inventado ("HL.data"): é o nome, que é
            o que o visitante veio conferir, com o cargo em mono ao lado porque
            cargo é rótulo, não frase. */}
        <button
          onClick={irTopo}
          aria-label="Voltar ao topo"
          style={{
            display: "flex", alignItems: "baseline", gap: "0.6rem",
            background: "none", border: "none", padding: 0, cursor: "pointer",
            color: C.ink, textAlign: "left", flexShrink: 0,
          }}
        >
          <span style={{
            fontFamily: F.display, fontSize: "1.2rem",
            letterSpacing: "-0.015em", lineHeight: 1,
          }}>
            Hugo Nazário
          </span>
          <span className="hl-barra-cargo" style={{
            fontFamily: F.mono, fontSize: "0.72rem", letterSpacing: "0.1em",
            textTransform: "uppercase", color: C.ink3, lineHeight: 1,
          }}>
            Analista de Dados
          </span>
        </button>

        {/* Seções — desktop */}
        <nav aria-label="Seções" className="hl-barra-nav" style={{ position: "relative" }}>
          <ul ref={listaRef} style={{
            display: "flex", alignItems: "center", gap: "2rem",
            listStyle: "none", position: "relative",
          }}>
            {SECOES.map((s) => {
              const on = ativa === s.id;
              return (
                <li key={s.id}>
                  <button
                    ref={(el) => { itensRef.current[s.id] = el; }}
                    onClick={() => ir(s.id)}
                    aria-current={on ? "true" : undefined}
                    style={{
                      background: "none", border: "none", padding: "0.3rem 0",
                      cursor: "pointer", fontFamily: F.body,
                      fontSize: "1rem", fontWeight: on ? 600 : 400,
                      color: on ? C.ink : C.ink3,
                      transition: "color 160ms ease",
                    }}
                    onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = C.ink2; }}
                    onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = C.ink3; }}
                  >
                    {s.label}
                  </button>
                </li>
              );
            })}

            {/* O traço que desliza. Fica fora do fluxo e é medido, não
                calculado por índice: os rótulos têm larguras diferentes. */}
            <span
              ref={marcaRef}
              aria-hidden
              style={{
                position: "absolute", bottom: -6, left: 0, height: 2,
                width: 1, opacity: 0,
                transformOrigin: "left center",
                background: C.acid,
                transition: "transform 320ms cubic-bezier(0.16,1,0.3,1), opacity 160ms ease",
              }}
            />
          </ul>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <button
            onClick={() => ir("contato")}
            className="hl-barra-contato"
            style={{
              background: "none", border: "none", padding: "0.3rem 0",
              cursor: "pointer", fontFamily: F.body, fontSize: "1rem",
              fontWeight: 600, color: C.ink,
              boxShadow: `inset 0 -2px 0 ${C.acid}`,
              transition: "box-shadow 180ms ease, color 180ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `inset 0 -0.85em 0 ${C.acid}`; e.currentTarget.style.color = C.onAcid; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `inset 0 -2px 0 ${C.acid}`; e.currentTarget.style.color = C.ink; }}
          >
            Contato
          </button>

          {/* Alternador do celular. Texto, não hambúrguer: cabe, é inequívoco,
              e não pede um ícone para dizer uma palavra. */}
          <button
            onClick={() => setAberto((v) => !v)}
            className="hl-barra-menu"
            aria-expanded={aberto}
            aria-controls="hl-menu-movel"
            style={{
              display: "none", background: "none", border: "none", padding: "0.3rem 0",
              cursor: "pointer", fontFamily: F.mono, fontSize: "0.78rem",
              letterSpacing: "0.12em", textTransform: "uppercase", color: C.ink,
            }}
          >
            {aberto ? "Fechar" : "Menu"}
          </button>
        </div>
        </div>

        {/* Progresso como fio na aresta. Sem rótulo, sem porcentagem: a barra
            já é a régua, e o fio é onde ela está. Fica FORA da caixa de
            conteúdo, atravessando a tela — é a aresta da faixa, não um item
            alinhado ao texto. */}
        <span
          aria-hidden
          style={{
            position: "absolute", left: 0, bottom: 0, height: 2,
            width: "100%", transformOrigin: "left center",
            transform: `scaleX(${progresso / 100})`,
            background: C.acid,
            opacity: solida ? 0.9 : 0,
            transition: "opacity 240ms ease",
          }}
        />
      </header>

      {/* Painel do celular — lista tipográfica, tela cheia, sem ícone e sem
          cartão. Cada item é grande porque o alvo de toque é o item inteiro. */}
      {aberto && (
        <div
          id="hl-menu-movel"
          style={{
            position: "fixed", inset: `${ALTURA_BARRA}px 0 0 0`, zIndex: 99,
            background: "rgba(15,21,10,0.98)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            padding: `1.5rem ${S.gutter} 2rem`,
            display: "flex", flexDirection: "column",
          }}
        >
          {[...SECOES, { id: "contato", label: "Contato" }].map((s) => (
            <button
              key={s.id}
              onClick={() => ir(s.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", padding: "1.05rem 0",
                boxShadow: `inset 0 -1px 0 ${C.ruleSoft}`,
                fontFamily: F.display, fontSize: "1.5rem",
                letterSpacing: "-0.02em",
                color: ativa === s.id ? C.acid : C.ink,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
