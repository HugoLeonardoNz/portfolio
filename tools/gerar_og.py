"""
Gera o cartao de compartilhamento (og:image) do portfolio.

POR QUE EXISTE
--------------
O og:image era `hugo-foto.png`: 720x720, quadrada. O `twitter:card` declarado e
`summary_large_image`, que espera 1200x630 (1,91:1). LinkedIn e Twitter cortam a
imagem para caber — e o corte de uma foto de rosto quadrada num quadro
panoramico tira a cabeca ou deixa barra.

O canal de divulgacao do portfolio e o LinkedIn (esta no PRODUCT.md). O cartao
de compartilhamento nao e enfeite de <head>: e a primeira coisa que o avaliador
ve, antes do site.

Uso: python tools/gerar_og.py
"""

from __future__ import annotations

import re

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "og-card-v5.png"
FOTO = RAIZ / "public" / "hugo-foto.webp"

W, H = 1200, 630
BG = "#0b0a0a"
ACID = "#2f6bd8"
INK = "#ede8e3"
INK3 = "#87807a"
ON_ACID = "#ffffff"

FONTES = "C:/Windows/Fonts"


def fonte(nome: str, tamanho: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(f"{FONTES}/{nome}", tamanho)
    except OSError:
        return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Faixa azul a esquerda (identidade de 25/11/2026): o acento como SUPERFICIE, a regra do theme.ts.
    d.rectangle([0, 0, 14, H], fill=ACID)

    f_nome = fonte("arialbd.ttf", 78)
    f_cargo = fonte("arialbd.ttf", 30)
    f_txt = fonte("arial.ttf", 25)
    f_meta = fonte("arialbd.ttf", 23)

    x = 72
    d.text((x, 92), "HUGO NAZÁRIO", font=f_nome, fill=INK)
    d.text((x, 190), "Analista de Dados Pleno", font=f_cargo, fill="#7ea6f0")

    # SEM "único analista" (2026-09-03). O PRODUCT.md tirou esse enquadramento
    # do material público — ele não acrescenta escopo ("ponto focal de seis
    # setores" já diz que tudo passa por ele) e acrescenta dois riscos na
    # leitura de quem contrata: sugere que nunca houve par técnico nem revisão
    # de código, e convida a descontar os números porque ninguém os conferiu.
    # O card ficou com a frase antiga porque foi gerado antes daquela decisão:
    # a imagem é a única peça do portfólio que não se regera sozinha.
    linhas = [
        "Quase quatro anos de inteligência de dados num provedor",
        "de fibra em operação — ponto focal de seis setores.",
    ]
    y = 250
    for ln in linhas:
        d.text((x, y), ln, font=f_txt, fill=INK)
        y += 36

    # Provas verificaveis, nao adjetivos.
    # As provas saem do og:image:alt do index.html, e nao de uma copia aqui.
    # O alt e o texto que descreve esta imagem: se os dois divergirem, quem usa
    # leitor de tela ouve um numero e quem ve o card le outro. E `conferir_repos`
    # confere esse mesmo alt contra a contagem real dos repositorios, entao o
    # numero tem exatamente um dono e uma verificacao.
    alt = re.search(r'og:image:alt"?\s+content="([^"]*)"',
                    (RAIZ / "index.html").read_text(encoding="utf-8"))
    if not alt:
        raise SystemExit("index.html nao tem og:image:alt — sem fonte para as provas.")
    provas = [t.strip() for t in alt.group(1).split("—")[-1].split(",")]
    y = 372
    for p in provas:
        d.ellipse([x + 2, y + 9, x + 12, y + 19], fill=ACID)
        d.text((x + 26, y), p, font=f_meta, fill=INK)
        y += 40

    d.text((x, 545), "hugonazario.com", font=f_txt, fill=INK3)

    # Foto em P&B no círculo, com o círculo cortado da logo em azul.
    if FOTO.exists():
        lado = 300
        foto = Image.open(FOTO).convert("L").convert("RGB").resize((lado, lado), Image.LANCZOS)
        mask = Image.new("L", (lado, lado), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, lado, lado], fill=255)
        cx, cy = W - lado - 80, (H - lado) // 2
        d.arc([cx - 14, cy - 14, cx + lado + 14, cy + lado + 14], start=-20, end=250, fill=ACID, width=6)
        img.paste(foto, (cx, cy), mask)

    img.save(DESTINO, "PNG", optimize=True)
    print(f"{DESTINO.relative_to(RAIZ)} — {img.size[0]}x{img.size[1]} · "
          f"{DESTINO.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
