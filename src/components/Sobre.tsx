import { C, F, S } from "../theme";
import { SectionHead } from "./ui/SectionHead";
import { ABOUT_TEXT_STRINGS } from "../data/content";

/**
 * Sobre.
 *
 * REDUNDÂNCIA REMOVIDA (2026-08-27). Esta seção tinha, à direita, uma grade de
 * seis "Principais competências". Logo abaixo, "O que entrego" listava seis
 * serviços com os mesmos nomes; e abaixo dele, "Stack técnica" listava
 * dezesseis ferramentas das mesmas famílias. A página dizia a mesma coisa em
 * três níveis de detalhe e em três formatos de caixa. No lugar entrou uma
 * FICHA, que responde as perguntas de triagem — desde quando, onde, em que
 * regime, formação — com valores que já estavam publicados em outras seções.
 *
 * DISPOSIÇÃO (revista 2026-08-27). Era uma coluna de texto travada em 62ch ao
 * lado da ficha: numa tela de 1920 a coluna de texto tinha 1100px de largura
 * disponível para um parágrafo de 640px, e sobravam 460px de vazio DENTRO da
 * própria coluna. Agora a entrada abre em corpo grande sobre duas colunas, o
 * corpo desce em duas colunas de ~46ch e a ficha ocupa a terceira. Três
 * medidas legíveis lado a lado usam a tela inteira sem esticar linha nenhuma —
 * que é a diferença entre "preenchido" e "largo demais".
 */

const FICHA = [
  { rotulo: "Desde",    valor: "Fev 2023" },
  { rotulo: "Onde",     valor: "Speed Fibra · Santa Luzia, MG" },
  { rotulo: "Cargo",    valor: "Analista de Dados Pleno" },
  { rotulo: "Escopo",   valor: "Toda a inteligência de dados da operação" },
  { rotulo: "Setores",  valor: "6 — Comercial, Financeiro, NOC, Suporte, Projetos, Diretoria" },
  { rotulo: "Formação", valor: "Sistemas de Informação · UNA (em curso)" },
];

export function Sobre() {
  const [entrada, ...resto] = ABOUT_TEXT_STRINGS;

  return (
    <section id="sobre" style={{
      background: C.paper,
      padding: `${S.section} ${S.gutter}`,
    }}>
      <div style={{ maxWidth: S.maxw, margin: "0 auto" }}>
        {/* SEM resumo (2026-09-03). Ele dizia "a resposta longa está no texto,
            quem tem pressa lê a ficha e pula direto para os projetos" — uma
            instrução de leitura, não uma informação. Ninguém vem a um
            portfólio para saber em que ordem ler a página; a entrada logo
            abaixo já abre com a frase mais forte da seção e faz sozinha o
            trabalho que o resumo fingia fazer. */}
        <SectionHead titulo="Quem sou eu" />

        <div
          className="hl-sobre-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 23rem)",
            columnGap: "clamp(2rem, 4vw, 4rem)",
            rowGap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Entrada: atravessa as duas colunas de texto. Três parágrafos do
              mesmo corpo não têm começo — o olho não sabe onde entrar e lê o
              bloco como massa. */}
          <p className="hl-sobre-entrada" style={{
            gridColumn: "1 / 3",
            fontSize: "clamp(1.15rem, 1.5vw, 1.45rem)", lineHeight: 1.5,
            color: C.ink, letterSpacing: "-0.015em",
          }}>
            {entrada}
          </p>

          {resto.map((p, i) => (
            <p key={i} className="hl-sobre-corpo" style={{
              gridColumn: i + 1,
              gridRow: 2,
              fontSize: "1rem", lineHeight: 1.75, color: C.ink2,
            }}>
              {p}
            </p>
          ))}

          {/* Ficha: ocupa as duas linhas da terceira coluna. */}
          <dl className="hl-ficha" style={{ gridColumn: 3, gridRow: "1 / 3" }}>
            {FICHA.map((linha, i) => (
              <div
                key={linha.rotulo}
                style={{
                  display: "grid",
                  gridTemplateColumns: "6.5rem minmax(0, 1fr)",
                  gap: "0.9rem",
                  padding: "0.8rem 0",
                  boxShadow: i === 0 ? "none" : `inset 0 1px 0 ${C.ruleSoft}`,
                }}
              >
                <dt style={{
                  fontFamily: F.mono, fontSize: "0.6rem", fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: C.ink3, paddingTop: "0.2rem",
                }}>
                  {linha.rotulo}
                </dt>
                <dd style={{
                  fontSize: "0.88rem", lineHeight: 1.55, color: C.ink,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {linha.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
