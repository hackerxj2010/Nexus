import { useEffect, useState } from 'react'

export interface Profil {
  nom: string; etablissement: string; moyennes: Record<string, number>; faibles: string[];
  heuresParJour: number; coucher: string; lever: string; style: 'lire' | 'ecouter' | 'voir' | 'faire';
  prochainsDevoirs: string;
}
export interface Tentative { exo: string; notions: string[]; juste: boolean; temps: number; indices: number; date: number }
export interface Commentaire { cible: string; texte: string; date: number }
export interface Revision { notion: string; prochaine: number; palier: number }
export interface Etat {
  profil?: Profil; xp: number; jours: string[]; jokers: number; tentatives: Tentative[];
  commentaires: Commentaire[]; revisions: Revision[]; badges: string[]; lacunesDepuisRemediation: number;
  reglages: { theme: 'clair' | 'sombre'; taille: number; sons: boolean; verrouSommeil: boolean };
  ia?: { format: 'openai' | 'anthropic'; baseUrl: string; cle: string; modele: string };
  deverrouilleJusqua?: number;
}

const CLE = 'secondeS.etat.v1'
const defaut: Etat = {
  xp: 0, jours: [], jokers: 2, tentatives: [], commentaires: [], revisions: [], badges: [], lacunesDepuisRemediation: 0,
  reglages: { theme: 'clair', taille: 17, sons: true, verrouSommeil: true },
}

function lire(): Etat {
  try { const s = localStorage.getItem(CLE); return s ? { ...defaut, ...JSON.parse(s) } : defaut } catch { return defaut }
}

let etat = lire()
const abonnes = new Set<() => void>()
export function maj(f: (e: Etat) => Etat) {
  etat = f(etat)
  try { localStorage.setItem(CLE, JSON.stringify(etat)) } catch { /* stockage indisponible */ }
  abonnes.forEach(a => a())
}
export function useEtat(): Etat {
  const [, set] = useState(0)
  useEffect(() => { const a = () => set(x => x + 1); abonnes.add(a); return () => { abonnes.delete(a) } }, [])
  return etat
}
export const aujourdhui = () => new Date().toISOString().slice(0, 10)

/** Paliers de répétition espacée en jours : J+1, J+3, J+7, J+14, J+30. */
export const PALIERS = [1, 3, 7, 14, 30]
const JOUR = 86400000

export function enregistrer(t: Tentative) {
  maj(e => {
    const jours = e.jours.includes(aujourdhui()) ? e.jours : [...e.jours, aujourdhui()]
    const revisions = [...e.revisions]
    for (const n of t.notions) {
      const i = revisions.findIndex(r => r.notion === n)
      const ancien = i >= 0 ? revisions[i].palier : -1
      const palier = t.juste ? Math.min(ancien + 1, PALIERS.length - 1) : 0
      const r = { notion: n, palier, prochaine: t.date + PALIERS[palier] * JOUR }
      if (i >= 0) revisions[i] = r; else revisions.push(r)
    }
    const lacune = !t.juste || t.indices >= 2
    return {
      ...e, jours, revisions,
      xp: e.xp + (t.juste ? 10 + (t.indices === 0 ? 5 : 0) : 2),
      tentatives: [...e.tentatives, t].slice(-2000),
      lacunesDepuisRemediation: e.lacunesDepuisRemediation + (lacune ? 1 : 0),
    }
  })
}

export function serie(e: Etat): number {
  const s = new Set(e.jours); let n = 0; const d = new Date()
  if (!s.has(aujourdhui())) d.setDate(d.getDate() - 1)
  while (s.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1) }
  return n
}
export const niveau = (xp: number) => Math.floor(Math.sqrt(xp / 50)) + 1

/** Lacunes : erreurs, indices massifs, commentaires « pas compris », regroupées par notion. */
export function lacunes(e: Etat): { notion: string; score: number }[] {
  const m = new Map<string, number>()
  for (const t of e.tentatives) if (!t.juste || t.indices >= 2) for (const n of t.notions) m.set(n, (m.get(n) ?? 0) + 1)
  for (const c of e.commentaires) m.set(c.cible, (m.get(c.cible) ?? 0) + 1)
  return [...m].map(([notion, score]) => ({ notion, score })).sort((a, b) => b.score - a.score)
}
export function echecsRepetes(e: Etat, notion: string): number {
  let n = 0
  for (const t of [...e.tentatives].reverse()) { if (!t.notions.includes(notion)) continue; if (t.juste) break; n++ }
  return n
}
export const etatCourant = (): Etat => etat
