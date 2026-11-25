import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sitemapPlugin } from './scripts/sitemap.js'
import { faqJsonLd } from './src/data/faq.js'

// Umeće FAQPage JSON-LD (iz src/data/faq.js) na mjesto <!--FAQ_JSON_LD--> u index.html.
function faqSchemaPlugin() {
  return {
    name: 'kulin-faq-schema',
    transformIndexHtml(html) {
      if (!html.includes('<!--FAQ_JSON_LD-->')) {
        throw new Error('index.html: nedostaje <!--FAQ_JSON_LD--> oznaka za FAQ schemu.')
      }
      return html.replace(
        '<!--FAQ_JSON_LD-->',
        `<script type="application/ld+json">\n${faqJsonLd()}\n    </script>`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin(), faqSchemaPlugin()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'decoy-blizzard-wifi.ngrok-free.dev'
    ]
  }
})