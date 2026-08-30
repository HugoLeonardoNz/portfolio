import { C, F, S } from "../../theme";

/**
 * Cabeçalho de seção.
 *
 * ESTRUTURA (revista 2026-08-27): título à esquerda, texto de apoio à direita,
 * alinhados pela LINHA DE BASE, com um fio atravessando o topo da seção.
 *
 * Antes o título e o resumo eram empilhados à esquerda, os dois com medida
 * curta. Numa tela de 1920 isso deixava a metade direita do cabeçalho vazia e
 * a seção começava torta: um bloco de texto encostado na margem esquerda com
 * 800px de nada ao lado. Empilhado ainda faz sentido em tela estreita — e é
 * exatamente o que a regra de 900px faz.
 *
 * O alinhamento é por linha de base, não pelo topo das caixas: o título tem
 * corpo de 3,5rem e o resumo, 1rem. Alinhar o topo das duas caixas deixaria o
 * resumo boiando; alinhar a base das primeiras linhas é o que o olho lê como
 * "estas duas coisas começam juntas".
 *
 * O `meta` fica na terceira posição, à direita de tudo, e é sempre medida —
 * contagem, período, unidade.
 */
export function SectionHead({
  titulo,
  resumo,
  meta,
}: {
  titulo: string;
  resumo?: string;
  meta?: string;
}) {
  return (
    <header
      className="hl-head"
      style={{
        display: "grid",
        gridTemplateColumns: resumo ? "minmax(0, 1fr) minmax(0, 44ch)" : "minmax(0, 1fr)",
        gap: "clamp(1.25rem, 4vw, 4rem)",
        alignItems: "baseline",
        marginBottom: S.head,
        paddingTop: "clamp(1.5rem, 3vh, 2.5rem)",
        boxShadow: `inset 0 1px 0 ${C.rule}`,
      }}
    >
      <h2 style={{
        fontFamily: F.display,
        fontSize: "clamp(2rem, 4.4vw, 3.75rem)",
        fontWeight: 400, lineHeight: 0.98, letterSpacing: "-0.04em",
        color: C.ink,
      }}>
        {titulo}
      </h2>

      {resumo && (
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.75rem",
          alignItems: "flex-start",
        }}>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.6, color: C.ink2 }}>
            {resumo}
          </p>
          {meta && (
            <span style={{
              fontFamily: F.mono, fontSize: "0.66rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: C.ink3,
              fontVariantNumeric: "tabular-nums",
            }}>
              {meta}
            </span>
          )}
        </div>
      )}

      {!resumo && meta && (
        <span style={{
          fontFamily: F.mono, fontSize: "0.66rem", letterSpacing: "0.1em",
          textTransform: "uppercase", color: C.ink3,
          fontVariantNumeric: "tabular-nums",
        }}>
          {meta}
        </span>
      )}
    </header>
  );
}
