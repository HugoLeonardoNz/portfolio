# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Visitante primário — quem manda quando há conflito: tech lead / gestor de dados**
avaliando Hugo Nazário para uma vaga de **Analista de Dados Pleno**. Chega quase
sempre pelo LinkedIn, avalia em uma sessão curta (a régua do próprio ROADMAP é
"o que um avaliador técnico consegue verificar em 20 minutos"), e o comportamento
que define o sucesso é **sair do site e abrir o GitHub**: ler um README, um
`findings.md`, um `measures.md`, conferir se o número da tela sobrevive à pergunta
"como você chegou nisso?".

**Visitante secundário — recrutador/RH.** Passa o olho em segundos, precisa de
nome, cargo, tempo de casa e stack sem esforço. Nunca decide contra o tech lead:
quando os dois pedem coisas diferentes, o site atende o tech lead.

Hugo não está reposicionado como sênior. O claim publicado é **Pleno**, e a
ambição do portfólio é ser **julgado com régua sênior enquanto anuncia Pleno** —
essa distância é intencional e não deve ser "corrigida" por nenhum trabalho futuro.

## Product Purpose

Portfólio pessoal de Hugo Nazário, publicado em
`https://hugonazario.com/`. Existe para converter um perfil de
LinkedIn em uma conversa de contratação, provando com peça verificável — não com
adjetivo — que três anos respondendo pela inteligência de dados de um ISP em operação produziram
trabalho que aguenta auditoria técnica.

Sucesso = o tech lead abre pelo menos um repositório, encontra lá o mesmo número
que leu no site, e entra em contato.

## Positioning

Três coisas que um portfólio de dados vizinho não copiaria sem mentir:

