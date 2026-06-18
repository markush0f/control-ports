$vswhere = Join-Path ${env:ProgramFiles(x86)} "Microsoft Visual Studio\Installer\vswhere.exe"

if (-not (Test-Path -LiteralPath $vswhere)) {
    Write-Error "No se encontro vswhere.exe. Instala Visual Studio Build Tools con C++ Desktop Development."
    exit 1
}

$installPath = & $vswhere -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath

if (-not $installPath) {
    Write-Error "No se encontro Visual Studio Build Tools con herramientas C++ x64."
    exit 1
}

$vcvars = Join-Path $installPath "VC\Auxiliary\Build\vcvars64.bat"

if (-not (Test-Path -LiteralPath $vcvars)) {
    Write-Error "No se encontro vcvars64.bat en $vcvars."
    exit 1
}

if ($args.Length -eq 0) {
    Write-Error "Uso: scripts/run-vcvars.ps1 <comando> [args...]"
    exit 1
}

$quotedArgs = $args | ForEach-Object { '"' + ($_ -replace '"', '\"') + '"' }
$command = 'call "' + $vcvars + '" && ' + ($quotedArgs -join ' ')

cmd.exe /d /s /c $command
exit $LASTEXITCODE
