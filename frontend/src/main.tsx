import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { AppLayers } from './app/AppLayers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppLayers />
  </StrictMode>,
)
