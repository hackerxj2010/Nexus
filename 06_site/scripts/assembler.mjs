// Assemble les données produites par les agents en fichiers servis par le site (public/data, public/medias)
// et produit la structure (03_structure). Lancé automatiquement avant `dev` et `build`.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const racine = process.env.RACINE_DONNEES ?? path.resolve(site, '..')
const pub = path.join(site, 'public')
const MATS = [
  { id: 'M', nom: 'Mathématiques', couleur: '#2563eb', icone: '📐' },
  { id: 'PC', nom: 'Physique-Chimie', couleur: '#dc2626', icone: '⚗️' },
  { id: 'SVT', nom: 'SVT', couleur: '#16a34a', icone: '🌿' },
  { id: 'FR', nom: 'Français', couleur: '#9333ea', icone: '📖' },
]

const lire = f => JSON.parse(fs.readFileSync(f, 'utf8'))
const jsons = dir => !fs.existsSync(dir) ? [] : fs.readdirSync(dir, { withFileTypes: true })
  .flatMap(d => d.isDirectory() ? jsons(path.join(dir, d.name)) : d.name.endsWith('.json') ? [path.join(dir, d.name)] : [])
const ecrire = (f, data) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(data)) }
const norm = s => (s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()

/** Rattache une épreuve aux chapitres dont le titre partage le plus de mots significatifs. */
function rattacher(titres, chapitres) {
  const ids = new Set()
  for (const t of titres ?? []) {
    const mots = new Set(norm(t).split(' ').filter(m => m.length > 3))
    let best, score = 0
    for (const c of chapitres) {
      const s = norm(c.titre).split(' ').filter(m => mots.has(m)).length
      if (s > score) { score = s; best = c.id }
    }
    if (best) ids.add(best)
  }
  return [...ids]
}

fs.rmSync(path.join(pub, 'data'), { recursive: true, force: true })
const index = { genere: new Date().toISOString(), matieres: [] }
const graphe = { noeuds: [], aretes: [] }
const structure = []
const fichiersPrecache = []

for (const m of MATS) {
  const progF = path.join(racine, '01_recherche/programme', `${m.id}.json`)
  const prog = fs.existsSync(progF) ? lire(progF) : null
  const chapitres = jsons(path.join(racine, '02_base_donnees', m.id)).map(lire).sort((a, b) => a.ordre - b.ordre)
  const epreuves = jsons(path.join(racine, '01_recherche/epreuves', m.id)).map(lire)
    .sort((a, b) => a.semestre - b.semestre || a.id.localeCompare(b.id))
  for (const e of epreuves) if (!e.chapitres?.length) e.chapitres = rattacher(e.chapitres_titres, chapitres)

  ecrire(path.join(pub, 'data', `${m.id}.json`), { chapitres, epreuves })
  fichiersPrecache.push(`data/${m.id}.json`)

  index.matieres.push({
    ...m,
    programme: prog && { statut: prog.statut, decoupage: prog.decoupage, volume_horaire_hebdo: prog.volume_horaire_hebdo, coefficient: prog.coefficient_seconde_S, sources: prog.sources },
    chapitres: chapitres.map(c => ({
      id: c.id, semestre: c.semestre, ordre: c.ordre, titre: c.titre,
      notions: c.notions.map(n => ({ id: n.id, titre: n.titre })), nbExercices: c.exercices.length,
    })),
    epreuves: epreuves.map(e => ({
      id: e.id, semestre: e.semestre, type: e.type, authentique: !!e.authentique, pays: e.pays,
      etablissement: e.source?.etablissement, annee: e.source?.annee_scolaire, duree_min: e.duree_min, chapitres: e.chapitres,
    })),
  })

  for (const c of chapitres) {
    structure.push({ matiere: m.id, semestre: c.semestre, chapitre: c.id, titre: c.titre, ordre: c.ordre,
      parcours: [...c.notions.map(n => ({ notion: n.id, cours: true, exemples: n.exemples_resolus?.length ?? 0 })),
        { exercices: [...c.exercices].sort((a, b) => a.difficulte - b.difficulte).map(e => e.id) },
        { epreuves: epreuves.filter(e => e.chapitres.includes(c.id)).map(e => e.id) }] })
    graphe.noeuds.push({ id: c.id, type: 'chapitre', titre: c.titre })
    for (const p of c.prerequis ?? []) graphe.aretes.push({ de: p, vers: c.id })
    for (const n of c.notions) {
      graphe.noeuds.push({ id: n.id, type: 'notion', titre: n.titre, chapitre: c.id })
      for (const p of n.prerequis_notions ?? []) graphe.aretes.push({ de: p, vers: n.id })
    }
  }
}

ecrire(path.join(pub, 'data', 'index.json'), index)
fichiersPrecache.push('data/index.json')

// Médias
const svgSrc = path.join(racine, '05_medias/svg')
fs.rmSync(path.join(pub, 'medias'), { recursive: true, force: true })
if (fs.existsSync(svgSrc)) {
  fs.mkdirSync(path.join(pub, 'medias'), { recursive: true })
  for (const f of fs.readdirSync(svgSrc).filter(f => f.endsWith('.svg'))) {
    fs.copyFileSync(path.join(svgSrc, f), path.join(pub, 'medias', f)); fichiersPrecache.push(`medias/${f}`)
  }
}

// Index des médias (Agent 5)
const medias = { genere: index.genere, images: [], sons: [
  { id: 'juste', description: 'Bonne réponse (deux notes montantes)', source: 'généré par Web Audio (06_site/src/sons.ts)', licence: 'création originale' },
  { id: 'erreur', description: 'Erreur douce (deux notes descendantes)', source: 'généré par Web Audio', licence: 'création originale' },
  { id: 'niveau', description: 'Niveau gagné / composition réussie (arpège)', source: 'généré par Web Audio', licence: 'création originale' },
], narration: 'Synthèse vocale du navigateur (voix française) sur chaque notion, bouton 🔊', videos: [] }
for (const m of MATS) for (const c of jsons(path.join(racine, '02_base_donnees', m.id)).map(lire)) for (const n of c.notions) {
  if (n.image?.fichier) medias.images.push({ fichier: n.image.fichier, notion: n.id, alt: n.image.alt, legende: n.image.legende, licence: n.image.licence })
  for (const v of n.videos ?? []) medias.videos.push({ ...v, notion: n.id })
}
fs.writeFileSync(path.join(racine, '05_medias/medias_index.json'), JSON.stringify(medias, null, 1))

// Structure (Agent 3)
const st = path.join(racine, '03_structure')
fs.mkdirSync(st, { recursive: true })
fs.writeFileSync(path.join(st, 'structure.json'), JSON.stringify(structure, null, 1))
fs.writeFileSync(path.join(st, 'graphe_notions.json'), JSON.stringify(graphe, null, 1))

// Liste de pré-cache pour le service worker (hors ligne)
const hash = crypto.createHash('sha1')
for (const f of fichiersPrecache) hash.update(f + fs.statSync(path.join(pub, f)).size)
ecrire(path.join(pub, 'precache.json'), { version: hash.digest('hex').slice(0, 10), fichiers: fichiersPrecache })

const n = index.matieres.map(m => `${m.id}: ${m.chapitres.length} ch., ${m.epreuves.length} ép.`).join(' · ')
console.log(`Données assemblées — ${n}`)
