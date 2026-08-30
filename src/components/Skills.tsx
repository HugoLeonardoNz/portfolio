import { C, F, S } from "../theme";
import { SectionHead } from "./ui/SectionHead";

/**
 * Stack técnica.
 *
 * ANTES: quatro caixas com moldura de 1px, cada item precedido de um ponto
 * lima de 5px. Dezesseis pontos e quatro molduras para exibir dezesseis
 * palavras. O ponto colorido antes de cada item de lista é decoração que se
 * disfarça de marcador: `<ul>` já é uma lista, e o navegador já sabe disso.
 *
 * AGORA: índice em quatro colunas, sem moldura e sem marcador. O rótulo da
 * categoria fica em mono, pequeno, sobre um fio; os itens descem embaixo em
 * corpo de leitura. É a página mais quieta do site de propósito — ela vem
 * logo antes dos projetos, que é a passagem densa e a razão de o visitante
 * estar aqui. Bloco denso pede bloco calmo do lado.
 */

const STACK = [
  { titulo: "Linguagens",          itens: ["SQL (avançado)", "Python", "DAX", "M (Power Query)"] },
  { titulo: "BI & Visualização",   itens: ["Power BI", "Streamlit", "Plotly", "Looker Studio"] },
  { titulo: "Engenharia de Dados", itens: ["ETL / ELT", "API REST", "ERP Elleven", "PostgreSQL"] },
  { titulo: "Analytics & ML",      itens: ["Churn & Retenção", "Cohort Analysis", "Séries Temporais", "RandomForest / SHAP"] },
];

export function Skills() {
  return (
    <section id="habilidades" style={{
      background: C.bg,
      padding: `0 ${S.gutter} ${S.section}`,
    }}>
      <div style={{ maxWidth: S.maxw, margin: "0 auto" }}>
        <div style={{ paddingTop: S.section, boxShadow: `inset 0 1px 0 ${C.rule}` }}>
          <SectionHead
            titulo="Stack técnica"
            resumo="As ferramentas em que o trabalho acima é feito, sem inflar a lista com o que eu abri uma vez."
          />

          <div
            className="hl-col-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "clamp(1.75rem, 4vw, 3rem)",
            }}
          >
            {STACK.map((cat) => (
              <div key={cat.titulo}>
                <h3 style={{
                  fontFamily: F.mono, fontSize: "0.66rem", fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: C.ink3, paddingBottom: "0.75rem",
                  boxShadow: `inset 0 -1px 0 ${C.rule}`,
                }}>
                  {cat.titulo}
                </h3>
                <ul style={{ listStyle: "none", marginTop: "1.05rem" }}>
                  {cat.itens.map((item) => (
                    <li key={item} style={{
                      fontSize: "0.95rem", lineHeight: 1.5, color: C.ink2,
                      paddingBottom: "0.7rem",
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
