import { useEffect, useMemo, useState } from 'react'
import { infoMatiere, trouverEpreuve } from '../donnees'
import { donnerBadge, enregistrer, etatCourant, gagnerXP, maj } from '../store'
import { lien, aller } from '../routeur'
import { sons } from '../sons'
import { TYPES_EPREUVE, type DonneesMatiere, type Epreuve, type Question } from '../types'
import { Riche } from '../Riche'

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ')

/** Rattache une question aux notions du site d'après les titres de notions indiqués. */
function notionsDe(q: Question, d: DonneesMatiere, ep: Epreuve): string[] {
  const chapitres = [...d.chapitres].sort((a, b) => Number(ep.chapitres.includes(b.id)) - Number(ep.chapitres.includes(a.id)))
  const ids = new Set<string>()
  for (const t of q.notions_titres ?? []) {
    const mots = norm(t).split(/\s+/).filter(m => m.length > 3)
    let best = '', score = 0
    for (const c of chapitres) for (const n of c.notions) {
      const s = norm(n.titre).split(/\s+/).filter(m => mots.includes(m)).length
      if (s > score) { score = s; best = n.id }
    }
    if (best) ids.add(best)
  }
  return [...ids]
}

export function BadgeSource({ ep }: { ep: Epreuve }) {
  if (!ep.authentique) return <p className="badge-source inspire">✏️ Exercice type inspiré — n'est pas issu d'une épreuve réelle</p>
  const s = ep.source
  return <p className="badge-source authentique">
    🏛️ <b>Épreuve authentique</b> — {s.etablissement ?? 'établissement non précisé'}{s.ville ? `, ${s.ville}` : ''}{s.annee_scolaire ? `, ${s.annee_scolaire}` : ''}{ep.pays !== 'Togo' ? ` (${ep.pays})` : ''}
    {s.url && <> · <a href={s.url} target="_blank" rel="noopener noreferrer">source</a></>}
    {s.fiabilite ? <span className="fiabilite" title="Fiabilité de la source"> · fiabilité {s.fiabilite}/5</span> : null}
  </p>
}

