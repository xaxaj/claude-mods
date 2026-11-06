# Bannière jour et nuit pour Claude Code

Au-dessus de la zone de saisie : l'heure de Paris et une phrase de motivation, en français ou en anglais, qui change toutes les 15 minutes.

- De 7 h à 21 h : ciel bleu, soleil qui rayonne, nuages qui passent.
- De 21 h à 7 h : ciel étoilé qui scintille, étoile filante et lune néon.

## Installation en une commande

Installe la bannière et [Ponytail](https://github.com/DietrichGebert/ponytail).

Depuis l'application : Paramètres → Plugins → Ajouter une marketplace `xaxaj/claude-mods`, puis « Ajouter à cet ordinateur » sur Banniere nuit et sur Ponytail.

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

## Ponytail

Le dossier `ponytail/` est une copie de [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (commit 96608e0), sous licence MIT, avec un seul changement : les bandeaux des autres extensions sont placés au-dessus du sien (voir `ponytail/LICENSE`).
