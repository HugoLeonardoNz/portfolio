/**
 * Recortes reais dos projetos, para os gráficos da seção "Análises".
 *
 * Os números saem dos mesmos modelos publicados nos repositórios — não são
 * ilustrativos. Fonte de cada bloco indicada no comentário.
 */

// ── Brecha digital (socioeconomic-powerbi-public, ano de referência 2023) ────
// penetracao = % de domicílios com internet · semAcesso = pessoas em milhões
export interface UF {
  uf: string;
  estado: string;
  regiao: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
  penetracao: number;
  semAcesso: number;
  idh: number;
}

export const BRECHA: UF[] = [
  { uf: "SP", estado: "São Paulo",          regiao: "Sudeste",      penetracao: 93.5, semAcesso: 3.03, idh: 0.783 },
  { uf: "BA", estado: "Bahia",              regiao: "Nordeste",     penetracao: 80.3, semAcesso: 2.94, idh: 0.660 },
  { uf: "MG", estado: "Minas Gerais",       regiao: "Sudeste",      penetracao: 88.7, semAcesso: 2.42, idh: 0.731 },
  { uf: "CE", estado: "Ceará",              regiao: "Nordeste",     penetracao: 78.9, semAcesso: 1.95, idh: 0.682 },
  { uf: "PA", estado: "Pará",               regiao: "Norte",        penetracao: 77.8, semAcesso: 1.91, idh: 0.646 },
  { uf: "MA", estado: "Maranhão",           regiao: "Nordeste",     penetracao: 73.8, semAcesso: 1.87, idh: 0.639 },
  { uf: "PE", estado: "Pernambuco",         regiao: "Nordeste",     penetracao: 82.4, semAcesso: 1.70, idh: 0.673 },
  { uf: "RJ", estado: "Rio de Janeiro",     regiao: "Sudeste",      penetracao: 91.3, semAcesso: 1.52, idh: 0.761 },
  { uf: "PR", estado: "Paraná",             regiao: "Sul",          penetracao: 91.6, semAcesso: 0.96, idh: 0.749 },
  { uf: "AM", estado: "Amazonas",           regiao: "Norte",        penetracao: 77.6, semAcesso: 0.93, idh: 0.708 },
  { uf: "RS", estado: "Rio Grande do Sul",  regiao: "Sul",          penetracao: 92.8, semAcesso: 0.82, idh: 0.746 },
  { uf: "PB", estado: "Paraíba",            regiao: "Nordeste",     penetracao: 80.5, semAcesso: 0.79, idh: 0.658 },
  { uf: "AL", estado: "Alagoas",            regiao: "Nordeste",     penetracao: 78.4, semAcesso: 0.72, idh: 0.631 },
  { uf: "PI", estado: "Piauí",              regiao: "Nordeste",     penetracao: 79.3, semAcesso: 0.68, idh: 0.646 },
  { uf: "GO", estado: "Goiás",              regiao: "Centro-Oeste", penetracao: 90.0, semAcesso: 0.72, idh: 0.735 },
  { uf: "SC", estado: "Santa Catarina",     regiao: "Sul",          penetracao: 93.8, semAcesso: 0.48, idh: 0.774 },
  { uf: "MT", estado: "Mato Grosso",        regiao: "Centro-Oeste", penetracao: 88.2, semAcesso: 0.44, idh: 0.725 },
  { uf: "RN", estado: "Rio Grande do Norte",regiao: "Nordeste",     penetracao: 83.6, semAcesso: 0.58, idh: 0.684 },
  { uf: "ES", estado: "Espírito Santo",     regiao: "Sudeste",      penetracao: 89.4, semAcesso: 0.42, idh: 0.740 },
  { uf: "MS", estado: "Mato Grosso do Sul", regiao: "Centro-Oeste", penetracao: 89.4, semAcesso: 0.30, idh: 0.729 },
  { uf: "DF", estado: "Distrito Federal",   regiao: "Centro-Oeste", penetracao: 95.1, semAcesso: 0.15, idh: 0.824 },
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
