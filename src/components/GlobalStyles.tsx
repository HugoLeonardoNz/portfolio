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
      /* O hero e' um cartaz: no celular a foto entre duas colunas de texto
         nao cabe. Vira uma coluna e o selo giratorio sai — ele e' assinatura,
         nao conteudo. */
      @media (max-width: 860px) {
        .hl-hero-grid  { grid-template-columns: minmax(0, 1fr) !important; }
        .hl-sobre-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 3rem !important; }

        /* A grade de DENTRO do bloco lima nao colapsava: as tres colunas
           (texto | foto | status) continuavam lado a lado no celular e a
           coluna de texto virava uma palavra por linha. Vira pilha, com a
           foto subindo para o topo — ela e o que ancora a leitura. */
        #hero {
          padding-top: 3.25rem !important;
          padding-bottom: 0.9rem !important;
          gap: 0.5rem !important;
        }
        .hl-hero-inner {
          grid-template-columns: minmax(0, 1fr) !important;
          gap: 0.9rem !important;
          margin-top: 0.25rem !important;
        }
        .hl-hero-photo {
          order: -1;
          width: clamp(120px, 34vw, 165px) !important;
          /* -14vw cobria a palavra LEONARDO inteira. O suficiente para a foto
             encostar na tipografia sem apaga-la. */
          margin: -5vw auto 0.1rem !important;
        }

        /* O paragrafo do bloco lima e a linha de setores dizem, em outras
           palavras, o que o painel "3 anos" logo abaixo ja diz. No desktop os
           dois cabem e um reforca o outro; no celular a repeticao custa ~120px
           e empurra o inventario para fora da dobra. Some o eco, fica o
           original. */

        /* O painel do inventario e o mais alto da dobra no celular: cinco
           chips que quebram em quatro linhas. Corpo e respiro menores custam
           legibilidade zero num rotulo de duas palavras e devolvem ~50px. */
        .hl-hero-cred,
        .hl-hero-inv     { padding: 0.85rem 1rem !important; }
        .hl-chip         { font-size: 0.62rem !important; padding: 0.2rem 0.55rem !important; }
        .hl-cred-num     { font-size: 2.4rem !important; }
        .hl-cred-frase   { font-size: 0.82rem !important; line-height: 1.35 !important; }
        /* O nome vazava do bloco lima em TODA largura de celular — a
           medida em vw nao descontava a calha do rail nem os paddings, entao
           "LEONARDO" era cortado pelo overflow do bloco. Aqui o coeficiente e
           calculado para a largura que sobra de verdade. */
        .hl-hero-nome { font-size: clamp(1.75rem, min(9.4vw, 15.5vh), 9.5rem) !important; }
        .hl-hero-lead    { display: none !important; }
        .hl-hero-setores { display: none !important; }
        .hl-hero-left  { padding-bottom: 0 !important; }
        .hl-hero-right {
          justify-self: stretch !important; text-align: left !important;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
        }
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
      /* 6.5rem (104px) de calha comia 27% da largura de um celular de 390px:
         com o rail compacto ocupando ate x=70, sobravam 24px de folga paga
         pelo conteudo. 5.25rem ainda livra o rail e devolve 20px ao texto. */
      section { padding-left: 5.25rem !important; }
      /* Celular estreito (Android de 360px e afins): o ultimo aperto para a
         abertura caber na dobra sem scroll. Abaixo de ~360x600 nao ha layout
         possivel com esse conteudo — la a abertura rola, e tudo bem. */
      @media (max-width: 400px) {
        .hl-hero-photo { width: clamp(104px, 30vw, 148px) !important; margin-top: -4vw !important; }
        .hl-hero-inner { gap: 0.6rem !important; }
        .hl-hero-cred,
        .hl-hero-inv   { padding: 0.75rem 0.9rem !important; }
      }
      @media (max-width: 340px) {
        .hl-hero-nome { font-size: 8.6vw !important; }
      }

      @media (min-width: 1100px) {
        section { padding-left: 15.5rem !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
}
