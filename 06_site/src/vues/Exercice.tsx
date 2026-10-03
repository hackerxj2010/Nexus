import { useEffect, useMemo, useState } from 'react'
import { chapitreDe, infoMatiere, trouverChapitre, trouverExercice, useToutes } from '../donnees'
import { donnerBadge, echecsRepetes, enregistrer, etatCourant, lacunes, useEtat } from '../store'
import { lien } from '../routeur'
import { sons } from '../sons'
import type { DonneesMatiere, Exercice } from '../types'
import { Riche } from '../Riche'
import { Chargement, Difficulte } from './communs'

/* ---------- Comparaison des réponses courtes ---------- */
const normaliser = (s: string) => s.toLowerCase().normalize('NFC')
  .replace(/\$/g, '').replace(/\\,|\s+/g, '').replace(/[−–]/g, '-').replace(/,/g, '.').replace(/[{}]/g, '')
  .replace(/^(s|x|n|a|p|v|m|t|r|i|u)=/, '').replace(/\.$/, '').replace(/;/g, ';')
function nombre(s: string): number | null {
  const t = normaliser(s).replace(/×10\^?/, 'e').replace(/x10\^?/, 'e')
  const f = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/)
  if (f) return +f[1] / +f[2]
  return /^-?\d+(\.\d+)?(e-?\d+)?$/.test(t) ? +t : null
}
export function reponseJuste(saisie: string, acceptees: string[]): boolean {
  const a = normaliser(saisie)
  if (!a) return false
  return acceptees.some(r => {
    if (normaliser(r) === a) return true
    const x = nombre(saisie), y = nombre(r)
    return x !== null && y !== null && Math.abs(x - y) <= 1e-9 + Math.abs(y) * 1e-6
  })
}

