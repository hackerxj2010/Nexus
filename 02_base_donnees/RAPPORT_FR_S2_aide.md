# Rapport — Français, chapitres FR-S2-C11 à FR-S2-C13 (agent d'aide)

Date : 2026-10-03. Aucun commit, aucun autre fichier FR modifié.

## Ce qui est fait

| Chapitre | Titre (identique à `01_recherche/programme/FR.json`) | Notions | Fiches flash | Exercices |
|---|---|---|---|---|
| FR-S2-C11 | Le commentaire de texte | 5 | 26 | 9 (3 QCM, 3 réponses courtes, 3 rédactions) |
| FR-S2-C12 | La dissertation littéraire | 5 | 26 | 9 (3 QCM, 3 réponses courtes, 3 rédactions dont une dissertation complète) |
| FR-S2-C13 | Œuvre intégrale et méthode de l'épreuve de français | 5 | 25 | 9 (3 QCM, 3 réponses courtes, 3 rédactions) |

**Notions**
- **C11** : N1 la lecture préparatoire (paratexte, genre, énonciation, registres, mouvements, projet de lecture) ; N2 analyser les procédés (citer, nommer, interpréter ; tableau des observations) ; N3 axes de lecture et plan du commentaire composé ; N4 introduction (amener, poser, annoncer) et conclusion (bilan, réponse, ouverture) ; N5 paragraphe d'analyse, intégration des citations, transitions. Texte suivi dans tout le chapitre : « Le Dormeur du val » de Rimbaud (domaine public).
- **C12** : N1 analyser le sujet et formuler la problématique ; N2 choisir le plan selon la consigne (dialectique, explicatif, thématique) ; N3 choisir et exploiter les exemples littéraires (réservoir d'œuvres africaines et françaises) ; N4 rédiger l'introduction en trois temps, le développement (IAEC), les transitions et la conclusion ; N5 les grandes questions littéraires (fonctions de la littérature, genres, engagement, lecture). Sujet suivi : La Fontaine, « Une morale nue apporte de l'ennui… ».
- **C13** : N1 lire une œuvre intégrale et construire sa fiche de lecture ; N2 étudier une œuvre (structure, personnages, thèmes, contexte), avec *L'Enfant noir* comme exemple ; N3 exploiter l'œuvre (questions sur l'œuvre, dissertation sur l'œuvre, exposé oral) ; N4 structure de l'épreuve, questions de la partie A (Réponse, Preuve, Explication ; verbes de consigne), choix du sujet B ; N5 plan de route des 4 heures, brouillon, présentation de la copie, relecture ciblée.

**Contenu de chaque notion** : `cours_md` complet avec encadrés (définition, méthode étape par étape, propriété, attention, remarque) et exemples analysés ; trois niveaux d'explication ; une analogie togolaise sobre ; 1 ou 2 exemples résolus, différents de ceux du cours (contrôle automatique) ; erreurs fréquentes ; astuces ; moyen mnémotechnique ; rappel « Tu te souviens de la 3e ? » ; méthode de rédaction (présentation de la copie) ; au moins 4 fiches flash ; un SVG original ; `videos: []`.

**Exercices** : tous `type: "exercice_type_inspire"`, `authentique: false`, difficultés 1 à 4. Les rédactions ont une copie modèle découpée en étapes, chacune avec ses critères, et un barème de même longueur que le corrigé. Les devoirs complets (C11-E09, C12-E09, C13-E09) sont notés sur 12, comme la partie B ; la série de questions C13-E07 est notée sur 8, comme la partie A. C13-E06 est le seul calcul : 240 − 150 = 90 min, vérifié par une assertion dans le script, donc `verification: "code"`.

**SVG** (15 fichiers, `05_medias/svg/FR-S2-C1[123]-N[1-5].svg`) : fond `#fffdf8` à coins arrondis, viewBox de 400 px de large, police sans-serif système. On y trouve des schémas d'étapes, deux plans types (commentaire, dissertation dialectique), des tableaux, des cartes mentales et une frise des 4 heures. Je les ai tous convertis en PNG à 360 px avec CairoSVG et vérifiés à l'œil : aucun chevauchement, texte lisible.

**Validateur** : `node 02_base_donnees/valider.mjs FR` affiche « Aucune erreur. » (13 chapitres, 61 notions, 100 exercices, 307 fiches flash, 61 images pour FR). Je n'ai vu aucune erreur dans les autres fichiers.

## Outils

- Copies dans `scratchpad/fr_aide/` : les originaux `svglib.py`, `commun.py` et `build.py` (version mise à jour, recopiée). Les modules modèles sont renommés `modele_cXX.py` pour qu'un `build.py` lancé sans argument ne réécrive jamais les chapitres de l'autre agent. `programme.py` a été supprimé de la copie, car il réécrit `FR.json`.
- Ajouts : `svg_aide.py` (fonction `plan()` pour les plans types de devoir) et `build_aide.py`. Ce dernier n'accepte que c11, c12 et c13. Il refuse un exemple résolu déjà présent dans le cours ou un chevron dans le texte, puis appelle `build.py`.
- Sources : `c11.py`, `c12.py`, `c13.py`.

## Doutes et points à vérifier

1. **Format de l'épreuve** (C13-N4 et N5) : il vient des comptes rendus de presse du BAC I 2024 (déjà notés « à confirmer » dans `FR.json`). Le cours le présente comme le format du BAC I et invite à vérifier celui des compositions de seconde. Le plan de route 10-50-60-90-20-10 est une recommandation, pas une règle officielle.
2. **Œuvres togolaises au programme** (*Le Trône royal*, *Le Cauchemar d'un immigré*) : elles sont citées comme « d'après la presse, à vérifier ». Faute de les avoir lues, je n'en ai décrit aucun contenu. Les exemples d'œuvre intégrale utilisent *L'Enfant noir*, *L'Avare* et *Une vie de boy*.
3. **Faits écrits de mémoire, à relire dans une édition** :
   - la ponctuation de la citation de La Fontaine (« …de l'ennui ; » ou « …de l'ennui : ») ;
   - pour *L'Enfant noir* : douze chapitres, prix Charles Veillon 1954, critique de Mongo Beti, opposition de la mère au départ pour la France ;
   - Kacou Ananzè souvent puni pour sa gourmandise dans *Le Pagne noir* ;
   - la formule de Molière (premier placet sur *Tartuffe*, 1664) et le vers de Hugo dans « Fonction du poète » (*Les Rayons et les Ombres*, 1840) ;
   - la phrase « Un roman : c'est un miroir… » est en réalité une épigraphe de chapitre que Stendhal attribue à Saint-Réal dans *Le Rouge et le Noir* ; on l'attribue couramment à Stendhal, comme dans le cours.
4. **Formule d'Amadou Hampâté Bâ** : elle est donnée comme « attribuée » (« quand un vieillard meurt… »), car il en existe plusieurs versions.
5. **Citations d'auteurs africains contemporains** : seulement de très courtes citations attribuées (dédicace de *L'Enfant noir*). Les textes longs viennent du domaine public (Rimbaud, Hugo, La Fontaine) ou ont été écrits pour la plateforme et sont signalés comme tels : le texte du départ en car, « Chant pour la lagune », le texte du grand-père, et de courts extraits de travail.
6. **Cohérence avec C05 (discussion)** : C05 enseigne une introduction en quatre temps (APPA). Pour le commentaire et la dissertation, j'ai suivi la consigne d'une introduction en trois temps, « Amener, Poser, Annoncer » (APA), où « poser » regroupe la présentation et la problématique. Le lien avec C05 est expliqué dans C11-N4. Le paragraphe argumentatif IAEC de C05 est repris en dissertation.
7. **Prérequis** : ils renvoient aux notions existantes de C01 à C10 (par exemple FR-S2-C08-N4, FR-S2-C09-N3, FR-S2-C09-N4, FR-S1-C05-N4). Si l'autre agent renumérote ses notions, il faudra les mettre à jour.
