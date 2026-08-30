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
 *
 * REGRA DE ESCASSEZ (2026-08-27): o lima parou de ser distribuído por toda a
 * página. Ele estava em toda ênfase de título, todo marcador de lista, todo
 * rótulo e todo chip — quando um acento aparece em tudo, ele deixa de acentuar
 * e vira só a cor do site. Agora o lima marca três coisas e nada mais:
 * SUPERFÍCIE (o bloco do hero), ESTADO (a seção em que você está, o link sob o
 * cursor) e PROCEDÊNCIA (o selo que diz de onde veio o dado). Título de seção
 * não usa lima; a ênfase ali vem de tamanho e peso.
 */
export const C = {
  bg:      "#141c0d",   // verde-floresta quase preto
  bg2:     "#1e2a12",   // um degrau acima, para separar sem borda
  paper:   "#1a2410",   // superfície de cartão
  darkAlt: "#0e150a",   // faixa mais funda (rodapé, projetos)

  ink:     "#eef5c8",   // creme — texto principal
  ink2:    "#c3d093",   // secundário
  ink3:    "#8a9470",   // rótulo, legenda, meta

  acid:    "#d4f74a",   // lima — o acento
  acid2:   "#b8e02f",   // lima mais fechado, para hover e segunda série
  onAcid:  "#141c0d",   // texto sobre superfície lima

  /** Fio de separação. Uma medida só no site inteiro: antes havia
   *  rgba(255,255,255,0.05), 0.06, 0.07, 0.08, 0.09, 0.1 e 0.12 espalhados por
   *  sete arquivos, o que é ruído de implementação, não hierarquia. */
  rule:    "rgba(238,245,200,0.10)",
  ruleSoft:"rgba(238,245,200,0.06)",

  grad:    "linear-gradient(135deg, #d4f74a 0%, #b8e02f 55%, #8fbf24 100%)",
  gradSm:  "linear-gradient(135deg, #d4f74a, #b8e02f)",
} as const;

/**
 * Tipografia.
 *
 * `display` é uma grotesca preta usada em corpo grande — o site inteiro se
 * apoia nela. Não há segunda fonte decorativa: o contraste vem do PESO e da
 * ESCALA, não de misturar serifa com sem-serifa.
 *
 * `mono` SUBSTITUIU a Space Grotesk (2026-08-27). Dois motivos. O primeiro é
 * que a Space Grotesk é uma das faces que toda interface gerada usa — ela não
 * diz mais nada sobre quem escolheu. O segundo é que ela estava fazendo um
 * trabalho que não era dela: os rótulos deste site marcam DADO — selo de
 * procedência, quantidade, período, unidade — e dado quer algarismo de largura
 * fixa, que é o que uma mono entrega e uma grotesca não. Aqui a mono não é
 * fantasia de "técnico": ela só aparece onde há medida.
 */
export const F = {
  display: "'Archivo Black', 'Archivo', sans-serif",
  body:    "'Archivo', system-ui, sans-serif",
  mono:    "'Azeret Mono', ui-monospace, monospace",
} as const;

/**
 * Escala de arredondamento.
 *
 * A linguagem é de bloco — superfícies cheias, empilhadas. Raio zero leria
 * como erro, não como escolha.
 *
 * FECHADA UM DEGRAU (2026-08-27). O painel estava em 28px e o controle em
 * 16px: nesse raio um cartão perde o canto e vira a caixa arredondada padrão
 * que toda interface gerada empilha. O bloco do hero continua generoso porque
 * ele É o cartaz e é único na página; o resto ficou mais firme.
 */
export const R = {
  chip:  999,  // pílula — reservada ao selo com marcador redondo
  ctrl:  10,   // campo, item de menu
  panel: 18,   // cartão e painel
  hero:  32,   // o bloco de abertura, único no site
} as const;

/**
 * Uma escala de espaço, em rem.
 *
 * Existia à mão em cada arquivo: 6rem de seção aqui, 4rem de título ali,
 * 2.5rem de grade acolá, sem nenhuma relação entre os três. Isso é o que faz
 * uma página parecer montada em vez de composta.
 */
export const S = {
  section:   "clamp(4.5rem, 9vh, 7.5rem)",  // respiro vertical de seção
  gutter:    "clamp(1.25rem, 4vw, 3.5rem)", // margem lateral
  head:      "clamp(2.5rem, 5vh, 4rem)",    // do título ao conteúdo
  /**
   * Caixa de conteúdo. UMA medida, usada por TUDO — inclusive pela barra de
   * navegação.
   *
   * Era 1240. Dois defeitos vinham daí, e o Hugo apontou os dois:
   *
   * 1. DESALINHAMENTO. A barra superior usava a borda da tela (`padding` de
   *    56px) enquanto o conteúdo usava a caixa centrada. Numa tela de 1920 o
   *    nome na barra começava em x=56 e o título da seção logo abaixo começava
   *    em x=335 — 279px de desencontro entre dois elementos que o olho lê como
   *    uma coluna só. Agora a barra mora na mesma caixa, então a borda esquerda
   *    do site é uma linha só de cima a baixo.
   *
   * 2. VAZIO. 1240 numa tela de 1920 deixa 340px mortos de cada lado: 35% da
   *    tela sem uso. 1600 devolve essa área e ainda mantém 160px de margem —
   *    margem de página, não desfiladeiro.
   *
   * Alargar a caixa sozinho não resolve: texto tem medida legível e não pode
   * simplesmente esticar. Por isso cada seção foi REDISTRIBUÍDA em colunas que
   * ocupam a largura nova, em vez de ganhar mais margem ao lado do mesmo texto.
   */
  maxw:      1600,
  /** Medida de leitura. Acima disso o olho perde o começo da linha seguinte. */
  medida:    "72ch",
} as const;
