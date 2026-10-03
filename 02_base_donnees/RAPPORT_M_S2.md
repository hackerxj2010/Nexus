# Rapport — Mathématiques, semestre 2 (M-S2-C09 à M-S2-C15)

Agent : contenu Mathématiques S2. Date : 2026-10-03.
Validation : `node 02_base_donnees/valider.mjs M` → **Aucune erreur.** (15 chapitres M, 58 notions, 194 exercices, 294 fiches flash, 58 images au total S1 + S2).

## 1. Chapitres réalisés

Ids et titres repris exactement de `01_recherche/programme/M.json`.

| Chapitre | Titre | Notions | Exercices (diff. 1/2/3/4) | Flash | SVG |
|---|---|---|---|---|---|
| M-S2-C09 | Équations et inéquations dans ℝ×ℝ (systèmes) | 4 | 13 (3/4/3/3) | 20 | 4 |
| M-S2-C10 | Angles orientés et trigonométrie | 5 | 13 (3/5/3/2) | 26 | 5 |
| M-S2-C11 | Étude de fonctions (fonctions de référence) | 5 | 14 (3/5/4/2) | 25 | 5 |
| M-S2-C12 | Produit scalaire | 5 | 14 (3/5/4/2) | 25 | 5 |
| M-S2-C13 | Droites et cercles dans le plan | 5 | 14 (3/6/3/2) | 25 | 5 |
| M-S2-C14 | Transformations du plan : translation, homothétie, rotation | 4 | 14 (3/5/4/2) | 20 | 4 |
| M-S2-C15 | Statistique | 4 | 14 (3/5/4/2) | 20 | 4 |
| **Total** | | **32** | **96** | **161** | **32** |

Notions par chapitre :
- **C09** : équations du 1er degré à deux inconnues (droites) ; systèmes 2×2 (substitution, combinaison, déterminant/Cramer, interprétation graphique) ; inéquations et systèmes d'inéquations (régionnement, point test, hachures) ; systèmes 3×3 (pivot de Gauss), changement d'inconnues, mise en équation (dont une petite programmation linéaire).
- **C10** : radian et cercle trigonométrique (mesure principale, longueur d'arc) ; angles orientés de vecteurs (Chasles, règles, colinéarité) ; cos, sin, tan d'un réel (valeurs remarquables, cos² + sin² = 1) ; angles associés ; équations cos x = cos a, sin x = sin a (+ inéquations lues sur le cercle).
- **C11** : affines et valeur absolue (affine par morceaux) ; carré et trinômes (forme canonique, sommet, axe) ; inverse et homographiques (forme réduite, centre, asymptotes) ; racine carrée et cube ; courbes associées (translations, −f, f(−x), |f|) et éléments de symétrie (axe x = a, centre Ω).
- **C12** : définition (projection, cosinus, normes) ; propriétés et orthogonalité ; expression analytique en repère orthonormé ; Al-Kashi et théorème de la médiane ; ensembles de points (MA·MB = k, AB·AM = k, MA² ± MB² = k).
- **C13** : équations cartésiennes et réduites (vecteur directeur, parallélisme) ; représentation paramétrique ; vecteur normal, perpendicularité, distance d'un point à une droite ; équation d'un cercle ; positions relatives droite/cercle, tangente (+ remarque sur deux cercles).
- **C14** : translation ; homothétie ; rotation ; utilisation (tableau récapitulatif, composées simples de même nature, lieux de points).
- **C15** : vocabulaire, effectifs, fréquences, ECC ; graphiques (bâtons, circulaire, histogramme à classes inégales, polygone des ECC) ; mode, moyenne, médiane (interpolation linéaire) ; étendue, variance, écart-type (formule de König, transformation affine des données).

Chaque notion contient : `cours_md` structuré avec encadrés `:::definition/:::propriete/:::methode/:::remarque/:::attention` et deux `:::exemple` résolus pas à pas, définition courte, formules, trois niveaux d'explication, analogie togolaise quand elle aide (sinon chaîne vide), **deux exemples résolus supplémentaires différents de ceux du cours** (contrôle automatique : les 40 premiers caractères d'un énoncé de `exemples_resolus` n'apparaissent jamais dans `cours_md`, même règle que le filtre `dejaDansCours` du site), erreurs fréquentes, astuces, mnémo, rappel antérieur (3e ou 1er semestre), méthode de rédaction, 4 à 6 fiches flash, schéma SVG, `videos: []`.

Exercices : tous `type: "exercice_type_inspire"`, `authentique: false` ; formats qcm / réponse courte / ouverte ; `corrige` et `bareme` de même longueur ; `verification: "code"` (qcm, réponse courte) ou `"double_resolution"` (ouverte).

## 2. Fichiers produits

- `02_base_donnees/M/M-S2-C09.json` … `M-S2-C15.json` (7 fichiers, écrits par `json.dump(ensure_ascii=False, indent=1)`).
- `05_medias/svg/M-S2-Cxx-Ny.svg` (32 schémas originaux, CC0) : fond `#fffdf8` à coins arrondis, `viewBox` 400 de large, police sans-serif, tailles de texte ≥ 12–13 px (lisibles à 360 px), repères orthonormés quand la géométrie l'exige (cercles, angles, perpendicularité). Chaque SVG a été rendu en PNG (cairosvg) et contrôlé visuellement (chevauchements d'étiquettes corrigés).
- Scripts de génération et de vérification : hors du dépôt, dans le dossier temporaire de session (`svglib.py`, `common.py`, `svg_c09.py`…`svg_c15.py`, `c09.py`…`c15.py`). Ils ne sont pas versionnés.
- Aucun fichier M-S1-* modifié ; pas de commit.

