import { useState } from 'react'
import { indexCharge } from '../donnees'
import { maj, type Profil } from '../store'

export function FormProfil({ initial, valider, libelle }: { initial: Profil; valider: (p: Profil) => void; libelle: string }) {
  const [p, setP] = useState<Profil>(initial)
  const mats = indexCharge()?.matieres ?? []
  return (
    <form className="formulaire" onSubmit={ev => { ev.preventDefault(); if (p.nom.trim()) valider(p) }}>
      <div className="duo">
        <label htmlFor="p-nom">Prénom<input id="p-nom" required value={p.nom} onChange={x => setP({ ...p, nom: x.target.value })} autoComplete="given-name" /></label>
        <label htmlFor="p-etab">Établissement<input id="p-etab" placeholder="ex. Lycée de Tokoin" value={p.etablissement} onChange={x => setP({ ...p, etablissement: x.target.value })} /></label>
      </div>
      <fieldset>
        <legend>Ta moyenne actuelle (sur 20)</legend>
        <div className="grille-moyennes">
          {mats.map(m => (
            <label key={m.id} htmlFor={`p-moy-${m.id}`} style={{ '--mat': m.couleur } as React.CSSProperties} className="moyenne">
              <span>{m.icone} {m.nom}</span>
              <input id={`p-moy-${m.id}`} type="number" inputMode="decimal" min={0} max={20} step={0.25} value={p.moyennes[m.id] ?? 10}
                onChange={x => setP({ ...p, moyennes: { ...p.moyennes, [m.id]: Math.min(20, Math.max(0, +x.target.value)) } })} />
            </label>))}
        </div>
        <p className="note">Objectif : <b>20/20</b> partout. Le plan donne plus de temps aux matières les plus éloignées de 20.</p>
      </fieldset>
      <fieldset>
        <legend>Matières où tu te sens faible</legend>
        <div className="puces">
          {mats.map(m => (
            <label key={m.id} className="puce-choix">
              <input type="checkbox" checked={p.faibles.includes(m.id)}
                onChange={x => setP({ ...p, faibles: x.target.checked ? [...p.faibles, m.id] : p.faibles.filter(f => f !== m.id) })} />
              <span>{m.icone} {m.nom}</span>
            </label>))}
        </div>
      </fieldset>
      <div className="trio">
        <label htmlFor="p-h">Heures d'étude par jour<input id="p-h" type="number" min={0.5} max={8} step={0.5} value={p.heuresParJour} onChange={x => setP({ ...p, heuresParJour: +x.target.value })} /></label>
        <label htmlFor="p-c">Heure de coucher<input id="p-c" type="time" value={p.coucher} onChange={x => setP({ ...p, coucher: x.target.value })} /></label>
        <label htmlFor="p-l">Heure de lever<input id="p-l" type="time" value={p.lever} onChange={x => setP({ ...p, lever: x.target.value })} /></label>
      </div>
      <fieldset>
        <legend>Tu apprends mieux en…</legend>
        <div className="puces">
          {([['lire', '📖 lisant'], ['ecouter', '🎧 écoutant'], ['voir', '👀 voyant des schémas'], ['faire', '✍️ faisant des exercices']] as const).map(([v, t]) => (
            <label key={v} className="puce-choix"><input type="radio" name="style" checked={p.style === v} onChange={() => setP({ ...p, style: v })} /><span>{t}</span></label>))}
        </div>
      </fieldset>
      <button className="principal large" type="submit" disabled={!p.nom.trim()}>{libelle}</button>
    </form>
  )
}

export function Inscription() {
  const mats = indexCharge()?.matieres ?? []
  const initial: Profil = {
    nom: '', etablissement: '', moyennes: Object.fromEntries(mats.map(m => [m.id, 10])), faibles: [],
    heuresParJour: 2, coucher: '22:00', lever: '06:00', style: 'faire',
  }
  return (
    <main className="app accueil-inscription">
      <section className="hero">
        <p className="surtitre">Seconde S · Programme togolais</p>
        <h1>Objectif <span className="vingt">20</span>/20</h1>
        <p>Maths, Physique-Chimie, SVT et Français : cours en couleurs, exercices corrigés pas à pas, révisions au bon moment, et un coach qui t'envoie dormir à l'heure.</p>
      </section>
      <section className="carte">
        <h2>Dis-moi qui tu es</h2>
        <p className="note">Tout reste sur ce téléphone. Tu pourras tout modifier dans Réglages.</p>
        <FormProfil initial={initial} libelle="Créer mon plan d'étude 🚀" valider={p => { maj(e => ({ ...e, profil: p })); window.scrollTo(0, 0) }} />
      </section>
    </main>
  )
}
