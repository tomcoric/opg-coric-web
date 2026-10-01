import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
// Testovi (scripts/test-price-list.js) pokreću ovu istu skriptu s izmijenjenim putanjama,
// umjesto kopiranja u privremeni direktorij — tako sharp i dalje nalazi node_modules ovog projekta.
const PRODUCTS_PATH = process.env.PRICE_LIST_PRODUCTS_PATH ?? join(ROOT, 'src/data/products.json')
const OUTPUT_DIR = process.env.PRICE_LIST_OUTPUT_DIR ?? join(ROOT, 'public/cjenici')
const RETENTION_DAYS = 30

const CSV_COLUMNS = [
  'naziv', 'sifra', 'marka', 'jedinica_mjere', 'cijena_po_jedinici',
  'maloprodajna_cijena', 'posebna_prodaja', 'naziv_posebne_prodaje',
  'sidrena_cijena', 'datum_sidrene_cijene', 'barkod', 'dostupnost',
]

function todayInZagreb() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zagreb', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  const get = (type) => parts.find(p => p.type === type).value
  return `${get('year')}-${get('month')}-${get('day')}`
}

function nowInZagrebISO() {
  const date = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Zagreb', hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'shortOffset',
  }).formatToParts(date)
  const get = (type) => parts.find(p => p.type === type)?.value ?? ''
  const offsetRaw = get('timeZoneName').replace('GMT', '') || '+0'
  const match = offsetRaw.match(/^([+-])(\d{1,2})(?::(\d{2}))?$/)
  const offset = match
    ? `${match[1]}${match[2].padStart(2, '0')}:${match[3] ?? '00'}`
    : '+00:00'
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}${offset}`
}

function validateProducts(products) {
  const errors = []
  if (!Array.isArray(products) || products.length === 0) {
    errors.push('Konfiguracija proizvoda je prazna ili nije niz.')
    return errors
  }
  products.forEach((p, i) => {
    const label = p?.id || p?.name || `proizvod na poziciji ${i}`
    if (!p.name) errors.push(`${label}: nedostaje "name".`)
    if (!p.code) errors.push(`${label}: nedostaje "code".`)
    if (!p.unit) errors.push(`${label}: nedostaje "unit".`)
    if (typeof p.price !== 'number' || Number.isNaN(p.price) || p.price < 0) {
      errors.push(`${label}: "price" mora biti nenegativan broj.`)
    }
    if (p.anchorPrice != null && (typeof p.anchorPrice !== 'number' || Number.isNaN(p.anchorPrice))) {
      errors.push(`${label}: "anchorPrice" mora biti broj ili null.`)
    }
    if (typeof p.available !== 'boolean') errors.push(`${label}: "available" mora biti true/false.`)
    if (typeof p.specialSale !== 'boolean') errors.push(`${label}: "specialSale" mora biti true/false.`)
  })
  return errors
}

function csvEscape(value) {
  const str = String(value ?? '')
  if (str.includes(';') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatPrice(value) {
  return typeof value === 'number' ? value.toFixed(2) : ''
}

function buildCsv(products) {
  const lines = [CSV_COLUMNS.join(';')]
  for (const p of products) {
    const row = [
      p.name,
      p.code,
      p.brand ?? '',
      p.unit,
      formatPrice(p.price),
      formatPrice(p.price),
      p.specialSale ? 'true' : 'false',
      p.specialSaleName ?? '',
      formatPrice(p.anchorPrice),
      p.anchorPriceDate ?? '',
      p.barcode ?? '',
      p.available ? 'dostupno' : 'nedostupno',
    ]
    lines.push(row.map(csvEscape).join(';'))
  }
  const bom = String.fromCharCode(0xFEFF)
  return `${bom}${lines.join('\r\n')}\r\n`
}

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatDateHr(isoDate) {
  const [y, m, d] = isoDate.split('-')
  return `${d}.${m}.${y}.`
}

async function generateImage(products, date, outputDir) {
  const width = 960
  const marginX = 60
  const rowHeight = 48
  const headerHeight = 172
  const footerHeight = 76
  const height = headerHeight + products.length * rowHeight + footerHeight

  const rows = products.map((p, i) => {
    const y = headerHeight + i * rowHeight
    const available = p.available
    const priceText = available ? `${formatPrice(p.price)} €` : 'Nedostupno'
    const nameColor = available ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.4)'
    const priceColor = available ? '#D4B84A' : 'rgba(255,255,255,0.4)'
    return `
      <line x1="${marginX}" y1="${y}" x2="${width - marginX}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <text x="${marginX}" y="${y + 31}" font-family="Georgia, 'Times New Roman', serif" font-size="20" fill="${nameColor}">${xmlEscape(p.name)}</text>
      <text x="${width - marginX}" y="${y + 31}" font-family="Georgia, 'Times New Roman', serif" font-size="20" font-weight="600" fill="${priceColor}" text-anchor="end">${priceText}</text>
    `
  }).join('')

  const tableBottom = headerHeight + products.length * rowHeight

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#080808"/>
      <text x="${marginX}" y="54" font-family="Arial, sans-serif" font-size="13" font-weight="600" letter-spacing="4" fill="#C9A227">CJENIK</text>
      <text x="${marginX}" y="108" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-weight="600" fill="#F5F1E8">Kulin Ćorić</text>
      <text x="${marginX}" y="140" font-family="Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.5)">Cijene su izražene po kilogramu</text>
      <line x1="${marginX}" y1="${headerHeight - 14}" x2="${width - marginX}" y2="${headerHeight - 14}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
      ${rows}
      <line x1="${marginX}" y1="${tableBottom + 10}" x2="${width - marginX}" y2="${tableBottom + 10}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
      <text x="${marginX}" y="${height - 28}" font-family="Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.45)">Cjenik ažuriran: ${formatDateHr(date)}</text>
      <text x="${width - marginX}" y="${height - 28}" font-family="Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.45)" text-anchor="end">www.kulin-coric.hr</text>
    </svg>
  `)

  await sharp(svg).png().toFile(join(outputDir, 'latest.png'))
}

