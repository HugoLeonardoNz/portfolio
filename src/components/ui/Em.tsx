import { C } from "../../theme";

export function Em({ children }: { children: React.ReactNode }) {
  return (
    <em style={{
      fontStyle: "italic",
      background: C.gradSm,
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {children}
    </em>
  );
}
