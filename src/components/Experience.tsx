import { C } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { EXPERIENCE } from "../data/content";

function ExpItem({ title, company, period, location, bullets, stack, isLast = false }: {
  title: string; company: string; period: string; location?: string;
  bullets?: string[]; stack?: string[]; isLast?: boolean;
}) {
  return (
    <div style={{
      position: "relative", padding: "2.5rem 3rem",
      borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
      transition: "background 0.2s",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,91,245,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{
        position: "absolute", left: -5, top: "2.8rem",
        width: 9, height: 9, background: C.purple, borderRadius: "50%",
        border: `2px solid ${C.paper}`,
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400, color: C.ink }}>
          {title}
        </h3>
        <div style={{ fontSize: "0.82rem", fontWeight: 500, color: C.ink3, textAlign: "right", lineHeight: 1.6 }}>
          {period}{location && <><br />{location}</>}
        </div>
      </div>

      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: C.purple2, letterSpacing: "0.04em", marginBottom: bullets ? "1.2rem" : 0 }}>
        {company}
      </div>

      {bullets && (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontSize: "0.88rem", lineHeight: 1.75, color: C.ink3, paddingLeft: "1.2rem", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: C.purple, fontSize: "0.6rem", top: "0.25rem" }}>—</span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {stack && (
        <div style={{ marginTop: "1.2rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {stack.map((t) => (
            <span key={t} style={{
              fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em",
              color: C.ink3, border: "1px solid rgba(255,255,255,0.1)", padding: "0.25rem 0.7rem",
            }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experiencia" style={{
      background: C.paper, padding: "6rem 3rem",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ marginBottom: "4rem" }}>
        <Eyebrow label="Trajetória" />
        <SectionTitle>Experiência <Em>profissional</Em></SectionTitle>
      </div>

      <div style={{
        display: "flex", flexDirection: "column", gap: 0,
        borderLeft: "1px solid rgba(255,255,255,0.1)", marginLeft: "1rem",
      }}>
        {EXPERIENCE.map((exp, i) => (
          <ExpItem key={i}
            title={exp.title} company={exp.company}
            period={exp.period} location={exp.location}
            bullets={exp.bullets} stack={exp.stack}
          />
        ))}
        <ExpItem
          title="Bacharelado em Sistemas de Informação"
          company="Centro Universitário UNA"
          period="Out 2025 — Out 2028"
          isLast
        />
      </div>
    </section>
  );
}
