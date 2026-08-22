import { C, F, R } from "../theme";

/**
 * Abertura em bloco.
 *
 * A referência é de cartaz: uma superfície inteira no acento, o nome ocupando a
 * largura toda em grotesca preta, e a foto entrando POR CIMA da tipografia. O
 * texto de apoio vive nas margens do bloco, em corpo pequeno — o contraste é
 * entre 8rem e 0,75rem, não entre duas fontes.
 *
 * O que saiu: nome em serifa itálica com gradiente aplicado ao texto. Gradiente
 * em letra é efeito, e efeito envelhece; peso e escala não.
 */

const SELO = "ANÁLISE DE DADOS · SQL · POWER BI · PYTHON · ";

export function Hero() {
  return (
    <section id="hero" style={{
      background: C.bg,
      // Sem minHeight de 100vh: o conteudo termina onde termina. Forcar a altura
      // da janela abria um vao morto de ~300px abaixo da faixa de numeros, que
      // lia como secao quebrada e nao como respiro.
      padding: "5.5rem 1.5rem 3rem", position: "relative", overflow: "hidden",
    }}>
      {/* ── Bloco lima ───────────────────────────────────────────────── */}
      <div className="hl-fadein" style={{
        background: C.acid, borderRadius: R.hero,
        position: "relative", overflow: "hidden",
        padding: "2.5rem 2.5rem 0",
        maxWidth: 1240, margin: "0 auto",
      }}>
        {/* Nome em corpo grande. clamp para nao estourar no celular: a
            referencia vive de a palavra tocar as duas bordas, e isso so
            funciona se o tamanho acompanhar a largura. */}
        <h1 style={{
          fontFamily: F.display,
          fontSize: "clamp(2.6rem, 11.5vw, 9.5rem)",
          lineHeight: 0.86, letterSpacing: "-0.035em",
          color: C.onAcid, textTransform: "uppercase",
          position: "relative", zIndex: 2, pointerEvents: "none",
        }}>
          Hugo<br />Leonardo
        </h1>

        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
          alignItems: "end", gap: "1.5rem", marginTop: "-0.5rem",
        }}>
          {/* coluna esquerda */}
          <div style={{ position: "relative", zIndex: 3, paddingBottom: "2.5rem" }}>
            <p style={{
              fontSize: "0.82rem", lineHeight: 1.55, color: C.onAcid,
              maxWidth: "26ch", fontWeight: 500, opacity: 0.85,
            }}>
              Três anos transformando dados operacionais em decisão — do SQL bruto
              ao painel na tela da diretoria.
            </p>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.4rem" }}>
              {[
                { t: "in", href: "https://linkedin.com/in/hugo-leonardo-data-analyst" },
                { t: "gh", href: "https://github.com/HugoLeonardoNz" },
              ].map((s) => (
                <a
                  key={s.t} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: C.onAcid, color: C.acid,
                    display: "grid", placeItems: "center",
                    fontFamily: F.ui, fontSize: "0.66rem", fontWeight: 700,
                    textDecoration: "none", letterSpacing: "0.02em",
                  }}
                >{s.t}</a>
              ))}
            </div>
          </div>

          {/* foto, sobre a tipografia */}
          <div style={{
            width: "clamp(190px, 28vw, 350px)", justifySelf: "center",
            position: "relative", zIndex: 1, marginTop: "-16%",
          }}>
            <img
              src={`${import.meta.env.BASE_URL}hugo-foto.png`}
              alt="Hugo Leonardo"
              style={{ width: "100%", display: "block", objectFit: "contain" }}
            />
          </div>

          {/* coluna direita */}
          <div style={{
            position: "relative", zIndex: 3, paddingBottom: "2.5rem",
            justifySelf: "end", textAlign: "right",
          }}>
            <p style={{
              fontSize: "0.82rem", lineHeight: 1.55, color: C.onAcid,
              maxWidth: "24ch", fontWeight: 500, opacity: 0.85, marginLeft: "auto",
            }}>
              Todo número deste portfólio sobrevive à pergunta
              “como você chegou nisso?”. Os que não sobreviveram foram removidos.
            </p>
            <button
              onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="Ir para os projetos"
              style={{
                marginTop: "1.4rem", width: 38, height: 38, borderRadius: "50%",
                background: C.onAcid, color: C.acid, border: "none",
                cursor: "pointer", fontSize: "1rem", lineHeight: 1,
              }}
            >↓</button>
          </div>
        </div>
      </div>

      {/* ── Faixa de números ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1240, margin: "1.25rem auto 0",
        display: "grid", gap: "1.25rem",
        gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
        alignItems: "stretch",
      }} className="hl-hero-grid">
        <div style={{
          background: C.paper, borderRadius: R.panel, padding: "1.6rem 1.8rem",
          display: "flex", gap: "2.5rem", flexWrap: "wrap",
        }}>
          {/* Numeros que o visitante confere clicando. Antes eram "3+ anos",
              "6 setores" e "10+ dashboards": auto-declarados, sem como
              verificar, e com barra de progresso embaixo sugerindo percentual
              de coisa nenhuma. */}
          {[
            { v: "7",  l: "repositórios públicos" },
            { v: "82", l: "medidas DAX" },
            { v: "58", l: "testes em CI" },
          ].map((k) => (
            <div key={k.l}>
              <div style={{
                fontFamily: F.display, fontSize: "2.4rem",
                color: C.acid, lineHeight: 1, letterSpacing: "-0.03em",
              }}>{k.v}</div>
              <div style={{ fontSize: "0.72rem", color: C.ink3, marginTop: "0.45rem" }}>{k.l}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: C.paper, borderRadius: R.panel, padding: "1.6rem 1.8rem",
          display: "flex", flexWrap: "wrap", gap: "0.45rem", alignContent: "center",
        }}>
          {[
            "2 relatórios Power BI",
            "2 apps Streamlit",
            "1 EDA sobre dado do IBGE",
            "1 EDA de reclamações + RFM",
            "1 pacote SQL com dbt + CI",
          ].map((t) => (
            <span key={t} style={{
              fontSize: "0.72rem", color: C.ink2, fontFamily: F.ui,
              border: `1px solid rgba(212,247,74,0.28)`,
              borderRadius: R.chip, padding: "0.3rem 0.75rem",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Selo giratório: o único movimento contínuo da página. Fica no fluxo,
          centralizado abaixo da faixa — no canto absoluto ele flutuava sozinho
          num vazio e parecia sobra de layout. */}
      <div aria-hidden style={{
        width: 104, height: 104, margin: "2rem auto 0", pointerEvents: "none",
      }} className="hl-selo">
        <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: "hl-spin 22s linear infinite" }}>
          <defs>
            <path id="selo-arco" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text fill={C.ink3} fontSize="15.5" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2.4">
            <textPath href="#selo-arco">{SELO + SELO}</textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
