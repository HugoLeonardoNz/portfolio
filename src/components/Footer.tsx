import { ArrowUp } from "lucide-react";
import { Marca } from "./ui/Marca";

export function Footer() {
  return (
    <footer className="rodape">
      <div className="caixa rodape-in">
        <span className="rodape-marca">
          <Marca size={22} semCirculo />
          <span>Hugo Nazário</span>
        </span>
        <span className="mono rodape-meta">Analista de Dados · {new Date().getFullYear()}</span>
        <a href="#topo" className="link-sub rodape-topo">Voltar ao topo <ArrowUp size={14} aria-hidden /></a>
      </div>
    </footer>
  );
}
