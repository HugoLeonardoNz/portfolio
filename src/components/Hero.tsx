import { C, F, R } from "../theme";

/**
 * Abertura em bloco.
 *
 * A referência é de cartaz: uma superfície inteira no acento, o nome ocupando a
 * largura toda em grotesca preta, e a foto entrando POR CIMA da tipografia. O
 * texto de apoio vive nas margens do bloco, em corpo pequeno — o contraste é
 * entre 8rem e 0,75rem, não entre duas fontes.
 *
 * A faixa abaixo do bloco responde às DUAS perguntas que o visitante faz nos
 * primeiros segundos, uma em cada painel: "quem é essa pessoa?" (esquerda, a
 * credencial) e "o que tem aqui dentro?" (direita, o inventário do portfólio).
 * A versão anterior só respondia a segunda — e ainda assim contando
 * repositório, que é número de inventário do GitHub e não de experiência.
 */

/** Setores atendidos. Escrito por extenso porque "6 setores" não diz nada; a
 *  lista diz que a operação inteira passa por uma pessoa só. */
const SETORES = "Comercial · Financeiro · NOC · Suporte · Projetos · Diretoria";

const INVENTARIO = [
  "2 relatórios Power BI",
  "2 apps Streamlit",
  "1 EDA sobre dado do IBGE",
  "1 EDA de reclamações + RFM",
  "1 pacote SQL com dbt + CI",
];

export function Hero() {
  return (
    <section id="hero" style={{
      background: C.bg,
      // Sem minHeight de 100vh: o conteudo termina onde termina. Forcar a altura
      // da janela abria um vao morto de ~300px abaixo da faixa de numeros, que
      // lia como secao quebrada e nao como respiro.
      padding: "5.5rem 1.5rem 3rem", position: "relative", overflow: "hidden",
    }}>
      {/* ── Bloco lima ───────────────────────────────────────────────── */}
      <div className="hl-fadein" style={{
        background: C.acid, borderRadius: R.hero,
        position: "relative", overflow: "hidden",
        padding: "2.5rem 2.5rem 0",
        maxWidth: 1240, margin: "0 auto",
      }}>
        {/* Nome em corpo grande. clamp para nao estourar no celular: a
            referencia vive de a palavra tocar as duas bordas, e isso so
            funciona se o tamanho acompanhar a largura. */}
        <h1 style={{
          fontFamily: F.display,
          fontSize: "clamp(2.6rem, 11.5vw, 9.5rem)",
          lineHeight: 0.86, letterSpacing: "-0.035em",
          color: C.onAcid, textTransform: "uppercase",
          position: "relative", zIndex: 2, pointerEvents: "none",
        }}>
          Hugo<br />Leonardo
        </h1>

        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
          alignItems: "end", gap: "1.5rem", marginTop: "-0.5rem",
        }}>
          {/* coluna esquerda */}
          <div style={{ position: "relative", zIndex: 3, paddingBottom: "2.5rem" }}>
            <p style={{
              fontSize: "0.82rem", lineHeight: 1.55, color: C.onAcid,
              maxWidth: "26ch", fontWeight: 500, opacity: 0.85,
            }}>
              Analista de Dados Pleno. Do SQL bruto ao painel na tela da
              diretoria, num provedor de fibra em operação.
            </p>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.4rem" }}>
              {[
                { t: "in", href: "https://linkedin.com/in/hugo-leonardo-data-analyst" },
                { t: "gh", href: "https://github.com/HugoLeonardoNz" },
              ].map((s) => (
                <a
                  key={s.t} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: C.onAcid, color: C.acid,
                    display: "grid", placeItems: "center",
                    fontFamily: F.ui, fontSize: "0.66rem", fontWeight: 700,
                    textDecoration: "none", letterSpacing: "0.02em",
                  }}
                >{s.t}</a>
              ))}
            </div>
          </div>

          {/* foto, sobre a tipografia */}
          <div style={{
            width: "clamp(190px, 28vw, 350px)", justifySelf: "center",
            position: "relative", zIndex: 1, marginTop: "-16%",
          }}>
            <img
              src={`${import.meta.env.BASE_URL}hugo-foto.png`}
              alt="Hugo Leonardo"
              style={{ width: "100%", display: "block", objectFit: "contain" }}
            />
          </div>

          {/* coluna direita */}
          <div style={{
            position: "relative", zIndex: 3, paddingBottom: "2.5rem",
            justifySelf: "end", textAlign: "right",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              fontSize: "0.78rem", fontWeight: 600, color: C.onAcid, opacity: 0.85,
            }}>
              <span className="hl-pulse" style={{
                width: 6, height: 6, borderRadius: "50%",
                background: C.onAcid, display: "inline-block",
              }} />
              Disponível para projetos
            </div>
            <div>
              <button
                onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Ir para os projetos"
                style={{
                  marginTop: "1.4rem", width: 38, height: 38, borderRadius: "50%",
                  background: C.onAcid, color: C.acid, border: "none",
                  cursor: "pointer", fontSize: "1rem", lineHeight: 1,
                }}
              >↓</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Credencial + inventário ──────────────────────────────────── */}
      <div style={{
        maxWidth: 1240, margin: "1.25rem auto 0",
        display: "grid", gap: "1.25rem",
        gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
        alignItems: "stretch",
      }} className="hl-hero-grid">

        {/* Quem. O "3" carrega o painel inteiro: e o unico numero da abertura
            que nao e inventario. Os outros dizem quantas pecas existem; este
            diz ha quanto tempo a pessoa faz isso todo dia, que e a pergunta
            que um recrutador faz primeiro. */}
        <div style={{
          background: C.paper, borderRadius: R.panel, padding: "1.6rem 1.8rem",
          display: "flex", alignItems: "center", gap: "1.8rem", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{
              fontFamily: F.display, fontSize: "clamp(3.4rem, 7vw, 5rem)",
              color: C.acid, lineHeight: 0.82, letterSpacing: "-0.04em",
            }}>3</span>
            <span style={{
              fontFamily: F.display, fontSize: "1.15rem", color: C.acid,
              letterSpacing: "-0.02em",
            }}>anos</span>
          </div>

          <div style={{ minWidth: "18ch", flex: 1 }}>
            <div style={{
              fontSize: "0.9rem", color: C.ink, fontWeight: 600,
              lineHeight: 1.45, marginBottom: "0.5rem",
            }}>
              construindo a inteligência de dados de um provedor de fibra —
              como único analista da operação
            </div>
            <div style={{
              fontFamily: F.ui, fontSize: "0.7rem", letterSpacing: "0.04em",
              color: C.ink3, lineHeight: 1.5,
            }}>
              {SETORES}
            </div>
          </div>
        </div>

        {/* O que. */}
        <div style={{
          background: C.paper, borderRadius: R.panel, padding: "1.6rem 1.8rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            fontFamily: F.ui, fontSize: "0.72rem", letterSpacing: "0.1em",
            textTransform: "uppercase", color: C.ink3, marginBottom: "0.9rem",
          }}>
            Este portfólio conta com
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {INVENTARIO.map((t) => (
              <span key={t} style={{
                fontSize: "0.72rem", color: C.ink2, fontFamily: F.ui,
                border: "1px solid rgba(212,247,74,0.28)",
                borderRadius: R.chip, padding: "0.3rem 0.75rem",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
