import { useEffect, useRef, useState } from 'react'
import { useEtat } from '../store'
import { appelerIA, PROMPT_CHAT, resumeEleve, type Msg } from '../ia'
import { lien } from '../routeur'
import { Riche } from '../Riche'

/** Page ouverte par l'élève au moment où il appelle le tuteur (contextualise le chat). */
export const contexteTuteur: { valeur?: { titre: string; texte: string; question?: string } } = {}

export function Chat({ systeme, premier, onReponse, placeholder }: {
  systeme: string; premier?: string; onReponse?: (texte: string) => void; placeholder?: string
}) {
  const e = useEtat()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [texte, setTexte] = useState('')
  const [charge, setCharge] = useState(false)
  const [err, setErr] = useState('')
  const fin = useRef<HTMLDivElement>(null)
  useEffect(() => { fin.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs, charge])

  async function envoyer(t: string, historique = msgs) {
    if (!e.ia || !t.trim()) return
    const nv = [...historique, { role: 'user' as const, content: t.trim() }]
    setMsgs(nv); setTexte(''); setCharge(true); setErr('')
    try {
      const rep = await appelerIA(e.ia, systeme, nv)
      setMsgs([...nv, { role: 'assistant', content: rep }]); onReponse?.(rep)
    } catch (x) { setErr((x as Error).message); setMsgs(historique) ; setTexte(t) }
    setCharge(false)
  }
  const lance = useRef(false)
  useEffect(() => { if (premier && !lance.current) { lance.current = true; envoyer(premier, []) } }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!e.ia) return <div className="carte"><p>Le tuteur IA n'est pas configuré. Le site marche très bien sans lui ; pour l'activer, ajoute une clé dans <a href={lien('reglages')}>Réglages</a>.</p></div>
  return <div className="chat">
    {msgs.filter((m, i) => !(i === 0 && premier && m.role === 'user')).map((m, i) =>
      <div key={i} className={`bulle ${m.role}`}>{m.role === 'assistant' ? <Riche texte={m.content.replace(/^VERDICT\s*:\s*(COMPRIS|PAS ENCORE)\s*/i, (_, v) => v.toUpperCase() === 'COMPRIS' ? '✅ **Compris !**\n\n' : '🔄 **Pas encore — on essaie autrement.**\n\n')} /> : m.content}</div>)}
    {charge && <div className="bulle assistant attente" aria-label="Le tuteur écrit">…</div>}
    {err && <p className="erreur" role="alert">{err}</p>}
    <form className="saisie-chat" onSubmit={ev => { ev.preventDefault(); envoyer(texte) }}>
      <label htmlFor="chat-texte" className="visuellement-cache">Ton message</label>
      <textarea id="chat-texte" rows={2} value={texte} onChange={x => setTexte(x.target.value)} placeholder={placeholder ?? 'Pose ta question ou explique ton raisonnement'}
        onKeyDown={k => { if (k.key === 'Enter' && !k.shiftKey) { k.preventDefault(); envoyer(texte) } }} />
      <button className="principal" type="submit" disabled={!texte.trim() || charge}>Envoyer</button>
    </form>
    <div ref={fin} />
  </div>
}

export function Tuteur() {
  const e = useEtat()
  const [ctx] = useState(() => { const c = contexteTuteur.valeur; contexteTuteur.valeur = undefined; return c })
  const systeme = `${PROMPT_CHAT}\n\nProfil compact de l'élève : ${resumeEleve(e)}${ctx ? `\n\nPage ouverte par l'élève (« ${ctx.titre} ») :\n${ctx.texte}` : ''}`
  return <section className="page-tuteur">
    <h1>🤖 Tuteur {ctx && <small>· {ctx.titre}</small>}</h1>
    <p className="note">Le tuteur t'aide à trouver toi-même : il donne des indices avant les réponses. Ce qu'il écrit peut contenir des erreurs ; en cas de doute, fie-toi au cours.</p>
    <Chat systeme={systeme} premier={ctx?.question?.trim() ? `Je n'ai pas compris : ${ctx.question}` : undefined} />
  </section>
}
