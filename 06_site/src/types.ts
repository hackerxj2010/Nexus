export interface Flash { q: string; r: string }
export interface Notion {
  id: string; titre: string; prerequis_notions?: string[]; cours_md: string; definition: string; formules?: string[]
  niveaux: { phrase: string; simple: string; complete: string }
  analogie?: string; exemples_resolus?: { enonce: string; etapes: string[] }[]
  erreurs_frequentes?: string[]; astuces?: string[]; mnemo?: string
  rappel_anterieur?: { classe: string; texte: string } | string
  methode_redaction?: string; flash: Flash[]
  image?: { fichier: string; alt: string; legende?: string; licence?: string }
  videos?: { titre: string; chaine?: string; url: string; debut?: string; verifie?: boolean }[]
}
export interface Exercice {
  id: string; type: string; authentique: boolean; difficulte: number; notions: string[]
  format: 'reponse_courte' | 'qcm' | 'ouverte'; enonce: string
  choix?: string[]; bonne_reponse?: number; reponses_acceptees?: string[]
  indices?: string[]; corrige: string[]; bareme: number[]; piege?: string
}
export interface Chapitre {
  id: string; matiere: string; semestre: number; ordre: number; titre: string; objectifs?: string[]
  prerequis?: string[]; notions: Notion[]; exercices: Exercice[]; pieges_composition?: string[]
}
export interface Question {
  numero: string; enonce: string; points?: number; notions_titres?: string[]; corrige: string[]; bareme?: number[]
  resultat_final?: string; piege?: string; astuce?: string
}
export interface Epreuve {
  id: string; matiere: string; semestre: number; type: string; authentique: boolean; pays: string
  source: { etablissement?: string; ville?: string; annee_scolaire?: string; url?: string; date_consultation?: string; licence?: string; fiabilite?: number }
  duree_min?: number; total_points?: number; chapitres_titres?: string[]; chapitres: string[]
  enonce_md: string; questions: Question[]
}
export interface DonneesMatiere { chapitres: Chapitre[]; epreuves: Epreuve[] }

export interface ChapitreResume { id: string; semestre: number; ordre: number; titre: string; notions: { id: string; titre: string }[]; nbExercices: number }
export interface EpreuveResume { id: string; semestre: number; type: string; authentique: boolean; pays: string; etablissement?: string; annee?: string; duree_min?: number; chapitres: string[] }
export interface MatiereResume {
  id: string; nom: string; couleur: string; icone: string
  programme: { statut: string; decoupage: string; volume_horaire_hebdo?: string; coefficient?: number; sources: { titre: string; url?: string; fiabilite?: number }[] } | null
  chapitres: ChapitreResume[]; epreuves: EpreuveResume[]
}
export interface Index { genere: string; matieres: MatiereResume[] }

export const TYPES_EPREUVE: Record<string, string> = {
  interrogation: 'Interrogation', devoir_surveille: 'Devoir surveillé', devoir_maison: 'Devoir de maison',
  composition: 'Composition', devoir_harmonise: 'Devoir harmonisé', concours_entree: "Concours d'entrée en Seconde S",
}
