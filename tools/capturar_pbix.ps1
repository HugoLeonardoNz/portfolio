# capturar_pbix.ps1 — grava as paginas de um relatorio Power BI como PNG.
#
# POR QUE ESTE ARQUIVO EXISTE
# ---------------------------
# Pagina de relatorio do Power BI so existe dentro do Desktop: nao ha URL, nao
# ha modo headless, e o .pbix e um zip cuja camada visual e JSON — da para
# AUTORAR por fora (tools/build_report.py faz isso), mas nao para RENDERIZAR.
# A unica forma de ter imagem fiel e capturar a janela.
#
# Os prints do README ficaram cinco meses mostrando numero que o projeto nao
# devolvia mais, porque regerar era trabalho manual e ninguem refazia. Sendo
# script, refazer custa um comando.
#
# POR QUE CLIQUE, E NAO TECLADO
# -----------------------------
# Tentei F11 (tela cheia) e Ctrl+PageDown (proxima pagina): nenhum dos dois
# funciona por SendKeys aqui. O Desktop nao entrega o foco de teclado ao canvas
# do relatorio a partir de automacao externa — a tecla vai para a faixa de
# opcoes e a pagina nao muda. Clique na aba funciona porque nao depende de foco.
#
# O preco e depender de coordenada: -TabX recebe o centro de cada aba. Elas
# mudam com o nome das paginas, entao cada relatorio tem a sua lista, e
# tools/telas.md registra como recalibrar (capturar a barra e medir).
#
#   .\capturar_pbix.ps1 -Destino ..\public\telas\brecha -TabX 212,318,437,549,660

param(
    [Parameter(Mandatory = $true)][string]$Destino,
    [Parameter(Mandatory = $true)][int[]]$TabX,
    [int]$TabY = 990,
    [string]$Pbix = "",
    [int]$EsperaAbertura = 80,
    [int]$EsperaPagina = 6
)

Add-Type -AssemblyName System.Windows.Forms, System.Drawing
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class PbiCap {
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int n);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, uint x, uint y, uint d, int i);
}
'@

if (-not (Test-Path $Destino)) { New-Item -ItemType Directory -Force $Destino | Out-Null }
$Destino = (Resolve-Path $Destino).Path

if ($Pbix -ne "") {
    Start-Process -FilePath (Resolve-Path $Pbix).Path | Out-Null
    Start-Sleep -Seconds $EsperaAbertura
}

$proc = Get-Process PBIDesktop -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if (-not $proc) { Write-Output "ERRO: Power BI nao esta aberto"; exit 1 }

[PbiCap]::ShowWindow($proc.MainWindowHandle, 3) | Out-Null
[PbiCap]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
Start-Sleep -Seconds 4

$b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
Write-Output "capturando $($TabX.Count) pagina(s) em $($b.Width)x$($b.Height)"

for ($i = 0; $i -lt $TabX.Count; $i++) {
    [PbiCap]::SetCursorPos($TabX[$i], $TabY) | Out-Null
    Start-Sleep -Milliseconds 300
    [PbiCap]::mouse_event(0x0002, 0, 0, 0, 0)   # botao esquerdo desce
    [PbiCap]::mouse_event(0x0004, 0, 0, 0, 0)   # botao esquerdo sobe
    Start-Sleep -Seconds $EsperaPagina

    # O cursor sai de cima do relatorio antes da foto: parado sobre um visual
    # ele dispara o realce de hover e a foto sai com uma barra destacada.
    [PbiCap]::SetCursorPos(($b.Width - 8), ($b.Height - 8)) | Out-Null
    Start-Sleep -Milliseconds 700

    $bmp = New-Object System.Drawing.Bitmap $b.Width, $b.Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen(0, 0, 0, 0, $bmp.Size)
    $arq = Join-Path $Destino ("bruto_{0:d2}.png" -f ($i + 1))
    $bmp.Save($arq, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
    Write-Output "  bruto_$('{0:d2}' -f ($i+1)).png"
}

Write-Output "pronto. Recorte com: python tools\recortar_pbix.py $Destino"
