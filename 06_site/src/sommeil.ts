import { useEffect, useState } from 'react'
import type { Etat } from './store'

const minutes = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m }

/** Minutes écoulées depuis l'heure de coucher (négatif = avant), sur une journée glissante. */
export function ecartCoucher(coucher: string, maintenant = new Date()): number {
  let d = maintenant.getHours() * 60 + maintenant.getMinutes() - minutes(coucher)
  if (d > 12 * 60) d -= 24 * 60
  if (d < -12 * 60) d += 24 * 60
  return d
}

/** Vrai entre (coucher + 30 min) et l'heure de lever. */
export function dansNuit(coucher: string, lever: string, maintenant = new Date()): boolean {
  const n = maintenant.getHours() * 60 + maintenant.getMinutes()
  const debut = (minutes(coucher) + 30) % 1440, fin = minutes(lever)
  return debut <= fin ? n >= debut && n < fin : n >= debut || n < fin
}

export type EtatSommeil = 'normal' | 'bientot' | 'calme' | 'verrou'

export function useSommeil(e: Etat): EtatSommeil {
  const [maintenant, setMaintenant] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setMaintenant(new Date()), 30000); return () => clearInterval(t) }, [])
  if (!e.profil) return 'normal'
  if (e.deverrouilleJusqua && maintenant.getTime() < e.deverrouilleJusqua) return 'normal'
  const { coucher, lever } = e.profil
  if (e.reglages.verrouSommeil && dansNuit(coucher, lever, maintenant)) return 'verrou'
  const ecart = ecartCoucher(coucher, maintenant)
  if (ecart >= 0 && (dansNuit(coucher, lever, maintenant) || ecart < 30)) return 'calme'
  if (ecart >= -30 && ecart < 0) return 'bientot'
  return 'normal'
}

/** Minuteur d'étude : suggère une pause après `limite` minutes d'activité continue. */
export function usePause(limite: number) {
  const [debut, setDebut] = useState(() => Date.now())
  const [maintenant, setMaintenant] = useState(() => Date.now())
  useEffect(() => { const t = setInterval(() => setMaintenant(Date.now()), 30000); return () => clearInterval(t) }, [])
  const min = Math.floor((maintenant - debut) / 60000)
  return { min, pause: min >= limite, reset: () => { setDebut(Date.now()); setMaintenant(Date.now()) } }
}
