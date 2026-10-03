# Schéma des données — plateforme Seconde S (Togo)

Toutes les données sont en JSON UTF-8. **Écrire les fichiers avec un script Python (`json.dump(..., ensure_ascii=False, indent=1)`)**, jamais à la main : le LaTeX contient des antislashs.

Validation : `node 02_base_donnees/valider.mjs` (à lancer après chaque lot de fichiers).

## Codes matière
`M` (Mathématiques), `PC` (Physique-Chimie), `SVT`, `FR` (Français).

## Texte enrichi
Tous les champs texte acceptent du Markdown léger (gras, listes, tableaux) et des maths KaTeX :
- en ligne : `$\frac{a}{b}$` ; en bloc : `$$x = \frac{-b}{a}$$`
- chimie : `$\ce{2H2 + O2 -> 2H2O}$` (extension mhchem)
- pas de HTML brut.

## 1. Programme — `01_recherche/programme/<MAT>.json`
```json
{
  "matiere": "M",
  "annee_scolaire_reference": "2025-2026",
  "decoupage": "semestres",
  "volume_horaire_hebdo": "5 h",
  "coefficient_seconde_S": 4,
  "statut": "verifie | partiellement_verifie | reconstitue",
  "sources": [{"titre": "...", "url": "...", "date_consultation": "2026-10-03", "fiabilite": 4}],
  "chapitres": [
    {"id": "M-S1-C01", "semestre": 1, "ordre": 1, "titre": "...", "duree_semaines": 2, "source_ids": [0]}
  ]
}
```
`statut` dit honnêtement si la liste a été confirmée par un document togolais (`verifie`), en partie, ou reconstituée à partir d'indices (manuels, épreuves, programmes voisins).

## 2. Chapitre — `02_base_donnees/<MAT>/<id_chapitre>.json`
Un fichier par chapitre. Id : `<MAT>-S<semestre>-C<ordre sur 2 chiffres>` (ex. `PC-S2-C07`). L'ordre est global sur l'année (C01…Cnn).
```json
{
  "id": "M-S1-C01", "matiere": "M", "semestre": 1, "ordre": 1,
  "titre": "...",
  "objectifs": ["L'élève doit être capable de ..."],
  "prerequis": ["M-3e-THALES", "M-S1-C01"],
  "notions": [
    {
      "id": "M-S1-C01-N1",
      "titre": "...",
      "prerequis_notions": ["M-3e-THALES", "M-S1-C01-N0"],
      "cours_md": "Cours complet de la notion en Markdown + KaTeX : définitions, propriétés/théorèmes (avec démonstration courte si au programme), méthodes, remarques. Utiliser les blocs :::definition, :::propriete, :::methode, :::remarque, :::attention (voir plus bas).",
      "definition": "Définition courte (1-2 phrases).",
      "formules": ["$...$"],
      "niveaux": {
        "phrase": "En une phrase.",
        "simple": "Simple, avec une image mentale.",
        "complete": "Version complète et rigoureuse."
      },
      "analogie": "Analogie du quotidien togolais (marché, zémidjan, cuisine, football, agriculture...) seulement si elle aide vraiment, sinon chaîne vide.",
      "exemples_resolus": [{"enonce": "...", "etapes": ["...", "..."]}],
      "erreurs_frequentes": ["..."],
      "astuces": ["..."],
      "mnemo": "Moyen mnémotechnique (ou chaîne vide).",
      "rappel_anterieur": {"classe": "3e", "texte": "Tu te souviens de la 3e ? ..."},
      "methode_redaction": "Comment présenter cette question sur la copie pour avoir tous les points.",
      "flash": [{"q": "...", "r": "..."}],
      "image": {"fichier": "M-S1-C01-N1.svg", "alt": "...", "legende": "...", "licence": "Création originale, CC0"},
      "videos": [{"titre": "...", "chaine": "...", "url": "https://...", "debut": "02:15", "verifie": true}]
    }
  ],
  "exercices": [
    {
      "id": "M-S1-C01-E01",
      "type": "exercice_type_inspire",
      "authentique": false,
      "difficulte": 1,
      "notions": ["M-S1-C01-N1"],
      "format": "reponse_courte | qcm | ouverte",
      "enonce": "...",
      "choix": ["...", "..."],
      "bonne_reponse": 0,
      "reponses_acceptees": ["12", "x=12"],
      "indices": ["...", "..."],
      "corrige": ["étape 1", "étape 2"],
      "bareme": [1, 1],
      "piege": "...",
      "verification": "code | double_resolution"
    }
  ],
  "pieges_composition": ["Pièges les plus fréquents en devoir/composition sur ce chapitre."]
}
```
Règles :
- `choix`/`bonne_reponse` seulement pour `qcm` ; `reponses_acceptees` seulement pour `reponse_courte` (formes équivalentes acceptées, comparées sans espaces ni casse ; virgule = point) ; `ouverte` = l'élève compare avec le corrigé et s'auto-note avec le barème.
- `corrige` et `bareme` ont la même longueur. Somme du barème = points de l'exercice.
- `flash` : au moins 4 cartes par notion.
- `image.fichier` : SVG écrit dans `05_medias/svg/`. SVG autonome, `viewBox`, pas de police externe, texte lisible à 360 px de large, couleurs qui marchent sur fond clair ET sombre (fond du SVG explicite blanc cassé `#fffdf8` avec coins arrondis).
- `videos` : uniquement des liens réellement ouverts et vérifiés (titre exact). Sinon liste vide. Ne jamais inventer d'URL.
- Exactitude : tout résultat numérique est recalculé par un script Python ; `verification: "code"`.

