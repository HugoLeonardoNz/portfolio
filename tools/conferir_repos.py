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

    runs = _get(f"{API}/repos/{slug}/actions/runs?branch={branch}&per_page=10")
    execucoes = runs.get("workflow_runs", [])
    if not execucoes:
        problemas.append("nenhum workflow já rodou — badge de CI aqui seria decorativo")
    else:
        # Uma execução por workflow: o mais recente de cada nome.
        recentes = {}
        for r in execucoes:
            recentes.setdefault(r["name"], r)
        for nome, r in recentes.items():
            if r["conclusion"] != "success":
                problemas.append(f'CI "{nome}" está {r["conclusion"]}')

    try:
        readme = _get(f"{API}/repos/{slug}/readme")
        import base64
        conteudo = base64.b64decode(readme["content"]).decode("utf-8", "replace")
        if SITE not in conteudo:
            problemas.append("o README não aponta de volta para o site")
    except urllib.error.HTTPError:
        problemas.append("sem README")

    return problemas


def main() -> int:
    projetos = projetos_do_site()
    if not projetos:
        print("Nenhum projeto com githubUrl em projects.ts — algo quebrou no parser.")
        return 1

    print(f"Conferindo {len(projetos)} repositórios anunciados pelo site.\n")
    falhas = 0
    for titulo, slug in projetos:
        problemas = conferir(titulo, slug)
        if problemas:
            falhas += 1
            print(f"  FALHA  {titulo}  ({slug})")
            for p in problemas:
                print(f"         - {p}")
        else:
            print(f"  ok     {titulo}")

    print()
    if falhas:
        print(f"{falhas} de {len(projetos)} repositórios fora de alinhamento com o site.")
        return 1
    print(f"Os {len(projetos)} repositórios estão alinhados com o site.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
