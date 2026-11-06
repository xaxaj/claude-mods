# Installe la bannière jour et nuit et Ponytail pour Claude Code (Windows).
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  Write-Host "La commande claude est introuvable : installez d'abord Claude Code (https://claude.com/claude-code)." -ForegroundColor Red
  return
}
# Marketplace déjà ajoutée (depuis Plugins ou un ancien passage) : on la garde telle quelle
$list = (claude plugin marketplace list 2>&1 | Out-String)
if ($list -notmatch 'claude-mods') {
  # Réglages qui gardent déjà une adresse pour claude-mods : Claude Code exige cette même adresse
  $source = 'xaxaj/claude-mods'
  $settings = Join-Path $HOME '.claude\settings.json'
  try {
    $entry = (Get-Content $settings -Raw -Encoding UTF8 | ConvertFrom-Json).extraKnownMarketplaces.'claude-mods'.source
    if ($entry.repo) { $source = $entry.repo } elseif ($entry.url) { $source = $entry.url } elseif ($entry.path) { $source = $entry.path }
  } catch { }
  claude plugin marketplace add $source
} else {
  claude plugin marketplace update claude-mods 2>&1 | Out-Null
}
claude plugin install banniere-nuit@claude-mods
claude plugin install ponytail@claude-mods
Write-Host "Installé. Ouvrez une nouvelle session Claude Code pour voir la bannière." -ForegroundColor Green
