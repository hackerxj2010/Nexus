# Rapport : épreuves SVT de Seconde (agent SVT)

Date : 2026-10-03. Contrat : `02_base_donnees/SCHEMA.md`, section 3.

## Résumé

**0 épreuve transcrite, 0 fichier JSON créé.** Je n'ai pas pu ouvrir une seule épreuve de SVT de Seconde.

- Le proxy réseau de l'environnement refuse presque tous les sites (403 sur CONNECT). C'est le cas pour curl et pour WebFetch, y compris sur des sites aussi courants que Wikipédia.
- Hôtes refusés (testés une fois chacun) : epreuvesetcorriges.com, scribd.com / fr.scribd.com, coursdrek.wordpress.com, coursdrek.files.wordpress.com, public-api.wordpress.com, touteslesepreuves.com, ecole.gouv.tg, journaleducatif.com, edusocialnews.com, karandoogo.com, sunudaara.com, svtdakar.e-monsite.com, slideshare, studocu, calameo, yumpu, dokumen.pub, readkong, web.archive.org, archive.org, drive.google.com, docs.google.com, google.com, bing.com, duckduckgo.com, tiktok.com, facebook.com, wikipedia, republiquetogolaise.com, hal.science, zenodo.org, huggingface.co.
- Seuls GitHub et les registres de paquets sont joignables. WebSearch fonctionne, mais il ne renvoie que des titres, des URL et un résumé rédigé par un modèle, jamais le texte intégral.
- La règle « zéro fabrication » interdit donc de créer une épreuve. Une épreuve exige son texte complet, lu à une URL réellement consultée. **Aucune épreuve n'a été construite à partir d'un extrait de recherche.**
- Le quota (50 par semestre) n'est pas atteint et je ne l'ai pas comblé.

Sortie du validateur (`node 02_base_donnees/valider.mjs SVT`) :

```
SVT │ chapitres 0 │ notions 0 │ exercices 0 │ flash 0 │ images 0 │ epreuves '{}' │ concours 0 │ epreuvesNonTogo 0
Aucune erreur.
```

## Tableau trouvées / visées

| Semestre | Type | Trouvées (texte intégral lu) | Visé |
|---|---|---|---|
| S1 | interrogation | 0 | ≈ 10 |
| S1 | devoir surveillé | 0 | ≈ 15 |
| S1 | devoir de maison | 0 | ≈ 5 |
| S1 | composition (établissement) | 0 | ≈ 10 |
| S1 | devoir harmonisé / composition régionale | 0 (1 piste repérée) | ≈ 10 |
| **S1 total** | | **0** | **50** |
| S2 | interrogation | 0 | ≈ 10 |
| S2 | devoir surveillé | 0 | ≈ 15 |
| S2 | devoir de maison | 0 | ≈ 5 |
| S2 | composition (établissement) | 0 | ≈ 10 |
| S2 | devoir harmonisé / composition régionale | 0 | ≈ 10 |
| **S2 total** | | **0** | **50** |
| Hors quota | concours d'entrée en Seconde S | 0 (pas de SVT au concours, voir plus bas) | — |
| Hors quota | autres pays (Bénin, Sénégal…) | 0 (pistes listées) | — |

La répartition par type de la colonne « Visé » est indicative.

## Google Drive de l'utilisateur (lecture seule)

J'ai fait les recherches suivantes : plein texte « SVT », titres (SVT, biolog, seconde, 2nde, 2nd, preuve, oncours, evoir, omposition, Togo, lycée), tous les PDF, les images récentes, les fichiers partagés avec l'utilisateur, et le plein texte « Sciences de la Vie », « écosystème », « cellule », « photosynthèse », « biocénose », « chaîne alimentaire ».

- **« Epreuves Concours lycée scientifique.pdf »** (id `10Cnv2Bd3Zrq_OlSrSM_c0vKDBjENqHrN`) : sessions 2011 à 2021 du concours d'entrée au lycée scientifique (Togo). Il ne contient **que des Mathématiques et des Sciences physiques**. J'ai relu le texte extrait (2 528 lignes) et je n'y ai trouvé aucune épreuve de SVT. Il n'y a donc rien à créer pour SVT en `concours_entree`.
- **Photos IMG_20260609_2041\*.jpg** : composition régionale de Mathématiques de 3e, DRE Grand Lomé, mai 2025. Ce n'est pas de la SVT. Ces photos relèvent de l'agent M, niveau 3e.
- **IMG-20260609-WA0356.jpg** : notes manuscrites de philosophie. Hors sujet.
- Je n'ai trouvé aucun autre document de SVT dans le Drive.

