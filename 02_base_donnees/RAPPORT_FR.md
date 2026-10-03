# Rapport — Français, Seconde S (Togo)

Agent « Contenu FRANÇAIS ». Date : 3 octobre 2026.

## 1. Bilan chiffré

| Chapitre | Titre | Notions | Exercices | Auteur |
|---|---|---|---|---|
| FR-S1-C01 | Communication et énonciation | 4 | 7 | agent Français |
| FR-S1-C02 | Les figures de style | 5 | 8 | agent Français |
| FR-S1-C03 | Le texte argumentatif | 4 | 7 | agent Français |
| FR-S1-C04 | Le résumé de texte (contraction) | 5 | 7 | agent Français |
| FR-S1-C05 | La discussion | 5 | 7 | agent Français |
| FR-S1-C06 | Le récit et le roman | 5 | 7 | agent Français |
| FR-S1-C07 | Grammaire et vocabulaire au service de l'étude de texte | 5 | 8 | agent Français |
| FR-S2-C08 | La poésie | 4 | 7 | agent Français |
| FR-S2-C09 | Histoire littéraire : littérature africaine, Négritude et grands mouvements | 5 | 8 | agent Français |
| FR-S2-C10 | Le théâtre | 4 | 7 | agent Français |
| FR-S2-C11 | Le commentaire de texte | — | — | agent d'aide (sur décision du coordinateur) |
| FR-S2-C12 | La dissertation littéraire | — | — | agent d'aide |
| FR-S2-C13 | Œuvre intégrale et méthode de l'épreuve de français | — | — | agent d'aide |

Pour les chapitres C01 à C10 :
- **46 notions**, chacune avec un cours complet (`cours_md` de 2 000 à 4 500 caractères, encadrés `:::definition`, `:::propriete`, `:::methode`, `:::remarque`, `:::attention`), les 3 niveaux d'explication, des exemples résolus, les erreurs fréquentes, des astuces, un moyen mnémotechnique, un rappel « Tu te souviens de la 3e ? », une méthode de rédaction pour la copie et **5 fiches flash** (230 au total).
- **73 exercices** (difficulté 1 à 4 dans chaque chapitre ; QCM, réponses courtes, exercices ouverts), tous `exercice_type_inspire`, `authentique: false`. Chaque exercice ouvert a un corrigé sous forme de copie modèle découpée en étapes, avec un barème critère par critère (corrige et bareme ont la même longueur).
- **46 SVG originaux** (`05_medias/svg/FR-S1-C0x-Nx.svg`, `FR-S2-C0x-Nx.svg`) : cartes mentales, schémas de méthode, frises (Négritude, roman africain, mouvements littéraires), tableaux, schéma de la communication. Ils ont une `viewBox` de 400 de large, un fond `#fffdf8` arrondi, une police système sans-serif et un texte de 13 px minimum. Leur rendu à 360 px a été vérifié avec Chromium headless : un débordement détecté (un tableau du chapitre C05) a été corrigé, et la génération signale automatiquement les mots trop longs.
- `pieges_composition` : 5 ou 6 pièges par chapitre.
- `videos` : **liste vide partout**. Le proxy réseau bloque YouTube et les autres sites, donc aucun lien n'a pu être ouvert ni vérifié.
- Validateur : `node 02_base_donnees/valider.mjs FR` → **Aucune erreur** (10 chapitres, 46 notions, 73 exercices, 230 fiches, 46 images).

## 2. Programme officiel : sources et fiabilité

Fichier `01_recherche/programme/FR.json`. **Statut : `reconstitue`.** Aucun programme ni aucune progression officielle de français pour la seconde (MEPSTA, DPC, inspections) n'a pu être consulté. Presque tous les sites (republiquetogolaise.com, togofirst.com, koaci.com, yop.l-frii.com, edunews.tg, ecole.gouv.tg, studocu.com, globalvoices.org, leclik.tg, epreuvesetcorriges.com) sont **bloqués par le proxy de sortie**. Les informations ci-dessous viennent donc **uniquement des extraits de résultats du moteur de recherche** (WebSearch), sans lecture des pages.

