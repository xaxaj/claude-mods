#!/bin/sh
# Installe la bannière jour et nuit et Ponytail pour Claude Code (Mac, Linux, SSH).
if ! command -v claude >/dev/null 2>&1; then
  echo "La commande claude est introuvable : installez d'abord Claude Code (https://claude.com/claude-code)." >&2
  exit 1
fi
# Marketplace déjà ajoutée (depuis Plugins ou un ancien passage) : on la garde telle quelle
if claude plugin marketplace list 2>&1 | grep -q claude-mods; then
  claude plugin marketplace update claude-mods >/dev/null 2>&1 || true
else
  # Réglages qui gardent déjà une adresse pour claude-mods : Claude Code exige cette même adresse
  source=$(python3 -c "import json,os;s=json.load(open(os.path.expanduser('~/.claude/settings.json'))).get('extraKnownMarketplaces',{}).get('claude-mods',{}).get('source',{});print(s.get('repo') or s.get('url') or s.get('path') or '')" 2>/dev/null)
  claude plugin marketplace add "${source:-xaxaj/claude-mods}" || exit 1
fi
claude plugin install banniere-nuit@claude-mods
claude plugin install ponytail@claude-mods
echo "Installé. Ouvrez une nouvelle session Claude Code pour voir la bannière."