/* ---------- Carte d'exercice (utilisée seule ou dans une série) ---------- */
export function CarteExercice({ x, mode, couleur, onFini, titreSuite }: {
  x: Exercice; mode: 'entrainement' | 'chrono'; couleur: string; onFini?: (juste: boolean) => void; titreSuite?: string
}) {
  const e = useEtat()
  const [saisie, setSaisie] = useState('')
  const [choix, setChoix] = useState<number | null>(null)
  const [indices, setIndices] = useState(0)
  const [phase, setPhase] = useState<'question' | 'auto' | 'fini'>('question')
  const [coches, setCoches] = useState<boolean[]>(() => x.corrige.map(() => false))
  const [juste, setJuste] = useState(false)
  const [debut] = useState(() => Date.now())
  const [maintenant, setMaintenant] = useState(() => Date.now())
  useEffect(() => { if (phase === 'fini') return; const t = setInterval(() => setMaintenant(Date.now()), 1000); return () => clearInterval(t) }, [phase])
  const ecoule = Math.floor((maintenant - debut) / 1000)
  const total = x.bareme.reduce((s, b) => s + b, 0)

  function terminer(ok: boolean, score?: number) {
    setJuste(ok); setPhase('fini')
    enregistrer({ exo: x.id, notions: x.notions, juste: ok, temps: Math.floor((Date.now() - debut) / 1000), indices, date: Date.now(), score, chrono: mode === 'chrono' })
    if (etatCourant().reglages.sons) (ok ? sons.juste : sons.erreur)()
  }
  function valider() {
    if (x.format === 'qcm') terminer(choix === x.bonne_reponse)
    else if (x.format === 'reponse_courte') terminer(reponseJuste(saisie, x.reponses_acceptees ?? []))
    else setPhase('auto')
  }
  const score = x.bareme.reduce((s, b, i) => s + (coches[i] ? b : 0), 0)
  const remedier = phase === 'fini' && !juste && (e.lacunesDepuisRemediation >= 10 || x.notions.some(n => echecsRepetes(e, n) >= 3))

  return (<section className="carte exercice" style={{ '--mat': couleur } as React.CSSProperties}>
    <div className="exo-entete">
      <span className="note">{x.authentique ? '🏛️ Exercice d\'épreuve réelle' : '✏️ Exercice type inspiré'}</span>
      <Difficulte n={x.difficulte} />
      {mode === 'chrono' && <span className="chrono" aria-live="off">⏱️ {Math.floor(ecoule / 60)}:{String(ecoule % 60).padStart(2, '0')}</span>}
    </div>
    <div className="enonce"><Riche texte={x.enonce} /></div>

    {phase === 'question' && <>
      {x.format === 'qcm' && <div className="choix" role="radiogroup">
        {x.choix?.map((c, i) => <button key={i} role="radio" aria-checked={choix === i} className={choix === i ? 'actif' : ''} onClick={() => setChoix(i)}>
          <span className="lettre">{'ABCDEFGH'[i]}</span><Riche texte={c} enLigne /></button>)}
      </div>}
      {x.format === 'reponse_courte' && <label className="saisie" htmlFor={`rep-${x.id}`}>Ta réponse
        <input id={`rep-${x.id}`} value={saisie} onChange={v => setSaisie(v.target.value)} autoComplete="off" onKeyDown={k => k.key === 'Enter' && saisie && valider()} placeholder="ex. 12 ou 3/4 ou [2;3]" /></label>}
      {x.format === 'ouverte' && <label className="saisie" htmlFor={`rep-${x.id}`}>Rédige ta réponse au brouillon (ou sur ton cahier), puis compare avec le corrigé
        <textarea id={`rep-${x.id}`} value={saisie} onChange={v => setSaisie(v.target.value)} rows={5} /></label>}
      <div className="actions">
        <button className="principal" onClick={valider} disabled={x.format === 'qcm' ? choix === null : x.format === 'reponse_courte' ? !saisie.trim() : false}>
          {x.format === 'ouverte' ? 'Voir le corrigé et me noter' : 'Valider'}</button>
        {mode === 'entrainement' && indices < (x.indices?.length ?? 0) && <button onClick={() => setIndices(indices + 1)}>💡 Indice {indices + 1}/{x.indices!.length}</button>}
      </div>
      {x.indices?.slice(0, indices).map((t, i) => <p key={i} className="indice">💡 <Riche texte={t} enLigne /></p>)}
    </>}

    {phase === 'auto' && <div className="auto-correction">
      <h3>Coche chaque étape que tu as réussie</h3>
      <ol className="corrige">{x.corrige.map((l, i) => <li key={i}>
        <label className="ligne-bareme"><input type="checkbox" checked={coches[i]} onChange={v => setCoches(coches.map((c, k) => k === i ? v.target.checked : c))} />
          <span><Riche texte={l} /></span><span className="pts">{x.bareme[i]} pt</span></label></li>)}</ol>
      <p className="score">Ta note : <b>{score}/{total}</b></p>
      <button className="principal" onClick={() => terminer(score >= total * 0.7, score / total)}>Enregistrer ma note</button>
    </div>}

    {phase === 'fini' && <div className={`resultat ${juste ? 'bravo' : 'rate'}`} role="status">
      <h3>{juste ? '🎉 Bravo !' : x.format === 'ouverte' ? '💪 Pas encore tous les points' : '🤏 Pas tout à fait'}</h3>
      {x.format === 'qcm' && !juste && <p>La bonne réponse était <b>{'ABCDEFGH'[x.bonne_reponse ?? 0]}</b> : <Riche texte={x.choix?.[x.bonne_reponse ?? 0] ?? ''} enLigne /></p>}
      {x.format !== 'ouverte' && <><h4>Corrigé rédigé</h4>
        <ol className="corrige">{x.corrige.map((l, i) => <li key={i}><Riche texte={l} /> <span className="pts">{x.bareme[i]} pt</span></li>)}</ol></>}
      {x.piege && <div className="encadre attention"><b className="etiquette">Le piège</b><Riche texte={x.piege} /></div>}
      {remedier && <div className="encadre rappel"><b className="etiquette">🧠 Séance de récupération conseillée</b>
        <p>Plusieurs erreurs s'accumulent sur cette notion. Prends 10 minutes pour la reprendre autrement.</p>
        <a className="bouton principal" href={lien('remediation', x.notions[0])}>Commencer</a></div>}
      {onFini && <button className="principal large" onClick={() => onFini(juste)}>{titreSuite ?? 'Continuer'}</button>}
    </div>}
  </section>)
}

