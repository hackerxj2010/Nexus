// Valide programme, chapitres et épreuves contre SCHEMA.md, et vérifie que tout le LaTeX compile avec KaTeX.
// Usage : node 02_base_donnees/valider.mjs [MAT]
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(path.join(racine, '06_site/package.json'))
const katex = require('katex')
require('katex/contrib/mhchem')

const filtre = process.argv[2]
const MATS = ['M', 'PC', 'SVT', 'FR'].filter(m => !filtre || m === filtre)
const erreurs = []
const err = (f, msg) => erreurs.push(`${path.relative(racine, f)} : ${msg}`)

function lireJson(f) {
  try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch (e) { err(f, `JSON invalide (${e.message})`); return null }
}
function fichiers(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => d.isDirectory() ? fichiers(path.join(dir, d.name)) : d.name.endsWith('.json') ? [path.join(dir, d.name)] : [])
}

/** Vérifie chaque formule $...$ / $$...$$ d'un texte. */
function verifierMaths(f, ou, texte) {
  if (typeof texte !== 'string') return
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g
  let m
  while ((m = re.exec(texte))) {
    const tex = m[1] ?? m[2]
    try { katex.renderToString(tex, { throwOnError: true, displayMode: !!m[1] }) } catch (e) { err(f, `${ou} : LaTeX invalide « ${tex.slice(0, 60)} » (${e.message.split('\n')[0]})`) }
  }
}
function parcourirTextes(f, ou, v) {
  if (typeof v === 'string') verifierMaths(f, ou, v)
  else if (Array.isArray(v)) v.forEach((x, i) => parcourirTextes(f, `${ou}[${i}]`, x))
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k !== 'url' && k !== 'source') parcourirTextes(f, `${ou}.${k}`, x)
}

const exige = (f, o, champs, ou) => { for (const c of champs) if (o?.[c] === undefined || o[c] === null || o[c] === '') err(f, `${ou} : champ « ${c} » manquant`) }
const svgDir = path.join(racine, '05_medias/svg')
const stats = {}

for (const MAT of MATS) {
  const s = stats[MAT] = { chapitres: 0, notions: 0, exercices: 0, flash: 0, images: 0, epreuves: {}, concours: 0, epreuvesNonTogo: 0 }
  const progF = path.join(racine, '01_recherche/programme', `${MAT}.json`)
  const prog = fs.existsSync(progF) ? lireJson(progF) : null
  if (prog) exige(progF, prog, ['matiere', 'decoupage', 'statut', 'sources', 'chapitres'], 'programme')

  const ids = new Set()
  for (const f of fichiers(path.join(racine, '02_base_donnees', MAT))) {
    const c = lireJson(f); if (!c) continue
    s.chapitres++
    exige(f, c, ['id', 'matiere', 'semestre', 'ordre', 'titre', 'objectifs', 'notions', 'exercices'], 'chapitre')
    if (path.basename(f, '.json') !== c.id) err(f, `nom de fichier ≠ id (${c.id})`)
    if (!/^(M|PC|SVT|FR)-S[12]-C\d\d$/.test(c.id ?? '')) err(f, `id de chapitre mal formé : ${c.id}`)
    ids.add(c.id)
    for (const n of c.notions ?? []) {
      s.notions++
      exige(f, n, ['id', 'titre', 'cours_md', 'definition', 'niveaux', 'flash'], `notion ${n.id}`)
      exige(f, n.niveaux, ['phrase', 'simple', 'complete'], `notion ${n.id}.niveaux`)
      if ((n.flash?.length ?? 0) < 4) err(f, `notion ${n.id} : moins de 4 fiches flash`)
      s.flash += n.flash?.length ?? 0
      if (n.image?.fichier) {
        if (fs.existsSync(path.join(svgDir, n.image.fichier))) s.images++
        else err(f, `notion ${n.id} : image ${n.image.fichier} absente de 05_medias/svg`)
      }
      for (const v of n.videos ?? []) if (!v.verifie) err(f, `notion ${n.id} : vidéo non vérifiée ${v.url}`)
    }
    for (const e of c.exercices ?? []) {
      s.exercices++
      exige(f, e, ['id', 'type', 'difficulte', 'notions', 'format', 'enonce', 'corrige', 'bareme'], `exercice ${e.id}`)
      if (e.authentique && e.type === 'exercice_type_inspire') err(f, `exercice ${e.id} : authentique incohérent avec le type`)
      if (e.corrige?.length !== e.bareme?.length) err(f, `exercice ${e.id} : corrige et bareme de longueurs différentes`)
      if (e.format === 'qcm' && !(Array.isArray(e.choix) && Number.isInteger(e.bonne_reponse) && e.choix[e.bonne_reponse] !== undefined)) err(f, `exercice ${e.id} : qcm sans choix/bonne_reponse valides`)
      if (e.format === 'reponse_courte' && !(e.reponses_acceptees?.length)) err(f, `exercice ${e.id} : reponse_courte sans reponses_acceptees`)
      if (!['qcm', 'reponse_courte', 'ouverte'].includes(e.format)) err(f, `exercice ${e.id} : format inconnu ${e.format}`)
    }
    parcourirTextes(f, c.id, c)
  }

  for (const f of fichiers(path.join(racine, '01_recherche/epreuves', MAT))) {
    const e = lireJson(f); if (!e) continue
    exige(f, e, ['id', 'matiere', 'semestre', 'type', 'pays', 'source', 'enonce_md', 'questions', 'verification'], 'épreuve')
    if (e.authentique) exige(f, e.source, ['url', 'date_consultation'], 'source')
    for (const q of e.questions ?? []) {
      exige(f, q, ['numero', 'enonce', 'corrige'], `question ${q.numero}`)
      if (q.bareme && q.bareme.length !== q.corrige?.length) err(f, `question ${q.numero} : corrige et bareme de longueurs différentes`)
    }
    parcourirTextes(f, e.id, { ...e, source: undefined })
    if (e.type === 'concours_entree') s.concours++
    else if (e.pays === 'Togo' && e.authentique) s.epreuves[`S${e.semestre}`] = (s.epreuves[`S${e.semestre}`] ?? 0) + 1
    else s.epreuvesNonTogo++
  }
}

console.table(Object.fromEntries(Object.entries(stats).map(([k, v]) => [k, { ...v, epreuves: JSON.stringify(v.epreuves) }])))
if (erreurs.length) { console.log(`\n${erreurs.length} erreur(s) :`); for (const e of erreurs.slice(0, 200)) console.log(' - ' + e); process.exitCode = 1 }
else console.log('\nAucune erreur.')
