// Sons générés par Web Audio (aucun fichier tiers, libres de droits).
let ctx: AudioContext | undefined
function bip(freqs: number[], duree = 0.12) {
  try {
    ctx ??= new AudioContext()
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain(), t = ctx!.currentTime + i * duree
      o.frequency.value = f; o.type = 'triangle'
      g.gain.setValueAtTime(0.15, t); g.gain.exponentialRampToValueAtTime(0.001, t + duree)
      o.connect(g).connect(ctx!.destination); o.start(t); o.stop(t + duree)
    })
  } catch { /* audio indisponible */ }
}
export const sons = {
  juste: () => bip([660, 880]),
  erreur: () => bip([330, 294], 0.18),
  niveau: () => bip([523, 659, 784, 1047]),
}
