# Rapport — Épreuves de Physique-Chimie (agent PC)

Date : 2026-10-03. Validateur : `node 02_base_donnees/valider.mjs PC` affiche « Aucune erreur. » (10 fichiers dans la colonne `concours`, 0 dans `epreuves`).

## 1. Bilan

**Aucune épreuve de Seconde (devoir, interrogation, composition, devoir harmonisé) n'a pu être récupérée.** Le quota togolais est atteint à 0/100. Il n'a pas été comblé : aucune épreuve n'a été inventée ni reconstituée à partir d'un extrait de moteur de recherche.

La raison est technique. Le proxy réseau de l'environnement bloque presque tous les sites (voir § 4). WebSearch fonctionne, mais il ne renvoie que des titres et des extraits, pas le texte des épreuves.

Le Google Drive de l'utilisateur était lisible (connecteur Drive, en lecture seule). J'y ai trouvé un recueil authentique togolais : **« Epreuves Concours lycée scientifique.pdf »**, avec les sujets du concours national d'entrée aux lycées scientifiques de Lomé et de Kara (2011 à 2021). Ses **10 sujets de sciences physiques** ont été transcrits et corrigés, avec `type: "concours_entree"`. Ce sont des sujets de **niveau fin de 3e** passés à l'entrée en Seconde S : ils servent de diagnostic et de révision des prérequis, et **ne comptent pas dans le quota de Seconde**.

| Semestre | Type | Trouvées (Togo, authentiques) | Visées | Manque |
|---|---|---|---|---|
| S1 | interrogation / devoir surveillé / devoir de maison | 0 | ≈ 30 | 30 |
| S1 | composition / devoir harmonisé (DRE, inspections) | 0 | ≈ 20 | 20 |
| S2 | interrogation / devoir surveillé / devoir de maison | 0 | ≈ 30 | 30 |
| S2 | composition / devoir harmonisé | 0 | ≈ 20 | 20 |
| **Total Seconde** | | **0** | **100** | **100** |
| Hors quota | concours d'entrée en Seconde S (niveau 3e) | **10** (9 complets, 1 partiel) | — | — |
| Hors quota | épreuves d'autres pays | 0 | — | — |

### Fichiers produits (`01_recherche/epreuves/PC/S1/`)

Rangés en S1 parce qu'ils servent de diagnostic de début d'année. Le champ `chapitres` donne les chapitres de Seconde (`PC.json`, reconstitué) dont chaque sujet couvre les prérequis.

| Id | Session | Points transcrits | Questions | Remarques |
|---|---|---|---|---|
| EP-PC-S1-0001 | Septembre 2021 | 20/20 | 35 | Schémas des Ex5-A et Ex5-C absents ; valeurs de R relues depuis l'OCR |
| EP-PC-S1-0002 | Octobre 2020 | **8/20** | 12 | **Incomplet** : la page 2 manque dans le recueil |
| EP-PC-S1-0003 | Septembre 2019 | 20/20 | 20 | Page 2 rattachée par déduction ; schémas de l'Ex4 absents |
| EP-PC-S1-0004 | 03/09/2018 | 20/20 | 23 | Données incohérentes à l'ExIII-A (signalées) |
| EP-PC-S1-0005 | Septembre 2017 | 20/20 | 20 | Fraction immergée de l'Ex4 absente (hypothèse de 2014) |
| EP-PC-S1-0006 | Septembre 2016 | 20/20 | 26 | Graphique v(t) absent |
| EP-PC-S1-0007 | Septembre 2014 | 20/20 | 20 | — |
| EP-PC-S1-0008 | Octobre 2013 | 20/20 | 24 | Équations de l'Ex2 brouillées par l'OCR |
| EP-PC-S1-0009 | Août 2012 | 20/20 | 23 | Puissances de 10 de l'Ex4 douteuses |
| EP-PC-S1-0010 | 22/09/2011 | 20/20 | 21 | Schémas de l'Ex1 (levage) et de l'Ex3 (transistor) absents |

Chaque question comporte un corrigé détaillé (formule littérale, puis application numérique, puis résultat avec son unité), un barème point par point, le résultat final, et le piège et l'astuce quand c'est utile.

**Double vérification** : chaque sujet a été résolu deux fois, la seconde fois par une méthode indépendante. Tous les résultats numériques ont été recalculés deux fois en Python, sans aucun écart. Les problèmes d'énoncé (données incohérentes, conventions implicites, lectures OCR, figures manquantes) sont décrits dans `epreuves/PC/corrections_litiges.md`.