function cleanupOldFiles(dir, keepFiles) {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  const datedFilePattern = /^cjenik-(\d{4}-\d{2}-\d{2})\.csv$/
  let removed = 0

  for (const filename of readdirSync(dir)) {
    if (keepFiles.has(filename)) continue
    const match = filename.match(datedFilePattern)
    if (!match) continue
    const fileDate = new Date(`${match[1]}T00:00:00Z`).getTime()
    if (Number.isNaN(fileDate) || fileDate >= cutoff) continue
    unlinkSync(join(dir, filename))
    removed++
  }
  return removed
}

async function main() {
  if (!existsSync(PRODUCTS_PATH)) {
    console.error(`Greška: nije pronađena konfiguracija proizvoda na ${PRODUCTS_PATH}`)
    process.exit(1)
  }

  let config
  try {
    config = JSON.parse(readFileSync(PRODUCTS_PATH, 'utf-8'))
  } catch (err) {
    console.error(`Greška: neispravan JSON u ${PRODUCTS_PATH} — ${err.message}`)
    process.exit(1)
  }

  const products = config.products
  const errors = validateProducts(products)
  if (errors.length > 0) {
    console.error('Greška: konfiguracija proizvoda nije valjana:')
    for (const e of errors) console.error(`  - ${e}`)
    process.exit(1)
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })

  const date = todayInZagreb()
  const csv = buildCsv(products)
  const datedFilename = `cjenik-${date}.csv`

  writeFileSync(join(OUTPUT_DIR, datedFilename), csv, 'utf-8')
  writeFileSync(join(OUTPUT_DIR, 'latest.csv'), csv, 'utf-8')
  await generateImage(products, date, OUTPUT_DIR)

  const generatedAt = nowInZagrebISO()
  const metadata = {
    generatedAt,
    date,
    file: datedFilename,
    productCount: products.length,
  }
  writeFileSync(join(OUTPUT_DIR, 'latest.json'), `${JSON.stringify(metadata, null, 2)}\n`, 'utf-8')

  // Kopija izvorne konfiguracije — čita je PHP fallback skripta na hostingu
  // gdje src/ nije dostupan (deploya se samo public/).
  writeFileSync(
    join(OUTPUT_DIR, 'products-source.json'),
    `${JSON.stringify({ generatedAt, products }, null, 2)}\n`,
    'utf-8'
  )

  const removed = cleanupOldFiles(OUTPUT_DIR, new Set(['latest.csv', 'latest.json', 'products-source.json']))

  console.log('Cjenik uspješno generiran:')
  console.log(datedFilename)
  console.log(`${products.length} proizvoda`)
  if (removed > 0) console.log(`Obrisano ${removed} arhivskih datoteka starijih od ${RETENTION_DAYS} dana.`)
}

main().catch(err => {
  console.error(`Greška: ${err.message}`)
  process.exit(1)
})