## 3. Épreuve — `01_recherche/epreuves/<MAT>/S<semestre>/<id>.json`
Id : `EP-<MAT>-S<sem>-<4 chiffres>`.
```json
{
  "id": "EP-M-S1-0001",
  "matiere": "M", "semestre": 1,
  "type": "interrogation | devoir_surveille | devoir_maison | composition | devoir_harmonise | concours_entree",
  "authentique": true,
  "pays": "Togo",
  "source": {
    "etablissement": "Lycée ...", "ville": "...", "annee_scolaire": "2022-2023",
    "url": "https://...", "date_consultation": "2026-10-03",
    "licence": "Document public en ligne, usage personnel d'apprentissage",
    "fiabilite": 4
  },
  "duree_min": 120, "total_points": 20,
  "chapitres_titres": ["Vecteurs", "Calcul dans R"],
  "chapitres": [],
  "enonce_md": "Énoncé complet transcrit fidèlement (Markdown + KaTeX).",
  "questions": [
    {
      "numero": "Ex1-1.a", "enonce": "...", "points": 1.5,
      "notions_titres": ["..."],
      "corrige": ["étape 1", "étape 2"],
      "bareme": [1, 0.5],
      "resultat_final": "...",
      "piege": "...", "astuce": "..."
    }
  ],
  "verification": {
    "passe1": "résumé des résultats de la 1re résolution",
    "passe2": "résumé de la 2e résolution indépendante",
    "code": "résultats numériques vérifiés par script : oui/non",
    "desaccords": ["question : désaccord et décision"]
  }
}
```
Règles absolues :
- `concours_entree` = concours national d'entrée en Seconde S (lycées scientifiques) : niveau fin de 3e, compté à part, pas dans le quota de Seconde.
- `authentique: true` **seulement** si la source est traçable (URL qui contient réellement le texte, établissement, année). Pas d'URL vérifiée ⇒ pas d'épreuve.
- `pays` exact. Une épreuve non togolaise (Bénin, Côte d'Ivoire, Burkina…) peut être gardée, mais elle **ne compte pas** dans le quota togolais.
- Si le barème n'est pas indiqué dans le document, proposer un barème et l'écrire dans `verification.desaccords` (« barème proposé, non officiel »).
- Ne jamais compléter une épreuve partiellement lisible par invention : transcrire ce qui est lisible et noter `[illisible]`.
