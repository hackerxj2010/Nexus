import { useEffect, useState } from 'react'

/** Routeur par hash (#/c/M-S1-C01) : le bouton retour d'Android fonctionne. */
export interface Route { page: string; id?: string; params: URLSearchParams }

function lireRoute(): Route {
  const [chemin, q] = location.hash.replace(/^#\/?/, '').split('?')
  const [page = '', id] = chemin.split('/')
  return { page, id: id && decodeURIComponent(id), params: new URLSearchParams(q) }
}

export function useRoute(): Route {
  const [r, setR] = useState(lireRoute)
  useEffect(() => {
    const f = () => { setR(lireRoute()); window.scrollTo(0, 0) }
    addEventListener('hashchange', f); return () => removeEventListener('hashchange', f)
  }, [])
  return r
}

export const lien = (page: string, id?: string, params?: Record<string, string>) =>
  `#/${page}${id ? `/${encodeURIComponent(id)}` : ''}${params ? `?${new URLSearchParams(params)}` : ''}`
export const aller = (page: string, id?: string, params?: Record<string, string>) => { location.hash = lien(page, id, params) }
