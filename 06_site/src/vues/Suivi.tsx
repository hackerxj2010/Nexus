import { indexCharge, titreNotion, matiereDe, infoMatiere } from '../donnees'
import { lacunes, useEtat, type Etat } from '../store'
import { lien } from '../routeur'
import { prevision, progresMatiere } from '../progres'

export function Suivi() {
  const e = useEtat()
  const index = indexCharge()!
  const l = lacunes(e).slice(0, 8)
  const exosFaits = new Set(e.tentatives.filter(t => !t.exo.startsWith('flash:')).map(t => t.exo)).size
  const parMat = index.matieres.map(m => {
    const ids = new Set(m.chapitres.flatMap(c => c.notions.map(n => n.id)))
    const ts = e.tentatives.filter(t => t.notions.some(n => ids.has(n)) && !t.exo.startsWith('flash:'))
    const comps = e.compositions.filter(c => c.matiere === m.id)
    return {
      m, prev: prevision(e, m.id, ids), n: ts.length, taux: ts.length ? ts.filter(t => t.juste).length / ts.length : null,
      lues: e.notionsLues.filter(n => ids.has(n)).length, notions: ids.size, comps, progres: progresMatiere(e, m),
    }
  })
  const moyennePrevue = parMat.reduce((s, x) => s + x.prev.note, 0) / (parMat.length || 1)

  return <section className="page-suivi">
    <h1>📊 Maître de suivi</h1>
    <div className="carte synthese">
      <div><span className="gros">{moyennePrevue.toFixed(2)}</span><small>moyenne prévue /20</small></div>
      <div><span className="gros">{exosFaits}</span><small>exercices faits</small></div>
      <div><span className="gros">{e.notionsLues.length}</span><small>notions lues</small></div>
      <div><span className="gros">{e.compositions.length}</span><small>épreuves notées</small></div>
    </div>

    <h2 className="sous-titre">Par matière</h2>
    <div className="grille-suivi">{parMat.map(x => (
      <div key={x.m.id} className="carte matiere-suivi" style={{ '--mat': x.m.couleur } as React.CSSProperties}>
        <h3>{x.m.icone} {x.m.nom}</h3>
        <p className="prevision"><b>{x.prev.note}</b>/20 <small>prévu · départ {x.prev.base}</small></p>
        <Courbe e={e} mat={x.m.id} base={x.prev.base} />
        <ul className="chiffres">
          <li>{x.taux === null ? '—' : `${Math.round(x.taux * 100)} %`} de réponses justes ({x.n})</li>
          <li>{x.lues}/{x.notions} notions lues · {Math.round(x.progres * 100)} % des étoiles</li>
          {x.comps.length > 0 && <li>Dernière épreuve : {Math.round(x.comps.at(-1)!.note / x.comps.at(-1)!.sur * 200) / 10}/20</li>}
        </ul>
        {x.prev.confiance < 0.3 && <p className="note">Prévision encore peu fiable : fais plus d'exercices et une composition blanche.</p>}
      </div>))}
    </div>

    <h2 className="sous-titre">Lacunes à combler</h2>
    <div className="carte">
      {l.length === 0 ? <p>Aucune lacune détectée pour l'instant 💪</p> : <ul className="lacunes">{l.map(x => {
        const m = infoMatiere(matiereDe(x.notion))
        return <li key={x.notion} style={{ '--mat': m?.couleur } as React.CSSProperties}>
          <a href={lien('n', x.notion)}><b>{titreNotion(x.notion)}</b></a>
          <small>{m?.nom} · {Math.round(x.score)} signal(aux)</small>
          <a className="bouton petit" href={lien('remediation', x.notion)}>Récupérer</a>
        </li>
      })}</ul>}
      <p className="note">Une lacune = une erreur, au moins deux indices utilisés, un « je n'ai pas compris » ou une auto-évaluation « pas compris ». Une réussite ensuite la fait baisser.</p>
    </div>

    {e.commentaires.length > 0 && <><h2 className="sous-titre">Tes questions en suspens</h2>
      <div className="carte"><ul>{e.commentaires.slice(-6).reverse().map(c => <li key={c.date}><a href={lien('n', c.cible)}>{titreNotion(c.cible)}</a> : {c.texte}</li>)}</ul></div></>}

    <h2 className="sous-titre">Badges</h2>
    <div className="carte badges">
      {e.badges.length === 0 ? <p>Réussis tous les exercices d'un chapitre ou bats un boss pour gagner ton premier badge.</p>
        : e.badges.map(b => {
          const [type, id] = b.split(':')
          const titre = indexCharge()!.matieres.flatMap(m => m.chapitres).find(c => c.id === id)?.titre ?? id
          return <span key={b} className="badge" title={titre}>{type === 'boss' ? '👾' : '🏅'} {titre}</span>
        })}
    </div>
  </section>
}

/** Notes d'épreuves au fil du temps (points) et moyenne de départ (ligne pointillée). */
function Courbe({ e, mat, base }: { e: Etat; mat: string; base: number }) {
  const pts = e.compositions.filter(c => c.matiere === mat).slice(-10).map(c => c.note / c.sur * 20)
  const W = 240, H = 70, y = (v: number) => H - 6 - (v / 20) * (H - 12), x = (i: number) => 10 + i * ((W - 20) / Math.max(1, pts.length - 1))
  return <svg className="courbe" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={pts.length ? `Notes : ${pts.map(p => p.toFixed(1)).join(', ')}` : 'Pas encore de note'}>
    <line x1="0" x2={W} y1={y(20)} y2={y(20)} className="grille" />
    <line x1="0" x2={W} y1={y(10)} y2={y(10)} className="grille" />
    <line x1="0" x2={W} y1={y(base)} y2={y(base)} className="depart" />
    <text x={W - 2} y={y(20) + 10} textAnchor="end" className="etiq">20</text>
    <text x={W - 2} y={y(10) - 2} textAnchor="end" className="etiq">10</text>
    {pts.length > 1 && <polyline points={pts.map((p, i) => `${x(i)},${y(p)}`).join(' ')} className="ligne" />}
    {pts.map((p, i) => <circle key={i} cx={x(i)} cy={y(p)} r={i === pts.length - 1 ? 4.5 : 3} className="point" />)}
    {!pts.length && <text x={W / 2} y={H / 2 + 4} textAnchor="middle" className="etiq">Fais une composition blanche</text>}
  </svg>
}
