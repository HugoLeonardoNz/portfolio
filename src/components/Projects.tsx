import { C } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { PROJECTS } from "../data/projects";

export function Projects() {
  return (
    <section id="projetos" style={{ background: C.darkAlt, padding: "6rem 3rem" }}>
      <Eyebrow label="Portfólio" onDark />
      <SectionTitle>Projetos <Em>em destaque</Em></SectionTitle>

      <div style={{
        marginTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 0, border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {PROJECTS.map((p, i) => {
          const isEven    = i % 2 === 1;
          const isLastRow = i >= PROJECTS.length - 2;
          return (
            <div key={p.id} style={{
              borderRight: !isEven ? "1px solid rgba(255,255,255,0.07)" : "none",
              borderBottom: !isLastRow ? "1px solid rgba(255,255,255,0.07)" : "none",
              padding: "2.5rem", transition: "background 0.25s",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,91,245,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                color: p.isPrivate ? C.ink3 : C.purple,
                background: p.isPrivate ? "rgba(255,255,255,0.05)" : "rgba(124,91,245,0.12)",
                padding: "0.3rem 0.7rem", marginBottom: "1.2rem",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.isPrivate ? C.ink3 : C.purple, display: "inline-block" }} />
                {p.isPrivate ? "Privado" : "Live"}
              </div>

              <div style={{
                position: "absolute", top: "2.5rem", right: "2.5rem",
                fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", fontWeight: 300,
                color: "rgba(165,133,255,0.08)", lineHeight: 1, userSelect: "none",
              }}>
                {String(p.id).padStart(2, "0")}
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem",
                fontWeight: 400, color: C.ink, lineHeight: 1.2, marginBottom: "0.8rem",
              }}>
                {p.title}
              </h3>

              <p style={{
                fontSize: "0.88rem", color: "rgba(196,191,232,0.7)",
                lineHeight: 1.8, maxWidth: "42ch", marginBottom: "1.5rem",
              }}>
                {p.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.8rem" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em",
                    color: "rgba(196,191,232,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem 0.7rem",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                {p.isPrivate ? (
                  <span style={{ fontSize: "0.85rem", color: C.ink3 }}>Acesso restrito →</span>
                ) : (
                  <>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em",
                          color: C.purple, textDecoration: "none",
                          display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "gap 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.gap = "0.9rem")}
                        onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
                      >
                        GitHub →
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em",
                          color: C.ink3, textDecoration: "none",
                          display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = C.ink2)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = C.ink3)}
                      >
                        Ver live →
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
