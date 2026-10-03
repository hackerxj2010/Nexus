import type { Etat } from './store'
import { lacunes } from './store'
import { titreNotion } from './donnees'
import tuteur from '../../08_ia_suivi/prompts/tuteur.md?raw'
import remediation from '../../08_ia_suivi/prompts/remediation.md?raw'
import chat from '../../08_ia_suivi/prompts/chat.md?raw'

export const PROMPT_TUTEUR = tuteur.trim()
export const PROMPT_REMEDIATION = `${PROMPT_TUTEUR}\n\n${remediation.trim()}`
export const PROMPT_CHAT = `${PROMPT_TUTEUR}\n\n${chat.trim()}`

/** Résumé compact envoyé à l'IA (jamais l'historique brut). */
export function resumeEleve(e: Etat, prerequisFaibles: string[] = []): string {
  const echecs = new Map<string, number>()
  for (const t of e.tentatives) if (!t.juste) for (const n of t.notions) echecs.set(n, (echecs.get(n) ?? 0) + 1)
  return JSON.stringify({
    profil: e.profil && { moyennes: e.profil.moyennes, matieres_faibles: e.profil.faibles, objectif: 20, style: e.profil.style },
    dernieres_erreurs: e.tentatives.filter(t => !t.juste).slice(-20).map(t => ({ exercice: t.exo, notions: t.notions.map(titreNotion) })),
    commentaires_eleve: e.commentaires.slice(-10).map(c => `${titreNotion(c.cible)} : ${c.texte}`),
    notions_en_echec_repete: [...echecs].filter(([, n]) => n >= 3).map(([id, n]) => `${titreNotion(id)} (${n} échecs)`),
    lacunes_principales: lacunes(e).slice(0, 8).map(l => titreNotion(l.notion)),
    prerequis_faibles: prerequisFaibles,
  })
}

export interface Msg { role: 'user' | 'assistant'; content: string }

/** La clé n'est envoyée qu'à l'URL du fournisseur choisi par l'élève. */
export async function appelerIA(cfg: NonNullable<Etat['ia']>, systeme: string, msgs: Msg[]): Promise<string> {
  const base = cfg.baseUrl.replace(/\/+$/, '')
  if (cfg.format === 'anthropic') {
    const r = await fetch(`${base}/v1/messages`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': cfg.cle, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: cfg.modele, max_tokens: 2000, system: systeme, messages: msgs }),
    })
    if (!r.ok) throw new Error(`Le fournisseur a répondu ${r.status}. Vérifie l'URL, la clé et le nom du modèle. ${(await r.text()).slice(0, 200)}`)
    const j = await r.json()
    return j.content.map((b: { text?: string }) => b.text ?? '').join('')
  }
  const r = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${cfg.cle}` },
    body: JSON.stringify({ model: cfg.modele, messages: [{ role: 'system', content: systeme }, ...msgs] }),
  })
  if (!r.ok) throw new Error(`Le fournisseur a répondu ${r.status}. Vérifie l'URL, la clé et le nom du modèle. ${(await r.text()).slice(0, 200)}`)
  const j = await r.json()
  return j.choices[0].message.content
}
