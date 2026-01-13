// main.jsx
// Purpose: Application entry point. Mounts the React app into the DOM.
// - Imports global CSS and renders `App` inside `StrictMode`.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
