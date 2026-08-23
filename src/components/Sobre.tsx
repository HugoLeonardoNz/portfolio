import { C, F } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { ABOUT_TEXT_STRINGS } from "../data/content";

/**
 * Sobre.
 *
 * A versão anterior tinha as duas informações longe uma da outra: coluna de
 * texto com 46ch de largura à esquerda, grade de competências à direita e
 * 6rem de vão no meio. Numa tela larga isso abria um corredor vazio de quase
 * 300px — as duas metades liam como seções diferentes, e não como a mesma
 * resposta ("quem eu sou" + "com o quê").
 *
 * Agora o vão é de 3rem, o texto respira até 54ch e as duas colunas começam na
 * mesma linha de base: o título abre o bloco inteiro, e não só a metade
 * esquerda.
 */
const COMPETENCIAS = [
  { name: "SQL & Dados", sub: "Queries avançadas, CTEs, pipelines" },
  { name: "Power BI",    sub: "DAX, modelagem dimensional" },
  { name: "Python",      sub: "Pandas, automações, Streamlit" },
  { name: "Analytics",   sub: "Cohort, churn, séries temporais" },
  { name: "API & ERP",   sub: "Integrações REST, ERP de provedor" },
  { name: "Data Hub",    sub: "Plataforma interna em produção" },
];

export function Sobre() {
  return (
    <section id="sobre" style={{
      background: C.paper, padding: "6rem 3rem",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      {/* Mesma caixa de 1240 do bloco do hero: as duas seções passam a
          começar na mesma vertical, e o "Sobre" deixa de ser a única que
          espalha o conteúdo até a borda da tela. */}
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <Eyebrow label="Sobre mim" />
      <SectionTitle>Quem sou <Em>eu</Em></SectionTitle>

      {/* A primeira coluna é medida em CH, não em fração. Com "1.08fr" ela
          ficava com 750px de largura para um texto travado em 54ch (~460px):
          sobravam 290px de vão morto entre o parágrafo e a grade de
          competências, e as duas metades liam como seções diferentes. Em ch, a
          coluna tem o tamanho do texto e o gap de 3rem é o gap de verdade. */}
      <div style={{
        marginTop: "2.5rem",
        display: "grid", gridTemplateColumns: "minmax(0, 54ch) minmax(0, 1fr)",
        gap: "3rem", alignItems: "start",
      }} className="hl-sobre-grid">

        <div style={{
          fontSize: "0.95rem", lineHeight: 1.85, color: C.ink3,
        }}>
          {ABOUT_TEXT_STRINGS.map((p, i) => (
            <p key={i} style={{ marginBottom: i < ABOUT_TEXT_STRINGS.length - 1 ? "1em" : 0 }}>{p}</p>
          ))}
        </div>

        <div>
          <div style={{
            fontFamily: F.ui,
            fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.ink3, marginBottom: "1.2rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0.7rem",
          }}>
            Principais competências
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {COMPETENCIAS.map((comp, i) => (
              <div key={comp.name} style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                padding: "1.1rem 1.2rem", transition: "background 0.2s",
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
      </div>
      </div>
    </section>
  );
}
