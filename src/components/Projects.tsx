import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { C, F, R, S } from "../theme";
import { Telas } from "./ui/Telas";
import { ArquiteturaHug } from "./ui/ArquiteturaHug";
import { SectionHead } from "./ui/SectionHead";
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

  const publicos = PROJECTS.filter((p) => !p.isPrivate).length;

  return (
    <section id="projetos" style={{
      background: C.darkAlt,
      padding: `${S.section} ${S.gutter}`,
    }}>
      <div style={{ maxWidth: S.maxw, margin: "0 auto" }}>
      <SectionHead
        titulo="Projetos"
        resumo="Cada peça abre o repositório onde o número foi apurado. Os selos dizem o que dá para abrir e de onde veio o dado — sintético, observado ou de produção — porque as duas perguntas são diferentes."
        meta={`${PROJECTS.length} projetos · ${publicos} públicos`}
      />

      <div style={{
        display: "flex", flexWrap: "wrap",
        gap: "0.4rem", alignItems: "center", marginBottom: "2.25rem",
      }}>
        <span style={{
          fontFamily: F.mono, fontSize: "0.62rem", letterSpacing: "0.12em",
          textTransform: "uppercase", color: C.ink3, marginRight: "0.6rem",
        }}>
          Filtrar
        </span>
        {[null, ...tecnologias].map((t) => {
          const on = filtro === t;
          return (
            <button
              className="hl-filtro-chip"
              key={t ?? "todos"}
              onClick={() => setFiltro(t)}
              style={{
                fontFamily: F.body,
                fontSize: "0.78rem", fontWeight: on ? 600 : 400,
                padding: "0.35rem 0.75rem", cursor: "pointer",
                color: on ? C.onAcid : C.ink3,
                background: on ? C.acid : "transparent",
                border: `1px solid ${on ? C.acid : C.rule}`,
                borderRadius: 2,
                transition: "color 160ms ease, background 160ms ease, border-color 160ms ease",
              }}
              onMouseEnter={(e) => { if (!on) { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = "rgba(212,247,74,0.45)"; } }}
              onMouseLeave={(e) => { if (!on) { e.currentTarget.style.color = C.ink3; e.currentTarget.style.borderColor = C.rule; } }}
            >
              {t ?? "Todos"}
            </button>
          );
        })}
        <span style={{
          fontFamily: F.mono, fontSize: "0.66rem", color: C.ink3,
          marginLeft: "0.5rem", fontVariantNumeric: "tabular-nums",
        }}>
          {visiveis.length}/{PROJECTS.length}
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
            {/* O numeral gigante "01".."08" que ficava no canto saiu. Ele nao
                numerava nada que o leitor precisasse: a ordem dos cartoes muda
                com o filtro, entao o "05" do churn aparecia em terceiro lugar
                na grade. Numero de secao so se justifica quando a sequencia e
                a informacao — aqui era textura. */}

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
                fontFamily: F.mono, fontSize: "0.62rem", fontWeight: 600,
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
                fontFamily: F.mono, fontSize: "0.62rem", fontWeight: 500,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: C.ink3, border: `1px solid ${C.rule}`,
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
              fontFamily: F.mono, fontSize: "0.68rem", letterSpacing: "0.06em",
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

                   Mas "sem print" nao precisava virar "nada para ver": a FORMA
                   do sistema e o que se avalia numa vaga de dados, e ela nao e
                   confidencial. Entra o diagrama, na mesma proporcao da
                   miniatura para o cartao alinhar com os vizinhos da fileira. */
                <>
                  <ArquiteturaHug />
                  <p style={{
                    fontSize: "0.72rem", color: C.ink3, lineHeight: 1.55,
                    margin: "0.8rem 0 0",
                  }}>
                    <span style={{ color: C.acid }}>Demonstro por chamada.</span>{" "}
                    Roda em produção com dado real de cliente, então não há print
                    nem demo público — mostro ao vivo, com a tela compartilhada.
                  </p>
                </>
              )}

            {/* TAGS em uma linha so: quatro por projeto, definidas em projects.ts.
                Sem o nowrap, um projeto com tag longa abriria uma segunda linha
                e desalinharia o rodape da fileira inteira.

                As quatro molduras de 1px viraram uma corrida separada por
                ponto. Num cartao que ja tem dois selos com borda no topo, mais
                quatro pilulas embaixo davam seis molduras concorrendo com a
                miniatura — que e a coisa que o visitante veio ver. */}
            <p className="hl-proj-tags" style={{
              fontFamily: F.mono, fontSize: "0.64rem", letterSpacing: "0.02em",
              color: C.ink3, margin: "1.1rem 0 1.2rem",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {p.tags.join(" · ")}
            </p>

            {/* `marginTop: auto` empurra o rodape para a base do cartao, entao
                os links de todos os cartoes da fileira ficam na mesma altura. */}
            <div style={{ marginTop: "auto", display: "flex", gap: "1.2rem", alignItems: "center" }}>
              {p.isPrivate ? (
                <span style={{ fontSize: "0.8rem", color: C.ink3 }}>Repositório privado</span>
              ) : (
                <>
                  {/* A seta era o caractere "→" e o hover animava `gap`, que
                      e propriedade de layout: cada quadro do hover forcava o
                      navegador a remedir a linha. Agora e icone desenhado e o
                      deslocamento e `transform`, na camada de composicao. */}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="hl-link-proj"
                      style={{
                        fontSize: "0.82rem", fontWeight: 600,
                        color: C.acid, textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      }}
                    >GitHub <ArrowUpRight size={14} aria-hidden className="hl-link-seta" /></a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="hl-link-proj"
                      style={{
                        fontSize: "0.82rem", fontWeight: 500,
                        color: C.ink3, textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      }}
                    >Ver ao vivo <ArrowUpRight size={14} aria-hidden className="hl-link-seta" /></a>
                  )}
                </>
              )}
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
