import { useState } from 'react'
import { chapitreDe, infoMatiere, trouverChapitre, trouverNotion, titreNotion } from '../donnees'
import { enregistrer, gagnerXP, lacunes, maj, useEtat } from '../store'
import { PROMPT_REMEDIATION, resumeEleve } from '../ia'
import { lien } from '../routeur'
import type { DonneesMatiere, Notion } from '../types'
import { Riche } from '../Riche'
import { Chat } from './Tuteur'
import { CarteExercice } from './Exercice'

/** Séance de récupération : avec l'IA (3 angles + preuve active), ou de repli à partir de la base de cours. */
export function Remediation({ d, notion }: { d: DonneesMatiere; notion?: Notion }) {
  const e = useEtat()
  const [termine, setTermine] = useState(false)
  if (!notion) return <p className="carte">Notion introuvable.</p>
  const c = trouverChapitre(d, chapitreDe(notion.id))!
  const m = infoMatiere(c.matiere)!
  const faibles = new Set(lacunes(e).map(l => l.notion))
  const prerequis = (notion.prerequis_notions ?? []).map(p => ({ id: p, n: trouverNotion(d, p) }))
  const prerequisFaibles = prerequis.filter(p => !p.n || faibles.has(p.id) || !e.notionsLues.includes(p.id)).map(p => p.n?.titre ?? p.id)
  const erreurs = e.tentatives.filter(t => !t.juste && t.notions.includes(notion.id)).length

  function reussite() {
    if (termine) return
    setTermine(true)
    maj(s => ({ ...s, lacunesDepuisRemediation: 0 }))
    enregistrer({ exo: `remediation:${notion!.id}`, notions: [notion!.id], juste: true, temps: 0, indices: 0, date: Date.now() })
    gagnerXP(30, 'notion récupérée')
  }

  const systeme = `${PROMPT_REMEDIATION}\n\nProfil compact de l'élève : ${resumeEleve(e, prerequisFaibles)}\n\nNotion à remédier : ${notion.titre} (${m.nom}, chapitre « ${c.titre} »)\nCours du site :\n${notion.cours_md.slice(0, 4000)}\nErreurs fréquentes connues : ${(notion.erreurs_frequentes ?? []).join(' ; ')}\nPrérequis : ${prerequis.map(p => p.n?.titre ?? p.id).join(', ') || 'aucun'}`

  return <article className="page-remediation" style={{ '--mat': m.couleur } as React.CSSProperties}>
    <nav className="fil"><a href={lien('c', c.id)}>{m.icone} {c.titre}</a> › <a href={lien('n', notion.id)}>{notion.titre}</a></nav>
    <h1>🧠 Séance de récupération</h1>
    <p className="sous-titre-page">{notion.titre}</p>
    {termine && <p className="succes carte" role="status">✅ Bien joué : cette notion repart dans tes révisions avec un bon niveau.</p>}

    {e.ia ? <>
      <p className="note">Le tuteur va : te dire ce qui coince, réexpliquer sous 3 angles, revenir sur un prérequis si besoin, puis te demander de résoudre ET d'expliquer un exercice.</p>
      <Chat systeme={systeme} premier={`Lance ma séance de récupération sur « ${notion.titre} ».`} placeholder="Ta solution ET ton explication"
        onReponse={t => { if (/^VERDICT\s*:\s*COMPRIS/i.test(t.trim())) reussite() }} />
      <details className="carte"><summary>Version sans IA</summary><Repli notion={notion} d={d} erreurs={erreurs} prerequis={prerequis} reussite={reussite} couleur={m.couleur} /></details>
    </> : <Repli notion={notion} d={d} erreurs={erreurs} prerequis={prerequis} reussite={reussite} couleur={m.couleur} />}
  </article>
}

