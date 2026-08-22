import { C, F } from "../../theme";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: F.display,
      fontSize: "clamp(2.3rem, 4.6vw, 4.2rem)", fontWeight: 400,
      lineHeight: 1.02, letterSpacing: "-0.03em", color: C.ink,
    }}>
      {children}
    </h2>
  );
}
