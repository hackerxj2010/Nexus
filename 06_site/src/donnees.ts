import { useEffect, useState } from 'react'
import type { Chapitre, DonneesMatiere, Epreuve, Exercice, Index, Notion } from './types'

let index: Index | undefined
const cache = new Map<string, DonneesMatiere>()
const enCours = new Map<string, Promise<DonneesMatiere>>()

export async function chargerIndex(): Promise<Index> {
  if (!index) index = await (await fetch('./data/index.json')).json()
  return index!
}
export const indexCharge = () => index

export function chargerMatiere(mat: string): Promise<DonneesMatiere> {
  if (cache.has(mat)) return Promise.resolve(cache.get(mat)!)
  if (!enCours.has(mat)) enCours.set(mat, fetch(`./data/${mat}.json`).then(r => r.json()).then(d => { cache.set(mat, d); return d }))
  return enCours.get(mat)!
}

export function useMatiere(mat: string | undefined): DonneesMatiere | undefined {
  const [d, setD] = useState(() => mat ? cache.get(mat) : undefined)
  useEffect(() => {
    if (!mat) return
    let actif = true
    chargerMatiere(mat).then(x => { if (actif) setD(x) })
    return () => { actif = false }
  }, [mat])
  return mat ? cache.get(mat) ?? d : undefined
}

/** Charge toutes les matières (pour le mélange, le suivi, la révision). */
export function useToutes(): Record<string, DonneesMatiere> | undefined {
  const [, set] = useState(0)
  const mats = index?.matieres.map(m => m.id) ?? []
  useEffect(() => { Promise.all(mats.map(chargerMatiere)).then(() => set(x => x + 1)) }, [mats.join()]) // eslint-disable-line react-hooks/exhaustive-deps
  return mats.every(m => cache.has(m)) ? Object.fromEntries(mats.map(m => [m, cache.get(m)!])) : undefined
}

export const matiereDe = (id: string) => id.startsWith('EP-') ? id.split('-')[1] : id.split('-')[0]
export const chapitreDe = (id: string) => id.split('-').slice(0, 3).join('-')
export const infoMatiere = (mat: string) => index?.matieres.find(m => m.id === mat)

export function trouverChapitre(d: DonneesMatiere | undefined, id: string): Chapitre | undefined { return d?.chapitres.find(c => c.id === id) }
export function trouverNotion(d: DonneesMatiere | undefined, id: string): Notion | undefined { return trouverChapitre(d, chapitreDe(id))?.notions.find(n => n.id === id) }
export function trouverExercice(d: DonneesMatiere | undefined, id: string): Exercice | undefined { return trouverChapitre(d, chapitreDe(id))?.exercices.find(e => e.id === id) }
export function trouverEpreuve(d: DonneesMatiere | undefined, id: string): Epreuve | undefined { return d?.epreuves.find(e => e.id === id) }

/** Titre d'une notion depuis l'index léger (sans charger la matière). */
export function titreNotion(id: string): string {
  for (const m of index?.matieres ?? []) for (const c of m.chapitres) { const n = c.notions.find(n => n.id === id); if (n) return n.titre }
  return id
}
