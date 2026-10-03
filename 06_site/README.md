# Seconde S — Objectif 20 (site)

Vite + React + TypeScript. Application statique, installable (PWA), fonctionne hors ligne après une première visite et marche sans IA.

```bash
npm install
npm run dev      # développement
npm run build    # produit dist/ (chemins relatifs)
```

Déploiement : publier `dist/` sur GitHub Pages ou Netlify.
Contenu : `../02_base_donnees/base.json` (importé à la compilation).
Progression : stockée dans `localStorage` (clé `secondeS.etat.v1`), uniquement sur l'appareil.