**Limite de transcription** : le PDF fait 12 Mo, et le connecteur Drive refuse le téléchargement au-delà de 10 Mo. La transcription s'appuie donc sur le **texte OCR fourni par Google Drive**, pas sur l'image. Les schémas sont signalés entre crochets, et les lectures douteuses par « [OCR : …] ». Il serait utile de relire sur le scan les points listés dans `corrections_litiges.md`.

## 2. Sources

| Source | URL | Accès | Fiabilité (1-5) | Utilisation |
|---|---|---|---|---|
| Recueil « Epreuves Concours lycée scientifique.pdf » (Drive de l'utilisateur, ajouté le 2026-07-03) | https://drive.google.com/file/d/10Cnv2Bd3Zrq_OlSrSM_c0vKDBjENqHrN/view | Privé (connecteur Drive) | 3 : sujets officiels avec en-têtes explicites (session, durée, coefficient), mais recueil scanné d'origine inconnue, lu par OCR | 10 sujets de PC transcrits. Le recueil contient aussi ~10 sujets de **mathématiques** (2011-2021), à signaler à l'agent M. |
| Photos IMG_20260609_*.jpg (Drive de l'utilisateur) | (IDs 1--OWsRElVGwyFo9abLsu1M9alL4sqjUb, 1A7L38UeLEhAy11mxqJvjvACFwUAoy0LP, 1fYlfULC9GuSKQ7rk9bpEXUUIOCBW7ulZ) | Privé | 4 | **Non utilisé** : composition régionale de **mathématiques 3e**, DRE Grand Lomé, mai 2025 (hors PC) |

## 3. Pistes à télécharger manuellement

Ces documents ont été repérés par WebSearch, mais **leur texte n'a pas pu être consulté** (hôte bloqué). Il suffit de les télécharger et de déposer les PDF dans `01_recherche/epreuves/PC/a_traiter/` pour qu'ils soient transcrits et corrigés.

**Attention :** epreuvesetcorriges.com range souvent des épreuves **béninoises** dans sa catégorie « Togo ». C'est le cas d'Abomey-Calavi, Bohicon, Sékéré, Gando, Père Aupiais et Notre-Dame des Apôtres (Cotonou). Le Bénin utilise aussi « PCT », « 2nde C/D » et les semestres : vérifier la ville avant de compter une épreuve comme togolaise.

### Pistes togolaises (priorité)
| Titre (tel qu'affiché) | URL | Hôte | Établissement / année (d'après l'extrait) |
|---|---|---|---|
| Plateforme officielle : sujets et corrigés de la composition régionale 2024-2025 (d'après le résumé de recherche) | https://ecole.gouv.tg/college/course/index.php?categoryid=78 | ecole.gouv.tg | MEPSTA (officiel), fiabilité potentielle 5 |
| Seconde – Togo (catégorie complète) | https://epreuvesetcorriges.com/categories/togo/colleges/seconde | epreuvesetcorriges.com | Divers, à trier par ville |
| SVT composition régionale 1er semestre Seconde S 2025-2026, DRE Savanes | https://epreuvesetcorriges.com/categories/togo/colleges/seconde/41852-svt-composition-regionale-1er-semestre-seconde-s-annee-scolaire-2025-2026-dre-savanes-togo | epreuvesetcorriges.com | DRE Savanes 2025-2026. C'est la SVT, mais la PC de la même série est probablement à côté. |
| « Épreuves de composition du premier semestre de physique chimie seconde S au Togo » | https://www.tiktok.com/discover/%C3%A9preuves-de-composition-du-premier-semestre-de-physique-chimie-seconde-s-au-togo | tiktok.com | Vidéos d'enseignants (photos de sujets) |
| « Composition régional du deuxième semestre classe de seconde … physique du Togo » | https://www.tiktok.com/discover/composition-r%C3%A9gional-du-deuxi%C3%A8me-semestre-classe-de-seconde-de-cette-ann%C3%A9e-physique-du-togo | tiktok.com | Composition régionale, 2e semestre |
| « Épreuve de physique chimie classe de seconde CD 2e composition du deuxième semestre » | https://www.tiktok.com/discover/%C3%A9preuve-de-physique-chimie-classe-de-seconde-cd-2em-composition-du-deuxi%C3%A8me-semestre | tiktok.com | — |
| Lycée de Tokoin – documents d'étude | https://www.studocu.com/row/high-school/lycee-de-tokoin/443286 | studocu.com | Lycée de Tokoin, Lomé |
| Devoirs et compositions Seconde (2024-2025) | https://touteslesepreuves.com/1114-2nde-2024-2025 ; https://touteslesepreuves.com/45-seconde | touteslesepreuves.com | Divers |
| Sujet et corrigé PCT BEPC blanc, février 2026, DRE Maritime, IESG Tsévié (niveau 3e, prérequis) | https://epreuvesetcorriges.com/categories/togo/examens/bepc/41978-sujet-et-corrige-pct-bepc-blanc-fevrier-2026-dre-maritime-iesg-tsevie-sujet-d-entrainement | epreuvesetcorriges.com | DRE Maritime 2026 (hors quota) |
| Épreuve de sciences physiques BEPC 2025 Togo / BAC 2025 série D Togo (hors niveau) | https://epreuvesetcorriges.com/categories/togo/examens/bepc/39847-epreuve-de-sciences-physiques-bepc-2025-togo | epreuvesetcorriges.com | Officiel 2025 |
| CT PCT BEPC Togo 2024 (hors niveau) | https://www.scribd.com/document/763261666/CT-PCT-BEPC-TOGO-2024 | scribd.com | 2024 |
| Calendrier de la composition régionale du 1er semestre 2025-2026, DRE Grand Lomé (PC Seconde C-D le 19/01/2026, 14 h 30-17 h 30) | https://edusocialnews.com/articles/dre-gl-composition-regionale-et-chronogramme-organisationnel-premier-semestre-2025-2026 | edusocialnews.com | Confirme l'existence et la date du sujet régional à demander |

### Pistes non togolaises (hors quota, utiles si téléchargées)
| Titre | URL | Pays réel |
|---|---|---|
| PCT Seconde C-D, 1er devoir du 1er semestre 2025-2026, CEG 1 Abomey-Calavi | https://www.epreuvesetcorriges.com/categories/togo/40560-pct-seconde-c-d-1er-devoir-du-1er-semestre-2025-2026-chimie-des-solutions-et-lois-physiques-ceg-1-abomey-calavi | Bénin (classée « Togo » par le site) |
| Épreuve 1er devoir du 1er semestre PCT 2nde CD, novembre 2024 | https://epreuvesetcorriges.com/categories/benin/college/seconde/36637-epreuve-1er-devoir-du-1er-semestre-pct-2nde-cd-novembre-2024-annee-scolaire-2024-2025-ceg | Bénin |
| 1er devoir du 1er semestre PCT 2nde D 2022-2023, CEG Bohicon | https://epreuvesetcorriges.com/categories/benin/college/seconde/31157-1er-devoir-du-1er-semestre-pct-2nde-d-2022-2023-ceg-bohicon | Bénin |
| 1er devoir du 2e semestre PCT 2nde D 2023-2024, Collège de Sékéré | https://touteslesepreuves.com/seconde/22545-epreuve-du-1er-devoir-du-2eme-semestre-pct-2nde-d-2023-2024-college-de-sekere.html | Bénin |
| Banque d'épreuves officielle du Bénin | https://secondaire.educmaster.bj/banque-epreuves | Bénin |

## 4. Accès réseau (pour l'utilisateur)

- **Bloqués** (403 ou absence de réponse, pour curl comme pour WebFetch) : epreuvesetcorriges.com, touteslesepreuves.com, scribd.com, studocu.com, tiktok.com, ecole.gouv.tg, univ-lome.tg, republiquetogolaise.com, fomesoutra.com, banquedesepreuves.com, educmaster.bj, journaleducatif.com, edusocialnews.com, fasoeducation.bf, dpfc-ci.net, wikipedia, archive.org / web.archive.org, sites.google.com, drive.google.com et docs.google.com (en HTTP direct), github.io, blogspot / wordpress / e-monsite, facebook, t.me, youtube, calameo, issuu, yumpu, slideshare, dropbox, mediafire, huggingface, kaggle.
- **Accessibles** : github.com (clone git uniquement ; la recherche par API est refusée), raw.githubusercontent.com, gitlab.com, bitbucket.org, gestionnaires de paquets, et le **Google Drive via le connecteur** (lecture de fichiers publics par ID possible, mais pas de recherche dans les fichiers publics).
- Pour débloquer : élargir l'accès réseau de l'environnement (menu de l'environnement cloud, puis *Edit*, puis *Network access* : niveau plus large, ou *Custom* en ajoutant au minimum `epreuvesetcorriges.com`, `www.epreuvesetcorriges.com`, `touteslesepreuves.com`, `ecole.gouv.tg`, `www.scribd.com`, `www.studocu.com`). Documentation : https://code.claude.com/docs/en/cloud-environments#network-access

## 5. Requêtes effectuées

**Productives** (pistes uniquement) :
- « composition PCT seconde Togo 1er semestre » : catégorie Togo/Seconde d'epreuvesetcorriges, TikTok.
- « composition régionale 1er semestre PCT seconde S DRE Togo 2025-2026 » : calendrier DRE-GL, SVT DRE Savanes.
- « composition 2ème semestre physique chimie seconde S Togo 2024-2025 DRE » : ecole.gouv.tg.
- « Togo "seconde S" PCT épreuve "mouvement" "solution" "mole" composition pdf télécharger » : BEPC blanc DRE Maritime.
- « épreuve physique chimie seconde Togo "Lycée de Tokoin" OR … » : studocu Lycée de Tokoin.
- Recherche dans le Drive de l'utilisateur (`fullText` / `title` : physique, PCT, seconde, devoir, composition, épreuve, chimie, concours) : **recueil des concours** (utilisé).

**Infructueuses** (aucun document togolais de Seconde lisible) :
- « devoir sciences physiques seconde C Togo lycée »
- « "2nde C" "sciences physiques" devoir Lomé pdf »
- « PCT seconde S Togo devoir surveillé 2024-2025 » (pistes béninoises seulement)
- « "Togo" "PCT" "2nde" devoir "1er semestre" lycée Lomé épreuve » (béninoises)
- « "2nde S" PCT Togo devoir 2025-2026 » et « PCT 2nde S devoir 3e trimestre "Notre-Dame des Apôtres" 2026 » (Cotonou)
- « Togo "Seconde S" physique chimie composition 2e semestre DRE »
- « "seconde S" Togo "sciences physiques" épreuve "durée" "Exercice 1" mouvement »
- « Togo devoir harmonisé seconde S physique chimie inspection »
- « PCT "seconde S" Togo épreuve lycée Kara OR Sokodé OR Atakpamé OR Kpalimé OR Dapaong » (annonces du concours seulement)
- « "Collège Protestant" OR "Collège Saint Joseph" OR "Chaminade" Togo seconde PCT devoir épreuve »
- « "lycée scientifique" Lomé OR Kara seconde devoir physique chimie épreuve »
- « scribd devoir PCT seconde Togo » (BEPC uniquement)
- « studocu Togo seconde physique chimie devoir lycée » (France)
- « touteslesepreuves seconde PCT Togo lycée composition » et « epreuvesetcorriges togo seconde PCT seconde S semestre »
- Restreintes à drive.google.com / docs.google.com / sites.google.com : « site:drive.google.com seconde PCT Togo », « PCT seconde Togo devoir », « sciences physiques seconde composition semestre lycée », « "SECONDE S" PCT composition semestre », « DRE Golfe Lomé épreuve PC seconde composition », « Togo épreuves 2nde physique chimie », « "drive.google.com" Togo épreuves lycée seconde sciences physiques télécharger »
- Restreintes à github.com / gitlab.com / huggingface.co : « Togo devoir physique chimie seconde pdf », « Togo épreuves seconde physique chimie dataset pdf » (dépôts clonés : Infotech42/Ecolenet-togo, jp-assale/Le-professeur, kolantech/mon-super-projet ; aucun ne contient d'épreuve réelle, seulement du contenu généré)

## 6. Pistes hors ligne

- **DRE** (Grand Lomé, Maritime, Plateaux, Centrale, Kara, Savanes) : demander les sujets des compositions régionales des 1er et 2e semestres de Seconde S (le sujet DRE-GL du 19/01/2026 existe).
- **Inspections pédagogiques de PC** et **conseillers pédagogiques** : banques de devoirs harmonisés.
- **Établissements** : Lycée scientifique de Lomé (dans l'enceinte du Lycée de Tokoin) et de Kara, Lycée de Tokoin, Collège Saint-Joseph, Collège protestant, Collège Chaminade (Kara), lycées de Sokodé, Atakpamé, Kpalimé et Dapaong. Demander les devoirs et compositions des années passées. La plupart des élèves en ont des photos.
- **Groupes WhatsApp et Telegram** d'enseignants et d'élèves de Seconde S : principale voie de circulation des sujets photographiés. Les photos peuvent être déposées dans le Drive ou dans `a_traiter/` : le connecteur Drive en extrait le texte, comme pour le recueil utilisé ici.
- **Annales imprimées** vendues à Lomé (librairies du Grand Marché, Bon Pasteur) : « Annales PC Seconde S Togo ».

## 7. Ce qui reste à faire
1. Débloquer le réseau ou déposer des PDF et photos dans `01_recherche/epreuves/PC/a_traiter/`. La transcription et la correction suivront le même protocole.
2. Relire sur le scan original les points signalés « [OCR : …] » et les schémas manquants (`corrections_litiges.md`).
3. Signaler à l'agent M les ~10 sujets de mathématiques du même recueil.
