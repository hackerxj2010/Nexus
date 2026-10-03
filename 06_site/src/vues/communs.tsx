import { useEffect, useState } from 'react'
import { surToast, type Toast } from '../store'
import { pourAudio } from '../Riche'

export function Chargement() {
  return <div className="chargement" role="status"><span className="rond" /> Chargement…</div>
}

export function Toasts() {
  const [liste, setListe] = useState<Toast[]>([])
  useEffect(() => surToast(t => {
    setListe(l => [...l, t].slice(-2))
    setTimeout(() => setListe(l => l.filter(x => x.id !== t.id)), 3500)
  }), [])
  return <div className="toasts" aria-live="polite">{liste.map(t => <div key={t.id} className={`toast ${t.type}`}>{t.texte}</div>)}</div>
}

export function lireAudio(texte: string) {
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(pourAudio(texte))
    u.lang = 'fr-FR'; u.rate = 0.95
    const voix = speechSynthesis.getVoices().find(v => v.lang.startsWith('fr'))
    if (voix) u.voice = voix
    speechSynthesis.speak(u)
  } catch { /* synthèse vocale indisponible */ }
}
export const arreterAudio = () => { try { speechSynthesis.cancel() } catch { /* rien */ } }

export function BoutonAudio({ texte, label = 'Écouter' }: { texte: string; label?: string }) {
  const [lit, setLit] = useState(false)
  return <button className="mini" aria-label={label} onClick={() => { if (lit) { arreterAudio(); setLit(false) } else { lireAudio(texte); setLit(true) } }}>{lit ? '⏹' : '🔊'}</button>
}

export function Etoiles({ n, max = 3 }: { n: number; max?: number }) {
  return <span className="etoiles" aria-label={`${n} étoile(s) sur ${max}`}>{Array.from({ length: max }, (_, i) => i < n ? '★' : '☆').join('')}</span>
}

export function Difficulte({ n }: { n: number }) {
  return <span className="difficulte" title={`Difficulté ${n}/4`}>{'●'.repeat(n)}<span className="vide">{'●'.repeat(Math.max(0, 4 - n))}</span></span>
}

export function Pastille({ couleur, children }: { couleur?: string; children: React.ReactNode }) {
  return <span className="pastille" style={couleur ? { background: couleur } : undefined}>{children}</span>
}
