import { C, F, S } from "../theme";
import { SectionHead } from "./ui/SectionHead";
import { SERVICOS } from "../data/content";

/**
 * O que entrego.
 *
 * ANTES: seis caixas idênticas numa grade 3×2, cada uma com ícone genérico +
 * título + parágrafo + três chips com borda. Dezoito chips, seis ícones e uma
 * moldura de 1px em volta de tudo. É o arranjo mais reconhecível de interface
 * gerada — o cartão como estrutura de página, repetido até preencher a grade,
 * com um ícone escolhido por associação de palavra (banco de dados → cilindro,
 * automação → raio) que não acrescenta nada a quem já leu o título.
 *
 * AGORA: lista de definição. Cada linha tem a competência à esquerda, em
 * corpo grande, e o que ela significa à direita, num texto de medida legível.
 * As tecnologias viraram uma corrida em mono sob o título, separada por
 * ponto — a mesma informação, sem dezoito molduras.
 *
 * A leitura muda de natureza: seis caixas pedem que você varra a grade e
 * compare; uma lista pede que você desça e leia. A segunda é a que serve um
 * avaliador técnico, que não está comparando os itens entre si — está
 * procurando um que reconheça.
 */
export function OQueEntrego() {
  return (
    <section id="servicos" style={{
      background: C.bg,
      padding: `${S.section} ${S.gutter}`,
    }}>
      {/* DUAS COLUNAS de itens, não uma.
          Cada item é curto — um título e uma descrição de duas linhas. Em
          coluna única a seção virava uma fita estreita com metade da tela
          vazia ao lado, e ficavam 1120px de rolagem para ler seis frases.
          Em duas colunas a mesma informação ocupa a largura, cabe quase
          inteira numa tela, e cada descrição mantém ~52ch — dentro da medida
          legível. Alargar a caixa sem redistribuir só teria aumentado o vazio. */}
      <div style={{ maxWidth: S.maxw, margin: "0 auto" }}>
        <SectionHead
          titulo="O que eu entrego"
          resumo="Seis frentes que atendo no dia a dia de um provedor em operação. Não é lista de curso: é o que passa pela minha mesa toda semana."
        />

        <div
          className="hl-entregas"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            columnGap: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          {SERVICOS.map((s, i) => (
            <div
              key={s.title}
              className="hl-def"
              style={{
                display: "grid",
                // 16rem, não 15ch: o rótulo mais longo é "Power BI &
                // Dashboards" (21 caracteres em grotesca preta, ~250px). Com a
                // coluna a 150px os SEIS títulos quebravam em duas linhas, e
                // título quebrado ao lado de descrição de uma linha desalinha
                // a fileira inteira.
                gridTemplateColumns: "minmax(0, 16rem) minmax(0, 1fr)",
                gap: "clamp(1.25rem, 2vw, 2rem)",
                // Pela LINHA DE BASE: o título tem corpo 1,2rem e a descrição
                // 1rem. Alinhar o topo das caixas deixa as duas primeiras
                // linhas em alturas diferentes; alinhar a base, não.
                alignItems: "baseline",
                padding: "1.9rem 0",
                // O fio separa LINHAS da grade, então os dois primeiros itens
                // (que abrem cada coluna) não recebem fio em cima.
                boxShadow: i < 2 ? "none" : `inset 0 1px 0 ${C.ruleSoft}`,
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: F.display, fontSize: "1.2rem",
                  letterSpacing: "-0.02em", lineHeight: 1.15,
                  fontWeight: 400, color: C.ink,
                }}>
                  {s.title}
                </h3>
                <p style={{
                  marginTop: "0.55rem",
                  fontFamily: F.mono, fontSize: "0.66rem", lineHeight: 1.7,
                  letterSpacing: "0.02em", color: C.ink3,
                }}>
                  {s.tags.join(" · ")}
                </p>
              </div>

              <p style={{
                fontSize: "1rem", lineHeight: 1.7, color: C.ink2,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
