import { memo, useMemo } from 'react'
import katex from 'katex'
import 'katex/contrib/mhchem'
import 'katex/dist/katex.min.css'
import { Marked } from 'marked'

const marked = new Marked({ gfm: true, breaks: true })
const TITRES: Record<string, string> = {
  definition: 'Définition', propriete: 'Propriété', methode: 'Méthode', remarque: 'Remarque', attention: 'Attention', theoreme: 'Théorème', exemple: 'Exemple',
}

function maths(tex: string, bloc: boolean): string {
  try { return katex.renderToString(tex, { displayMode: bloc, throwOnError: false, strict: false }) } catch { return tex }
}

/** Markdown + KaTeX ; le HTML brut du texte source est neutralisé. */
function markdown(src: string, enLigne: boolean): string {
  const formules: string[] = []
  const garde = (html: string) => `\u0000${formules.push(html) - 1}\u0000`
  let t = src
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, x) => garde(maths(x, true)))
    .replace(/\$([^$\n]+?)\$/g, (_, x) => garde(maths(x, false)))
    .replace(/</g, '&lt;')
  t = (enLigne ? marked.parseInline(t) : marked.parse(t)) as string
  return t.replace(/\u0000(\d+)\u0000/g, (_, i) => formules[+i])
}

/** Découpe les encadrés `:::type` … `:::`. */
function encadres(src: string): string {
  const lignes = src.split('\n'), sortie: string[] = []
  let tampon: string[] = [], type: string | null = null
  const vider = () => { if (tampon.length) sortie.push(markdown(tampon.join('\n'), false)); tampon = [] }
  for (const l of lignes) {
    const m = l.trim().match(/^:::\s*([a-zé]+)?\s*(.*)$/i)
    if (m && type === null && m[1]) {
      vider(); type = m[1].toLowerCase().replace('é', 'e')
      if (m[2]) tampon.push(`**${m[2]}**`)
    } else if (m && type !== null && !m[1]) {
      sortie.push(`<div class="encadre ${type}"><b class="etiquette">${TITRES[type] ?? type}</b>${markdown(tampon.join('\n'), false)}</div>`)
      tampon = []; type = null
    } else tampon.push(l)
  }
  if (type !== null) sortie.push(`<div class="encadre ${type}"><b class="etiquette">${TITRES[type] ?? type}</b>${markdown(tampon.join('\n'), false)}</div>`)
  else vider()
  return sortie.join('')
}

export const Riche = memo(function Riche({ texte, enLigne, className }: { texte: string; enLigne?: boolean; className?: string }) {
  const html = useMemo(() => enLigne ? markdown(texte ?? '', true) : encadres(texte ?? ''), [texte, enLigne])
  return enLigne
    ? <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
    : <div className={`riche ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />
})

/** Texte brut pour la synthèse vocale. */
export function pourAudio(s: string): string {
  return s.replace(/\$\$?([^$]+)\$\$?/g, (_, x: string) => x
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1 sur $2').replace(/\\sqrt\{([^}]*)\}/g, 'racine de $1')
    .replace(/\\(times|cdot)/g, ' fois ').replace(/\\ce\{([^}]*)\}/g, '$1').replace(/[\\{}^_]/g, ' '))
    .replace(/:::\w*/g, '').replace(/[*#|>`]/g, '').replace(/\s+/g, ' ')
}
