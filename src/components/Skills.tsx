import { C } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";

export function Skills() {
  return (
    <section id="habilidades" style={{ background: C.bg, padding: "6rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ marginBottom: "4rem" }}>
        <Eyebrow label="Stack técnica" />
        <SectionTitle>Habilidades & <Em>ferramentas</Em></SectionTitle>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0, border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {[
          { title: "Linguagens",          items: ["SQL (avançado)", "Python", "DAX", "M (Power Query)"] },
          { title: "BI & Visualização",   items: ["Power BI", "Streamlit", "Plotly", "Looker Studio"] },
          { title: "Engenharia de Dados", items: ["ETL / ELT", "API REST", "ERP Elleven", "PostgreSQL"] },
          { title: "Analytics & ML",      items: ["Churn & Retenção", "Cohort Analysis", "Séries Temporais", "RandomForest / SHAP"] },
        ].map((cat, i) => (
          <div key={cat.title} style={{
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            padding: "2rem 1.8rem",
          }}>
            <div style={{
              fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: C.ink3, marginBottom: "1.5rem",
              paddingBottom: "0.8rem", borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              {cat.title}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {cat.items.map((item) => (
                <li key={item} style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  fontSize: "0.88rem", fontWeight: 400, color: C.ink2, lineHeight: 1.4,
                }}>
                  <span style={{ display: "block", width: 5, height: 5, background: C.purple, borderRadius: "50%", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
