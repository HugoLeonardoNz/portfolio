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
export function ArquiteturaHug() {
  const traco = "rgba(212,247,74,0.30)";
  const caixa = "rgba(212,247,74,0.07)";

  const Caixa = ({ x, y, w, h, titulo, sub, forte = false }: {
    x: number; y: number; w: number; h: number;
    titulo: string; sub?: string; forte?: boolean;
  }) => (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={7}
        fill={forte ? "rgba(212,247,74,0.16)" : caixa}
        stroke={forte ? C.acid : traco}
        strokeWidth={forte ? 1.1 : 0.9}
      />
      <text
        x={x + w / 2} y={sub ? y + h / 2 - 1 : y + h / 2 + 3}
        textAnchor="middle" fontFamily={F.ui} fontSize={8.5} fontWeight={600}
        fill={forte ? C.acid : C.ink}
      >{titulo}</text>
      {sub && (
        <text
          x={x + w / 2} y={y + h / 2 + 9}
          textAnchor="middle" fontFamily={F.ui} fontSize={7} fill={C.ink3}
        >{sub}</text>
      )}
    </g>
  );

  /** Seta vertical com rótulo à direita. */
  const Fluxo = ({ x, y1, y2, rotulo }: { x: number; y1: number; y2: number; rotulo?: string }) => (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 4} stroke={traco} strokeWidth={0.9} />
      <polygon points={`${x},${y2} ${x - 2.6},${y2 - 4.5} ${x + 2.6},${y2 - 4.5}`} fill={traco} />
      {rotulo && (
        <text
          x={x + 6} y={(y1 + y2) / 2 + 2.5}
          fontFamily={F.ui} fontSize={6.8} fill={C.ink3}
        >{rotulo}</text>
      )}
    </g>
  );

  return (
    <div style={{
      marginTop: "1.4rem", background: C.darkAlt, borderRadius: 16,
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
                fill="none" stroke={traco} strokeWidth={0.8} />
          <text x={263} y={95} textAnchor="middle"
                fontFamily={F.ui} fontSize={7} fill={C.ink3}>393 testes</text>
        </g>
      </svg>
    </div>
  );
}
