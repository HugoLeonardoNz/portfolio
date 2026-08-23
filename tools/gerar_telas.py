"""
gerar_telas.py — monta as miniaturas navegáveis dos cartões de projeto.

POR QUE ESTE ARQUIVO EXISTE
───────────────────────────
Cada projeto do portfólio tem várias telas: um relatório Power BI tem 5 ou 6
páginas, um app Streamlit tem 4 ou 5 abas, uma EDA tem 7 gráficos. O cartão do
site mostrava só o nome e um parágrafo — quem não clicasse no GitHub não via
nada.

As imagens são geradas por script, não recortadas à mão, pelo mesmo motivo que
as figuras dos READMEs são: print recortado envelhece calado e ninguém percebe
que ele mostra um número que o projeto não devolve mais.

    python tools/gerar_telas.py            # tudo que dá para gerar sem interação
    python tools/gerar_telas.py eda        # só um grupo

O QUE ESTE SCRIPT NÃO FAZ
─────────────────────────
Não captura as páginas dos dois `.pbix` nem as abas dos apps Streamlit. As duas
precisam de clique — página do Power BI só existe dentro do Desktop, e aba do
Streamlit não tem URL própria. Essas ficam em `public/telas/<projeto>/` gravadas
por outro caminho, e o script avisa quando faltam.
"""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PORTFOLIO = RAIZ.parent
TELAS = RAIZ / "public" / "telas"

CHROME = next(
    (p for p in [
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
        Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    ] if p.exists()),
    None,
)

# (destino, origem, largura, altura)
# Os HTML do Plotly abrem em servidor local: file:// nao carrega o CDN.
HTML = {
    "market": [
        ("01", "market-expansion-eda/outputs/figures/taxa_x_volume.html", 1500, 760),
        ("02", "market-expansion-eda/outputs/figures/ic_ranking_taxa.html", 1500, 900),
        ("03", "market-expansion-eda/outputs/figures/gap_urbano_rural.html", 1500, 760),
        ("04", "market-expansion-eda/outputs/figures/correlacao_idh_internet.html", 1500, 760),
        ("05", "market-expansion-eda/outputs/figures/tendencia_nacional.html", 1500, 700),
        ("06", "market-expansion-eda/outputs/figures/score_oportunidade.html", 1500, 760),
    ],
    "eda": [
        ("01", "telecom-eda-public/outputs/figures/operadoras.html", 1500, 720),
        ("02", "telecom-eda-public/outputs/figures/motivos.html", 1500, 720),
        ("03", "telecom-eda-public/outputs/figures/heatmap_op_motivo.html", 1500, 760),
        ("04", "telecom-eda-public/outputs/figures/serie_temporal.html", 1500, 700),
        ("05", "telecom-eda-public/outputs/figures/top15_estados.html", 1500, 800),
        ("06", "telecom-eda-public/outputs/figures/sazonalidade_trimestre.html", 1500, 700),
    ],
}

# Imagens que ja existem no repositorio de origem e so precisam ser copiadas.
COPIAS = {
    "sqlpack": [
        ("01", "sql-analytics-pack/docs/img/ranking_vendedores.png"),
        ("02", "sql-analytics-pack/docs/img/inadimplencia_aging.png"),
    ],
    "telecom-bi": [(f"{i:02d}", f"telecom-powerbi-public/docs/img/0{i}-{n}.png")
                   for i, n in enumerate(
                       ["panorama", "operadoras", "motivos", "regioes", "risco", "metodologia"], 1)],
    "brecha": [(f"{i:02d}", f"socioeconomic-powerbi-public/docs/img/0{i}-{n}.png")
               for i, n in enumerate(
                   ["brecha", "paradoxo", "explica", "oportunidade", "metodologia"], 1)],
    "kpi":   [("01", "telecom-kpi-dashboard/docs/img/overview.png")],
    "churn": [("01", "churn-predictor/docs/img/app.png")],
}


def servidor(raiz: Path, porta: int):
    return subprocess.Popen(
        [sys.executable, "-m", "http.server", str(porta), "-d", str(raiz)],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


def capturar(url: str, destino: Path, w: int, h: int) -> bool:
    if CHROME is None:
        print("   ! Chrome nao encontrado")
        return False
    destino.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run([
        str(CHROME), "--headless=new", "--disable-gpu", "--hide-scrollbars",
        "--virtual-time-budget=6000", f"--window-size={w},{h}",
        f"--screenshot={destino}", url,
    ], capture_output=True, timeout=120)
    ok = destino.exists() and destino.stat().st_size > 5000
    if not ok:
        print(f"   ! falhou: {destino.name} ({r.returncode})")
    return ok


def grupo_html(nome: str) -> int:
    itens = HTML[nome]
    porta = 8790
    srv = servidor(PORTFOLIO, porta)
    n = 0
    try:
        import time
        time.sleep(2)
        for idx, rel, w, h in itens:
            origem = PORTFOLIO / rel
            if not origem.exists():
                print(f"   - ausente: {rel}")
                continue
            url = f"http://localhost:{porta}/{rel}"
            if capturar(url, TELAS / nome / f"{idx}.png", w, h):
                n += 1
    finally:
        srv.terminate()
    return n


def grupo_copia(nome: str) -> int:
    n = 0
    for idx, rel in COPIAS[nome]:
        origem = PORTFOLIO / rel
        if not origem.exists():
            print(f"   - ausente: {rel}")
            continue
        destino = TELAS / nome / f"{idx}.png"
        destino.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(origem, destino)
        n += 1
    return n


def main() -> None:
    alvos = sys.argv[1:] or list(HTML) + list(COPIAS)
    total = 0
    for nome in alvos:
        print(f"\n{nome}")
        if nome in HTML:
            n = grupo_html(nome)
        elif nome in COPIAS:
            n = grupo_copia(nome)
        else:
            print("   ? grupo desconhecido")
            continue
        print(f"   {n} tela(s)")
        total += n
    print(f"\n{total} telas em {TELAS.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
