import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal Vite config - just React support and a dev server on port 5173.
// Nothing extra is needed for a beginner-friendly hackathon project.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
