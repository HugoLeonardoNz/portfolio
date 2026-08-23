"""
recortar_pbix.py — tira a moldura do Power BI Desktop das capturas.

`capturar_pbix.ps1` grava a tela inteira, porque capturar so a janela do
relatorio nao e possivel: o canvas nao e uma janela propria. Sobra faixa de
opcoes, painel de visualizacoes, painel de dados e barra de tarefas — tres
quartos da imagem seriam a ferramenta, e nao o relatorio.

POR QUE O RECORTE E MEDIDO, E NAO DETECTADO
-------------------------------------------
Tentei detectar o canvas pela cor do papel do relatorio. Nao funciona de forma
confiavel: o creme do socioeconomic (#F5F2EC) fica a 5 pontos do cinza da faixa
de opcoes do Windows (#F3F2F1), e os cartoes brancos por cima do papel cortam a
varredura em faixas. Uma deteccao que erra em silencio e pior que um numero
fixo — a imagem sairia cortada e ninguem repararia ate alguem abrir o site.

Entao o recorte e uma constante MEDIDA, com a receita de recalibrar aqui:

    1. rode capturar_pbix.ps1 (ele deixa os bruto_*.png)
    2. abra um bruto e meca onde o canvas do relatorio comeca e termina
    3. ajuste CANVAS abaixo

CANVAS vale para 1920x1080 com a janela maximizada e os paineis da direita
abertos, que e a configuracao em que as capturas foram feitas. Se mudar a
resolucao ou fechar os paineis, remeca.

    python tools/recortar_pbix.py public/telas/brecha
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

# (esquerda, topo, direita, base) em tela de 1920x1080, janela maximizada.
CANVAS = (54, 164, 1505, 947)

TELA_ESPERADA = (1920, 1080)


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    pasta = Path(sys.argv[1])
    brutos = sorted(pasta.glob("bruto_*.png"))
    if not brutos:
        print(f"nenhum bruto_*.png em {pasta}")
        sys.exit(1)

    for b in brutos:
        im = Image.open(b)
        if im.size != TELA_ESPERADA:
            print(f"  ! {b.name} e {im.size[0]}x{im.size[1]}, nao "
                  f"{TELA_ESPERADA[0]}x{TELA_ESPERADA[1]}. "
                  "O CANVAS foi medido na segunda; remeca antes de recortar.")
            sys.exit(1)

        destino = pasta / b.name.replace("bruto_", "")
        im.crop(CANVAS).save(destino, optimize=True)
        print(f"  {destino.name}")
        b.unlink()

    w = CANVAS[2] - CANVAS[0]
    h = CANVAS[3] - CANVAS[1]
    print(f"{len(brutos)} tela(s) de {w}x{h} em {pasta}")


if __name__ == "__main__":
    main()
