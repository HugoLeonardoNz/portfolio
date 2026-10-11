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
 * A imagem em `public/hugo-foto.webp` já é QUADRADA (720×720), montada por
 * `tools/enquadrar_foto.py` a partir do retrato de origem — nunca recortada no
 * CSS. O container é um círculo com `overflow: hidden`, então um reenquadramento
 * feito aqui ancora o rosto num lugar num tamanho de tela e o desloca em outro.
 *
 * TROCA DE 2026-09-03. Antes era um recorte sem fundo, do qual sobrava a pessoa
 * boiando sobre o círculo escuro. Agora é um retrato de estúdio com fundo
 * próprio, no mesmo zoom (1,4) que o Hugo escolheu para a foto do LinkedIn — o
 * perfil e o site mostram o mesmo enquadramento, que é o ponto: quem chega aqui
 * pelo LinkedIn precisa reconhecer a mesma pessoa sem pensar.
 *
 * O formato virou WEBP porque o retrato tem fundo fotográfico: em PNG custava
 * 721 KB, e é o primeiro arquivo que o celular baixa. Em WEBP com alfa são 39 KB.
 */

// Inventario de PECAS, nao de cartoes: o pipeline do Fabric mora dentro do
// repositorio do Telecom Operadoras, mas e trabalho distinto e conta separado.
//
// O HUG entrou em 2026-09-02. Ele estava fora porque a lista nasceu como
// "o que da para abrir", e ele e privado — so que a linha diz "este portfolio
// conta com", e o portfolio conta com ele: e a unica peca em producao, a maior
// das nove, e ficava ausente justo do resumo que o visitante le primeiro.
const INVENTARIO = [
  "2 relatórios Power BI",
  "2 apps Streamlit",
  "1 plataforma interna em produção",
  "1 pipeline medallion no Fabric",
  "1 estudo de coorte, LTV e teste A/B",
  "1 EDA sobre dado do IBGE",
  "1 EDA sobre 15,9 M de linhas reais",
  "1 pacote SQL com dbt + CI",
];

/** Setores atendidos, por extenso: "6 setores" não diz nada. */
const SETORES = "Comercial · Financeiro · NOC · Suporte · Projetos · Diretoria";

/** Os dois painéis abaixo do cartaz usam a MESMA casca e o MESMO rótulo. */
const painel = {
  background: C.paper, borderRadius: R.panel,
  padding: "clamp(1rem, 2.2vh, 1.5rem) clamp(1.2rem, 2vw, 1.8rem)",
  display: "flex", flexDirection: "column" as const,
  gap: "clamp(0.6rem, 1.4vh, 0.9rem)",
};
const rotulo = {
  fontFamily: F.mono, fontSize: "clamp(0.64rem, 1.3vh, 0.72rem)",
  letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.ink3,
};