## 3. Vérification de l'exactitude

- Chaque script de chapitre commence par un bloc d'assertions **sympy / fractions / statistics** qui recalcule tous les résultats numériques du cours, des exemples et des exercices ; le JSON n'est écrit que si toutes passent.
- Exercices `ouverte` : seconde résolution indépendante dans le code (ex. : systèmes résolus par `linsolve` et par les formules de Cramer ; équations trigonométriques par `solveset` et par balayage numérique ; nombre de solutions de f(x) = m par comptage numérique des changements de signe ; programmation linéaire par force brute sur les entiers ; transformations vérifiées en nombres complexes ; Al-Kashi/médiane recoupés par coordonnées explicites ; variances par la définition et par König, et par `statistics.pvariance`).
- **Erreur détectée et corrigée grâce à ces contrôles** : C13-E09, l'équation de la hauteur issue de A avait été rédigée « 2x + 3y + 1 = 0 » ; la bonne équation est 2x + 3y − 1 = 0, d'où H(29/13 ; −15/13). Le corrigé a été rectifié (la distance AH = 14/√13 et l'aire 14 étaient justes).
- Orientations des angles (triangles équilatéraux extérieurs, carré direct et quart de tour) vérifiées numériquement avant rédaction.
- Contrôles structurels : encadrés `:::` tous fermés et non imbriqués, nombre pair de `$` dans chaque champ, ids d'exercices uniques, difficultés 1→4 présentes dans chaque chapitre, images présentes.
- Test de l'assembleur du site (`06_site/scripts/assembler.mjs`) sur une **copie** du dépôt : fonctionne ; les seuls prérequis non résolus sont les identifiants `M-3e-…` (comme en S1).

## 4. Doutes et choix à confirmer

1. **Programme reconstitué** (`statut: "reconstitue"` dans M.json) : le contenu suit le découpage CIAM 2nde S, sans document officiel togolais lu. Choix de périmètre à confronter à la progression de l'établissement :
   - C09 : systèmes 3×3 par pivot de Gauss et une initiation à la programmation linéaire (bénéfice maximal « admis » en un sommet) — classiques en Seconde S CIAM, mais certains professeurs s'arrêtent aux systèmes 2×2.
   - C10 : équations trigonométriques élémentaires incluses (cos x = cos a, sin x = sin a, et cos 2x = 1/2 en exercice) ; les formules d'addition (1re) ne sont pas traitées.
   - C14 : l'expression analytique d'une rotation d'angle quelconque est donnée en remarque « admise » ; seuls les quarts de tour et le demi-tour sont exigés en exercice. Composées limitées aux transformations de même nature (même centre).
   - C15 : pas de quartiles ni d'écart interquartile (incertain au programme CIAM de Seconde) ; variance et écart-type traités avec la formule de König.
2. Notation des transformations : `t_u`, `h(O ; k)`, `r(O ; θ)` ; les manuels varient (h_(O,k), r_(O,θ)).
3. Produit scalaire défini par la projection orthogonale avec la règle de signe (formulation sans mesures algébriques dans le cours, mesures algébriques mentionnées dans le niveau « complet »).
4. Réponses courtes : les formes acceptées couvrent les écritures usuelles (√, sqrt, racine, virgule/point, « S={…} ») mais un élève peut saisir une forme équivalente non prévue (par exemple un ordre différent dans un ensemble de solutions trigonométriques) ; l'auto-correction reste possible via le corrigé.

## 5. Manques

- **Vidéos** : listes vides (réseau sans accès vérifiable ; aucune URL inventée).
- **Exercices authentiques** : aucun (pas d'épreuve togolaise de S2 accessible) ; tous les exercices sont « inspirés » de types de devoirs et compositions.
- Les identifiants de prérequis de 3e (`M-3e-SYSTEMES`, `M-3e-FONCTIONS-AFFINES`, `M-3e-TRIGONOMETRIE`, `M-3e-CERCLE`, `M-3e-PYTHAGORE`, `M-3e-STATISTIQUES`, `M-3e-TRANSLATION`, `M-3e-SYMETRIES`, `M-3e-THALES`, `M-3e-REPERE`) ne correspondent à aucune notion rédigée ; le site les ignore dans les liens « Revoir ».
- `05_medias/medias_index.json` et `03_structure/*.json` sont des fichiers générés : ils seront mis à jour au prochain `npm run dev` / `npm run build` (assembleur non lancé sur le dépôt réel pour ne pas modifier de fichiers partagés).

## 6. Signalements (fichiers S1, non modifiés)

- Aucune erreur du validateur dans les fichiers M-S1-*.
- Dans `M-S1-C01.json` (modèle), les `exemples_resolus` reprennent mot pour mot les exemples du `cours_md` : le site les masque (filtre `dejaDansCours`), si bien que ces notions n'affichent aucun exemple résolu « pas à pas » séparé et que la remédiation réutilise un exemple déjà lu. À remplacer par d'autres exemples si l'agent S1 le souhaite.