/* ---------- Page d'un exercice ---------- */
export function VueExercice({ d, id, mode }: { d: DonneesMatiere; id: string; mode: 'entrainement' | 'chrono' }) {
  const x = trouverExercice(d, id)
  const c = trouverChapitre(d, chapitreDe(id))
  if (!x || !c) return <p className="carte">Exercice introuvable.</p>
  const m = infoMatiere(c.matiere)!
  const liste = [...c.exercices].sort((a, b) => a.difficulte - b.difficulte)
  const suivant = liste[liste.findIndex(y => y.id === id) + 1]

  function fini() {
    // Boss sans épreuve réelle : tous les exercices de niveau ≥ 3 réussis en mode chronométré.
    const e = etatCourant()
    const durs = c!.exercices.filter(y => y.difficulte >= 3)
    if (durs.length && durs.every(y => e.tentatives.some(t => t.exo === y.id && t.juste && t.chrono))) donnerBadge(`boss:${c!.id}`, `Boss vaincu — ${c!.titre}`)
    if (c!.exercices.every(y => e.tentatives.some(t => t.exo === y.id && t.juste))) donnerBadge(`chapitre:${c!.id}`, c!.titre)
    location.hash = suivant ? lien('x', suivant.id, mode === 'chrono' ? { mode } : undefined) : lien('c', c!.id)
  }
  return <>
    <nav className="fil"><a href={lien('m', m.id)}>{m.icone} {m.nom}</a> › <a href={lien('c', c.id)}>{c.titre}</a> › Exercice {liste.findIndex(y => y.id === id) + 1}/{liste.length}</nav>
    <CarteExercice key={x.id} x={x} mode={mode} couleur={m.couleur} onFini={fini} titreSuite={suivant ? 'Exercice suivant ›' : 'Retour au chapitre'} />
  </>
}

/* ---------- Pratique entrelacée ---------- */
export function VueMelange({ mat }: { mat?: string }) {
  const toutes = useToutes()
  const e = useEtat()
  const [serieIds, setSerieIds] = useState<string[] | null>(null)
  const [i, setI] = useState(0)
  const [bons, setBons] = useState(0)

  const candidats = useMemo(() => {
    if (!toutes) return []
    const faibles = new Set(lacunes(e).map(l => l.notion))
    const dues = new Set(e.revisions.filter(r => r.prochaine <= Date.now()).map(r => r.notion))
    const vus = new Set([...e.notionsLues, ...e.tentatives.flatMap(t => t.notions)])
    const parChapitre: Exercice[][] = []
    for (const [id, d] of Object.entries(toutes)) {
      if (mat && id !== mat) continue
      for (const c of d.chapitres) {
        const ex = c.exercices.filter(x => x.notions.some(n => vus.has(n)))
        if (ex.length) parChapitre.push(ex.sort((a, b) => score(b) - score(a)))
      }
    }
    function score(x: Exercice) {
      let s = Math.random()
      if (x.notions.some(n => faibles.has(n))) s += 3
      if (x.notions.some(n => dues.has(n))) s += 2
      if (e.tentatives.some(t => t.exo === x.id && t.juste)) s -= 2
      return s
    }
    if (parChapitre.length < 2) {
      // Rien de lu encore : premiers chapitres de chaque matière.
      for (const [id, d] of Object.entries(toutes)) if (!mat || id === mat) for (const c of d.chapitres.slice(0, 2)) parChapitre.push(c.exercices.filter(x => x.difficulte <= 2))
    }
    const choisis: string[] = []
    for (let tour = 0; choisis.length < 10 && tour < 10; tour++)
      for (const l of parChapitre.sort(() => Math.random() - 0.5)) { if (l[tour] && choisis.length < 10) choisis.push(l[tour].id) }
    return choisis
  }, [toutes, mat]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!toutes) return <Chargement />
  const ids = serieIds ?? candidats
  if (!ids.length) return <p className="carte">Pas encore assez d'exercices disponibles.</p>
  if (i >= ids.length) return <section className="carte fin-serie">
    <h1>🎲 Série terminée</h1>
    <p className="gros">{bons}/{ids.length}</p>
    <p>Mélanger les chapitres oblige ton cerveau à choisir la bonne méthode : c'est exactement ce qu'il faut en composition.</p>
    <div className="actions"><button className="principal" onClick={() => { setSerieIds(null); setI(0); setBons(0) }}>Nouvelle série</button><a className="bouton" href={lien('')}>Accueil</a></div>
  </section>
  const id = ids[i]
  const d = toutes[id.split('-')[0]]
  const x = trouverExercice(d, id)!
  const m = infoMatiere(id.split('-')[0])!
  const c = trouverChapitre(d, chapitreDe(id))!
  return <>
    <div className="progression-serie"><span>🎲 Mélange {i + 1}/{ids.length}</span><span className="barre-progres"><span style={{ width: `${(i / ids.length) * 100}%` }} /></span></div>
    <p className="note">{m.icone} {m.nom} · {c.titre}</p>
    <CarteExercice key={id} x={x} mode="entrainement" couleur={m.couleur} titreSuite={i + 1 < ids.length ? 'Suivant ›' : 'Voir mon score'}
      onFini={j => { if (!serieIds) setSerieIds(ids); if (j) setBons(bons + 1); setI(i + 1) }} />
  </>
}
