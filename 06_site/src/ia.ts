import type { Etat } from './store'
import { lacunes } from './store'
import type { Base } from './types'

export const PROMPT_TUTEUR = `Tu es le tuteur d'un élève de Seconde S au Togo qui vise 20/20.
Ton : bienveillant et exigeant. Réponds en français, niveau Seconde, vocabulaire togolais (composition, devoir surveillé, semestre).
Règles : ne donne jamais la réponse finale avant que l'élève ait tenté ; guide par questions et indices.
Appuie-toi sur le cours fourni en contexte plutôt que d'inventer. Si la question sort du programme de Seconde S, dis-le.`

export const PROMPT_REMEDIATION = `${PROMPT_TUTEUR}
Tâche : séance de récupération. Structure obligatoire :
1. Diagnostic en une phrase (« Tu confonds X et Y »).
2. Réexplication sous 3 angles : intuitif/imagé, formel, exemple résolu pas à pas (plus un contre-exemple si utile).
3. Si la vraie cause est un prérequis de 3e/4e, reviens dessus.
4. Termine par UN exercice de preuve active : l'élève doit le résoudre ET expliquer son raisonnement. N'en donne pas la solution.`

/** Résumé compact envoyé à l'IA (jamais l'historique brut). */
export function resumeEleve(e: Etat, base: Base): string {
  const nom = (id: string) => base.matieres.flatMap(m => m.chapitres).flatMap(c => c.notions).find(n => n.id === id)?.titre ?? id
  const erreurs = e.tentatives.filter(t => !t.juste).slice(-20).map(t => `${t.exo} (${t.notions.map(nom).join(', ')})`)
  return JSON.stringify({
    profil: e.profil && { moyennes: e.profil.moyennes, faibles: e.profil.faibles, objectif: 20, style: e.profil.style },
    dernieres_erreurs: erreurs,
    commentaires: e.commentaires.slice(-10).map(c => `${nom(c.cible)} : ${c.texte}`),
    lacunes: lacunes(e).slice(0, 8).map(l => ({ notion: nom(l.notion), score: l.score })),
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
      body: JSON.stringify({ model: cfg.modele, max_tokens: 1500, system: systeme, messages: msgs }),
    })
    if (!r.ok) throw new Error(`Erreur ${r.status} : ${await r.text()}`)
    const j = await r.json()
    return j.content.map((b: { text?: string }) => b.text ?? '').join('')
  }
  const r = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${cfg.cle}` },
    body: JSON.stringify({ model: cfg.modele, messages: [{ role: 'system', content: systeme }, ...msgs] }),
  })
  if (!r.ok) throw new Error(`Erreur ${r.status} : ${await r.text()}`)
  const j = await r.json()
  return j.choices[0].message.content
}
