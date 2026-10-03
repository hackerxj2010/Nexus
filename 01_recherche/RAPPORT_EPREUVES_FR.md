# Rapport — Épreuves de FRANÇAIS, Seconde S (Togo)

Agent : Épreuves FR · Date : 2026-10-03 · Contrat : `02_base_donnees/SCHEMA.md` §3

## 1. En bref

**Aucune épreuve authentique de français n'a été transcrite dans cette session : 0 sur 40 visées.**

- Ce n'est pas faute de pistes. Le proxy réseau de l'environnement bloque presque tous les sites où se trouvent ces épreuves : scribd, studocu, epreuvesetcorriges, touteslesepreuves, wordpress.com, edunews.tg, kiosque.auredo, examens-concours, archive.org, wikipedia, google… WebFetch et curl renvoient `EGRESS_BLOCKED` ou `403`. Seuls GitHub et le Google Drive de l'utilisateur étaient lisibles.
- La recherche web ne renvoie que des titres et de courts extraits. Comme la règle l'impose, **aucune épreuve n'a été reconstituée à partir d'un extrait** : il faut le texte intégral pour la transcrire fidèlement et compter les mots du texte support.
- Le quota n'est donc **pas atteint**, et il n'a pas été comblé par des épreuves inventées.
- Livrables : ce rapport, la liste des pistes à télécharger à la main (§4) et le dossier de dépôt `01_recherche/epreuves/FR/a_traiter/`.
- Le budget de recherche web de la session (200 appels, partagé entre les agents) a été épuisé pendant la collecte.

## 2. Épreuves trouvées et visées

### Par semestre et par type d'épreuve

La répartition « visée » est indicative : 20 épreuves par semestre, réparties entre les types.

| Semestre | Type | Trouvées (Togo, authentiques) | Visées |
|---|---|---|---|
| S1 | Devoir surveillé | 0 | 8 |
| S1 | Composition semestrielle (y compris compositions régionales DRE) | 0 | 6 |
| S1 | Devoir harmonisé | 0 | 6 |
| **S1** | **Total** | **0** | **20** |
| S2 | Devoir surveillé | 0 | 8 |
| S2 | Composition semestrielle (y compris compositions régionales DRE) | 0 | 6 |
| S2 | Devoir harmonisé | 0 | 6 |
| **S2** | **Total** | **0** | **20** |
| — | Concours d'entrée en Seconde S (`concours_entree`, compté à part) | 0 | — |
| — | Hors Togo, niveau Seconde (hors quota) | 0 | — |

### Par type d'exercice

| Exercice | Trouvés |
|---|---|
| Résumé + discussion (contraction de texte) | 0 |
| Commentaire / étude de texte | 0 |
| Dissertation | 0 |
| Questions de grammaire et de vocabulaire | 0 |

## 3. Sources consultées réellement (accès effectif)

| Source | Accès | Contenu utile pour le français en Seconde ? | Fiabilité (1-5) |
|---|---|---|---|
| GitHub `HordRic/Epreuves-Bac` et `HordRic/Mon-Bac-2` (clonés) — https://github.com/HordRic/Epreuves-Bac | **Lu** | Non. Contient le BAC II Togo 2001-2014 (série scientifique), « BACI - BACII 2015-2020 SUJETS + CORRECTIONS », et `FRANÇAIS.pdf` : « PREPA BAC A4 C D E ET G », 29/10/2021, 55 pages, sujets de dissertation corrigés et épreuves de **Terminale**. Ce n'est pas du niveau Seconde, donc rien n'a été retenu. Utile plus tard comme exemples de dissertations à la togolaise. | 3 |
| GitHub `AIELepreuves/epreuvestogo` — https://github.com/AIELepreuves/epreuvestogo | **Lu** (y compris l'historique git) | Non. `js/data.json` annonce « FR Série A », « FR. série CD » et « Régional Blanc Littoral », mais ces PDF n'ont **jamais été déposés** dans le dépôt. Les 14 fichiers de l'historique sont tous des maths, de la PC ou de la SVT, ou un concours d'enseignants. | 2 |
| GitHub : `etienneamah499-sketch/edutrack-togo`, `elias-code-1/educTOGO`, `awereoutagba-bot/APPLICATION-ETUDE-TOGO-EPREUVE`, `emmanuelgbandi79-png/examsoscar-tg`, `Monapp-doc/MesDocs` | **Lu** | Non. Ce sont des applications sans épreuves embarquées. | — |
| Google Drive de l'utilisateur (lecture seule) : « Epreuves Concours lycée scientifique.pdf » (id `10Cnv2Bd3Zrq_OlSrSM_c0vKDBjENqHrN`) | **Lu** (65 489 caractères) | Non. Concours d'entrée aux lycées scientifiques de Lomé et Kara (2011 à 2021) : **mathématiques et sciences physiques seulement**, aucune épreuve de français. Les autres fichiers du Drive n'ont rien à voir (projets logiciels, cours d'aviation). | 4 (pour les maths et la PC) |

