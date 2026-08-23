import { C, F, R } from "../theme";

/**
 * Abertura em bloco — e em UMA tela.
 *
 * A referência continua sendo de cartaz: superfície inteira no acento, o nome
 * ocupando a largura toda em grotesca preta, texto de apoio nas margens em
 * corpo pequeno. O contraste é entre 8rem e 0,75rem, não entre duas fontes.
 *
 * Duas restrições novas governam o arquivo:
 *
 * 1. TUDO CABE EM 100dvh. A versão anterior media só em vw e rem: numa tela de
 *    900px de altura o bloco lima sozinho passava de 750px e a faixa de baixo
 *    caía fora da dobra, então a abertura pedia scroll para ser lida inteira.
 *    Aqui cada medida que empurra altura — o nome, a foto, o "3" — é um
 *    `min(Xvw, Yvh)` dentro de um clamp. Numa tela larga e baixa quem manda é
 *    o vh; numa estreita e alta, o vw. `dvh` e não `vh` por causa do mobile: a
 *    barra de endereço do Safari/Chrome come ~60px de `vh` e cortaria a faixa.
 *
 * 2. A FOTO É UM CÍRCULO. O recorte retangular sangrando na base do bloco era
 *    bonito mas tinha um custo: a foto precisava terminar exatamente na borda
 *    do cartaz, o que travava a altura do bloco na altura da imagem. O círculo
 *    solta essa amarra — ele escala com a tela e ainda entra por cima da
 *    tipografia, que era a graça do recorte anterior.
 *
 * A imagem em `public/hugo-foto.png` já é QUADRADA (720×720), montada por
 * script a partir do PNG sem fundo: o retrato entra numa tela quadrada com 12%
 * de ar acima do cabelo e margem lateral, e o que passa da base é cortado no
 * peito. Recortar no CSS não resolvia — o `getbbox()` da alpha pegava um halo
 * quase transparente de ~235px acima da cabeça, então o `cover` ancorava no
 * lugar errado e o rosto saía colado no topo do círculo.
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
      minHeight: "100dvh",
      boxSizing: "border-box",
      display: "flex", flexDirection: "column", justifyContent: "center",
      gap: "clamp(0.7rem, 1.6vh, 1.25rem)",
      // O topo precisa livrar a nav fixa (1,5rem de padding + ~20px de linha).
      padding: "clamp(4.5rem, 9vh, 6rem) 1.5rem clamp(1.25rem, 3vh, 2.5rem)",
      position: "relative", overflow: "hidden",
    }}>
      {/* ── Bloco lima ───────────────────────────────────────────────── */}
      <div className="hl-fadein" style={{
        background: C.acid, borderRadius: R.hero,
        position: "relative", overflow: "hidden",
        padding: "clamp(1.4rem, 3vh, 2.5rem) clamp(1.4rem, 2.6vw, 2.5rem) 0",
        maxWidth: 1240, width: "100%", margin: "0 auto",
      }}>
        <h1 className="hl-hero-nome" style={{
          fontFamily: F.display,
          fontSize: "clamp(2.2rem, min(11.5vw, 15.5vh), 9.5rem)",
          lineHeight: 0.86, letterSpacing: "-0.035em",
          color: C.onAcid, textTransform: "uppercase",
          position: "relative", zIndex: 2, pointerEvents: "none",
        }}>
          Hugo<br />Leonardo
        </h1>

        <div className="hl-hero-inner" style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
          alignItems: "end", gap: "1.5rem",
          marginTop: "clamp(-1.5rem, -1.5vh, -0.5rem)",
        }}>
          {/* coluna esquerda */}
          <div className="hl-hero-left" style={{
            position: "relative", zIndex: 3,
            paddingBottom: "clamp(1.2rem, 3vh, 2.5rem)",
          }}>
            <p className="hl-hero-lead" style={{
              fontSize: "clamp(0.72rem, 1.5vh, 0.82rem)", lineHeight: 1.55,
              color: C.onAcid, maxWidth: "26ch", fontWeight: 500, opacity: 0.85,
            }}>
              Analista de Dados Pleno. Do SQL bruto ao painel na tela da
              diretoria, num provedor de fibra em operação.
            </p>

            <div style={{
              display: "flex", gap: "0.5rem",
              marginTop: "clamp(0.7rem, 1.8vh, 1.4rem)",
            }}>
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
                    flexShrink: 0,
                  }}
                >{s.t}</a>
              ))}
            </div>
          </div>

          {/* Foto: circulo escuro sobre o lima, entrando por cima do nome. */}
          <div className="hl-hero-photo" style={{
            width: "clamp(120px, min(24vw, 27vh), 300px)",
            aspectRatio: "1 / 1",
            justifySelf: "center", alignSelf: "end",
            position: "relative", zIndex: 1,
            marginTop: "clamp(-3.5rem, -6vh, -1.2rem)",
            marginBottom: "clamp(1.2rem, 3vh, 2.5rem)",
            borderRadius: "50%", overflow: "hidden",
            background: C.bg,
            boxShadow: "0 0 0 6px rgba(20,28,13,0.14)",
          }}>
            <img
              src={`${import.meta.env.BASE_URL}hugo-foto.png`}
              alt="Hugo Leonardo"
              style={{
                width: "100%", height: "100%", display: "block",
                objectFit: "cover", objectPosition: "center top",
              }}
            />
          </div>

          {/* coluna direita */}
          <div className="hl-hero-right" style={{
            position: "relative", zIndex: 3,
            paddingBottom: "clamp(1.2rem, 3vh, 2.5rem)",
            justifySelf: "end", textAlign: "right",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              fontSize: "clamp(0.7rem, 1.4vh, 0.78rem)", fontWeight: 600,
              color: C.onAcid, opacity: 0.85,
            }}>
              <span className="hl-pulse" style={{
                width: 6, height: 6, borderRadius: "50%",
                background: C.onAcid, display: "inline-block", flexShrink: 0,
              }} />
              Disponível para projetos
            </div>
            <div>
              <button
                onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Ir para os projetos"
                style={{
                  marginTop: "clamp(0.7rem, 1.8vh, 1.4rem)",
                  width: 38, height: 38, borderRadius: "50%",
                  background: C.onAcid, color: C.acid, border: "none",
                  cursor: "pointer", fontSize: "1rem", lineHeight: 1,
                }}
              >↓</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Credencial + inventário ──────────────────────────────────── */}
      <div className="hl-hero-grid" style={{
        maxWidth: 1240, width: "100%", margin: "0 auto",
        display: "grid", gap: "clamp(0.7rem, 1.6vh, 1.25rem)",
        gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
        alignItems: "stretch",
      }}>

        {/* Quem. O "3" carrega o painel inteiro: e o unico numero da abertura
            que nao e inventario. Os outros dizem quantas pecas existem; este
            diz ha quanto tempo a pessoa faz isso todo dia, que e a pergunta
            que um recrutador faz primeiro. */}
        <div className="hl-hero-cred" style={{
          background: C.paper, borderRadius: R.panel,
          padding: "clamp(1rem, 2.2vh, 1.6rem) clamp(1.2rem, 2vw, 1.8rem)",
          display: "flex", alignItems: "center",
          gap: "clamp(1rem, 2vw, 1.8rem)", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="hl-cred-num" style={{
              fontFamily: F.display,
              fontSize: "clamp(2.6rem, min(7vw, 7.5vh), 5rem)",
              color: C.acid, lineHeight: 0.82, letterSpacing: "-0.04em",
            }}>3</span>
            <span style={{
              fontFamily: F.display, fontSize: "clamp(0.95rem, 1.9vh, 1.15rem)",
              color: C.acid, letterSpacing: "-0.02em",
            }}>anos</span>
          </div>

          <div style={{ minWidth: "18ch", flex: 1 }}>
            <div className="hl-cred-frase" style={{
              fontSize: "clamp(0.8rem, 1.7vh, 0.9rem)", color: C.ink, fontWeight: 600,
              lineHeight: 1.45, marginBottom: "0.45rem",
            }}>
              construindo a inteligência de dados de um provedor de fibra —
              como único analista da operação
            </div>
            <div className="hl-hero-setores" style={{
              fontFamily: F.ui, fontSize: "clamp(0.63rem, 1.3vh, 0.7rem)",
              letterSpacing: "0.04em", color: C.ink3, lineHeight: 1.5,
            }}>
              {SETORES}
            </div>
          </div>
        </div>

        {/* O que. */}
        <div className="hl-hero-inv" style={{
          background: C.paper, borderRadius: R.panel,
          padding: "clamp(1rem, 2.2vh, 1.6rem) clamp(1.2rem, 2vw, 1.8rem)",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            fontFamily: F.ui, fontSize: "clamp(0.64rem, 1.3vh, 0.72rem)",
            letterSpacing: "0.1em", textTransform: "uppercase", color: C.ink3,
            marginBottom: "clamp(0.55rem, 1.4vh, 0.9rem)",
          }}>
            Este portfólio conta com
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {INVENTARIO.map((t) => (
              <span key={t} className="hl-chip" style={{
                fontSize: "clamp(0.64rem, 1.3vh, 0.72rem)", color: C.ink2, fontFamily: F.ui,
                border: "1px solid rgba(212,247,74,0.28)",
                borderRadius: R.chip, padding: "0.28rem 0.7rem",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
