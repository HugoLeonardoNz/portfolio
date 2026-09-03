import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Expand, X } from "lucide-react";
import { C, F } from "../../theme";

/**
 * Foto do hero, clicável.
 *
 * A miniatura no cartaz é pequena de propósito — ela existe para compor a
 * tipografia, não para mostrar o rosto em detalhe. Isso cria uma dívida: quem
 * quer ver a foto de verdade não tinha onde. Este componente cobre essa
 * dívida sem tocar no recorte do hero: ele SÓ envolve a miniatura com um
 * gatilho de clique; o círculo, a sombra, o `object-position` continuam
 * inteiramente definidos por quem o usa.
 *
 * DECISÕES:
 *
 * - `createPortal` no `document.body`, não um `position: fixed` no lugar. O
 *   hero tem `overflow: hidden` (é o que corta a foto no canto do cartaz) —
 *   um overlay fixo nascido ali dentro herdaria esse corte no Safari, que
 *   trata `overflow` do ancestral como limite de empilhamento em alguns
 *   casos. Portal evita depender desse detalhe.
 *
 * - O recorte no popup continua CIRCULAR, na mesma proporção do hero, só que
 *   grande. Uma foto quadrada solta romperia a identidade visual que o resto
 *   do site constrói em torno do círculo (ver Hero.tsx) — o popup é a mesma
 *   peça, ampliada, não uma peça nova.
 *
 * - Fecha em Esc, em clique fora e no X. Três saídas redundantes porque é
 *   assim que lightbox se comporta em qualquer lugar da web — a única
 *   surpresa aceitável aqui é a foto grande, não o gesto para sair dela.
 *
 * - `document.body.style.overflow = "hidden"` enquanto aberto. Sem isso a
 *   página por trás rola junto com a roda do mouse sobre a imagem, o que em
 *   telas altas expõe uma faixa do hero por baixo do backdrop e quebra a
 *   ilusão de estar "por cima" de tudo.
 */

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export function PhotoLightbox({ src, alt, children }: Props) {
  const [aberto, setAberto] = useState(false);
  const gatilhoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", onKey);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflowAnterior;
      // Devolve o foco para quem abriu o popup — sem isso o teclado "perde"
      // a posição na página depois de fechar.
      gatilhoRef.current?.focus();
    };
  }, [aberto]);

  return (
    <>
      <button
        ref={gatilhoRef}
        onClick={() => setAberto(true)}
        aria-label={`Ver ${alt} em tamanho maior`}
        className="hl-foto-gatilho"
        style={{
          all: "unset", cursor: "zoom-in", display: "block",
          width: "100%", height: "100%", position: "relative",
        }}
      >
        {children}
        {/* Véu que cobre a foto inteira no hover/foco — não um selo de canto.
            O container é o próprio círculo recortado (`overflow: hidden`);
            qualquer elemento que sangre para fora dele desaparece cortado
            pela máscara, que era o defeito de um selo posicionado no canto. */}
        <span
          aria-hidden
          className="hl-foto-lupa"
          style={{
            position: "absolute", inset: 0,
            background: "rgba(20,28,13,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "0.35rem",
            opacity: 0, transition: "opacity 200ms ease",
          }}
        >
          <span style={{
            width: 40, height: 40, borderRadius: "50%",
            background: C.acid, color: C.onAcid,
            display: "grid", placeItems: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
          }}>
            <Expand size={17} aria-hidden />
          </span>
        </span>
      </button>

      {aberto && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setAberto(false)}
          className="hl-lightbox-backdrop"
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(10,15,7,0.88)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(1.5rem, 6vw, 4rem)",
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setAberto(false); }}
            aria-label="Fechar"
            className="hl-toque"
            style={{
              position: "fixed", top: "clamp(1rem, 3vw, 2rem)", right: "clamp(1rem, 3vw, 2rem)",
              width: 44, height: 44, borderRadius: "50%",
              background: C.paper, color: C.ink,
              boxShadow: `inset 0 0 0 1px ${C.rule}`,
              border: "none", cursor: "pointer",
              display: "grid", placeItems: "center",
            }}
          >
            <X size={20} aria-hidden />
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="hl-lightbox-fig"
            style={{
              margin: 0, cursor: "default",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "1.1rem",
            }}
          >
            <div
              style={{
                width: "min(58vh, 62vw, 480px)", aspectRatio: "1 / 1",
                borderRadius: "50%", overflow: "hidden",
                boxShadow: `0 0 0 10px ${C.paper}, 0 0 0 11px ${C.rule}, 0 40px 90px rgba(0,0,0,0.55)`,
              }}
            >
              <img
                src={src} alt={alt}
                style={{
                  width: "100%", height: "100%", display: "block",
                  objectFit: "cover", objectPosition: "center top",
                }}
              />
            </div>
            <figcaption style={{
              fontFamily: F.mono, fontSize: "0.68rem", letterSpacing: "0.08em",
              color: C.ink3, textTransform: "uppercase",
            }}>
              Esc ou clique fora para fechar
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </>
  );
}
