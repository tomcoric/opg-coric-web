// Generira sitemap.xml pri svakom buildu (Vite plugin u vite.config.js).
//
// <lastmod> se računa automatski:
// - za stranice s izvorom u gitu: datum zadnjeg commita koji je dirao pripadne datoteke
// - za cjenik: datum builda (cjenik se mijenja svaki dan, a deploy se pokreće svaki dan
//   nakon generiranja cjenika — vidi .github/workflows/deploy.yml)
// Ako git nije dostupan (npr. build iz ZIP-a), koristi se datum builda.
//
// Za novu stranicu dovoljno je dodati zapis u PAGES.
import { execFileSync } from 'node:child_process'

const SITE_URL = 'https://www.kulin-coric.hr'

const PAGES = [
  { path: '/', sources: ['index.html', 'src', 'public/images'], changefreq: 'weekly', priority: '1.0' },
  { path: '/cjenik.html', daily: true, changefreq: 'daily', priority: '0.7' },
  { path: '/impressum.html', sources: ['public/impressum.html'], changefreq: 'yearly', priority: '0.3' },
  { path: '/politika-privatnosti.html', sources: ['public/politika-privatnosti.html'], changefreq: 'yearly', priority: '0.3' },
  { path: '/politika-kolacica.html', sources: ['public/politika-kolacica.html'], changefreq: 'yearly', priority: '0.3' },
  { path: '/uvjeti-koristenja.html', sources: ['public/uvjeti-koristenja.html'], changefreq: 'yearly', priority: '0.3' },
]

function today() {
  // en-CA daje format YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zagreb' }).format(new Date())
}

function lastCommitDate(sources, cwd) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], {
      cwd,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null
  } catch {
    return null
  }
}

export function buildSitemap(cwd = process.cwd()) {
  const fallback = today()
  const urls = PAGES.map(page => {
    const lastmod = page.daily ? fallback : (lastCommitDate(page.sources, cwd) ?? fallback)
    return [
      '  <url>',
      `    <loc>${SITE_URL}${page.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      '  </url>',
    ].join('\n')
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

// Vite plugin: dodaje sitemap.xml u dist/ pri buildu.
export function sitemapPlugin() {
  return {
    name: 'kulin-sitemap',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
    },
  }
}
