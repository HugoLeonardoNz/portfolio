import { ArrowUpRight, MapPin } from "lucide-react";
import { Marca } from "./ui/Marca";

/**
 * Contato: o fechamento da página. A logo se escreve inteira aqui, quando a
 * seção entra na tela, como uma assinatura no fim da carta. Os canais são
 * linhas largas; o hover desloca o conteúdo com `transform` (sem mexer no
 * layout) e a seta sobe na diagonal.
 */
const CANAIS = [
  { rotulo: "Email",    valor: "hugoworknz@gmail.com",         href: "mailto:hugoworknz@gmail.com",          externo: false },
  { rotulo: "WhatsApp", valor: "+55 31 97561-5009",            href: "https://wa.me/5531975615009",          externo: true },
  { rotulo: "LinkedIn", valor: "linkedin.com/in/hugo-nazario", href: "https://linkedin.com/in/hugo-nazario", externo: true },
  { rotulo: "GitHub",   valor: "github.com/HugoLeonardoNz",    href: "https://github.com/HugoLeonardoNz",    externo: true },
];

export function Contact() {
  return (
    <section id="contato" className="secao contato">
      <div className="caixa contato-grade">
        <div className="contato-abre">
          <Marca size="min(46vw, 15rem)" desenhar className="contato-marca hl-assina" titulo="Logo Hugo Nazário" />
          <h2 className="contato-titulo">
            <span className="mascara"><span className="hl-sobe-vista">Vamos</span></span>
            <span className="mascara"><span className="hl-sobe-vista" style={{ transitionDelay: "90ms" }}>conversar.</span></span>
          </h2>
          <p className="contato-apoio hl-revela">
            Disponível para oportunidades remotas e híbridas como Analista de Dados Pleno ou Sênior.
          </p>
        </div>

        <ul className="canais hl-revela">
          {CANAIS.map((c) => (
            <li key={c.rotulo}>
              <a
                href={c.href}
                className="canal"
                {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="mono canal-rotulo">{c.rotulo}</span>
                <span className="canal-valor">{c.valor}</span>
                <ArrowUpRight size={18} aria-hidden className="canal-seta" />
              </a>
            </li>
          ))}
          <li>
            <div className="canal canal-fixo">
              <span className="mono canal-rotulo">Local</span>
              <span className="canal-valor">Belo Horizonte e região · Remoto</span>
              <MapPin size={17} aria-hidden className="canal-seta" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
