// Hors ligne : à l'installation, met en cache la page, les cours (data/*.json) et les schémas (medias/*.svg).
// Fichiers du site : cache d'abord (noms avec empreinte) ; page et données : réseau d'abord, sinon cache.
// Les appels au fournisseur d'IA (autre origine) ne passent jamais par le cache.
const CACHE = 'secondeS'

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE)
    await c.addAll(['./', './index.html', './manifest.webmanifest', './icone.svg'])
    try {
      const liste = await (await fetch('./precache.json', { cache: 'no-store' })).json()
      await c.addAll(liste.fichiers.map(f => './' + f))
    } catch { /* hors ligne pendant l'installation : le cache se remplira à l'usage */ }
    self.skipWaiting()
  })())
})
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url)
  if (e.request.method !== 'GET' || u.origin !== location.origin) return
  const immuable = u.pathname.includes('/assets/')
  e.respondWith((async () => {
    const c = await caches.open(CACHE)
    if (immuable) {
      const r = await c.match(e.request)
      if (r) return r
      const net = await fetch(e.request); c.put(e.request, net.clone()); return net
    }
    try {
      const net = await fetch(e.request)
      if (net.ok) c.put(e.request, net.clone())
      return net
    } catch {
      return (await c.match(e.request, { ignoreSearch: true })) ?? (await c.match('./index.html'))
    }
  })())
})
