# Rapport — Physique-Chimie (Seconde S, Togo)

Date : 2026-10-03. Rédaction du semestre 1 (PC-S1-C01 à PC-S1-C08), du programme et de ce rapport : agent « Contenu PC ». Le semestre 2 (PC-S2-C09 à PC-S2-C16) est rédigé par un agent d'appoint, qui complète la section prévue en bas de ce fichier.

## 1. Programme (`01_recherche/programme/PC.json`)

**Statut : `reconstitue`.** Aucun document officiel togolais n'a pu être lu : ni le programme du MEPSTA/MEN, ni une progression harmonisée d'inspection. Le proxy réseau bloquait toutes les pages, y compris education.gouv.tg, ecole.gouv.tg, republiquetogolaise.com, epreuvesetcorriges.com, scribd, tiktok et wikipedia. Seuls les **extraits de résultats de recherche** (WebSearch) étaient lisibles.

Ce que les extraits togolais permettent d'affirmer :
- **« Seconde S »** est bien l'appellation utilisée. On trouve par exemple une « SVT composition régionale 1er semestre Seconde S 2025-2026, DRE Savanes » et un « Corrigé Devoir harmonisé n°2 du 2nd semestre 2nd S 2024-2025 ». Fiabilité 2 à 3.
- En **2024-2025 et 2025-2026**, l'année était découpée en **semestres**, avec des compositions régionales par DRE (Grand Lomé : composition du 1er semestre du 12 au 19 janvier 2026).
- Pour **2026-2027**, le calendrier officiel (décision n°125/2026/MEN/CAB/SG, d'après l'extrait AllAfrica) passe aux **trimestres** :
  - T1 : du 14 septembre au 23 décembre 2026 ;
  - T2 : du 4 janvier au 9 avril 2027 ;
  - T3 : du 19 avril au 16 juillet 2027.

  Les ids gardent S1/S2, comme le schéma l'impose. Ils désignent simplement la première et la seconde moitié de l'année. Le champ `decoupage` le précise.
- Le **devoir harmonisé n°2 du 2nd semestre** portait, d'après l'extrait, sur les réactions chimiques, l'équilibrage, les lois de la chimie et les calculs de moles et de masses. Cela confirme que **la mole et l'équation-bilan sont au 2e semestre**.
- Une **réforme de la Seconde** a été menée : programmes « allégés et actualisés », approche par compétences (APC), nouveaux volumes horaires et coefficients (article de republiquetogolaise.com). Les chiffres propres à la PC **ne figuraient pas** dans l'extrait.

Le reste vient de la **structure des programmes voisins de Seconde S/C**, que la recherche a fait ressortir : Sénégal (Lycée de Thiaroye) et Côte d'Ivoire (DPFC). La découpe retenue est celle-ci :
- physique : mécanique au S1 ; électricité et optique au S2 ;
- chimie : structure de la matière au S1 ; mole, réaction et solutions au S2.

| Élément | Valeur | Fiabilité |
|---|---|---|
| Liste et ordre des 16 chapitres | reconstitués (indices togolais + programmes voisins) | moyenne |
| Découpage | trimestres en 2026-2027 / semestres en 2025-2026 | bonne (extraits officiels) |
| Volume horaire hebdo | non confirmé (≈ 4 h ?) | faible |
| Coefficient | **non trouvé**, laissé à `null` plutôt qu'inventé | — |

**À faire dès que possible** : photographier ou recopier la progression de PC remise par le professeur, ou la fiche de progression de l'inspection, puis passer `statut` à `verifie` après comparaison.

## 2. Chapitres rédigés — semestre 1

| Id | Titre | Notions | Exercices (rc / qcm / ouverte) | Difficultés |
|---|---|---|---|---|
| PC-S1-C01 | Généralités sur le mouvement | 3 | 13 (6 / 4 / 3) | 1 → 4 |
| PC-S1-C02 | Les forces (actions mécaniques, poids, forces usuelles) | 3 | 14 (7 / 4 / 3) | 1 → 4 |
| PC-S1-C03 | Équilibre d'un solide soumis à des forces | 3 | 13 (6 / 3 / 4) | 1 → 4 |
| PC-S1-C04 | Équilibre d'un solide mobile autour d'un axe fixe | 3 | 13 (6 / 3 / 4) | 1 → 4 |
| PC-S1-C05 | Corps purs et mélanges | 3 | 13 (5 / 5 / 3) | 1 → 4 |
| PC-S1-C06 | L'atome | 3 | 14 (7 / 4 / 3) | 1 → 4 |
| PC-S1-C07 | Élément chimique et classification périodique | 3 | 14 (6 / 4 / 4) | 1 → 4 |
| PC-S1-C08 | Ions et molécules : les liaisons chimiques | 3 | 14 (6 / 4 / 4) | 1 → 4 |
| **Total S1** | | **24 notions** | **108 exercices** | |

