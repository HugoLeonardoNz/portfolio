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
    description: "Pipeline completo de ML: feature engineering comportamental, comparação de 4 modelos (LogReg, RandomForest, XGBoost, LightGBM), XGBoost selecionado com AUC ~0.91 em 5-fold CV estratificado, calibração isotônica, análise SHAP, simulador interativo e lista priorizada de retenção com MRR em risco exportável — 15.000 registros sintéticos.",
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
    description: "Dashboard Power BI de reclamações ANATEL por operadora. Star schema com fato_reclamacoes + 4 dimensões, 20+ medidas DAX: variação MoM/YoY, Média Móvel 3M, ranking por 100k assinantes e Índice de Concentração Herfindahl.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "ANATEL"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-powerbi-public",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 8, title: "Brecha Digital Brasil — Power BI",
    description: "Dashboard Power BI sobre penetração de internet no Brasil 2019–2023. Star schema grão UF × período × métrica, CAGR 5 anos, Gap Digital urbano-rural, Score de Oportunidade composto por baixa penetração, população e IDH moderado.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "IBGE"],
    githubUrl: "https://github.com/HugoLeonardoNz/socioeconomic-powerbi-public",
    isPrivate: false, status: "live", icon: "database",
  },
];
