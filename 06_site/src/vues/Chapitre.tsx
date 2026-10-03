import { infoMatiere, trouverChapitre } from '../donnees'
import { useEtat } from '../store'
import { lien } from '../routeur'
import { etoiles, reussis } from '../progres'
import { TYPES_EPREUVE, type DonneesMatiere } from '../types'
import { Riche } from '../Riche'
import { Difficulte, Etoiles } from './communs'

/** « M-3e-THEOREME-THALES » → « 3e · théorème thales » */
const libellePrerequis = (p: string) => { const [, classe, ...r] = p.split('-'); return `${classe} · ${r.join(' ').toLowerCase()}` }

const FORMATS: Record<string, string> = { qcm: 'QCM', reponse_courte: 'Réponse courte', ouverte: 'Rédaction' }

export function VueChapitre({ d, id }: { d: DonneesMatiere; id: string }) {
  const e = useEtat()
  const c = trouverChapitre(d, id)
  if (!c) return <p className="carte">Chapitre introuvable.</p>
  const m = infoMatiere(c.matiere)!
  const resume = m.chapitres.find(x => x.id === c.id)!
  const exos = [...c.exercices].sort((a, b) => a.difficulte - b.difficulte)
  const ok = new Set(e.tentatives.filter(t => t.juste).map(t => t.exo))
  const epreuves = d.epreuves.filter(x => x.chapitres.includes(c.id))
  const i = m.chapitres.findIndex(x => x.id === c.id)
  const suivant = m.chapitres[i + 1]

  return (<article style={{ '--mat': m.couleur } as React.CSSProperties} className="page-chapitre">
    <nav className="fil"><a href={lien('m', m.id, { onglet: `S${c.semestre}` })}>{m.icone} {m.nom}</a> › Semestre {c.semestre}</nav>
    <header className="titre-chapitre">
      <span className="numero">Chapitre {c.ordre}</span>
      <h1>{c.titre}</h1>
      <p><Etoiles n={etoiles(e, resume)} /> · {reussis(e, c.id)}/{c.exercices.length} exercices réussis</p>
    </header>

    {c.objectifs?.length ? <section className="carte objectifs"><h2>🎯 À la fin du chapitre, tu sauras</h2><ul>{c.objectifs.map(o => <li key={o}><Riche texte={o} enLigne /></li>)}</ul></section> : null}
    {c.prerequis?.length ? <p className="note">Prérequis : {c.prerequis.map(p => {
      const ch = m.chapitres.find(x => x.id === p)
      return ch ? <a key={p} href={lien('c', p)}>{ch.titre}</a> : <span key={p} className="pastille-texte">{libellePrerequis(p)}</span>
    }).reduce<React.ReactNode[]>((a, x, k) => k ? [...a, ' ', x] : [x], [])}</p> : null}

    <section>
      <h2 className="sous-titre">📚 Le cours</h2>
      <ol className="liste-notions">{c.notions.map((n, k) => {
        const lue = e.notionsLues.includes(n.id)
        const ae = e.autoEvals.filter(a => a.notion === n.id).at(-1)
        return <li key={n.id}><a href={lien('n', n.id)} className={`ligne-notion ${lue ? 'lue' : ''}`}>
          <span className="pion-notion">{lue ? '✓' : k + 1}</span>
          <span><b>{n.titre}</b><small>{ae ? ['', '😕 à revoir', '🙂 à peu près', '😎 maîtrisé'][ae.niveau] : lue ? 'lu' : 'à lire'}</small></span>
        </a></li>
      })}</ol>
    </section>

    <section>
      <h2 className="sous-titre">✏️ Exercices <small>du plus facile au plus dur</small></h2>
      {exos.length === 0 && <p className="note">Pas encore d'exercice pour ce chapitre.</p>}
      <ul className="liste-exos">{exos.map((x, k) => (
        <li key={x.id} className={ok.has(x.id) ? 'reussi' : ''}>
          <a href={lien('x', x.id)} className="ligne-exo">
            <span className="exo-num">{ok.has(x.id) ? '✓' : k + 1}</span>
            <span className="exo-texte"><Riche texte={x.enonce.split('\n')[0].slice(0, 110) + (x.enonce.length > 110 ? '…' : '')} enLigne /></span>
            <span className="exo-meta"><Difficulte n={x.difficulte} /><small>{FORMATS[x.format] ?? x.format}</small></span>
          </a>
        </li>))}</ul>
      {exos.length > 0 && <p><a className="bouton" href={lien('x', exos.find(x => !ok.has(x.id))?.id ?? exos[0].id, { mode: 'chrono' })}>⏱️ Mode devoir chronométré</a></p>}
    </section>

    <section className="carte boss">
      <h2>👾 Boss de fin de chapitre</h2>
      {epreuves.length > 0 ? <>
        <p>Bats une vraie épreuve en conditions réelles (au moins 14/20) pour gagner la 3e étoile.</p>
        <ul className="liste-epreuves">{epreuves.slice(0, 5).map(x => <li key={x.id}><a className="ligne-epreuve" href={lien('e', x.id, { mode: 'composition' })}>
          <span><b>{TYPES_EPREUVE[x.type] ?? x.type}</b><small>{x.authentique ? `🏛️ ${x.source.etablissement ?? ''} ${x.source.annee_scolaire ?? ''}` : '✏️ type inspiré'}</small></span><span className="fleche">›</span></a></li>)}</ul>
      </> : <>
        <p>Aucune épreuve réelle n'est encore rattachée à ce chapitre. Le boss est le <b>test du chapitre</b> : réussis tous les exercices de niveau 3 et 4 en mode chronométré.</p>
        {exos.some(x => x.difficulte >= 3) && <a className="bouton principal" href={lien('x', exos.filter(x => x.difficulte >= 3)[0].id, { mode: 'chrono', boss: '1' })}>Affronter le boss</a>}
      </>}
    </section>

    {c.pieges_composition?.length ? <section className="encadre attention"><b className="etiquette">Pièges fréquents en composition</b><ul>{c.pieges_composition.map(p => <li key={p}><Riche texte={p} enLigne /></li>)}</ul></section> : null}

    {suivant && <a className="bouton large" href={lien('c', suivant.id)}>Chapitre suivant : {suivant.titre} ›</a>}
  </article>)
}
