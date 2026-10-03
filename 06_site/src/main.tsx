import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/lexend'
import '@fontsource-variable/baloo-2'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

// Hors ligne : le service worker met en cache le site, les cours et les schémas.
if ('serviceWorker' in navigator && import.meta.env.PROD)
  navigator.serviceWorker.register('./sw.js').catch(() => { /* environnement sans service worker */ })