export function Hero() {
  return (
    <section id="hero" style={{
      background: C.bg,
      // Sem 100dvh desde 2026-10-09: com o cartaz compacto, a altura minima
      // centralizava o bloco e abria um vao entre a barra e o cartaz. Agora o
      // cartaz encosta na barra e a secao seguinte aparece na dobra, o que
      // tambem avisa que a pagina continua.
      boxSizing: "border-box",
      display: "flex", flexDirection: "column", justifyContent: "flex-start",
      gap: "clamp(0.7rem, 1.6vh, 1.25rem)",
      // O topo precisa livrar a nav fixa (1,5rem de padding + ~20px de linha).
      padding: `clamp(4.6rem, 8vh, 5.25rem) ${S.gutter} clamp(1.25rem, 3vh, 2.5rem)`,
      position: "relative", overflow: "hidden",
    }}>
      {/* ── Bloco lima ───────────────────────────────────────────────── */}
      <div className="hl-acende" style={{
        background: C.acid, borderRadius: R.hero,
        position: "relative", overflow: "hidden",
        padding: "clamp(1.4rem, 3vh, 2.5rem) clamp(1.4rem, 2.6vw, 2.5rem) 0",
        maxWidth: S.maxw, width: "100%", margin: "0 auto",
      }}>
        <h1 className="hl-hero-nome" style={{
          fontFamily: F.display,
          fontSize: "clamp(2.2rem, min(11.5vw, 16.5vh), 12rem)",
          // 0.86 ate 2026-09-02, quando o sobrenome passou a ter acento. Com
          // entrelinha 0.86 o agudo do A de NAZARIO encostava no O de HUGO na
          // linha de cima: LEONARDO nao tinha diacritico e o valor nunca tinha
          // sido testado com um. 0.92 e o menor valor que separa os dois sem
          // afrouxar a compressao, que e a intencao do desenho.
          lineHeight: 0.92, letterSpacing: "-0.035em",
          color: C.onAcid, textTransform: "uppercase",
          position: "relative", zIndex: 2, pointerEvents: "none",
        }}>
          <span className="hl-linha"><span>Hugo</span></span>
          <span className="hl-linha"><span>Nazário</span></span>
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
          <div className="hl-hero-left hl-entra-apoio" style={{
            position: "relative", zIndex: 3,
            paddingBottom: "clamp(1.2rem, 3vh, 2.5rem)",
          }}>
            <p className="hl-hero-lead" style={{
              fontSize: "clamp(0.75rem, 1.6vh, 0.92rem)", lineHeight: 1.55,
              color: C.onAcid, maxWidth: "34ch", fontWeight: 500, opacity: 0.85,
            }}>
              {/* "num provedor de fibra em operação" saiu daqui em 2026-10-09:
                  a frase do painel de experiência, logo abaixo, diz o mesmo. */}
              Analista de Dados Pleno. Do SQL bruto ao painel na tela da
              diretoria.
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
                  className="hl-toque"
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
                {/* Quadrado aceso, parado: o LED piscando era o tique de todo
                    portfolio. O quadrado e a mesma marca da trajetoria. */}
                <span style={{
                  width: 6, height: 6,
                  background: C.onAcid, display: "inline-block", flexShrink: 0,
                }} />
                Disponível para projetos
              </span>

              <button
                onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Ir para os projetos"
                className="hl-toque"
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
              entrava 23px dentro dos glifos da segunda linha e comia uma letra do
              SOBRENOME, que num portfolio e o pior lugar possivel para perder um
              caractere — o sobrenome e a primeira coisa que o visitante veio
              conferir. Agora a subida so consome a ENTRELINHA (o vao entre a
              base do glifo e a base da caixa de linha), nunca o desenho da
              letra: a sensacao de sobreposicao continua, o nome fica inteiro. */}
          <div className="hl-hero-photo hl-entra-foto" style={{
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
              src={`${import.meta.env.BASE_URL}hugo-foto.webp`}
              alt="Hugo Nazário"
              style={{
                width: "100%", height: "100%", display: "block",
                objectFit: "cover", objectPosition: "center top",
              }}
            />
          </div>

        </div>
      </div>

      {/* ── Experiência + inventário ───────────────────────────────────
          Dois painéis IRMÃOS (2026-10-09): mesmo fundo, mesmo raio, mesmo
          respiro, e cada um abre com um rótulo em mono na mesma linha de
          base. É essa repetição que dá harmonia — o olho lê "dois blocos do
          mesmo tipo" e não "três peças soltas". Os setores voltam como texto:
          o desenho de fibra com pulso de luz foi descartado. */}
      <div className="hl-hero-grid" style={{
        maxWidth: S.maxw, width: "100%", margin: "0 auto",
        display: "grid", gap: "clamp(0.7rem, 1.6vh, 1.25rem)",
        gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
        alignItems: "stretch",
      }}>
        <div className="hl-hero-painel hl-entra" style={painel}>
          <div style={rotulo}>Experiência</div>
          <div className="hl-hero-exp" style={{
            display: "flex", alignItems: "center",
            gap: "clamp(1rem, 2.4vw, 2.25rem)",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", flexShrink: 0 }}>
              <span className="hl-cred-num" style={{
                fontFamily: F.display,
                fontSize: "clamp(2.6rem, min(6vw, 7vh), 4.5rem)",
                color: C.acid, lineHeight: 0.82, letterSpacing: "-0.04em",
              }}>3</span>
              <span style={{
                fontFamily: F.display, fontSize: "clamp(0.95rem, 1.9vh, 1.15rem)",
                color: C.acid, letterSpacing: "-0.02em",
              }}>anos</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontSize: "clamp(0.82rem, 1.7vh, 0.95rem)", color: C.ink, fontWeight: 600,
                lineHeight: 1.45, maxWidth: "52ch",
              }}>
                construindo a inteligência de dados de um provedor de fibra em
                operação, ponto focal dos seis setores
              </p>
              <p className="hl-hero-setores" style={{
                marginTop: "0.45rem",
                fontFamily: F.mono, fontSize: "clamp(0.63rem, 1.3vh, 0.7rem)",
                letterSpacing: "0.04em", color: C.ink3, lineHeight: 1.5,
              }}>
                {SETORES}
              </p>
            </div>
          </div>
        </div>

        <div className="hl-hero-painel hl-hero-inv hl-entra" style={painel}>
          <div style={rotulo}>Este portfólio conta com</div>
          {/* Contagem se lê em coluna, com o algarismo alinhado. */}
          <ul className="hl-inv-lista" style={{
            listStyle: "none", display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0.3rem clamp(1rem, 2vw, 2rem)",
          }}>
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
