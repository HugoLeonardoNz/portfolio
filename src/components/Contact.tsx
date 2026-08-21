import { C, F } from "../theme";
import { Eyebrow } from "./ui/Eyebrow";
import { Em } from "./ui/Em";

export function Contact() {
  const rows = [
    { type: "a"   as const, href: "mailto:hugoworknz@gmail.com",                       label: "Email",    value: "hugoworknz@gmail.com",                     arr: "↗", ext: false },
    { type: "a"   as const, href: "https://linkedin.com/in/hugo-leonardo-data-analyst", label: "LinkedIn", value: "linkedin.com/in/hugo-leonardo-data-analyst", arr: "↗", ext: true  },
    { type: "a"   as const, href: "https://github.com/HugoLeonardoNz",                  label: "GitHub",   value: "github.com/HugoLeonardoNz",                  arr: "↗", ext: true  },
    { type: "div" as const, href: "",                                                    label: "Local",    value: "Santa Luzia, MG — Remoto",                   arr: "→", ext: false },
  ];

  const rowStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "1.2rem",
    padding: "1.4rem 1.8rem", textDecoration: "none", color: C.ink,
    transition: "background 0.2s, padding-left 0.2s",
  };

  return (
    <section id="contato" style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem",
      alignItems: "center", padding: "6rem 3rem",
      background: C.bg, borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div>
        <Eyebrow label="Contato" />
        <h2 style={{
          fontFamily: F.display,
          fontSize: "clamp(3rem, 5vw, 5rem)", fontWeight: 300,
          lineHeight: 1.05, letterSpacing: "-0.01em", color: C.ink,
        }}>
          Vamos<br /><Em>conversar</Em>
        </h2>
        <p style={{ marginTop: "1.5rem", fontSize: "0.95rem", lineHeight: 1.75, color: C.ink3, maxWidth: "40ch" }}>
          Disponível para oportunidades remotas e híbridas como Analista de Dados Pleno ou Sênior.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
        {rows.map((row, i) => {
          const inner = (
            <>
              <span style={{
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: C.acid2, width: "4.5rem", flexShrink: 0,
              }}>
                {row.label}
              </span>
              <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>{row.value}</span>
              <span style={{ marginLeft: "auto", fontSize: "1rem", opacity: 0.3, transition: "opacity 0.2s, transform 0.2s" }}>
                {row.arr}
              </span>
            </>
          );
          const border = i < rows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none";

          return row.type === "a" ? (
            <a key={row.label} href={row.href}
              target={row.ext ? "_blank" : undefined}
              rel={row.ext ? "noopener noreferrer" : undefined}
              style={{ ...rowStyle, borderBottom: border }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,247,74,0.12)"; e.currentTarget.style.paddingLeft = "2.4rem"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "1.8rem"; }}
            >
              {inner}
            </a>
          ) : (
            <div key={row.label} style={{ ...rowStyle, borderBottom: border, cursor: "default" }}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