Pour chaque notion :
- un `cours_md` complet (environ 11 500 mots au total pour le S1), avec les encadrés `:::definition`, `:::propriete`, `:::methode`, `:::remarque` et `:::attention`, des tableaux, les ordres de grandeur, les protocoles expérimentaux et 2 ou 3 exemples résolus pas à pas (formule littérale → application numérique → résultat avec unité) ;
- les trois niveaux d'explication ;
- une analogie togolaise quand elle aide vraiment (zémidjan, taxi-brousse Lomé–Kpalimé, puits à treuil, balance romaine du marché, sodabi, pirogue, phosphates de Hahotoé, calcaire de Tabligbo…), sinon une chaîne vide ;
- les erreurs fréquentes, les astuces, un moyen mnémotechnique, un rappel « Tu te souviens de la 3e ? » et une méthode de rédaction ;
- 6 fiches flash (144 au total pour le S1) ;
- 1 schéma SVG.

Chaque chapitre a aussi ses `pieges_composition`. Tous les exercices sont `exercice_type_inspire`, `authentique: false`. Ils couvrent notamment :
- les méthodes rapides : bilan de forces (SRIR), projections et triangle des forces, théorème des moments, rencontre de deux mobiles, loi de Hooke, Archimède ;
- formule électronique et position dans le tableau, ions monoatomiques ;
- représentation de Lewis, formule des composés ioniques ;
- électrolyse de l'eau et masse volumique.

Les équations chimiques sont écrites en `$\ce{...}$` (mhchem).

### Vérification
- **Calculs** : chaque nombre écrit dans un cours, un exemple ou un corrigé est recalculé dans le script de génération par une assertion Python (`chk`) : 139 vérifications numériques pour le S1. Les comptages de chimie sont vérifiés par des assertions dédiées : répartition électronique, nombre de doublets de Lewis, électroneutralité des formules ioniques. La génération échoue en cas d'écart.
- **Exercices `ouverte`** : seconde résolution indépendante, faite par une autre méthode et vérifiée elle aussi par le code. Exemples :
  - Pythagore ou méthode graphique à la place des projections ;
  - moments par rapport à un autre point ;
  - vitesse de rapprochement au lieu des équations horaires ;
  - interpolation dans le tableau de mesures (ressort) ;
  - reconstitution du volume de l'alliage.
- **Données utilisées** : g = 9,8 N/kg (Lomé ≈ 9,78) ; G = 6,67 × 10⁻¹¹ SI ; M_T = 5,97 × 10²⁴ kg ; R_T = 6,37 × 10⁶ m ; M_L = 7,35 × 10²² kg ; R_L = 1,74 × 10⁶ m ; e = 1,60 × 10⁻¹⁹ C ; m_p = 1,673 × 10⁻²⁷ kg ; m_n = 1,675 × 10⁻²⁷ kg ; m_e = 9,11 × 10⁻³¹ kg ; masses volumiques usuelles (eau 1,00 ; éthanol 0,79 ; Al 2,70 ; Fe 7,87 ; Cu 8,96 ; Au 19,3 g/cm³).
- **Validateur** : `node 02_base_donnees/valider.mjs PC` → **Aucune erreur** (S1 complet ; fichiers S2 de l'agent d'appoint inclus au moment du contrôle).

### Images
- 24 schémas SVG originaux (CC0) : `05_medias/svg/PC-S1-Cxx-Ny.svg`. Ils sont autonomes, avec viewBox de 400 px de large, fond `#fffdf8` à coins arrondis, police système sans-serif, texte de 11 px au moins et indices et exposants en caractères Unicode.
- Chacun a été rasterisé (CairoSVG) et contrôlé à l'œil : chevauchements corrigés, cohérence physique vérifiée. Par exemple :
  - longueurs des vecteurs proportionnelles aux intensités, triangle des forces fermé ;
  - réaction sur plan rugueux portée par la verticale de G ;
  - tangentes du MCU ;
  - cycloïde exacte ;
  - rapport 2/1 des volumes de l'électrolyse, H₂ à la cathode ;
  - bras de levier perpendiculaire à la droite d'action.
- **Vidéos : aucune.** WebFetch étant bloqué sur tous les domaines (YouTube compris), aucun lien n'a pu être ouvert. Les listes `videos` sont donc vides, comme l'exige le schéma.

