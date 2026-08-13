import { useEffect, useState } from "react";
import { C } from "../theme";

/**
 * Rail vertical fixo à esquerda.
 *
 * Faz três coisas que a barra superior sozinha não fazia: mostra onde a pessoa
 * está na página (scroll spy), mostra quanto falta (barra de progresso) e
 * mantém a navegação sempre visível sem ocupar a faixa do topo.
 *
 * Some abaixo de 1100px — em tela estreita ele roubaria largura do conteúdo, e
 * aí a barra superior assume.
 */

const SECOES = [
  { id: "hero",        label: "Início" },
  { id: "sobre",       label: "Sobre" },
  { id: "servicos",    label: "O que entrego" },
  { id: "habilidades", label: "Stack" },
  { id: "analises",    label: "Análises" },
  { id: "projetos",    label: "Projetos" },
  { id: "experiencia", label: "Experiência" },
  { id: "contato",     label: "Contato" },
];

export function SideRail() {
  const [ativa, setAtiva]       = useState("hero");
  const [progresso, setProg]    = useState(0);
  const [largo, setLargo]       = useState(false);

  useEffect(() => {
    const medir = () => setLargo(window.innerWidth >= 1100);
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  useEffect(() => {
    const aoRolar = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProg(total > 0 ? (window.scrollY / total) * 100 : 0);

      // A seção ativa é a última cujo topo já passou de 40% da viewport.
      const corte = window.innerHeight * 0.4;
      let atual = SECOES[0].id;
      for (const s of SECOES) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= corte) atual = s.id;
      }
      setAtiva(atual);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  if (!largo) return null;

  const ir = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <aside
      aria-label="Navegação da página"
      style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 210, zIndex: 90,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 1.5rem", pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto" }}>
        {SECOES.map((s) => {
          const on = ativa === s.id;
          return (
            <button
              key={s.id}
              onClick={() => ir(s.id)}
              aria-current={on ? "true" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                width: "100%", background: "none", border: "none",
                padding: "0.55rem 0", cursor: "pointer", textAlign: "left",
                color: on ? C.ink : "rgba(196,191,232,0.45)",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = C.ink2; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "rgba(196,191,232,0.45)"; }}
            >
              <span
                style={{
                  display: "block", height: 2, borderRadius: 2,
                  width: on ? 34 : 14,
                  background: on ? C.grad : "rgba(196,191,232,0.35)",
                  transition: "width 0.3s cubic-bezier(.4,0,.2,1), background 0.3s",
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontSize: "0.78rem", letterSpacing: "0.08em",
                fontWeight: on ? 600 : 400, whiteSpace: "nowrap",
              }}>
                {s.label}
              </span>
            </button>
          );
        })}

        <div style={{
          marginTop: "2rem", height: 3, width: 96, borderRadius: 2,
          background: "rgba(255,255,255,0.08)", overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progresso}%`,
            background: C.grad, transition: "width 0.1s linear",
          }} />
        </div>
        <div style={{
          marginTop: "0.5rem", fontSize: "0.68rem",
          letterSpacing: "0.12em", color: "rgba(196,191,232,0.35)",
        }}>
          {Math.round(progresso)}%
        </div>
      </div>
    </aside>
  );
}
