# Rapport — Mathématiques, Seconde S (Togo)

Agent « Contenu Mathématiques ». Date : 3 octobre 2026.
Périmètre de cette partie : **programme** (`01_recherche/programme/M.json`) et **semestre 1** (chapitres `M-S1-C01` à `M-S1-C08`). Les chapitres `M-S2-C09` à `M-S2-C15` sont rédigés par un agent assistant, qui complète la dernière section.

Sortie du validateur (`node 02_base_donnees/valider.mjs M`) après la livraison du S1 : **Aucune erreur.** (8 chapitres, 26 notions, 98 exercices, 133 fiches flash, 26 images).

---

## 1. Programme officiel : ce qui a été trouvé

### Statut : `reconstitue`
Je n'ai pu lire **aucun document officiel togolais** (programme de la DPC, progression harmonisée d'une inspection, note des volumes horaires et coefficients). Le proxy de l'environnement bloque presque tous les sites (WebFetch refusé pour sigmaths.net, epreuvesetcorriges.com, scribd.com, education.gouv.tg, republiquetogolaise.com, wikipedia…). Je n'ai donc eu que **les titres et extraits renvoyés par le moteur de recherche**. Chaque source porte une note `"note"` qui le précise dans `M.json`.

| # | Source (consultée par extrait de recherche) | Ce qu'elle apporte | Fiabilité /5 |
|---|---|---|---|
| 0 | Corrigé des exercices CIAM 2nde S (Collection Boussole), sommaire | Liste des 14 chapitres du manuel CIAM 2nde S (base de la liste retenue) | 3 |
| 1 | Manuel *Mathématiques CIAM 2nde S*, EDICEF (fiche Eyrolles) | Le manuel issu de l'Harmonisation des Programmes de Mathématiques (HPM) | 3 |
| 2 | Rapport AUF/APPRENDRE sur les curricula au Togo (2021) | « Au Togo, le programme en vigueur est celui issu de l'HPM » | 3 |
| 3 | Site officiel république togolaise : réformes du secondaire | En Seconde, programmes « allégés et actualisés » selon l'APC, nouveaux volumes horaires et coefficients (dont maths). **Les tableaux n'ont pas pu être lus.** | 4 |
| 4 | Togo First : « big bang de réformes » | Calendrier de la réforme : Seconde en 2022-2023, Première en 2023-2024, Terminale en 2024-2025 | 3 |
| 5 | sigmaths.net : « Devoir du 1er semestre, Lycée de Dzrékpo, 2023-2024 » | Confirme que les évaluations étaient organisées par semestre | 2 |
| 6 | AllAfrica : calendrier scolaire 2026-2027 (décision n°125/2026/MEN/CAB/SG) | **Trimestres** : T1 14/09–23/12/2026, T2 04/01–09/04/2027, T3 19/04–16/07/2027 | 4 |
| 7 | epreuvesetcorriges.com : DS du 1er semestre, Seconde CD, Lycée de Tabligbo, 2025-2026 | Contenus réellement évalués au 1er semestre : équations, inéquations, ensembles, identités remarquables, étude graphique de fonctions, démonstration sur un tétraèdre | 2 |

### Découpage
- `decoupage: "trimestres"` pour 2026-2027 (source 6). Les identifiants gardent `S1`/`S2`, comme l'exige le schéma. Dans `M.json`, le champ `decoupage_detail` explique la correspondance et chaque chapitre porte un champ `trimestre_indicatif` (C01–C06 → T1, C07–C11 → T2, C12–C15 → T3).
- Volume horaire hebdomadaire : **non confirmé**. J'ai écrit « 5 h à 6 h selon les grilles habituelles, à vérifier ».
- Coefficient de Seconde S : **non trouvé**, laissé à `null`. Le champ `remarques` l'explique.

