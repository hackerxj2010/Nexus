# Rapport — Physique-Chimie, semestre 2 (PC-S2-C09 à PC-S2-C16)

Agent contenu PC, semestre 2. Date : 2026-10-03. Aucun fichier PC-S1 modifié.

## 1. Chapitres écrits

Les ids et les titres sont ceux de `01_recherche/programme/PC.json`. Un fichier par chapitre est dans `02_base_donnees/PC/`. Chaque notion a un schéma SVG original dans `05_medias/svg/<id_notion>.svg`.

| Chapitre | Titre | Notions | Exercices | Difficulté 1/2/3/4 | Flash | Exemples hors cours |
|---|---|---|---|---|---|---|
| PC-S2-C09 | Électrisation et courant électrique | 4 | 14 (5 QCM, 6 rép. courtes, 3 ouverts) | 3/5/4/2 | 24 | 6 |
| PC-S2-C10 | La tension électrique | 3 | 14 (5 QCM, 6 rép. courtes, 3 ouverts) | 4/5/3/2 | 18 | 5 |
| PC-S2-C11 | Dipôles passifs : loi d'Ohm, associations, effet Joule | 4 | 15 (5 QCM, 6 rép. courtes, 4 ouverts) | 3/6/4/2 | 24 | 6 |
| PC-S2-C12 | Dipôles actifs : générateurs et récepteurs | 4 | 14 (3 QCM, 7 rép. courtes, 4 ouverts) | 3/5/4/2 | 24 | 5 |
| PC-S2-C13 | Propagation, réflexion et réfraction de la lumière | 4 | 15 (3 QCM, 8 rép. courtes, 4 ouverts) | 4/5/4/2 | 24 | 6 |
| PC-S2-C14 | La mole et les grandeurs molaires | 4 | 15 (3 QCM, 8 rép. courtes, 4 ouverts) | 3/6/4/2 | 24 | 8 |
| PC-S2-C15 | La réaction chimique et l'équation-bilan | 4 | 15 (6 QCM, 5 rép. courtes, 4 ouverts) | 4/5/4/2 | 24 | 5 |
| PC-S2-C16 | Solutions aqueuses, acides, bases et pH | 5 | 16 (6 QCM, 6 rép. courtes, 4 ouverts) | 3/7/4/2 | 30 | 7 |
| **Total** | | **32** | **118** (30 ouverts) | | **192** | **48** |

Détail des notions :
- **C09** : électrisation et charges ($q = \pm ne$) ; nature, sens et effets du courant (électrons, ions, électrolyse) ; intensité $I = Q/\Delta t$ et lecture d'un ampèremètre ; loi d'unicité et loi des nœuds.
- **C10** : tension $U_{AB} = V_A - V_B$, flèche tension et voltmètre ; additivité, loi des mailles et tensions en dérivation ; oscilloscope (sensibilité, balayage), période, fréquence et valeur efficace (secteur 220 V, 50 Hz).
- **C11** : caractéristique et loi d'Ohm (protocole, pente) ; associations série, dérivation et mixtes, diviseur de tension ; puissance, énergie (kWh) et effet Joule ; lampe, diode, DEL, diode Zener et résistance de protection.
- **C12** : générateur $U = E - rI$, $I_{cc}$, bilan de puissance et rendement ; récepteur actif $U = E' + r'I$ (électrolyseur, moteur, moteur bloqué) ; point de fonctionnement et loi de Pouillet ; associations de générateurs (série, opposition, dérivation).
- **C13** : propagation rectiligne ($c$, année-lumière, chambre noire, éclipses) ; réflexion et miroir plan ; réfraction ($n = c/v$, Snell-Descartes, angle limite) ; réflexion totale (fibre, prisme) et dispersion.
- **C14** : mole et $N_A$ ; masse molaire et $n = m/M$ ; volume molaire et loi d'Avogadro-Ampère, densité $d = M/29$ (sécurité butane) ; liquides ($m = \rho V$), relations entre grandeurs et formule brute d'un alcane.
- **C15** : transformation chimique, tests d'identification, loi de Lavoisier ; équation-bilan et équilibrage ; réactif limitant (plus petit $n/\text{coefficient}$, tableau d'avancement en remarque) ; combustions, volumes de gaz et danger du CO.
- **C16** : dissolution des composés ioniques ; concentrations $C$ et $C_m$, concentrations des ions et préparation par dissolution ; dilution $C_0V_0 = C_1V_1$ ; pH, $[\ce{H3O+}] = 10^{-\text{pH}}$ et indicateurs colorés ; acides, bases, neutralisation et équivalence $C_aV_a = C_bV_b$.

Chaque notion contient :
- un `cours_md` structuré avec les encadrés `:::definition`, `:::propriete`, `:::methode`, `:::remarque` et `:::attention`, les unités SI, les protocoles de laboratoire, et un ou deux exemples résolus (formule littérale → application numérique → résultat avec unité) ;
- les 3 niveaux d'explication, un rappel de 3e (ou du 1er semestre), une méthode de rédaction, les erreurs fréquentes, des astuces, un moyen mnémotechnique et au moins 4 fiches flash ;
- dans `exemples_resolus`, des exemples **différents** de ceux du cours (aucun doublon, contrôle automatique sur les énoncés). Aucune notion n'a ce champ vide.

