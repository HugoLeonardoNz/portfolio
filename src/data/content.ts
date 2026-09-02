export const TICKER_ITEMS = [
  "SQL & Analytics", "Power BI", "Python", "DAX", "ETL / ELT",
  "Streamlit", "Churn & Retenção", "Machine Learning", "API REST",
  "PostgreSQL", "EDA & Visualização", "Star Schema",
  "Microsoft Fabric", "Delta Lake", "PySpark",
];

export const SERVICOS = [
  { icon: "database" as const, title: "SQL & Analytics",       desc: "Queries avançadas, CTEs e window functions que transformam dados brutos em respostas de negócio.",    tags: ["PostgreSQL", "Window Functions", "CTEs"] },
  { icon: "chart"    as const, title: "Power BI & Dashboards", desc: "Dashboards consultados diariamente pela liderança como base para decisão estratégica.",                tags: ["DAX", "Modelagem Dimensional", "KPIs"] },
  { icon: "code"     as const, title: "Python & Automação",    desc: "Scripts, pipelines, bots com alertas via Telegram e apps interativos com Streamlit.",                  tags: ["Pandas", "Streamlit", "Automações"] },
  { icon: "layers"   as const, title: "ETL & Integrações",     desc: "Pipelines de dados, integrações via API REST e configuração de sistemas ERP.",                        tags: ["ETL / ELT", "API REST", "ERP Elleven"] },
  { icon: "trending" as const, title: "Churn & Retenção",      desc: "Score de risco, análise de cohort e identificação de padrões de cancelamento.",                       tags: ["Risk Scoring", "Cohort Analysis", "Predição ML"] },
  { icon: "zap"      as const, title: "NOC & Operações",       desc: "Monitoramento de rede, SLA, MTTR e visibilidade de falhas em tempo real.",                            tags: ["Uptime", "SLA", "Incidentes"] },
];

export const EXPERIENCE = [
  {
    title: "Analista de Dados Pleno", company: "Speed Fibra",
    period: "Jul 2023 — Presente", location: "Belo Horizonte, MG · Presencial",
    bullets: [
      "Único analista responsável por toda a inteligência de dados da operação — ponto focal para 6 setores: Comercial, Financeiro, NOC, Suporte, Projetos e Diretoria",
      "HUG — plataforma interna de dashboards construída do zero (FastAPI, MongoDB e React) que substituiu o Power BI da operação: 12 painéis, ETLs agendados contra o ERP, controle de acesso por nível e por tag e 393 testes automatizados",
      "Ecossistema de dashboards Power BI com indicadores de metas, ranking e eficiência operacional — consultados diariamente pela liderança como base para decisão",
      "Análise contínua de churn, inadimplência e inconsistências de faturamento — identificação de carteira em risco e padrões de cancelamento por plano e cidade",
      "Monitoramento de falhas no NOC com histórico de incidentes, pontos críticos e acompanhamento de SLA — visibilidade em tempo real das pontas críticas da rede",
      "Automação de reboot de ONUs em Python com log estruturado via Telegram — reduziu chamados repetitivos no Suporte e entregou rastreabilidade total aos eventos de rede",
      "Migração e configuração do ERP Elleven: setup fiscal, integração de serviços via API REST e melhorias contínuas no fluxo operacional",
    ],
    stack: ["SQL", "Power BI", "DAX", "Python", "ETL", "API REST", "ERP Elleven"],
  },
  {
    title: "Analista de Dados Júnior", company: "Speed Fibra",
    period: "Fev 2023 — Jun 2023", location: "Minas Gerais, MG",
    bullets: [
      "Início da trajetória com SQL, Power BI e Python em análises operacionais e apoio estratégico",
      "Implantação de novas tecnologias e supervisão do ERP com rápida evolução técnica",
    ],
    stack: ["SQL", "Power BI", "Python"],
  },
];

export const ABOUT_TEXT_STRINGS = [
  "Entrei em fevereiro de 2023 como júnior e hoje respondo sozinho por toda a inteligência de dados de um provedor de fibra em operação. São três anos no mesmo lugar — tempo suficiente para ver um indicador nascer, ser contestado numa reunião de diretoria e virar rotina de decisão.",
  "Seis frentes passam pela mesma pessoa: Comercial, Financeiro, NOC, Suporte, Projetos e Diretoria. Na prática isso é churn, inadimplência, ranking de performance e falha de rede identificada antes de virar chamado. SQL e Python são as ferramentas; o negócio é o produto.",
  "O trabalho de hoje é o HUG: plataforma interna de dashboards construída do zero, que substituiu o Power BI da empresa. Doze painéis, ETLs agendados e 393 testes automatizados para garantir que o número da tela é o número do banco.",
];