### Liste et ordre des chapitres retenus
| Id | Titre | Semaines | Trimestre indicatif |
|---|---|---|---|
| M-S1-C01 | Ensemble des nombres réels et calcul dans ℝ | 2 | 1 |
| M-S1-C02 | Vecteurs et points du plan | 2 | 1 |
| M-S1-C03 | Polynômes et fractions rationnelles | 2 | 1 |
| M-S1-C04 | Barycentre | 2 | 1 |
| M-S1-C05 | Équations et inéquations dans ℝ | 3 | 1 |
| M-S1-C06 | Angles inscrits | 1 | 1 |
| M-S1-C07 | Généralités sur les fonctions | 2 | 2 |
| M-S1-C08 | Géométrie dans l'espace | 2 | 2 |
| M-S2-C09 | Équations et inéquations dans ℝ×ℝ (systèmes) | 2 | 2 |
| M-S2-C10 | Angles orientés et trigonométrie | 3 | 2 |
| M-S2-C11 | Étude de fonctions (fonctions de référence) | 3 | 2 |
| M-S2-C12 | Produit scalaire | 2 | 3 |
| M-S2-C13 | Droites et cercles dans le plan | 2 | 3 |
| M-S2-C14 | Transformations du plan : translation, homothétie, rotation | 2 | 3 |
| M-S2-C15 | Statistique | 2 | 3 |

Choix faits (à confronter à la progression de l'établissement de l'élève) :
- **Contenu** : les 14 chapitres du sommaire CIAM 2nde S, plus un chapitre **Barycentre** à part. Dans CIAM, le barycentre est traité dans « Vecteurs et points du plan », mais il est systématiquement évalué en Seconde S et réutilisé en Première.
- **Ordre** : les professeurs togolais mettent d'habitude une partie « activités numériques » et une partie « activités géométriques » dans chaque devoir, d'où l'alternance algèbre/géométrie. Le devoir de Tabligbo (source 7) évalue au 1er semestre les équations et ensembles, les identités remarquables, les fonctions et la géométrie dans l'espace : ces chapitres sont donc placés tôt.

---

## 2. Semestre 1 : contenu livré

| Chapitre | Notions | Exercices (qcm / réponse courte / ouverte) | Difficultés 1→4 | Flash |
|---|---|---|---|---|
| C01 Nombres réels et calcul dans ℝ | Ensembles de nombres et intervalles ; Puissances et racines carrées ; Valeur absolue et distance ; Ordre, encadrements et valeurs approchées | 12 (2 / 6 / 4) | 3-4-3-2 | 23 |
| C02 Vecteurs et points du plan | Égalité, somme, Chasles ; Produit par un réel, colinéarité ; Repère, coordonnées, déterminant | 12 (2 / 5 / 5) | 3-4-3-2 | 15 |
| C03 Polynômes et fractions rationnelles | Polynômes et identités remarquables (ordres 2 et 3) ; Racines et factorisation, division euclidienne ; Fractions rationnelles | 12 (2 / 5 / 5) | 3-4-3-2 | 16 |
| C04 Barycentre | Deux points pondérés ; Trois points et associativité ; Réduction vectorielle et ensembles de points | 12 (2 / 5 / 5) | 3-4-3-2 | 14 |
| C05 Équations et inéquations dans ℝ | 1er degré, produit, quotient ; Signe de ax + b et tableaux de signes ; Trinôme (forme canonique, discriminant, somme et produit) ; Signe du trinôme, bicarrées, paramètre | 14 (2 / 5 / 7) | 3-4-4-3 | 21 |
| C06 Angles inscrits | Angle inscrit et angle au centre ; Cocyclicité et quadrilatère inscriptible ; Polygones réguliers inscrits | 12 (2 / 5 / 5) | 3-4-3-2 | 15 |
| C07 Généralités sur les fonctions | Ensemble de définition, image, antécédent ; Sens de variation, tableau de variations, extremums ; Parité et résolutions graphiques | 12 (3 / 4 / 5) | 3-4-3-2 | 15 |
| C08 Géométrie dans l'espace | Incidence et positions relatives ; Parallélisme (théorème du toit, sections) ; Orthogonalité et calculs (diagonales, volumes) | 12 (4 / 3 / 5) | 3-4-3-2 | 14 |
| **Total S1** | **26 notions** | **98 exercices** (19 / 38 / 41) | | **133** |

Chaque notion contient :
- un `cours_md` complet : encadrés `:::definition`, `:::propriete`, `:::methode`, `:::remarque`, `:::attention` ; démonstrations courtes quand elles sont au programme (irrationalité de √2, existence du barycentre, angle inscrit, forme canonique, réduction vectorielle…) ;
- les 3 niveaux d'explication, une analogie togolaise quand elle aide (sinon chaîne vide), les erreurs fréquentes, des astuces, un moyen mnémotechnique, un rappel « Tu te souviens de la 3e/4e ? », la méthode de rédaction et 4 à 6 fiches flash ;
- un schéma SVG original (`05_medias/svg/M-S1-Cxx-Nx.svg`, fond `#fffdf8` arrondi, `viewBox`, police sans-serif, contrôlé visuellement à 400 px).

