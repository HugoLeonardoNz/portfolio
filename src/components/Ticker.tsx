import { C } from "../theme";
import { TICKER_ITEMS } from "../data/content";

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ background: C.darkAlt, padding: "0.9rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: "hl-ticker 25s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "rgba(165,133,255,0.7)",
            padding: "0 2.5rem",
          }}>
            <span style={{ color: C.purple, marginRight: "2.5rem" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
