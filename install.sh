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
  claude plugin marketplace add xaxaj/claude-mods || exit 1
fi
claude plugin install banniere-nuit@claude-mods
claude plugin install ponytail@claude-mods
echo "Installé. Ouvrez une nouvelle session Claude Code pour voir la bannière."