## 3. Manques et doutes (S1)
1. **Programme non vérifié.** Doutes précis :
   - « Corps purs et mélanges » (présent au Sénégal) est-il au programme togolais de Seconde S ?
   - Le chapitre « moment d'une force / couple » y est-il, ou est-il renvoyé en Première ?
   - La gravitation universelle et le principe d'inertie sont-ils au programme de Seconde ? (Ils sont traités ici dans C02 et C03.)
   - La représentation de Lewis des molécules est-elle demandée dès la Seconde ?
2. **Ordre des chapitres** : au Togo, la chimie est peut-être enseignée en alternance avec la physique (par exemple atome en début d'année). Les ids imposent un ordre global, mais l'ordre réel peut différer.
3. **Couple de torsion** (C04-N3) : seulement mentionné en remarque, car il relève souvent de la Première.
4. **Valeur de g** : 9,8 N/kg partout. Certains professeurs togolais prennent 10 N/kg ; il faudra le signaler à l'élève.
5. **Aucune épreuve togolaise authentique de PC n'a pu être ouverte.** Les pièges de composition viennent de l'expérience générale des devoirs de Seconde, pas d'épreuves togolaises analysées.
6. **Scripts** : ils sont en dehors du dépôt, dans le scratchpad de session `…/scratchpad/contenu_pc_agent/` (pcbase.py, c01.py … c08.py, programme.py). Ce dossier n'est pas persistant. Un autre agent ayant écrasé un fichier `common.py` dans le dossier partagé `scratchpad/pc/`, mes scripts ont été déplacés dans ce dossier dédié.

## 4. Idées de simulations interactives (avec notion liée)
1. **Chronophotographie interactive** : l'élève fait glisser τ et l'accélération, puis mesure M₍ᵢ₋₁₎M₍ᵢ₊₁₎ pour obtenir vᵢ ; le vecteur vitesse est tracé à l'échelle. → `PC-S1-C01-N2`
2. **Rencontre de deux mobiles** : deux zémidjans sur la route Lomé–Aného, avec vitesses, dates de départ et sens réglables ; graphes x(t) superposés et point de rencontre. → `PC-S1-C01-N3`
3. **Plan incliné** : curseurs pour l'angle α, la masse et la présence de frottements ; affichage en direct de P, R et T, des projections et du triangle des forces fermé. → `PC-S1-C03-N1`, `PC-S1-C03-N3`
4. **Ressort et loi de Hooke virtuels** : on accroche des masses marquées, on lit la règle, et le tracé de T(Δℓ) donne k par la pente. → `PC-S1-C02-N3`
5. **Flotte ou coule ? (Archimède)** : curseurs de masse volumique de l'objet et du liquide (eau, eau de mer, huile) ; affichage de la hauteur immergée et du poids apparent. → `PC-S1-C02-N3`
6. **Levier, balance romaine et treuil** : on déplace la charge et le curseur ; une jauge « somme des moments » s'annule à l'équilibre. → `PC-S1-C04-N2`
7. **Constructeur d'atome** : on ajoute protons, neutrons et électrons ; affichage du symbole ᴬ_Z X, de l'élément, du caractère ion ou isotope, de la répartition K/L/M et de la stabilité (duet ou octet). → `PC-S1-C06-N2`, `PC-S1-C06-N3`, `PC-S1-C07-N3`
8. **Tableau périodique cliquable** des 20 premiers éléments : formule électronique, famille et ion formé pour chaque case ; mini-jeu « place l'élément ». → `PC-S1-C07-N2`
9. **Atelier de Lewis** : glisser des doublets liants et non liants autour des atomes, avec un compteur n_v / n_d et une vérification automatique de l'octet. → `PC-S1-C08-N2`
10. **Fabrique de formules ioniques** : choisir un cation et un anion (dont les ions polyatomiques) ; les charges se « croisent », l'équilibre des charges s'affiche, puis le nom du composé. → `PC-S1-C08-N3`
11. **Courbe de chauffage et distillation** : chauffer un corps pur ou un mélange (eau, eau salée, eau + éthanol), observer le palier et le distillat recueilli. → `PC-S1-C05-N1`, `PC-S1-C05-N2`

Pour le S2 (à réaliser par l'agent d'appoint ou plus tard) :
- constructeur de circuit (loi d'Ohm, additivité, point de fonctionnement) ;
- balance d'équation chimique avec tableau d'avancement ;
- banc de dilution ;
- rayon lumineux et loi de Snell-Descartes.

## Semestre 2 (section de l'agent d'appoint)
*À compléter par l'agent qui rédige PC-S2-C09 … PC-S2-C16.*