Les `prerequis_notions` pointent vers les notions S1 précises (`PC-S1-C06-N1`, `PC-S1-C07-N1`, `PC-S1-C07-N2`, `PC-S1-C08-N1`, `PC-S1-C08-N3`, `PC-S1-C05-N1`, `PC-S1-C05-N3`) ou vers des notions S2 antérieures. Les identifiants de 3e et de mathématiques ne correspondent à aucun nœud de la base, comme au S1 : `PC-3e-ELECTRICITE`, `PC-3e-CIRCUIT`, `PC-3e-TENSION`, `PC-3e-LOI-OHM`, `PC-3e-LUMIERE`, `PC-3e-COMBUSTIONS`, `PC-3e-PH`, `M-3e-PROPORTIONNALITE`, `M-3e-PUISSANCES`, `M-3e-THALES`, `M-3e-TRIGONOMETRIE`.

## 2. Vérifications faites

- **Calculs** : chaque chapitre a son script Python, qui recalcule toutes les valeurs du cours, des exemples et des exercices. Ces scripts couvrent :
  - la loi d'Ohm, les associations, Pouillet et les bilans de puissance ;
  - Snell-Descartes et les angles limites, avec `asin` en degrés ;
  - les masses molaires recalculées atome par atome ;
  - $n$, $V_m$, $C$, $C_0V_0 = C_1V_1$ et le pH (`log10`).

  Les équations de combustion sont équilibrées par algèbre linéaire avec sympy (CH₄, C₃H₈, C₄H₁₀, C₂H₆O, Al₂O₃, Fe₃O₄). Les scripts sont dans le répertoire de travail temporaire de la session (`verif_C09.py` … `verif_C16.py`), hors du dépôt.
- **Exercices `ouverte`** : chacun a une seconde résolution indépendante, par une autre méthode. Exemples :
  - C10-E10 : par les potentiels, puis par la loi des mailles ;
  - C11-E09 : par un système d'équations (lois des nœuds et des mailles) résolu avec sympy, puis par les résistances équivalentes ;
  - C11-E12 : par un système en $R_1$, $R_2$, puis par la loi des nœuds au point milieu ;
  - C12-E09/E11/E12 : par un système $E$, $r$, par l'intersection des droites, puis par la loi des mailles ;
  - C13-E10/E12 : angle limite tiré directement des sinus mesurés, puis test $n_1 \sin i > n_2$ ;
  - C14-E10/E12 : masse d'une molécule puis $N = m/m_1$ ; $M = \rho V_m$ ;
  - C15-E09/E12 : tableau d'avancement ($x_{\max}$) ;
  - C16-E10/E11/E14 : en mmol/L ; par la conservation de $n$ ; par la masse de HCl par litre.

  Aucun désaccord. Seule différence d'arrondi : C13-E10, où l'angle limite vaut 41,8° avec $n = 1{,}50$ et 41,9° avec les sinus mesurés. Le corrigé indique « environ 42° ».
- **Réponses courtes** : toutes les `reponses_acceptees` passent par la même normalisation que le site (`normaliser`/`nombre` de `Exercice.tsx`). Les formes numériques acceptées s'écartent de moins de 3,5 % de la valeur de référence (arrondis à 2 ou 3 chiffres significatifs). Les formes avec unité (« 0,30A », « 750mA ») sont acceptées comme texte.
- **Schémas** : 32 SVG générés par script, rendus avec Chromium (Playwright) à 360 px de large et relus à l'image. Les chevauchements de texte repérés ont été corrigés. Tous ont le fond `#fffdf8`, les coins arrondis (`rx="18"`), une `viewBox`, une police sans-serif et un `<title>`.
  - Géométrie optique exacte : réflexion à 40° ; réfraction air → eau 50° → 35,2° ; verre → air 30° → 48,6°, rayon rasant à 41,8°, réflexion totale à 60°.
  - Caractéristiques à l'échelle : $R = 220\ \Omega$ ; $U = 4{,}5 - 1{,}5I$ ; $U = 2{,}2 + 2{,}0I$ ; point $F(0{,}50\ \text{A}\ ;\ 5{,}0\ \text{V})$ ; diode avec un seuil à 0,6 V et Zener à −5,6 V.
  - Symboles normalisés : pile (grand trait = +), lampe, résistor, A, V, G, M, interrupteur, diode et Zener.
- **Validateur** : `node 02_base_donnees/valider.mjs PC` → **« Aucune erreur. »** (16 chapitres PC, 56 notions, 226 exercices, 336 fiches flash, 56 images). Il ne signale aucune erreur dans les fichiers S1 ni dans les épreuves.

## 3. Doutes (à confronter au professeur ou à la progression officielle)

