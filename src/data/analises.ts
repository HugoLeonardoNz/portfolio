/**
 * Recortes reais dos projetos, para os gráficos da seção "Análises".
 *
 * Os números saem dos mesmos modelos publicados nos repositórios — não são
 * ilustrativos. Fonte de cada bloco indicada no comentário.
 */

// ── Brecha digital (socioeconomic-powerbi-public, ano de referência 2023) ────
// penetracao = % de domicílios com internet · semAcesso = domicílios em milhões
// Fonte: API do SIDRA, tabelas 9649 (com internet) e 7167 (total), ano 2023.
// Conferido contra o release do IBGE: 92,5% nacional; este cálculo dá 92,6%.
export interface UF {
  uf: string;
  estado: string;
  regiao: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
  penetracao: number;
  semAcesso: number;
  idh: number;
}

// Os 27 estados, ordenados por domicílios sem acesso. `semAcesso` está em MILHÕES
// de domicílios (não de pessoas): é a contagem observada, total menos com internet.
export const BRECHA: UF[] = [
  { uf: "SP", estado: "São Paulo",             regiao: "Sudeste",        penetracao: 95.0, semAcesso: 0.85, idh: 0.783 },
  { uf: "BA", estado: "Bahia",                 regiao: "Nordeste",       penetracao: 89.2, semAcesso: 0.59, idh: 0.66 },
  { uf: "MG", estado: "Minas Gerais",          regiao: "Sudeste",        penetracao: 92.8, semAcesso: 0.56, idh: 0.731 },
  { uf: "PE", estado: "Pernambuco",            regiao: "Nordeste",       penetracao: 88.9, semAcesso: 0.39, idh: 0.673 },
  { uf: "RJ", estado: "Rio de Janeiro",        regiao: "Sudeste",        penetracao: 94.1, semAcesso: 0.39, idh: 0.761 },
  { uf: "CE", estado: "Ceará",                 regiao: "Nordeste",       penetracao: 89.5, semAcesso: 0.34, idh: 0.682 },
  { uf: "PR", estado: "Paraná",                regiao: "Sul",            penetracao: 92.8, semAcesso: 0.31, idh: 0.749 },
  { uf: "MA", estado: "Maranhão",              regiao: "Nordeste",       penetracao: 86.8, semAcesso: 0.3, idh: 0.639 },
  { uf: "RS", estado: "Rio Grande do Sul",     regiao: "Sul",            penetracao: 93.2, semAcesso: 0.3, idh: 0.746 },
  { uf: "PA", estado: "Pará",                  regiao: "Norte",          penetracao: 90.1, semAcesso: 0.26, idh: 0.646 },
  { uf: "PB", estado: "Paraíba",               regiao: "Nordeste",       penetracao: 90.2, semAcesso: 0.15, idh: 0.658 },
  { uf: "AM", estado: "Amazonas",              regiao: "Norte",          penetracao: 88.7, semAcesso: 0.14, idh: 0.708 },
  { uf: "SC", estado: "Santa Catarina",        regiao: "Sul",            penetracao: 95.4, semAcesso: 0.14, idh: 0.774 },
  { uf: "GO", estado: "Goiás",                 regiao: "Centro-Oeste",   penetracao: 95.2, semAcesso: 0.13, idh: 0.735 },
  { uf: "PI", estado: "Piauí",                 regiao: "Nordeste",       penetracao: 89.1, semAcesso: 0.12, idh: 0.646 },
  { uf: "RN", estado: "Rio Grande do Norte",   regiao: "Nordeste",       penetracao: 90.3, semAcesso: 0.12, idh: 0.684 },
  { uf: "AL", estado: "Alagoas",               regiao: "Nordeste",       penetracao: 89.4, semAcesso: 0.12, idh: 0.631 },
  { uf: "ES", estado: "Espírito Santo",        regiao: "Sudeste",        penetracao: 92.7, semAcesso: 0.11, idh: 0.74 },
  { uf: "MT", estado: "Mato Grosso",           regiao: "Centro-Oeste",   penetracao: 94.2, semAcesso: 0.08, idh: 0.725 },
  { uf: "SE", estado: "Sergipe",               regiao: "Nordeste",       penetracao: 91.4, semAcesso: 0.07, idh: 0.665 },
  { uf: "MS", estado: "Mato Grosso do Sul",    regiao: "Centro-Oeste",   penetracao: 95.5, semAcesso: 0.05, idh: 0.729 },
  { uf: "RO", estado: "Rondônia",              regiao: "Norte",          penetracao: 94.0, semAcesso: 0.04, idh: 0.736 },
  { uf: "AC", estado: "Acre",                  regiao: "Norte",          penetracao: 84.4, semAcesso: 0.04, idh: 0.708 },
  { uf: "TO", estado: "Tocantins",             regiao: "Norte",          penetracao: 91.7, semAcesso: 0.04, idh: 0.699 },
  { uf: "DF", estado: "Distrito Federal",      regiao: "Centro-Oeste",   penetracao: 97.4, semAcesso: 0.03, idh: 0.824 },
  { uf: "RR", estado: "Roraima",               regiao: "Norte",          penetracao: 94.0, semAcesso: 0.01, idh: 0.75 },
  { uf: "AP", estado: "Amapá",                 regiao: "Norte",          penetracao: 94.0, semAcesso: 0.01, idh: 0.708 },
];

// Acesso por situação do domicílio. Existe em Brasil e Grandes Regiões e NÃO por
// UF — o IBGE suprime esse cruzamento por amostra. O painel mostra no grão que o
// dado tem, e não no grão que ficaria mais bonito.
export interface GapSituacao { local: string; urbana: number; rural: number; gap: number }

export const GAP_URBANO_RURAL: GapSituacao[] = [
  { local: "Norte",           urbana: 95.2, rural: 70.4, gap: 24.8 },
  { local: "Brasil",          urbana: 94.2, rural: 81.2, gap: 13.0 },
  { local: "Nordeste",        urbana: 91.8, rural: 80.1, gap: 11.7 },
  { local: "Sudeste",         urbana: 94.8, rural: 83.8, gap: 11.0 },
  { local: "Sul",             urbana: 94.4, rural: 87.2, gap: 7.2 },
  { local: "Centro-Oeste",    urbana: 96.0, rural: 89.0, gap: 7.0 },
];

export const CORES_REGIAO: Record<UF["regiao"], string> = {
  "Norte":        "#5bc8fa",
  "Nordeste":     "#f0a04b",
  "Centro-Oeste": "#c9b458",
  "Sudeste":      "#7c5bf5",
  "Sul":          "#a585ff",
};

// ── Reclamações ANATEL (telecom-powerbi-public, 2022–2023) ──────────────────
export interface Operadora {
  nome: string;
  reclamacoes: number;
  por100k: number;
  resolucao: number;
  cor: string;
}

export const OPERADORAS: Operadora[] = [
  { nome: "CLARO",     reclamacoes: 3391, por100k:  9.6, resolucao: 71.9, cor: "#5AD8F0" },
  { nome: "VIVO",      reclamacoes: 2000, por100k:  6.0, resolucao: 71.6, cor: "#8B93F5" },
  { nome: "TIM",       reclamacoes: 1573, por100k:  6.3, resolucao: 71.6, cor: "#E0A33A" },
  { nome: "OI",        reclamacoes:  775, por100k:  6.2, resolucao: 74.3, cor: "#3FBF87" },
  { nome: "SERCOMTEL", reclamacoes:  166, por100k: 41.5, resolucao: 68.1, cor: "#E0685F" },
];
