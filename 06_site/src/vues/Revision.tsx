import { useMemo, useState } from 'react'
import { chapitreDe, infoMatiere, indexCharge, trouverNotion, useToutes } from '../donnees'
import { enregistrer, etatCourant, PALIERS, useEtat } from '../store'
import { lien } from '../routeur'
import { sons } from '../sons'
import { Riche } from '../Riche'
import { Chargement } from './communs'

interface Carte { notion: string; q: string; r: string }

/** Répétition espacée : les fiches des notions arrivées à échéance (J+1, J+3, J+7, J+14, J+30). */
export function Revision({ mat }: { mat?: string }) {
  const toutes = useToutes()
  const e = useEtat()
  const [i, setI] = useState(0)
  const [vu, setVu] = useState(false)
  const [bons, setBons] = useState(0)

  const { cartes, echauffement } = useMemo(() => {
    if (!toutes) return { cartes: [] as Carte[], echauffement: false }
    const filtre = (id: string) => !mat || id.startsWith(mat + '-')
    const dues = e.revisions.filter(r => r.prochaine <= Date.now() && filtre(r.notion)).sort((a, b) => a.palier - b.palier).map(r => r.notion)
    let ids = dues, chauffe = false
    if (!ids.length) {
      // Échauffement : notions déjà lues, sinon premières notions de chaque matière.
      ids = e.notionsLues.filter(filtre).slice(-6)
      if (!ids.length) ids = (indexCharge()?.matieres ?? []).filter(m => filtre(m.id + '-')).flatMap(m => m.chapitres[0]?.notions.slice(0, 1).map(n => n.id) ?? [])
      chauffe = true
    }
    const liste: Carte[] = []
    for (const id of ids.slice(0, 15)) {
      const n = trouverNotion(toutes[id.split('-')[0]], id)
      if (!n) continue
      // Une ou deux fiches par notion, en alternant pour ne pas apprendre l'ordre par cœur.
      const debut = e.tentatives.filter(t => t.exo === `flash:${id}`).length % n.flash.length
      for (const f of [n.flash[debut], n.flash[(debut + 1) % n.flash.length]].slice(0, dues.length > 8 ? 1 : 2)) liste.push({ notion: id, q: f.q, r: f.r })
    }
    return { cartes: liste.sort(() => Math.random() - 0.5), echauffement: chauffe }
  }, [toutes, mat]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!toutes) return <Chargement />
  if (!cartes.length) return <section className="carte"><h1>🃏 Révision</h1><p>Rien à réviser pour l'instant. Lis une notion pour commencer !</p></section>
  if (i >= cartes.length) return <section className="carte fin-serie">
    <h1>✅ Révision terminée</h1><p className="gros">{bons}/{cartes.length}</p>
    <p>Les fiches ratées reviendront demain ; les fiches sues reviendront plus tard ({PALIERS.join(', ')} jours). C'est la répétition espacée : peu d'effort, mémoire durable.</p>
    <a className="bouton principal" href={lien('')}>Retour à l'accueil</a>
  </section>

  const c = cartes[i]
  const m = infoMatiere(c.notion.split('-')[0])!
  const n = trouverNotion(toutes[m.id], c.notion)!
  const noter = (ok: boolean) => {
    enregistrer({ exo: `flash:${c.notion}`, notions: [c.notion], juste: ok, temps: 0, indices: 0, date: Date.now() })
    if (etatCourant().reglages.sons) (ok ? sons.juste : sons.erreur)()
    if (ok) setBons(bons + 1)
    setVu(false); setI(i + 1)
  }
  return <section className="revision" style={{ '--mat': m.couleur } as React.CSSProperties}>
    <div className="progression-serie"><span>{echauffement ? 'Échauffement' : 'Révision espacée'} {i + 1}/{cartes.length}</span><span className="barre-progres"><span style={{ width: `${(i / cartes.length) * 100}%` }} /></span></div>
    <div className="puces">{!mat && indexCharge()!.matieres.map(x => <a key={x.id} className="puce" href={lien('revision', undefined, { mat: x.id })}>{x.icone} {x.nom}</a>)}</div>
    <div className={`fiche ${vu ? 'retournee' : ''}`}>
      <p className="fiche-matiere">{m.icone} {n.titre}</p>
      <p className="fiche-q"><Riche texte={c.q} enLigne /></p>
      {vu && <p className="fiche-r"><Riche texte={c.r} enLigne /></p>}
    </div>
    {vu ? <div className="trio-boutons">
      <button onClick={() => noter(false)}><span>😕</span>Je ne savais pas</button>
      <button className="principal" onClick={() => noter(true)}><span>😀</span>Je savais</button>
    </div> : <button className="principal large" onClick={() => setVu(true)}>Retourner la fiche</button>}
    <p className="note"><a href={lien('n', c.notion)}>Revoir le cours de « {n.titre} »</a> · {m.chapitres.find(x => x.id === chapitreDe(c.notion))?.titre}</p>
  </section>
}
