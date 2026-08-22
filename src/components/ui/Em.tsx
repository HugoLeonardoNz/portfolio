import { C } from "../../theme";

/**
 * Ênfase dentro do título de seção.
 *
 * Era `<em>` com itálico e gradiente aplicado ao texto. Duas coisas quebraram
 * com o tema novo:
 *
 * 1. Archivo Black **não tem itálico**. O navegador inclina a romana à força
 *    (oblíquo sintético), e numa grotesca preta em 4rem isso aparece — as
 *    hastes ficam com espessura irregular e as curvas, tortas.
 * 2. Gradiente em letra é efeito, e o tema novo tira a ênfase do efeito e põe
 *    no contraste: creme contra lima, na mesma fonte e no mesmo peso.
 */
export function Em({ children }: { children: React.ReactNode }) {
  return <span style={{ color: C.acid }}>{children}</span>;
}
