import { useEffect } from "react";

export function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #0d0c1a;
        color: #f0eeff;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 400;
        overflow-x: hidden;
      }

      @keyframes hl-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.8); }
      }
      @keyframes hl-barfill {
        from { width: 0; }
        to   { width: var(--w, 70%); }
      }
      @keyframes hl-barrise {
        from { height: 0; }
        to   { height: var(--h, 60%); }
      }
      @keyframes hl-ticker {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes hl-fadein {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .hl-pulse     { animation: hl-pulse 2s infinite; }
      .hl-fadein    { animation: hl-fadein 0.7s ease forwards; }
      .hl-fadein-d  { animation: hl-fadein 0.7s 0.15s ease forwards; opacity: 0; }

      nav.hl-scrolled {
        background: rgba(13,12,26,0.95) !important;
        backdrop-filter: blur(8px) !important;
        border-bottom: 1px solid rgba(255,255,255,0.06) !important;
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #0d0c1a; }
      ::-webkit-scrollbar-thumb { background: rgba(124,91,245,0.35); }
      ::-webkit-scrollbar-thumb:hover { background: rgba(124,91,245,0.55); }

      /* O rail lateral ocupa 210px a partir de 1100px; o conteudo desvia para
         nao passar por baixo dele. Abaixo disso o rail some e nao ha desvio. */
      @media (min-width: 1100px) {
        section { padding-left: 15rem !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
}
