import { SectionHead } from "./ui/SectionHead";
import { ABOUT_TEXT_STRINGS } from "../data/content";

/**
 * Sobre. Entrada em corpo grande, dois parágrafos de leitura e a ficha de
 * triagem (desde quando, onde, escopo, formação) com valores já publicados.
 */
const FICHA = [
  { rotulo: "Desde",    valor: "Fev 2023" },
  { rotulo: "Onde",     valor: "Speed Fibra · Belo Horizonte, MG" },
  { rotulo: "Cargo",    valor: "Analista de Dados Pleno" },
  { rotulo: "Escopo",   valor: "Toda a inteligência de dados da operação" },
  { rotulo: "Setores",  valor: "Comercial, Financeiro, NOC, Suporte, Projetos e Diretoria" },
  { rotulo: "Formação", valor: "Sistemas de Informação · UNA, conclusão em 2028" },
];

export function Sobre() {
  const [entrada, ...resto] = ABOUT_TEXT_STRINGS;
  return (
    <section id="sobre" className="secao">
      <div className="caixa">
        <SectionHead titulo="Quem sou eu" />
        <div className="sobre-grade">
          <p className="sobre-entrada hl-revela">{entrada}</p>
          <div className="sobre-corpo">
            {resto.map((p, i) => <p key={i} className="hl-revela">{p}</p>)}
          </div>
          <dl className="ficha hl-revela">
            {FICHA.map((l) => (
              <div key={l.rotulo}>
                <dt>{l.rotulo}</dt>
                <dd>{l.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
