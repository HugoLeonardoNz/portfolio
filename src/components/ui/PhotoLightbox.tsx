import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { C, F, R } from "../../theme";

/**
 * Tela de projeto, clicável — abre em tamanho grande.
 *
 * Existe para o carrossel de `Telas.tsx`: a miniatura ali cabe numa grade de
 * cartões e é pequena de propósito; quem quer examinar o rótulo de um eixo ou
 * ler uma tabela precisa de mais espaço do que um cartão permite.
 *
 * DECISÕES:
 *
 * - `createPortal` no `document.body`, não um `position: fixed` no lugar. O
 *   cartão de projeto vive dentro de grades com `overflow` variado; portal
 *   evita depender de nenhum ancestral não vazar esse detalhe de layout.
 *
 * - O popup usa `object-fit: contain` com cantos retos arredondados (mesma
 *   escala de `R.panel` do resto do site), não um recorte forçado. As telas
 *   têm proporções diferentes entre si (relatório 16:9, app com barra
 *   lateral, gráfico largo) — o popup respeita a proporção real de cada uma
 *   em vez de impor uma máscara fixa.
 *
 * - O gatilho envolve SÓ a imagem, não o cartão inteiro: o carrossel de
 *   `Telas.tsx` tem setas e pontos de navegação como irmãos absolutos por
 *   cima da imagem, e um `<button>` não pode conter outro elemento
 *   interativo. Por isso o componente recebe a imagem como `children` e
 *   deixa a navegação inteiramente fora dele.
 *
 * - Fecha em Esc, clique fora e no X — três saídas redundantes porque é
 *   assim que lightbox se comporta em qualquer lugar da web.
 */

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  /** Navegação DENTRO do popup. Sem isso, ver a tela 4 de 6 ampliada exigia
   *  fechar, avançar na miniatura e ampliar de novo — três gestos para o que
   *  é uma seta só. Quando vêm, aparecem as setas laterais e as teclas ← →
   *  passam a funcionar com o popup aberto. */
  onAnterior?: () => void;
  onProxima?: () => void;
};

export function PhotoLightbox({ src, alt, children, onAnterior, onProxima }: Props) {
  const [aberto, setAberto] = useState(false);
  const gatilhoRef = useRef<HTMLButtonElement>(null);

  // As setas vivem em ref porque o efeito de teclado não pode ser reescrito a
  // cada troca de tela: `onAnterior`/`onProxima` são funções novas em todo
  // render do carrossel, e listá-las como dependência remontaria o listener
  // (e o `overflow: hidden` do body junto) a cada seta apertada.
  const navRef = useRef({ onAnterior, onProxima });
  navRef.current = { onAnterior, onProxima };

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setAberto(false); return; }
      if (e.key === "ArrowLeft"  && navRef.current.onAnterior) { e.preventDefault(); navRef.current.onAnterior(); }
      if (e.key === "ArrowRight" && navRef.current.onProxima)  { e.preventDefault(); navRef.current.onProxima(); }
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
        {/* Véu que cobre a imagem inteira no hover/foco. */}
        <span
          aria-hidden
          className="hl-foto-lupa"
          style={{
            position: "absolute", inset: 0,
            background: "rgba(20,28,13,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
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

          {/* Setas laterais. Ficam FIXAS na borda da tela, não coladas na
              imagem: as telas têm larguras diferentes entre si, e seta presa
              à imagem pularia de posição a cada troca — justamente durante o
              gesto de clicar várias vezes seguidas. */}
          {[
            { fn: onAnterior, Icone: ChevronLeft,  lado: { left:  "clamp(0.75rem, 2.5vw, 2rem)" }, rot: "Tela anterior" },
            { fn: onProxima,  Icone: ChevronRight, lado: { right: "clamp(0.75rem, 2.5vw, 2rem)" }, rot: "Próxima tela" },
          ].map(({ fn, Icone, lado, rot }) => fn && (
            <button
              key={rot}
              onClick={(e) => { e.stopPropagation(); fn(); }}
              aria-label={rot}
              className="hl-toque hl-lightbox-seta"
              style={{
                position: "fixed", top: "50%", transform: "translateY(-50%)",
                ...lado,
                width: 52, height: 52, borderRadius: "50%",
                background: C.paper, color: C.ink,
                boxShadow: `inset 0 0 0 1px ${C.rule}`,
                border: "none", cursor: "pointer",
                display: "grid", placeItems: "center",
                transition: "background 160ms ease, color 160ms ease",
              }}
            >
              <Icone size={24} aria-hidden />
            </button>
          ))}

          <figure
            onClick={(e) => e.stopPropagation()}
            className="hl-lightbox-fig"
            style={{
              margin: 0, cursor: "default",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "1.1rem", maxWidth: "94vw", maxHeight: "88vh",
            }}
          >
            <div
              style={{
                background: C.darkAlt, borderRadius: R.panel,
                overflow: "hidden",
                boxShadow: `inset 0 0 0 1px ${C.rule}, 0 40px 90px rgba(0,0,0,0.55)`,
                display: "flex",
              }}
            >
              <img
                src={src} alt={alt}
                style={{
                  display: "block",
                  maxWidth: "min(1100px, 90vw)", maxHeight: "80vh",
                  width: "auto", height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
            <figcaption style={{
              fontFamily: F.mono, fontSize: "0.68rem", letterSpacing: "0.08em",
              color: C.ink3, textTransform: "uppercase", textAlign: "center",
            }}>
              {alt}
              {(onAnterior || onProxima) && " · ← → para navegar"}
              {" · Esc para fechar"}
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </>
  );
}
