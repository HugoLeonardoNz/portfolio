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
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 3, title: "Customer Churn Predictor",
    description: "Pipeline completo de ML sobre 15.000 registros sintéticos: feature engineering comportamental, comparação de 4 modelos (LogReg, RandomForest, XGBoost, LightGBM), validação cruzada estratificada, calibração de threshold pela curva Precision-Recall, calibração isotônica, análise SHAP e lista priorizada de retenção com MRR em risco. O gerador embute 15% de desfechos que contrariam o comportamento observado, o que cria um teto de acerto: a AUC fica em 0,785 e os quatro modelos empatam, então a escolha vira um trade-off explícito entre precisão, calibração e legibilidade. O teste unitário reprova AUC acima de 0,92 — número alto demais vira sintoma de vazamento, não conquista.",
    tags: ["Python", "scikit-learn", "XGBoost", "SHAP", "Feature Engineering", "Streamlit"],
    githubUrl: "https://github.com/HugoLeonardoNz/churn-predictor",
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
    description: "Duas análises sobre o setor: EDA de reclamações ANATEL sobre um CSV com os defeitos do arquivo real (latin-1, separador ponto e vírgula, duplicatas, nulos implícitos) com cinco hipóteses declaradas antes do resultado — uma delas refutada — e segmentação RFM de 300 contratos, com MRR em risco por segmento.",
    tags: ["Python", "Pandas", "Plotly", "EDA", "RFM", "Dados Abertos"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-eda-public",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 6, title: "Expansão de Mercado — EDA",
    description: "Onde um ISP deve expandir. Dado buscado na API do SIDRA (tabelas 9649, 7311 e 7167), conferido contra o release do IBGE. Dois achados: o ranking por taxa e o por volume discordam (ρ = 0,24 — SP tem a melhor taxa do país e o maior número absoluto de desconectados), e a brecha regional acabou (3,5pp) enquanto a urbana × rural resiste em 13,0pp — 24,8pp no Norte, onde a cidade já tem 95,2% e o campo, 70,4%.",
    tags: ["Python", "Plotly", "IBGE", "EDA", "Scoring"],
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
    description: "Relatório de 5 páginas sobre acesso à internet no Brasil. O achado: São Paulo é o 5º estado em taxa de acesso e o 1º em número absoluto de domicílios desconectados — ranking por percentual e por volume discordam, e a Bahia anda 20 posições entre um e outro. Série observada 2016–2025, sem retropolação. IDH explica 59% da variação (correlação em DAX). Design deliberadamente distinto do outro projeto Power BI.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "IBGE"],
    githubUrl: "https://github.com/HugoLeonardoNz/socioeconomic-powerbi-public",
    isPrivate: false, status: "live", icon: "database",
  },
];
