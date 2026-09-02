"""
Confere se o site e os repositórios que ele anuncia continuam alinhados.

    python tools/conferir_repos.py

POR QUE ESTE ARQUIVO EXISTE
---------------------------
O site é a base do portfólio: é ele que diz o que cada projeto é e qual número
o defende. Só que os repositórios vivem em outro lugar, e por meses eles
ficaram para trás sem que nada avisasse — trinta commits parados, badges de CI
apontando para workflows que não existiam no GitHub, e um app público exibindo
uma AUC que o próprio teste do repositório reprovava.

O que este script confere, para cada projeto público de `src/data/projects.ts`:

  1. o repositório existe, é público e não está arquivado;
  2. a última execução de CI no branch padrão passou;
  3. o README aponta de volta para o site.

Ele NÃO tenta conferir número por número contra o texto do README. Essa é a
função dos testes DENTRO de cada repositório, que leem o dado e não a prosa —
duplicar isso aqui criaria justamente o registro paralelo mantido à mão que o
resto do portfólio passou a semana removendo.

A lista de projetos é DERIVADA de projects.ts. Não há um segundo inventário
para manter em dia: apagar um cartão do site tira o repositório da conferência
no mesmo commit.
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
PROJECTS_TS = RAIZ / "src" / "data" / "projects.ts"
API = "https://api.github.com"
SITE = "hugoleonardonz.github.io/portfolio"


def _get(url: str):
    req = urllib.request.Request(url, headers={
        "Accept": "application/vnd.github+json",
        "User-Agent": "conferir-repos",
    })
    # O GITHUB_TOKEN do Actions sobe o limite de 60 para 1000 chamadas/hora.
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def projetos_do_site() -> list[tuple[str, str]]:
    """(título, dono/repo) de cada cartão com link de GitHub."""
    texto = PROJECTS_TS.read_text(encoding="utf-8")
    blocos = texto.split("id:")[1:]
    saida = []
    for b in blocos:
        titulo = re.search(r'title:\s*"([^"]+)"', b)
        url = re.search(r'githubUrl:\s*"https://github\.com/([^"]+)"', b)
        if titulo and url:
            saida.append((titulo.group(1), url.group(1).rstrip("/")))
    return saida


def conferir(titulo: str, slug: str) -> list[str]:
    problemas = []
    try:
        repo = _get(f"{API}/repos/{slug}")
    except urllib.error.HTTPError as e:
        return [f"repositório inacessível ({e.code}) — o link do cartão está quebrado"]

    if repo.get("private"):
        problemas.append("está privado, mas o cartão diz Público")
    if repo.get("archived"):
        problemas.append("está arquivado")

    branch = repo.get("default_branch", "main")

    runs = _get(f"{API}/repos/{slug}/actions/runs?branch={branch}&per_page=30")
    execucoes = runs.get("workflow_runs", [])
    if not execucoes:
        problemas.append("nenhum workflow já rodou — badge de CI aqui seria decorativo")
    else:
        # Só execuções CONCLUÍDAS, e a mais recente de cada workflow. Uma
        # execução em andamento tem conclusion nula, e a primeira versão deste
        # script lia isso como falha: quando dois repositórios eram publicados
        # com segundos de diferença, o segundo ainda estava rodando e a
        # conferência reprovava um alinhamento que estava certo.
        recentes = {}
        for r in execucoes:
            if r.get("status") == "completed":
                recentes.setdefault(r["name"], r)
        rodando = {r["name"] for r in execucoes if r.get("status") != "completed"}
        for nome, r in recentes.items():
            if r["conclusion"] != "success":
                problemas.append(f'CI "{nome}" está {r["conclusion"]}')
        for nome in rodando - set(recentes):
            print(f"         . CI \"{nome}\" ainda rodando — sem veredito anterior")

    try:
        readme = _get(f"{API}/repos/{slug}/readme")
        import base64
        conteudo = base64.b64decode(readme["content"]).decode("utf-8", "replace")
        if SITE not in conteudo:
            problemas.append("o README não aponta de volta para o site")
    except urllib.error.HTTPError:
        problemas.append("sem README")

    return problemas



# --------------------------------------------------------------------------
# A contagem de testes que o site reivindica
# --------------------------------------------------------------------------
# Este e o unico numero do portfolio que NENHUM repositorio consegue conferir
# sozinho: e uma soma sobre os oito. O cartao de compartilhamento dizia "151
# testes em CI" e o real eram 144 — a diferenca entrou quando um projeto ganhou
# testes e ninguem voltou no index.html.
#
# Nao ha registro paralelo aqui: o numero mora em UM lugar (o og:image:alt do
# index.html), `gerar_og.py` le dele, e esta funcao confere contra a realidade
# dos repositorios. Divergiu, o deploy para.
#
# Conta-se `def test_` e nao o que o pytest coleta: parametrizacao faz um `def`
# virar varios casos (144 defs, 155 casos), e so a primeira e legivel pela API
# sem clonar e executar cada repositorio. Reivindicar o menor dos dois numeros
# e a escolha certa quando os dois sao defensaveis.

TESTES_RE = re.compile(r"^def test_", re.M)
ALT_RE = re.compile(r'og:image:alt"?\s+content="([^"]*)"')
NUM_TESTES_RE = re.compile(r"(\d+)\s+testes em CI")


def testes_reivindicados() -> int | None:
    """O numero escrito no cartao de compartilhamento do site."""
    html = (RAIZ / "index.html").read_text(encoding="utf-8")
    alt = ALT_RE.search(html)
    if not alt:
        return None
    achado = NUM_TESTES_RE.search(alt.group(1))
    return int(achado.group(1)) if achado else None


def testes_no_repo(slug: str) -> int:
    """Funcoes de teste sob tests/ no branch padrao."""
    import base64
    branch = _get(f"{API}/repos/{slug}")["default_branch"]
    arvore = _get(f"{API}/repos/{slug}/git/trees/{branch}?recursive=1")
    total = 0
    for item in arvore.get("tree", []):
        if re.match(r"tests/.*\.py$", item["path"]):
            blob = _get(f"{API}/repos/{slug}/git/blobs/{item['sha']}")
            texto = base64.b64decode(blob["content"]).decode("utf-8", "replace")
            total += len(TESTES_RE.findall(texto))
    return total


def main() -> int:
    projetos = projetos_do_site()
    if not projetos:
        print("Nenhum projeto com githubUrl em projects.ts — algo quebrou no parser.")
        return 1

    print(f"Conferindo {len(projetos)} repositórios anunciados pelo site.\n")
    falhas = 0
    testes = 0
    for titulo, slug in projetos:
        testes += testes_no_repo(slug)
        problemas = conferir(titulo, slug)
        if problemas:
            falhas += 1
            print(f"  FALHA  {titulo}  ({slug})")
            for p in problemas:
                print(f"         - {p}")
        else:
            print(f"  ok     {titulo}")

    print()

    # A contagem de testes: soma sobre os oito, entao so aqui da para conferir.
    reivindicado = testes_reivindicados()
    if reivindicado is None:
        print("O index.html nao declara mais 'N testes em CI' no og:image:alt.")
        falhas += 1
    elif reivindicado != testes:
        print(f"O site reivindica {reivindicado} testes em CI; os repositorios "
              f"somam {testes}.")
        print(f"   Ajuste o og:image:alt do index.html para {testes} e rode "
              f"tools/gerar_og.py.")
        falhas += 1
    else:
        print(f"Os {testes} testes reivindicados pelo site batem com os repositorios.")

    if falhas:
        print(f"{falhas} problema(s) de alinhamento entre o site e os repositórios.")
        return 1
    print(f"Os {len(projetos)} repositórios estão alinhados com o site.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
