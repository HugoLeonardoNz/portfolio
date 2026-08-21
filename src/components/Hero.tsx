import { C } from "../theme";

export function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
      alignItems: "center", padding: "7rem 3rem 5rem",
      background: C.bg, overflow: "hidden", position: "relative",
    }}>
      {/* LEFT */}
      <div className="hl-fadein" style={{ position: "relative", zIndex: 1, paddingBottom: "2rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.8rem", fontWeight: 500, color: C.ink3, marginBottom: "1.5rem",
        }}>
          <span className="hl-pulse" style={{ width: 6, height: 6, background: C.purple, borderRadius: "50%", display: "inline-block" }} />
          Disponível para projetos
        </div>

        <div style={{
          fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase",
          color: C.ink3, marginBottom: "1.2rem",
          display: "flex", alignItems: "center", gap: "0.8rem", fontWeight: 500,
        }}>
          <span style={{ display: "block", width: "2rem", height: "1px", background: C.ink3 }} />
          Analista de Dados Pleno
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(5rem, 9vw, 9rem)", fontWeight: 300,
          lineHeight: 0.9, letterSpacing: "-0.02em", color: C.ink,
        }}>
          Hugo<br />
          <span style={{
            background: C.grad,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", fontStyle: "italic",
          }}>
            Leonardo
          </span>
        </h1>

        <p style={{
          marginTop: "2.5rem", fontSize: "1rem", lineHeight: 1.75,
          color: C.ink3, maxWidth: "38ch", fontWeight: 400,
        }}>
          3 anos transformando dados operacionais em decisão estratégica — do SQL bruto ao dashboard na tela da diretoria.
        </p>

        <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", fontWeight: 600,
              letterSpacing: "0.06em", background: C.ink, color: C.bg,
              padding: "0.9rem 2rem", border: "none", cursor: "pointer", transition: "all 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.purple; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.color = C.bg; }}
          >
            Ver projetos
          </button>
          <a
            href="https://linkedin.com/in/hugo-leonardo-data-analyst"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", fontWeight: 500,
              letterSpacing: "0.06em", background: "transparent", color: C.ink,
              padding: "0.9rem 2rem", textDecoration: "none",
              border: "1px solid rgba(165,133,255,0.4)", transition: "all 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,91,245,0.15)"; e.currentTarget.style.color = C.purple2; e.currentTarget.style.borderColor = C.purple2; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = "rgba(165,133,255,0.4)"; }}
          >
            LinkedIn →
          </a>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hl-fadein-d" style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "1.5rem", paddingBottom: "2rem",
      }}>
        <div style={{
          width: 300, height: 300, borderRadius: "50%", overflow: "hidden",
          border: "3px solid rgba(124,91,245,0.4)",
          boxShadow: "0 0 40px rgba(124,91,245,0.2)", flexShrink: 0,
        }}>
          <img src={`${import.meta.env.BASE_URL}hugo-foto.png`} alt="Hugo Leonardo" style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
          }} />
        </div>

        <div style={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center" }}>
          {/* Numeros que o visitante consegue conferir clicando. Antes eram
              "3+ anos", "6 setores" e "10+ dashboards": auto-declarados, sem
              como verificar, e com barrinha de progresso embaixo sugerindo
              percentual de coisa nenhuma. Num portfolio de dados, o cartao de
              vaidade e o pior lugar para pedir confianca. */}
          {[
            { label: "Repositórios", value: "7",  plus: "",  sub: "públicos"        },
            { label: "Medidas DAX",   value: "82", plus: "",  sub: "nos 2 relatórios" },
            { label: "Testes",        value: "32", plus: "",  sub: "automatizados"   },
          ].map((card) => (
            <div key={card.label} style={{
              background: C.paper, border: "1px solid rgba(255,255,255,0.07)",
              padding: "1.2rem 1.4rem", flex: 1,
            }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.04em", color: C.ink3, marginBottom: "0.4rem", fontWeight: 500 }}>
                {card.label}
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem",
                fontWeight: 600, color: C.ink, lineHeight: 1,
              }}>
                {card.value}<span style={{ color: C.purple2 }}>{card.plus}</span>
              </div>
              <div style={{ fontSize: "0.72rem", color: C.ink3, marginTop: "0.3rem" }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: C.paper, border: "1px solid rgba(255,255,255,0.07)",
          padding: "1.2rem 1.4rem", width: "100%",
        }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.04em", color: C.ink3, marginBottom: "1rem", fontWeight: 500 }}>
            O que cada repositório entrega
          </div>
          {/* Aqui havia sete barras com alturas escritas a mao — 85%, 60%, 95%,
              45%, 70%, 80%, 65% — sob o titulo "Projetos publicos · 7". Pareciam
              um grafico e nao mediam nada. Num portfolio cuja tese e que numero
              precisa sobreviver a "como voce chegou nisso?", decoracao em forma
              de dado e o pior lugar possivel para economizar honestidade.
              No lugar, a mesma altura de bloco com informacao verdadeira. */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {[
              "2 relatórios Power BI",
              "2 apps Streamlit",
              "1 EDA sobre dado do IBGE",
              "1 EDA de reclamações + RFM",
              "1 pacote SQL com dbt + CI",
            ].map((t) => (
              <span key={t} style={{
                fontSize: "0.72rem", color: C.ink2,
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 999, padding: "0.25rem 0.6rem",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
