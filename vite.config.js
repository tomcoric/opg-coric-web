import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sitemapPlugin } from './scripts/sitemap.js'

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'decoy-blizzard-wifi.ngrok-free.dev'
    ]
  }
})