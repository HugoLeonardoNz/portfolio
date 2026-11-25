import { SectionHead } from "./ui/SectionHead";
import { SERVICOS } from "../data/content";

/**
 * Ofício: o que entrego e com quê. Juntou as antigas "O que entrego" e "Stack
 * técnica", que diziam a mesma coisa em dois formatos de caixa. É a passagem
 * quieta depois dos projetos: lista em duas colunas, sem moldura nem ícone.
 */
const STACK = [
  { titulo: "Linguagens",          itens: ["SQL (avançado)", "Python", "DAX", "M (Power Query)"] },
  { titulo: "BI e visualização",   itens: ["Power BI", "Streamlit", "Plotly", "Looker Studio"] },
  { titulo: "Engenharia de dados", itens: ["ETL / ELT", "API REST", "ERP Elleven", "PostgreSQL"] },
  { titulo: "Analytics e ML",      itens: ["Churn e retenção", "Cohort analysis", "Séries temporais", "RandomForest / SHAP"] },
];

export function Oficio() {
  return (
    <section id="oficio" className="secao">
      <div className="caixa">
        <SectionHead titulo="Ofício" />

        <ol className="servicos">
          {SERVICOS.map((s) => (
            <li key={s.title} className="servico hl-revela">
              <h3 className="servico-titulo">{s.title}</h3>
              <p className="servico-desc">{s.desc}</p>
              <p className="mono servico-tags">{s.tags.join("  ·  ")}</p>
            </li>
          ))}
        </ol>

        <div className="stack hl-revela">
          {STACK.map((g) => (
            <div key={g.titulo}>
              <h3 className="mono stack-titulo">{g.titulo}</h3>
              <ul>{g.itens.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
