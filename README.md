# Hugo Leonardo — Portfólio

Site de portfólio de **Hugo Leonardo**, Analista de Dados Pleno. Página única em
React 19 + TypeScript, publicada no GitHub Pages, que reúne nove projetos de
SQL, Python, Power BI e Machine Learning aplicados a telecom.

**No ar:** https://hugoleonardonz.github.io/portfolio/

![Portfólio](docs/img/site.png)

---

## O que este repositório tem de diferente

O site **não é o portfólio inteiro** — ele é a capa de oito repositórios que
vivem separados. Isso cria um problema que a maioria dos portfólios ignora: a
capa envelhece sozinha, e ninguém percebe.

Por isso o deploy é bloqueado por uma conferência automática
([`tools/conferir_repos.py`](tools/conferir_repos.py)). Antes de publicar, ela
lê a lista de projetos direto de [`src/data/projects.ts`](src/data/projects.ts)
e recusa a publicação se, em qualquer repositório anunciado:

- o repositório não for público, ou estiver arquivado;
- a última execução de CI não tiver passado;
- o README não apontar de volta para o site;
- a contagem de testes reivindicada pelo site não bater com a soma real dos
  oito repositórios.

A lista de projetos é **derivada**, nunca mantida à mão: apagar um cartão do
site tira o repositório da conferência no mesmo commit. E a última regra existe
porque o número já ficou errado uma vez — o cartão de compartilhamento anunciava
151 testes quando eram 144.

---

## Stack

| Tecnologia | Uso |
|---|---|
| React 19 | UI e componentização |
| TypeScript 6 | Tipagem estática |
| Vite 8 | Bundler e dev server |
| Lucide React | Ícones |
| Pillow (Python) | Geração do cartão de compartilhamento e das miniaturas |

**Não há framework de CSS.** O estilo é inline, a partir dos tokens de
[`src/theme.ts`](src/theme.ts) (`C` cores, `F` fontes, `R` raios, `S` espaços),
mais as classes `hl-*` de [`GlobalStyles.tsx`](src/components/GlobalStyles.tsx)
para o que estilo inline não alcança: media query, pseudo-elemento, `:hover`,
`:focus-visible` e `prefers-reduced-motion`.

O Tailwind saiu em 2026-09-02. Ele estava instalado e importado, mas **nenhuma
classe utilitária era usada** — a folha publicada de 9,3 kB era só o preflight
dele. O que o preflight de fato fazia nesta página foi portado explícito para
[`src/index.css`](src/index.css), e o CSS caiu para 0,46 kB.

---

## Estrutura

```
portfolio/
├── index.html              — meta tags, Open Graph e og:image:alt (fonte da
│                             contagem de testes que o site reivindica)
├── vite.config.ts
├── public/
│   ├── hugo-foto.png
│   ├── og-card.png         — cartão de compartilhamento, gerado por tools/
│   ├── favicon.svg
│   ├── icons.svg
│   └── telas/              — miniaturas dos projetos (7 pastas)
├── docs/img/               — imagens do README
├── tools/                  — ver seção abaixo
├── .github/workflows/
│   └── deploy.yml          — conferência de alinhamento, build e Pages
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── Index.tsx           — monta as seções na ordem da página
    ├── index.css           — reset (o que restou do preflight do Tailwind)
    ├── theme.ts            — tokens: C, F, R, S
    ├── data/
    │   ├── projects.ts     — os 9 cartões; fonte da conferência de repos
    │   └── content.ts      — textos de bio, serviços e experiência
    └── components/
        ├── GlobalStyles.tsx — classes hl-*, media queries e movimento
        ├── Topbar.tsx       — barra superior fixa (60px) com progresso
        ├── Hero.tsx         — nome, foto, credencial e inventário
        ├── Ticker.tsx       — faixa de tecnologias
        ├── Sobre.tsx        — bio e ficha
        ├── OQueEntrego.tsx  — entregas
        ├── Skills.tsx       — stack por categoria
        ├── Projects.tsx     — cartões, filtro por tecnologia e selos
        ├── Experience.tsx   — trajetória
        ├── Contact.tsx      — contato
        ├── Footer.tsx
        └── ui/
            ├── SectionHead.tsx    — cabeçalho de seção
            ├── Telas.tsx          — miniatura navegável do projeto
            ├── ArquiteturaHug.tsx — diagrama do projeto sem print público
            └── Marcas.tsx
```

---

## Ferramentas

Os PNGs do site não são print tirado à mão: são gerados, para poderem ser
refeitos quando o projeto muda.

| Script | O que faz |
|---|---|
| `conferir_repos.py` | Confere se o site e os oito repositórios continuam alinhados. Roda no deploy. |
| `gerar_og.py` | Gera o cartão de compartilhamento 1200×630, lendo as provas do `og:image:alt`. |
| `gerar_telas.py` | Monta as miniaturas navegáveis dos cartões de projeto. |
| `capturar_pbix.ps1` | Grava as páginas de um relatório Power BI como PNG. |
| `capturar_streamlit.ps1` | Grava as abas de um app Streamlit como PNG. |
| `recortar_pbix.py` | Tira a moldura do Power BI Desktop das capturas. |
| `recortar_streamlit.py` | Tira a moldura do Chrome das capturas do Streamlit. |

---

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
npm run build
npm run preview
npx eslint src     # o CI reprova com qualquer aviso
```

A conferência de alinhamento precisa de um token com leitura de repositório
público:

```bash
GITHUB_TOKEN=$(gh auth token) python tools/conferir_repos.py
```

---

## Seções

| Seção | Conteúdo |
|---|---|
| `#hero` | Nome, foto, tempo de casa e o inventário do que o portfólio contém |
| — | Faixa de tecnologias |
| `#sobre` | Bio e ficha profissional |
| `#servicos` | O que entrego |
| `#habilidades` | Stack por categoria |
| `#projetos` | 9 cartões — 8 públicos e 1 privado — com filtro por tecnologia |
| `#experiencia` | Trajetória: Jr → Pleno na Speed Fibra, e formação |
| `#contato` | E-mail, LinkedIn e GitHub |

Cada cartão de projeto carrega **dois selos**, porque são perguntas diferentes:
o da esquerda diz se dá para **abrir** o repositório; o da direita, de onde vem
o dado — **sintético, observado ou de produção**. Um projeto pode ser público e
sintético ao mesmo tempo.

---

## Autor

**Hugo Leonardo** · Analista de Dados Pleno · Speed Fibra · Santa Luzia, MG
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hugo%20Leonardo-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/hugo-leonardo-data-analyst/)
[![GitHub](https://img.shields.io/badge/GitHub-HugoLeonardoNz-181717?style=flat&logo=github)](https://github.com/HugoLeonardoNz)
