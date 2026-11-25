/**
 * Tokens da repaginada de 25/11/2026: preto, tinta clara quente e um acento só,
 * o azul da logo (#2F6BD8, escolhido pelo Hugo entre seis tons).
 *
 * REGRA DO ACENTO. O azul sobre o preto não passa contraste de texto
 * (2,6:1), então ele nunca é cor de letra. Ele é TRAÇO (a logo, o fio que se
 * desenha sob cada título, a linha da trajetória, o sublinhado de link) e
 * SUPERFÍCIE (o botão principal, com texto branco a 6,9:1). Texto é sempre
 * tinta.
 *
 * Os nomes das chaves são os mesmos da versão anterior de propósito: os
 * componentes de `ui/` (galeria de telas, popup, diagrama do HUG) leem daqui e
 * mudaram de cara sem mudar de código.
 */
export const C = {
  bg:      "#0b0a0a",   // preto quente, nunca #000
  bg2:     "#131111",
  paper:   "#141212",   // superfície de cartão e painel
  darkAlt: "#0f0d0d",   // fundo das telas dos projetos

  ink:     "#ede8e3",   // texto principal
  ink2:    "#b3aca6",   // secundário
  ink3:    "#87807a",   // rótulo e meta (4,9:1 sobre o fundo)

  acid:    "#2f6bd8",   // azul, o acento (nome antigo mantido para os componentes ui)
  acid2:   "#4a83e8",   // azul um degrau mais claro, para hover
  onAcid:  "#ffffff",

  rule:    "rgba(237,232,227,0.10)",
  ruleSoft:"rgba(237,232,227,0.06)",

  grad:    "#2f6bd8",
  gradSm:  "#2f6bd8",
} as const;

export const F = {
  display: "'Archivo', system-ui, sans-serif",
  body:    "'Archivo', system-ui, sans-serif",
  mono:    "'Geist Mono', ui-monospace, monospace",
} as const;

/** Cantos firmes: o site é de linha, não de cartão inflado. */
export const R = {
  chip:  999,
  ctrl:  4,
  panel: 6,
  hero:  6,
} as const;

export const S = {
  section: "clamp(5rem, 12vh, 9rem)",
  gutter:  "clamp(1.25rem, 4vw, 3.5rem)",
  head:    "clamp(2.5rem, 6vh, 4.5rem)",
  maxw:    1440,
  medida:  "68ch",
} as const;
