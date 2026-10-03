# Rapport global — v0.1

## Contrôle final
- [ ] **Programme conforme à l'année 2026-2027 : NON VÉRIFIÉ** (`01_recherche/programme_sources.md`).
- [ ] **Épreuves authentiques : 0 sur les quotas visés** (`01_recherche/RAPPORT_LACUNES.md`). Les 10 exercices présents sont marqués « type inspiré ».
- [~] Corrigés : les réponses numériques des exercices ont été vérifiées par un script. Le second passage indépendant reste à faire. Aucune épreuve réelle à corriger pour l'instant.
- [~] Notions (12) : chacune a un cours, une explication sur 3 niveaux, des fiches flash et un rappel. **Aucune image** pour l'instant. 4 notions sans exercice (sol, résumé, commentaire, et une partie de la PC).
- [x] Le site compile, fonctionne à 360 px sans défilement horizontal, sans IA. Le parcours inscription → cours → exercice → corrigé est testé avec Playwright.
- [~] Hors ligne : service worker « réseau d'abord, sinon cache » ; non testé en mode avion.
- [~] Avec IA : formats OpenAI et Anthropic implémentés, avec un bouton « Tester la connexion » ; non testé contre un vrai fournisseur.
- [x] La clé API ne part que vers l'URL du fournisseur ; bouton pour l'effacer.
- [x] Coach de sommeil : bandeau 30 min avant le coucher, mode calme à l'heure du coucher, verrou 30 min après (déverrouillage avec friction : taper une phrase, pour 20 min). Pause suggérée après 40 min d'étude.
- [ ] Critique visuelle : 1 cycle sur 3 (`07_critique/critique_v1.md`).

## Reste à faire (priorité)
1. Collecter les vraies épreuves togolaises avec leurs sources, et vérifier le programme officiel.
2. Étoffer chaque chapitre (une seule notion par chapitre aujourd'hui) et ajouter les chapitres manquants.
3. Images et schémas sous licence libre, simulations interactives.
4. Mode composition blanche (épreuve complète), pratique entrelacée, jokers de série appliqués automatiquement.
5. IndexedDB à la place de `localStorage` si l'historique grossit ; cycles de critique 2 et 3.
