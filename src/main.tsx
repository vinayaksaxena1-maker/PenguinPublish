import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Support both local/Vercel (root) and GitHub Pages subfolders dynamically
const baseName = window.location.pathname.startsWith('/PenguinPublish') 
  ? '/PenguinPublish' 
  : '/'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
