import { ArrowUpRight, Lock } from "lucide-react";
import { PROJECTS, type Project } from "../data/projects";
import { SectionHead } from "./ui/SectionHead";
import { Telas } from "./ui/Telas";
import { ArquiteturaHug } from "./ui/ArquiteturaHug";
import { GitHubMark } from "./ui/Marcas";

/**
 * Projetos. A passagem densa do site e a razão de o visitante estar aqui.
 *
 * Uma linha por projeto, texto à esquerda e a prova à direita: as telas reais
 * (geradas por script), o diagrama do HUG ou, sem telas, o número-manchete.
 * A procedência do dado anda colada ao título (PRODUCT.md, princípio 2): o
 * marcador é vazado para dado sintético, cheio em tinta para dado observado e
 * cheio em rubi para produção.
 *
 * A ordem é editorial e vem de `data/projects.ts`.
 */
function procedencia(dado: string) {
  if (dado.startsWith("Produção")) return "producao";
  if (dado.startsWith("Sintético")) return "sintetico";
  return "observado";
}

function Prova({ p }: { p: Project }) {
  if (p.telas) return <Telas slug={p.telas.slug} total={p.telas.total} alt={p.title} />;
  if (p.isPrivate) return <ArquiteturaHug />;
  if (p.destaque) {
    return (
      <div className="proj-destaque">
        <span className="proj-destaque-valor">{p.destaque.valor}</span>
        <span className="proj-destaque-rotulo">{p.destaque.rotulo}</span>
      </div>
    );
  }
  return null;
}

export function Projects() {
  return (
    <section id="projetos" className="secao">
      <div className="caixa">
        <SectionHead
         
          titulo="Projetos"
          nota="Oito públicos e uma plataforma interna. Cada número daqui está no repositório de origem, com a procedência do dado declarada."
        />

        <ol className="proj-lista">
          {PROJECTS.map((p) => (
            <li key={p.id} className="proj hl-revela">
              <div className="proj-texto">
                <div className="proj-topo">
                  <span className={`proj-dado mono dado-${procedencia(p.dado)}`}>
                    <i aria-hidden />{p.dado}
                  </span>
                </div>
                <h3 className="proj-titulo">{p.title}</h3>
                <p className="proj-tipo mono">{p.tipo}</p>
                <p className="proj-desc">{p.description}</p>
                <p className="proj-tags mono">{p.tags.join("  ·  ")}</p>
                <div className="proj-links">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="link-sub">
                      <GitHubMark size={15} /> Repositório <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link-sub">
                      Ver ao vivo <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                  {p.isPrivate && (
                    <span className="proj-privado mono"><Lock size={13} aria-hidden /> Repositório privado</span>
                  )}
                </div>
              </div>
              <div className="proj-prova">
                <Prova p={p} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
