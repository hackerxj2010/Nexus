# Rapport SVT — Seconde S (Togo)

Agent Contenu SVT, 2026-10-03. Ce rapport couvre le **programme** et le **semestre 1 (C01 à C06)**. Le semestre 2 (C07 à C12) est rédigé par un agent auxiliaire, qui ajoute sa section à la fin de ce fichier.

## 1. Programme (`01_recherche/programme/SVT.json`)

**Statut : `reconstitue`.** Je n'ai pu lire aucun document officiel togolais. Le proxy réseau bloque tous les sites togolais, Scribd et YouTube, et seuls les titres et extraits du moteur de recherche étaient accessibles.

| Donnée | Valeur retenue | Source et fiabilité |
|---|---|---|
| Coefficient SVT en 2nde S | 3 | Extrait de la page « Matières, coefficients, chapitres… » du site officiel republiquetogolaise.com (réforme de sept. 2022) : 2nde S coef. 3 et 3 h ; 2nde littéraire coef. 1 et 2 h. Fiabilité 3/5 (extrait, page non lue). |
| Volume horaire | 3 h/semaine | Même source. |
| Découpage | **trimestres** en 2026-2027 | Calendrier 2026-2027 (décision n°125/2026/MEN/CAB/SG) d'après les extraits transmis par l'orchestrateur : T1 14/09–23/12/2026, T2 04/01–09/04/2027, T3 19/04–16/07/2027. En 2025-2026, les compositions étaient semestrielles. Les identifiants gardent S1/S2 comme l'exige le schéma, et le champ `trimestre_indicatif` place chaque chapitre dans l'année. |
| Approche | APC, programmes de seconde « allégés » depuis 2022-2023 | Extrait KOACI du 12/09/2022. Fiabilité 3/5. |
| Contenu du 1er semestre | écosystème, relations entre êtres vivants, chaînes alimentaires, effet de serre, gestion durable, nutrition minérale des plantes vertes et rendement agricole | Description de la **composition régionale du 1er semestre 2025-2026 de 2nde S, DRE Savanes** (epreuvesetcorriges.com, épreuve non lue). Fiabilité 3/5. C'est le seul indice concret sur les chapitres. |
| Programme officiel lui-même | non consulté | Scribd « Programme SVT Seconde Scientifique » (document SVT-SECONDES-CD), décrit dans les extraits comme le programme togolais de 2nde scientifique avec sa progression annuelle. **C'est le document à lire en priorité** pour confirmer ou corriger la liste. |

**Chapitres retenus et confiance :**

| Id | Titre | Trim. | Confiance |
|---|---|---|---|
| SVT-S1-C01 | La cellule, unité structurale et fonctionnelle du vivant | 1 | moyenne |
| SVT-S1-C02 | Les échanges entre la cellule et son milieu | 1 | faible |
| SVT-S1-C03 | L'écosystème : composantes et facteurs écologiques | 1 | bonne |
| SVT-S1-C04 | Relations entre êtres vivants, matière et énergie | 1 | bonne |
| SVT-S1-C05 | L'Homme et son environnement : impacts et gestion durable | 2 | bonne |
| SVT-S1-C06 | Nutrition minérale des plantes vertes et rendement agricole | 2 | bonne |
| SVT-S2-C07 | La photosynthèse | 2 | moyenne |
| SVT-S2-C08 | Respiration et fermentations | 2 | moyenne |
| SVT-S2-C09 | Le sol | 3 | moyenne |
| SVT-S2-C10 | Minéraux et roches | 3 | moyenne |
| SVT-S2-C11 | Érosion, sédimentation, roches sédimentaires, fossiles | 3 | faible |
| SVT-S2-C12 | Structure interne du globe, séismes, volcans | 3 | faible |

