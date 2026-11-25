/**
 * Cabeçalho de seção: título grande e o fio rubi que se
 * desenha da esquerda para a direita quando a seção entra na tela. É o mesmo
 * gesto da logo (traço de caneta), repetido como a única ornamentação do site.
 */
type Props = { titulo: string; nota?: string };

export function SectionHead({ titulo, nota }: Props) {
  return (
    <header className="sec-head hl-revela">
      <div className="sec-head-linha">
        <svg className="sec-fio" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden>
          <path d="M0 2 L100 2" pathLength={1} />
        </svg>
      </div>
      <h2 className="sec-titulo">{titulo}</h2>
      {nota && <p className="sec-nota">{nota}</p>}
    </header>
  );
}