function Repli({ notion, d, erreurs, prerequis, reussite, couleur }: {
  notion: Notion; d: DonneesMatiere; erreurs: number; prerequis: { id: string; n?: Notion }[]; reussite: () => void; couleur: string
}) {
  const [etape, setEtape] = useState(0)
  const c = trouverChapitre(d, chapitreDe(notion.id))!
  const faciles = c.exercices.filter(x => x.notions.includes(notion.id)).sort((a, b) => a.difficulte - b.difficulte).slice(0, 3)
  const [k, setK] = useState(0)
  const rappel = typeof notion.rappel_anterieur === 'string' ? notion.rappel_anterieur : notion.rappel_anterieur?.texte
  const etapes = ['Diagnostic', 'Autrement dit', 'Les bases', 'Exemple', 'À toi']

  return <div className="repli">
    <ol className="etapes-remediation">{etapes.map((t, i) => <li key={t} className={i === etape ? 'actif' : i < etape ? 'fait' : ''}>{t}</li>)}</ol>

    {etape === 0 && <div className="carte">
      <h2>Ce qui coince sans doute</h2>
      <p>{erreurs ? `Tu as fait ${erreurs} erreur(s) sur « ${notion.titre} ».` : `Tu as signalé « ${notion.titre} » comme difficile.`} Les confusions les plus fréquentes :</p>
      <ul>{(notion.erreurs_frequentes ?? []).map(x => <li key={x}><Riche texte={x} enLigne /></li>)}</ul>
      <p>Reconnais-tu l'une d'elles dans tes réponses ?</p>
    </div>}
    {etape === 1 && <div className="carte">
      <h2>En une phrase</h2><Riche texte={notion.niveaux.phrase} />
      <h2>Avec une image</h2><Riche texte={notion.niveaux.simple} />
      {notion.analogie && <><h2>Comme dans la vie</h2><Riche texte={notion.analogie} /></>}
      {notion.image && <figure className="schema"><img src={`./medias/${notion.image.fichier}`} alt={notion.image.alt} /></figure>}
    </div>}
    {etape === 2 && <div className="carte">
      <h2>Retour aux bases</h2>
      {rappel && <div className="encadre rappel"><Riche texte={rappel} /></div>}
      {prerequis.filter(p => p.n).map(p => <div key={p.id} className="encadre definition">
        <b className="etiquette">{p.n!.titre}</b><Riche texte={p.n!.definition} />
        <ul>{p.n!.flash.slice(0, 2).map(f => <li key={f.q}><Riche texte={f.q} enLigne /> → <i><Riche texte={f.r} enLigne /></i></li>)}</ul>
        <a href={lien('n', p.id)}>Revoir cette notion</a></div>)}
      {!rappel && !prerequis.some(p => p.n) && <p>Pas de prérequis particulier : passe à l'exemple.</p>}
      {prerequis.filter(p => !p.n).length > 0 && <p className="note">Prérequis des classes précédentes : {prerequis.filter(p => !p.n).map(p => titreNotion(p.id).replace(/^[A-Z]+-/, '')).join(', ')}.</p>}
    </div>}
    {etape === 3 && <div className="carte">
      <h2>Un exemple pas à pas</h2>
      {notion.exemples_resolus?.[0] ? <><Riche texte={notion.exemples_resolus[0].enonce} /><ol className="etapes">{notion.exemples_resolus[0].etapes.map((x, i) => <li key={i}><Riche texte={x} /></li>)}</ol></>
        : <Riche texte={notion.niveaux.complete} />}
    </div>}
    {etape === 4 && (faciles.length ? <>
      <p className="note">Preuve active : résous, puis explique-toi à voix haute pourquoi chaque étape est juste.</p>
      {k < faciles.length ? <CarteExercice key={faciles[k].id} x={faciles[k]} mode="entrainement" couleur={couleur}
        titreSuite={k + 1 < faciles.length ? 'Exercice suivant' : 'Terminer'} onFini={j => { if (j) reussite(); setK(k + 1) }} />
        : <p className="carte">Séance terminée. <a href={lien('n', notion.id)}>Relire le cours</a></p>}
    </> : <div className="carte"><p>Explique la notion à voix haute comme si tu l'apprenais à un camarade (méthode Feynman). Puis fais les fiches.</p>
      <button className="principal" onClick={reussite}>Je l'ai expliquée</button></div>)}

    <div className="duo-nav">
      {etape > 0 ? <button onClick={() => setEtape(etape - 1)}>‹ Retour</button> : <span />}
      {etape < 4 && <button className="principal" onClick={() => setEtape(etape + 1)}>Suivant ›</button>}
    </div>
  </div>
}