C03 à C06 s'appuient sur la composition de la DRE Savanes. Les autres chapitres sont reconstitués d'après les programmes de seconde scientifique voisins (Sénégal, Côte d'Ivoire, Bénin) et la progression provisoire du projet.

## 2. Semestre 1 produit (`02_base_donnees/SVT/SVT-S1-C0x.json`)

| Chapitre | Notions | Exercices (difficultés) | Fiches flash | SVG |
|---|---|---|---|---|
| C01 Cellule | 3 : microscope et mesure ; cellule animale et végétale (ultrastructure) ; théorie cellulaire, procaryote/eucaryote | 10 (1→4) | 18 | 3 |
| C02 Échanges cellulaires | 3 : membrane et diffusion ; osmose (turgescence, plasmolyse, hémolyse) ; transport actif | 10 (1→4) | 17 | 3 |
| C03 Écosystème | 3 : composantes (écosystèmes togolais) ; facteurs écologiques, loi de tolérance, adaptations ; méthodes d'étude (quadrat, Berlèse, capture-recapture, diagramme ombrothermique) | 11 (1→4) | 18 | 3 |
| C04 Relations, matière, énergie | 3 : relations interspécifiques (Striga, Rhizobium…) ; chaînes, réseaux, pyramides ; flux d'énergie et cycles C/N | 11 (1→4) | 18 | 3 |
| C05 Homme et environnement | 3 : déforestation, feux, érosion (y compris côtière) ; pollutions, eutrophisation, bioamplification, effet de serre ; gestion durable | 11 (1→4) | 18 | 3 |
| C06 Nutrition minérale | 3 : besoins (Van Helmont, Knop, carences) ; absorption racinaire et sève brute ; engrais, loi du minimum, rendements décroissants | 12 (1→4) | 18 | 3 |
| **Total S1** | **18** | **65** (21 QCM, 21 réponses courtes, 23 ouvertes) | **107** | **18** |

Chaque notion contient :
- un `cours_md` complet avec les blocs `:::definition`, `:::propriete`, `:::methode`, `:::remarque`, `:::attention`, des expériences historiques et leur interprétation, et des exemples togolais (lagune de Lomé, lac Togo, Kloto, savanes de Kara et des Savanes, Striga, Rhizobium de l'arachide, phosphates de Hahotoé, Fazao-Malfakassa, Kéran, Togodo, érosion côtière d'Aného) ;
- deux exemples résolus d'exploitation de documents, rédigés selon la démarche décrire → interpréter → conclure ;
- les 3 niveaux d'explication, une analogie (quand elle aide), les erreurs fréquentes, des astuces, un moyen mnémotechnique, le rappel « Tu te souviens de la 3e ? », la méthode de rédaction et au moins 4 fiches flash ;
- une image SVG originale (CC0) et une liste `videos` vide.

Les exercices sont tous `exercice_type_inspire` et `authentique: false`, avec un corrigé rédigé comme sur une copie, un barème, un piège et des indices. Chaque chapitre a ses `pieges_composition`.

**Vérifications effectuées :**
- `node 02_base_donnees/valider.mjs SVT` → **Aucune erreur** (6 chapitres, 18 notions, 65 exercices, 107 flash, 18 images).
- **Calculs** (grossissements, tailles réelles, % de variation de masse, isotonie, densité, fréquence, capture-recapture, critère P < 2T, rendements écologiques, % d'érosion, CO₂ +33 %, facteur de bioamplification, doses d'engrais, rentabilité en F CFA) : tous recalculés par des `assert` Python dans les scripts de génération (hors dépôt).
- **QCM** : un contrôle automatique vérifie que la lettre citée dans le corrigé correspond à `bonne_reponse`. Les 21 QCM sont cohérents.
- **Exercices `ouverte`** (23) : seconde résolution indépendante à partir du seul énoncé, puis comparaison avec le corrigé. Résultats concordants. Une correction a été faite : en C02-E10, le corrigé précise désormais que c'est l'accumulation du sel apporté par une eau « légèrement » saumâtre qui rend le sol hypertonique.
- **SVG** : rendu dans Chromium headless à 360 px de large et contrôlé visuellement. Les légendes qui débordaient ou se croisaient ont été corrigées. Chaque SVG a un fond `#fffdf8` arrondi, une police sans-serif, un `viewBox`, un `title` et un `desc`.

## 3. Manques

- **Aucune épreuve authentique SVT** : les sites d'épreuves sont inaccessibles. La composition DRE Savanes 2025-2026 (1er semestre, 2nde S) est à transcrire dès qu'un accès réseau le permet.
- **Vidéos** : aucune, faute de pouvoir ouvrir et vérifier un lien (YouTube bloqué).
- **Images Wikimedia Commons** : aucune citée, car je ne pouvais vérifier ni l'URL ni la licence.
- Les **données chiffrées des exercices** sont marquées « données simplifiées » : elles sont plausibles et cohérentes, mais inventées pour l'exercice (germination, potomètre, sacs de litière, essais d'engrais, lagune…). Les données réelles citées sont : Van Helmont, Dittmer (1937), Mauna Loa (316 → 421 ppm), −18 °C / +15 °C.

