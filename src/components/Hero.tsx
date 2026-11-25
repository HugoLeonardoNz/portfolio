import { ArrowDown } from "lucide-react";
import { GitHubMark, LinkedInMark } from "./ui/Marcas";
import { PhotoLightbox } from "./ui/PhotoLightbox";
import { atraso } from "../motion";

/**
 * Abertura. Uma tela, duas colunas: o nome grande à esquerda e a foto à
 * direita, cercada pelo mesmo círculo cortado da logo, que se desenha depois
 * que o nome sobe. A foto continua obrigatória e redonda (PRODUCT.md): quem
 * chega pelo LinkedIn precisa reconhecer a pessoa sem pensar.
 *
 * O arquivo `hugo-foto.webp` já vem enquadrado por `tools/enquadrar_foto.py`;
 * nenhum recorte extra no CSS.
 */
export function Hero() {
  const foto = `${import.meta.env.BASE_URL}hugo-foto.webp`;
  return (
    <section id="topo" className="hero">
      <div className="caixa hero-grade">
        <div className="hero-texto">
          <h1 className="hero-nome">
            <span className="mascara"><span className="hl-sobe" style={atraso(80)}>Hugo</span></span>
            <span className="mascara"><span className="hl-sobe" style={atraso(170)}>Nazário</span></span>
          </h1>

          <p className="hero-cargo hl-sobe" style={atraso(300)}>
            <span className="item">Analista de Dados Pleno</span> <span className="sep" aria-hidden>·</span>{" "}
            <span className="item">Speed Fibra</span> <span className="sep" aria-hidden>·</span>{" "}
            <span className="item">Belo Horizonte, MG</span>
          </p>

          <p className="hero-lede hl-sobe" style={atraso(380)}>
            Desde 2023 respondo pela inteligência de dados de um provedor de fibra em
            operação, para seis setores. Do SQL bruto ao painel na tela da diretoria.
          </p>

          <div className="hero-acoes hl-sobe" style={atraso(470)}>
            <a href="#projetos" className="botao">
              Ver projetos <ArrowDown size={16} aria-hidden />
            </a>
            <a href="https://github.com/HugoLeonardoNz" target="_blank" rel="noopener noreferrer" className="link-icone">
              <GitHubMark size={17} /> GitHub
            </a>
            <a href="https://linkedin.com/in/hugo-nazario" target="_blank" rel="noopener noreferrer" className="link-icone">
              <LinkedInMark size={17} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-foto-wrap">
          <div className="hero-foto hl-foto-entra">
            <PhotoLightbox src={foto} alt="Foto de Hugo Nazário">
              <img src={foto} alt="Hugo Nazário" width={720} height={720} fetchPriority="high" />
            </PhotoLightbox>
          </div>
          {/* O círculo cortado da logo, em volta da foto. */}
          <svg className="hero-anel hn-desenha" viewBox="0 0 100 100" aria-hidden>
            <path className="hn-tr hn-tr-anel" pathLength={1} d="M55.02 97.74 A48 48 0 1 1 97.97 51.68" />
          </svg>
        </div>
      </div>

    </section>
  );
}