| Élément | Valeur retenue | Source (extrait de recherche) | Fiabilité |
|---|---|---|---|
| Volume horaire en seconde scientifique | 4 h/semaine | Togo First / republiquetogolaise.com (réformes, sept. 2022) | 3/5 |
| Coefficient en seconde S | 2 | même source ; aussi un article YOP L-FRII (« 2nde CD : coefficient 2 ») | 3/5 |
| Approche pédagogique | APC (approche par compétences) en seconde depuis 2022-2023 | Edunews.tg, Koaci | 3/5 |
| Évaluation APC en français | 60 % situations complexes, 20 % questions objectives, 20 % exercices traditionnels | extrait mêlant Edunews.tg et un document Studocu (« Français 2nde Littéraires : programme actualisé et évaluations 2024 ») | 2/5 |
| Format de l'épreuve (BAC I 2024) | partie A obligatoire (8 pts, 7 questions) ; partie B (12 pts) : au choix contraction de texte (résumé, 2 mots à expliquer, discussion), dissertation, commentaire ; texte d'environ 700 mots | YOP L-FRII | 3/5 (concerne la classe de première, pris comme cible) |
| Découpage | calendrier officiel en **trimestres** (2026-2027 : T1 du 14 sept. au 23 déc. ; T2 du 4 janv. au 9 avril ; T3 du 19 avril au 16 juillet) ; **compositions régionales de lycée par semestre** (DRE Grand Lomé, « premier semestre 2025-2026 », français 7 h-11 h) | allAfrica / republicoftogo.com ; edusocialnews.com | 4/5 et 3/5 |

La **liste des 13 chapitres** est une **reconstitution** : formats d'épreuve ci-dessus et progression usuelle du second cycle francophone (méthodologie du résumé et de la discussion au 1er semestre, commentaire et dissertation au 2e, genres, histoire littéraire, outils de langue pour la partie A). Il faut la confronter à la progression harmonisée de la DPC ou de l'inspection.

**Contradiction non résolue.** Un extrait, de source incertaine (probablement le document Studocu sur la seconde *littéraire*), indique qu'en seconde la partie B proposerait « contraction de texte, dissertation littéraire, écriture d'invention », le commentaire composé étant supprimé. Le compte rendu du BAC I 2024 cite au contraire le commentaire. Nous avons gardé le commentaire (chapitre C11), et la méthode d'écriture d'invention ou de production APC est prévue dans le chapitre C13.

## 3. Œuvres au programme identifiées

