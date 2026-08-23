"""
recortar_streamlit.py — tira a moldura do Chrome das capturas do Streamlit.

`capturar_streamlit.ps1` grava a tela inteira, entao sobra a barra de guias, a
barra de endereco e a barra de tarefas do Windows. O mesmo raciocinio do
recortar_pbix.py: o recorte e uma constante MEDIDA, e nao detectada, porque
deteccao que erra em silencio produz imagem cortada que ninguem percebe.

VIEWPORT vale para 1920x1080 com o Chrome maximizado e sem barra de favoritos.
Para recalibrar: abra um bruto e meca onde termina a barra de endereco e onde
comeca a barra de tarefas.

    python tools/recortar_streamlit.py public/telas/kpi
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

VIEWPORT = (0, 84, 1920, 1035)
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
            print(f"  ! {b.name} e {im.size}, nao {TELA_ESPERADA}. Remeca o VIEWPORT.")
            sys.exit(1)
        destino = pasta / b.name.replace("bruto_", "")
        im.crop(VIEWPORT).save(destino, optimize=True)
        print(f"  {destino.name}")
        b.unlink()

    w = VIEWPORT[2] - VIEWPORT[0]
    h = VIEWPORT[3] - VIEWPORT[1]
    print(f"{len(brutos)} tela(s) de {w}x{h} em {pasta}")


if __name__ == "__main__":
    main()
