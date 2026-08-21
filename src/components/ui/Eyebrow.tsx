import { C } from "../../theme";

export function Eyebrow({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <div style={{
      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.14em",
      textTransform: "uppercase", color: onDark ? C.acid : C.acid2,
      marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem",
    }}>
      <span style={{ display: "block", width: "1.5rem", height: "1px", background: onDark ? C.acid : C.acid2 }} />
      {label}
    </div>
  );
}
