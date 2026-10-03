import { useEffect, useState } from 'react'
import { chargerIndex, indexCharge, matiereDe, useMatiere, trouverNotion } from './donnees'
import { niveau, serie, useEtat, type Etat } from './store'
import { useRoute, lien } from './routeur'
import { useSommeil, usePause } from './sommeil'
import { Chargement, Toasts } from './vues/communs'
import { Inscription } from './vues/Inscription'
import { Accueil } from './vues/Accueil'
import { VueMatiere } from './vues/Matiere'
import { VueChapitre } from './vues/Chapitre'
import { VueNotion } from './vues/Notion'
import { VueExercice, VueMelange } from './vues/Exercice'
import { VueEpreuve } from './vues/Epreuve'
import { Revision } from './vues/Revision'
import { Suivi } from './vues/Suivi'
import { Calendrier } from './vues/Calendrier'
import { Reglages } from './vues/Reglages'
import { Tuteur } from './vues/Tuteur'
import { Remediation } from './vues/Remediation'
import { Verrou, Calme, Pause } from './vues/Sommeil'

export default function App() {
  const e = useEtat()
  const [pret, setPret] = useState(!!indexCharge())
  const [erreur, setErreur] = useState('')
  useEffect(() => { if (!pret) chargerIndex().then(() => setPret(true), () => setErreur('Impossible de charger les cours. Vérifie ta connexion pour la première ouverture.')) }, [pret])
  useEffect(() => {
    const r = document.documentElement
    r.dataset.mode = e.reglages.theme
    r.style.fontSize = `${e.reglages.taille}px`
  }, [e.reglages.theme, e.reglages.taille])

  if (erreur) return <main className="app"><p className="carte">{erreur}</p></main>
  if (!pret) return <main className="app"><Chargement /></main>
  if (!e.profil) return <Inscription />
  return <Coquille e={e} />
}

function Coquille({ e }: { e: Etat }) {
  const r = useRoute()
  const sommeil = useSommeil(e)
  const pause = usePause(e.reglages.etude)
  const [enPause, setEnPause] = useState(false)
  const mat = r.id && ['c', 'n', 'x', 'e', 'm', 'remediation'].includes(r.page) ? matiereDe(r.id) : undefined
  const donnees = useMatiere(mat)

  if (sommeil === 'verrou') return <Verrou />
  if (enPause) return <Pause fin={() => { setEnPause(false); pause.reset() }} />

  // Mode calme : pas de nouveaux contenus, seulement de la révision légère.
  const nouveau = ['x', 'e', 'melange'].includes(r.page) || (r.page === 'n' && r.id && !e.notionsLues.includes(r.id))
  const vue = sommeil === 'calme' && nouveau ? <Calme /> : (() => {
    switch (r.page) {
      case 'm': return <VueMatiere mat={r.id!} onglet={r.params.get('onglet') ?? undefined} />
      case 'c': return donnees ? <VueChapitre d={donnees} id={r.id!} /> : <Chargement />
      case 'n': return donnees ? <VueNotion d={donnees} id={r.id!} /> : <Chargement />
      case 'x': return donnees ? <VueExercice d={donnees} id={r.id!} mode={r.params.get('mode') === 'chrono' ? 'chrono' : 'entrainement'} /> : <Chargement />
      case 'melange': return <VueMelange mat={r.params.get('mat') ?? undefined} />
      case 'e': return donnees ? <VueEpreuve d={donnees} id={r.id!} mode={r.params.get('mode') === 'composition' ? 'composition' : 'entrainement'} /> : <Chargement />
      case 'revision': return <Revision mat={r.params.get('mat') ?? undefined} />
      case 'suivi': return <Suivi />
      case 'calendrier': return <Calendrier />
      case 'reglages': return <Reglages />
      case 'tuteur': return <Tuteur />
      case 'remediation': return donnees ? <Remediation d={donnees} notion={trouverNotion(donnees, r.id!)} /> : <Chargement />
      default: return <Accueil calme={sommeil === 'calme'} />
    }
  })()

  return (
    <div className="app">
      <Entete e={e} />
      {sommeil === 'bientot' && <div className="bandeau nuit" role="status">🌙 Dans moins de 30 minutes c'est l'heure de dormir ({e.profil!.coucher}). Termine ce que tu fais : ton cerveau range ce que tu as appris pendant le sommeil.</div>}
      {sommeil === 'calme' && <div className="bandeau nuit" role="status">😴 C'est l'heure de dormir. Mode calme : seulement des révisions légères. Demain tu seras meilleur.</div>}
      {pause.pause && sommeil === 'normal' && <div className="bandeau pause" role="status">
        <span>☕ {pause.min} min d'étude : une pause de 5 à 10 min aide ta mémoire.</span>
        <span><button onClick={() => setEnPause(true)}>Faire une pause</button><button className="discret" onClick={pause.reset}>Plus tard</button></span>
      </div>}
      <main id="contenu">{vue}</main>
      <Toasts />
      <nav className="barre" aria-label="Navigation principale">
        {[['', '🗺️', 'Carte'], ['revision', '🃏', 'Révision'], ['suivi', '📊', 'Suivi'], ['tuteur', '🤖', 'Tuteur'], ['reglages', '⚙️', 'Réglages']].map(([p, i, t]) =>
          <a key={p} href={lien(p)} className={r.page === p ? 'actif' : ''} aria-current={r.page === p ? 'page' : undefined}><span aria-hidden="true">{i}</span>{t}</a>)}
      </nav>
    </div>
  )
}

function Entete({ e }: { e: Etat }) {
  const lvl = niveau(e.xp), bas = (lvl - 1) ** 2 * 50, haut = lvl ** 2 * 50
  const s = serie(e)
  return (
    <header className="entete">
      <a href={lien('')} className="marque" aria-label="Accueil">Objectif <b>20</b></a>
      <div className="niveau" title={`${e.xp} XP — encore ${haut - e.xp} XP pour le niveau ${lvl + 1}`}>
        <span>Niv. <b>{lvl}</b></span>
        <div className="jauge" role="progressbar" aria-valuemin={bas} aria-valuemax={haut} aria-valuenow={e.xp}><div style={{ width: `${((e.xp - bas) / (haut - bas)) * 100}%` }} /></div>
      </div>
      <a href={lien('calendrier')} className="serie" title={`Série de ${s} jour(s) — ${e.jokers} joker(s)`}>🔥 <b>{s}</b> <small>🛡️{e.jokers}</small></a>
    </header>
  )
}
