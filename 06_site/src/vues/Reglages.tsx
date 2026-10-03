import { useState } from 'react'
import { maj, useEtat, type Etat } from '../store'
import { appelerIA } from '../ia'
import { FormProfil } from './Inscription'

const FOURNISSEURS = [
  { nom: 'OpenAI', format: 'openai', baseUrl: 'https://api.openai.com/v1', modele: 'gpt-4o-mini' },
  { nom: 'Anthropic (Claude)', format: 'anthropic', baseUrl: 'https://api.anthropic.com', modele: 'claude-sonnet-5-5' },
  { nom: 'OpenRouter', format: 'openai', baseUrl: 'https://openrouter.ai/api/v1', modele: '' },
  { nom: 'Groq', format: 'openai', baseUrl: 'https://api.groq.com/openai/v1', modele: '' },
  { nom: 'Google Gemini (compatible OpenAI)', format: 'openai', baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai', modele: '' },
  { nom: 'Autre (compatible OpenAI)', format: 'openai', baseUrl: '', modele: '' },
] as const

export function Reglages() {
  const e = useEtat()
  const r = e.reglages
  const setR = (p: Partial<Etat['reglages']>) => maj(s => ({ ...s, reglages: { ...s.reglages, ...p } }))
  const [profilOk, setProfilOk] = useState(false)

  return <section className="page-reglages">
    <h1>⚙️ Réglages</h1>

    <div className="carte formulaire">
      <h2>Confort</h2>
      <fieldset><legend>Thème</legend><div className="puces">
        {([['auto', 'Comme le téléphone'], ['clair', '☀️ Clair'], ['sombre', '🌙 Sombre']] as const).map(([v, t]) =>
          <label key={v} className="puce-choix"><input type="radio" name="theme" checked={r.theme === v} onChange={() => setR({ theme: v })} /><span>{t}</span></label>)}
      </div></fieldset>
      <label htmlFor="r-taille">Taille du texte : {r.taille} px<input id="r-taille" type="range" min={14} max={24} value={r.taille} onChange={x => setR({ taille: +x.target.value })} /></label>
      <label className="interrupteur"><input type="checkbox" checked={r.sons} onChange={x => setR({ sons: x.target.checked })} /><span>Sons de réussite</span></label>
    </div>

    <div className="carte formulaire">
      <h2>Rythme et sommeil</h2>
      <label htmlFor="r-etude">Pause conseillée après {r.etude} min d'étude<input id="r-etude" type="range" min={25} max={60} step={5} value={r.etude} onChange={x => setR({ etude: +x.target.value })} /></label>
      <div className="duo">
        <label htmlFor="r-coucher">Heure de coucher<input id="r-coucher" type="time" value={e.profil!.coucher} onChange={x => maj(s => ({ ...s, profil: { ...s.profil!, coucher: x.target.value } }))} /></label>
        <label htmlFor="r-lever">Heure de lever<input id="r-lever" type="time" value={e.profil!.lever} onChange={x => maj(s => ({ ...s, profil: { ...s.profil!, lever: x.target.value } }))} /></label>
      </div>
      <label className="interrupteur"><input type="checkbox" checked={r.verrouSommeil} onChange={x => setR({ verrouSommeil: x.target.checked })} /><span>Verrouiller le site de 30 min après le coucher jusqu'au lever</span></label>
      <p className="note">30 min avant le coucher : rappel. À l'heure du coucher : mode calme (révision légère seulement). 30 min après : verrou jusqu'au matin.</p>
    </div>

    <ConfigIA />

    <details className="carte">
      <summary><b>Mon profil et mes moyennes</b></summary>
      <FormProfil initial={e.profil!} libelle="Enregistrer" valider={p => { maj(s => ({ ...s, profil: p })); setProfilOk(true) }} />
      {profilOk && <p className="note">✅ Profil enregistré, plan du jour recalculé.</p>}
    </details>

    <Sauvegarde />
  </section>
}

function ConfigIA() {
  const e = useEtat()
  const [ia, setIa] = useState<NonNullable<Etat['ia']>>(e.ia ?? { format: 'openai', baseUrl: 'https://api.openai.com/v1', cle: '', modele: 'gpt-4o-mini' })
  const [test, setTest] = useState('')
  const [voir, setVoir] = useState(false)
  return <div className="carte formulaire">
    <h2>🤖 Tuteur IA <small>{e.ia ? 'activé' : 'facultatif'}</small></h2>
    <p className="note">Le site fonctionne entièrement sans IA. 🔒 Ta clé est enregistrée uniquement sur cet appareil et n'est envoyée qu'à l'adresse du fournisseur ci-dessous, jamais ailleurs.</p>
    <label htmlFor="ia-f">Fournisseur<select id="ia-f" value={FOURNISSEURS.find(f => f.baseUrl === ia.baseUrl)?.nom ?? 'Autre (compatible OpenAI)'}
      onChange={x => { const f = FOURNISSEURS.find(f => f.nom === x.target.value)!; setIa({ ...ia, format: f.format, baseUrl: f.baseUrl, modele: f.modele || ia.modele }) }}>
      {FOURNISSEURS.map(f => <option key={f.nom}>{f.nom}</option>)}</select></label>
    <label htmlFor="ia-format">Format de l'API<select id="ia-format" value={ia.format} onChange={x => setIa({ ...ia, format: x.target.value as 'openai' | 'anthropic' })}>
      <option value="openai">Compatible OpenAI (/chat/completions)</option><option value="anthropic">Anthropic (/v1/messages)</option></select></label>
    <label htmlFor="ia-url">Adresse de base (URL)<input id="ia-url" inputMode="url" value={ia.baseUrl} onChange={x => setIa({ ...ia, baseUrl: x.target.value.trim() })} placeholder="https://…" /></label>
    <label htmlFor="ia-cle">Clé API<span className="avec-bouton"><input id="ia-cle" type={voir ? 'text' : 'password'} autoComplete="off" value={ia.cle} onChange={x => setIa({ ...ia, cle: x.target.value.trim() })} />
      <button type="button" className="discret" onClick={() => setVoir(!voir)}>{voir ? 'Cacher' : 'Voir'}</button></span></label>
    <label htmlFor="ia-modele">Nom du modèle<input id="ia-modele" value={ia.modele} onChange={x => setIa({ ...ia, modele: x.target.value.trim() })} /></label>
    <div className="actions">
      <button className="principal" disabled={!ia.baseUrl.startsWith('https://') || !ia.cle || !ia.modele} onClick={() => { maj(s => ({ ...s, ia })); setTest('✅ Enregistré sur cet appareil.') }}>Enregistrer</button>
      <button disabled={!ia.cle || !ia.modele} onClick={async () => {
        setTest('Test en cours…')
        try { const rep = await appelerIA(ia, 'Réponds seulement « Connexion réussie ».', [{ role: 'user', content: 'Test' }]); setTest(`✅ ${rep.slice(0, 80)}`) } catch (x) { setTest(`❌ ${(x as Error).message}`) }
      }}>Tester la connexion</button>
      <button className="danger" disabled={!e.ia} onClick={() => { maj(s => ({ ...s, ia: undefined })); setIa({ ...ia, cle: '' }); setTest('🗑️ Clé effacée de cet appareil.') }}>Effacer la clé</button>
    </div>
    {test && <p role="status">{test}</p>}
  </div>
}

function Sauvegarde() {
  const [texte, setTexte] = useState('')
  const [msg, setMsg] = useState('')
  const [confirmer, setConfirmer] = useState(false)
  const exporter = () => {
    const { ia, ...sansCle } = JSON.parse(localStorage.getItem('secondeS.etat.v2') ?? '{}') // la clé API n'est jamais exportée
    void ia
    return JSON.stringify(sansCle)
  }
  return <details className="carte">
    <summary><b>Sauvegarder ou transférer ma progression</b></summary>
    <p className="note">Pour changer de téléphone : copie ta progression, puis colle-la sur le nouvel appareil. La clé API n'est jamais copiée.</p>
    <div className="actions">
      <button onClick={async () => {
        const t = exporter()
        try { await navigator.clipboard.writeText(t); setMsg('✅ Progression copiée.') } catch { setTexte(t); setMsg('Sélectionne et copie le texte ci-dessous.') }
      }}>Copier ma progression</button>
    </div>
    <label htmlFor="import">Coller une progression<textarea id="import" rows={3} value={texte} onChange={x => setTexte(x.target.value)} /></label>
    <button disabled={!texte.trim()} onClick={() => {
      try { const d = JSON.parse(texte); if (!d.profil) throw new Error(); localStorage.setItem('secondeS.etat.v2', JSON.stringify(d)); location.reload() } catch { setMsg('❌ Ce texte n\'est pas une progression valide.') }
    }}>Importer</button>
    {msg && <p role="status">{msg}</p>}
    <hr />
    {!confirmer ? <button className="danger" onClick={() => setConfirmer(true)}>Tout effacer…</button>
      : <p>Effacer ton profil et toute ta progression sur cet appareil ? <button className="danger" onClick={() => { try { localStorage.removeItem('secondeS.etat.v2') } catch { /* rien */ } location.hash = ''; location.reload() }}>Oui, tout effacer</button><button onClick={() => setConfirmer(false)}>Annuler</button></p>}
  </details>
}
