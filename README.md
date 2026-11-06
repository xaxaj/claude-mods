# Bannière jour et nuit pour Claude Code

Au-dessus de la zone de saisie : l'heure de Paris et une phrase de motivation, en français ou en anglais, qui change toutes les 15 minutes.

- De 7 h à 21 h : ciel bleu, soleil qui rayonne, nuages qui passent.
- De 21 h à 7 h : ciel étoilé qui scintille, étoile filante et lune néon.

## Installation en une commande

Installe la bannière et [Ponytail](https://github.com/DietrichGebert/ponytail).

Windows (PowerShell) :

```
irm https://raw.githubusercontent.com/xaxaj/claude-mods/main/install.ps1 | iex
```

Mac, Linux, SSH :

```
curl -fsSL https://raw.githubusercontent.com/xaxaj/claude-mods/main/install.sh | sh
```

La langue des phrases (`fr` ou `en`) se change ensuite dans `/config`.

## Désinstallation

Windows : `irm https://raw.githubusercontent.com/xaxaj/claude-mods/main/uninstall.ps1 | iex`

Mac, Linux, SSH : `curl -fsSL https://raw.githubusercontent.com/xaxaj/claude-mods/main/uninstall.sh | sh`

## Installation de la bannière seule

À l'invite d'une session Claude Code :

```
/plugin install banniere-nuit --marketplace xaxaj/claude-mods
```
