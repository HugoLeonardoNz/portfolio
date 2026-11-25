import { useEffect, useState, type CSSProperties } from "react";
import { Marca } from "./ui/Marca";

/**
 * Barra do topo. Transparente sobre a abertura; ganha fundo e fio quando a
 * página rola. O link da seção em que você está ganha o sublinhado rubi.
 * No telefone, os links viram um menu que abre por botão.
 *
 * A marca (logo + nome) NÃO aparece enquanto o nome grande da abertura está na
 * tela, nem quando o rodapé entra: ali o nome já está escrito e repetir é
 * ruído (pedido do Hugo, 25/11/2026). Na seção de contato ela continua: só
 * some quando o rodapé de fato aparece (ajuste de 25/11/2026). Entre os dois,
 * ela se escreve: a logo traça, as letras sobem uma a uma e um risco azul
 * passa por baixo. Vale também no celular.
 */
const NOME = "Hugo Nazário";
const LINKS = [
  { id: "sobre",      rotulo: "Sobre" },
  { id: "projetos",   rotulo: "Projetos" },
  { id: "oficio",     rotulo: "Ofício" },
  { id: "trajetoria", rotulo: "Trajetória" },
];

export function Topbar() {
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState("");
  const [aberto, setAberto] = useState(false);
  const [marca, setMarca] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) setAtivo(e.target.id);
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["topo", ...LINKS.map((l) => l.id), "contato"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // Marca: some quando o nome da abertura ou o rodapé está à vista.
    const vistos = new Set<Element>();
    const ioMarca = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) vistos.add(e.target); else vistos.delete(e.target);
      }
      setMarca(vistos.size === 0);
    }, { rootMargin: "-60px 0px 0px 0px" });
    document.querySelectorAll(".hero-nome, .rodape").forEach((el) => ioMarca.observe(el));

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); ioMarca.disconnect(); };
  }, []);

  const mostra = marca || aberto;

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setAberto(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  return (
    <header className={`barra ${rolou || aberto ? "barra-rolou" : ""}`}>
      <div className="caixa barra-in">
        <a
          href="#topo"
          className={`barra-marca ${mostra ? "mostra" : ""}`}
          aria-label="Hugo Nazário, voltar ao topo"
          aria-hidden={!mostra}
          tabIndex={mostra ? undefined : -1}
          onClick={() => setAberto(false)}
        >
          <Marca size={34} />
          <span className="barra-nome" aria-hidden>
            {[...NOME].map((c, i) => (
              <span key={i} className="letra" style={{ "--i": i } as CSSProperties}>{c === " " ? "\u00a0" : c}</span>
            ))}
          </span>
        </a>

        <nav className="barra-nav" aria-label="Seções">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`barra-link ${ativo === l.id ? "ativo" : ""}`}>{l.rotulo}</a>
          ))}
          <a href="#contato" className={`botao botao-sm ${ativo === "contato" ? "ativo" : ""}`}>Contato</a>
        </nav>

        <button
          className="barra-menu"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
        >
          <span /><span />
        </button>
      </div>

      <nav id="menu-movel" className={`menu-movel ${aberto ? "aberto" : ""}`} aria-label="Seções" hidden={!aberto}>
        {[...LINKS, { id: "contato", rotulo: "Contato" }].map((l, i) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setAberto(false)} style={{ transitionDelay: `${i * 40}ms` }}>
            {l.rotulo}
          </a>
        ))}
      </nav>
    </header>
  );
}
