import { useEffect, useMemo, useState } from 'react'
import baseJson from '../../02_base_donnees/base.json'
import type { Base, Chapitre, Exercice, Matiere, Notion } from './types'
import type { Etat, Profil } from './store'
import { aujourdhui, echecsRepetes, etatCourant, enregistrer, lacunes, maj, niveau, serie, useEtat } from './store'
import { appelerIA, PROMPT_REMEDIATION, PROMPT_TUTEUR, resumeEleve, type Msg } from './ia'
import { sons } from './sons'

const base = baseJson as Base
const toutesNotions = base.matieres.flatMap(m => m.chapitres.flatMap(c => c.notions.map(n => ({ n, c, m }))))
const trouverNotion = (id: string) => toutesNotions.find(x => x.n.id === id)

type Vue =
  | { v: 'accueil' } | { v: 'matiere'; m: Matiere } | { v: 'chapitre'; m: Matiere; c: Chapitre }
  | { v: 'exo'; m: Matiere; c: Chapitre; e: Exercice; mode: 'entrainement' | 'devoir' }
  | { v: 'suivi' } | { v: 'reglages' } | { v: 'ia'; contexte?: string } | { v: 'revision' }

const normaliser = (s: string) => s.toLowerCase().replace(/\s+/g, '').replace(/,/g, '.').replace(/[{}]/g, '').replace(/−/g, '-')

/* ---------- Coach de sommeil ---------- */
function minutesAvantCoucher(coucher: string): number {
  const [h, m] = coucher.split(':').map(Number)
  const now = new Date(), c = new Date(now); c.setHours(h, m, 0, 0)
  let diff = (c.getTime() - now.getTime()) / 60000
  if (diff < -12 * 60) diff += 24 * 60
  return diff
}
function useSommeil(e: Etat) {
  const [, tick] = useState(0)
  useEffect(() => { const t = setInterval(() => tick(x => x + 1), 30000); return () => clearInterval(t) }, [])
  if (!e.profil) return 'normal' as const
  const avant = minutesAvantCoucher(e.profil.coucher)
  if (e.deverrouilleJusqua && Date.now() < e.deverrouilleJusqua) return 'normal' as const
  if (avant <= -30 && e.reglages.verrouSommeil) return 'verrou' as const
  if (avant <= 0) return 'calme' as const
  if (avant <= 30) return 'bientot' as const
  return 'normal' as const
}

function usePause() {
  const [debut, setDebut] = useState(Date.now())
  const [, tick] = useState(0)
  useEffect(() => { const t = setInterval(() => tick(x => x + 1), 60000); return () => clearInterval(t) }, [])
  const min = Math.floor((Date.now() - debut) / 60000)
  return { min, reset: () => setDebut(Date.now()) }
}

