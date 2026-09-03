import { useEffect, useRef, useState } from "react";
import { C, F } from "../../theme";

/**
 * Diagrama de arquitetura do HUG.
 *
 * POR QUE ELE EXISTE
 * O HUG é o projeto mais pesado do portfólio e era o único cartão sem nada
 * para ver: roda em produção com dado real de cliente, então não há print nem
 * demo público, e o cartão pedia que o visitante acreditasse na descrição. Um
 * diagrama resolve a metade que importa — a FORMA do sistema é o que se está
 * avaliando numa vaga de dados, e ela não é confidencial. O que é
 * confidencial é o número dentro da tela, e aqui não entra nenhum.
 *
 * Pelo mesmo motivo as fontes aparecem pelo que SÃO ("ERP do provedor",
 * "Atendimento") e não pelo nome do fornecedor: quem lê entende a topologia
 * sem que o desenho vire inventário do parque de software de um cliente.
 *
 * SVG inline em vez de imagem: acompanha o tema, escala sem serrilhar e não
 * envelhece num arquivo .png que alguém esquece de regerar — que é exatamente
 * o problema que este portfólio passou a semana consertando.
 */
/* Traço e preenchimento. Ficavam dentro do componente, recriados a cada
   render sem nunca mudar. */
const TRACO = "rgba(212,247,74,0.30)";
const CAIXA_FILL = "rgba(212,247,74,0.07)";

/**
 * `Caixa` e `Fluxo` eram definidos DENTRO de `ArquiteturaHug`. Componente
 * criado durante o render tem identidade nova a cada passagem: o React não
 * reconhece o tipo como o mesmo e desmonta e remonta a subárvore inteira em
 * vez de atualizá-la. Num SVG estático isso não quebra a tela, mas é trabalho
 * jogado fora a cada render do cartão — e era o que o `react-hooks/static-
 * components` estava apontando. Subir os dois para o módulo resolve.
 */
function Caixa({ x, y, w, h, titulo, sub, forte = false }: {
  x: number; y: number; w: number; h: number;
  titulo: string; sub?: string; forte?: boolean;
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={7}
        fill={forte ? "rgba(212,247,74,0.16)" : CAIXA_FILL}
        stroke={forte ? C.acid : TRACO}
        strokeWidth={forte ? 1.1 : 0.9}
      />
      <text
        x={x + w / 2} y={sub ? y + h / 2 - 1 : y + h / 2 + 3}
        textAnchor="middle" fontFamily={F.mono} fontSize={8.5} fontWeight={600}
        fill={forte ? C.acid : C.ink}
      >{titulo}</text>
      {sub && (
        <text
          x={x + w / 2} y={y + h / 2 + 9}
          textAnchor="middle" fontFamily={F.mono} fontSize={7} fill={C.ink3}
        >{sub}</text>
      )}
    </g>
  );
}

/** Seta vertical com rótulo à direita. */
function Fluxo({ x, y1, y2, rotulo }: { x: number; y1: number; y2: number; rotulo?: string }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 4} stroke={TRACO} strokeWidth={0.9} />
      <polygon points={`${x},${y2} ${x - 2.6},${y2 - 4.5} ${x + 2.6},${y2 - 4.5}`} fill={TRACO} />
      {rotulo && (
        <text
          x={x + 6} y={(y1 + y2) / 2 + 2.5}
          fontFamily={F.mono} fontSize={6.8} fill={C.ink3}
        >{rotulo}</text>
      )}
    </g>
  );
}

