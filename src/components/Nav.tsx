import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { C, F } from "../theme";

const NAV_ITEMS = [
  { label: "Sobre",       id: "sobre" },
  { label: "Stack",       id: "habilidades" },
  { label: "Projetos",    id: "projetos" },
  { label: "Experiência", id: "experiencia" },
];

export function Nav() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={scrolled ? "hl-scrolled" : ""}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 3rem", background: "transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <a href="#hero" style={{
        fontFamily: F.ui,
        fontSize: "1.15rem", fontWeight: 700, letterSpacing: "0.02em",
        color: C.ink, textDecoration: "none",
      }}>
        HL<span style={{ color: C.acid2 }}>.</span>data
      </a>

      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => go(item.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.82rem", letterSpacing: "0.06em",
                color: C.ink3, fontFamily: F.ui,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.ink3)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => go("contato")}
        style={{
          fontFamily: F.ui,
          fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.06em",
          background: C.ink, color: C.bg,
          padding: "0.65rem 1.4rem", border: "none", cursor: "pointer",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = C.acid; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.color = C.bg; }}
      >
        Contato →
      </button>

      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", color: C.ink3, padding: "0.25rem",
        }}
        className="hl-mobile-toggle"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(20,28,13,0.98)", padding: "1.5rem 3rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {[...NAV_ITEMS, { label: "Contato", id: "contato" }].map((item) => (
            <button key={item.id} onClick={() => go(item.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.9rem", color: C.ink3, textAlign: "left",
                fontFamily: F.ui, padding: "0.25rem 0",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
