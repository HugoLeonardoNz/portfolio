import { C, F, S } from "../theme";
import { SectionHead } from "./ui/SectionHead";
import { EXPERIENCE } from "../data/content";

/**
 * Trajetória.
 *
 * MEDIDA (corrigida 2026-08-27). Os tópicos rodavam de ponta a ponta: numa
 * tela de 1440px a linha do HUG tinha ~175 caracteres. O olho perde o começo
 * da linha seguinte acima de ~90, e a faixa confortável é 65–75. O texto
 * estava lá e ninguém lia até o fim.
 *
 * DISPOSIÇÃO EM TRÊS COLUNAS (2026-08-27). Consertar a medida criou o problema
 * oposto: com os tópicos travados em 74ch e a data alinhada à direita da
 * seção, sobravam ~600px de vazio entre as duas numa tela grande, e a data
 * ficava boiando longe do cargo a que se refere.
 *
 * As três colunas resolvem os dois de uma vez, e são a estrutura que um
 * currículo tem em papel há décadas:
 *
 *   PERÍODO          O QUE FOI FEITO              COM O QUÊ
 *   (calha, mono)    (cargo + tópicos, 72ch)      (trilho de stack)
 *
 * Cada coluna tem trabalho real. A data para de flutuar e vira calha alinhada
 * ao cargo; a stack sai de uma corrida de texto no rodapé e vira lista, que é
 * o formato em que alguém de fato procura uma tecnologia. Nada esticou.
 */

function Item({
  titulo, empresa, periodo, local, topicos, stack, ultimo = false,
}: {
  titulo: string; empresa: string; periodo: string; local?: string;
  topicos?: string[]; stack?: string[]; ultimo?: boolean;
}) {
  return (
    <article
      className="hl-exp"
      style={{
        display: "grid",
        // 13rem na calha: "Jul 2023 — Presente" tem 19 caracteres em mono e
        // não cabia em 11rem menos o recuo — a data quebrava em duas linhas.
        //
        // A coluna do meio é travada na MEDIDA (74ch), não em `1fr`. Com `1fr`
        // ela esticava até o fim da caixa enquanto o texto parava em 72ch, e o
        // trilho de stack era empurrado para a borda direita: sobrava um vão de
        // ~500px NO MEIO da linha, que o olho lê como buraco. Travada na
        // medida, o trilho encosta no texto e a folga que sobra vai toda para a
        // margem direita, onde folga é margem e não buraco.
        gridTemplateColumns: "minmax(0, 13rem) minmax(0, 74ch) minmax(0, 1fr)",
        columnGap: "clamp(1.5rem, 3vw, 3rem)",
        alignItems: "start",
        padding: `0 0 ${ultimo ? "0" : "3.25rem"}`,
        position: "relative",
      }}
    >
      {/* Calha do período. Alinhada pelo topo com o cargo, não com o fim da
          seção: a data pertence ao cargo, e agora encosta nele. */}
      <div className="hl-exp-data" style={{ paddingLeft: "clamp(1.25rem, 2vw, 2rem)", position: "relative" }}>
        <span aria-hidden style={{
          position: "absolute", left: -4, top: "0.5rem",
          width: 7, height: 7, background: C.acid,
        }} />
        <p style={{
          fontFamily: F.mono, fontSize: "0.68rem", letterSpacing: "0.05em",
          color: C.ink, lineHeight: 1.6, fontVariantNumeric: "tabular-nums",
        }}>
          {periodo}
        </p>
        {local && (
          <p style={{
            marginTop: "0.35rem",
            fontFamily: F.mono, fontSize: "0.62rem", letterSpacing: "0.04em",
            color: C.ink3, lineHeight: 1.6,
          }}>
            {local}
          </p>
        )}
      </div>

      {/* Coluna do conteúdo. */}
      <div>
        <h3 style={{
          fontFamily: F.display, fontSize: "clamp(1.25rem, 1.8vw, 1.7rem)",
          fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, color: C.ink,
        }}>
          {titulo}
        </h3>
        <p style={{
          marginTop: "0.45rem", fontSize: "0.92rem", fontWeight: 600,
          letterSpacing: "0.01em", color: C.acid2,
        }}>
          {empresa}
        </p>

        {topicos && (
          <ul style={{ listStyle: "none", marginTop: "1.35rem", maxWidth: S.medida }}>
            {topicos.map((t, i) => (
              <li key={i} style={{
                position: "relative", paddingLeft: "1.35rem",
                marginBottom: "0.85rem",
                fontSize: "0.95rem", lineHeight: 1.7, color: C.ink2,
              }}>
                <span aria-hidden style={{
                  position: "absolute", left: 0, top: "0.72em",
                  width: "0.7rem", height: 1, background: C.ink3,
                }} />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Trilho de stack. Lista, não corrida de texto: quem varre um currículo
          procurando "DAX" acha uma palavra por linha muito mais rápido do que
          dentro de uma frase separada por pontos. */}
      {stack && (
        <ul className="hl-exp-stack" style={{ listStyle: "none", paddingTop: "0.35rem" }}>
          {stack.map((t) => (
            <li key={t} style={{
              fontFamily: F.mono, fontSize: "0.66rem", letterSpacing: "0.04em",
              color: C.ink3, lineHeight: 1.5, paddingBottom: "0.55rem",
            }}>
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Experience() {
  return (
    <section id="experiencia" style={{
      background: C.paper,
      padding: `${S.section} ${S.gutter}`,
    }}>
      <div style={{ maxWidth: S.maxw, margin: "0 auto" }}>
        <SectionHead
          titulo="Trajetória"
          resumo="Entrei júnior e fiquei. O que mudou não foi de empresa — foi o tamanho do que passa por mim."
        />

        {/* A régua vertical fica na seção, não em cada item: assim ela é uma
            linha contínua de cima a baixo, e não três traços emendados. */}
        <div style={{ boxShadow: `inset 1px 0 0 ${C.rule}` }}>
          {EXPERIENCE.map((exp, i) => (
            <Item
              key={i}
              titulo={exp.title} empresa={exp.company}
              periodo={exp.period} local={exp.location}
              topicos={exp.bullets} stack={exp.stack}
            />
          ))}
          <Item
            titulo="Bacharelado em Sistemas de Informação"
            empresa="Centro Universitário UNA"
            periodo="Out 2025 — Out 2028"
            ultimo
          />
        </div>
      </div>
    </section>
  );
}