export function ArquiteturaHug() {
  /* SINALIZAR QUE ROLA (2026-09-03).
     A rolagem horizontal do telefone e deliberada — ver o comentario do
     container abaixo — mas ela estava MUDA: sem barra (o iOS esconde), sem
     sombra, sem legenda. Num aparelho de 390px o visitante lia "ETLs
     agendados p" e "MongoDB · schema, migratio" e concluia que a pagina
     quebrou. Justo no cartao do HUG, que e a peca mais forte do portfolio e a
     unica sem print para mostrar.

     Duas dicas resolvem, e as duas so aparecem quando ha mesmo o que arrastar:
     a vinheta na borda direita (some ao chegar no fim, senao vira enfeite que
     mente) e a legenda embaixo. `medir` roda no mount, no scroll e no resize
     porque girar o aparelho muda as duas respostas. */
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [rola, setRola] = useState(false);
  const [noFim, setNoFim] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const medir = () => {
      const sobra = el.scrollWidth - el.clientWidth;
      setRola(sobra > 4);
      setNoFim(el.scrollLeft >= sobra - 4);
    };
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, []);

  return (
    <div style={{ marginTop: "1.4rem" }}>
      <div style={{ position: "relative" }}>
        {/* No telefone este diagrama vira rolagem horizontal (regra .hl-arq no
           GlobalStyles). O viewBox e fixo em 320x180, entao o SVG encolhe junto
           com o cartao e os rotulos caem para 6,8-8,5px — o unico texto do site
           que o aumento da raiz nao alcanca, porque SVG escala pelo viewBox e
           nao pelo rem. Aumentar so a fonte dentro do viewBox nao resolve: 11
           unidades de texto nao cabem numa caixa de 26 unidades. Entao o
           diagrama inteiro cresce e o dedo arrasta.

           O aria-label abaixo descreve o fluxo por extenso, entao quem usa
           leitor de tela nunca dependeu de enxergar o desenho. */}
        <div ref={scrollerRef} className="hl-arq" style={{
          background: C.darkAlt, borderRadius: 16,
          border: "1px solid rgba(212,247,74,0.18)",
          aspectRatio: "16 / 9", overflow: "hidden",
        }}>
          <svg
            viewBox="0 0 320 180" width="100%" height="100%"
            role="img"
            aria-label="Arquitetura do HUG: ERP e atendimento alimentam ETLs agendados, que gravam no MongoDB; a API em FastAPI serve doze painéis em React, com acesso por nível e por tag."
          >
            {/* fontes */}
            <Caixa x={26}  y={10} w={122} h={26} titulo="ERP do provedor" sub="PostgreSQL · read-only" />
            <Caixa x={172} y={10} w={122} h={26} titulo="Atendimento" sub="API" />

            <Fluxo x={87}  y1={36} y2={56} />
            <Fluxo x={233} y1={36} y2={56} />

            {/* ingestão */}
            <Caixa x={26} y={56} w={268} h={24} titulo="ETLs agendados por domínio" />
            <Fluxo x={160} y1={80} y2={100} rotulo="idempotente" />

            {/* persistência */}
            <Caixa x={26} y={100} w={268} h={24}
                   titulo="MongoDB · schema, migrations e seeds versionados" />
            <Fluxo x={160} y1={124} y2={142} />

            {/* entrega */}
            <Caixa x={26}  y={142} w={130} h={26} titulo="FastAPI" sub="acesso por nível e tag" />
            <Caixa x={164} y={142} w={130} h={26} titulo="12 painéis · React" forte />

            {/* selo de garantia, colado na borda direita */}
            <g>
              <rect x={232} y={86} width={62} height={13} rx={6.5}
                    fill="none" stroke={TRACO} strokeWidth={0.8} />
              <text x={263} y={95} textAnchor="middle"
                    fontFamily={F.mono} fontSize={7} fill={C.ink3}>600+ testes</text>
            </g>
          </svg>
        </div>

        {/* Vinheta da borda direita. `pointerEvents: none` porque ela cobre a
            area de arrasto — sem isso, o dedo que pega justamente a beirada
            (onde a pessoa naturalmente puxa) nao move nada. */}
        {rola && !noFim && (
          <div aria-hidden style={{
            position: "absolute", top: 1, right: 1, bottom: 1, width: 64,
            borderRadius: "0 15px 15px 0", pointerEvents: "none",
            background: `linear-gradient(90deg, rgba(14,21,10,0) 0%, ${C.darkAlt} 88%)`,
          }} />
        )}
      </div>

      {rola && (
        <p style={{
          fontFamily: F.mono, fontSize: "0.66rem", color: C.ink3,
          marginTop: "0.6rem", letterSpacing: "0.04em",
        }}>
          arraste para ver o fluxo →
        </p>
      )}
    </div>
  );
}
