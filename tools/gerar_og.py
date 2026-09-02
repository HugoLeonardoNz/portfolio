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

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "og-card.png"
FOTO = RAIZ / "public" / "hugo-foto.png"

W, H = 1200, 630
BG = "#141c0d"
ACID = "#d4f74a"
INK = "#eef5c8"
INK3 = "#8a9470"
ON_ACID = "#141c0d"

FONTES = "C:/Windows/Fonts"


def fonte(nome: str, tamanho: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(f"{FONTES}/{nome}", tamanho)
    except OSError:
        return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Faixa lima a esquerda: o acento como SUPERFICIE, a regra do theme.ts.
    d.rectangle([0, 0, 14, H], fill=ACID)

    f_nome = fonte("arialbd.ttf", 78)
    f_cargo = fonte("arialbd.ttf", 30)
    f_txt = fonte("arial.ttf", 25)
    f_meta = fonte("arialbd.ttf", 23)

    x = 72
    d.text((x, 92), "HUGO LEONARDO", font=f_nome, fill=INK)
    d.text((x, 190), "Analista de Dados Pleno", font=f_cargo, fill=ACID)

    linhas = [
        "Três anos como único analista de um provedor de fibra",
        "em operação — ponto focal de seis setores.",
    ]
    y = 250
    for ln in linhas:
        d.text((x, y), ln, font=f_txt, fill=INK)
        y += 36

    # Provas verificaveis, nao adjetivos.
    provas = ["8 projetos públicos", "151 testes em CI", "3 sobre dado observado"]
    y = 372
    for p in provas:
        d.ellipse([x + 2, y + 9, x + 12, y + 19], fill=ACID)
        d.text((x + 26, y), p, font=f_meta, fill=INK)
        y += 40

    d.text((x, 545), "hugoleonardonz.github.io/portfolio", font=f_txt, fill=INK3)

    # Foto em circulo, com anel lima.
    if FOTO.exists():
        lado = 300
        foto = Image.open(FOTO).convert("RGB").resize((lado, lado), Image.LANCZOS)
        mask = Image.new("L", (lado, lado), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, lado, lado], fill=255)
        cx, cy = W - lado - 80, (H - lado) // 2
        d.ellipse([cx - 6, cy - 6, cx + lado + 6, cy + lado + 6], outline=ACID, width=5)
        img.paste(foto, (cx, cy), mask)

    img.save(DESTINO, "PNG", optimize=True)
    print(f"{DESTINO.relative_to(RAIZ)} — {img.size[0]}x{img.size[1]} · "
          f"{DESTINO.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
