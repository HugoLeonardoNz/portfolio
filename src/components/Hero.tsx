import { ArrowDown } from "lucide-react";
import { GitHubMark, LinkedInMark } from "./ui/Marcas";
import { C, F, R, S } from "../theme";

/**
 * Abertura em bloco — e em UMA tela.
 *
 * A referência continua sendo de cartaz: superfície inteira no acento, o nome
 * ocupando a largura toda em grotesca preta, texto de apoio nas margens em
 * corpo pequeno. O contraste é entre 8rem e 0,75rem, não entre duas fontes.
 *
 * Duas restrições novas governam o arquivo:
 *
 * 1. TUDO CABE EM 100dvh. A versão anterior media só em vw e rem: numa tela de
 *    900px de altura o bloco lima sozinho passava de 750px e a faixa de baixo
 *    caía fora da dobra, então a abertura pedia scroll para ser lida inteira.
 *    Aqui cada medida que empurra altura — o nome, a foto, o "3" — é um
 *    `min(Xvw, Yvh)` dentro de um clamp. Numa tela larga e baixa quem manda é
 *    o vh; numa estreita e alta, o vw. `dvh` e não `vh` por causa do mobile: a
 *    barra de endereço do Safari/Chrome come ~60px de `vh` e cortaria a faixa.
 *
 * 2. A FOTO É UM CÍRCULO. O recorte retangular sangrando na base do bloco era
 *    bonito mas tinha um custo: a foto precisava terminar exatamente na borda
 *    do cartaz, o que travava a altura do bloco na altura da imagem. O círculo
 *    solta essa amarra — ele escala com a tela e ainda entra por cima da
 *    tipografia, que era a graça do recorte anterior.
 *
 * A imagem em `public/hugo-foto.png` já é QUADRADA (720×720), montada por
 * script a partir do PNG sem fundo: o retrato entra numa tela quadrada com 12%
 * de ar acima do cabelo e margem lateral, e o que passa da base é cortado no
 * peito. Recortar no CSS não resolvia — o `getbbox()` da alpha pegava um halo
 * quase transparente de ~235px acima da cabeça, então o `cover` ancorava no
 * lugar errado e o rosto saía colado no topo do círculo.
 */

/** Setores atendidos. Escrito por extenso porque "6 setores" não diz nada; a
 *  lista diz que a operação inteira passa por uma pessoa só. */
const SETORES = "Comercial · Financeiro · NOC · Suporte · Projetos · Diretoria";

const INVENTARIO = [
  "2 relatórios Power BI",
  "2 apps Streamlit",
  "1 pipeline medallion no Fabric",
  "1 EDA sobre dado do IBGE",
  "1 EDA sobre 15,9 M de linhas reais",
  "1 pacote SQL com dbt + CI",
];

