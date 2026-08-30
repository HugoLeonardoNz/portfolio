import { C, F, S } from "../theme";

export function Footer() {
  return (
    <footer style={{
      background: C.darkAlt,
      padding: `2.25rem ${S.gutter}`,
      boxShadow: `inset 0 1px 0 ${C.rule}`,
    }}>
      <div style={{
        maxWidth: S.maxw, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        gap: "1.5rem", flexWrap: "wrap",
      }}>
        <span style={{
          fontFamily: F.display, fontSize: "1rem",
          letterSpacing: "-0.02em", color: C.ink2,
        }}>
          Hugo Leonardo
        </span>
        <span style={{
          fontFamily: F.mono, fontSize: "0.64rem", fontWeight: 500,
          letterSpacing: "0.12em", textTransform: "uppercase", color: C.ink3,
          fontVariantNumeric: "tabular-nums",
        }}>
          Analista de Dados · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
