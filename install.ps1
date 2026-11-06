# Installe la bannière jour et nuit et Ponytail pour Claude Code (Windows).
$ErrorActionPreference = 'Stop'
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  Write-Host "La commande claude est introuvable : installez d'abord Claude Code (https://claude.com/claude-code)." -ForegroundColor Red
  return
}
# Une marketplace déjà ajoutée n'est pas une erreur
claude plugin marketplace add xaxaj/claude-mods 2>$null
claude plugin install banniere-nuit@claude-mods
claude plugin install ponytail@claude-mods
Write-Host "Installé. Ouvrez une nouvelle session Claude Code pour voir la bannière." -ForegroundColor Green
