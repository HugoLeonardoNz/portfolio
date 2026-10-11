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

A visita em si tambem serve de proposito: abrir a pagina zera o relogio de
hibernacao do Community Cloud.

ACORDAR SOZINHO (2026-10-11)
----------------------------
A primeira versao so avisava: "dormiu, alguem clique no botao". Ela falhou em
TODAS as execucoes de 23/09 a 09/10, porque partia de duas premissas erradas:

1. que o app dorme com ~7 dias sem trafego. O historico da propria rotina
   desmente: em 21/09 16h os dois estavam de pe, em 23/09 14h os dois dormiam.
   O prazo real e menor que dois dias, e a rotina rodava a cada dois;
2. que acordar "so uma pessoa faz". O botao e um <button> comum: o mesmo
   Chromium que le a tela consegue clicar nele.

Agora, se a tela de hibernacao aparece, o script clica em "Yes, get this app
back up!" e espera o app subir. So reprova se, depois disso, ele continuar
fora do ar — que e o caso em que uma pessoa precisa olhar de verdade.
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

# Quanto esperar o app subir depois de clicar em acordar.
ESPERA_ACORDAR_S = 300


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


def _le_tela(pagina) -> tuple[str, str]:
    """Texto do documento principal e dos iframes.

    A tela de hibernacao e desenhada no documento PRINCIPAL. Ja o app em si
    roda dentro de um IFRAME — ler so `body` da pagina de fora devolve zero
    caractere com o app perfeitamente no ar, que foi exatamente o falso
    negativo que derrubou a primeira versao disto.
    """
    topo = (pagina.inner_text("body") or "").strip()
    interno = ""
    for quadro in pagina.frames:
        if quadro is pagina.main_frame:
            continue
        try:
            interno += (quadro.inner_text("body") or "").strip()
        except Exception:  # noqa: BLE001 — quadro de anuncio/telemetria
            pass
    return topo, interno


def _dormindo(topo: str) -> bool:
    return any(m.lower() in topo.lower() for m in SONO)


def confere_tela(url: str) -> tuple[bool, str]:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page()
        acordou = False
        try:
            # Uma segunda tentativa de navegacao: o Community Cloud as vezes
            # deixa a primeira conexao expirar quando o app esta frio.
            for tentativa in (1, 2):
                try:
                    pagina.goto(url, wait_until="domcontentloaded", timeout=90_000)
                    break
                except Exception:  # noqa: BLE001
                    if tentativa == 2:
                        raise
            # O Streamlit monta a tela por WebSocket depois do HTML; sem esta
            # espera, o corpo vem vazio nos dois estados e o teste nao decide.
            pagina.wait_for_timeout(20_000)
            topo, interno = _le_tela(pagina)

            if _dormindo(topo):
                pagina.get_by_role("button", name=re.compile("get this app back up", re.I)).click(timeout=15_000)
                acordou = True
                # Subir um app frio leva de 30 s a alguns minutos (instala as
                # dependencias de novo). Confere a cada 15 s, ate 5 min.
                for _ in range(ESPERA_ACORDAR_S // 15):
                    pagina.wait_for_timeout(15_000)
                    topo, interno = _le_tela(pagina)
                    if not _dormindo(topo) and len(interno) >= 40:
                        break
        finally:
            navegador.close()

    if _dormindo(topo):
        return False, "DORMINDO — o botao de acordar foi clicado e o app nao subiu"
    renderizado = len(topo) + len(interno)
    if renderizado < 40:
        sufixo = " depois de clicar em acordar" if acordou else ""
        return False, f"tela vazia ({renderizado} caracteres renderizados){sufixo}"
    if acordou:
        return True, f"estava DORMINDO e foi acordado pela rotina; {renderizado} caracteres na tela"
    return True, f"{renderizado} caracteres na tela"


def main() -> int:
    urls = links()
    if not urls:
        print("Nenhum liveUrl em src/data/projects.ts — nada a vigiar.")
        return 0

    falhas = 0
    for url in urls:
        if "streamlit.app" in url:
            try:
                ok, detalhe = confere_tela(url)
            except Exception as e:  # noqa: BLE001 — rede fora, navegador caiu
                # Um link que nao abre e um FALHOU com motivo, nao um traceback
                # que esconde o resultado dos outros links.
                ok, detalhe = False, f"{type(e).__name__}: {str(e).splitlines()[0]}"
        else:
            ok, detalhe = confere_http(url)
        print(f"  {'de pé   ' if ok else 'FALHOU  '} {url}  ({detalhe})")
        falhas += 0 if ok else 1

    print()
    if falhas:
        print(f"{falhas} link(s) 'Ver ao vivo' do site nao abrem para um visitante.")
        print("A rotina ja tenta acordar app do Streamlit sozinha. Se chegou aqui,")
        print("o app nao subiu nem depois do clique: abra o link e veja o erro.")
        return 1

    print("Todos os links 'Ver ao vivo' do site abrem.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
