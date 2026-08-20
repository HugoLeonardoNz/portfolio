export const C = {
  bg:      "#0d0c1a",
  bg2:     "#1a1830",
  paper:   "#13122a",
  darkAlt: "#09081a",
  ink:     "#f0eeff",
  ink2:    "#c4bfe8",
  ink3:    "#7a7898",
  purple:  "#7c5bf5",
  purple2: "#a585ff",
  cyan:    "#5bc8fa",
  grad:    "linear-gradient(135deg, #7c5bf5 0%, #a585ff 50%, #5bc8fa 100%)",
  gradSm:  "linear-gradient(135deg, #7c5bf5, #a585ff)",
} as const;

/**
 * Escala de arredondamento.
 *
 * A linguagem deste site é de fio e grade: os cartões de projeto não têm
 * superfície própria, são células separadas por um traço de 1px. Isso é
 * escolha, e por isso o raio padrão é zero — arredondar uma célula de grade
 * quebraria a grade.
 *
 * A escala existe para os poucos elementos que TÊM superfície: o rail de
 * navegação, o seletor de tecnologia, o marcador de progresso. Antes eles
 * usavam 14, 8, 2 e 1, escolhidos um a um. É a mesma escala dos relatórios
 * Power BI e dos apps Streamlit do portfólio — o acabamento é assinatura, não
 * tema de cada peça.
 */
export const R = {
  chip:  10,   // marcador, pílula, barra de progresso
  ctrl:  14,   // botão, item de menu
  panel: 20,   // painel com superfície própria
} as const;
