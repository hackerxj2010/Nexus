# Logique de suivi IA (code dans `06_site/src/ia.ts` et `store.ts`)
- **Lacune** : réponse fausse, au moins 2 indices utilisés, ou commentaire « pas compris ». Les lacunes sont regroupées par notion.
- **Déclencheur** : 10 lacunes depuis la dernière remédiation, ou 3 échecs de suite sur une même notion → séance de récupération.
- **Données envoyées** : résumé compact (moyennes, matières faibles, 20 dernières erreurs, 10 derniers commentaires, 8 principales lacunes). Jamais l'historique brut.
- **Sans IA** : remédiation de repli (explication niveaux 1 et 2, rappel du prérequis, fiches flash).
- **Clé API** : stockée dans le `localStorage` de l'appareil, envoyée seulement à l'URL de base choisie ; un bouton permet de l'effacer. Le service worker ne met jamais en cache les requêtes vers d'autres origines.
