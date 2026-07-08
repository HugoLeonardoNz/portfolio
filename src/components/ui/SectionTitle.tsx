import { C } from "../../theme";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300,
      lineHeight: 1.05, letterSpacing: "-0.01em", color: C.ink,
    }}>
      {children}
    </h2>
  );
}
