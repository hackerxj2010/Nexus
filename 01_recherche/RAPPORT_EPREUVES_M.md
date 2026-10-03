# Rapport : épreuves de mathématiques (Seconde S, Togo)

*Agent Épreuves MATHÉMATIQUES, 2026-10-03. Validateur : `node 02_base_donnees/valider.mjs M` → **Aucune erreur**.*

## 1. Résultat en bref

- **Épreuves de classe de Seconde (Togo) trouvées et transcrites : 0, pour 100 visées (50 par semestre).** Aucune n'a pu être lue en entier depuis cet environnement : voir la section 3.
- **Hors quota : 10 sujets authentiques du concours national d'entrée aux lycées scientifiques de Lomé et de Kara** (entrée en Seconde S, 2011 à 2021, sauf 2014). Ils sont transcrits, corrigés et vérifiés deux fois : `epreuves/M/S1/EP-M-S1-0001` à `0010`, `type: "concours_entree"`.
- Ces sujets sont de **niveau fin de 3e / début de Seconde** : réels et radicaux, polynômes, fractions rationnelles, repérage, droites, angles inscrits, trigonométrie du triangle rectangle, pyramides et cônes. Ils servent de révision des prérequis et de diagnostic en début de S1. Ils **ne remplacent pas** les devoirs et compositions de Seconde.

## 2. Tableau trouvées / visées

| Semestre | Type | Trouvées (Seconde, Togo) | Visées |
|---|---|---|---|
| S1 | interrogation | 0 | — |
| S1 | devoir surveillé | 0 | — |
| S1 | devoir de maison | 0 | — |
| S1 | composition | 0 | — |
| S1 | devoir harmonisé | 0 | — |
| **S1** | **total** | **0** | **50** |
| S2 | tous types | 0 | 50 |
| **Année** | **total** | **0** | **≥ 100** |
| *(hors quota)* | *concours d'entrée en Seconde S* | *10* | — |

### Détail des 10 sujets de concours (source unique : Google Drive de l'utilisateur)

| Id | Session | Questions corrigées | Points corrigés / 20 | Lisibilité |
|---|---|---|---|---|
| EP-M-S1-0001 | Octobre 2020 | 15 | 12,5 | bonne, sauf la figure de l'Ex2 et la fraction de l'Ex3 |
| EP-M-S1-0002 | Septembre 2017 | 23 | 17,75 | bonne |
| EP-M-S1-0003 | Septembre 2015 | 23 | 17,75 | bonne (lectures confirmées par cohérence) |
| EP-M-S1-0004 | Août 2012 | 16 | 16,5 | bonne, sauf 2 expressions |
| EP-M-S1-0005 | 22 septembre 2011 | 12 | 15,5 | moyenne |
| EP-M-S1-0006 | Octobre 2013 | 20 | 14,5 | moyenne |
| EP-M-S1-0007 | Septembre 2016 | 18 | 14 | moyenne |
| EP-M-S1-0008 | 3 septembre 2018 | 19 | 17,75 | bonne |
| EP-M-S1-0009 | Septembre 2021 | 12 | 9,5 | mauvaise (Ex1 et Ex2 illisibles) |
| EP-M-S1-0010 | Septembre 2019 | 10 | 8 | mauvaise |
| *(non transcrit)* | *Septembre 2014* | — | — | *texte de maths absent de l'OCR* |

**Méthode.** Le PDF fait 12,4 Mo, au-dessus de la limite de 10 Mo du connecteur Drive : impossible de le télécharger. La transcription vient donc du texte OCR fourni par Google Drive :
- formules remises en forme ;
- « [illisible] » pour ce qui manque ;
- « lecture probable » pour les symboles reconstitués.

Une question n'est corrigée que si son énoncé est sûr, ou rendu sûr par la cohérence avec les autres questions. **Double vérification :** passe 1 à la main, passe 2 indépendante avec sympy (`epreuves/M/verification_sympy.py`, **162 contrôles sur 162 OK**), aucun désaccord de calcul. Les litiges de lecture sont listés dans `epreuves/M/corrections_litiges.md`. Fiabilité de la source : 3/5, car c'est un vrai sujet officiel, mais un scan de provenance non précisée lu par OCR.

## 3. Pourquoi 0 épreuve de Seconde

Le proxy de sortie de cet environnement **bloque presque tous les sites**, aussi bien pour curl que pour WebFetch :
- annales : epreuvesetcorriges.com, scribd.com / fr.scribd.com, studocu.com, sigmaths.net, fomesoutra.com, touteslesepreuves.com ;
- sites officiels : ecole.gouv.tg ;
- autres : google.com / drive.google.com / docs.google.com, archive.org, togoschool.com, sujetexa.com, examens-concours.net, examenscorriges.com, yumpu, dokumen, slideshare, calameo, facebook, t.me, etc.