export function Hero() {
  return (
    <section id="hero" style={{
      background: C.bg,
      minHeight: "100dvh",
      boxSizing: "border-box",
      display: "flex", flexDirection: "column", justifyContent: "center",
      gap: "clamp(0.7rem, 1.6vh, 1.25rem)",
      // O topo precisa livrar a nav fixa (1,5rem de padding + ~20px de linha).
      padding: `clamp(4.5rem, 9vh, 6rem) ${S.gutter} clamp(1.25rem, 3vh, 2.5rem)`,
      position: "relative", overflow: "hidden",
    }}>
      {/* ── Bloco lima ───────────────────────────────────────────────── */}
      <div className="hl-fadein" style={{
        background: C.acid, borderRadius: R.hero,
        position: "relative", overflow: "hidden",
        padding: "clamp(1.4rem, 3vh, 2.5rem) clamp(1.4rem, 2.6vw, 2.5rem) 0",
        maxWidth: S.maxw, width: "100%", margin: "0 auto",
      }}>
        <h1 className="hl-hero-nome" style={{
          fontFamily: F.display,
          fontSize: "clamp(2.2rem, min(11.5vw, 16.5vh), 12rem)",
          lineHeight: 0.86, letterSpacing: "-0.035em",
          color: C.onAcid, textTransform: "uppercase",
          position: "relative", zIndex: 2, pointerEvents: "none",
        }}>
          Hugo<br />Leonardo
        </h1>

        {/* DUAS colunas, não três (revisto 2026-08-27).
            A foto ficava na coluna do MEIO. Com o bloco a 1600px, o nome
            terminava por volta de x=920 e a metade direita do cartaz ficava
            lima puro: a foto no centro não preenchia aquilo, só marcava o
            vazio ao lado dela. Levando a foto para a borda direita, ela passa
            a ocupar justamente a área que o nome não alcança — o cartaz fecha
            nos dois cantos e o texto de apoio fica todo do lado esquerdo,
            embaixo do nome, que é onde a leitura continua. */}
        <div className="hl-hero-inner" style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) auto",
          alignItems: "end", gap: "clamp(1.5rem, 4vw, 3.5rem)",
          marginTop: "clamp(-1.5rem, -1.5vh, -0.5rem)",
        }}>
          {/* coluna esquerda */}
          <div className="hl-hero-left" style={{
            position: "relative", zIndex: 3,
            paddingBottom: "clamp(1.2rem, 3vh, 2.5rem)",
          }}>
            <p className="hl-hero-lead" style={{
              fontSize: "clamp(0.75rem, 1.6vh, 0.92rem)", lineHeight: 1.55,
              color: C.onAcid, maxWidth: "34ch", fontWeight: 500, opacity: 0.85,
            }}>
              Analista de Dados Pleno. Do SQL bruto ao painel na tela da
              diretoria, num provedor de fibra em operação.
            </p>

            {/* Eram duas bolinhas com as letras "in" e "gh" dentro. Sigla
                digitada nao e um sistema de icones: "gh" nao significa GitHub
                para ninguem fora de quem escreveu, e as duas letras mudam de
                largura e de alinhamento vertical conforme a fonte que carrega.
                Icones desenhados, no mesmo peso de traco, dizem a mesma coisa
                sem precisar ser decifrados. */}
            <div style={{
              display: "flex", gap: "0.5rem", alignItems: "center",
              flexWrap: "wrap", rowGap: "0.75rem",
              marginTop: "clamp(0.7rem, 1.8vh, 1.4rem)",
            }}>
              {[
                { nome: "LinkedIn", Icone: LinkedInMark, href: "https://linkedin.com/in/hugo-leonardo-data-analyst" },
                { nome: "GitHub",   Icone: GitHubMark,   href: "https://github.com/HugoLeonardoNz" },
              ].map(({ nome, Icone, href }) => (
                <a
                  key={nome} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={nome} title={nome}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: C.onAcid, color: C.acid,
                    display: "grid", placeItems: "center",
                    textDecoration: "none", flexShrink: 0,
                  }}
                >
                  <Icone size={16} aria-hidden />
                </a>
              ))}

              {/* Disponibilidade e o botão de descida moram agora ao lado dos
                  ícones, na mesma fileira: eram uma terceira coluna, sozinhos
                  na borda direita do cartaz, a mais de 500px do texto a que
                  pertencem. Uma linha de apoio só, embaixo do nome. */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                marginLeft: "clamp(0.5rem, 1.5vw, 1.25rem)",
                fontSize: "clamp(0.7rem, 1.4vh, 0.82rem)", fontWeight: 600,
                color: C.onAcid, opacity: 0.85, whiteSpace: "nowrap",
              }}>
                <span className="hl-pulse" style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: C.onAcid, display: "inline-block", flexShrink: 0,
                }} />
                Disponível para projetos
              </span>

              <button
                onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Ir para os projetos"
                style={{
                  // Sem `marginLeft: auto`. Com ele o botão era empurrado para
                  // o fim da coluna de apoio e ficava sozinho no meio do lima,
                  // longe dos ícones e longe da foto — um objeto órfão. Ele
                  // pertence à fileira de apoio; fica nela.
                  marginLeft: "clamp(0.25rem, 1vw, 0.75rem)",
                  width: 34, height: 34, borderRadius: "50%",
                  background: C.onAcid, color: C.acid, border: "none",
                  cursor: "pointer", flexShrink: 0,
                  display: "grid", placeItems: "center",
                }}
              ><ArrowDown size={16} aria-hidden /></button>
            </div>
          </div>

          {/* Foto: circulo escuro sobre o lima.
              CORRIGIDO 2026-08-27. A subida era `clamp(-3.5rem, -6vh, -1.2rem)`
              — 56px numa tela de 945px de altura. Isso nao punha a foto "por
              cima da tipografia": punha a foto POR CIMA DE UMA LETRA. O circulo
              entrava 23px dentro dos glifos da segunda linha e comia o R de
              LEONARDO, que num portfolio e o pior lugar possivel para perder um
              caractere — o sobrenome e a primeira coisa que o visitante veio
              conferir. Agora a subida so consome a ENTRELINHA (o vao entre a
              base do glifo e a base da caixa de linha), nunca o desenho da
              letra: a sensacao de sobreposicao continua, o nome fica inteiro. */}
          <div className="hl-hero-photo" style={{
            width: "clamp(120px, min(24vw, 30vh), 340px)",
            aspectRatio: "1 / 1",
            justifySelf: "end", alignSelf: "end",
            position: "relative", zIndex: 1,
            marginTop: "clamp(-0.75rem, -1vh, -0.25rem)",
            marginBottom: "clamp(1.2rem, 3vh, 2.5rem)",
            borderRadius: "50%", overflow: "hidden",
            background: C.bg,
            boxShadow: "0 0 0 6px rgba(20,28,13,0.14)",
          }}>
            <img
              src={`${import.meta.env.BASE_URL}hugo-foto.png`}
              alt="Hugo Leonardo"
              style={{
                width: "100%", height: "100%", display: "block",
                objectFit: "cover", objectPosition: "center top",
              }}
            />
          </div>

        </div>
      </div>

      {/* ── Credencial + inventário ──────────────────────────────────── */}
      <div className="hl-hero-grid" style={{
        maxWidth: S.maxw, width: "100%", margin: "0 auto",
        display: "grid", gap: "clamp(0.7rem, 1.6vh, 1.25rem)",
        gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
        alignItems: "stretch",
      }}>

        {/* Quem. O "3" carrega o painel inteiro: e o unico numero da abertura
            que nao e inventario. Os outros dizem quantas pecas existem; este
            diz ha quanto tempo a pessoa faz isso todo dia, que e a pergunta
            que um recrutador faz primeiro. */}
        <div className="hl-hero-cred" style={{
          background: C.paper, borderRadius: R.panel,
          padding: "clamp(1rem, 2.2vh, 1.6rem) clamp(1.2rem, 2vw, 1.8rem)",
          display: "flex", alignItems: "center",
          gap: "clamp(1rem, 2vw, 1.8rem)", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="hl-cred-num" style={{
              fontFamily: F.display,
              fontSize: "clamp(2.6rem, min(7vw, 7.5vh), 5rem)",
              color: C.acid, lineHeight: 0.82, letterSpacing: "-0.04em",
            }}>3</span>
            <span style={{
              fontFamily: F.display, fontSize: "clamp(0.95rem, 1.9vh, 1.15rem)",
              color: C.acid, letterSpacing: "-0.02em",
            }}>anos</span>
          </div>

          <div style={{ minWidth: "18ch", flex: 1 }}>
            <div className="hl-cred-frase" style={{
              fontSize: "clamp(0.8rem, 1.7vh, 0.9rem)", color: C.ink, fontWeight: 600,
              lineHeight: 1.45, marginBottom: "0.45rem",
            }}>
              construindo a inteligência de dados de um provedor de fibra —
              como único analista da operação
            </div>
            <div className="hl-hero-setores" style={{
              fontFamily: F.mono, fontSize: "clamp(0.63rem, 1.3vh, 0.7rem)",
              letterSpacing: "0.04em", color: C.ink3, lineHeight: 1.5,
            }}>
              {SETORES}
            </div>
          </div>
        </div>

        {/* O que. */}
        <div className="hl-hero-inv" style={{
          background: C.paper, borderRadius: R.panel,
          padding: "clamp(1rem, 2.2vh, 1.6rem) clamp(1.2rem, 2vw, 1.8rem)",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            fontFamily: F.mono, fontSize: "clamp(0.64rem, 1.3vh, 0.72rem)",
            letterSpacing: "0.1em", textTransform: "uppercase", color: C.ink3,
            marginBottom: "clamp(0.55rem, 1.4vh, 0.9rem)",
          }}>
            Este portfólio conta com
          </div>
          {/* Eram cinco pilulas com borda lima. Um inventario nao e um conjunto
              de filtros clicaveis — e uma CONTAGEM, e contagem se le em coluna,
              com o algarismo alinhado. As pilulas ainda sugeriam que dava para
              clicar nelas, o que nunca foi verdade. */}
          <ul style={{ listStyle: "none", display: "grid", gap: "0.3rem" }}>
            {INVENTARIO.map((t) => {
              const [n, ...resto] = t.split(" ");
              return (
                <li key={t} style={{
                  display: "flex", gap: "0.5rem", alignItems: "baseline",
                  fontFamily: F.mono, color: C.ink2,
                  fontSize: "clamp(0.62rem, 1.25vh, 0.7rem)", lineHeight: 1.5,
                }}>
                  <span style={{
                    color: C.acid, fontVariantNumeric: "tabular-nums",
                    fontWeight: 600, flexShrink: 0,
                  }}>{n}</span>
                  <span>{resto.join(" ")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
