import { useState } from 'react'
import { indexCharge } from '../donnees'
import { maj, serie, useEtat } from '../store'
import { calendrier, echeances, joursAvant } from '../progres'

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })

export function Calendrier() {
  const e = useEtat()
  const mats = indexCharge()!.matieres
  const [titre, setTitre] = useState('')
  const [date, setDate] = useState('')
  const [mat, setMat] = useState(mats[0]?.id ?? 'M')
  const auj = new Date().toISOString().slice(0, 10)
  const ech = echeances(e)
  const periode = calendrier.periodes.find(p => !p.conge && p.debut <= auj && auj <= p.fin) ?? calendrier.periodes.find(p => p.debut <= auj && auj <= p.fin)

  return <section className="page-calendrier">
    <h1>📅 Calendrier</h1>
    <div className="carte synthese">
      <div><span className="gros">🔥 {serie(e)}</span><small>jours de suite</small></div>
      <div><span className="gros">🛡️ {e.jokers}</span><small>jokers (1 jour manqué pardonné)</small></div>
      <div><span className="gros">{periode ? periode.titre : '—'}</span><small>période actuelle</small></div>
    </div>
    <p className="note">Un joker protège automatiquement ta série si tu manques un seul jour. Tu en gagnes un tous les 7 jours de suite (3 au maximum).</p>

    <h2 className="sous-titre">Mes devoirs et compositions</h2>
    <form className="carte formulaire ajout-devoir" onSubmit={ev => {
      ev.preventDefault()
      if (!titre.trim() || !date) return
      maj(s => ({ ...s, devoirs: [...s.devoirs, { id: `d${Date.now()}`, titre: titre.trim(), matiere: mat, date }] }))
      setTitre(''); setDate('')
    }}>
      <div className="trio">
        <label htmlFor="d-titre">Quoi ?<input id="d-titre" value={titre} onChange={x => setTitre(x.target.value)} placeholder="ex. Devoir surveillé n°2" /></label>
        <label htmlFor="d-mat">Matière<select id="d-mat" value={mat} onChange={x => setMat(x.target.value)}>{mats.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}</select></label>
        <label htmlFor="d-date">Date<input id="d-date" type="date" value={date} onChange={x => setDate(x.target.value)} /></label>
      </div>
      <button className="principal" type="submit" disabled={!titre.trim() || !date}>Ajouter</button>
    </form>
    <ul className="echeances">{ech.map((x, i) => {
      const m = mats.find(m => m.id === x.matiere)
      const j = joursAvant(x.date)
      return <li key={i} style={{ '--mat': m?.couleur ?? 'var(--accent)' } as React.CSSProperties}>
        <span className="jours"><b>{j}</b>j</span>
        <span><b>{x.titre}</b><small>{fmt(x.date)}{m ? ` · ${m.nom}` : ''}{x.approximatif ? ' · date estimée' : ''}</small>
          {j <= 7 && m && <small className="urgent">Commence la révision maintenant : fiches + une composition blanche.</small>}</span>
        {x.id && <button className="discret" aria-label={`Supprimer ${x.titre}`} onClick={() => maj(s => ({ ...s, devoirs: s.devoirs.filter(d => d.id !== x.id) }))}>✕</button>}
      </li>
    })}</ul>

    <h2 className="sous-titre">Année scolaire {calendrier.annee_scolaire}</h2>
    <ol className="frise">{calendrier.periodes.filter(p => !p.conge || p.id !== 'V4').map(p => (
      <li key={p.id} className={`${p.conge ? 'conge' : ''} ${p.debut <= auj && auj <= p.fin ? 'actuelle' : ''}`}>
        <b>{p.titre}</b><small>{fmt(p.debut)} → {fmt(p.fin)}</small></li>))}</ol>
    <p className="note">Découpage officiel 2026-2027 : {calendrier.decoupage}. Source : {calendrier.source.titre}. Les dates de composition sont des estimations : remplace-les par celles de ton lycée.</p>
  </section>
}
