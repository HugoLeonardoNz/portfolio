# capturar_streamlit.ps1 — grava as abas de um app Streamlit como PNG.
#
# POR QUE ESTE ARQUIVO EXISTE
# ---------------------------
# Aba de `st.tabs` nao tem URL propria: o estado vive no cliente, entao nao da
# para pedir a aba 3 por link nem capturar em Chrome headless, que so sabe
# carregar um endereco. A alternativa seria mudar o app para aceitar a aba por
# query param — mexer no produto para tirar foto dele, o que e' o rabo abanando
# o cachorro.
#
# Entao: Chrome de verdade, clique na aba, foto da tela. Mesma tecnica do
# capturar_pbix.ps1, pelo mesmo motivo.
#
# ANTES DE RODAR
# --------------
# O app precisa estar no ar e o Chrome vai ser FECHADO e reaberto limpo — barra
# de "restaurar sessao" e balao de traducao entram na foto se estiverem la.
#
#   .\capturar_streamlit.ps1 -Url http://localhost:8701 `
#                            -Destino ..\public\telas\kpi `
#                            -TabX 427,537,638,720,805

param(
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][string]$Destino,
    [Parameter(Mandatory = $true)][int[]]$TabX,
    [int]$TabY = 362,
    [int]$EsperaCarga = 25,
    [int]$EsperaAba = 7
)

Add-Type -AssemblyName System.Windows.Forms, System.Drawing
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class StCap {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, uint x, uint y, uint d, int i);
}
'@

function Clicar([int]$x, [int]$y) {
    [StCap]::SetCursorPos($x, $y) | Out-Null
    Start-Sleep -Milliseconds 250
    [StCap]::mouse_event(0x0002, 0, 0, 0, 0)
    [StCap]::mouse_event(0x0004, 0, 0, 0, 0)
}

if (-not (Test-Path $Destino)) { New-Item -ItemType Directory -Force $Destino | Out-Null }
$Destino = (Resolve-Path $Destino).Path

Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 3
Start-Process "chrome.exe" -ArgumentList "--new-window", "--start-maximized", $Url
Start-Sleep -Seconds $EsperaCarga

$p = Get-Process chrome | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
[StCap]::SetForegroundWindow($p.MainWindowHandle) | Out-Null
Start-Sleep -Seconds 2

# Fecha o balao de traducao e a barra de "restaurar paginas".
[System.Windows.Forms.SendKeys]::SendWait("{ESC}")
Start-Sleep -Milliseconds 800
Clicar 1890 112
Start-Sleep -Seconds 2

$b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
Write-Output "capturando $($TabX.Count) aba(s)"

for ($i = 0; $i -lt $TabX.Count; $i++) {
    Clicar $TabX[$i] $TabY
    Start-Sleep -Seconds $EsperaAba

    # Cursor fora do conteudo: parado sobre um grafico do Plotly ele abre a
    # dica de dados e a foto sai com um balao preto no meio.
    [StCap]::SetCursorPos(($b.Width - 6), ($b.Height - 6)) | Out-Null
    Start-Sleep -Milliseconds 900

    $bmp = New-Object System.Drawing.Bitmap $b.Width, $b.Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen(0, 0, 0, 0, $bmp.Size)
    $arq = Join-Path $Destino ("bruto_{0:d2}.png" -f ($i + 1))
    $bmp.Save($arq, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
    Write-Output "  bruto_$('{0:d2}' -f ($i+1)).png"
}

Write-Output "pronto. Recorte com: python tools\recortar_streamlit.py $Destino"
