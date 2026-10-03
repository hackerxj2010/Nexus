import { useEffect, useState } from 'react'
import { infoMatiere, trouverChapitre, trouverNotion, chapitreDe, titreNotion } from '../donnees'
import { gagnerXP, maj, useEtat, type AutoEval } from '../store'
import { lien, aller } from '../routeur'
import type { DonneesMatiere, Notion } from '../types'
import { Riche } from '../Riche'
import { BoutonAudio } from './communs'
import { contexteTuteur } from './Tuteur'

/** Évite d'afficher deux fois un exemple déjà rédigé dans le cours. */
const sansEspaces = (s: string) => s.replace(/\s+/g, '').toLowerCase()
const dejaDansCours = (cours: string, enonce: string) => sansEspaces(cours).includes(sansEspaces(enonce).slice(0, 40))

const NIVEAUX = [['phrase', 'En 1 phrase'], ['simple', 'Simplement'], ['complete', 'En entier']] as const

export function VueNotion({ d, id }: { d: DonneesMatiere; id: string }) {
  const e = useEtat()
  const n = trouverNotion(d, id)
  const c = trouverChapitre(d, chapitreDe(id))
  useEffect(() => {
    if (n && !e.notionsLues.includes(n.id)) {
      maj(s => ({ ...s, notionsLues: [...s.notionsLues, n.id] }))
      gagnerXP(5, 'notion découverte')
    }
  }, [n?.id]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!n || !c) return <p className="carte">Notion introuvable.</p>
  const m = infoMatiere(c.matiere)!
  const k = c.notions.findIndex(x => x.id === n.id)
  const prec = c.notions[k - 1], suiv = c.notions[k + 1]
  const exos = c.exercices.filter(x => x.notions.includes(n.id)).sort((a, b) => a.difficulte - b.difficulte)
  const audio = `${n.titre}. ${n.definition} ${n.niveaux.simple}`

  return (<article className="livre" style={{ '--mat': m.couleur } as React.CSSProperties}>
    <nav className="fil"><a href={lien('m', m.id)}>{m.icone} {m.nom}</a> › <a href={lien('c', c.id)}>{c.titre}</a></nav>
    <header className="titre-notion">
      <span className="numero">Notion {k + 1}/{c.notions.length}</span>
      <h1>{n.titre}</h1>
      <BoutonAudio texte={audio} label="Écouter le résumé" />
    </header>

    <div className="encadre definition"><b className="etiquette">L'essentiel</b><Riche texte={n.definition} /></div>

    {n.image && <figure className="schema">
      <img src={`./medias/${n.image.fichier}`} alt={n.image.alt} loading="lazy" />
      {n.image.legende && <figcaption>{n.image.legende}</figcaption>}
    </figure>}

    <Niveaux n={n} />

    <section className="cours"><Riche texte={n.cours_md} /></section>

    {n.formules?.length ? <div className="encadre propriete"><b className="etiquette">Formules à retenir</b><ul className="formules">{n.formules.map(f => <li key={f}><Riche texte={f} enLigne /></li>)}</ul></div> : null}

    {n.exemples_resolus?.filter(x => !dejaDansCours(n.cours_md, x.enonce)).map((x, i) => <ExempleResolu key={i} num={i + 1} enonce={x.enonce} etapes={x.etapes} estompe={i > 0} />)}

    <Rappel n={n} />
    {n.analogie ? <div className="encadre analogie"><b className="etiquette">🌍 Pour bien voir</b><Riche texte={n.analogie} /></div> : null}
    {n.astuces?.length || n.mnemo ? <div className="encadre methode"><b className="etiquette">💡 Astuces</b>
      {n.astuces?.length ? <ul>{n.astuces.map(a => <li key={a}><Riche texte={a} enLigne /></li>)}</ul> : null}
      {n.mnemo ? <p className="mnemo">🧠 <Riche texte={n.mnemo} enLigne /></p> : null}</div> : null}
    {n.erreurs_frequentes?.length ? <div className="encadre attention"><b className="etiquette">⚠️ Erreurs fréquentes</b><ul>{n.erreurs_frequentes.map(a => <li key={a}><Riche texte={a} enLigne /></li>)}</ul></div> : null}
    {n.methode_redaction ? <div className="encadre redaction"><b className="etiquette">✍️ Sur ta copie</b><Riche texte={n.methode_redaction} /></div> : null}
    {n.videos?.filter(v => v.verifie).length ? <div className="encadre remarque"><b className="etiquette">🎬 Pour aller plus loin</b><ul>{n.videos.filter(v => v.verifie).map(v =>
      <li key={v.url}><a href={v.url} target="_blank" rel="noopener noreferrer">{v.titre}</a>{v.chaine ? ` — ${v.chaine}` : ''}{v.debut ? ` (à partir de ${v.debut})` : ''}</li>)}</ul></div> : null}

    <MiniQuiz n={n} />
    <AutoEvaluation id={n.id} />
    <Commentaire n={n} />

    <div className="actions-bas">
      {exos.length > 0 && <a className="bouton principal" href={lien('x', exos[0].id)}>✏️ S'entraîner ({exos.length} exercice{exos.length > 1 ? 's' : ''})</a>}
      <div className="duo-nav">
        {prec ? <a className="bouton" href={lien('n', prec.id)}>‹ {prec.titre}</a> : <span />}
        {suiv ? <a className="bouton" href={lien('n', suiv.id)}>{suiv.titre} ›</a> : <a className="bouton" href={lien('c', c.id)}>Retour au chapitre</a>}
      </div>
    </div>
  </article>)
}

function Niveaux({ n }: { n: Notion }) {
  const [niv, setNiv] = useState<'phrase' | 'simple' | 'complete'>('simple')
  return <section className="niveaux">
    <div className="onglets petits" role="tablist" aria-label="Explique-moi">
      <span className="onglets-titre">Explique-moi :</span>
      {NIVEAUX.map(([k, t]) => <button key={k} role="tab" aria-selected={niv === k} className={niv === k ? 'actif' : ''} onClick={() => setNiv(k)}>{t}</button>)}
    </div>
    <div className="explication"><Riche texte={n.niveaux[niv]} /></div>
  </section>
}

/** Exemple résolu : le premier est montré en entier, les suivants étape par étape (exemples « estompés »). */
function ExempleResolu({ num, enonce, etapes, estompe }: { num: number; enonce: string; etapes: string[]; estompe: boolean }) {
  const [vues, setVues] = useState(estompe ? 0 : etapes.length)
  return <div className="encadre exemple">
    <b className="etiquette">Exemple résolu {num}</b>
    <Riche texte={enonce} />
    {estompe && vues === 0 && <p className="note">Essaie d'abord seul, puis dévoile la solution étape par étape.</p>}
    <ol className="etapes">{etapes.slice(0, vues).map((x, i) => <li key={i}><Riche texte={x} /></li>)}</ol>
    {vues < etapes.length && <button onClick={() => setVues(vues + 1)}>Étape suivante ({vues}/{etapes.length})</button>}
  </div>
}

function Rappel({ n }: { n: Notion }) {
  if (!n.rappel_anterieur) return null
  const r = typeof n.rappel_anterieur === 'string' ? { classe: '', texte: n.rappel_anterieur } : n.rappel_anterieur
  const prerequis = (n.prerequis_notions ?? []).filter(p => titreNotion(p) !== p)
  return <div className="encadre rappel"><b className="etiquette">🔙 Tu te souviens{r.classe ? ` de la ${r.classe}` : ''} ?</b>
    <Riche texte={r.texte.replace(/^\s*Tu te souviens[^?]*\?\s*/i, '')} />
    {prerequis.length > 0 && <p className="note">Revoir : {prerequis.map(p => <a key={p} href={lien('n', p)}>{titreNotion(p)}</a>).reduce<React.ReactNode[]>((a, x, i) => i ? [...a, ' · ', x] : [x], [])}</p>}
  </div>
}

function MiniQuiz({ n }: { n: Notion }) {
  const [i, setI] = useState(0)
  const [vu, setVu] = useState(false)
  const f = n.flash[i]
  if (!f) return null
  return <section className="quiz">
    <h2>⚡ Mini-quiz <small>{i + 1}/{Math.min(3, n.flash.length)}</small></h2>
    <p className="question"><Riche texte={f.q} enLigne /></p>
    {vu ? <>
      <p className="reponse"><Riche texte={f.r} enLigne /></p>
      {i + 1 < Math.min(3, n.flash.length) && <button onClick={() => { setI(i + 1); setVu(false) }}>Question suivante</button>}
    </> : <button className="principal" onClick={() => setVu(true)}>Voir la réponse</button>}
  </section>
}

function AutoEvaluation({ id }: { id: string }) {
  const e = useEtat()
  const dernier = e.autoEvals.filter(a => a.notion === id).at(-1)
  const noter = (niveau: AutoEval['niveau']) => maj(s => ({ ...s, autoEvals: [...s.autoEvals, { notion: id, niveau, date: Date.now() }] }))
  return <section className="auto-eval">
    <h2>Tu te sens comment sur cette notion ?</h2>
    <div className="trio-boutons">
      {([[1, '😕', 'Pas compris'], [2, '🙂', 'À peu près'], [3, '😎', 'Je maîtrise']] as const).map(([v, i, t]) =>
        <button key={v} className={dernier?.niveau === v ? 'actif' : ''} onClick={() => noter(v)}><span>{i}</span>{t}</button>)}
    </div>
    {dernier?.niveau === 1 && <p className="note">Pas de souci : on la reverra demain. Tu peux aussi <a href={lien('remediation', id)}>lancer une séance de récupération</a>.</p>}
  </section>
}

function Commentaire({ n }: { n: Notion }) {
  const [texte, setTexte] = useState('')
  const [ok, setOk] = useState(false)
  const e = useEtat()
  const anciens = e.commentaires.filter(c => c.cible === n.id)
  return <details className="commentaire">
    <summary>🙋 Je n'ai pas compris un passage</summary>
    {anciens.length > 0 && <ul className="note">{anciens.map(c => <li key={c.date}>{new Date(c.date).toLocaleDateString('fr-FR')} : {c.texte}</li>)}</ul>}
    <label htmlFor={`com-${n.id}`}>Qu'est-ce qui bloque ? (le Maître de suivi s'en souviendra)</label>
    <textarea id={`com-${n.id}`} value={texte} onChange={x => { setTexte(x.target.value); setOk(false) }} placeholder="ex. je ne vois pas pourquoi on change le sens de l'inégalité" />
    <div className="actions">
      <button disabled={!texte.trim()} onClick={() => {
        maj(s => ({ ...s, commentaires: [...s.commentaires, { cible: n.id, texte: texte.trim(), date: Date.now() }], lacunesDepuisRemediation: s.lacunesDepuisRemediation + 1 }))
        setTexte(''); setOk(true)
      }}>Enregistrer</button>
      <button onClick={() => { contexteTuteur.valeur = { titre: n.titre, texte: `${n.titre}\n${n.definition}\n${n.cours_md.slice(0, 3000)}`, question: texte }; aller('tuteur') }}>Demander au tuteur</button>
      <a className="bouton" href={lien('remediation', n.id)}>Réexplique-moi</a>
    </div>
    {ok && <p className="note">✅ Noté. On reviendra sur ce point.</p>}
  </details>
}
