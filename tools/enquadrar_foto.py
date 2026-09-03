"""Enquadra o retrato do hero a partir do arquivo de origem.

POR QUE ESTE SCRIPT EXISTE
--------------------------
O `PRODUCT.md` diz que a foto do hero vem enquadrada por script, e nao por
CSS: o container do hero e um circulo com `overflow: hidden`, entao qualquer
reenquadramento feito la ancora o rosto num lugar e o desloca em outro tamanho
de tela. O arquivo entregue ja precisa ser a moldura final.

O QUE ELE FAZ
-------------
A origem e um retrato 1024x1024 com o circulo INSCRITO no quadrado: os cantos
sao brancos e sobra ar em volta da cabeca. Dentro do circulo do hero isso
aparece como uma pessoa pequena no meio de um vazio.

O recorte usa ZOOM 1,4 — o mesmo que o Hugo escolheu na foto do LinkedIn, para
que o perfil e o site mostrem o mesmo enquadramento. 1024 / 1,4 = 731px de
lado, e a mascara circular final tem raio 365px a partir do centro: bem dentro
dos 512px do circulo da origem, entao nenhum pixel branco de canto entra.

A saida e 720x720 RGBA com alfa circular suavizado (4x de supersampling), em
WEBP: o retrato de estudio tem fundo fotografico, e nao o recorte chapado de
antes, e em PNG ele custava 721 KB — quase o dobro do arquivo que substituiu,
no unico elemento que o celular baixa antes de a pagina fazer sentido. Em WEBP
com alfa e qualidade 88 ele custa 38 KB, sem diferenca visivel no diametro de
340px em que o hero o exibe.
"""
from PIL import Image, ImageDraw
import sys, pathlib

ORIGEM = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else
                      r"C:\Users\Hnz\Downloads\stitch_linkedin_banner_data_analyst\screen.png")
DESTINO = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "public/hugo-foto.webp")
ZOOM = float(sys.argv[3]) if len(sys.argv) > 3 else 1.4
# Deslocamento vertical do centro do recorte, em pixels da origem. Positivo
# desce. O rosto do retrato fica um pouco acima do centro geometrico.
DY = int(sys.argv[4]) if len(sys.argv) > 4 else 0
LADO = 720
SS = 4  # supersampling da mascara

src = Image.open(ORIGEM).convert("RGB")
w, h = src.size
lado = int(min(w, h) / ZOOM)
cx, cy = w // 2, h // 2 + DY
# Trava o recorte dentro do circulo da origem. O que importa nao e o canto do
# quadrado (a mascara circular do fim descarta os cantos de qualquer jeito) e
# sim o ponto mais distante que SOBREVIVE a mascara: o raio do recorte mais o
# deslocamento vertical. Passar disso traria o branco do canto da origem.
raio = min(w, h) / 2
meia = lado / 2
if meia + abs(DY) > raio:
    raise SystemExit(f"recorte sai do circulo da origem (zoom {ZOOM}, dy {DY})")

corte = src.crop((cx - lado // 2, cy - lado // 2, cx + lado // 2, cy + lado // 2))
corte = corte.resize((LADO, LADO), Image.LANCZOS).convert("RGBA")

mascara = Image.new("L", (LADO * SS, LADO * SS), 0)
ImageDraw.Draw(mascara).ellipse((0, 0, LADO * SS - 1, LADO * SS - 1), fill=255)
corte.putalpha(mascara.resize((LADO, LADO), Image.LANCZOS))

DESTINO.parent.mkdir(parents=True, exist_ok=True)
corte.save(DESTINO, quality=88, method=6)
print(f"{DESTINO} <- {ORIGEM.name} | zoom {ZOOM} | recorte {lado}px | dy {DY}")
