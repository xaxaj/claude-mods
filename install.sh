#!/bin/sh
# Installe la bannière jour et nuit et Ponytail pour Claude Code (Mac, Linux, SSH).
set -e
if ! command -v claude >/dev/null 2>&1; then
  echo "La commande claude est introuvable : installez d'abord Claude Code (https://claude.com/claude-code)." >&2
  exit 1
fi
claude plugin marketplace add xaxaj/claude-mods || true
claude plugin marketplace add DietrichGebert/ponytail || true
claude plugin install banniere-nuit@claude-mods
claude plugin install ponytail@ponytail
echo "Installé. Ouvrez une nouvelle session Claude Code pour voir la bannière."
