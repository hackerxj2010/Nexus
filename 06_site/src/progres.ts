import calendrier from '../../03_structure/calendrier.json'
import type { Etat } from './store'
import type { ChapitreResume, MatiereResume } from './types'

export { calendrier }

/** Exercices réussis (ids distincts) d'un chapitre. */
export function reussis(e: Etat, chapitre: string): number {
  return new Set(e.tentatives.filter(t => t.juste && t.exo.startsWith(chapitre + '-')).map(t => t.exo)).size
}

/** 1★ = un tiers des exercices réussis, 2★ = deux tiers, 3★ = tous + boss (épreuve ≥ 14/20 ou test de chapitre). */
export function etoiles(e: Etat, c: ChapitreResume): number {
  if (!c.nbExercices) return 0
  const r = reussis(e, c.id) / c.nbExercices
  const boss = e.badges.includes(`boss:${c.id}`)
  return r >= 1 && boss ? 3 : r >= 2 / 3 ? 2 : r >= 1 / 3 ? 1 : 0
}

export function progresMatiere(e: Etat, m: MatiereResume): number {
  const total = m.chapitres.length * 3
  return total ? m.chapitres.reduce((s, c) => s + etoiles(e, c), 0) / total : 0
}

/** Semestre « en cours » d'après la date (sept.–janv. = 1, févr.–juil. = 2). */
export function semestreCourant(d = new Date()): 1 | 2 {
  const m = d.getMonth() + 1
  return m >= 8 || m === 1 ? 1 : 2
}

export interface Echeance { titre: string; date: string; matiere?: string; approximatif?: boolean; id?: string }

export function echeances(e: Etat): Echeance[] {
  const auj = new Date().toISOString().slice(0, 10)
  return [
    ...e.devoirs.map(d => ({ titre: d.titre, date: d.date, matiere: d.matiere, id: d.id })),
    ...calendrier.compositions_estimees.map(c => ({ titre: c.titre, date: c.date, approximatif: c.approximatif })),
  ].filter(x => x.date >= auj).sort((a, b) => a.date.localeCompare(b.date))
}

export const joursAvant = (date: string) => Math.ceil((new Date(`${date}T08:00:00`).getTime() - Date.now()) / 86400000)

/** Plan du jour : minutes par matière selon l'écart à 20, les matières faibles, le coefficient et les devoirs proches. */
export function planDuJour(e: Etat, matieres: MatiereResume[]) {
  const p = e.profil!
  const proches = echeances(e).filter(x => x.matiere && joursAvant(x.date) <= 7).map(x => x.matiere)
  const poids = matieres.map(m => {
    let w = (20 - (p.moyennes[m.id] ?? 10)) + 1
    if (p.faibles.includes(m.id)) w += 4
    if (m.programme?.coefficient) w *= 0.75 + m.programme.coefficient / 8
    if (proches.includes(m.id)) w *= 1.8
    return { m, w }
  })
  const total = poids.reduce((s, x) => s + x.w, 0) || 1
  const sem = semestreCourant()
  return poids.map(({ m, w }) => {
    const prochain = m.chapitres.filter(c => c.semestre === sem).find(c => etoiles(e, c) < 2) ?? m.chapitres.find(c => etoiles(e, c) < 2)
    return { m, minutes: Math.max(10, Math.round((w / total) * p.heuresParJour * 60 / 5) * 5), prochain, devoirProche: proches.includes(m.id) }
  }).sort((a, b) => b.minutes - a.minutes)
}

/** Prévision de moyenne : moyenne actuelle déclarée, rapprochée des résultats réels sur la plateforme. */
export function prevision(e: Etat, mat: string, idsNotions: Set<string>): { note: number; base: number; confiance: number } {
  const base = e.profil?.moyennes[mat] ?? 10
  const ts = e.tentatives.filter(t => t.notions.some(n => idsNotions.has(n)) && !t.exo.startsWith('flash:')).slice(-60)
  const comps = e.compositions.filter(c => c.matiere === mat).slice(-5)
  const mesures: number[] = []
  if (ts.length) mesures.push(ts.filter(t => t.juste).length / ts.length * 20)
  for (const c of comps) mesures.push(c.note / c.sur * 20)
  if (!mesures.length) return { note: base, base, confiance: 0 }
  const confiance = Math.min(1, (ts.length / 40) * 0.5 + comps.length * 0.15)
  const mesure = mesures.reduce((s, x) => s + x, 0) / mesures.length
  return { note: Math.round((base * (1 - confiance) + mesure * confiance) * 4) / 4, base, confiance }
}
