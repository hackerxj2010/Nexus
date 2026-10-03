import { useEffect, useState } from 'react'

export interface Profil {
  nom: string; etablissement: string; moyennes: Record<string, number>; faibles: string[]
  heuresParJour: number; coucher: string; lever: string; style: 'lire' | 'ecouter' | 'voir' | 'faire'
}
export interface Tentative { exo: string; notions: string[]; juste: boolean; temps: number; indices: number; date: number; score?: number; chrono?: boolean }
export interface Commentaire { cible: string; texte: string; date: number }
export interface Revision { notion: string; prochaine: number; palier: number }
export interface Composition { epreuve: string; matiere: string; note: number; sur: number; date: number; dureeMin: number; mode: 'composition' | 'entrainement' }
export interface Devoir { id: string; titre: string; matiere: string; date: string }
export interface AutoEval { notion: string; niveau: 1 | 2 | 3; date: number }
export interface Etat {
  profil?: Profil; xp: number; jours: string[]; joursProteges: string[]; jokers: number
  tentatives: Tentative[]; commentaires: Commentaire[]; revisions: Revision[]; badges: string[]
  compositions: Composition[]; devoirs: Devoir[]; autoEvals: AutoEval[]; notionsLues: string[]
  lacunesDepuisRemediation: number
  reglages: { theme: 'auto' | 'clair' | 'sombre'; taille: number; sons: boolean; verrouSommeil: boolean; etude: number }
  ia?: { format: 'openai' | 'anthropic'; baseUrl: string; cle: string; modele: string }
  deverrouilleJusqua?: number
}

const CLE = 'secondeS.etat.v2'
const defaut: Etat = {
  xp: 0, jours: [], joursProteges: [], jokers: 2, tentatives: [], commentaires: [], revisions: [], badges: [],
  compositions: [], devoirs: [], autoEvals: [], notionsLues: [], lacunesDepuisRemediation: 0,
  reglages: { theme: 'auto', taille: 17, sons: true, verrouSommeil: true, etude: 40 },
}

function lire(): Etat {
  try {
    const s = localStorage.getItem(CLE)
    if (!s) return defaut
    const e = JSON.parse(s)
    return { ...defaut, ...e, reglages: { ...defaut.reglages, ...e.reglages } }
  } catch { return defaut }
}

let etat = lire()
const abonnes = new Set<() => void>()
export function maj(f: (e: Etat) => Etat) {
  etat = f(etat)
  try { localStorage.setItem(CLE, JSON.stringify(etat)) } catch { /* stockage indisponible : la session continue en mémoire */ }
  abonnes.forEach(a => a())
}
export function useEtat(): Etat {
  const [, set] = useState(0)
  useEffect(() => { const a = () => set(x => x + 1); abonnes.add(a); return () => { abonnes.delete(a) } }, [])
  return etat
}
export const etatCourant = (): Etat => etat

/* ---------- Notifications de gain (toasts) ---------- */
export interface Toast { id: number; texte: string; type: 'xp' | 'badge' | 'surprise' | 'niveau' | 'info' }
const ecouteursToast = new Set<(t: Toast) => void>()
let idToast = 0
export const toast = (texte: string, type: Toast['type'] = 'info') => ecouteursToast.forEach(f => f({ id: ++idToast, texte, type }))
export const surToast = (f: (t: Toast) => void) => { ecouteursToast.add(f); return () => { ecouteursToast.delete(f) } }

/* ---------- Dates ---------- */
const jourISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const aujourdhui = () => jourISO(new Date())
const decaler = (iso: string, n: number) => { const d = new Date(`${iso}T12:00:00`); d.setDate(d.getDate() + n); return jourISO(d) }
const JOUR = 86400000

/** Paliers de répétition espacée : J+1, J+3, J+7, J+14, J+30. */
export const PALIERS = [1, 3, 7, 14, 30]
export const niveau = (xp: number) => Math.floor(Math.sqrt(xp / 50)) + 1

