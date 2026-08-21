import { C, F } from "../theme";

export function Footer() {
  return (
    <footer style={{
      background: C.darkAlt, padding: "2rem 3rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontFamily: F.display, fontSize: "1rem", color: "rgba(184,224,47,0.5)", fontWeight: 300 }}>
        Hugo Leonardo
      </span>
      <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(184,224,47,0.25)" }}>
        Analista de Dados · {new Date().getFullYear()}
      </span>
    </footer>
  );
}