## Pistes à télécharger manuellement

Mode d'emploi : téléchargez le PDF ou les photos depuis un navigateur ordinaire, puis déposez-les dans `01_recherche/epreuves/SVT/a_traiter/`. Nommez chaque fichier avec l'établissement, la classe, le semestre et l'année si possible, et gardez l'URL d'origine, par exemple dans un fichier `.txt` à côté. Au prochain passage, l'agent extraira le texte (pdftotext, ou OCR tesseract français, désormais installé), le transcrira, le corrigera avec double vérification et l'enregistrera en JSON.

La fiabilité (1 à 5) est estimée d'après le titre et l'hébergeur ; aucun document n'a été lu.

### A. Togo, Seconde, SVT (prioritaires, comptent dans le quota)

| # | Document (titre tel qu'indexé) | URL | Établissement / année | Semestre, type | Chapitres probables | Fiab. |
|---|---|---|---|---|---|---|
| T1 | SVT : Composition régionale 1er semestre, Seconde S, année scolaire 2025-2026, DRE Savanes (Togo) | https://epreuvesetcorriges.com/categories/togo/colleges/seconde/41852-svt-composition-regionale-1er-semestre-seconde-s-annee-scolaire-2025-2026-dre-savanes-togo | DRE Savanes, 2025-2026 | S1, devoir harmonisé (composition régionale) | Selon le résumé du moteur : effet de serre, biocénose, chaînes alimentaires, « intrus », nutrition minérale des plantes vertes et rendement agricole (SVT-S1-C03 à C06) | 4 |
| T2 | Seconde, Togo (liste de la catégorie, avec d'autres matières et années) | https://epreuvesetcorriges.com/categories/togo/colleges/seconde | divers | à trier | — | 3 |
| T3 | « SCR : compositions régionales » (dossier Moodle officiel) | https://ecole.gouv.tg/college/mod/folder/view.php?id=21 | plateforme du ministère, niveau à vérifier (section « college ») | compositions régionales | — | 4 |
| T4 | Catégorie ecole.gouv.tg (cours et ressources) | https://ecole.gouv.tg/college/course/index.php?categoryid=78 | ministère | à explorer | — | 3 |
| T5 | Site « coursdrek » (cours et épreuves DRE Kara : compositions régionales SVT 1re D et Tle D, DRE Kara et DRE Lomé-Golfe, 2018-2020) | https://coursdrek.wordpress.com/ | DRE Kara / Lomé-Golfe | aucun document de Seconde vu dans les résultats, chercher la rubrique 2nde | — | 3 |
| T6 | « Épreuves de seconde svt togo » (page de recherche agrégée) | https://examenscorriges.com/ssearch.php?id_search=97853 | divers | à trier | — | 2 |
| T7 | Orniformation : « TOGO, derniers sujets ou anciennes épreuves des lycées, collèges… » | https://orniformation.com/index.php/fr/epreuves-de-probatoire-general/TOGO-Derniers-sujets-ou-anciennes-%C3%A9preuves-des-lyc%C3%A9es-coll%C3%A8ges-et-autres--tout-niveau-%C3%A0-t%C3%A9l%C3%A9charger-gratuitement/lang,fr-fr/ | divers (surtout BAC et BEPC) | Seconde à vérifier | — | 2 |
| T8 | TikTok : « Composition Régionale 1 Semestre 2026 Svt Second » | https://www.tiktok.com/discover/composition-r%C3%A9gionale-1-semestre-2026-svt-second | élèves et enseignants togolais (photos de sujets) | S1 2025-2026 | — | 1 |
| T9 | TikTok : « Épreuve De Svt Second Composition Régional Du 2e Semestre De L'année Passée » | https://www.tiktok.com/discover/%C3%A9preuve-de-svt-second-composition-r%C3%A9gional-du-2e-semestre-de-lann%C3%A9e-pass%C3%A9e | idem | S2 | — | 1 |
| T10 | TikTok : « Les Épreuves De Svt Disponible Au Togo Pour La Composition Régionale Du Premier Semestre 2026 » | https://www.tiktok.com/discover/les-%C3%A9preuves-de-svt-disponible-au-togo-pour-la-composition-r%C3%A9gionale-du-premier-semestre-2026 | idem | S1 2025-2026 | — | 1 |

Pour T8 à T10, une capture d'écran du sujet ne vaut épreuve authentique que si la vidéo indique la DRE, la classe et l'année. Sinon, elle sera gardée avec `authentique: false`.

### B. Document utile au programme (pas une épreuve)

| Document | URL | Remarque | Fiab. |
|---|---|---|---|
| Programme SVT Seconde Scientifique (fichier « SVT-SECONDES-CD ») | https://www.scribd.com/document/607556003/SVT-SECONDES-CD | Programme togolais de 2nde C/D d'après le résumé : objectifs, profil de sortie, progression annuelle. C'est le document à lire en priorité pour vérifier `01_recherche/programme/SVT.json`. Il est déjà cité par l'agent programme. | 3 |
| Programme SVT 1re D Togo 2023 | https://www.scribd.com/document/685890582/PROGRAMME-SVT-1re-D | Utile pour les prérequis de la classe suivante. | 2 |

### C. Pays non déterminé (à ouvrir pour identifier le pays)

| Document | URL | Indices | Fiab. |
|---|---|---|---|
| Devoir SVT 2nde C (DST de 2 h, ADN, cycle cellulaire, QCM) | https://www.scribd.com/document/831582523/Devoir-Svt-2nde-c | pays non indiqué dans l'extrait | 2 |
| Epreuve Svt 2nd s : évaluation écosystèmes (institution Saint François d'Assise) | https://www.scribd.com/document/734830190/Epreuve-Svt-2nd-s | la mention « 2nd S » évoque plutôt le Sénégal | 2 |
| Corrigé du devoir noté de SVT 2nde (vacances 2023) | https://www.scribd.com/document/930577040/Corrige-du-devoir-note-de-SVT-2nde-vacances-2023 | pays inconnu | 1 |

### D. Autres pays (hors quota togolais, utiles pour l'entraînement)

**Bénin** (programme et découpage en semestres proches du Togo) :

| Document | URL | Année, semestre |
|---|---|---|
| SVT 2nde D, 1er devoir du 1er semestre, CEG Goho (Abomey) | https://epreuvesetcorriges.com/categories/benin/college/seconde/34495-svt-2nde-d-1er-devoir-du-1er-semestre-2023-2024-ceg-goho-abomey | 2023-2024, S1 |
| SVT 2nde D, 1er devoir du 1er semestre, CEG Yagbé | https://epreuvesetcorriges.com/categories/benin/college/seconde/34496-svt-2nde-d-1er-devoir-du-1er-semestre-2023-2024-ceg-yagbe | 2023-2024, S1 |
| SVT 2nde D, 2e devoir du 1er semestre, CEG Le Nokoué | https://epreuvesetcorriges.com/categories/benin/college/seconde/33269-svt-2nde-d-deuxieme-devoir-du-premier-semestre-2022-2023-ceg-le-nokoue | 2022-2023, S1 |
| SVT 2nde D, 1er devoir du 1er semestre, novembre 2024 (CEG non précisé dans le titre) | https://epreuvesetcorriges.com/categories/benin/college/seconde/36639-epreuve-1er-devoir-du-1er-semestre-svt-2nde-d-novembre-2024-annee-scolaire-2024-2025-ceg | 2024-2025, S1 |
| SVT 2nde ABC, 1er devoir du 1er semestre, CEG Dantokpa | https://epreuvesetcorriges.com/categories/benin/college/seconde/2756-1er-devoir-du-1er-semestre-svt-2nde-abc-2019-2020-ceg-dantokpa | 2019-2020, S1 |
| SVT 2nde C, 1er devoir du 2e semestre, CEG Zongo | https://epreuvesetcorriges.com/categories/benin/college/seconde/26142-1er-devoir-du-2eme-semestre-svt-2nde-c-2021-2022-ceg-zongo | 2021-2022, S2 |
| SVT 2nde D, 1er devoir du 2e semestre, CEG Zongo | https://epreuvesetcorriges.com/categories/benin/college/seconde/26146-1er-devoir-du-2eme-semestre-svt-2nde-d-2021-2022-ceg-zongo | 2021-2022, S2 |
| SVT 2nde D, 1er devoir du 2e semestre, CEG Le Nokoué | https://epreuvesetcorriges.com/categories/benin/college/seconde/26144-1er-devoir-du-2eme-semestre-svt-2nde-d-2021-2022-ceg-le-nokoue | 2021-2022, S2 |
| SVT 2nde D, 1er devoir du 2e semestre, CEG Zongo (Scribd) | https://www.scribd.com/document/612253656/1ER-DEVOIR-DU-2EME-SEMESTRE-SVT-2NDE-D-2021-2022-CEG-ZONGO | 2021-2022, S2 |
| 1er devoir du 2e semestre SVT 2nde AB, CEG Dantokpa | https://epreuvesetcorriges.com/categories/benin/examens/bac/2796-1er-devoir-du-2eme-semestre-svt-2nde-ab-2019-2020-ceg-dantokpa | 2019-2020, S2 (série littéraire) |
| 2e devoir du 1er semestre SVT 2nde A, CEG Perma | https://www.scribd.com/document/674780191/2EME-DEVOIR-DU-1ER-SEMESTRE-SVT-2NDE-A-2021-2022-CEG-PERMA | 2021-2022, S1 (série littéraire) |
| SVT 2nde A-B, 2e devoir du 1er semestre, CEG Le Nokoué | https://www.scribd.com/document/775794171/SVT-2NDE-A-B-DEUXIEME-DEVOIR-DU-PREMIER-SEMESTRE-2022-2023-CEG-LE-NOKOUE | 2022-2023, S1 (série littéraire) |
| 2e devoir du 1er trimestre SVT 2nde AB, CS La Prunelle de Dieu | https://epreuvesetcorriges.com/categories/benin/college/seconde/29151-2eme-devoir-du-1er-trimestre-svt-2nde-ab-2021-2022-cs-la-prunelle-de-dieu | 2021-2022, T1 |
| Banque d'épreuves officielle du Bénin (educmaster) | https://secondaire.educmaster.bj/banque-epreuves | à explorer |

Les moteurs signalent aussi, sans URL précise : CEG 1 Abomey-Calavi, 1er et 2e devoirs du 2e semestre SVT 2nde C/D 2025-2026 ; Collège Catholique Père Aupiais, composition du 2e trimestre SVT 2nde AB/CD, février 2026 ; CS Notre-Dame des Apôtres, 3e trimestre SVT 2nde AB, mars 2026. Ces documents sont tous béninois.

Attention : epreuvesetcorriges.com range parfois des documents béninois sous « togo ». Par exemple, « SVT 1ERE D 1ER DEVOIR DU 1ER SEMESTRE 2023-2024 CEG YAGBE » figure sous `togo/examens/bac`, alors que le CEG Yagbé est à Cotonou. Il faut vérifier le pays d'après l'établissement, pas d'après la rubrique.

**Sénégal** (série 2nde S, programme différent) : sunudaara.com « Devoir svt n°1 / n°2 - 2nd S » (https://www.sunudaara.com/svt/devoir-svt-n%C2%B01-2nd-s, https://www.sunudaara.com/svt/devoir-svt-n%C2%B02-2nd-s) ; composition 2nde S, IA Rufisque (https://svtdakar.e-monsite.com/medias/files/composition-2nde-s-ia-rufisque.pdf) ; « Devoir SVT seconde S, second semestre 2024/2025 » (https://mbackemaths.com/devoir-svt-seconde-s-ll-second-semestre-2024-2025/) ; Scribd « DEVOIR 1 2e semestre 2S2 2025 SVT » (https://www.scribd.com/document/848968174/DEVOIR-1-2e-semestre-2S2-2025-SVT) et « DEVOIR 1 2nd S » (https://www.scribd.com/document/835992103/DEVOIR-1-2nd-S). Fiabilité 2 à 3.

## Requêtes infructueuses (aucun document togolais de Seconde dans les résultats)

- « devoir SVT seconde Togo » (standard) : résultats français et un devoir de 3e togolais.
- « composition SVT 2nde Lomé premier semestre » (standard) : manuels français.
- « epreuvesetcorriges.com SVT seconde Togo devoir 1er semestre » (standard).
- « epreuvesetcorriges SVT 2nde C Togo composition 2e semestre » (standard).
- « SVT 2nde D devoir surveillé Togo lycée 2024-2025 » (standard).
- « ecole.gouv.tg compositions régionales SVT seconde » (standard).
- « Lycée de Tokoin OR Collège Saint Joseph OR Collège Protestant Lomé SVT seconde devoir épreuve » (étendu) : seulement des fiches d'établissements.
- « "Seconde" "SVT" Togo "devoir" "géologie" OR "le sol" OR "la cellule" » (étendu) : ressources françaises.
- « karandoogo.com SVT seconde Togo épreuve » (étendu) : BAC et BEPC seulement.
- « orniformation Togo anciennes épreuves lycées SVT seconde » (étendu) : BAC et BEPC seulement.
- « "Seconde S" Togo SVT "Lycée" devoir 2025 » (étendu) : toujours la même piste T1.
- « "2nde" SVT Togo Kara OR Sokodé OR Atakpamé OR Kpalimé OR Dapaong devoir composition » (étendu) : documents béninois seulement.
- « "composition" "SVT" "seconde" "DRE" Togo Plateaux / Centrale / Maritime / Lomé-Golfe » (étendu) : seulement des calendriers de compositions (journaleducatif.com, edusocialnews.com, 24heureinfo.com).
- GitHub (recherche de code et de dépôts : « SVT Seconde Togo », « Travail-Liberté-Patrie SVT », « 2nde S SVT Togo », « togo epreuves ») : les dépôts AIELepreuves/epreuvestogo, HordRic/Epreuves-Bac, awereoutagba-bot/APPLICATION-ETUDE-TOGO-EPREUVE et emmanuelgbandi79-png/examsoscar-tg ne contiennent aucune épreuve de SVT de Seconde. epreuvestogo référence « SVT Série D » et « SVT Série A » sans fournir les PDF ; HordRic ne contient que des annales de BAC.
- Google Drive de l'utilisateur : voir plus haut.

Remarque : en mode « standard », WebSearch renvoie presque uniquement des sources françaises. Le mode « extended » est indispensable pour les sources togolaises.

## Pistes hors ligne (à demander sur place)

1. **DRE** (Grand Lomé, Maritime, Plateaux, Centrale, Kara, Savanes) : sujets des compositions régionales de Seconde S des deux semestres, années 2022-2023 à 2025-2026. D'après les extraits de recherche, la DRE Grand Lomé a publié un chronogramme de compositions régionales pour le 1er semestre 2025-2026. Les sujets existent donc, sur papier, chez les chefs d'établissement.
2. **Inspections pédagogiques de SVT** et animateurs d'unités pédagogiques : devoirs harmonisés.
3. **Établissements** : collèges protestants et catholiques de Lomé (Collège Protestant de Lomé-Tokoin, Collège Saint-Joseph, Collège Chaminade…), lycées publics (Lycée de Tokoin, Lycée d'Agoè, Lycée de Kara, Lycée de Sokodé, Lycée d'Atakpamé, Lycée de Kpalimé, Lycée de Dapaong). Demander aux professeurs de SVT de 2nde leurs interrogations, devoirs surveillés et devoirs de maison des deux dernières années.
4. **L'élève lui-même et ses camarades** : photographier les sujets reçus en classe, avec en-tête lisible (établissement, classe, date).
5. **Groupes WhatsApp et Facebook d'élèves togolais de Seconde S**, et comptes TikTok (pistes T8 à T10) qui publient les sujets de compositions régionales.
6. **Librairies de Lomé** (Grand Marché, Bè, Tokoin) : recueils d'annales de Seconde vendus localement.

## Fichiers

- Créés : ce rapport, et le dossier `01_recherche/epreuves/SVT/a_traiter/` (avec un `.gitkeep`) où déposer les documents.
- Non créés : aucun `EP-SVT-*.json`, et pas de `corrections_litiges.md` puisqu'il n'y a aucune correction, donc aucun litige.
