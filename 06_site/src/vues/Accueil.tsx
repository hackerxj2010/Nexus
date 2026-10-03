import { indexCharge, titreNotion } from '../donnees'
import { lacunes, joursDepuis, useEtat } from '../store'
import { lien } from '../routeur'
import { echeances, joursAvant, planDuJour, progresMatiere } from '../progres'

export function Accueil({ calme }: { calme: boolean }) {
  const e = useEtat()
  const index = indexCharge()!
  const dues = e.revisions.filter(r => r.prochaine <= Date.now()).length
  const top = lacunes(e)[0]
  const prochaine = echeances(e)[0]
  const plan = planDuJour(e, index.matieres)
  const heure = new Date().getHours()
  const salut = heure < 12 ? 'Bonjour' : heure < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (<>
    <section className="bienvenue">
      <h1>{salut} {e.profil!.nom} 👋</h1>
      {prochaine && <a className="compte-rebours" href={lien('calendrier')}>
        <b>{Math.max(0, joursAvant(prochaine.date))}</b><span>jour(s) avant<br />{prochaine.titre}</span>
      </a>}
    </section>

    <section className="actions-jour">
      {dues > 0 && <a className="tuile-action revision" href={lien('revision')}><b>🃏 {dues}</b><span>notion(s) à réviser aujourd'hui</span></a>}
      {top && !calme && <a className="tuile-action reprise" href={lien('n', top.notion)}>
        <b>🔁 Reprends</b><span>« {titreNotion(top.notion)} » — tu l'as ratée il y a {joursDepuis(top.derniere) || 'moins d\'1'} jour(s)</span></a>}
      {!calme && <a className="tuile-action melange" href={lien('melange')}><b>🎲 Mélange</b><span>10 exercices de chapitres différents</span></a>}
      {dues === 0 && !top && <a className="tuile-action revision" href={lien('revision')}><b>🃏 Échauffement</b><span>quelques fiches pour démarrer</span></a>}
    </section>

    {!calme && <section className="carte plan">
      <h2>Ton plan du jour <small>{e.profil!.heuresParJour} h</small></h2>
      <ul>{plan.map(x => (
        <li key={x.m.id} style={{ '--mat': x.m.couleur } as React.CSSProperties}>
          <span className="plan-mat">{x.m.icone} {x.m.nom}{x.devoirProche && <em className="urgent"> devoir proche</em>}</span>
          <span className="plan-min">{x.minutes} min</span>
          {x.prochain && <a href={lien('c', x.prochain.id)} className="plan-chap">→ {x.prochain.titre}</a>}
        </li>))}</ul>
    </section>}

    {!calme && <section aria-label="Matières" className="mondes">
      {index.matieres.map(m => {
        const p = progresMatiere(e, m)
        return (
          <a key={m.id} className="monde" href={lien('m', m.id)} style={{ '--mat': m.couleur } as React.CSSProperties}>
            <span className="icone" aria-hidden="true">{m.icone}</span>
            <span className="nom">{m.nom}</span>
            <span className="meta">{m.chapitres.length} chapitres · {m.epreuves.length} épreuves</span>
            <span className="barre-progres" aria-label={`${Math.round(p * 100)} %`}><span style={{ width: `${p * 100}%` }} /></span>
          </a>)
      })}
    </section>}

    {index.matieres.some(m => m.programme?.statut !== 'verifie') && <p className="note avertissement">
      ℹ️ L'ordre des chapitres suit le programme de Seconde S tel qu'on a pu le reconstituer ; il peut différer de la progression de ton lycée.
      Les exercices marqués « type inspiré » sont écrits pour la plateforme ; seules les épreuves marquées 🏛️ viennent de vrais devoirs.
    </p>}
    {e.tentatives.length === 0 && <p className="note">Astuce : ouvre une matière, lis la première notion, puis fais ses exercices.</p>}
  </>)
}
