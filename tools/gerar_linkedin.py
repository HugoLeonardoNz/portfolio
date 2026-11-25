"""
Gera as imagens da identidade azul (25/11/2026) a partir de UMA foto de origem:

- public/hugo-foto-v2.webp            foto do hero do site (720x720, P&B, alfa circular)
- docs/img/linkedin/foto-linkedin.png   foto de perfil do LinkedIn (800x800, P&B, anel azul)
- docs/img/linkedin/banner-linkedin.png banner do LinkedIn (1584x396), o desenho
  "terminal" que o perfil ja usava (verde), refeito em azul a pedido do Hugo.

Depois rode `python tools/gerar_og.py`: o card OG le a hugo-foto-v2.webp.
Trocou a foto? Suba a versao no nome (v2, v3...) aqui, no Hero.tsx e no gerar_og.py:
o navegador guarda a imagem pelo nome por 10 min ou mais e mostra a antiga.

POR QUE EXISTE
--------------
Foto e banner precisam bater entre site, card de compartilhamento e LinkedIn.
Imagem nao se regera sozinha, entao tem script: trocou a foto, roda de novo.

Origem da foto: docs/img/foto-origem.png (copia de
Pictures/WORNZ IMAGES/FOTO SEM FUNDO.png, 1024x1536, escolhida pelo Hugo em 25/11/2026).

Cuidados do LinkedIn com o banner:
- No desktop a foto de perfil cobre o canto inferior esquerdo (~x 30..360).
- No celular o banner e cortado nas laterais. O texto fica entre x 450 e 1150.

Uso: python tools/gerar_linkedin.py
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ / "docs" / "img" / "linkedin"
ORIGEM = RAIZ / "docs" / "img" / "foto-origem.png"
FOTO_SITE = RAIZ / "public" / "hugo-foto-v2.webp"

BG = "#0b0a0a"
ACID = "#2f6bd8"
ACID_CLARO = "#7ea6f0"
INK = "#ede8e3"
INK3 = "#87807a"
FONTES = "C:/Windows/Fonts"

# Recorte quadrado da origem (1024x1536): rosto um pouco acima do meio.
RECORTE_LADO = 1024
RECORTE_CENTRO = (512, 750)


def fonte(nome: str, tamanho: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(f"{FONTES}/{nome}", tamanho)


def hexrgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


# --- Foto -------------------------------------------------------------------

def foto_pb(lado: int) -> Image.Image:
    """Recorte quadrado da origem, em P&B, com o mesmo tratamento do CSS do hero
    (grayscale, contraste 1,06, brilho 0,96)."""
    src = Image.open(ORIGEM).convert("RGB")
    cx, cy = RECORTE_CENTRO
    m = RECORTE_LADO // 2
    corte = src.crop((cx - m, cy - m, cx + m, cy + m)).resize((lado, lado), Image.LANCZOS)
    pb = ImageOps.grayscale(corte)
    pb = ImageEnhance.Contrast(pb).enhance(1.06)
    pb = ImageEnhance.Brightness(pb).enhance(0.96)
    return pb.convert("RGB")


def mascara_circulo(lado: int) -> Image.Image:
    ss = 4
    m = Image.new("L", (lado * ss, lado * ss), 0)
    ImageDraw.Draw(m).ellipse((0, 0, lado * ss - 1, lado * ss - 1), fill=255)
    return m.resize((lado, lado), Image.LANCZOS)


def foto_site() -> Path:
    lado = 720
    img = foto_pb(lado).convert("RGBA")
    img.putalpha(mascara_circulo(lado))
    img.save(FOTO_SITE, quality=88, method=6)
    return FOTO_SITE


def foto_perfil() -> Path:
    L = 800
    ss = 4
    img = Image.new("RGB", (L, L), BG)
    margem = 70
    lado = L - 2 * margem
    img.paste(foto_pb(lado), (margem, margem), mascara_circulo(lado))
    # Anel azul cortado (a logo), desenhado 4x e reduzido para sair suave.
    anel = Image.new("RGBA", (L * ss, L * ss), (0, 0, 0, 0))
    a = (margem - 30) * ss
    ImageDraw.Draw(anel).arc([a, a, L * ss - a, L * ss - a], start=-20, end=250,
                             fill=ACID, width=16 * ss)
    anel = anel.resize((L, L), Image.LANCZOS)
    img.paste(anel, (0, 0), anel)
    destino = SAIDA / "foto-linkedin.png"
    img.save(destino, "PNG", optimize=True)
    return destino


# --- Banner -----------------------------------------------------------------

def banner() -> Path:
    W, H = 1584, 396
    ss = 2
    img = Image.new("RGB", (W * ss, H * ss), BG)
    d = ImageDraw.Draw(img, "RGBA")
    acid = hexrgb(ACID)

    def S(v):
        return v * ss

    # Brilho azul suave atras do grafico (direita): mascara borrada + cor solida.
    m = Image.new("L", img.size, 0)
    ImageDraw.Draw(m).ellipse([S(1000), S(-200), S(1900), S(600)], fill=70)
    m = m.filter(ImageFilter.GaussianBlur(S(120)))
    img = Image.composite(Image.new("RGB", img.size, ACID), img, m)
    d = ImageDraw.Draw(img, "RGBA")

    # Grade de pontos discreta.
    for gx in range(S(20), S(W), S(28)):
        for gy in range(S(14), S(H), S(28)):
            d.ellipse([gx, gy, gx + S(2), gy + S(2)], fill=(255, 255, 255, 14))

    # Faixa azul a esquerda, igual ao card OG.
    d.rectangle([0, 0, S(12), S(H)], fill=ACID)

    x = 450
    mono = fonte("consola.ttf", S(17))
    monob = fonte("consolab.ttf", S(17))

    # Etiqueta "data analyst".
    d.rounded_rectangle([S(x), S(70), S(x + 160), S(98)], radius=S(14),
                        fill=(*acid, 40), outline=(*acid, 160), width=S(1))
    d.ellipse([S(x + 14), S(80), S(x + 22), S(88)], fill=ACID_CLARO)
    d.text((S(x + 32), S(74)), "data analyst", font=monob, fill=ACID_CLARO)

    # Titulo com o prompt ">".
    tit = fonte("segoeuib.ttf", S(46))
    d.text((S(x), S(112)), ">", font=fonte("consolab.ttf", S(44)), fill=ACID)
    d.text((S(x + 36), S(108)), "Transformo dados operacionais em", font=tit, fill=INK)
    d.text((S(x + 36), S(166)), "decisões de negócio.", font=tit, fill=ACID_CLARO)

    # Barra de endereco estilo terminal.
    d.rounded_rectangle([S(x + 36), S(252), S(x + 420), S(296)], radius=S(8),
                        fill=(255, 255, 255, 10), outline=(*acid, 140), width=S(1))
    d.text((S(x + 52), S(263)), "$", font=monob, fill=ACID)
    d.text((S(x + 72), S(263)), "open https://hugonazario.com", font=mono, fill=INK)
    d.rectangle([S(x + 382), S(264), S(x + 392), S(284)], fill=ACID_CLARO)  # cursor

    d.text((S(x + 36), S(318)), "SQL · Python · Power BI · ETL  —  churn e inadimplência em ISP de fibra",
           font=fonte("segoeui.ttf", S(19)), fill=INK3)

    # Grafico subindo a direita: barras + linha com area.
    gx0, gx1, gy0, gy1 = 1275, 1545, 70, 330
    n = 13
    pts = []
    for i in range(n):
        t = i / (n - 1)
        v = 0.18 + 0.62 * t + 0.08 * math.sin(i * 1.3) + 0.05 * math.sin(i * 2.7)
        pts.append((gx0 + t * (gx1 - gx0), gy1 - v * (gy1 - gy0)))
    for i, (px, py) in enumerate(pts):
        bh = 18 + (i * 37 % 50)
        d.rectangle([S(px - 5), S(gy1 - bh), S(px + 5), S(gy1)], fill=(*acid, 70))
    area = [(S(px), S(py)) for px, py in pts] + [(S(gx1), S(gy1)), (S(gx0), S(gy1))]
    d.polygon(area, fill=(*acid, 38))
    d.line([(S(px), S(py)) for px, py in pts], fill=ACID_CLARO, width=S(3), joint="curve")
    lx, ly = pts[-1]
    d.ellipse([S(lx - 6), S(ly - 6), S(lx + 6), S(ly + 6)], fill=ACID_CLARO)
    d.line([(S(gx0), S(gy1)), (S(gx1 + 10), S(gy1))], fill=(255, 255, 255, 40), width=S(1))
    for gyl in (130, 200, 270):
        d.line([(S(gx0), S(gyl)), (S(gx1 + 10), S(gyl))], fill=(255, 255, 255, 14), width=S(1))

    img = img.resize((W, H), Image.LANCZOS)
    destino = SAIDA / "banner-linkedin.png"
    img.save(destino, "PNG", optimize=True)
    return destino


def main() -> None:
    SAIDA.mkdir(parents=True, exist_ok=True)
    for p in (foto_site(), foto_perfil(), banner()):
        print(p.relative_to(RAIZ))


if __name__ == "__main__":
    main()
