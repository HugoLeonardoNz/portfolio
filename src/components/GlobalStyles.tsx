import { useEffect } from "react";

export function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #141c0d;
        color: #eef5c8;
        font-family: 'Archivo', 'Inter', system-ui, sans-serif;
        font-weight: 400;
        overflow-x: hidden;
      }

      /* Selecao no acento: detalhe pequeno, mas e o tipo de coisa que separa
         tema aplicado de tema colado por cima. */
      ::selection { background: #d4f74a; color: #141c0d; }
        to   { transform: rotate(360deg); }
      }
      /* O hero e' um cartaz: no celular a foto entre duas colunas de texto
         nao cabe. Vira uma coluna e o selo giratorio sai — ele e' assinatura,
         nao conteudo. */
      @media (max-width: 860px) {
        .hl-hero-grid  { grid-template-columns: minmax(0, 1fr) !important; }
        .hl-sobre-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 3rem !important; }
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
        background: rgba(20,28,13,0.95) !important;
        backdrop-filter: blur(8px) !important;
        border-bottom: 1px solid rgba(255,255,255,0.06) !important;
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #0d0c1a; }
      ::-webkit-scrollbar-thumb { background: rgba(212,247,74,0.35); }
      ::-webkit-scrollbar-thumb:hover { background: rgba(212,247,74,0.55); }

      /* O rail e a unica navegacao e fica sempre visivel: o conteudo abre
         espaco para ele nos dois tamanhos. */
      section, footer { scroll-margin-top: 1.5rem; }
      section { padding-left: 6.5rem !important; }
      @media (min-width: 1100px) {
        section { padding-left: 15.5rem !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
}