export default function App() {
  const e = useEtat()
  const [vue, setVue] = useState<Vue>({ v: 'accueil' })
  const sommeil = useSommeil(e)
  const pause = usePause()

  useEffect(() => {
    document.documentElement.dataset.theme = e.reglages.theme
    document.documentElement.style.fontSize = `${e.reglages.taille}px`
  }, [e.reglages.theme, e.reglages.taille])

  if (!e.profil) return <Inscription />
  if (sommeil === 'verrou') return <Verrou />

  return (
    <div className="app">
      <Entete e={e} aller={setVue} />
      {sommeil === 'bientot' && <div className="bandeau lune">🌙 Bientôt l'heure de dormir ({e.profil.coucher}). Termine ta série, puis va te coucher : ton cerveau consolide pendant le sommeil.</div>}
      {sommeil === 'calme' && <div className="bandeau lune">😴 Stop, va dormir ! Mode calme : seulement des révisions légères. Demain tu seras meilleur.</div>}
      {pause.min >= 40 && <div className="bandeau pause">☕ {pause.min} min d'étude : fais une pause de 5 à 10 minutes. <button onClick={pause.reset}>J'ai fait ma pause</button></div>}
      <main>
        {vue.v === 'accueil' && <Accueil e={e} aller={setVue} calme={sommeil === 'calme'} />}
        {vue.v === 'matiere' && <VueMatiere m={vue.m} e={e} aller={setVue} />}
        {vue.v === 'chapitre' && <VueChapitre m={vue.m} c={vue.c} aller={setVue} calme={sommeil === 'calme'} />}
        {vue.v === 'exo' && <VueExo {...vue} aller={setVue} />}
        {vue.v === 'suivi' && <Suivi e={e} aller={setVue} />}
        {vue.v === 'reglages' && <Reglages e={e} />}
        {vue.v === 'ia' && <ChatIA e={e} contexte={vue.contexte} />}
        {vue.v === 'revision' && <Revision e={e} />}
      </main>
      <nav className="barre">
        <button onClick={() => setVue({ v: 'accueil' })}>🗺️<span>Carte</span></button>
        <button onClick={() => setVue({ v: 'revision' })}>🃏<span>Révision</span></button>
        <button onClick={() => setVue({ v: 'suivi' })}>📊<span>Suivi</span></button>
        <button onClick={() => setVue({ v: 'ia' })}>🤖<span>Tuteur</span></button>
        <button onClick={() => setVue({ v: 'reglages' })}>⚙️<span>Réglages</span></button>
      </nav>
    </div>
  )
}

function Entete({ e, aller }: { e: Etat; aller: (v: Vue) => void }) {
  const lvl = niveau(e.xp), bas = (lvl - 1) ** 2 * 50, haut = lvl ** 2 * 50
  return (
    <header className="entete" onClick={() => aller({ v: 'accueil' })}>
      <div><strong>Niv. {lvl}</strong> <small>{e.xp} XP</small>
        <div className="jauge"><div style={{ width: `${((e.xp - bas) / (haut - bas)) * 100}%` }} /></div></div>
      <div title="Série de jours">🔥 {serie(e)} <small>🛡️{e.jokers}</small></div>
    </header>
  )
}

/* ---------- Inscription ---------- */
function Inscription() {
  const [p, setP] = useState<Profil>({
    nom: '', etablissement: '', moyennes: { M: 10, PC: 10, SVT: 10, FR: 10 }, faibles: [],
    heuresParJour: 2, coucher: '22:00', lever: '06:00', style: 'faire', prochainsDevoirs: '',
  })
  return (
    <div className="app"><main className="carte formulaire">
      <h1>Bienvenue 👋</h1>
      <p>Objectif : <strong>20/20</strong>. Dis-moi qui tu es pour que je construise ton plan.</p>
      <label>Prénom<input value={p.nom} onChange={x => setP({ ...p, nom: x.target.value })} /></label>
      <label>Établissement<input value={p.etablissement} onChange={x => setP({ ...p, etablissement: x.target.value })} /></label>
      <fieldset><legend>Moyenne actuelle par matière</legend>
        {base.matieres.map(m => (
          <label key={m.id}>{m.icone} {m.nom}
            <input type="number" min={0} max={20} step={0.25} value={p.moyennes[m.id]}
              onChange={x => setP({ ...p, moyennes: { ...p.moyennes, [m.id]: +x.target.value } })} />
          </label>))}
      </fieldset>
      <fieldset><legend>Matières faibles</legend>
        {base.matieres.map(m => (
          <label key={m.id} className="coche"><input type="checkbox" checked={p.faibles.includes(m.id)}
            onChange={x => setP({ ...p, faibles: x.target.checked ? [...p.faibles, m.id] : p.faibles.filter(f => f !== m.id) })} />{m.nom}</label>))}
      </fieldset>
      <label>Heures disponibles par jour<input type="number" min={0.5} max={8} step={0.5} value={p.heuresParJour} onChange={x => setP({ ...p, heuresParJour: +x.target.value })} /></label>
      <label>Heure de coucher<input type="time" value={p.coucher} onChange={x => setP({ ...p, coucher: x.target.value })} /></label>
      <label>Heure de lever<input type="time" value={p.lever} onChange={x => setP({ ...p, lever: x.target.value })} /></label>
      <label>Prochains devoirs / compositions<input placeholder="ex. DS maths 14/10" value={p.prochainsDevoirs} onChange={x => setP({ ...p, prochainsDevoirs: x.target.value })} /></label>
      <label>Tu apprends mieux en…
        <select value={p.style} onChange={x => setP({ ...p, style: x.target.value as Profil['style'] })}>
          <option value="lire">lisant</option><option value="ecouter">écoutant</option><option value="voir">voyant</option><option value="faire">faisant</option>
        </select></label>
      <button className="principal" disabled={!p.nom} onClick={() => maj(e => ({ ...e, profil: p }))}>Créer mon plan 🚀</button>
    </main></div>
  )
}

/* ---------- Plan d'étude ---------- */
function plan(e: Etat): { m: Matiere; minutes: number }[] {
  const p = e.profil!
  const poids = base.matieres.map(m => ({ m, w: (20 - (p.moyennes[m.id] ?? 10)) + (p.faibles.includes(m.id) ? 4 : 0) + 1 }))
  const total = poids.reduce((s, x) => s + x.w, 0)
  return poids.map(x => ({ m: x.m, minutes: Math.round((x.w / total) * p.heuresParJour * 60 / 5) * 5 }))
}

function Accueil({ e, aller, calme }: { e: Etat; aller: (v: Vue) => void; calme: boolean }) {
  const aReviser = e.revisions.filter(r => r.prochaine <= Date.now())
  const top = lacunes(e)[0]
  return (<>
    <section className="carte">
      <h2>Salut {e.profil!.nom} !</h2>
      {aReviser.length > 0 && <p>🃏 <strong>{aReviser.length}</strong> notion(s) à réviser aujourd'hui. <button onClick={() => aller({ v: 'revision' })}>Réviser</button></p>}
      {top && !calme && <p>🔁 Reprends « {trouverNotion(top.notion)?.n.titre} » : tu as eu du mal dessus.</p>}
      {!calme && <><h3>Ton plan du jour</h3>
        <ul className="plan">{plan(e).map(x => <li key={x.m.id} style={{ borderColor: x.m.couleur }}>{x.m.icone} {x.m.nom} — {x.minutes} min</li>)}</ul></>}
    </section>
    {!calme && <section className="grille">
      {base.matieres.map(m => {
        const ids = m.chapitres.flatMap(c => c.exercices.map(x => x.id))
        const faits = new Set(e.tentatives.filter(t => t.juste && ids.includes(t.exo)).map(t => t.exo)).size
        return (
          <button key={m.id} className="monde" style={{ background: m.couleur }} onClick={() => aller({ v: 'matiere', m })}>
            <span className="icone">{m.icone}</span>{m.nom}
            <small>{faits}/{ids.length} exercices réussis</small>
          </button>)
      })}
    </section>}
    <p className="note">ℹ️ {base.avertissement}</p>
  </>)
}

function VueMatiere({ m, e, aller }: { m: Matiere; e: Etat; aller: (v: Vue) => void }) {
  return (<section>
    <h2 style={{ color: m.couleur }}>{m.icone} {m.nom}</h2>
    {[1, 2].map(s => (<div key={s}><h3>Semestre {s}</h3>
      <ol className="chemin">{m.chapitres.filter(c => c.semestre === s).map(c => {
        const badge = e.badges.includes(c.id)
        return <li key={c.id}><button style={{ borderColor: m.couleur }} onClick={() => aller({ v: 'chapitre', m, c })}>
          {badge ? '🏅' : '⭐'} {c.titre}</button></li>
      })}</ol></div>))}
  </section>)
}

/* ---------- Cours ---------- */
function VueChapitre({ m, c, aller, calme }: { m: Matiere; c: Chapitre; aller: (v: Vue) => void; calme: boolean }) {
  const exos = [...c.exercices].sort((a, b) => a.difficulte - b.difficulte)
  return (<section style={{ '--mat': m.couleur } as React.CSSProperties}>
    <h2 className="titre-chap">{c.titre}</h2>
    {c.notions.map(n => <CarteNotion key={n.id} n={n} aller={aller} />)}
    {!calme && <div className="carte">
      <h3>🎯 Exercices</h3>
      {exos.length === 0 && <p>Pas encore d'exercice pour ce chapitre (voir rapport de lacunes).</p>}
      {exos.map((x, i) => (
        <div key={x.id} className="ligne-exo">
          <span>{'●'.repeat(x.difficulte)} Exercice {i + 1} {x.authentique ? '🏛️' : <em className="inspire">type inspiré</em>}</span>
          <span><button onClick={() => aller({ v: 'exo', m, c, e: x, mode: 'entrainement' })}>S'entraîner</button>
            <button onClick={() => aller({ v: 'exo', m, c, e: x, mode: 'devoir' })}>⏱️ Chrono</button></span>
        </div>))}
      {exos.length > 0 && <p className="note">👾 Boss de fin de chapitre : réussis tous les exercices pour gagner le badge 🏅. Les devoirs authentiques seront ajoutés quand ils seront sourcés.</p>}
    </div>}
  </section>)
}

function lireAudio(texte: string) {
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(texte); u.lang = 'fr-FR'; speechSynthesis.speak(u) } catch { /* indisponible */ }
}

function CarteNotion({ n, aller }: { n: Notion; aller: (v: Vue) => void }) {
  const [niv, setNiv] = useState<'phrase' | 'simple' | 'complete'>('simple')
  const [comm, setComm] = useState('')
  const [quiz, setQuiz] = useState<number | null>(null)
  return (<article className="carte notion">
    <h3>{n.titre} <button className="mini" aria-label="Écouter" onClick={() => lireAudio(`${n.titre}. ${n.definition}. ${n.niveaux.simple}`)}>🔊</button></h3>
    <div className="encadre def"><b>Définition</b><p>{n.definition}</p></div>
    {n.formules.length > 0 && <div className="encadre theo"><b>Formules</b><ul>{n.formules.map(f => <li key={f}>{f}</li>)}</ul></div>}
    <div className="onglets">{(['phrase', 'simple', 'complete'] as const).map(k =>
      <button key={k} className={niv === k ? 'actif' : ''} onClick={() => setNiv(k)}>{{ phrase: 'En 1 phrase', simple: 'Simple', complete: 'Complète' }[k]}</button>)}</div>
    <p className="explication">{n.niveaux[niv]}</p>
    <div className="encadre rappel"><b>🔙 Rappel</b><p>{n.rappel_anterieur}</p></div>
    <div className="encadre methode"><b>💡 Astuces</b><ul>{n.astuces.map(a => <li key={a}>{a}</li>)}</ul></div>
    <div className="encadre piege"><b>⚠️ Pièges</b><ul>{n.erreurs_frequentes.map(a => <li key={a}>{a}</li>)}</ul></div>
    {n.flash[0] && <div className="quiz"><b>Mini-quiz :</b> {n.flash[0].q}
      {quiz === null ? <button onClick={() => setQuiz(0)}>Voir la réponse</button> : <p>➡️ {n.flash[0].r}</p>}</div>}
    <details><summary>🙋 Je n'ai pas compris</summary>
      <textarea value={comm} onChange={x => setComm(x.target.value)} placeholder="Qu'est-ce qui bloque ?" />
      <button onClick={() => { maj(e => ({ ...e, commentaires: [...e.commentaires, { cible: n.id, texte: comm || 'pas compris', date: Date.now() }], lacunesDepuisRemediation: e.lacunesDepuisRemediation + 1 })); setComm('') }}>Enregistrer</button>
      <button onClick={() => aller({ v: 'ia', contexte: `${n.titre} : ${n.definition}\n${n.niveaux.complete}` })}>Demander au tuteur</button>
    </details>
  </article>)
}

/* ---------- Exercice ---------- */
function VueExo({ m, c, e: x, mode, aller }: { m: Matiere; c: Chapitre; e: Exercice; mode: 'entrainement' | 'devoir'; aller: (v: Vue) => void }) {
  const etat = useEtat()
  const [rep, setRep] = useState('')
  const [indices, setIndices] = useState(0)
  const [resultat, setResultat] = useState<boolean | null>(null)
  const [debut] = useState(Date.now())
  const [, tick] = useState(0)
  useEffect(() => { const t = setInterval(() => tick(v => v + 1), 1000); return () => clearInterval(t) }, [])
  const ecoule = Math.floor((Date.now() - debut) / 1000)

  function valider() {
    const juste = normaliser(rep) === normaliser(x.reponse_attendue)
    const avant = niveau(etat.xp)
    enregistrer({ exo: x.id, notions: x.notions, juste, temps: ecoule, indices, date: Date.now() })
    setResultat(juste)
    const apres = etatCourant()
    if (etat.reglages.sons) (niveau(apres.xp) > avant ? sons.niveau : juste ? sons.juste : sons.erreur)()
    const reussis = new Set(apres.tentatives.filter(t => t.juste).map(t => t.exo))
    if (c.exercices.length > 0 && c.exercices.every(ex => reussis.has(ex.id)) && !apres.badges.includes(c.id))
      maj(s => ({ ...s, badges: [...s.badges, c.id], xp: s.xp + 50 }))
  }
  const doitRemedier = resultat === false && (etat.lacunesDepuisRemediation >= 10 || x.notions.some(n => echecsRepetes(etat, n) >= 3))

  return (<section className="carte" style={{ borderTop: `6px solid ${m.couleur}` }}>
    <p className="note">{x.authentique ? `🏛️ Épreuve authentique — ${x.source?.etablissement ?? ''} ${x.source?.annee ?? ''}` : '✏️ Exercice de type inspiré (non issu d\'une épreuve réelle)'}</p>
    {mode === 'devoir' && <p className="chrono">⏱️ {Math.floor(ecoule / 60)}:{String(ecoule % 60).padStart(2, '0')}</p>}
    <h3>{x.enonce}</h3>
    <input value={rep} onChange={v => setRep(v.target.value)} placeholder="Ta réponse" disabled={resultat !== null} onKeyDown={k => k.key === 'Enter' && valider()} />
    {resultat === null && <div className="actions">
      <button className="principal" onClick={valider}>Valider</button>
      {mode === 'entrainement' && indices < x.indices.length && <button onClick={() => setIndices(indices + 1)}>💡 Indice ({indices}/{x.indices.length})</button>}
    </div>}
    {x.indices.slice(0, indices).map(i => <p key={i} className="indice">💡 {i}</p>)}
    {resultat !== null && <div className={resultat ? 'bravo' : 'rate'}>
      <h3>{resultat ? '🎉 Bravo !' : '🤏 Presque — regarde le corrigé'}</h3>
      <ol>{x.corrige.map((l, i) => <li key={i}>{l} <small>({x.bareme[i] ?? 0} pt)</small></li>)}</ol>
      {doitRemedier && <Remediation notions={x.notions} aller={aller} />}
      <button onClick={() => aller({ v: 'chapitre', m, c })}>Retour au chapitre</button>
    </div>}
  </section>)
}

/* ---------- Remédiation ---------- */
function Remediation({ notions, aller }: { notions: string[]; aller: (v: Vue) => void }) {
  const e = useEtat()
  const x = trouverNotion(notions[0])
  if (!x) return null
  if (e.ia) return <div className="encadre rappel"><b>🧠 Séance de récupération</b>
    <p>Tu accumules des lacunes. Lance une séance guidée avec le tuteur.</p>
    <button onClick={() => { maj(s => ({ ...s, lacunesDepuisRemediation: 0 })); aller({ v: 'ia', contexte: `REMEDIATION:${x.n.id}` }) }}>Commencer</button></div>
  return <div className="encadre rappel"><b>🧠 Récupération (sans IA)</b>
    <p><b>En une phrase :</b> {x.n.niveaux.phrase}</p><p><b>Simple :</b> {x.n.niveaux.simple}</p>
    <p><b>Rappel :</b> {x.n.rappel_anterieur}</p>
    {x.n.flash.map(f => <p key={f.q}>🃏 {f.q} → <i>{f.r}</i></p>)}
    <button onClick={() => maj(s => ({ ...s, lacunesDepuisRemediation: 0 }))}>J'ai relu</button></div>
}

/* ---------- Révision espacée ---------- */
function Revision({ e }: { e: Etat }) {
  const dues = e.revisions.filter(r => r.prochaine <= Date.now())
  const cartes = (dues.length ? dues.map(r => r.notion) : toutesNotions.slice(0, 3).map(x => x.n.id))
    .flatMap(id => (trouverNotion(id)?.n.flash ?? []).map(f => ({ id, f })))
  const [i, setI] = useState(0)
  const [vu, setVu] = useState(false)
  if (!cartes.length) return <p className="carte">Rien à réviser 🎉</p>
  if (i >= cartes.length) return <p className="carte">✅ Révision terminée ! +{cartes.length * 3} XP</p>
  const { id, f } = cartes[i]
  const noter = (ok: boolean) => {
    enregistrer({ exo: `flash:${id}`, notions: [id], juste: ok, temps: 0, indices: 0, date: Date.now() })
    if (e.reglages.sons) (ok ? sons.juste : sons.erreur)()
    setVu(false); setI(i + 1)
  }
  return (<section className="carte flash">
    <small>{dues.length ? 'Révision espacée (J+1, J+3, J+7, J+14, J+30)' : 'Échauffement'} — {i + 1}/{cartes.length}</small>
    <h3>{f.q}</h3>
    {vu ? <><p className="reponse">{f.r}</p><div className="actions"><button onClick={() => noter(false)}>😕 Raté</button><button className="principal" onClick={() => noter(true)}>😀 Su</button></div></>
      : <button className="principal" onClick={() => setVu(true)}>Retourner la carte</button>}
  </section>)
}

/* ---------- Maître de suivi ---------- */
function Suivi({ e, aller }: { e: Etat; aller: (v: Vue) => void }) {
  const parMat = base.matieres.map(m => {
    const ids = new Set(m.chapitres.flatMap(c => c.notions.map(n => n.id)))
    const ts = e.tentatives.filter(t => t.notions.some(n => ids.has(n)))
    const taux = ts.length ? ts.filter(t => t.juste).length / ts.length : null
    const actuelle = e.profil!.moyennes[m.id] ?? 10
    const prevision = taux === null ? actuelle : Math.round((actuelle * 0.5 + taux * 20 * 0.5) * 4) / 4
    return { m, n: ts.length, taux, prevision }
  })
  const l = lacunes(e).slice(0, 6)
  return (<section>
    <h2>📊 Maître de suivi</h2>
    <div className="carte">{parMat.map(x => (
      <div key={x.m.id} className="ligne-exo"><span>{x.m.icone} {x.m.nom}</span>
        <span>{x.taux === null ? '—' : `${Math.round(x.taux * 100)} % juste`} · prévision <b>{x.prevision}/20</b></span></div>))}
    </div>
    <div className="carte"><h3>Lacunes à combler</h3>
      {l.length === 0 ? <p>Aucune pour l'instant 💪</p> : <ul>{l.map(x => <li key={x.notion}>{trouverNotion(x.notion)?.n.titre ?? x.notion} — {x.score} signal(aux)</li>)}</ul>}
      {l.length > 0 && <button onClick={() => aller({ v: 'revision' })}>Réviser maintenant</button>}
    </div>
    <div className="carte"><h3>Badges</h3><p>{e.badges.length ? e.badges.map(b => `🏅 ${b}`).join(' ') : 'Termine un chapitre pour gagner ton premier badge.'}</p>
      <p>{e.tentatives.length} réponses enregistrées · {e.commentaires.length} commentaires · {e.jours.length} jours actifs</p></div>
  </section>)
}

/* ---------- Tuteur IA ---------- */
function ChatIA({ e, contexte }: { e: Etat; contexte?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [texte, setTexte] = useState('')
  const [charge, setCharge] = useState(false)
  const [err, setErr] = useState('')
  const remed = contexte?.startsWith('REMEDIATION:') ? trouverNotion(contexte.slice(12)) : undefined
  const systeme = useMemo(() => {
    let s = remed ? PROMPT_REMEDIATION : PROMPT_TUTEUR
    s += `\n\nProfil compact de l'élève : ${resumeEleve(e, base)}`
    if (remed) s += `\n\nNotion à remédier : ${remed.n.titre}\nCours : ${remed.n.definition}\n${remed.n.niveaux.complete}\nPrérequis : ${remed.c.prerequis.join(', ')}`
    else if (contexte) s += `\n\nPage ouverte par l'élève :\n${contexte}`
    return s
  }, [e, contexte, remed])

  async function envoyer(t: string) {
    if (!e.ia) return
    const nv = [...msgs, { role: 'user' as const, content: t }]
    setMsgs(nv); setTexte(''); setCharge(true); setErr('')
    try { setMsgs([...nv, { role: 'assistant', content: await appelerIA(e.ia, systeme, nv) }]) } catch (x) { setErr(String(x)) }
    setCharge(false)
  }
  useEffect(() => { if (remed && e.ia && msgs.length === 0) envoyer('Lance ma séance de récupération.') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!e.ia) return <section className="carte"><h2>🤖 Tuteur IA</h2><p>Le site marche entièrement sans IA. Pour activer le tuteur, configure un fournisseur dans ⚙️ Réglages.</p></section>
  return (<section className="carte chat">
    <h2>🤖 Tuteur {remed && `— ${remed.n.titre}`}</h2>
    {msgs.map((m, i) => <div key={i} className={`bulle ${m.role}`}>{m.content}</div>)}
    {charge && <div className="bulle assistant">…</div>}
    {err && <p className="rate">{err}</p>}
    <div className="actions"><input value={texte} onChange={x => setTexte(x.target.value)} onKeyDown={k => k.key === 'Enter' && texte && envoyer(texte)} placeholder="Pose ta question ou explique ton raisonnement" />
      <button className="principal" disabled={!texte || charge} onClick={() => envoyer(texte)}>Envoyer</button></div>
  </section>)
}

/* ---------- Réglages ---------- */
function Reglages({ e }: { e: Etat }) {
  const [ia, setIa] = useState(e.ia ?? { format: 'openai' as const, baseUrl: 'https://api.openai.com/v1', cle: '', modele: '' })
  const [test, setTest] = useState('')
  const r = e.reglages
  const setR = (p: Partial<Etat['reglages']>) => maj(s => ({ ...s, reglages: { ...s.reglages, ...p } }))
  return (<section>
    <h2>⚙️ Réglages</h2>
    <div className="carte formulaire">
      <label className="coche"><input type="checkbox" checked={r.theme === 'sombre'} onChange={x => setR({ theme: x.target.checked ? 'sombre' : 'clair' })} />Thème sombre</label>
      <label>Taille du texte : {r.taille}px<input type="range" min={14} max={24} value={r.taille} onChange={x => setR({ taille: +x.target.value })} /></label>
      <label className="coche"><input type="checkbox" checked={r.sons} onChange={x => setR({ sons: x.target.checked })} />Sons</label>
      <label className="coche"><input type="checkbox" checked={r.verrouSommeil} onChange={x => setR({ verrouSommeil: x.target.checked })} />Verrouiller le site 30 min après l'heure de coucher</label>
      <label>Heure de coucher<input type="time" value={e.profil!.coucher} onChange={x => maj(s => ({ ...s, profil: { ...s.profil!, coucher: x.target.value } }))} /></label>
    </div>
    <div className="carte formulaire">
      <h3>🤖 Tunnel IA</h3>
      <p className="note">🔒 La clé reste uniquement sur cet appareil et n'est envoyée qu'à l'URL du fournisseur choisi.</p>
      <label>Format<select value={ia.format} onChange={x => setIa({ ...ia, format: x.target.value as 'openai' | 'anthropic', baseUrl: x.target.value === 'anthropic' ? 'https://api.anthropic.com' : 'https://api.openai.com/v1' })}>
        <option value="openai">Compatible OpenAI (/chat/completions)</option><option value="anthropic">Anthropic (/v1/messages)</option></select></label>
      <label>URL de base<input value={ia.baseUrl} onChange={x => setIa({ ...ia, baseUrl: x.target.value })} /></label>
      <label>Clé API<input type="password" value={ia.cle} onChange={x => setIa({ ...ia, cle: x.target.value })} /></label>
      <label>Modèle<input value={ia.modele} onChange={x => setIa({ ...ia, modele: x.target.value })} /></label>
      <div className="actions">
        <button className="principal" onClick={() => maj(s => ({ ...s, ia }))}>Enregistrer</button>
        <button onClick={async () => { setTest('Test…'); try { await appelerIA(ia, 'Réponds « ok ».', [{ role: 'user', content: 'test' }]); setTest('✅ Connexion réussie') } catch (x) { setTest(`❌ ${x}`) } }}>Tester la connexion</button>
        <button onClick={() => { maj(s => ({ ...s, ia: undefined })); setIa({ ...ia, cle: '' }) }}>Effacer la clé</button>
      </div>
      {test && <p>{test}</p>}
    </div>
    <div className="carte"><button onClick={() => { if (confirm('Effacer tout ton profil et ta progression ?')) { localStorage.clear(); location.reload() } }}>Réinitialiser</button></div>
  </section>)
}

/* ---------- Verrou de sommeil ---------- */
function Verrou() {
  const [txt, setTxt] = useState('')
  const phrase = 'je choisis de veiller'
  return (<div className="app verrou"><main className="carte">
    <h1>🌙 Bonne nuit</h1>
    <p>Ton cerveau range maintenant ce que tu as appris aujourd'hui. Le site se rouvre demain matin.</p>
    <p>Série du jour sauvegardée ✅ ({aujourdhui()})</p>
    <details><summary>J'ai vraiment besoin de continuer</summary>
      <p>Tape « {phrase} » pour débloquer 20 minutes.</p>
      <input value={txt} onChange={x => setTxt(x.target.value)} />
      <button disabled={txt.trim().toLowerCase() !== phrase} onClick={() => maj(e => ({ ...e, deverrouilleJusqua: Date.now() + 20 * 60000 }))}>Débloquer</button>
    </details>
  </main></div>)
}
