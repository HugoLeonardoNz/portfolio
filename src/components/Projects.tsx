import { useMemo, useState } from "react";
import { C, F, R } from "../theme";
import { Telas } from "./ui/Telas";
import { Eyebrow } from "./ui/Eyebrow";
import { SectionTitle } from "./ui/SectionTitle";
import { Em } from "./ui/Em";
import { PROJECTS } from "../data/projects";

export function Projects() {
  const [filtro, setFiltro] = useState<string | null>(null);

  // As tecnologias do filtro saem das tags dos próprios projetos, ordenadas por
  // frequência: entra no seletor o que de fato aparece no portfólio, e não uma
  // lista escrita à mão que envelhece sozinha.
  const tecnologias = useMemo(() => {
    const conta = new Map<string, number>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => conta.set(t, (conta.get(t) ?? 0) + 1)));
    return [...conta.entries()]
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, []);

  const visiveis = filtro ? PROJECTS.filter((p) => p.tags.includes(filtro)) : PROJECTS;

  return (
    <section id="projetos" style={{ background: C.darkAlt, padding: "6rem 3rem" }}>
      <Eyebrow label="Portfólio" onDark />
      <SectionTitle>Projetos <Em>em destaque</Em></SectionTitle>

      <div style={{
        marginTop: "2.5rem", display: "flex", flexWrap: "wrap",
        gap: "0.5rem", alignItems: "center",
      }}>
        <span style={{
          fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(195,208,147,0.45)", marginRight: "0.5rem",
        }}>
          Filtrar por
        </span>
        {[null, ...tecnologias].map((t) => {
          const on = filtro === t;
          return (
            <button
              key={t ?? "todos"}
              onClick={() => setFiltro(t)}
              style={{
                fontSize: "0.76rem", fontWeight: on ? 600 : 400, letterSpacing: "0.04em",
                padding: "0.4rem 0.85rem", cursor: "pointer",
                color: on ? C.ink : "rgba(195,208,147,0.6)",
                background: on ? "rgba(212,247,74,0.18)" : "transparent",
                border: `1px solid ${on ? C.acid : "rgba(255,255,255,0.12)"}`,
                transition: "all 0.2s",
              }}
            >
              {t ?? "Todos"}
            </button>
          );
        })}
        <span style={{ fontSize: "0.76rem", color: "rgba(195,208,147,0.4)", marginLeft: "0.4rem" }}>
          {visiveis.length} de {PROJECTS.length}
        </span>
      </div>

      {/* GRADE
          `auto-fill` com mínimo de 380px dá quatro colunas numa tela Full HD
          (1824px úteis / 396 por coluna) e desce sozinho para três, duas e uma.
          Fixar `repeat(4, 1fr)` daria quatro colunas espremidas no notebook.

          `alignItems: stretch` (padrão) mais o cartão em coluna flex é o que faz
          os cartões de uma mesma fileira terem a mesma altura — sem isso, cada
          um para onde o texto acaba e a fileira fica serrilhada. */}
      <div style={{
        marginTop: "2.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
        gap: "1rem",
      }}>
        {visiveis.map((p) => (
          <article key={p.id} style={{
            background: C.paper, borderRadius: R.panel,
            padding: "1.5rem 1.6rem 1.6rem",
            display: "flex", flexDirection: "column",
            position: "relative", overflow: "hidden",
            transition: "background 0.25s, transform 0.25s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,247,74,0.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.paper; e.currentTarget.style.transform = "none"; }}
          >
            {/* Numero de fundo, so decoracao — fica atras de tudo e nao recebe clique. */}
            <span aria-hidden style={{
              position: "absolute", top: "0.8rem", right: "1rem",
              fontFamily: F.display, fontSize: "3.2rem", lineHeight: 1,
              color: "rgba(184,224,47,0.07)", userSelect: "none",
            }}>{String(p.id).padStart(2, "0")}</span>

            {/* Dois selos, e nao um. O da esquerda diz se da para ABRIR o
                projeto; o da direita diz se da para CONFIAR no numero como
                observacao do mundo. Sao perguntas diferentes: "Telecom KPI
                Dashboard" e publico e sintetico ao mesmo tempo. */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "0.4rem",
              alignSelf: "flex-start", position: "relative", zIndex: 1,
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontFamily: F.ui, fontSize: "0.62rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: p.isPrivate ? C.ink3 : C.acid,
                background: p.isPrivate ? "rgba(255,255,255,0.05)" : "rgba(212,247,74,0.12)",
                padding: "0.25rem 0.6rem", borderRadius: R.chip,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: p.isPrivate ? C.ink3 : C.acid,
                }} />
                {p.isPrivate ? "Privado" : "Público"}
              </span>

              <span title="Origem do dado que alimenta o projeto" style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: F.ui, fontSize: "0.62rem", fontWeight: 500,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: C.ink3, border: "1px solid rgba(255,255,255,0.12)",
                padding: "0.25rem 0.6rem", borderRadius: R.chip,
              }}>
                {p.dado}
              </span>
            </div>

            {/* TITULO em duas linhas fixas: com uma linha so, "HUG — Hub
                Unificado de Gestao" quebraria e empurraria tudo abaixo dele. */}
            <h3 style={{
              fontFamily: F.display, fontSize: "1.15rem", lineHeight: 1.2,
              letterSpacing: "-0.02em", color: C.ink,
              margin: "0.9rem 0 0.2rem", minHeight: "2.4em",
              display: "flex", alignItems: "flex-end",
            }}>{p.title}</h3>

            <div style={{
              fontFamily: F.ui, fontSize: "0.68rem", letterSpacing: "0.06em",
              color: C.acid2, marginBottom: "0.7rem",
            }}>{p.tipo}</div>

            {/* DESCRICAO com altura minima de quatro linhas. As descricoes ja
                sao padronizadas em projects.ts entre 180 e 230 caracteres; o
                minHeight garante o alinhamento mesmo se uma quebrar diferente. */}
            <p style={{
              fontSize: "0.8rem", color: "rgba(195,208,147,0.72)",
              lineHeight: 1.65, margin: 0, minHeight: "5.3em",
            }}>{p.description}</p>

            {p.telas
              ? <Telas slug={p.telas.slug} total={p.telas.total} alt={p.title} />
              : (
                /* O HUG roda em producao com dado real de cliente. Nao ha
                   miniatura porque nao existe amostra segura dele — montar uma
                   exigiria anonimizar base inteira, e publicar print de painel
                   interno "so para o portfolio" e o tipo de atalho que este
                   portfolio passou a semana removendo.

                   O bloco usa a MESMA proporcao da miniatura para o cartao
                   alinhar com os vizinhos da fileira. */
                <div style={{
                  marginTop: "1.4rem", background: C.darkAlt, borderRadius: R.ctrl,
                  border: "1px dashed rgba(212,247,74,0.22)",
                  aspectRatio: "16 / 9",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  padding: "1.2rem 1.3rem",
                }}>
                  <div style={{
                    fontFamily: F.ui, fontSize: "0.64rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: C.acid, marginBottom: "0.5rem",
                  }}>Demonstro por chamada</div>
                  <p style={{ fontSize: "0.76rem", color: C.ink3, lineHeight: 1.6, margin: 0 }}>
                    Roda em produção com dado real de cliente, então não há print nem
                    demo público. Mostro ao vivo, com a tela compartilhada.
                  </p>
                </div>
              )}

            {/* TAGS em uma linha so: quatro por projeto, definidas em projects.ts.
                Sem o nowrap, um projeto com tag longa abriria uma segunda linha
                e desalinharia o rodape da fileira inteira. */}
            <div style={{
              display: "flex", gap: "0.35rem", margin: "1.1rem 0 1.2rem",
              overflow: "hidden", flexWrap: "nowrap",
            }}>
              {p.tags.map((t) => (
                <span key={t} style={{
                  fontFamily: F.ui, fontSize: "0.64rem", letterSpacing: "0.03em",
                  color: "rgba(195,208,147,0.55)", whiteSpace: "nowrap",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: R.chip, padding: "0.22rem 0.55rem",
                }}>{t}</span>
              ))}
            </div>

            {/* `marginTop: auto` empurra o rodape para a base do cartao, entao
                os links de todos os cartoes da fileira ficam na mesma altura. */}
            <div style={{ marginTop: "auto", display: "flex", gap: "1.2rem", alignItems: "center" }}>
              {p.isPrivate ? (
                <span style={{ fontSize: "0.8rem", color: C.ink3 }}>Repositório privado</span>
              ) : (
                <>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontFamily: F.ui, fontSize: "0.8rem", fontWeight: 600,
                        color: C.acid, textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "0.45rem",
                        transition: "gap 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.gap = "0.8rem")}
                      onMouseLeave={(e) => (e.currentTarget.style.gap = "0.45rem")}
                    >GitHub →</a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontFamily: F.ui, fontSize: "0.8rem", fontWeight: 500,
                        color: C.ink3, textDecoration: "none",
                      }}
                    >Ver ao vivo →</a>
                  )}
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
