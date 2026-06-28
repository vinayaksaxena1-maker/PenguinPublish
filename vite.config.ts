import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Support both local/Vercel (relative paths) and GitHub Pages subfolders dynamically
export default defineConfig({
  base: './', 
  plugins: [react()],
  server: {
    port: 5173
  }
})
