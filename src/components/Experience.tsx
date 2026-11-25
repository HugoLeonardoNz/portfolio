import { SectionHead } from "./ui/SectionHead";
import { EXPERIENCE } from "../data/content";

/**
 * Trajetória. O fio rubi à esquerda se desenha com a rolagem (motion.ts,
 * `trilho`) e cada marco acende quando o traço chega nele. É a única
 * animação ligada ao scroll no site.
 */
export function Experience() {
  return (
    <section id="trajetoria" className="secao">
      <div className="caixa">
        <SectionHead titulo="Trajetória" />

        <ol className="trilho">
          <span className="trilho-fio" aria-hidden />
          {EXPERIENCE.map((e) => (
            <li key={e.period} className="exp">
              <span className="exp-marca" aria-hidden />
              <div className="exp-lado">
                <p className="mono exp-periodo">{e.period}</p>
                <p className="exp-local">{e.location}</p>
              </div>
              <div className="exp-corpo hl-revela">
                <h3 className="exp-titulo">{e.title}</h3>
                <p className="exp-empresa">{e.company}</p>
                <ul className="exp-itens">
                  {e.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <p className="mono exp-stack">{e.stack.join("  ·  ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
