# Structure
Parcours : Matière → Semestre → Chapitre → Notion → Cours (3 niveaux) → Exercices (difficulté croissante) → badge de chapitre (« boss »).
- Prérequis par chapitre : champ `prerequis` dans `02_base_donnees/base.json` (ce qui est sous `M-3e-…` reste à détailler).
- Répétition espacée : paliers [1, 3, 7, 14, 30] jours dans `06_site/src/store.ts` ; un échec renvoie au palier J+1.
- À faire : `graphe_notions.json` complet et `calendrier.json` à partir du calendrier scolaire officiel de 2026-2027.
