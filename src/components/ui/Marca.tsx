/**
 * A logo: "Hn" escrito à mão atravessando um círculo cortado (rodadas 7 a 10
 * de 25/11/2026, versão escolhida: traço grosso, sem ponto no fim do arco,
 * azul #2F6BD8). Origem e geradores em `docs/marca/`.
 *
 * Cada traço é um path com `pathLength=1`, então a animação de "escrever" é
 * só `stroke-dashoffset` de 1 a 0, na ordem em que uma pessoa escreveria:
 * haste esquerda, travessa, haste direita, o n e por último o círculo. A
 * ordem e o atraso de cada traço moram no CSS (`.hn-tr`), não aqui.
 *
 * `desenhar` liga a animação; sem ele a marca nasce pronta (barra do topo,
 * rodapé). Sem JS ou com "reduzir movimento", ela também nasce pronta: o
 * estado escondido só vale sob `html.hl-motion`.
 */
const HN_TRACOS = [
  "M347 148 L238 385",                                          // haste esquerda
  "M455 250 L245 262 L238 385",                                 // travessa que sai do círculo
  "M405 183 L382 322",                                          // haste direita
  "M396 322 L403 287 C407 280 425 278 423 296 L420 314 Q418 325 430 318", // n
  "M325.2 389.2 A145 145 0 1 1 454.9 250.1",                    // círculo cortado
];

type Props = {
  size?: number | string;
  desenhar?: boolean;
  /** Sem o círculo: só o Hn, para tamanhos onde o anel vira mancha. */
  semCirculo?: boolean;
  className?: string;
  titulo?: string;
};

export function Marca({ size = 40, desenhar = false, semCirculo = false, className = "", titulo }: Props) {
  const tracos = semCirculo ? HN_TRACOS.slice(0, 4) : HN_TRACOS;
  return (
    <svg
      viewBox={semCirculo ? "226 136 216 261" : "157 92 306 306"}
      width={size}
      height={size}
      className={`hn ${desenhar ? "hn-desenha" : ""} ${className}`}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      {tracos.map((d, i) => (
        <path key={i} d={d} pathLength={1} className={`hn-tr hn-tr-${i}`} />
      ))}
    </svg>
  );
}
