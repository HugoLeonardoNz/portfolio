export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPrivate: boolean;
  /** Pasta em public/telas/ e quantas telas ela tem. Geradas por
   *  tools/gerar_telas.py — imagem recortada a mao envelhece calada. */
  telas?: { slug: string; total: number };
  status: "live" | "building" | "private";
  icon: "database" | "chart" | "layers" | "code" | "trending" | "zap";
}

export const PROJECTS: Project[] = [
  {
    id: 1, title: "SQL Analytics Pack",
    telas: { slug: "sqlpack", total: 2 },
    description: "10 queries analíticas sobre um ISP fictício com 300 clientes. Evidencia correlação inversa entre preço e churn (36,7% → 10,2%), aging de inadimplência de R$ 46k, scoring de risco composto para 174 contratos e crescimento de MRR mês a mês.",
    tags: ["SQL", "PostgreSQL", "CTEs", "Window Functions", "Business Analytics"],
    githubUrl: "https://github.com/HugoLeonardoNz/SQL-Analytics-Pack",
    isPrivate: false, status: "live", icon: "database",
  },
  {
    id: 2, title: "Telecom KPI Dashboard",
    telas: { slug: "kpi", total: 1 },
    description: "Dashboard operacional com KPIs críticos de ISP: base de 88.501 clientes com delta mês a mês, MRR, ARPU, cohort de retenção por trimestre, NOC/SLA com MTTR e quebra por região e por plano — Streamlit + Plotly. As quebras derivam do mesmo número que o KPI mostra, e 11 testes reprovam se pararem de fechar.",
    tags: ["Python", "Streamlit", "Pandas", "Plotly"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-kpi-dashboard",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 3, title: "Customer Churn Predictor",
    telas: { slug: "churn", total: 1 },
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
    telas: { slug: "eda", total: 6 },
    description: "Duas análises sobre o setor: EDA de reclamações ANATEL sobre um CSV com os defeitos do arquivo real (latin-1, separador ponto e vírgula, duplicatas, nulos implícitos), com quatro hipóteses declaradas antes do resultado — uma refutada — e uma quinta que NAO recebe veredito, porque confirmá-la mediria o gerador e não o setor. Mais segmentação RFM de 300 contratos, com MRR em risco por segmento.",
    tags: ["Python", "Pandas", "Plotly", "EDA", "RFM", "Dados Abertos"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-eda-public",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 6, title: "Expansão de Mercado — EDA",
    telas: { slug: "market", total: 6 },
    description: "Onde um ISP deve expandir. Dado buscado na API do SIDRA (tabelas 9649, 7311 e 7167), conferido contra o release do IBGE. Dois achados: o ranking por taxa e o por volume discordam (ρ = 0,24 — SP é o 5º em taxa e o 1º em número absoluto de desconectados), e, em 2023, a brecha regional já tinha encolhido para 4,6pp enquanto a urbana × rural resistia em 13,0pp — 24,8pp no Norte, onde a cidade tinha 95,2% e o campo, 70,4%. O recorte é de 2023 de propósito: em 2025 só um estado fica abaixo de 92% e a fila de expansão por lacuna deixa de existir.",
    tags: ["Python", "Plotly", "IBGE", "EDA", "Scoring"],
    githubUrl: "https://github.com/HugoLeonardoNz/market-expansion-eda",
    isPrivate: false, status: "live", icon: "trending",
  },
  {
    id: 7, title: "Telecom Operadoras — Power BI",
    telas: { slug: "telecom-bi", total: 6 },
    description: "Relatório de 6 páginas sobre reclamações ANATEL: star schema com 4 dimensões, 53 medidas DAX e camada visual gerada por código (formato PBIR versionado em JSON). Normaliza volume por base de assinantes, compõe índice de risco regulatório, mede concentração por Herfindahl e detecta mês fora da curva por z-score. Inclui página de metodologia com os limites do dado.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "ANATEL"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-powerbi-public",
    isPrivate: false, status: "live", icon: "chart",
  },
  {
    id: 8, title: "Brecha Digital Brasil — Power BI",
    telas: { slug: "brecha", total: 5 },
    description: "Relatório de 5 páginas sobre acesso à internet no Brasil, ancorado no último ano observado. O achado: São Paulo é o 5º estado em taxa de acesso e o 1º em número absoluto de domicílios desconectados — ranking por percentual e por volume discordam, e a Bahia anda 19 posições entre um e outro. O segundo achado é maior: a desigualdade entre estados praticamente fechou (desvio de 9,6pp em 2016 para 1,9pp em 2025) e o que sobrou é cidade × campo, 13,1pp no Norte. Série observada 2016–2025, sem retropolação, conferida contra o release do IBGE.",
    tags: ["Power BI", "DAX", "Star Schema", "Python", "IBGE"],
    githubUrl: "https://github.com/HugoLeonardoNz/socioeconomic-powerbi-public",
    isPrivate: false, status: "live", icon: "database",
  },
];
