import { TICKER_ITEMS } from "../data/content";

/**
 * Faixa de tecnologias — versão de 2026-10-09.
 *
 * Saiu numa rodada de limpeza e voltou a pedido do Hugo. Ela era lida como
 * "faixa de template" por três motivos, e são esses três que mudaram:
 *
 * 1. CORPO. Era mono a 0,68rem em caixa alta espaçada — rótulo, não conteúdo.
 *    Agora é a grotesca do site em corpo de subtítulo: a faixa diz "estas são
 *    as ferramentas" com a mesma voz dos títulos.
 * 2. SEPARADOR. Um traço genérico virou o quadrado lima, a mesma marca dos
 *    marcos da Trajetória e do "disponível" do cartaz. Um vocabulário só.
 * 3. BORDAS. A faixa entrava e saía cortada no limite da tela. Uma máscara
 *    esmaece as duas pontas, então os itens surgem e somem em vez de serem
 *    guilhotinados.
 *
 * Comportamento: para sob o cursor (dá para ler um item), pausa fora da tela
 * (src/motion.ts) e, com "reduzir movimento", vira uma lista parada que quebra
 * em linhas — o conteúdo continua lá, só não anda.
 */
export function Ticker() {
  const dobrado = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="hl-faixa" role="region" aria-label="Tecnologias">
      {/* A lista para leitores de tela é a original, uma vez só; a cópia que
          fecha o laço é decorativa. */}
      <ul className="hl-faixa-trilho">
        {dobrado.map((item, i) => (
          <li key={i} className="hl-faixa-item" aria-hidden={i >= TICKER_ITEMS.length || undefined}>
            <span aria-hidden className="hl-faixa-marca" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