/** Ajoute le jour courant ; un joker protège automatiquement un seul jour manqué. */
function marquerJour(e: Etat): Etat {
  const auj = aujourdhui()
  if (e.jours.includes(auj)) return e
  let { jokers, joursProteges } = e
  const hier = decaler(auj, -1), avantHier = decaler(auj, -2)
  const actif = (j: string) => e.jours.includes(j) || joursProteges.includes(j)
  if (!actif(hier) && actif(avantHier) && jokers > 0) {
    jokers--; joursProteges = [...joursProteges, hier]
    toast('🛡️ Un joker a protégé ta série (jour manqué hier).', 'info')
  }
  const suivant = { ...e, jours: [...e.jours, auj], jokers, joursProteges }
  const s = serie(suivant)
  if (s > 0 && s % 7 === 0 && jokers < 3) { suivant.jokers = jokers + 1; toast(`🔥 ${s} jours de suite : +1 joker !`, 'badge') }
  return suivant
}

export function serie(e: Etat): number {
  const actifs = new Set([...e.jours, ...e.joursProteges])
  let j = aujourdhui(), n = 0
  if (!actifs.has(j)) j = decaler(j, -1)
  while (actifs.has(j)) { n++; j = decaler(j, -1) }
  return n
}

/** Enregistre une réponse : XP, répétition espacée, lacunes, série, surprise. */
export function enregistrer(t: Tentative) {
  const avant = niveau(etat.xp)
  let gain = t.juste ? 10 + (t.indices === 0 ? 5 : 0) : 2
  const surprise = t.juste && Math.random() < 0.08
  if (surprise) gain += 25
  maj(e0 => {
    const e = marquerJour(e0)
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
      ...e, revisions, xp: e.xp + gain,
      tentatives: [...e.tentatives, t].slice(-3000),
      lacunesDepuisRemediation: e.lacunesDepuisRemediation + (lacune ? 1 : 0),
    }
  })
  if (surprise) toast('🎁 Récompense surprise : +25 XP !', 'surprise')
  if (niveau(etat.xp) > avant) toast(`⭐ Niveau ${niveau(etat.xp)} atteint !`, 'niveau')
  return { gain, surprise, niveauGagne: niveau(etat.xp) > avant }
}

export function gagnerXP(n: number, raison?: string) {
  const avant = niveau(etat.xp)
  maj(e => ({ ...marquerJour(e), xp: e.xp + n }))
  if (raison) toast(`+${n} XP · ${raison}`, 'xp')
  if (niveau(etat.xp) > avant) toast(`⭐ Niveau ${niveau(etat.xp)} atteint !`, 'niveau')
}

export function donnerBadge(id: string, nom: string) {
  if (etat.badges.includes(id)) return
  maj(e => ({ ...e, badges: [...e.badges, id], xp: e.xp + 50 }))
  toast(`🏅 Badge gagné : ${nom} (+50 XP)`, 'badge')
}

/** Lacunes : erreurs, indices massifs, commentaires « pas compris », auto-évaluations faibles, regroupées par notion. */
export function lacunes(e: Etat): { notion: string; score: number; derniere: number }[] {
  const m = new Map<string, { score: number; derniere: number }>()
  const ajoute = (n: string, d: number, p = 1) => { const x = m.get(n) ?? { score: 0, derniere: 0 }; m.set(n, { score: x.score + p, derniere: Math.max(x.derniere, d) }) }
  for (const t of e.tentatives) {
    if (!t.juste || t.indices >= 2) for (const n of t.notions) ajoute(n, t.date)
    else for (const n of t.notions) { const x = m.get(n); if (x) m.set(n, { ...x, score: x.score - 0.5 }) }
  }
  for (const c of e.commentaires) ajoute(c.cible, c.date, 1.5)
  for (const a of e.autoEvals) if (a.niveau === 1) ajoute(a.notion, a.date)
  return [...m].map(([notion, x]) => ({ notion, ...x })).filter(x => x.score > 0).sort((a, b) => b.score - a.score)
}
export function echecsRepetes(e: Etat, notion: string): number {
  let n = 0
  for (const t of [...e.tentatives].reverse()) { if (!t.notions.includes(notion)) continue; if (t.juste) break; n++ }
  return n
}
export const joursDepuis = (date: number) => Math.floor((Date.now() - date) / JOUR)