Source unique : un article de **Global Voices** (fr), « Le Togo met enfin ses auteurs à l'honneur dans ses programmes scolaires » (26 juin 2023), lu **seulement dans un résumé du moteur de recherche**. Œuvres citées pour la **seconde** :
- *Le Trône royal*, Mgr Nicodème Barrigah-Benissan (théâtre ; Grand Prix de la littérature togolaise 2020 d'après la presse) ;
- *Le Cauchemar d'un immigré*, Ruben Atayi (témoignages d'immigrés clandestins, 2022 d'après Google Books) ;
- *Le chien qui parle*, Charles Olince (aucune autre information trouvée) ;
- *L'Arbre fétiche*, Jean Pliya (nouvelles, auteur béninois).

**Non vérifié** : on ne sait pas si cette liste vaut pour toutes les séries (A ou S), pour quelle année, ni si elle est toujours en vigueur. Elle figure dans `FR.json` (`oeuvres_signalees`) et dans la notion FR-S2-C09-N4, avec l'avertissement de demander la liste exacte au professeur. **Aucune étude d'œuvre intégrale n'a été rédigée** pour ces titres : nous n'avons pas les textes, et ils sont protégés par le droit d'auteur.

## 4. Choix de contenu

- **Textes support** : soit des textes **écrits pour la plateforme** (marqués « texte d'exemple » : lettre d'élève, textes argumentatifs sur l'exode rural, les sachets plastiques et les langues nationales, scène de théâtre « La dot », récit en car vers Atakpamé…), soit des extraits **du domaine public** (Hugo, Baudelaire, Verlaine, Lamartine, Du Bellay, Louise Labé, Villon, Corneille, Racine, Molière, Voltaire, Montesquieu, Péguy, Boileau). Pour les auteurs africains protégés, nous n'avons donné que des titres, des dates et de très courtes citations attribuées (« Femme nue, femme noire », « Afrique mon Afrique », la formule de la « tigritude » attribuée à Soyinka, une phrase de Senghor de 1939).
- **Résumés modèles vérifiés par script** (`compter_mots`, convention : l'homme = 2 mots, aujourd'hui = 1, mot à trait d'union = 1) :
  - FR-S1-C04-E06 : texte de 271 mots, résumé modèle de 66 mots (fourchette 61-74) ;
  - FR-S1-C04-E07 : texte de 415 mots, résumé modèle de 111 mots (fourchette 94-114).

  La notion C04-N4 précise que cette convention de décompte peut varier selon les professeurs.
- **Ancrage togolais** : exemples et analogies tirés de la vie au Togo (marché d'Adawlato, zémidjans, Kara, Aného, Atakpamé, Éperviers, veillées de contes), mais seulement quand ils aident vraiment à comprendre.
- **Barèmes** : les barèmes des exercices ouverts sont **proposés** et ne sont pas officiels.

## 5. Manques

1. Pas de programme officiel de français pour la seconde, ni de progression harmonisée (DPC, inspections) : le blocage réseau empêche toute vérification.
2. Aucune épreuve authentique togolaise de français n'a été collectée. Les compositions de seconde existent sur epreuvesetcorriges.com (vu dans les résultats de recherche), mais le site est inaccessible.
3. Pas de vidéos (aucun lien vérifiable).
4. Pas de fiches de lecture des œuvres au programme (titres incertains, textes non disponibles).
5. Le format exact de la « situation complexe » APC en français (consigne, contexte, tâche, grille) n'est pas documenté ; il revient au chapitre C13 (agent d'aide).
6. `02_base_donnees/base.json` (non modifié, hors périmètre) contient encore les anciens identifiants FR (`FR-S2-C02` « Le commentaire (initiation) ») qui ne correspondent plus au programme ; l'intégration dans le site reste à faire.

## 6. Doutes à faire vérifier par un enseignant togolais

- Coefficient (2) et horaire (4 h) du français en seconde S après la réforme de 2022.
- Présence du commentaire en seconde S, ou bien écriture d'invention ou production APC à la place.
- Liste des œuvres au programme et des séries concernées.
- Quelques repères d'histoire littéraire donnés de mémoire avec une confiance moyenne :
  - la pièce *On joue la comédie* de S. A. Zinsou, primée en 1972 ;
  - l'année d'entrée des auteurs togolais dans les programmes (vers 2018-2019 d'après la presse) ;
  - le concert-party comme forme de théâtre populaire togolaise.

  Les dates des grandes œuvres (Couchoro 1929, Ananou 1955, Camara Laye 1953, Oyono et Mongo Beti 1956, Kourouma 1968, Mariama Bâ 1979, Césaire 1939, Senghor 1945 et 1948) sont des repères classiques.
- Convention de décompte des mots du résumé utilisée en classe au Togo, notamment pour les mots composés.

## 7. Reproductibilité

Les scripts de génération ne sont pas dans le dépôt. Ils se trouvent dans le scratchpad de la session : `svglib.py` (génération des schémas), `commun.py` (`notion()`, `ex()`, `compter_mots()`), `build.py` (écriture des JSON et SVG, avec vérifications : nombre de notions, fiches flash, absence de dollar, longueurs corrige/barème, difficultés 1 à 4, fourchettes des résumés) et `c01.py` à `c10.py`.
