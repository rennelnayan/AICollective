param(
    [string]$InputFile = ".\input\draft_gate1_package.md",
    [string]$OutputFile = ".\validation-output\draft-gate1-packet.json"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $InputFile)) {
    throw "Input file not found: $InputFile"
}

$content = Get-Content -LiteralPath $InputFile -Raw
$pattern = '(?ms)^# DRAFT_GATE1_PACKET\s*```json\s*(.*?)\s*```'
$packetMatch = [regex]::Match($content, $pattern)

if (-not $packetMatch.Success) {
    throw "DRAFT_GATE1_PACKET JSON block was not found in: $InputFile"
}

$packetJson = $packetMatch.Groups[1].Value

# Validate that the extracted content is valid JSON before saving it.
$null = $packetJson | ConvertFrom-Json

$outputDirectory = Split-Path -Parent $OutputFile
if ($outputDirectory) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

Set-Content -LiteralPath $OutputFile -Value $packetJson -Encoding UTF8

$file = Get-Item -LiteralPath $OutputFile
Write-Output "Created Gate 1 packet:"
$file | Select-Object Name, Length, FullName