Seuls GitHub, GitLab et les registres de paquets répondent. WebSearch fonctionnait (titres et extraits seulement), mais son **quota de session (200 recherches) a été épuisé** pendant le travail. **Aucune épreuve n'a été construite à partir d'un extrait de recherche.**

Pour débloquer : élargir l'accès réseau de l'environnement (au minimum `epreuvesetcorriges.com`, `scribd.com`, `fr.scribd.com`, `touteslesepreuves.com`, `studocu.com`, `ecole.gouv.tg`), ou télécharger les documents de la section 4 dans `01_recherche/epreuves/M/a_traiter/`.

## 4. Pistes à télécharger manuellement

Les URL ci-dessous ont été vues dans les résultats de recherche, mais leur contenu n'a pas pu être ouvert.

| # | Document (titre ou extrait vu) | URL | Pays / établissement / année | Fiabilité (1-5) |
|---|---|---|---|---|
| 1 | Catégorie « Seconde – Togo » (devoirs et compositions de Seconde, PDF/Word) | https://epreuvesetcorriges.com/categories/togo/colleges/seconde | Togo, plusieurs lycées | 4 |
| 2 | « Mathématiques – Devoir surveillé 1er semestre – Seconde CD – 2025-2026 – Lycée Tabligbo – DRE Maritime » (problème contextualisé : bactéries, rencontre, budget ; QCM ; identités remarquables ; tétraèdre) | sur le site n° 1 (URL exacte non obtenue) | Togo, Lycée de Tabligbo, 2025-2026, S1 | 4 |
| 3 | « Devoir DRE Kara, 1er semestre 2024-2025, Seconde CD » (situation-problème avec des jouets : rectangle, carré, cercle), Lycée « Yade-Sode » (nom tel qu'affiché) | sur le site n° 1 (URL exacte non obtenue) | Togo, DRE Kara, 2024-2025, S1 | 3 |
| 4 | « Devoir de maths 2nde CD – Semestre 1 » (Devoir-2nde-CD-2024-2025) | https://fr.scribd.com/document/794348247/Devoir-2nde-CD-2024-2025 | pays non confirmé, 2024-2025 | 2 |
| 5 | « Devoir N°1 de Mathématiques Seconde S » (2022-2023, opérations dans ℝ, expressions algébriques) | https://www.scribd.com/document/719052144/Devoir-No-1-de-Mathe-matiques-Seconde-S-A-H-LEPD | pays non confirmé (Seconde S : Togo ou Sénégal) | 2 |
| 6 | « Dev Math 2C » | https://www.scribd.com/document/724333142/Dev-Math-2C | pays non confirmé | 2 |
| 7 | « Devoirs et Compositions Seconde PDF : corrigés, semestres et trimestres » | https://touteslesepreuves.com/45-seconde | Afrique de l'Ouest, dont le Togo (à trier) | 3 |
| 8 | Plateforme officielle d'apprentissage (Moodle, ministère) | https://ecole.gouv.tg/college/course/index.php?categoryid=78 | Togo, officiel | 5 |
| 9 | Documents mathématiques – Togo (surtout BAC, parfois des devoirs) | https://www.sigmaths.net/docEtranger/documents.php?country=togo | Togo | 3 |
| 10 | Page « Lycée de Tokoin » sur Studocu (vue via un sujet BEPC 2024) | https://www.studocu.com/row/document/lycee-de-tokoin/epreuve-de-mathematiques/prepa-sujet-bepc-2024-mathematiques/114376076 | Togo, Lycée de Tokoin | 2 |
| 11 | Calendrier des compositions régionales du 1er semestre 2025-2026, DRE Grand Lomé (Seconde : 12-19 janvier 2026) | https://edusocialnews.com/articles/dre-gl-composition-regionale-et-chronogramme-organisationnel-premier-semestre-2025-2026 | Togo, DRE-GL | 4 (contexte) |
| 12 | Dépôt « ÉpreuvesTogo » : son catalogue cite « Math seconde CD.pdf » et « Maths 2nd CD.pdf », mais les PDF ne sont pas dans le dépôt (plateforme payante) | https://github.com/AIELepreuves/epreuvestogo | Togo, sans établissement ni année | 2 |
| 13 | Bénin (hors quota) : « Épreuve de mathématiques 2nde C-D, 2e devoir du 2e semestre 2023-2024, CEG Yagbé » | https://epreuvesetcorriges.com/categories/benin/college/seconde/36160-epreuve-de-mathematiques-2nde-c-d-2eme-devoir-du-2eme-semestre-2023-2024-ceg-yagbe | Bénin | 4 |
| 14 | Bénin (hors quota) : « 1er devoir du 1er trimestre, mathématiques, 2nde D, 2024-2025 » | https://epreuvesetcorriges.com/categories/benin/36482-epreuve-du-1er-devoir-du-1er-trimestre-mathematiques-classe-de-2nde-d-annee-scolaire-2024-2025 | Bénin | 4 |

**Déjà dans le Google Drive de l'utilisateur, à exploiter :**
- **Le scan original** « Epreuves Concours lycée scientifique.pdf » (https://drive.google.com/file/d/10Cnv2Bd3Zrq_OlSrSM_c0vKDBjENqHrN/view). Le déposer dans `a_traiter/`, ou en exporter les pages de maths en images de moins de 10 Mo, permettrait de compléter les passages illisibles et le sujet 2014. **Ce PDF contient aussi les sujets de Sciences physiques du même concours (2011 à 2021) : à transmettre à l'agent Physique-Chimie.**
- Trois photos (IMG_20260609_204117/204121/204122) de la **Composition régionale du 3e trimestre, DRE Grand Lomé, mai 2025, classe de 3e**. Elles sont de niveau 3e, donc non traitées ici, mais restent utiles pour réviser les prérequis.

## 5. Requêtes infructueuses

**WebSearch :**
- « devoir mathématiques seconde S Togo pdf » : seulement des programmes français.
- « composition premier semestre mathématiques 2nde C Lomé » : Algérie et Côte d'Ivoire uniquement.
- « devoir harmonisé mathématiques seconde Togo lycée » : rien.
- « "Seconde S" composition premier semestre mathématiques Togo » : rien.
- « "Collège Protestant" Lomé seconde mathématiques devoir » : rien.
- « "Lycée de Kara" OR "Lycée d'Adidogomé" OR "Lycée de Bè" seconde mathématiques devoir épreuve » : rien.
- « Lycée Tabligbo devoir mathématiques seconde CD 2025-2026 » : rien en direct (le document n'apparaît que dans les extraits d'epreuvesetcorriges).
- « "2nde S" Togo mathématiques devoir composition lycée pdf scribd » : Sénégal ou documents génériques.

**Code GitHub :**
- « "Lycée de Tokoin" mathématiques », « "2nde S" "Togo" exercice », « "composition du premier semestre" mathématiques seconde », « "Togo" "Seconde" "Devoir" extension:tex », « "2nde C" "Togo" devoir » : aucun sujet.
- Dépôts « togo épreuves » : 8 dépôts, sans PDF de Seconde. Ils contiennent surtout le BAC, et des plateformes dont les fichiers ne sont pas dans le dépôt.

**GitLab :** projets « togo », « epreuves », « annales togo », « lycee togo » : rien.

**Non lancées :** « composition régionale seconde maths DRE Grand Lomé » et les requêtes par DRE (Plateaux, Centrale, Savanes), faute de quota WebSearch.

## 6. Pistes hors ligne (documents à demander)

- **DRE Grand Lomé / Golfe** : sujets des compositions régionales de Seconde (C, D, S), S1 (janvier) et S2 (mai-juin), 2022 à 2026, avec les barèmes officiels.
- **DRE Maritime** (Tabligbo, Tsévié), **Plateaux** (Atakpamé, Kpalimé), **Centrale** (Sokodé), **Kara**, **Savanes** (Dapaong) : devoirs harmonisés de Seconde.
- **Lycée scientifique de Lomé et de Kara** : devoirs et compositions de Seconde S (la classe visée), plus les annales du concours en original.
- **Établissements** : Lycée de Tokoin, Lycée d'Adidogomé, Lycée de Bè, Collège Saint-Joseph, Collège Protestant de Lomé, Collège Chaminade de Kara, lycées de Kara, Sokodé, Atakpamé, Kpalimé, Dapaong. Demander aux professeurs de mathématiques de Seconde leurs devoirs surveillés et interrogations des 3 dernières années.
- **Inspections pédagogiques de mathématiques** (IESG) : banques de sujets et progressions harmonisées.
- **Librairies de Lomé** : recueils d'annales togolaises « Seconde C/D ».
- **L'élève lui-même** : photographier ses devoirs corrigés et ceux de ses aînés. Il suffit de les déposer dans `01_recherche/epreuves/M/a_traiter/` (une photo nette par page) ; ils seront transcrits et corrigés avec la même méthode.

## 7. Fichiers produits

- `01_recherche/epreuves/M/S1/EP-M-S1-0001.json` à `EP-M-S1-0010.json` : concours d'entrée, `type: "concours_entree"`, champs `chapitres` remplis d'après `programme/M.json`.
- `01_recherche/epreuves/M/verification_sympy.py` : passe 2 de vérification (162 contrôles).
- `01_recherche/epreuves/M/corrections_litiges.md` : litiges de lecture et décisions prises.
- `01_recherche/epreuves/M/a_traiter/` : dossier de dépôt des documents à transcrire.
