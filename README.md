# Bannière jour et nuit pour Claude Code

Au-dessus de la zone de saisie : l'heure de Paris et une phrase de motivation, en français ou en anglais, qui change toutes les 15 minutes.

- De 7 h à 21 h : ciel bleu, soleil qui rayonne, nuages qui passent.
- De 21 h à 7 h : ciel étoilé qui scintille, étoile filante et lune néon.

## Installation

L'installation ajoute aussi [Ponytail](https://github.com/DietrichGebert/ponytail) (mode développeur minimaliste), dont la bannière se place au-dessus.

À l'invite d'une session Claude Code :

```
/plugin install banniere-nuit --marketplace xaxaj/claude-mods
```

Répondez `y` pour ajouter la marketplace, choisissez la portée (utilisateur pour l'avoir partout), puis la langue des phrases : `fr` (français) ou `en` (English). Elle se change ensuite dans `/config`.

Depuis un terminal :

```
claude plugin install banniere-nuit --marketplace xaxaj/claude-mods
```
