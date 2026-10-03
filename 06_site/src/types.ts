export interface Flash { q: string; r: string }
export interface Notion {
  id: string; titre: string; definition: string; formules: string[];
  niveaux: { phrase: string; simple: string; complete: string };
  erreurs_frequentes: string[]; astuces: string[]; rappel_anterieur: string; flash: Flash[];
}
export interface Exercice {
  id: string; type: string; authentique: boolean; difficulte: number; notions: string[];
  enonce: string; indices: string[]; reponse_attendue: string; corrige: string[]; bareme: number[];
  source?: { etablissement?: string; annee?: string; url?: string };
}
export interface Chapitre { id: string; semestre: number; ordre: number; titre: string; prerequis: string[]; notions: Notion[]; exercices: Exercice[] }
export interface Matiere { id: string; nom: string; couleur: string; icone: string; chapitres: Chapitre[] }
export interface Base { version: string; avertissement: string; matieres: Matiere[] }
