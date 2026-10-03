// Cache « réseau d'abord, sinon cache » : le site fonctionne hors ligne après une première visite.
const CACHE = 'secondeS-v1'
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html']))); self.skipWaiting() })
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url)
  if (e.request.method !== 'GET' || u.origin !== location.origin) return // jamais d'appels IA en cache
  e.respondWith(fetch(e.request).then(r => { const copie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); return r })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))))
})
