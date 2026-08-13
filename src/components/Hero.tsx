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
          {[
            { label: "Experiência", value: "3",  plus: "+", sub: "anos",      w: "75%" },
            { label: "Setores",     value: "6",  plus: "",  sub: "atendidos", w: "60%" },
            { label: "Dashboards",  value: "10", plus: "+", sub: "entregues", w: "55%" },
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
              <div style={{ marginTop: "0.8rem", height: 3, background: C.bg2, position: "relative" }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  background: C.purple,
                  animation: "hl-barfill 1.5s ease forwards",
                  ...({ "--w": card.w } as React.CSSProperties),
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: C.paper, border: "1px solid rgba(255,255,255,0.07)",
          padding: "1.2rem 1.4rem", width: "100%",
        }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.04em", color: C.ink3, marginBottom: "1rem", fontWeight: 500 }}>
            Projetos públicos · 7
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40 }}>
            {[
              { h: "85%", d: "0s" }, { h: "60%", d: "0.1s" }, { h: "95%", d: "0.2s" },
              { h: "45%", d: "0.3s" }, { h: "70%", d: "0.4s" }, { h: "80%", d: "0.5s" },
              { h: "65%", d: "0.6s" },
            ].map((bar, i) => (
              <div key={i} style={{
                flex: 1, background: C.bg2, borderRadius: 1,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: C.purple,
                  animation: `hl-barrise 1.2s ease forwards`,
                  animationDelay: bar.d,
                  ...({ "--h": bar.h } as React.CSSProperties),
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
