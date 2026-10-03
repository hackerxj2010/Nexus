import { useState } from 'react'
import { infoMatiere } from '../donnees'
import { useEtat } from '../store'
import { lien, aller } from '../routeur'
import { etoiles, reussis, semestreCourant } from '../progres'
import { TYPES_EPREUVE } from '../types'
import { Etoiles } from './communs'

export function VueMatiere({ mat, onglet }: { mat: string; onglet?: string }) {
  const e = useEtat()
  const m = infoMatiere(mat)
  const [filtre, setFiltre] = useState('tous')
  if (!m) return <p className="carte">Matière introuvable.</p>
  const actif = onglet ?? `S${semestreCourant()}`
  const style = { '--mat': m.couleur } as React.CSSProperties

  return (<section style={style} className="page-matiere">
    <header className="titre-matiere"><span aria-hidden="true">{m.icone}</span><h1>{m.nom}</h1></header>
    {m.programme && <p className="note">
      Programme : {m.programme.statut === 'verifie' ? 'vérifié sur document officiel' : m.programme.statut === 'partiellement_verifie' ? 'partiellement vérifié' : 'reconstitué (à confirmer avec ton professeur)'}
      {m.programme.volume_horaire_hebdo && m.programme.volume_horaire_hebdo.length < 24 && ` · ${m.programme.volume_horaire_hebdo} par semaine`}{m.programme.coefficient && ` · coefficient ${m.programme.coefficient}`}
    </p>}
    <div className="onglets" role="tablist">
      {['S1', 'S2', 'epreuves'].map(o => (
        <button key={o} role="tab" aria-selected={actif === o} className={actif === o ? 'actif' : ''} onClick={() => aller('m', mat, { onglet: o })}>
          {o === 'epreuves' ? `Devoirs & compositions (${m.epreuves.length})` : `Semestre ${o[1]}`}
        </button>))}
    </div>

    {actif !== 'epreuves' && <ol className="chemin">
      {m.chapitres.filter(c => `S${c.semestre}` === actif).map((c, i, liste) => {
        const n = etoiles(e, c)
        const precedentFait = i === 0 || etoiles(e, liste[i - 1]) >= 1
        const conseille = precedentFait && n < 2
        return (
          <li key={c.id} className={`etape ${n === 3 ? 'faite' : ''} ${conseille ? 'conseillee' : ''}`} style={{ '--decal': `${(i % 4 === 1 ? 1 : i % 4 === 3 ? -1 : 0) * 18}%` } as React.CSSProperties}>
            <a href={lien('c', c.id)}>
              <span className="pion" aria-hidden="true">{n === 3 ? '🏆' : c.ordre}</span>
              <span className="etape-texte">
                <b>{c.titre}</b>
                <small>{c.notions.length} notions · {reussis(e, c.id)}/{c.nbExercices} exercices <Etoiles n={n} /></small>
                {conseille && <em className="badge-conseil">À faire maintenant</em>}
              </span>
            </a>
          </li>)
      })}
    </ol>}

    {actif === 'epreuves' && <div>
      <div className="puces" role="group" aria-label="Filtrer par type">
        {['tous', ...new Set(m.epreuves.map(x => x.type))].map(t =>
          <button key={t} className={`puce ${filtre === t ? 'actif' : ''}`} onClick={() => setFiltre(t)}>{t === 'tous' ? 'Tous' : TYPES_EPREUVE[t] ?? t}</button>)}
      </div>
      {!m.epreuves.some(x => x.type !== 'concours_entree') && <div className="carte vide">
        <p><b>Pas encore de devoir ni de composition de Seconde pour cette matière.</b></p>
        <p>Les devoirs et compositions de lycées togolais seront ajoutés dès qu'ils auront été retrouvés avec leur source. En attendant, entraîne-toi avec les exercices de chaque chapitre et le mode « Mélange ».</p>
      </div>}
      {([[1, 'Semestre 1'], [2, 'Semestre 2'], [0, "Concours d'entrée en Seconde S (révision des acquis de 3e)"]] as const).map(([s, titre]) => {
        const liste = m.epreuves.filter(x => (s === 0 ? x.type === 'concours_entree' : x.semestre === s && x.type !== 'concours_entree') && (filtre === 'tous' || x.type === filtre))
        if (!liste.length) return null
        return <div key={s}><h2 className="sous-titre">{titre}</h2>
          <ul className="liste-epreuves">{liste.map(x => {
            const faite = e.compositions.filter(c => c.epreuve === x.id).at(-1)
            return <li key={x.id}><a href={lien('e', x.id)} className="ligne-epreuve">
              <span>
                <b>{TYPES_EPREUVE[x.type] ?? x.type}</b>
                <small>{x.authentique ? `🏛️ ${x.etablissement ?? 'Établissement non précisé'}${x.annee ? ` · ${x.annee}` : ''}` : '✏️ type inspiré'}{x.pays !== 'Togo' ? ` · ${x.pays}` : ''}{x.duree_min ? ` · ${x.duree_min} min` : ''}</small>
              </span>
              {faite ? <span className="note-obtenue">{Math.round(faite.note / faite.sur * 200) / 10}/20</span> : <span className="fleche">›</span>}
            </a></li>
          })}</ul></div>
      })}
    </div>}
  </section>)
}
