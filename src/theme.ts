/**
 * Paleta — verde-floresta com acento ácido.
 *
 * O tema anterior era roxo sobre quase-preto, com serifa elegante (Cormorant)
 * no display. Bonito e genérico: é o preset de todo portfólio de dev que usa
 * gradiente roxo-ciano. Este substitui por um par de alto contraste — fundo
 * verde escuro, acento lima — e por tipografia de peso, não de elegância.
 *
 * O acento é usado como TINTA, não como enfeite: superfície inteira em lima com
 * texto escuro em cima, do jeito que um cartaz faz. Por isso `onAcid` existe —
 * texto sobre lima nunca é o creme, é o próprio fundo.
 */
export const C = {
  bg:      "#141c0d",   // verde-floresta quase preto
  bg2:     "#1e2a12",   // um degrau acima, para separar sem borda
  paper:   "#1a2410",   // superfície de cartão
  darkAlt: "#0e150a",   // faixa mais funda (rodapé, rail)

  ink:     "#eef5c8",   // creme — texto principal
  ink2:    "#c3d093",   // secundário
  ink3:    "#8a9470",   // rótulo, legenda, meta

  acid:    "#d4f74a",   // lima — o acento
  acid2:   "#b8e02f",   // lima mais fechado, para hover e segunda série
  onAcid:  "#141c0d",   // texto sobre superfície lima

  grad:    "linear-gradient(135deg, #d4f74a 0%, #b8e02f 55%, #8fbf24 100%)",
  gradSm:  "linear-gradient(135deg, #d4f74a, #b8e02f)",
} as const;

/**
 * Tipografia.
 *
 * `display` é uma grotesca preta usada em corpo grande — o site inteiro se
 * apoia nela. Não há segunda fonte decorativa: o contraste vem do PESO e da
 * ESCALA, não de misturar serifa com sem-serifa.
 */
export const F = {
  display: "'Archivo Black', 'Arial Black', sans-serif",
  ui:      "'Space Grotesk', sans-serif",
  body:    "'Archivo', 'Inter', system-ui, sans-serif",
} as const;

/**
 * Escala de arredondamento.
 *
 * Mudou de propósito junto com o tema. A linguagem anterior era de fio e grade,
 * com raio zero: cartão sem superfície própria, separado por um traço de 1px.
 * A nova é de bloco — superfícies cheias, muito arredondadas, empilhadas. Raio
 * zero aqui leria como erro, não como escolha.
 *
 * Continua sendo um degrau por nível de superfície, que é a mesma regra dos
 * relatórios Power BI e dos apps Streamlit do portfólio: o acabamento é
 * assinatura, não tema de cada peça.
 */
export const R = {
  chip:  999,  // pílula: botão, tag, marcador
  ctrl:  16,   // campo, item de menu
  panel: 28,   // cartão e painel
  hero:  36,   // o bloco de abertura, único no site
} as const;
