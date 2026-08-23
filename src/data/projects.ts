export interface Project {
  id: number;
  title: string;
  /** Uma linha dizendo o que a peça É, antes do que ela mostra. */
  tipo: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPrivate: boolean;
  status: "live" | "building" | "private";
  icon: "database" | "chart" | "layers" | "code" | "trending" | "zap";
  /** Pasta em public/telas/ e quantas telas ela tem. Geradas por
   *  tools/gerar_telas.py e tools/capturar_pbix.ps1 — imagem recortada à mão
   *  envelhece calada, e este portfólio já publicou print de cinco meses atrás. */
  telas?: { slug: string; total: number };
}

/**
 * Ordem e formato dos cartões.
 *
 * A ORDEM é editorial, não cronológica: os dois relatórios Power BI abrem
 * porque são a peça mais distintiva do portfólio — camada visual gerada por
 * código, versionada em JSON. Depois vem o painel operacional, depois a
 * plataforma interna, e o resto desce por profundidade analítica.
 *
 * O FORMATO é padronizado de propósito. Antes cada descrição tinha o tamanho
 * que saiu na hora — a do churn tinha 640 caracteres e a do Data Hub, 190. Num
 * grid, isso empurra a miniatura de cada cartão para uma altura diferente e a
 * fileira inteira sai desalinhada. Aqui todas ficam entre 180 e 230 caracteres
 * e as tags são no máximo quatro, então os blocos batem linha a linha.
 *
 * Cada descrição fecha com o número mais forte do projeto, que é o que sobra na
 * memória de quem passa o olho.
 */
export const PROJECTS: Project[] = [
  {
    id: 1, title: "Telecom Operadoras",
    tipo: "Relatório Power BI · 6 páginas",
    description: "Reclamações da ANATEL em star schema, com 53 medidas DAX e camada visual gerada por código. Normaliza volume por base de assinantes: a SERCOMTEL reclama 4× mais por assinante que a CLARO.",
    tags: ["Power BI", "DAX", "Star Schema", "Python"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-powerbi-public",
    isPrivate: false, status: "live", icon: "chart",
    telas: { slug: "telecom-bi", total: 6 },
  },
  {
    id: 2, title: "Brecha Digital Brasil",
    tipo: "Relatório Power BI · 5 páginas",
    description: "Acesso à internet no Brasil, 2016–2025, com dado observado do IBGE e dois fatos em grãos diferentes. Traz o intervalo de confiança: os 26 pares vizinhos do ranking por taxa não se distinguem.",
    tags: ["Power BI", "DAX", "IBGE", "Star Schema"],
    githubUrl: "https://github.com/HugoLeonardoNz/socioeconomic-powerbi-public",
    isPrivate: false, status: "live", icon: "database",
    telas: { slug: "brecha", total: 5 },
  },
  {
    id: 3, title: "Telecom KPI Dashboard",
    tipo: "App Streamlit · 5 abas",
    description: "Painel operacional de ISP: base de 88.501 clientes, MRR, ARPU, cohort de retenção e NOC/SLA. As quebras por plano e por região derivam do mesmo número que o KPI mostra, e 11 testes garantem.",
    tags: ["Python", "Streamlit", "Plotly", "Pandas"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-kpi-dashboard",
    isPrivate: false, status: "live", icon: "chart",
    telas: { slug: "kpi", total: 5 },
  },
  {
    id: 4, title: "Data Hub — ISP Analytics",
    tipo: "Plataforma interna · em produção",
    description: "Plataforma de inteligência construída do zero: integrações REST com o ERP, automação de reboot de ONUs com log via Telegram e dashboards de NOC, Comercial e Financeiro além do Power BI.",
    tags: ["Python", "SQL", "ETL", "API REST"],
    isPrivate: true, status: "private", icon: "code",
  },
  {
    id: 5, title: "Customer Churn Predictor",
    tipo: "Pipeline de ML + app Streamlit",
    description: "Predição de cancelamento sobre 15.000 contratos: 4 modelos comparados, SHAP e fila de retenção com MRR em risco. O gerador embute 15% de ruído, a AUC fica em 0,785 e o teste reprova acima de 0,92.",
    tags: ["scikit-learn", "XGBoost", "SHAP", "Streamlit"],
    githubUrl: "https://github.com/HugoLeonardoNz/churn-predictor",
    isPrivate: false, status: "live", icon: "layers",
    telas: { slug: "churn", total: 4 },
  },
  {
    id: 6, title: "Expansão de Mercado",
    tipo: "EDA sobre dado do IBGE",
    description: "Onde um ISP deve expandir, com dado do SIDRA conferido contra o release do IBGE. Ranking por taxa e por volume discordam — e o de taxa nem separa: os 26 pares vizinhos têm intervalo sobreposto.",
    tags: ["Python", "Plotly", "IBGE", "Scoring"],
    githubUrl: "https://github.com/HugoLeonardoNz/market-expansion-eda",
    isPrivate: false, status: "live", icon: "trending",
    telas: { slug: "market", total: 6 },
  },
  {
    id: 7, title: "SQL Analytics Pack",
    tipo: "10 queries · dbt + 2 CIs",
    description: "SQL analítico sobre um ISP de 300 contratos, com dbt e CI. Correlação inversa entre preço e churn (36,7% → 10,2%) e R$ 46 mil em aberto, dos quais 81% vencidos há mais de noventa dias.",
    tags: ["SQL", "PostgreSQL", "dbt", "Window Functions"],
    githubUrl: "https://github.com/HugoLeonardoNz/SQL-Analytics-Pack",
    isPrivate: false, status: "live", icon: "database",
    telas: { slug: "sqlpack", total: 2 },
  },
  {
    id: 8, title: "Telecom EDA — ANATEL",
    tipo: "EDA + segmentação RFM",
    description: "Limpeza de CSV no formato real da ANATEL — latin-1, duplicatas, nulos implícitos — com quatro hipóteses julgadas e uma declarada não-testável, porque confirmá-la mediria o gerador e não o setor.",
    tags: ["Python", "Pandas", "EDA", "RFM"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-eda-public",
    isPrivate: false, status: "live", icon: "chart",
    telas: { slug: "eda", total: 6 },
  },
];
