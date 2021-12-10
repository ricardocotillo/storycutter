import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    VitePWA(),
  ],
  build: {
    watch: process.env.MODE === 'watch' ? {} : null,
    outDir: '../build',
    emptyOutDir: true,
  }
})
