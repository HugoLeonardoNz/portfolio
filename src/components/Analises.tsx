import { useState } from "react";
import { C, F } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { BRECHA, CORES_REGIAO, OPERADORAS, type UF, type Operadora } from "../data/analises";

/**
 * Seção de análises interativas.
 *
 * Um portfólio de dados que só descreve gráficos em texto pede que o avaliador
 * acredite. Aqui os números dos dois projetos de Power BI são redesenhados em
 * SVG, com interação — dá para passar o mouse, trocar de recorte e ver o achado
 * acontecer na tela antes de abrir qualquer repositório.
 *
 * SVG na mão, sem biblioteca de gráfico: são duas visualizações específicas, e
 * uma dependência de ~200 kB para desenhar 26 círculos não se paga.
 */

type Aba = "brecha" | "telecom";
type Eixo = "volume" | "taxa";

const W = 860;
const H = 420;
const PAD = { top: 28, right: 32, bottom: 52, left: 64 };

export function Analises() {
  const [aba, setAba]   = useState<Aba>("brecha");
  const [eixo, setEixo] = useState<Eixo>("volume");
  const [hoverUF, setHoverUF]   = useState<UF | null>(null);
  const [hoverOp, setHoverOp]   = useState<Operadora | null>(null);

  return (
    <section id="analises" style={{ background: C.bg, padding: "6rem 3rem" }}>
      <Eyebrow label="Análises" onDark />
      <SectionTitle>Os dados <Em>na tela</Em></SectionTitle>

      <p style={{
        marginTop: "1.5rem", maxWidth: "58ch", fontSize: "0.95rem",
        lineHeight: 1.9, color: "rgba(195,208,147,0.75)",
      }}>
        Recortes reais dos meus dois projetos de Power BI, redesenhados aqui para
        serem explorados sem baixar nada. Passe o mouse nos pontos.
      </p>

      {/* seletor de recorte */}
      <div style={{ display: "flex", gap: "0.6rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
        {([
          ["brecha",  "Brecha digital · IBGE"],
          ["telecom", "Reclamações · ANATEL"],
        ] as [Aba, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setAba(id)}
            style={{
              fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em",
              padding: "0.6rem 1.1rem", cursor: "pointer",
              color: aba === id ? C.ink : "rgba(195,208,147,0.6)",
              background: aba === id ? "rgba(212,247,74,0.16)" : "transparent",
              border: `1px solid ${aba === id ? C.acid : "rgba(255,255,255,0.12)"}`,
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {aba === "brecha" ? (
        <Brecha eixo={eixo} setEixo={setEixo} hover={hoverUF} setHover={setHoverUF} />
      ) : (
        <Telecom hover={hoverOp} setHover={setHoverOp} />
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Brecha digital: dispersão penetração × população desconectada
   ────────────────────────────────────────────────────────────────────────── */

function Brecha({ eixo, setEixo, hover, setHover }: {
  eixo: Eixo; setEixo: (e: Eixo) => void;
  hover: UF | null; setHover: (u: UF | null) => void;
}) {
  const xMin = 72, xMax = 96;
  const yMax = eixo === "volume" ? 3.3 : 1.0;

  const px = (v: number) => PAD.left + ((v - xMin) / (xMax - xMin)) * (W - PAD.left - PAD.right);
  const py = (v: number) => H - PAD.bottom - (v / yMax) * (H - PAD.top - PAD.bottom);

  const dados = eixo === "volume"
    ? BRECHA
    : BRECHA.map((d) => ({ ...d, semAcesso: (100 - d.penetracao) / 100 }));

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
        {([
          ["volume", "Eixo Y: domicílios sem acesso (milhões)"],
          ["taxa",   "Eixo Y: proporção sem acesso (%)"],
        ] as [Eixo, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setEixo(id)}
            style={{
              fontSize: "0.74rem", padding: "0.45rem 0.9rem", cursor: "pointer",
              color: eixo === id ? C.acid2 : "rgba(195,208,147,0.5)",
              background: "transparent",
              border: `1px solid ${eixo === id ? "rgba(184,224,47,0.5)" : "rgba(255,255,255,0.1)"}`,
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{
        marginTop: "1.5rem", display: "grid",
        gridTemplateColumns: "minmax(0,1fr) 300px", gap: "2rem", alignItems: "start",
      }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: C.paper, padding: "1rem" }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}
               role="img" aria-label="Dispersão de penetração de internet contra população desconectada por estado">
            {/* grade */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = PAD.top + t * (H - PAD.top - PAD.bottom);
              const val = yMax * (1 - t);
              return (
                <g key={t}>
                  <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y}
                        stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                  <text x={PAD.left - 10} y={y + 4} textAnchor="end"
                        fill="rgba(195,208,147,0.45)" fontSize={11}>
                    {eixo === "volume" ? val.toFixed(1) : `${(val * 100).toFixed(0)}%`}
                  </text>
                </g>
              );
            })}
            {[75, 80, 85, 90, 95].map((v) => (
              <text key={v} x={px(v)} y={H - PAD.bottom + 22} textAnchor="middle"
                    fill="rgba(195,208,147,0.45)" fontSize={11}>{v}%</text>
            ))}
            <text x={(W + PAD.left) / 2} y={H - 10} textAnchor="middle"
                  fill="rgba(195,208,147,0.5)" fontSize={11.5}>
              domicílios com internet
            </text>

            {/* pontos */}
            {dados.map((d) => {
              const on = hover?.uf === d.uf;
              const r = eixo === "volume" ? 6 + d.semAcesso * 4.5 : 9;
              return (
                <g key={d.uf}>
                  <circle
                    cx={px(d.penetracao)} cy={py(d.semAcesso)} r={r}
                    fill={CORES_REGIAO[d.regiao]}
                    fillOpacity={on ? 0.95 : 0.6}
                    stroke={on ? "#fff" : CORES_REGIAO[d.regiao]}
                    strokeWidth={on ? 2 : 1}
                    style={{ cursor: "pointer", transition: "fill-opacity 0.15s" }}
                    onMouseEnter={() => setHover(d as UF)}
                    onMouseLeave={() => setHover(null)}
                  />
                  <text x={px(d.penetracao)} y={py(d.semAcesso) - r - 5} textAnchor="middle"
                        fill={on ? C.ink : "rgba(195,208,147,0.55)"}
                        fontSize={on ? 12 : 10.5} fontWeight={on ? 700 : 400}
                        style={{ pointerEvents: "none" }}>
                    {d.uf}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div>
          <div style={{
            border: "1px solid rgba(255,255,255,0.08)", background: C.paper,
            padding: "1.4rem", minHeight: 190,
          }}>
            {hover ? (
              <>
                <div style={{
                  fontFamily: F.display, fontSize: "1.7rem",
                  color: C.ink, lineHeight: 1.1,
                }}>
                  {hover.estado}
                </div>
                <div style={{
                  fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: CORES_REGIAO[hover.regiao], marginTop: "0.3rem",
                }}>
                  {hover.regiao}
                </div>
                <Linha rot="Domicílios com internet" val={`${hover.penetracao.toFixed(1)}%`} />
                <Linha rot="Domicílios sem acesso" val={`${hover.semAcesso.toFixed(2)} mi`} />
                <Linha rot="IDH (2010)" val={hover.idh.toFixed(3)} />
              </>
            ) : (
              <div style={{ fontSize: "0.85rem", color: "rgba(195,208,147,0.55)", lineHeight: 1.8 }}>
                Passe o mouse em um estado para ver os números.
                <br /><br />
                <strong style={{ color: C.ink }}>São Paulo</strong> é o 3º estado em taxa
                de acesso e o <strong style={{ color: C.acid2 }}>1º em gente desconectada</strong>.
                Ranking por percentual e por volume apontam para lugares diferentes.
              </div>
            )}
          </div>

          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {Object.entries(CORES_REGIAO).map(([r, cor]) => (
              <span key={r} style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                fontSize: "0.7rem", color: "rgba(195,208,147,0.6)",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: cor }} />
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Telecom: volume bruto contra volume normalizado por assinante
   ────────────────────────────────────────────────────────────────────────── */

function Telecom({ hover, setHover }: {
  hover: Operadora | null; setHover: (o: Operadora | null) => void;
}) {
  const maxRec = Math.max(...OPERADORAS.map((o) => o.reclamacoes));
  const maxNorm = Math.max(...OPERADORAS.map((o) => o.por100k));

  return (
    <div style={{
      marginTop: "1.5rem", display: "grid",
      gridTemplateColumns: "1fr 1fr", gap: "1.5rem",
    }}>
      {([
        ["Volume bruto", "reclamações no período", (o: Operadora) => o.reclamacoes, maxRec,
         (v: number) => v.toLocaleString("pt-BR")],
        ["Por 100 mil assinantes", "a comparação justa", (o: Operadora) => o.por100k, maxNorm,
         (v: number) => v.toFixed(1).replace(".", ",")],
      ] as const).map(([titulo, sub, get, max, fmt]) => (
        <div key={titulo} style={{
          border: "1px solid rgba(255,255,255,0.08)", background: C.paper, padding: "1.6rem",
        }}>
          <div style={{ fontSize: "0.95rem", color: C.ink, fontWeight: 600 }}>{titulo}</div>
          <div style={{ fontSize: "0.75rem", color: "rgba(195,208,147,0.5)", marginTop: "0.2rem" }}>{sub}</div>

          <div style={{ marginTop: "1.4rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[...OPERADORAS].sort((a, b) => get(b) - get(a)).map((o) => {
              const on = hover?.nome === o.nome;
              return (
                <div key={o.nome}
                     onMouseEnter={() => setHover(o)}
                     onMouseLeave={() => setHover(null)}
                     style={{ cursor: "pointer" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: "0.78rem", marginBottom: "0.3rem",
                    color: on ? C.ink : "rgba(195,208,147,0.7)",
                    fontWeight: on ? 600 : 400,
                  }}>
                    <span>{o.nome}</span>
                    <span>{fmt(get(o))}</span>
                  </div>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                    <div style={{
                      height: "100%", width: `${(get(o) / max) * 100}%`,
                      background: o.cor, borderRadius: 2,
                      opacity: on ? 1 : 0.75,
                      transition: "width 0.5s cubic-bezier(.4,0,.2,1), opacity 0.2s",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{
        gridColumn: "1 / -1", border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(212,247,74,0.06)", padding: "1.5rem 1.8rem",
        fontSize: "0.9rem", lineHeight: 1.9, color: "rgba(195,208,147,0.85)",
      }}>
        <strong style={{ color: C.ink }}>SERCOMTEL é a última em volume e a primeira por assinante</strong> —
        41,5 reclamações a cada 100 mil, contra 9,6 da CLARO. Ranking bruto mede tamanho
        de base; só o número normalizado mede qualidade de serviço.
      </div>
    </div>
  );
}

function Linha({ rot, val }: { rot: string; val: string }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      marginTop: "0.9rem", paddingTop: "0.7rem", borderTop: "1px solid rgba(255,255,255,0.07)",
    }}>
      <span style={{ fontSize: "0.76rem", color: "rgba(195,208,147,0.55)" }}>{rot}</span>
      <span style={{ fontSize: "1rem", color: C.ink, fontWeight: 600 }}>{val}</span>
    </div>
  );
}