## 4. Pistes à télécharger à la main

L'utilisateur peut ouvrir ces liens dans son navigateur, télécharger les PDF et les déposer dans **`01_recherche/epreuves/FR/a_traiter/`** (voir la procédure au §7).

- Les titres et les URL sont **exactement** ceux renvoyés par la recherche web.
- Le pays est « présumé » d'après le titre ou l'extrait : il est à confirmer à l'ouverture.
- Priorité : A = probablement Togo, Seconde, français ; B = à vérifier ; C = hors Togo ou hors niveau (utile seulement pour s'entraîner).

| Prio | Titre exact (résultat de recherche) | URL | Hôte | Établissement / année (si indiqués) | Pays présumé |
|---|---|---|---|---|---|
| A | Seconde - Togo (catalogue) | https://epreuvesetcorriges.com/categories/togo/colleges/seconde | epreuvesetcorriges.com | Catalogue : y chercher « FRANCAIS » + « 2NDE » / « SECONDE S » + « SEMESTRE » + « DRE » | Togo, mais le site classe mal certains pays (voir les lignes C) |
| A | SVT composition régionale 1er semestre seconde S, année scolaire 2025-2026, DRE Savanes Togo | https://epreuvesetcorriges.com/categories/togo/colleges/seconde/41852-svt-composition-regionale-1er-semestre-seconde-s-annee-scolaire-2025-2026-dre-savanes-togo | epreuvesetcorriges.com | DRE Savanes, 2025-2026 (épreuve de SVT) | Togo. Prouve que les compositions régionales de Seconde S sont publiées : chercher la **même série en français** |
| A | Français 2nde Littéraires : Programme Actualisé et Évaluations 2024 - Studocu | https://www.studocu.com/row/document/universite-de-kara/bases-et-principes-de-lhorticulture/francais-2nde-litteraires-programme-actualise-et-evaluations-2024/139104983 | studocu.com | Étiqueté « Université de Kara », 2024 | Togo. Programme et **format d'évaluation officiel** (voir §6) ; peut contenir des sujets types |
| A | Lycée de Tokoin - Lomé Study Materials - Studocu | https://www.studocu.com/row/high-school/lycee-de-tokoin/443286 | studocu.com | Lycée de Tokoin, Lomé (59 documents annoncés) | Togo |
| A | DEVOIR DE FRANÇAIS 2nde / « Devoir de Français Seconde 2024-2025 » | https://www.scribd.com/document/807565623/Devoir-Du-Premier-Sem-FR-Seconde-L | scribd.com | « Premier semestre », Seconde L, 2024-2025 | B : Togo ou Sénégal (les deux comptent en semestres) |
| A | Devoir de Français Seconde - Semestre 2 | https://www.scribd.com/document/788387152/DEVOIR-DE-2ND-L-S | scribd.com | « 2nd L-S », semestre 2 | B : Togo ou Sénégal |
| A | Corrigé Devoir harmonisé n°2 du 2nd semestre _ 2nd S 2024 - 2025 | https://fr.scribd.com/document/886637169/Corrige-Devoir-harmonise-n-2-du-2nd-semestre-2nd-S-2024-2025 | fr.scribd.com | Devoir harmonisé n°2, 2e semestre, 2nde S, 2024-2025 (matière inconnue) | B : vocabulaire togolais (« devoir harmonisé », « 2nd S »), mais aussi possible au Sénégal |
| A | 6EME/FRANÇAIS : ÉPREUVE DE FRANÇAIS (site DRE-Kara) | https://coursdrek.wordpress.com/2020/04/29/6eme-francais-epreuve-de-francais/ | coursdrek.wordpress.com | DRE-Kara, 2020 | Togo. Le site héberge aussi des compositions régionales DRE-Kara : **parcourir la catégorie Secondaire II** pour trouver le français de Seconde |
| A | Catégorie : 1ère D - DRE-KARA - WordPress.com | https://coursdrek.wordpress.com/category/secondaire-ii/classes-scientifiques/1ere-d/ | coursdrek.wordpress.com | DRE-Kara | Togo (point d'entrée de la catégorie « classes scientifiques ») |
| B | Devoirs et Compositions Seconde PDF : Corrigés Semestres & Trimestres | https://touteslesepreuves.com/45-seconde | touteslesepreuves.com | Mentionne « 2e Devoir Surveillé du 2nd Semestre » de français en Seconde | Mélange de pays |
| B | DEVOIR Français 2nde Important PDF | https://www.scribd.com/document/645234286/DEVOIR-Francais-2nde-Important-pdf | scribd.com | — | Inconnu |
| B | yuiop | https://www.scribd.com/document/819404186/yuiop | scribd.com | Sorti sur la requête « devoir français seconde Togo » | Inconnu |
| B | Épreuve De Français Composition Régionale Du Deuxième Semestre Dre Kara Série D | https://www.tiktok.com/discover/%C3%A9preuve-de-fran%C3%A7ais-composition-r%C3%A9gionale-du-deuxi%C3%A8me-semestre-dre-kara-s%C3%A9rie-d | tiktok.com | DRE-Kara, composition régionale du 2e semestre, série D | Togo. Page « discover » (vidéos ou photos) ; classe exacte à vérifier |
| B | DRE-GL/Composition Régionale et chronogramme organisationnel : Premier Semestre 2025–2026 | https://edusocialnews.com/articles/dre-gl-composition-regionale-et-chronogramme-organisationnel-premier-semestre-2025-2026 | edusocialnews.com | DRE Golfe-Lomé : compositions régionales de Seconde, Première et Terminale du 12 au 19 janvier 2026 | Togo. Calendrier seulement, pas de sujet. Dit **quand** réclamer les sujets |
| C | DEVOIR DE FRANÇAIS 2nde 2eme T 2023 | https://www.scribd.com/document/642849091/DEVOIR-DE-FRANCAIS-2nde-2eme-T-2023-docx | scribd.com | 2e trimestre 2023 | Pas Togo (le Togo compte en semestres) |
| C | Devoir de Français 2nde | https://www.scribd.com/document/707535443/Devoir-de-francais-2nde | scribd.com | D'après l'extrait : Lycée mixte de Diagane Barka, 2022/2023 (versification, Éluard) | Sénégal |
| C | Epreuve devoir surveillé du 1er trimestre francais 2nde 2024-2025 | https://fr.scribd.com/document/805636381/Epreuve-devoir-surveille-du-1er-trimestre-francais-2nde-2024-2025 | fr.scribd.com | Extrait de *La Secrétaire particulière* (Jean Pliya), compréhension et discussion | Bénin (même sujet aussi sur epreuvesetcorriges, rubrique Bénin) |
| C | Devoir Du 2ème Trimestre Français 2nde Abd 2021-2022 CP D'enseignement General Agbozo Megbedji | https://www.scribd.com/document/661281192/DEVOIR-DU-2EME-TRIMESTRE-FRANCAIS-2NDE-ABD-2021-2022-CP-D-ENSEIGNEMENT-GENERAL-AGBOZO-MEGBEDJI | scribd.com | CP Agbozo Megbedji, 2021-2022 | Bénin |
| C | COMPOSITION DU 2ÈME TRIMESTRE FRANCAIS 1ÈRE G2 COLLEGE CATHOLIQUE PERE AUPIAIS FÉVRIER 2025 | https://epreuvesetcorriges.com/categories/togo/primaire/cm2/38579-composition-du-2eme-trimestre-francais-1ere-g2-college-catholique-pere-aupiais-fevrier-2025 | epreuvesetcorriges.com | Collège Père Aupiais, février 2025, classe de 1re | Bénin (Cotonou), **mal classé sous Togo** ; ce n'est pas la Seconde |
| C | Epreuve de Français,2è Devoir du 2è Semestre,Classe 2nd toutes séries, 2003-2004 | https://kiosque.auredo.com/detailouvrage.php?d=348 | kiosque.auredo.com | 2003-2004 | Bénin, **payant** (100 à 200 FCFA) |
| C | Épreuve de Français,Collège la Plenitude, 2nd cycle,Seconde A,B,C et D,2005-2006 | https://kiosque.auredo.com/detailouvrage.php?d=221 | kiosque.auredo.com | Collège la Plénitude, 2005-2006 | Bénin, payant |
| C | Fascicule-Français-Seconde.pdf | https://sujetexa.com/wp-content/uploads/2021/09/Fascicule-Fran%C3%A7ais-Seconde.pdf | sujetexa.com | — | Probablement Cameroun |
| C (niveau Terminale) | Développement durable et littérature (Epreuve d1s Tles CD) | https://www.scribd.com/document/830550070/Epreuve-d1s-Tles-CD-Bn-Mme-Siliadin | scribd.com | Lycée de Tokoin 1, Terminale CD | Togo, mais en Terminale |
| C (niveau Terminale) | CORRECTION DES SUJETS DE TERMINALE I- CONTRACTION DE TEXTE 1- Résumé (08pts) | https://www.examens-concours.net/sujets-examens-blancs/Togo-BAC-Blanc-Francais-TleA4-Corrige.pdf | examens-concours.net | BAC blanc Terminale A4 | Togo. Utile pour voir le **barème togolais** du résumé et de la discussion |
| C (niveau Terminale) | TOGO/ BAC II 2022: Voici les sujets de Français, anglais, HG et leurs corrigés types | https://edunews.tg/info/2022/07/06/togo-bac-ii-2022-voici-les-sujets-de-francais-anglais-hg-et-leurs-corriges-types/ | edunews.tg | BAC II 2022 | Togo, en Terminale |
| C (niveau Terminale) | EPREUVE BAC FRANCAIS SERIES A C D E 2019, TOGO | https://epreuvesetcorriges.com/categories/cameroun/colleges/4eme/1639-epreuve-bac-francais-series-a-c-d-e-2019-togo | epreuvesetcorriges.com | BAC 2019 | Togo, en Terminale |

**Hôtes à autoriser pour qu'un agent puisse tout faire seul** : `scribd.com`, `fr.scribd.com`, `www.studocu.com`, `epreuvesetcorriges.com`, `touteslesepreuves.com`, `coursdrek.wordpress.com` (et `coursdrek.files.wordpress.com`), `edusocialnews.com`, `edunews.tg`, `www.examens-concours.net`, `kiosque.auredo.com`.

Cela se règle dans les paramètres de l'environnement cloud : menu de l'environnement dans la barre de titre de la session, puis **Edit**, **Network access**, puis **Custom** avec ces domaines dans *Allowed domains* (en gardant la liste par défaut des gestionnaires de paquets). Documentation : https://code.claude.com/docs/en/cloud-environments#network-access

## 5. Requêtes infructueuses

Ces requêtes n'ont rendu aucune épreuve de français de Seconde togolaise exploitable, ou seulement des pages génériques ou étrangères :

- `devoir de français seconde Togo résumé discussion`
- `composition français 2nde Lomé premier semestre sujet`
- `épreuve de français classe de seconde Togo devoir harmonisé`
- `"Lycée" Togo "classe de 2nde" français "résumé" "discussion" "nombre de mots" devoir`
- `composition du premier semestre français seconde Togo DRE`
- `composition deuxième semestre français seconde Togo 2024` (résultats TikTok « discover » ou hors Togo)
- `"composition régionale" français seconde Togo DRE` (seulement de la SVT pour la DRE Savanes, et des calendriers)
- `épreuve français "seconde S" Togo Kara Sokodé Atakpamé devoir`
- `Lycée Tokoin seconde devoir français épreuve` (seulement Terminale et Studocu)
- `Collège Saint Joseph Lomé seconde devoir de français`
- `"Collège Protestant" Lomé épreuve français seconde devoir`
- `Collège Chaminade Kara devoir français seconde`
- `"Lycée" Kpalimé OR Dapaong OR Sokodé "français" "2nde" devoir semestre pdf`
- `Lycée Agoè OR Adidogomé OR "Bè-Kpota" OR Agbalépédo seconde français devoir`
- `"DRE-Plateaux" OR "DRE Plateaux" OR "DRE Maritime" OR "DRE Centrale" français seconde composition épreuve`
- `"2nde S" Togo français devoir surveillé semestre résumé discussion pdf`
- `devoir harmonisé français Togo seconde S résumé discussion inspection`
- `examens-concours.net Togo seconde français devoir`
- GitHub (recherche de code) : `"devoir harmonisé" français seconde`, `"République Togolaise" "Travail-Liberté-Patrie" "Seconde"`, `"au quart de son volume" discussion`, `"Résumez ce texte" "Discussion" seconde`, `"Seconde" "Togo" "Composition du premier semestre"`. Aucun résultat pertinent.
- Google Drive (utilisateur) : titres contenant seconde, 2nde, français, épreuve, devoir, composition, concours, Togo ; texte intégral contenant dissertation, « nombre de mots », Résumez ; PDF contenant lycée, seconde, devoir ou texte. Seul le concours des lycées scientifiques est ressorti (maths et PC uniquement).

Requêtes non lancées faute de budget de recherche, à faire dès que le réseau le permet :

- `Togo "seconde" français devoir "2025-2026"`
- `concours d'entrée lycée Togo seconde épreuve de français`
- `"seconde" "Togo" français "étude de texte" OR "commentaire" OR "dissertation"`
- noms d'établissements : Lycée de Tokoin, Lycée d'Adidogomé, Collège Saint-Joseph, Collège Protestant de Lomé, Collège Chaminade de Kara, Lycée de Kara, Lycée de Sokodé, Lycée d'Atakpamé, Lycée de Kpalimé, Lycée de Dapaong, combinés avec « 2nde S français devoir semestre »

## 6. Format de l'épreuve de français (indications, à confirmer)

Ces indications viennent d'**extraits de recherche**, pas d'un document lu en entier. Elles servent à préparer les corrigés et le programme `FR.json`. Ce ne sont pas des épreuves.

- Contraction de texte (résumé + discussion) en Seconde au Togo, d'après l'extrait du document Studocu « Français 2nde Littéraires : Programme Actualisé et Évaluations 2024 » :
  - le texte support compte environ **500 mots en 2nde L** et **400 mots en 2nde S** ;
  - une marge de **± 10 %** s'applique : l'extrait donne « 450 ou 550 au lieu de 500 » en 2nde L et « 360 ou 440 » en 2nde S ;
  - il faut réduire le texte **au quart** de son volume, soit un résumé d'environ **100 mots (90 à 110)** en 2nde S ;
  - le résumé porte sur un texte argumentatif et compte pour **6 points** ; la discussion, présentée comme une « situation complexe », compte aussi pour **6 points**.
- Les épreuves écrites de français du second cycle (devoirs, compositions, BAC) dureraient **4 heures** pour toutes les séries, d'après un extrait cité par la recherche.
- Au BAC blanc de Terminale A4 au Togo, le résumé compte 8 points (titre du corrigé sur examens-concours.net).

Note sur les tolérances : l'extrait ne dit pas clairement si la marge de ± 10 % porte sur la longueur du **texte support** (360 à 440 mots) ou sur celle du résumé. La lecture la plus probable : le texte fait de 360 à 440 mots, et le résumé attendu est le quart du texte réel, à ± 10 %, soit environ 90 à 110 mots pour un texte de 400 mots. À vérifier sur le document original.

## 7. Procédure de traitement des PDF déposés à la main

1. Déposer chaque fichier dans `01_recherche/epreuves/FR/a_traiter/` sous un nom de la forme `<etablissement>_<ville>_<annee>_<S1|S2>_<type>.pdf`. Joindre l'URL d'origine dans un fichier `.txt` du même nom, sinon `authentique` ne pourra pas valoir `true`.
2. Extraire le texte avec `pdftotext`, ou avec `tesseract -l fra` pour un scan. Ces deux outils sont installés et testés dans cet environnement.
3. Transcrire fidèlement l'énoncé dans `enonce_md`, en écrivant `[illisible]` là où le texte ne se lit pas. Écrire « F CFA », jamais le signe dollar.
4. Rédiger le corrigé :
   - résumé : idées essentielles, résumé modèle, mots comptés par script Python ;
   - discussion : problématique, plan, introduction et conclusion rédigées ;
   - questions de langue : réponses exactes ;
   - barème point par point, en indiquant « barème proposé, non officiel » s'il n'est pas donné.
5. Faire une seconde relecture indépendante, consignée dans `verification`, et noter les litiges dans `01_recherche/epreuves/FR/corrections_litiges.md`. Ce fichier n'a pas été créé : il n'y a encore aucun corrigé.
6. Écrire `S<sem>/EP-FR-S<sem>-<nnnn>.json` avec `json.dump(..., ensure_ascii=False, indent=1)`, puis lancer `node 02_base_donnees/valider.mjs FR`.

## 8. Pistes hors ligne (les plus sûres pour une épreuve authentique)

- **Ses propres professeurs de français** : demander les sujets des devoirs et compositions des années précédentes (S1 et S2), en photo ou en photocopie, avec l'en-tête (établissement, année, classe, durée, barème).
- **Élèves de Première et de Terminale du même lycée** : leurs anciens cahiers et copies de Seconde contiennent souvent les sujets et les corrections du professeur.
- **Compositions régionales des DRE** (Golfe-Lomé, Maritime, Plateaux, Centrale, Kara, Savanes) et **devoirs harmonisés des inspections (IESG)** : ces sujets circulent en photocopies après chaque session. Pour la DRE Golfe-Lomé, la composition régionale du 1er semestre 2025-2026 avait lieu du 12 au 19 janvier 2026 d'après edusocialnews.
- **Recueils d'annales et fascicules** vendus dans les librairies et autour des lycées de Lomé et de Kara : vérifier qu'ils indiquent l'établissement et l'année.
- **Groupes WhatsApp ou Telegram de classe ou de répétiteurs**, où circulent des scans de sujets : n'en garder que ceux dont l'en-tête est lisible.
- Les photos ou scans obtenus vont dans `a_traiter/`. La source devient alors « document papier fourni par l'élève », avec `fiabilite` 4 ou 5 si l'en-tête est complet. Sans URL publique, `authentique: true` exige une décision de l'équipe sur la traçabilité : le schéma demande actuellement une URL.

## 9. Sortie du validateur

```
$ node 02_base_donnees/valider.mjs FR
FR : chapitres 1 · notions 4 · exercices 7 · flash 20 · images 4 · epreuves '{}' · concours 0 · epreuvesNonTogo 0
Aucune erreur.
```
Le chapitre, les notions et les exercices comptés viennent d'un autre agent. Les épreuves FR sont à 0.