1. **Operação real, escopo inteiro.** Hugo responde por toda a inteligência de
   dados de um provedor de fibra, ponto focal para seis setores — Comercial,
   Financeiro, NOC, Suporte, Projetos e Diretoria. Não é estudo de caso: é
   indicador que nasceu, foi contestado em reunião de diretoria e virou rotina
   de decisão.

   **Como isso é dito, e por quê (2026-09-03).** O texto era "único analista,
   uma pessoa só". O fato é verdadeiro e continua sendo — o que mudou é que ele
   saiu do material público. O escopo já é inteiro sem essa palavra ("ponto
   focal de seis setores" diz que tudo passa por ele); "único" não acrescenta
   escopo nenhum e acrescenta dois riscos na leitura de quem contrata: sugere
   que nunca houve par técnico nem revisão de código, e convida a descontar os
   números porque ninguém os conferiu. As vagas-alvo pedem explicitamente
   colaboração com Produto, Growth, Engenharia e Ciência de Dados — dizer-se
   sozinho joga contra exatamente esse requisito. Se alguém for reescrever esta
   seção, o fato pode voltar numa entrevista; no site, não.
2. **Número publicado é asserção testada, não texto em Markdown.** Suítes de
   teste leem os números que os READMEs citam e conferem contra o que o pipeline
   devolve; divergir quebra o CI. Foi assim que um erro factual publicado ("São
   Paulo tem a melhor taxa do país" — SP é o 5º) foi encontrado e corrigido.
3. **Procedência do dado declarada na cara do cartão.** Cada projeto diz se roda
   sobre dado *Sintético*, *Observado (IBGE)* ou *Produção*. A regra existe porque
   "base de 88.501 clientes" sem essa etiqueta é lido como base real de cliente real.

## Operating Context

- **Canal de divulgação: LinkedIn.** O site é aberto a partir de um post/perfil,
  então o card de compartilhamento (Open Graph, `og:image` em URL absoluta) é
  parte funcional do produto, não enfeite de `<head>`.
- **Hospedagem: GitHub Pages com domínio próprio** (`hugonazario.com`, `base: "/"`
  desde 2026-09-03; antes era subdiretório `/portfolio/`). Sem backend, sem
  banco, sem rota de servidor — o build precisa continuar funcionando sob `base`.
- **O site é a porta, o GitHub é a sala.** Todo projeto do site aponta para um
  repositório público (exceto o HUG, privado por conter credenciais no histórico).
  O portfólio maior vive em a pasta local do portfólio maior com 8 projetos e
  um `ROADMAP.md` que dá nota por dimensão e por projeto.
- **Leitura em duas velocidades**, no mesmo scroll: o RH varre, o tech lead lê.

## Capabilities and Constraints

- **Idioma: apenas PT-BR.** Sem seletor de idioma, sem versão em inglês. `lang="pt-BR"`.
- SPA de página única em scroll contínuo; navegação é âncora interna, não rota.
- Stack incumbente: React 19, TypeScript, Vite, `lucide-react`. Sem Tailwind (saiu em 2026-08: nenhuma classe dele era usada); estilo é objeto inline + `GlobalStyles.tsx`.
  Validação do front é `npm run build` (roda ESLint), não `vite build` isolado.
- Sem CMS e sem fonte de dados dinâmica: todo conteúdo é estático em
  `src/data/projects.ts` e `src/data/content.ts`.
- **Nenhum claim novo pode ser inventado por trabalho de design.** Número, prazo,
  cliente, certificação e resultado só entram no site se já existirem verificáveis
  no repositório de origem. Reescrever copy factual exige confirmação de Hugo.
- **Em aberto (não inventar):** destino de deploy permanece GitHub Pages até que
  Hugo diga o contrário; a disponibilidade declarada ("Disponível para projetos")
  não foi reconfirmada nesta rodada.

## Brand Commitments

- **Nome e cargo publicados:** Hugo Nazário · Analista de Dados **Pleno** ·
  Speed Fibra (Jul 2023 — Presente; Júnior de Fev a Jun 2023) · Santa Luzia, MG.
- **Identidade visual (25/11/2026, decisão do Hugo, substitui a paleta verde/lima):**
  site **preto e minimalista**, acento único **azul `#2F6BD8`** e a logo **"Hn"
  escrito à mão atravessando um círculo cortado** (escolhida entre 10 rodadas;
  geradores e histórico em `docs/marca/`). O azul não passa contraste como cor
  de texto sobre o preto: é traço e superfície, nunca letra. Motion bem feito e
  completo, mas nada exagerado; nada que pareça gerado por IA.
- **A fotografia de Hugo é obrigatória e permanece em recorte circular.** Razão
  dada por ele: traz personalidade, e portfólio sempre tem foto. O arquivo
  (`public/hugo-foto.webp`, 720×720) já vem enquadrado por `tools/enquadrar_foto.py`
  — recortar de novo no CSS ancora o rosto no lugar errado. Desde 2026-09-03 é um
  retrato de estúdio no mesmo zoom (1,4) da foto do LinkedIn, para o perfil e o
  site mostrarem o mesmo enquadramento.
- **Voz:** direta, técnica, sem superlativo. Frases curtas, número no fim da
  afirmação, nenhum "apaixonado por dados". Escreve o que foi feito e o que o
  número mostra; quando o achado é fraco, diz que é fraco.
- **Links canônicos:** GitHub `HugoLeonardoNz`, LinkedIn `hugo-nazario`.

## Evidence on Hand

Tudo abaixo existe e é verificável — nada precisa ser fabricado.

- **8 projetos** em `portfolio/src/data/projects.ts`, 7 públicos + 1 privado:
  Telecom Operadoras (Power BI), Brecha Digital Brasil (Power BI), Telecom KPI
  Dashboard (Streamlit), HUG — Hub Unificado de Gestão (privado), Customer Churn
  Predictor (Streamlit), Expansão de Mercado (EDA), SQL Analytics Pack (dbt/SQL),
  Telecom EDA — ANATEL.
- **Procedência por projeto, já etiquetada:** 5 sintéticos, 2 observados (IBGE),
  1 de produção (HUG).
- **34 capturas de tela reais** em `portfolio/public/telas/` (7 galerias:
  telecom-bi 6, eda 6, market 6, brecha 5, kpi 5, churn 4, sqlpack 2), geradas
  por script (`tools/gerar_telas.py`, `tools/capturar_pbix.ps1`) — não recortadas à mão.
- **2 demos ao vivo** em Streamlit (telecom-kpi-dashboard, churn-predictor).
- **2 arquivos `.pbix` entregues**, com camada de relatório gerada por código.
- **Testes em CI** nos repositórios do portfólio, incluindo suítes que checam as
  afirmações publicadas contra o pipeline (`ROADMAP.md` registra 58 testes em 5
  repositórios e LICENSE nos 8 na revisão de 2026-08-21).
- **Achados nomeáveis, já auditados:** o paradoxo de SP (5º em taxa, 1º em volume);
  Norte urbano 95,2% × rural 70,4%; H1 refutada em 4,6pp; AUC 0,785 depois que o
  gerador ganhou desfechos que contrariam o comportamento; HHI de concentração
  de mercado.
- **`ROADMAP.md` na raiz** com nota por dimensão e por projeto e histórico das
  correções — é o registro de honestidade analítica do portfólio.
- **Ausências que não podem virar conteúdo:** não há depoimento, cliente,
  certificação, prêmio, métrica de negócio atribuída (tipo "reduzi churn em X%")
  nem número de visitantes. Nada disso deve aparecer.

## Product Principles

1. **Todo número na tela tem origem rastreável.** Se não sobrevive a "como você
   chegou nisso?", sai do site — inclusive quando enfraquece a manchete.
2. **A procedência do dado anda colada ao número.** Sintético, observado e
   produção são coisas diferentes e o visitante nunca deve ter que descobrir qual é.
3. **O portfólio serve o tech lead primeiro.** Escaneabilidade para o RH é
   consequência de boa hierarquia, nunca desculpa para diluir profundidade técnica.
4. **A peça é a prova; o site é a moldura.** Tela real, repositório aberto e demo
   ao vivo valem mais que qualquer adjetivo sobre competência.
5. **Anuncia Pleno, entrega régua sênior.** O rigor é o argumento — o cargo no
   texto permanece honesto.

## Accessibility & Inclusion

Nenhum requisito específico foi estabelecido por Hugo. Vale a régua padrão de
web: contraste suficiente em texto pequeno (o azul nunca é cor de texto), alvo de toque
adequado, navegação por teclado nas âncoras e respeito a `prefers-reduced-motion`
(o site tem a logo que se escreve, revelações ao rolar e a linha da trajetória).
