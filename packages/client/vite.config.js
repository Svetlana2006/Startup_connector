import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@govbridge/data': fileURLToPath(new URL('../data/src/index.js', import.meta.url)),
      '@govbridge/ui': fileURLToPath(new URL('../ui/src/index.js', import.meta.url)),
    },
  },
})
