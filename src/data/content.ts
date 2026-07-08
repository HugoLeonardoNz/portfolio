export const TICKER_ITEMS = [
  "SQL & Analytics", "Power BI", "Python", "DAX", "ETL / ELT",
  "Streamlit", "Churn & Retenção", "Machine Learning", "API REST",
  "PostgreSQL", "EDA & Visualização", "Star Schema",
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
    period: "Jul 2023 — Presente", location: "Santa Luzia, MG · Presencial",
    bullets: [
      "Único analista responsável por toda a inteligência de dados da operação — ponto focal para 6 setores: Comercial, Financeiro, NOC, Suporte, Projetos e Diretoria",
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
  "Analista de Dados Pleno com 3 anos construindo inteligência de dados em ISP. Responsável por 6 frentes analíticas — do NOC ao financeiro — entregando dashboards, automações e análises que embasam decisões da liderança todos os dias.",
  "Foco em transformar dado operacional em decisão estratégica: redução de churn, controle de inadimplência, ranking de performance e detecção de falhas antes que virem chamados. SQL e Python são as ferramentas; o negócio é o produto.",
  "Projeto atual: Data Hub proprietário desenvolvido do zero para centralizar a inteligência da operação — integrações API com ERP, logs de rede em tempo real e análises que os dashboards padrão não entregam.",
];