## 4. Doutes à lever avec le programme officiel

1. **L'ordre au S1** : la cellule et les échanges cellulaires (C01-C02) sont placés avant l'écologie. La composition DRE Savanes du S1 ne cite que l'écologie et la nutrition minérale ; le programme APC pourrait commencer par l'écologie et placer la cellule au S2.
2. **Le chapitre C02** (diffusion, osmose, transport actif) existe-t-il comme chapitre séparé, ou est-il intégré à la nutrition minérale ?
3. **Le chapitre C12** (structure du globe, séismes, volcans) relève peut-être de la 1re D au Togo.
4. **Faits locaux** à confirmer par un enseignant togolais : la date de la Journée nationale de l'arbre (1er juin), la liste des aires protégées citées, les ordres de grandeur des pluies (Lomé ≈ 800-900 mm, Plateaux > 1 300 mm) et le calendrier des saisons.
5. **Barèmes** : ils sont proposés par moi et ne sont pas officiels.

## 5. Idées de manipulations interactives

| # | Manipulation | Notion liée |
|---|---|---|
| 1 | **Microscope virtuel** : choisir oculaire et objectif, faire la mise au point (macro puis micro), mesurer une cellule avec une règle, calculer la taille réelle. | SVT-S1-C01-N1 |
| 2 | **Cellule cliquable** animale / végétale : toucher un organite affiche son nom et son rôle ; mode quiz « touche la mitochondrie ». | SVT-S1-C01-N2 |
| 3 | **Trieur procaryote / eucaryote** : glisser bactérie, paramécie, levure, Plasmodium, cellule d'oignon dans la bonne colonne. | SVT-S1-C01-N3 |
| 4 | **Simulateur d'osmose** : un curseur règle la concentration du milieu et la cellule d'oignon passe de la turgescence à la plasmolyse, l'hématie de l'hémolyse au ratatinement ; la courbe de masse de la pomme de terre se trace en direct (point isotonique). | SVT-S1-C02-N2 |
| 5 | **Diffusion à particules** : curseurs de température et de gradient, chronomètre jusqu'à l'équilibre. | SVT-S1-C02-N1 |
| 6 | **Quadrats et capture-recapture** : poser des quadrats au hasard sur une photo de savane, compter, calculer densité et fréquence ; simuler une capture-recapture avec des billes. | SVT-S1-C03-N3 |
| 7 | **Diagramme ombrothermique** de villes togolaises (Lomé, Atakpamé, Sokodé, Kara, Dapaong) : les mois secs (P < 2T) se colorent automatiquement. | SVT-S1-C03-N3 |
| 8 | **Constructeur de réseau trophique** : tracer les flèches « est mangé par » entre espèces de la savane ou de la lagune, avec vérification du sens et des niveaux trophiques ; la pyramide et les rendements se calculent seuls. | SVT-S1-C04-N2 / N3 |
| 9 | **Bac d'érosion** : choisir sol nu, cordon pierreux ou herbe et l'intensité de la pluie, puis observer l'eau ruisselée et la terre perdue. | SVT-S1-C05-N1 |
| 10 | **Tonneau de Liebig et calculateur d'engrais** : curseurs N, P, K (sacs NPK 15-15-15 et urée) ; le rendement est limité par la planche la plus courte, avec le bilan coût/gain en F CFA. | SVT-S1-C06-N3 |

## 6. Production

Les fichiers JSON et SVG sont générés par des scripts Python situés hors du dépôt (un script par chapitre et un module commun `common.py` qui contient les outils SVG et les contrôles). Les sorties sont écrites avec `json.dump(..., ensure_ascii=False, indent=1)`.

---

## Semestre 2 (C07 à C12)

*Section à compléter par l'agent chargé du semestre 2.*
