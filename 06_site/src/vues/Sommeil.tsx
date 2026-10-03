import { useEffect, useState } from 'react'
import { maj, serie, useEtat } from '../store'
import { lien } from '../routeur'

const PHRASE = 'je choisis de veiller ce soir'

export function Verrou() {
  const e = useEtat()
  const [txt, setTxt] = useState('')
  return <main className="ecran-nuit">
    <div className="lune" aria-hidden="true" />
    <h1>Bonne nuit {e.profil?.nom} 🌙</h1>
    <p>Pendant ton sommeil, ton cerveau trie et range ce que tu as appris aujourd'hui. Dormir, c'est encore réviser.</p>
    <p className="note">Série du jour sauvegardée : 🔥 {serie(e)}. Le site se rouvre à {e.profil?.lever}.</p>
    <details>
      <summary>J'ai vraiment besoin de continuer</summary>
      <p>Pour débloquer 20 minutes, tape : <b>« {PHRASE} »</b></p>
      <label htmlFor="phrase" className="visuellement-cache">Phrase de déblocage</label>
      <input id="phrase" value={txt} onChange={x => setTxt(x.target.value)} autoComplete="off" />
      <button disabled={txt.trim().toLowerCase() !== PHRASE} onClick={() => maj(s => ({ ...s, deverrouilleJusqua: Date.now() + 20 * 60000 }))}>Débloquer 20 min</button>
    </details>
  </main>
}

export function Calme() {
  return <section className="carte calme">
    <h1>😴 Mode calme</h1>
    <p>Il est l'heure de dormir : pas de nouvel exercice ce soir. Si tu veux vraiment, fais quelques fiches légères, puis éteins.</p>
    <a className="bouton principal" href={lien('revision')}>Quelques fiches</a> <a className="bouton" href={lien('')}>Accueil</a>
  </section>
}

/** Pause guidée : 5 minutes, respiration, s'hydrater, bouger. */
export function Pause({ fin }: { fin: () => void }) {
  const [reste, setReste] = useState(300)
  useEffect(() => { const t = setInterval(() => setReste(r => Math.max(0, r - 1)), 1000); return () => clearInterval(t) }, [])
  return <main className="ecran-pause">
    <h1>☕ Pause</h1>
    <p className="gros">{Math.floor(reste / 60)}:{String(reste % 60).padStart(2, '0')}</p>
    <div className="respiration" aria-hidden="true" />
    <ul>
      <li>💧 Bois un verre d'eau.</li>
      <li>🚶 Lève-toi, marche, étire-toi.</li>
      <li>👀 Regarde au loin (pas l'écran) pour reposer tes yeux.</li>
      <li>🫁 Inspire 4 s, expire 6 s, en suivant le cercle.</li>
    </ul>
    <button className="principal large" onClick={fin}>{reste ? 'Reprendre maintenant' : 'C\'est reparti !'}</button>
  </main>
}
