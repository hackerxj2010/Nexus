# Méthodes d'apprentissage efficaces — et où elles sont dans le site

Références citées de mémoire : le réseau de l'environnement de développement bloque la consultation des articles, elles n'ont donc pas été relues en ligne pour cette version. Ce sont des travaux classiques et très cités de psychologie cognitive.

## 1. Méthodes générales validées par la recherche

| Méthode | Ce que dit la recherche | Dans le site |
|---|---|---|
| **Répétition espacée** | On retient bien mieux en révisant à intervalles croissants qu'en bachotant la veille (Cepeda et al., 2006, méta-analyse, *Psychological Bulletin*). | Onglet **Révision** : chaque notion revient à J+1, J+3, J+7, J+14, J+30 ; une erreur la renvoie à J+1 (`06_site/src/store.ts`). |
| **Récupération active** (*testing effect*) | Se tester fait plus progresser que relire (Roediger & Karpicke, 2006, *Psychological Science*). | Fiches flash, mini-quiz en fin de notion, exercices auto-corrigés. |
| **Pratique entrelacée** | Mélanger des exercices de chapitres différents oblige à choisir la méthode ; meilleur résultat au contrôle final (Rohrer & Taylor, 2007). | Bouton **🎲 Mélange** : 10 exercices de chapitres différents, priorité aux lacunes et aux notions dues. |
| **Exemples résolus puis estompés** | Pour un débutant, étudier un exemple résolu est plus efficace que chercher seul ; on retire ensuite progressivement l'aide (Sweller ; Renkl, *fading*). | Exemple résolu 1 affiché en entier ; les suivants se dévoilent étape par étape ; indices progressifs dans les exercices. |
| **Double codage** | Texte + image bien liés se retiennent mieux que le texte seul (Paivio ; Mayer, apprentissage multimédia). | Un schéma SVG par notion, analogie imagée, lecture audio. |
| **Auto-explication / méthode Feynman** | S'expliquer pourquoi chaque étape est juste améliore la compréhension (Chi et al., 1989, 1994). | Remédiation : « résous ET explique » ; le tuteur IA juge l'explication. |
| **Métacognition (auto-évaluation)** | Savoir ce qu'on ne sait pas guide la révision. | « Tu te sens comment ? » sur chaque notion ; « Je n'ai pas compris » enregistré par le Maître de suivi. |
| **Sommeil et consolidation** | Le sommeil consolide les apprentissages ; la privation nuit à la mémoire (Walker & Stickgold, 2004 ; Diekelmann & Born, 2010). | Coach de sommeil : rappel, mode calme, verrou la nuit. |
| **Pauses** | Des pauses courtes entretiennent l'attention (type Pomodoro, 25 à 45 min). | Pause conseillée réglable (25 à 60 min), écran de pause guidé de 5 min. |
| **Motivation saine** | Compétence visible, autonomie, progression (théorie de l'autodétermination, Deci & Ryan). | XP, niveaux, étoiles, badges, série avec jokers (pas de culpabilisation), prévision de note. |

## 2. Méthodes de résolution rapides par matière

Elles sont détaillées dans les notions de la base (`02_base_donnees/<MAT>/`, champs `cours_md`, `astuces`, `methode_redaction`).

**Mathématiques**
- Équation du 1er degré : regrouper les inconnues d'un côté, diviser par le coefficient en vérifiant son signe.
- Inéquation : attention au changement de sens quand on multiplie ou divise par un négatif ; solution en intervalle.
- Produit/quotient : **tableau de signes** (« signe de a à droite de la racine »), valeurs interdites avec double barre.
- Vecteurs : relation de Chasles, colinéarité par le déterminant $xy' - x'y$.
- Rédaction : hypothèse → propriété citée → conclusion ; encadrer le résultat.

**Physique-Chimie**
- Bilan de forces : système, référentiel, liste des forces (point d'application, direction, sens, intensité), schéma.
- Calcul : formule littérale → application numérique → résultat avec unité et chiffres significatifs.
- Équations chimiques : équilibrer d'abord les éléments présents une seule fois de chaque côté, finir par O et H, ne jamais toucher aux indices.

**SVT**
- Exploitation de document : **décrire** (je vois que… avec les valeurs) → **interpréter** (cela signifie que…) → **conclure** (relier à la question).
- Schéma : titre, crayon, traits de légende à la règle, horizontaux, non croisés.

**Français**
- Résumé : repérer la thèse et les connecteurs, supprimer exemples et répétitions, reformuler sans citer, respecter le nombre de mots (environ un quart du texte, ± 10 %), l'indiquer en fin de copie.
- Discussion / dissertation : problématique, plan dialectique ou thématique, chaque paragraphe = idée + argument + exemple.
- Commentaire : axes de lecture, analyse C-P-I (Citation, Procédé, Interprétation).
