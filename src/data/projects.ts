export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPrivate: boolean;
  status: "live" | "building" | "private";
  icon: "database" | "chart" | "layers" | "code" | "trending" | "zap";
}

export const PROJECTS: Project[] = [
  {
    id: 1, title: "SQL Analytics Pack",
    description: "10 queries analíticas sobre um ISP fictício com 300 clientes. Evidencia correlação inversa entre preço e churn (36,7% → 10,2%), aging de inadimplência de R$ 46k, scoring de risco composto para 174 contratos e crescimento de MRR mês a mês.",
    tags: ["SQL", "PostgreSQL", "CTEs", "Window Functions", "Business Analytics"],
    githubUrl: "https://github.com/HugoLeonardoNz/SQL-Analytics-Pack",
    isPrivate: false, status: "live", icon: "database",
  },
  {
    id: 2, title: "Telecom KPI Dashboard",
    description: "Dashboard operacional com KPIs críticos de ISP: MRR com delta MoM, ARPU, cohort de retenção por trimestre, NOC/SLA com uptime e MTTR, concentração geográfica e ranking de vendedores — Streamlit + Plotly, dados sintéticos baseados em cenários reais de fibra.",
    tags: ["Python", "Streamlit", "Pandas", "Plotly"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-kpi-dashboard",
    liveUrl: "https://hugoleonardonz-telecom-kpi-dashboard.streamlit.app",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 3, title: "Customer Churn Predictor",
    description: "Pipeline completo de ML sobre 15.000 registros sintéticos: feature engineering comportamental, comparação de 4 modelos (LogReg, RandomForest, XGBoost, LightGBM), validação cruzada estratificada, calibração de threshold pela curva Precision-Recall, calibração isotônica, análise SHAP e lista priorizada de retenção com MRR em risco. As métricas são altas porque o dado é gerado condicionalmente ao rótulo — a ressalva está no README, junto com a evidência: uma regressão logística simples empata com o XGBoost.",
    tags: ["Python", "scikit-learn", "XGBoost", "SHAP", "Feature Engineering", "Streamlit"],
    githubUrl: "https://github.com/HugoLeonardoNz/churn-predictor",
    liveUrl: "https://hugoleonardonz-churn-predictor.streamlit.app",
    isPrivate: false, status: "live", icon: "layers",
  },
  {
    id: 4, title: "Data Hub — ISP Analytics Platform",
    description: "Plataforma interna de inteligência desenvolvida do zero: integrações via API REST com ERP Elleven, automação de reboot de ONUs com log via Telegram, dashboards de NOC, Comercial e Financeiro além dos limites do Power BI.",
    tags: ["Python", "SQL", "ETL", "API REST", "Power BI"],
    isPrivate: true, status: "private", icon: "code",
  },
  {
    id: 5, title: "Telecom EDA — ANATEL",
    description: "Análise exploratória de reclamações de telecom com dados públicos da ANATEL. Processamento de encoding latin-1, estratégias de limpeza por coluna, EDA univariada e bivariada por motivo, status, operadora e região — 6 seções metodológicas completas.",
    tags: ["Python", "Pandas", "Plotly", "EDA", "Dados Abertos"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-eda-public",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 6, title: "Expansão de Mercado — EDA",
    description: "EDA de penetração de internet por UF com IBGE PNAD Contínua via SIDRA API. Choropleth interativo, scatter IDH × internet com linha de tendência e detecção de outliers, score de oportunidade composto por penetração, população e IDH.",
    tags: ["Python", "Plotly", "IBGE API", "GeoJSON", "EDA"],
    githubUrl: "https://github.com/HugoLeonardoNz/market-expansion-eda",
    isPrivate: false, status: "live", icon: "trending",
  },
  {
    id: 7, title: "Telecom Operadoras — Power BI",
    description: "Relatório de 6 páginas sobre reclamações ANATEL: star schema com 4 dimensões, 53 medidas DAX e camada visual gerada por código (formato PBIR versionado em JSON). Normaliza volume por base de assinantes, compõe índice de risco regulatório, mede concentração por Herfindahl e detecta mês fora da curva por z-score. Inclui página de metodologia com os limites do dado.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "ANATEL"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-powerbi-public",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 8, title: "Brecha Digital Brasil — Power BI",
    description: "Relatório de 5 páginas sobre acesso à internet no Brasil. O achado: São Paulo é o 3º estado em taxa de acesso e o 1º em número absoluto de pessoas desconectadas — ranking por percentual e por volume discordam. IDH explica 78% da variação entre estados (correlação calculada em DAX). Design deliberadamente distinto do outro projeto Power BI.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "IBGE"],
    githubUrl: "https://github.com/HugoLeonardoNz/socioeconomic-powerbi-public",
    isPrivate: false, status: "live", icon: "database",
  },
];
