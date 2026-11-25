import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Marca } from "./ui/Marca";

/**
 * Rodapé. Ao entrar na tela a logo se escreve e os três itens chegam em
 * cascata. A marca do cabeçalho some aqui (ver Topbar): o nome não se repete.
 *
 * Gatilho próprio, sem a margem de -10% do `revelar()` do motion.ts: o rodapé
 * mora na borda de baixo da página e, com aquela margem, nunca entraria.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="rodape" ref={ref}>
      <div className="caixa rodape-in">
        <span className="rodape-marca rodape-item">
          <Marca size={22} semCirculo desenhar />
          <span>Hugo Nazário</span>
        </span>
        <span className="mono rodape-meta rodape-item">Analista de Dados · {new Date().getFullYear()}</span>
        <a href="#topo" className="link-sub rodape-topo rodape-item">Voltar ao topo <ArrowUp size={14} aria-hidden /></a>
      </div>
    </footer>
  );
}