À noter pour le site : les `exemples_resolus` (2 par notion, pas à pas) sont **aussi recopiés à la fin du `cours_md`** dans une section « Exemples résolus pas à pas » (encadrés `:::exemple n°1`…), car la consigne demandait un cours autonome avec au moins 2 exemples. Si le site affiche aussi le champ `exemples_resolus`, il faut n'en afficher qu'un des deux.

Tous les exercices sont `type: "exercice_type_inspire"` et `authentique: false`. Ils sont rangés par difficulté croissante. Chacun a un corrigé rédigé comme sur une copie, un barème de même longueur et des indices. Le contexte est togolais (champ à Notsè, marché, zémidjan…). Pour les `reponse_courte`, les variantes de saisie avec signe moins ASCII ou unicode et avec `^2`/`²` sont acceptées.

`videos` est **vide partout** : WebFetch étant bloqué, aucun lien YouTube n'a pu être ouvert et vérifié. Aucune URL n'a été inventée.

### Vérification de l'exactitude
- Chaque chapitre est produit par un script Python (sympy 1.14) qui **vérifie par des assertions** tous les résultats numériques et algébriques des exercices et des exemples, avant d'écrire le JSON. Si une assertion échoue, le fichier n'est pas écrit.
- Exercices `ouverte` (41) : `verification: "double_resolution"`. La résolution rédigée est confrontée à une seconde résolution indépendante, faite par une autre méthode dans le script. Exemples : `solveset` contre la factorisation à la main ; coordonnées génériques contre raisonnement vectoriel pour les barycentres et l'alignement ; coordonnées 3D pour le cube et le tétraèdre régulier ; vérification numérique aléatoire du théorème de l'angle inscrit.
- Exercices `qcm` et `reponse_courte` (57) : `verification: "code"`.
- Le LaTeX de tous les champs est validé par KaTeX (validateur). J'ai aussi fait passer les cours dans un rendu identique à `Riche.tsx` (marked + KaTeX) : aucun encadré non fermé, aucune formule cassée.
- Les scripts de génération ne sont pas dans le dépôt. Ils sont dans le dossier scratch de la session : `/tmp/claude-0/-home-user-Nexus/ce3cd55d-c58d-574a-8c7b-de9d975f03c9/scratchpad/m/` (`lib.py`, `c01.py` … `c08.py`, `programme.py`).

---

## 3. Ce qui manque
- **Programme officiel non vérifié** : il faut obtenir le programme APC de Seconde (DPC/MEN, version issue de la réforme 2022-2023) ou la progression harmonisée de l'inspection de l'élève, puis passer `statut` à `verifie` ou `partiellement_verifie`.
- Volume horaire et coefficient de Seconde S : à reprendre de la note ministérielle (tableau annexé à l'article de la source 3).
- Vidéos : à ajouter seulement après vérification manuelle des liens.
- Épreuves authentiques togolaises de maths de Seconde : non traitées ici (hors périmètre de cet agent ; les sites qui les hébergent sont bloqués).

## 4. Points de doute
1. **Programme APC « allégé » (depuis 2022-2023)** : la réforme a pu retirer ou déplacer des chapitres du sommaire CIAM. Les candidats les plus probables sont les polygones réguliers, une partie du barycentre, le produit scalaire ou les équations bicarrées et à paramètre. Je ne peux pas le confirmer.
2. **Trinôme du second degré** (discriminant, signe) : il fait partie du chapitre « Équations et inéquations » de CIAM 2nde S et des programmes HPM de Seconde S. Si le programme togolais actuel le reporte en Première, la notion C05-N4 et une partie de C05-N3 deviennent de l'avance.
3. **Appellation de la classe** : des devoirs récents parlent de « Seconde CD » plutôt que « Seconde S ». Le contenu de maths devrait être le même, mais ce n'est pas confirmé.
4. **Ordre des chapitres** : c'est une proposition cohérente, pas la progression officielle. L'élève doit suivre l'ordre de son professeur ; les prérequis indiqués dans chaque chapitre (`prerequis`, `prerequis_notions`) permettent de réordonner sans casser les dépendances.
5. **Découpage** : les identifiants S1/S2 coexistent avec un calendrier en trimestres en 2026-2027 (source 6, fiabilité 4, lue par extrait seulement).

---

## 5. Semestre 2 (M-S2-C09 … M-S2-C15)
_Section complétée par l'agent assistant chargé du semestre 2._
