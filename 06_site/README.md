# Seconde S — Objectif 20 (site)

Application web statique (Vite + React + TypeScript), installable sur téléphone (PWA), utilisable hors ligne après la première visite, et complète sans IA.

## Lancer

```bash
npm install
npm run dev        # assemble les données puis lance le serveur de développement
npm run build      # assemble + vérifie les types + produit dist/
npm run valider    # valide toutes les données (schéma + LaTeX)
```

## D'où viennent les données

`scripts/assembler.mjs` (lancé automatiquement par `dev` et `build`) lit :

| Source | Contenu |
|---|---|
| `../01_recherche/programme/<MAT>.json` | programme et ordre des chapitres |
| `../02_base_donnees/<MAT>/<chapitre>.json` | cours, notions, exercices corrigés |
| `../01_recherche/epreuves/<MAT>/S<n>/*.json` | épreuves réelles transcrites et corrigées |
| `../05_medias/svg/*.svg` | schémas |
| `../03_structure/calendrier.json` | calendrier scolaire |
| `../08_ia_suivi/prompts/*.md` | prompts du tuteur IA |

et produit `public/data/*.json`, `public/medias/`, `public/precache.json` (fichiers générés, non versionnés), ainsi que `03_structure/structure.json`, `03_structure/graphe_notions.json` et `05_medias/medias_index.json`.

Format des données : `../02_base_donnees/SCHEMA.md`.

## Ajouter une épreuve réelle

1. Transcrire le sujet et son corrigé dans `01_recherche/epreuves/<MAT>/S<n>/EP-<MAT>-S<n>-<nnnn>.json` (voir SCHEMA.md, section 3), avec `authentique: true` et la source (établissement, année, URL).
2. `npm run valider`, puis `npm run build`.
3. L'épreuve apparaît dans « Devoirs & compositions » avec le badge 🏛️, et comme boss des chapitres qu'elle couvre.

## Déployer

Publier le dossier `dist/` sur n'importe quel hébergement statique :
- **GitHub Pages** : copier `dist/` dans une branche `gh-pages` (les chemins sont relatifs, `base: './'`).
- **Netlify** : dossier de publication `06_site/dist`, commande `npm run build`.

## Vie privée

- Toute la progression est dans le `localStorage` du téléphone (clé `secondeS.etat.v2`).
- La clé API du tuteur n'est envoyée qu'à l'URL du fournisseur choisi ; elle n'est jamais exportée ni mise en cache (le service worker ignore les autres origines).

## Architecture

```
src/
  App.tsx            coquille, routage par hash, coach de sommeil et pauses
  donnees.ts         chargement paresseux des matières (fetch + cache)
  store.ts           progression, XP, série et jokers, répétition espacée, lacunes
  progres.ts         étoiles, plan du jour, échéances, prévision de note
  ia.ts              tunnel IA (OpenAI /chat/completions, Anthropic /v1/messages)
  Riche.tsx          Markdown + KaTeX (+ mhchem) + encadrés :::definition …
  vues/              une vue par écran
```
