# Critique visuelle et expérience — cycle 2 (site v2)

Conditions : Chromium, 360 × 740 px (petit Android), thèmes clair et sombre, parcours complet : inscription → accueil → matière → chapitre → notion → exercice → QCM → épreuve → révision → suivi → calendrier → réglages → mélange → remédiation.
Contrôles automatiques : aucune erreur JavaScript, aucune page plus large que 360 px.

Captures « après » : `captures/v2_sombre_*.png`.

## Ce que ressent un élève de 15-16 ans

| Écran | Première impression | Problème | Correction faite |
|---|---|---|---|
| En-tête | Niveau, XP et série visibles en permanence : motivant. | « Objectif 20 » et « Niv. 1 » passaient sur deux lignes à 360 px. | Pas de retour à la ligne, jauge réduite (`.marque`, `.niveau`). |
| Accueil | Les 4 « mondes » colorés donnent envie de cliquer. | Après l'inscription, la page s'ouvrait au milieu (défilement conservé). | Retour en haut après la création du profil. |
| Matière | Le chemin de chapitres avec « À faire maintenant » guide bien. | Le volume horaire, très long, débordait du bandeau programme. | Affiché seulement s'il est court. |
| Notion | Ressemble à un vrai livre : encadrés colorés, formules propres (KaTeX), schéma. | 1) Les exemples résolus apparaissaient deux fois (dans le cours et en dessous). 2) « Tu te souviens de la 3e ? » était répété. 3) Les titres de tableau se coupaient au milieu des mots (« Inégali-té »). | 1) Un exemple déjà présent dans le cours n'est plus répété. 2) Préfixe retiré du texte. 3) Pas de coupure de mot dans les tableaux. |
| Exercice | Retour immédiat, corrigé rédigé avec barème : clair. | Tout le corrigé s'affichait en vert après une bonne réponse (lisibilité). | Seul le titre « Bravo » est en vert. |
| Épreuve | Le badge 🏛️ avec la source inspire confiance ; mode composition blanche avec chrono. | « Semestre 1 » affiché sur un concours d'entrée (faux). | Masqué pour les concours. |

## Accessibilité (WCAG AA)

Contrastes mesurés (ratio, minimum 4,5 pour du texte normal) :

| Paire | Avant | Après |
|---|---|---|
| Texte principal clair / sombre | 15,8 / 14,3 | inchangé |
| Texte secondaire clair / sombre | 5,9 / 8,3 | inchangé |
| Bouton principal (encre sur soleil) | 8,1 | inchangé |
| Blanc sur tuile SVT | **3,3** ❌ | 5,0 ✅ (vert plus foncé `#15803d`) |
| Petit texte couleur matière sur carte sombre (Maths, PC, Français) | **3,0 à 3,4** ❌ | ≥ 4,5 ✅ (`--mat-txt` éclairci en sombre, assombri en clair) |

Autres points : cibles tactiles d'au moins 44 px, focus visible (contour jaune), `prefers-reduced-motion` respecté, libellés sur tous les champs, `aria-live` pour les résultats et les notifications.

## Leviers de motivation : sains ?

- ✅ Compétence visible : étoiles par chapitre, niveaux, prévision de note qui monte avec les résultats réels.
- ✅ Autonomie : l'élève choisit sa matière ; le plan du jour est une proposition.
- ✅ Surprise : récompense aléatoire (8 % des bonnes réponses, +25 XP), rare pour ne pas devenir une machine à sous.
- ✅ Pas de culpabilisation : les jokers protègent la série, les messages d'erreur sont encourageants (« Pas tout à fait », « Les lignes non cochées sont ta liste de travail »).
- ✅ Pas de défilement infini : les séries s'arrêtent (10 exercices, 15 fiches) avec un écran de fin.
- ✅ Le sommeil passe avant : mode calme puis verrou la nuit.

## À surveiller au cycle 3
- Les notifications s'empilent si plusieurs gains arrivent en même temps (« +5 XP » + « surprise ») : acceptable, mais à limiter à 2.
- Épreuves très longues (concours) : le bouton « Rendre ma copie » est loin en bas ; ajouter un raccourci près du minuteur.
