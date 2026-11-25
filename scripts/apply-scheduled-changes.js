// Primjenjuje zakazane promjene iz scripts/scheduled-changes.json na src/data/products.json.
//
// Pokreće se svaki dan u workflowu "Generate daily price list", prije generiranja cjenika.
// Promjena čiji je datum danas ili ranije (Europe/Zagreb) upisuje se u products.json i briše
// s popisa zakazanih — tako se primijeni točno jednom i kasnija ručna izmjena je ne poništava.
//
// Za lokalnu provjeru: SCHEDULE_TODAY=2026-12-10 node scripts/apply-scheduled-changes.js
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SCHEDULE_FILE = join(ROOT, 'scripts', 'scheduled-changes.json')
const PRODUCTS_FILE = join(ROOT, 'src', 'data', 'products.json')
const ALLOWED_FIELDS = new Set(['available', 'price', 'specialSale', 'specialSaleName'])

function todayInZagreb() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zagreb' }).format(new Date())
}

function readJson(file) {
  const raw = readFileSync(file, 'utf-8')
  return { data: JSON.parse(raw), trailingNewline: raw.endsWith('\n') }
}

function writeJson(file, data, trailingNewline) {
  writeFileSync(file, JSON.stringify(data, null, 2) + (trailingNewline ? '\n' : ''), 'utf-8')
}

const today = process.env.SCHEDULE_TODAY || todayInZagreb()
const schedule = readJson(SCHEDULE_FILE)
const products = readJson(PRODUCTS_FILE)

const due = schedule.data.changes.filter(c => c.date <= today)
if (due.length === 0) {
  console.log(`Nema zakazanih promjena za ${today}.`)
  process.exit(0)
}

for (const change of due) {
  const product = products.data.products.find(p => p.id === change.productId)
  if (!product) throw new Error(`Zakazana promjena (${change.date}): nepoznat proizvod "${change.productId}".`)
  for (const [field, value] of Object.entries(change.set)) {
    if (!ALLOWED_FIELDS.has(field)) throw new Error(`Zakazana promjena (${change.date}): polje "${field}" nije dozvoljeno.`)
    if (typeof value !== typeof product[field]) throw new Error(`Zakazana promjena (${change.date}): "${field}" mora biti ${typeof product[field]}.`)
    product[field] = value
  }
  console.log(`Primijenjeno (${change.date}): ${change.description}`)
}

schedule.data.changes = schedule.data.changes.filter(c => c.date > today)
writeJson(PRODUCTS_FILE, products.data, products.trailingNewline)
writeJson(SCHEDULE_FILE, schedule.data, schedule.trailingNewline)