1. **Programme reconstitué** (`statut: reconstitue`). Le contenu suit les programmes de Seconde C/S du Sénégal et de Côte d'Ivoire. Certains points peuvent dépasser le programme togolais de Seconde S, ou y être traités plus légèrement :
   - l'oscilloscope et la valeur efficace (C10) ;
   - la diode Zener (C11) ;
   - les bilans de puissance et le rendement des dipôles actifs (C12) ;
   - la dispersion par le prisme (C13), seulement en remarque ;
   - $\text{pH} = -\log[\ce{H3O+}]$, la définition de Brønsted et l'équivalence $C_aV_a = C_bV_b$ (C16). Ces notions sont souvent vues en 1re, mais elles restent ici limitées à des cas simples (acide chlorhydrique et soude) ;
   - le tableau d'avancement (C15), présenté seulement en remarque.
2. **Valeurs de référence** :
   - $V_m = 24{,}0$ L/mol à 20 °C (certains manuels prennent 24 L/mol, ou 24,5 L/mol à 25 °C) ;
   - masses molaires à 0,1 près (S = 32,1, Fe = 55,8), alors que des sujets togolais utilisent souvent S = 32 et Fe = 56. Chaque exercice donne ses propres données, ce qui évite l'ambiguïté ;
   - $e = 1{,}6 \times 10^{-19}$ C et $N_A = 6{,}02 \times 10^{23}$ mol⁻¹.
3. **Contexte togolais** :
   - le secteur est donné à « environ 220 V, 50 Hz » ; certaines sources disent 230 V ;
   - le prix du kWh (100 FCFA) est explicitement **fictif**, faute d'avoir pu vérifier le tarif de la CEET ;
   - la composition des SRO (13,5 g de glucose et 2,6 g de NaCl par litre, formule OMS) et la solubilité de NaCl (environ 360 g/L) sont écrites de mémoire, sans vérification web.
4. Les analogies togolaises sont volontairement sobres (TdE, CEET, zémidjan, rond-point, marché, akoumé, lac Togo). Plusieurs notions ont une analogie vide quand aucune n'aidait vraiment.

## 4. Manques

- **Vidéos** : aucune, car le web est bloqué. Le champ `videos` est vide partout.
- **Épreuves** : pas d'exercice authentique togolais. Les 118 exercices sont « type inspiré » (`authentique: false`). Il faudra les compléter par des devoirs harmonisés et des compositions de 2e semestre réels dès que les sources seront accessibles.
- **Notions absentes ou survolées** (programme non confirmé) :
  - dosage acido-basique complet avec courbe de pH ;
  - lentilles et instruments d'optique ;
  - énergie électrique au niveau d'une installation domestique (disjoncteur, puissance souscrite), seulement évoquée ;
  - électrolyse quantitative.
- Les nœuds `PC-3e-…` et `M-3e-…` n'existent pas dans la base. Les liens « Revoir » ne s'affichent donc que pour les prérequis de Seconde.
- Les scripts de génération (JSON et SVG) restent hors du dépôt, conformément aux consignes. Pour régénérer un schéma, il faudra les réécrire ou reprendre le SVG à la main.

## 5. Idées de simulations interactives

1. **Atelier de circuits (C09–C11)** : on glisse des lampes et des résistors en série ou en dérivation sur une grille. Des ampèremètres et voltmètres virtuels affichent $I$ et $U$ en direct. On peut vérifier la loi des nœuds, l'additivité des tensions et $R_{\text{éq}}$. Un mode « erreur de branchement » montre ce qui se passe si l'ampèremètre est mis en dérivation (court-circuit).
2. **Oscilloscope virtuel (C10)** : deux boutons (V/div, ms/div) et un signal sinusoïdal tiré au hasard. L'élève règle l'écran pour voir 2 périodes entières, puis saisit $U_m$, $T$, $f$ et $U_{\text{eff}}$. La correction est immédiate.
3. **Point de fonctionnement (C12)** : curseurs $E$, $r$, $R$, et en option un moteur ($E'$, $r'$). Les deux caractéristiques et leur intersection se déplacent en direct. Des barres de puissance ($EI$, $UI$, $rI^2$, $E'I$) montrent le rendement, et un bouton « bloquer le moteur » fait passer $E'$ à 0.
4. **Banc d'optique (C13)** : on fait glisser le rayon incident et on choisit les milieux (air, eau, verre, diamant). Les rayons réfléchi et réfracté s'affichent avec leurs angles et l'angle limite. Quand $i > \lambda$, la réflexion totale apparaît. Un onglet « miroir plan » construit l'image et le chemin d'un rayon jusqu'à l'œil.
5. **Paillasse de chimie (C15–C16)** :
   - (a) un réactif limitant animé : on choisit les quantités de H₂ et O₂, les molécules réagissent et le tableau d'avancement se remplit ;
   - (b) dilution et pH : on choisit la pipette et la fiole, on lit $C_1$, et la couleur du BBT et le pH évoluent pendant l'ajout de soude jusqu'à l'équivalence.
