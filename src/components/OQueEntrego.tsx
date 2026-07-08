import { C } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { PIcon } from "./ui/PIcon";
import { SERVICOS } from "../data/content";

export function OQueEntrego() {
  return (
    <section id="servicos" style={{ background: C.bg, padding: "6rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <Eyebrow label="O que entrego" />
      <SectionTitle>Serviços & <Em>entregas</Em></SectionTitle>

      <div style={{
        marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0, border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {SERVICOS.map((s, i) => (
          <div key={s.title} style={{
            borderRight: i % 3 < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            padding: "2rem 1.8rem", transition: "background 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,91,245,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ marginBottom: "1rem" }}>
              <PIcon icon={s.icon} color={C.purple2} />
            </div>
            <div style={{
              fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.06em",
              color: C.ink, marginBottom: "0.8rem",
            }}>
              {s.title}
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: C.ink3, marginBottom: "1rem" }}>
              {s.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.tags.map((t) => (
                <span key={t} style={{
                  fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em",
                  color: "rgba(196,191,232,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem 0.7rem",
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
