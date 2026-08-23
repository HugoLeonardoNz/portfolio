# capturar_pbix.ps1 — grava as paginas de um relatorio Power BI como PNG.
#
# POR QUE ESTE ARQUIVO EXISTE
# ---------------------------
# Pagina de relatorio do Power BI so existe dentro do Desktop: nao ha URL, nao
# ha modo headless, e o .pbix e um zip cuja camada visual e JSON — da para
# AUTORAR por fora, mas nao para RENDERIZAR. Entao a unica forma de ter imagem
# fiel e capturar a janela.
#
# Os prints do README ficaram cinco meses mostrando numeros que o projeto nao
# devolvia mais, porque regerar era trabalho manual e ninguem refazia. Sendo
# script, refazer custa um comando.
#
#   .\capturar_pbix.ps1 -Pbix "..\..\socioeconomic-powerbi-public\digital_divide_brasil.pbix" `
#                       -Destino "..\public\telas\brecha" -Paginas 5
#
# O Desktop precisa estar FECHADO ao chamar: o script abre, espera, captura e
# fecha. Com ele ja aberto, a janela pode nao vir para frente.

param(
    [Parameter(Mandatory = $true)][string]$Pbix,
    [Parameter(Mandatory = $true)][string]$Destino,
    [int]$Paginas = 5,
    [int]$EsperaAbertura = 75,
    [int]$EsperaPagina = 6
)

Add-Type -AssemblyName System.Windows.Forms, System.Drawing

$sig = @'
[DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
[DllImport("user32.dll")] public static extern void mouse_event(uint f, uint x, uint y, uint d, int i);
[DllImport("user32.dll")] public static extern IntPtr FindWindow(string c, string n);
[DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
[DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int n);
[DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
public struct RECT { public int Left, Top, Right, Bottom; }
'@
$W = Add-Type -MemberDefinition $sig -Name 'W32' -Namespace 'Cap' -PassThru

function Clicar([int]$x, [int]$y) {
    [Cap.W32]::SetCursorPos($x, $y) | Out-Null
    Start-Sleep -Milliseconds 250
    [Cap.W32]::mouse_event(0x0002, 0, 0, 0, 0)   # left down
    [Cap.W32]::mouse_event(0x0004, 0, 0, 0, 0)   # left up
}

function Capturar([string]$arquivo, $rect) {
    $w = $rect.Right - $rect.Left
    $h = $rect.Bottom - $rect.Top
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen($rect.Left, $rect.Top, 0, 0, (New-Object System.Drawing.Size $w, $h))
    $bmp.Save($arquivo, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
}

$Pbix = (Resolve-Path $Pbix).Path
if (-not (Test-Path $Destino)) { New-Item -ItemType Directory -Force $Destino | Out-Null }
$Destino = (Resolve-Path $Destino).Path

Write-Output "abrindo $([System.IO.Path]::GetFileName($Pbix))..."
$proc = Start-Process -FilePath $Pbix -PassThru
Start-Sleep -Seconds $EsperaAbertura

$hwnd = (Get-Process PBIDesktop -ErrorAction SilentlyContinue |
         Where-Object { $_.MainWindowHandle -ne 0 } |
         Select-Object -First 1).MainWindowHandle
if (-not $hwnd) { Write-Output "ERRO: janela do Power BI nao encontrada"; exit 1 }

[Cap.W32]::ShowWindow($hwnd, 3) | Out-Null       # maximizada
[Cap.W32]::SetForegroundWindow($hwnd) | Out-Null
Start-Sleep -Seconds 4

$rect = New-Object Cap.RECT
[Cap.W32]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
Write-Output "janela: $($rect.Right - $rect.Left) x $($rect.Bottom - $rect.Top)"

# As abas de pagina ficam na barra inferior do Desktop. A primeira comeca depois
# do painel de navegacao da esquerda; o passo entre elas varia com o tamanho do
# nome, entao o script clica em posicoes calculadas e o operador confere o
# resultado — a alternativa seria automacao de UI, que quebra a cada versao.
$baseY = $rect.Bottom - 38
$x0 = $rect.Left + 250
$passo = 150

for ($i = 1; $i -le $Paginas; $i++) {
    if ($i -gt 1) {
        Clicar ($x0 + ($i - 1) * $passo) $baseY
        Start-Sleep -Seconds $EsperaPagina
    }
    $arq = Join-Path $Destino ("{0:d2}.png" -f $i)
    Capturar $arq $rect
    Write-Output "  $([System.IO.Path]::GetFileName($arq))"
}

Write-Output "fechando..."
$proc | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process PBIDesktop -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Output "pronto: $Destino"
