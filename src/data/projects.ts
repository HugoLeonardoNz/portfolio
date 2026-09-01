export interface Project {
  id: number;
  title: string;
  /** Uma linha dizendo o que a peça É, antes do que ela mostra. */
  tipo: string;
  /**
   * De onde vem o dado. Existe porque o cartão dizia "base de 88.501 clientes"
   * sem contar que a base é gerada — quem lê rápido entende base real de
   * cliente real. Só dois projetos usam dado observado (os do IBGE) e só um
   * roda sobre dado de produção; os outros cinco são sintéticos, e agora isso
   * está na cara do cartão em vez de escondido no README.
   */
  dado: string;
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
 * memória de quem passa o olho — e cada número foi conferido no repositório de
 * origem, não copiado do cartão anterior.
 *
 * Um cuidado editorial: os dois projetos de IBGE tinham a MESMA frase de efeito
 * ("os 26 pares vizinhos não se distinguem"), porque o achado existe nos dois
 * repositórios. Lado a lado no grid, isso lia como projeto duplicado. Cada um
 * ficou com o achado que é a manchete do seu próprio README.
 */
export const PROJECTS: Project[] = [
  {
    id: 1, title: "Telecom Operadoras",
    tipo: "Relatório Power BI · 6 páginas",
    dado: "Sintético",
    description: "Reclamações da ANATEL em star schema, com 53 medidas DAX, camada visual gerada por código, RLS por operadora e insight executivo por IA. A SERCOMTEL reclama 4× mais por assinante que a CLARO.",
    tags: ["Power BI", "DAX", "Star Schema", "Python"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-powerbi-public",
    isPrivate: false, status: "live", icon: "chart",
    telas: { slug: "telecom-bi", total: 6 },
  },
  {
    id: 2, title: "Brecha Digital Brasil",
    tipo: "Relatório Power BI · 5 páginas",
    dado: "IBGE · observado",
    description: "Acesso à internet no Brasil, 2016–2025, com dado observado do IBGE em dois grãos. São Paulo é 5º em taxa de acesso e 1º em domicílios sem internet: 606 mil. Percentual e volume apontam para lugares diferentes.",
    tags: ["Power BI", "DAX", "IBGE", "Star Schema"],
    githubUrl: "https://github.com/HugoLeonardoNz/socioeconomic-powerbi-public",
    isPrivate: false, status: "live", icon: "database",
    telas: { slug: "brecha", total: 5 },
  },
  {
    id: 3, title: "Telecom KPI Dashboard",
    tipo: "App Streamlit · 6 abas",
    dado: "Sintético",
    description: "Painel operacional de ISP: base de 88.501 clientes, MRR, ARPU, cohort de retenção e NOC/SLA. Camada SQL com window functions (LAG, RANK) valida cada número contra o pandas, e 14 testes garantem.",
    tags: ["Python", "Streamlit", "SQL", "Plotly"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-kpi-dashboard",
    liveUrl: "https://hugo-telecom-kpi-dashboard.streamlit.app/",
    isPrivate: false, status: "live", icon: "chart",
    telas: { slug: "kpi", total: 5 },
  },
  {
    id: 4, title: "HUG — Hub Unificado de Gestão",
    tipo: "Plataforma interna · em produção",
    dado: "Produção · dado real",
    description: "Plataforma de dashboards que substituiu o Power BI da operação: 12 painéis sobre FastAPI, MongoDB e React, ETLs agendados contra o ERP, acesso por nível e por tag, e 393 testes que travam regressão de número.",
    tags: ["Python", "SQL", "FastAPI", "React"],
    isPrivate: true, status: "private", icon: "code",
  },
  {
    id: 5, title: "Customer Churn Predictor",
    tipo: "Pipeline de ML + app Streamlit",
    dado: "Sintético",
    description: "Predição de cancelamento sobre 15.000 contratos: 4 modelos comparados, SHAP e fila de retenção com MRR em risco. O gerador embute 15% de ruído, a AUC fica em 0,785 e o teste reprova acima de 0,92.",
    tags: ["scikit-learn", "XGBoost", "SHAP", "Streamlit"],
    githubUrl: "https://github.com/HugoLeonardoNz/churn-predictor",
    liveUrl: "https://hugo-churn-predictor.streamlit.app/",
    isPrivate: false, status: "live", icon: "layers",
    telas: { slug: "churn", total: 4 },
  },
  {
    id: 6, title: "Expansão de Mercado",
    tipo: "EDA sobre dado do IBGE",
    dado: "IBGE · observado",
    description: "Onde um ISP deve expandir, com dado do SIDRA conferido contra o release do IBGE. Em 2023, a brecha regional já tinha fechado; a rural não: no Norte o urbano tem 95,2% de acesso e o rural, 70,4% — 24,8pp.",
    tags: ["Python", "Plotly", "IBGE", "Scoring"],
    githubUrl: "https://github.com/HugoLeonardoNz/market-expansion-eda",
    isPrivate: false, status: "live", icon: "trending",
    telas: { slug: "market", total: 6 },
  },
  {
    id: 7, title: "SQL Analytics Pack",
    tipo: "10 queries · dbt + 2 CIs",
    dado: "Sintético",
    description: "SQL analítico sobre um ISP de 300 contratos, com dbt e CI. Correlação inversa entre preço e churn (36,7% → 10,2%) e R$ 47 mil em aberto, dos quais 81% vencidos há mais de noventa dias.",
    tags: ["SQL", "PostgreSQL", "dbt", "Window Functions"],
    githubUrl: "https://github.com/HugoLeonardoNz/SQL-Analytics-Pack",
    isPrivate: false, status: "live", icon: "database",
    telas: { slug: "sqlpack", total: 2 },
  },
  {
    id: 8, title: "Telecom EDA — ANATEL",
    tipo: "EDA + segmentação RFM",
    dado: "Sintético",
    description: "Limpeza de CSV no formato real da ANATEL — latin-1, duplicatas, nulos implícitos — com quatro hipóteses julgadas e uma declarada não-testável, porque confirmá-la mediria o gerador e não o setor.",
    tags: ["Python", "Pandas", "EDA", "RFM"],
    githubUrl: "https://github.com/HugoLeonardoNz/telecom-eda-public",
    isPrivate: false, status: "live", icon: "chart",
    telas: { slug: "eda", total: 6 },
  },
];
