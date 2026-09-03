import { ArrowUpRight, MapPin } from "lucide-react";
import { C, F, S } from "../theme";

/**
 * Contato.
 *
 * Três correções.
 *
 * 1. As setas eram os caracteres "↗" e "→" digitados no meio do texto. Glifo
 *    Unicode no lugar de ícone renderiza com a fonte de fallback de cada
 *    sistema — traço, peso e alinhamento vertical mudam entre Windows, macOS
 *    e Android, e nenhum deles combina com o resto. Agora são ícones
 *    desenhados, de biblioteca, no mesmo peso de traço.
 *
 * 2. O hover animava `padding-left` de 1.8rem para 2.4rem. Animar padding
 *    força o navegador a recalcular o layout a cada quadro — é a origem do
 *    engasgo em lista longa. O deslocamento agora é `transform` no conteúdo,
 *    que roda na composição e não toca o layout.
 *
 * 3. "Local" era uma linha com aparência de link que não levava a lugar
 *    nenhum, com uma seta apontando para fora. Virou o que é: um dado, com
 *    ícone de lugar, sem afordância de clique.
 */

const CANAIS = [
  { rotulo: "Email",    valor: "hugo@hugonazario.com",                      href: "mailto:hugo@hugonazario.com", externo: false },
  { rotulo: "WhatsApp", valor: "+55 31 97561-5009",                          href: "https://wa.me/5531975615009", externo: true },
  { rotulo: "LinkedIn", valor: "linkedin.com/in/hugo-leonardo-data-analyst", href: "https://linkedin.com/in/hugo-leonardo-data-analyst", externo: true },
  { rotulo: "GitHub",   valor: "github.com/HugoLeonardoNz",                  href: "https://github.com/HugoLeonardoNz", externo: true },
];

const rotuloStyle: React.CSSProperties = {
  fontFamily: F.mono, fontSize: "0.62rem", fontWeight: 500,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: C.ink3, width: "5.5rem", flexShrink: 0,
};

const linhaStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "1.2rem",
  padding: "1.35rem 1.5rem", textDecoration: "none", color: C.ink,
  transition: "background 180ms ease",
};

export function Contact() {
  return (
    <section id="contato" style={{
      background: C.bg,
      padding: `${S.section} ${S.gutter}`,
    }}>
      <div
        className="hl-contato-grid"
        style={{
          maxWidth: S.maxw, margin: "0 auto",
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
          gap: "clamp(2.5rem, 7vw, 6rem)", alignItems: "center",
        }}
      >
        <div>
          <h2 style={{
            fontFamily: F.display,
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 400,
            lineHeight: 0.98, letterSpacing: "-0.04em", color: C.ink,
          }}>
            Vamos<br />conversar
          </h2>
          <p style={{
            marginTop: "1.5rem", fontSize: "1rem", lineHeight: 1.7,
            color: C.ink2, maxWidth: "38ch",
          }}>
            Disponível para oportunidades remotas e híbridas como Analista de
            Dados Pleno ou Sênior.
          </p>
        </div>

        <div style={{ boxShadow: `inset 0 0 0 1px ${C.rule}`, borderRadius: 2 }}>
          {CANAIS.map((canal) => (
            <a
              key={canal.rotulo}
              href={canal.href}
              target={canal.externo ? "_blank" : undefined}
              rel={canal.externo ? "noopener noreferrer" : undefined}
              className="hl-canal"
              style={{ ...linhaStyle, boxShadow: `inset 0 -1px 0 ${C.ruleSoft}` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,247,74,0.09)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={rotuloStyle}>{canal.rotulo}</span>
              <span style={{ fontSize: "0.92rem", overflowWrap: "anywhere" }}>{canal.valor}</span>
              <ArrowUpRight
                size={16}
                aria-hidden
                className="hl-canal-seta"
                style={{ marginLeft: "auto", flexShrink: 0, color: C.ink3 }}
              />
            </a>
          ))}

          <div style={{ ...linhaStyle, cursor: "default" }}>
            <span style={rotuloStyle}>Local</span>
            <span style={{ fontSize: "0.92rem" }}>Santa Luzia, MG — Remoto</span>
            <MapPin size={16} aria-hidden style={{ marginLeft: "auto", flexShrink: 0, color: C.ink3 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
