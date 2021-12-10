import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    watch: process.env.MODE === 'watch' ? {} : null,
    outDir: '../build',
    manifest: true,
    emptyOutDir: true,
  }
})
