"""Confere se cada link "Ver ao vivo" do site abre de verdade.

POR QUE ESTE ARQUIVO EXISTE
---------------------------
O workflow anterior perguntava `/_stcore/health` e tratava qualquer coisa
diferente de 200 como "app dormindo". A pergunta estava errada duas vezes:

1. O endpoint responde **303** para todo visitante sem cookie de sessao — e o
   Streamlit passou a exigir esse cookie. O check reprovava os dois apps todo
   dia, inclusive com os dois no ar, e o e-mail de falha virou ruido.
2. Seguindo o redirecionamento, ele responde **200 com o HTML do app** tanto
   acordado quanto dormindo: os dois devolvem os mesmos 9.426 bytes. A tela de
   "This app has gone to sleep" e desenhada por JavaScript depois. Nenhuma
   checagem por `curl` consegue separar os dois estados.

Ou seja: o guarda que existia para impedir link morto no portfolio nao
conseguia ver link morto. Um `curl` le o servidor; quem precisa ser conferido e
a TELA. Entao aqui o app e aberto num Chromium de verdade e o veredito sai do
que ficou renderizado.

O que este script confere, por link:

* host do Streamlit  -> abre a pagina, espera o app montar e reprova se
  aparecer a tela de hibernacao ou se o corpo vier vazio;
* qualquer outro     -> confere apenas que o endereco responde (os relatorios
  do Power BI/Fabric sao embed com autenticacao propria; renderizar em CI daria
  falso negativo).

A lista de links sai de `src/data/projects.ts`, nunca escrita aqui: se um
cartao ganhar ou perder o "Ver ao vivo", esta conferencia acompanha sozinha —
mesmo principio de `tools/conferir_repos.py`.

A visita em si tambem serve de proposito: o Community Cloud hiberna app com ~7
dias sem trafego, e abrir a pagina zera esse relogio.
"""
from __future__ import annotations

import pathlib
import re
import sys
import urllib.request

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PROJETOS = RAIZ / "src" / "data" / "projects.ts"

# Marcas da tela de hibernacao do Streamlit Community Cloud.
SONO = ("gone to sleep", "get this app back up", "Zzzz")


def links() -> list[str]:
    fonte = PROJETOS.read_text(encoding="utf-8")
    achados = re.findall(r'liveUrl:\s*"([^"]+)"', fonte)
    return sorted(set(achados))


def confere_http(url: str) -> tuple[bool, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (portfolio-ci)"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return (200 <= r.status < 400), f"HTTP {r.status}"
    except Exception as e:  # noqa: BLE001 — qualquer falha aqui e link quebrado
        return False, f"{type(e).__name__}: {e}"


def confere_tela(url: str) -> tuple[bool, str]:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page()
        try:
            pagina.goto(url, wait_until="domcontentloaded", timeout=90_000)
            # O Streamlit monta a tela por WebSocket depois do HTML; sem esta
            # espera, o corpo vem vazio nos dois estados e o teste nao decide.
            pagina.wait_for_timeout(20_000)

            # A tela de hibernacao e desenhada no documento PRINCIPAL. Ja o app
            # em si roda dentro de um IFRAME — ler so `body` da pagina de fora
            # devolve zero caractere com o app perfeitamente no ar, que foi
            # exatamente o falso negativo que derrubou a primeira versao disto.
            topo = (pagina.inner_text("body") or "").strip()
            interno = ""
            for quadro in pagina.frames:
                if quadro is pagina.main_frame:
                    continue
                try:
                    interno += (quadro.inner_text("body") or "").strip()
                except Exception:  # noqa: BLE001 — quadro de anuncio/telemetria
                    pass
        finally:
            navegador.close()

    if any(m.lower() in topo.lower() for m in SONO):
        return False, "DORMINDO (tela de hibernacao renderizada)"
    renderizado = len(topo) + len(interno)
    if renderizado < 40:
        return False, f"tela vazia ({renderizado} caracteres renderizados)"
    return True, f"{renderizado} caracteres na tela"


def main() -> int:
    urls = links()
    if not urls:
        print("Nenhum liveUrl em src/data/projects.ts — nada a vigiar.")
        return 0

    falhas = 0
    for url in urls:
        if "streamlit.app" in url:
            ok, detalhe = confere_tela(url)
        else:
            ok, detalhe = confere_http(url)
        print(f"  {'de pé   ' if ok else 'FALHOU  '} {url}  ({detalhe})")
        falhas += 0 if ok else 1

    print()
    if falhas:
        print(f"{falhas} link(s) 'Ver ao vivo' do site nao abrem para um visitante.")
        print('Se for app do Streamlit dormindo: abra o link e clique em')
        print('"Yes, get this app back up!" — leva ~30s, e depois esta rotina')
        print("segura o app acordado sozinha.")
        return 1

    print("Todos os links 'Ver ao vivo' do site abrem.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
