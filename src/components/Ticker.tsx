import { C, F } from "../theme";
import { TICKER_ITEMS } from "../data/content";

/**
 * Faixa de tecnologias.
 *
 * O separador era o caractere "✦" (U+2726). Glifo Unicode no lugar de um
 * elemento desenhado é sorteio: cada sistema resolve com uma fonte de
 * fallback diferente, e o mesmo caractere sai como estrela de quatro pontas
 * fina no macOS, cheia e maior no Windows e ausente em parte dos Android —
 * onde vira o retângulo vazio. Agora é um traço desenhado: mesma medida em
 * toda máquina, e ele participa da paleta.
 *
 * O trilho ganhou classe própria porque a regra de movimento reduzido precisa
 * conseguir PARAR a faixa. Rolagem infinita é o item mais provável de
 * incomodar quem marcou essa preferência no sistema, e antes ela não tinha
 * como ser desligada.
 */
export function Ticker() {
  const dobrado = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      aria-hidden
      style={{
        background: C.darkAlt, padding: "0.85rem 0",
        overflow: "hidden", whiteSpace: "nowrap",
        boxShadow: `inset 0 1px 0 ${C.rule}, inset 0 -1px 0 ${C.rule}`,
      }}
    >
      <div className="hl-ticker-trilho" style={{
        display: "inline-flex", alignItems: "center",
        animation: "hl-ticker 32s linear infinite",
      }}>
        {dobrado.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span aria-hidden style={{
              display: "inline-block", width: 14, height: 1,
              background: C.acid, opacity: 0.8, margin: "0 1.75rem",
            }} />
            <span style={{
              fontFamily: F.mono, fontSize: "0.68rem", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: C.ink2,
            }}>
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
