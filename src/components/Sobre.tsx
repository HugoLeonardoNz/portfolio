import { C } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { ABOUT_TEXT_STRINGS } from "../data/content";

export function Sobre() {
  return (
    <section id="sobre" style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem",
      alignItems: "start", background: C.paper, padding: "6rem 3rem",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div>
        <Eyebrow label="Sobre mim" />
        <SectionTitle>Quem sou <Em>eu</Em></SectionTitle>

        <div style={{ marginTop: "2.5rem", fontSize: "0.95rem", lineHeight: 1.85, color: C.ink3, maxWidth: "46ch" }}>
          {ABOUT_TEXT_STRINGS.map((p, i) => (
            <p key={i} style={{ marginBottom: i < ABOUT_TEXT_STRINGS.length - 1 ? "1em" : 0 }}>{p}</p>
          ))}
        </div>

        {/* Aqui havia "3+ anos", "6 setores" e "10+ dashboards" — os mesmos
            cartões de vaidade que saíram do hero, e que continuaram vivos nesta
            seção. Auto-declarados, sem como conferir, e repetindo em número o
            que o texto ao lado já diz em prosa. O hero carrega os valores
            verificáveis; esta seção carrega a pessoa. */}
      </div>

      <div>
        <div style={{
          fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
          color: C.ink3, marginBottom: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0.8rem",
        }}>
          Principais Competências
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {[
            { name: "SQL & Dados", sub: "Queries avançadas, CTEs, pipelines" },
            { name: "Power BI",    sub: "DAX, modelagem dimensional" },
            { name: "Python",      sub: "Pandas, automações, Streamlit" },
            { name: "Analytics",   sub: "Cohort, churn, séries temporais" },
            { name: "API & ERP",   sub: "Integrações REST, ERP Elleven" },
            { name: "Data Hub",    sub: "Plataforma própria em dev" },
          ].map((comp, i) => (
            <div key={comp.name} style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              padding: "1.2rem", transition: "background 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,247,74,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ width: 6, height: 6, background: C.acid, borderRadius: "50%", marginBottom: "0.7rem" }} />
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: C.ink, marginBottom: "0.25rem" }}>{comp.name}</div>
              <div style={{ fontSize: "0.78rem", color: C.ink3, lineHeight: 1.5 }}>{comp.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