export function VueEpreuve({ d, id, mode }: { d: DonneesMatiere; id: string; mode: 'composition' | 'entrainement' }) {
  const ep = trouverEpreuve(d, id)
  if (!ep) return <p className="carte">Épreuve introuvable.</p>
  const m = infoMatiere(ep.matiere)!
  return <article style={{ '--mat': m.couleur } as React.CSSProperties} className="page-epreuve">
    <nav className="fil"><a href={lien('m', m.id, { onglet: 'epreuves' })}>{m.icone} {m.nom} › Devoirs & compositions</a></nav>
    <header className="titre-epreuve">
      <span className="numero">{TYPES_EPREUVE[ep.type] ?? ep.type}{ep.type !== 'concours_entree' ? ` · Semestre ${ep.semestre}` : ''}</span>
      <h1>{m.nom}{ep.duree_min ? ` — ${ep.duree_min >= 60 ? `${Math.floor(ep.duree_min / 60)} h${ep.duree_min % 60 ? String(ep.duree_min % 60).padStart(2, '0') : ''}` : `${ep.duree_min} min`}` : ''}</h1>
      <BadgeSource ep={ep} />
      {ep.chapitres.length > 0 && <p className="note">Chapitres : {ep.chapitres.map(c => <a key={c} href={lien('c', c)}>{m.chapitres.find(x => x.id === c)?.titre ?? c}</a>).reduce<React.ReactNode[]>((a, x, i) => i ? [...a, ' · ', x] : [x], [])}</p>}
      {ep.type === 'concours_entree' && <p className="note">Ce concours se passe à l'entrée en Seconde S : il vérifie les acquis de 3e. Idéal pour réviser les prérequis.</p>}
    </header>
    <div className="onglets">
      <button className={mode === 'composition' ? 'actif' : ''} onClick={() => aller('e', id, { mode: 'composition' })}>📝 Composition blanche</button>
      <button className={mode === 'entrainement' ? 'actif' : ''} onClick={() => aller('e', id)}>🧩 Question par question</button>
    </div>
    {mode === 'composition' ? <Composition key={`c-${id}`} ep={ep} d={d} /> : <Entrainement key={`e-${id}`} ep={ep} d={d} />}
  </article>
}

/* ---------- Composition blanche : conditions réelles, correction après ---------- */
function Composition({ ep, d }: { ep: Epreuve; d: DonneesMatiere }) {
  const [phase, setPhase] = useState<'consignes' | 'en_cours' | 'correction' | 'note'>('consignes')
  const [debut, setDebut] = useState(0)
  const [maintenant, setMaintenant] = useState(() => Date.now())
  const [brouillon, setBrouillon] = useState('')
  const duree = (ep.duree_min ?? 60) * 60
  useEffect(() => { if (phase !== 'en_cours') return; const t = setInterval(() => setMaintenant(Date.now()), 1000); return () => clearInterval(t) }, [phase])
  const reste = Math.max(0, duree - Math.floor((maintenant - debut) / 1000))
  useEffect(() => { if (phase === 'en_cours' && reste === 0) setPhase('correction') }, [phase, reste])

  if (phase === 'consignes') return <section className="carte consignes">
    <h2>Conditions réelles</h2>
    <ul>
      <li>⏱️ Durée : <b>{ep.duree_min ?? 60} min</b>. Le chrono tourne même si tu changes d'écran.</li>
      <li>📵 Pas de cours, pas d'indice, pas de corrigé avant d'avoir rendu ta copie.</li>
      <li>✍️ Compose sur une feuille (comme en classe) ; le cadre « brouillon » est là si tu en as besoin.</li>
      <li>✅ À la fin, tu corriges ta copie avec le barème, point par point.</li>
    </ul>
    <button className="principal large" onClick={() => { setDebut(Date.now()); setMaintenant(Date.now()); setPhase('en_cours') }}>Commencer la composition</button>
  </section>

  if (phase === 'en_cours') return <section>
    <div className={`minuteur ${reste < 600 ? 'alerte' : ''}`} role="timer" aria-live="off">⏱️ {Math.floor(reste / 3600)}:{String(Math.floor(reste % 3600 / 60)).padStart(2, '0')}:{String(reste % 60).padStart(2, '0')}{reste < 600 && ' — relis-toi !'}</div>
    <div className="carte sujet"><Riche texte={ep.enonce_md} /></div>
    <label htmlFor="brouillon">Brouillon</label>
    <textarea id="brouillon" rows={8} value={brouillon} onChange={x => setBrouillon(x.target.value)} />
    <button className="principal large" onClick={() => setPhase('correction')}>Rendre ma copie</button>
  </section>

  return <Correction ep={ep} d={d} dureeMin={Math.round((Math.min(Date.now(), debut + duree * 1000) - debut) / 60000)} modeComposition />
}

/* ---------- Correction avec barème (auto-évaluation) ---------- */
function Correction({ ep, d, dureeMin, modeComposition }: { ep: Epreuve; d: DonneesMatiere; dureeMin: number; modeComposition?: boolean }) {
  const [coches, setCoches] = useState<Record<string, boolean[]>>({})
  const [rendu, setRendu] = useState(false)
  const baremes = ep.questions.map(q => q.bareme?.length === q.corrige.length ? q.bareme : q.corrige.map((_, i) => i === q.corrige.length - 1 ? (q.points ?? 1) : 0))
  const totalQ = baremes.map(b => b.reduce((s, x) => s + x, 0))
  const total = ep.total_points ?? totalQ.reduce((s, x) => s + x, 0)
  const points = ep.questions.reduce((s, q, i) => s + baremes[i].reduce((t, b, k) => t + (coches[q.numero]?.[k] ? b : 0), 0), 0)
  const sur20 = total ? Math.round(points / total * 200) / 10 : 0

  function enregistrerNote() {
    setRendu(true)
    ep.questions.forEach((q, i) => {
      const p = baremes[i].reduce((t, b, k) => t + (coches[q.numero]?.[k] ? b : 0), 0)
      enregistrer({ exo: `${ep.id}:${q.numero}`, notions: notionsDe(q, d, ep), juste: totalQ[i] ? p >= totalQ[i] * 0.7 : true, temps: 0, indices: 0, date: Date.now(), score: totalQ[i] ? p / totalQ[i] : 1 })
    })
    maj(s => ({ ...s, compositions: [...s.compositions, { epreuve: ep.id, matiere: ep.matiere, note: points, sur: total, date: Date.now(), dureeMin, mode: modeComposition ? 'composition' : 'entrainement' }] }))
    gagnerXP(Math.round(sur20 * (modeComposition ? 5 : 3)), modeComposition ? 'composition blanche' : 'épreuve corrigée')
    if (etatCourant().reglages.sons) (sur20 >= 10 ? sons.niveau : sons.erreur)()
    if (modeComposition && sur20 >= 14) for (const c of ep.chapitres) donnerBadge(`boss:${c}`, `Boss vaincu (${sur20}/20)`)
  }

  return <section className="correction">
    <h2>Corrige ta copie</h2>
    <p className="note">Pour chaque ligne du corrigé, coche-la seulement si ta copie contient cet élément (résultat ET justification).</p>
    {ep.questions.map((q, i) => <div key={q.numero} className="carte question">
      <h3>{q.numero} <small>{totalQ[i]} pt</small></h3>
      <Riche texte={q.enonce} />
      <ol className="corrige">{q.corrige.map((l, k) => <li key={k}>
        <label className="ligne-bareme"><input type="checkbox" disabled={rendu} checked={!!coches[q.numero]?.[k]}
          onChange={v => setCoches({ ...coches, [q.numero]: q.corrige.map((_, j) => j === k ? v.target.checked : !!coches[q.numero]?.[j]) })} />
          <span><Riche texte={l} /></span>{baremes[i][k] ? <span className="pts">{baremes[i][k]} pt</span> : null}</label></li>)}</ol>
      {q.resultat_final && <p className="resultat-final">Résultat : <Riche texte={q.resultat_final} enLigne /></p>}
      {q.piege && <div className="encadre attention"><b className="etiquette">Piège</b><Riche texte={q.piege} /></div>}
      {q.astuce && <div className="encadre methode"><b className="etiquette">Astuce</b><Riche texte={q.astuce} /></div>}
    </div>)}
    <div className="carte total">
      <p className="gros">{points}/{total} <small>soit {sur20}/20</small></p>
      {!rendu ? <button className="principal large" onClick={enregistrerNote}>Enregistrer ma note</button>
        : <p>{sur20 >= 16 ? '🏆 Excellent travail !' : sur20 >= 10 ? '👍 Bien. Regarde les lignes non cochées : ce sont tes points à gagner.' : '💪 Les lignes non cochées sont ta liste de travail. On les reverra dans tes révisions.'}
          <a className="bouton" href={lien('suivi')}>Voir mon suivi</a></p>}
    </div>
  </section>
}

/* ---------- Entraînement question par question ---------- */
function Entrainement({ ep, d }: { ep: Epreuve; d: DonneesMatiere }) {
  const [vues, setVues] = useState<Record<string, boolean>>({})
  const [fini, setFini] = useState(false)
  const toutVu = useMemo(() => ep.questions.every(q => vues[q.numero]), [vues, ep.questions])
  if (fini) return <Correction ep={ep} d={d} dureeMin={0} />
  return <section>
    <details className="carte sujet" open><summary>Sujet complet</summary><Riche texte={ep.enonce_md} /></details>
    {ep.questions.map(q => <div key={q.numero} className="carte question">
      <h3>{q.numero}{q.points ? <small> {q.points} pt</small> : null}</h3>
      <Riche texte={q.enonce} />
      {!vues[q.numero] ? <div className="actions">
        {q.astuce && <details><summary>💡 Un indice</summary><Riche texte={q.astuce} /></details>}
        <button onClick={() => setVues({ ...vues, [q.numero]: true })}>J'ai cherché : voir le corrigé</button>
      </div> : <>
        <ol className="corrige">{q.corrige.map((l, k) => <li key={k}><Riche texte={l} />{q.bareme?.[k] ? <span className="pts"> {q.bareme[k]} pt</span> : null}</li>)}</ol>
        {q.piege && <div className="encadre attention"><b className="etiquette">Piège</b><Riche texte={q.piege} /></div>}
      </>}
    </div>)}
    <button className="principal large" disabled={!toutVu} onClick={() => setFini(true)}>{toutVu ? 'Me noter avec le barème' : 'Regarde chaque corrigé pour te noter'}</button>
  </section>
}
