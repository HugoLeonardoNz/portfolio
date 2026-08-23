import { useEffect, useState } from "react";
import { C, R } from "../theme";

/**
 * Navegação vertical — a única do site.
 *
 * A barra horizontal foi removida: duas navegações competindo pela mesma função
 * é ruído, e a fixa no topo ainda cobria o título da seção ao ancorar (era o
 * que fazia o item "Contato" parecer quebrado).
 *
 * O rail tem superfície própria — fundo, borda e sombra — em vez de flutuar
 * solto sobre o conteúdo.
 */

const SECOES = [
  { id: "hero",        label: "Início",       curto: "01" },
  { id: "sobre",       label: "Sobre",        curto: "02" },
  { id: "servicos",    label: "O que entrego", curto: "03" },
  { id: "habilidades", label: "Stack",        curto: "04" },
  { id: "projetos",    label: "Projetos",     curto: "05" },
  { id: "experiencia", label: "Experiência",  curto: "06" },
  { id: "contato",     label: "Contato",      curto: "07" },
];

export function SideRail() {
  const [ativa, setAtiva]    = useState("hero");
  const [progresso, setProg] = useState(0);
  const [largura, setLarg]   = useState(typeof window === "undefined" ? 1400 : window.innerWidth);

  const compacto = largura < 1100;

  useEffect(() => {
    const medir = () => setLarg(window.innerWidth);
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  useEffect(() => {
    const aoRolar = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProg(pct);

      // No fim da página a última seção é a ativa. Sem esse caso, "Contato"
      // nunca acendia: ele é a última seção e, junto com o rodapé, não é alto
      // o bastante para o topo dele cruzar o corte de 40% da viewport.
      if (total > 0 && window.scrollY >= total - 8) {
        setAtiva(SECOES[SECOES.length - 1].id);
        return;
      }

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

  const ir = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="Navegação da página"
      style={{
        position: "fixed", left: compacto ? 12 : 24, top: "50%",
        transform: "translateY(-50%)", zIndex: 90,
        width: compacto ? 58 : 186,
        background: "rgba(26,36,16,0.92)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: R.panel,
        boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
        backdropFilter: "blur(10px)",
        padding: compacto ? "0.9rem 0.5rem" : "1.15rem 0.9rem",
      }}
    >
      {!compacto && (
        <div style={{
          fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(195,208,147,0.4)", padding: "0 0.35rem 0.7rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "0.5rem",
        }}>
          Navegação
        </div>
      )}

      {SECOES.map((s) => {
        const on = ativa === s.id;
        return (
          <button
            key={s.id}
            onClick={() => ir(s.id)}
            title={compacto ? s.label : undefined}
            aria-current={on ? "true" : undefined}
            style={{
              display: "flex", alignItems: "center",
              justifyContent: compacto ? "center" : "flex-start",
              gap: "0.6rem", width: "100%",
              background: on ? "rgba(212,247,74,0.16)" : "transparent",
              border: "none", borderRadius: R.ctrl,
              padding: compacto ? "0.55rem 0" : "0.5rem 0.55rem",
              marginBottom: 2, cursor: "pointer", textAlign: "left",
              color: on ? C.ink : "rgba(195,208,147,0.55)",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!on) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = C.ink2;
              }
            }}
            onMouseLeave={(e) => {
              if (!on) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(195,208,147,0.55)";
              }
            }}
          >
            <span style={{
              display: "block", width: 3, height: 16, borderRadius: R.chip, flexShrink: 0,
              background: on ? C.grad : "rgba(195,208,147,0.22)",
              transition: "background 0.25s",
            }} />
            <span style={{
              fontSize: compacto ? "0.68rem" : "0.79rem",
              letterSpacing: compacto ? "0.02em" : "0.05em",
              fontWeight: on ? 600 : 400, whiteSpace: "nowrap",
            }}>
              {compacto ? s.curto : s.label}
            </span>
          </button>
        );
      })}

      <div style={{
        marginTop: "0.9rem", paddingTop: "0.8rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: "0.55rem",
      }}>
        <div style={{
          flex: 1, height: 3, borderRadius: R.chip,
          background: "rgba(255,255,255,0.09)", overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progresso}%`,
            background: C.grad, transition: "width 0.1s linear",
          }} />
        </div>
        {!compacto && (
          <span style={{ fontSize: "0.64rem", color: "rgba(195,208,147,0.4)", minWidth: 26 }}>
            {Math.round(progresso)}%
          </span>
        )}
      </div>
    </nav>
  );
}
