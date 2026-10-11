import { useEffect } from "react";

export function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      /* Archivo (regular + black) para texto e display; Azeret Mono para
         rótulo de dado e algarismo. A Space Grotesk saiu: era a face que toda
         interface gerada usa, e o trabalho dela aqui era medida, não voz. */
      @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=Azeret+Mono:wght@400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #141c0d;
        color: #eef5c8;
        font-family: 'Archivo', system-ui, sans-serif;
        font-weight: 400;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }

      /* --- Superfícies que o navegador desenha ---------------------------
         Seleção, cursor, foco, scrollbar e algarismo saem de fábrica sem dono
         nenhum. São o sinal mais barato de que uma página foi construída e
         não montada, e são os que mais escapam. */

      ::selection { background: #d4f74a; color: #141c0d; }

      /* O track estava em #0d0c1a — azul-arroxeado, resto do tema ROXO que
         este site abandonou. Ficava visível na borda direita de toda rolagem,
         a única superfície da página que não era verde. */
      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-track { background: #0e150a; }
      ::-webkit-scrollbar-thumb {
        background: rgba(212,247,74,0.28);
        border: 3px solid #0e150a;
        border-radius: 999px;
      }
      ::-webkit-scrollbar-thumb:hover { background: rgba(212,247,74,0.5); }
      html { scrollbar-color: rgba(212,247,74,0.28) #0e150a; scrollbar-width: thin; }

      /* Anel de foco do site, não do sistema. O padrão do Chrome é um anel
         branco-azulado que não pertence a esta paleta. */
      :focus-visible {
        outline: 2px solid #d4f74a;
        outline-offset: 3px;
        border-radius: 3px;
      }
      :focus:not(:focus-visible) { outline: none; }

      /* Algarismo em tabela, período, contagem e selo alinham em coluna. */
      time, [data-num] { font-variant-numeric: tabular-nums; }

      a { color: inherit; }

      /* Deslocamento da seta no hover — 'transform', nunca 'gap' ou 'padding':
         os dois últimos são propriedades de layout e forçam o navegador a
         remedir a linha a cada quadro da transição. */
      .hl-canal-seta, .hl-link-seta {
        transition: transform 200ms cubic-bezier(0.16,1,0.3,1), color 200ms ease;
      }
      .hl-canal:hover .hl-canal-seta { transform: translate(3px, -3px); color: #d4f74a; }
      .hl-link-proj:hover .hl-link-seta { transform: translate(3px, -3px); }
      .hl-link-proj:hover { text-decoration: underline; text-underline-offset: 4px; }

      /* --- Âncoras -------------------------------------------------------
         A barra é fixa e tem 78px (ALTURA_BARRA em Topbar.tsx): sem esta
         folga, clicar num item da navegação para a seção COM O TÍTULO ATRÁS
         DA BARRA. */
      section, footer { scroll-margin-top: 94px; }

      /* --- Navegação -----------------------------------------------------
         O rail lateral saiu e, com ele, a regra que empurrava toda seção
         248px para a direita ('padding-left: 15.5rem !important') só para
         desviar dele. O conteúdo voltou a usar a largura inteira da página. */
      @media (max-width: 900px) {
        .hl-barra-nav  { display: none !important; }
        .hl-barra-menu { display: block !important; }
      }
      @media (max-width: 560px) {
        .hl-barra-contato  { display: none !important; }
      }

      /* --- Hero no celular ----------------------------------------------- */
      @media (max-width: 860px) {
        .hl-sobre-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 2.5rem !important; }

        #hero {
          padding-top: 3.75rem !important;
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
          margin: -5vw auto 0.1rem !important;
        }
        .hl-hero-inv     { padding: 0.85rem 1rem !important; }
        .hl-hero-nome    { font-size: clamp(1.75rem, min(11vw, 15.5vh), 9.5rem) !important; }
        .hl-hero-lead    { display: none !important; }
        .hl-hero-left    { padding-bottom: 0 !important; }
      }

      /* --- Hero: uma tela, cartaz compacto (2026-10-09) -------------------
         O hero tem pelo menos a altura da janela e o conteúdo fica CENTRADO
         nela: a seção seguinte não aparece na dobra e o cartaz não precisa
         esticar para preencher. O nome tem tamanho de título, não de outdoor
         — teto de 9rem e 12vh —, e o texto de apoio cola nele. A foto fica no
         canto inferior direito do cartaz, fora do fluxo, para a altura dela
         não abrir um vão entre o nome e o apoio. No celular a foto continua
         na coluna, acima dos ícones. */
      #hero { min-height: 100dvh; justify-content: center !important; }
      @media (min-width: 861px) {
        .hl-hero-nome { font-size: clamp(2.2rem, min(8.5vw, 13vh), 9rem) !important; }
        .hl-acende { padding-top: clamp(1.6rem, 5vh, 3.25rem) !important; }
        .hl-hero-left { padding-bottom: clamp(1.4rem, 5vh, 3.25rem) !important; }
        .hl-hero-inner { display: block !important; margin-top: clamp(0.9rem, 2.2vh, 1.5rem) !important; }
        .hl-hero-photo {
          position: absolute !important;
          width: clamp(120px, min(18vw, 27vh), 270px) !important;
          right: clamp(1.4rem, 2.6vw, 2.5rem);
          bottom: clamp(1.4rem, 5vh, 3.25rem);
          margin: 0 !important;
        }
      }
      @media (max-width: 860px) {
        .hl-hero-grid { grid-template-columns: minmax(0, 1fr) !important; }
        .hl-hero-exp  { flex-direction: column !important; align-items: flex-start !important; gap: 0.5rem !important; }
        .hl-hero-painel { padding: 11px 13px !important; }
        /* Como era antes: no celular os setores ficam só no Sobre. */
        .hl-hero-setores { display: none !important; }
      }

      /* --- Colunas -------------------------------------------------------
         A caixa do site tem 1600px. Cada seção usa essa largura em colunas de
         medida legível, e cada regra abaixo é o ponto em que uma dessas
         colunas deixa de caber e precisa virar linha. */

      /* A ficha do Sobre e o trilho de stack da trajetória são as primeiras
         colunas a apertar: são as mais estreitas e as menos essenciais. */
      @media (max-width: 1280px) {
        .hl-sobre-grid {
          grid-template-columns: repeat(2, minmax(0,1fr)) !important;
        }
        .hl-sobre-entrada { grid-column: 1 / 3 !important; }
        .hl-ficha { grid-column: 1 / 3 !important; grid-row: auto !important; }
        .hl-exp { grid-template-columns: minmax(0, 10rem) minmax(0,1fr) !important; }
        .hl-exp-stack { grid-column: 2 !important; display: flex !important; flex-wrap: wrap; gap: 0 1rem; padding-top: 0.75rem !important; }
      }

      @media (max-width: 1020px) {
        .hl-col-4    { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        .hl-entregas { grid-template-columns: minmax(0,1fr) !important; }
        /* Em coluna única o fio volta a separar TODOS os itens menos o
           primeiro — na grade de duas colunas os dois primeiros abriam coluna. */
        .hl-entregas > .hl-def       { box-shadow: inset 0 1px 0 rgba(238,245,200,0.06) !important; }
        .hl-entregas > .hl-def:first-child { box-shadow: none !important; }
        /* O cabeçalho de seção empilha antes do conteúdo: título grande ao
           lado de um resumo curto só funciona enquanto os dois cabem. */
        .hl-head { grid-template-columns: minmax(0,1fr) !important; gap: 1rem !important; }
      }

      @media (max-width: 860px) {
        .hl-sobre-grid { grid-template-columns: minmax(0,1fr) !important; }
        .hl-sobre-entrada, .hl-ficha { grid-column: 1 !important; }
        .hl-sobre-corpo { grid-column: 1 !important; grid-row: auto !important; }
        /* A calha de data vira linha acima do cargo. */
        .hl-exp { grid-template-columns: minmax(0,1fr) !important; }
        .hl-exp-data { padding-left: 1.25rem !important; margin-bottom: 0.9rem !important; }
        .hl-exp-stack { grid-column: 1 !important; padding-left: 1.25rem !important; }
      }

      @media (max-width: 680px) {
        .hl-col-4 { grid-template-columns: minmax(0,1fr) !important; }
        .hl-def   { grid-template-columns: minmax(0,1fr) !important; gap: 0.6rem !important; }
        .hl-contato-grid { grid-template-columns: minmax(0,1fr) !important; gap: 2.5rem !important; }
      }

      @media (max-width: 400px) {
        .hl-hero-photo { width: clamp(104px, 30vw, 148px) !important; margin-top: -4vw !important; }
        .hl-hero-inner { gap: 0.6rem !important; }
        .hl-hero-inv   { padding: 0.75rem 0.9rem !important; }
      }
      @media (max-width: 340px) {
        .hl-hero-nome { font-size: 8.6vw !important; }
      }

      /* --- Telefone -------------------------------------------------------
         Medido a 382px de largura, no site publicado. Tres defeitos, e o
         primeiro tinha causa mais funda do que parecia:

         1. TEXTO PEQUENO NO SITE INTEIRO. A primeira correcao aqui mexeu no
            hero, porque foi onde eu olhei. Medindo a pagina toda depois,
            eram 116 trechos abaixo de 11px, espalhados por Sobre, Projetos,
            Experiencia, Contato e rodape — nao um bug do hero, e sim a escala
            tipografica inteira: os rotulos mono do site vivem entre 0,60rem e
            0,68rem, o que da 9,6px a 10,9px num telefone. Legivel no monitor,
            nao na mao.

            Por isso a correcao e na RAIZ e nao classe por classe: 118,75% leva
            o rem de 16px para 19px e sobe tudo junto, na proporcao em que a
            escala foi desenhada. Corrigir seletor por seletor daria a mesma
            aparencia e deixaria a proxima tela nova com o mesmo defeito.

            118,75% e o menor valor que zera os trechos abaixo de 11px (o
            menor fica em 11,4px). 125% nao melhora a leitura e so alonga a
            pagina em mais 1.400px.

         2. O HERO PRECISA DE COMPENSACAO. Ele e desenhado para caber em UMA
            tela (100vh), e crescer a raiz em 19% o empurrava para 931px numa
            viewport de 816 — a dobra caia no meio do inventario. As medidas
            estruturais dele passam a px de proposito: px NAO acompanha a raiz,
            entao o texto cresce e a caixa fica. Com isso o hero volta a 816px
            exatos, com o menor texto dele em 12,9px.

         3. ALVO DE TOQUE. O botao "Menu" saia com 34x24 e os icones sociais
            com 34x34. A regua e 44x44 (Apple HIG); abaixo disso o dedo erra, e
            o "Menu" e a navegacao inteira no telefone.

         4. TAG TRUNCADA. A linha de tags do cartao usa 'nowrap' de proposito:
            no desktop impede que um projeto com tag longa abra segunda linha e
            desalinhe o rodape da FILEIRA. No telefone so existe uma coluna —
            nao ha fileira para desalinhar — e o nowrap so cortava "Microsoft
            Fabric" em "Microsoft...". Aqui ele desliga. */
      @media (max-width: 680px) {
        html { font-size: 118.75%; }

        /* Estrutura do hero em px: imune ao aumento da raiz, que e o ponto. */
        #hero {
          padding-top: 54px !important;
          padding-bottom: 10px !important;
          gap: 4px !important;
        }
        .hl-hero-inner { gap: 12px !important; }
        .hl-hero-inv   { padding: 11px 13px !important; }
        .hl-hero-photo { width: 118px !important; margin-top: -14px !important; }

        /* O inventario e a lista mais longa do hero: e ele que decide se a
           secao cabe na tela. 0,68rem = 12,9px, confortavel e suficiente. */
        .hl-hero-inv,
        .hl-hero-inv * { font-size: 0.68rem !important; line-height: 1.55 !important; }

        .hl-proj-tags {
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
          line-height: 1.7 !important;
        }

        .hl-barra-menu { padding: 0.6rem 0.2rem !important; min-height: 44px !important; }
        .hl-toque      { width: 44px !important; height: 44px !important; }
        .hl-filtro-chip { min-height: 42px !important; padding-inline: 0.8rem !important; }

        /* ALVOS DE TOQUE DO CARROSSEL E DOS LINKS DE CARTAO (2026-09-03).
           A regra .hl-toque acima ja existia, mas nenhum destes tres a usava, e
           uma varredura em 320-1920px mediu o estrago no telefone: as setas do
           carrossel a 30x30, os pontos a 20x7 e — o pior — "GitHub" e "Ver ao
           vivo" com 23px de altura. Sao justamente os links que o PRODUCT.md
           chama de sucesso do site ("o tech lead abre pelo menos um
           repositorio"), no dispositivo de onde vem quase todo mundo que chega
           pelo LinkedIn. 44px e o minimo do WCAG 2.5.5.

           O ponto do carrossel cresce so em area CLICAVEL: a barrinha continua
           com 7px de altura, centrada por top/height, porque ela e o indicador
           de posicao e engordar isso vira outro desenho. A transformacao fica de
           fora — ele carrega o scaleX do estado ativo, escrito no componente. */
        .hl-tela-seta   { width: 44px !important; height: 44px !important; }
        .hl-tela-pontos { height: 24px !important; }
        .hl-tela-ponto  {
          width: 24px !important;
          height: 24px !important;
          overflow: visible !important;
        }
        .hl-tela-ponto > span {
          top: 50% !important;
          bottom: auto !important;
          height: 7px !important;
          margin-top: -3.5px;
        }
        .hl-link-proj   {
          min-height: 44px !important;
          align-items: center !important;
        }

        /* O diagrama do HUG cresce e passa a arrastar na horizontal. 520px de
           largura poem os rotulos principais em ~13,8px e os secundarios em
           ~11,1px; abaixo disso o desenho continua ilegivel, acima ele vira
           duas telas de arrasto para uma figura de apoio. */
        .hl-arq {
          overflow-x: auto !important;
          overflow-y: hidden !important;
          aspect-ratio: auto !important;
          -webkit-overflow-scrolling: touch;
        }
        .hl-arq > svg { width: 520px !important; height: 292px !important; flex: none; }
      }

      /* --- Movimento ------------------------------------------------------ */
      @keyframes hl-fadein {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }


      /* --- Movimento: a luz na fibra (src/motion.ts) ----------------------
         UM tema, tirado do trabalho de quem assina a página: a operação que
         o Hugo mede é uma rede de fibra. O cartaz nasce de um fio de luz;
         cada seção começa com a luz correndo no fio do topo; a trajetória
         acende conforme a rolagem.
         Nenhum fade-e-sobe genérico por parágrafo, nada em loop. */

      /* Cartaz: a luz corre no fio (esq.→dir.) e o fio abre em cartaz. */
      .hl-acende { animation: hl-acende 1.15s both; }
      @keyframes hl-acende {
        0%   { clip-path: inset(calc(50% - 1px) 100% calc(50% - 1px) 0 round 2px);
               animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
        42%  { clip-path: inset(calc(50% - 1px) 0 calc(50% - 1px) 0 round 2px);
               animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        100% { clip-path: inset(0 0 0 0 round 32px); }
      }

      /* Nome sobe de dentro de uma máscara, linha a linha. A folga NEGATIVA
         no topo do clip-path deixa passar o agudo do Á (entrelinha 0.92). */
      .hl-linha, .hl-mascara { display: block; clip-path: inset(-0.4em -0.3em 0 -0.3em); }
      .hl-linha > span { display: block; animation: hl-sobe 0.9s cubic-bezier(0.16,1,0.3,1) both; }
      .hl-linha:nth-child(1) > span { animation-delay: 0.62s; }
      .hl-linha:nth-child(2) > span { animation-delay: 0.72s; }
      @keyframes hl-sobe { from { transform: translateY(105%); } to { transform: none; } }

      .hl-entra-foto { animation: hl-foto 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s both; }
      @keyframes hl-foto {
        from { opacity: 0; transform: scale(0.86); filter: blur(6px); }
        to   { opacity: 1; transform: none; filter: none; }
      }
      .hl-entra-apoio { animation: hl-fadein 0.7s cubic-bezier(0.16,1,0.3,1) 0.95s both; }
      .hl-entra { animation: hl-fadein 0.7s cubic-bezier(0.16,1,0.3,1) both; }
      .hl-hero-grid > .hl-entra:nth-child(1) { animation-delay: 1.0s; }
      .hl-hero-grid > .hl-entra:nth-child(2) { animation-delay: 1.08s; }


      /* Faixa de tecnologias (Ticker.tsx). 60s por volta: devagar o bastante
         para ler um nome inteiro sem perseguir. */
      .hl-faixa {
        background: #0e150a; overflow: hidden;
        box-shadow: inset 0 1px 0 rgba(238,245,200,0.10), inset 0 -1px 0 rgba(238,245,200,0.10);
        padding: clamp(1.1rem, 2.4vh, 1.6rem) 0;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
                mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
      }
      .hl-faixa-trilho {
        list-style: none; display: flex; width: max-content;
        animation: hl-faixa 60s linear infinite;
      }
      .hl-faixa:hover .hl-faixa-trilho,
      .hl-faixa.hl-fora .hl-faixa-trilho { animation-play-state: paused; }
      @keyframes hl-faixa { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .hl-faixa-item {
        display: inline-flex; align-items: center; white-space: nowrap;
        font-family: 'Archivo Black', 'Archivo', sans-serif;
        font-size: clamp(1.1rem, 1.9vw, 1.6rem); letter-spacing: -0.02em; line-height: 1;
        color: #c3d093; transition: color 0.2s ease;
      }
      .hl-faixa-item:hover { color: #eef5c8; }
      .hl-faixa-marca {
        width: 7px; height: 7px; background: #d4f74a; transform: rotate(45deg);
        margin: 0 clamp(1.4rem, 2.6vw, 2.5rem); flex-shrink: 0;
      }
      @media (prefers-reduced-motion: reduce) {
        .hl-faixa { -webkit-mask-image: none; mask-image: none; padding-left: 1rem; padding-right: 1rem; }
        .hl-faixa-trilho { animation: none !important; width: auto; flex-wrap: wrap; justify-content: center; row-gap: 0.9rem; }
        .hl-faixa-item[aria-hidden="true"] { display: none; }
      }

      /* Seções: a luz corre no fio do topo e se apaga; o título sobe da
         máscara, no mesmo gesto do nome. Visível por padrão: o estado oculto
         só existe sob html.hl-motion, que o script põe. */
      .hl-head { position: relative; }
      .hl-head-luz {
        position: absolute; left: 0; right: 0; top: 0; height: 1px; pointer-events: none;
        background: linear-gradient(90deg, #d4f74a, #d4f74a 55%, rgba(212,247,74,0));
        transform-origin: left; transform: scaleX(0); opacity: 0;
      }
      html.hl-motion .hl-head.is-in .hl-head-luz { animation: hl-fio-secao 1.5s cubic-bezier(0.65,0,0.35,1) both; }
      @keyframes hl-fio-secao {
        0%   { transform: scaleX(0); opacity: 1; }
        55%  { transform: scaleX(1); opacity: 1; }
        100% { transform: scaleX(1); opacity: 0; }
      }
      .hl-mascara > span { display: block; transition: transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s; }
      .hl-mascara + .hl-mascara > span { transition-delay: 0.2s; }
      html.hl-motion :is(.hl-head, .hl-contato-titulo):not(.is-in) .hl-mascara > span { transform: translateY(105%); }
      .hl-head > div { transition: opacity 0.8s ease 0.35s; }
      html.hl-motion .hl-head:not(.is-in) > div { opacity: 0; }

      /* Cartões de projeto entram como LISTA (cascata curta, uma vez só). */
      html.hl-motion [data-rv]:not(.is-in) { opacity: 0; }
      #projetos article img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
      #projetos article:hover img { transform: scale(1.03); }
      ::view-transition-group(*) { animation-duration: 0.5s; animation-timing-function: cubic-bezier(0.16,1,0.3,1); }
      ::view-transition-old(*), ::view-transition-new(*) { animation-duration: 0.25s; }

      /* Trajetória: o fio lima desce com a rolagem e cada marco acende —
         vira losango — quando a luz chega nele. */
      .hl-trilho-fio {
        position: absolute; left: 0; top: 0; bottom: 0; width: 1px;
        background: #d4f74a; transform-origin: top;
        transform: scaleY(var(--p, 0)); pointer-events: none;
      }
      html.hl-motion .hl-exp-marca {
        background: #3a4626 !important;
        transition: background 0.35s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
      }
      html.hl-motion .hl-exp-marca.aceso { background: #d4f74a !important; transform: rotate(45deg); }
      @media (prefers-reduced-motion: reduce) {
        .hl-trilho-fio { display: none; }
      }

      /* --- Foto do hero em popup ------------------------------------------
         A lupa só aparece no hover/foco — em repouso a miniatura fica limpa,
         igual sempre foi. O popup entra com um leve zoom-in: nasce um pouco
         menor que o tamanho final, porque "aparecer" comunica origem melhor
         que só desvanecer (a foto vem DA miniatura, não do nada). */
      .hl-foto-gatilho:hover .hl-foto-lupa,
      .hl-foto-gatilho:focus-visible .hl-foto-lupa { opacity: 1 !important; }

      @keyframes hl-lightbox-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes hl-lightbox-fig-in {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
      }
      .hl-lightbox-backdrop { animation: hl-lightbox-in 200ms ease forwards; }
      .hl-lightbox-fig      { animation: hl-lightbox-fig-in 260ms cubic-bezier(0.16,1,0.3,1) forwards; }

      /* Sai de um estado JÁ VISÍVEL: se o script falhar ou a animação não
         disparar, o bloco continua na tela em vez de ficar invisível. */
      .hl-fadein { animation: hl-fadein 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }

      /* O site inteiro tinha movimento perpétuo (a faixa de tecnologias roda
         sem parar) e nenhuma regra de redução. Quem marca "reduzir movimento"
         no sistema está pedindo por um motivo — enxaqueca, vertigem, déficit
         vestibular — e a faixa era exatamente o tipo de coisa que dispara. */
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
}
