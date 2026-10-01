import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const GENERATOR = join(__dirname, 'generate-price-list.js')

let failures = 0

function assert(condition, message) {
  if (!condition) {
    failures++
    console.error(`✗ ${message}`)
  } else {
    console.log(`✓ ${message}`)
  }
}

function baseProduct(overrides = {}) {
  return {
    id: 'kulin', name: 'Kulin', code: 'KULIN-001', brand: 'Kulin Ćorić',
    unit: 'kg', price: 40, anchorPrice: null, anchorPriceDate: null,
    barcode: '', available: true, specialSale: false, specialSaleName: '',
    ...overrides,
  }
}

function runGeneratorIn(projectDir) {
  // Pokreće pravu skriptu (ne kopiju) s putanjama preusmjerenim na testni direktorij preko
  // env varijabli — tako sharp i dalje nalazi node_modules pravog projekta.
  execFileSync(process.execPath, [GENERATOR], {
    env: {
      ...process.env,
      PRICE_LIST_PRODUCTS_PATH: join(projectDir, 'src/data/products.json'),
      PRICE_LIST_OUTPUT_DIR: join(projectDir, 'public/cjenici'),
    },
  })
}

function setupProject(products) {
  const dir = mkdtempSync(join(tmpdir(), 'cjenik-test-'))
  mkdirSync(join(dir, 'src/data'), { recursive: true })
  mkdirSync(join(dir, 'public/cjenici'), { recursive: true })
  writeFileSync(join(dir, 'src/data/products.json'), JSON.stringify({ products }))
  return dir
}

function today() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zagreb', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  const get = (t) => parts.find(p => p.type === t).value
  return `${get('year')}-${get('month')}-${get('day')}`
}

// --- Test 1: osnovno generiranje, ispravan broj proizvoda i cijena ---
{
  const dir = setupProject([baseProduct({ price: 40 })])
  runGeneratorIn(dir)
  const csv = readFileSync(join(dir, 'public/cjenici/latest.csv'), 'utf-8')
  assert(csv.includes('Kulin;KULIN-001'), 'CSV sadrži redak za Kulin')
  assert(csv.includes(';40.00;40.00;'), 'Cijena 40 je ispravno formatirana kao 40.00')
  assert(existsSync(join(dir, `public/cjenici/cjenik-${today()}.csv`)), 'Generirana je datirana arhivska datoteka za danas')
  assert(existsSync(join(dir, 'public/cjenici/latest.png')), 'Generirana je slika cjenika (latest.png)')

  const meta = JSON.parse(readFileSync(join(dir, 'public/cjenici/latest.json'), 'utf-8'))
  assert(meta.productCount === 1, 'latest.json prijavljuje ispravan broj proizvoda (1)')
  assert(meta.date === today(), 'latest.json datum odgovara današnjem danu (Europe/Zagreb)')

  rmSync(dir, { recursive: true, force: true })
}

// --- Test 2: promjena cijene 40 -> 42 trajno vrijedi za sve sljedeće generacije ---
{
  const dir = setupProject([baseProduct({ price: 40 })])
  runGeneratorIn(dir)
  let csv = readFileSync(join(dir, 'public/cjenici/latest.csv'), 'utf-8')
  assert(csv.includes(';40.00;40.00;'), 'Prije izmjene: cijena je 40.00')

  writeFileSync(join(dir, 'src/data/products.json'), JSON.stringify({ products: [baseProduct({ price: 42 })] }))
  runGeneratorIn(dir)
  csv = readFileSync(join(dir, 'public/cjenici/latest.csv'), 'utf-8')
  assert(csv.includes(';42.00;42.00;'), 'Nakon izmjene: cijena je 42.00')
  assert(!csv.includes(';40.00;40.00;'), 'Nakon izmjene: stara cijena 40.00 se više ne pojavljuje')

  runGeneratorIn(dir)
  csv = readFileSync(join(dir, 'public/cjenici/latest.csv'), 'utf-8')
  assert(csv.includes(';42.00;42.00;'), 'Treće generiranje i dalje koristi 42.00 (automatika se ne vraća na staru cijenu)')

  rmSync(dir, { recursive: true, force: true })
}

// --- Test 3: nedostupnost i sidrena cijena ---
{
  const dir = setupProject([baseProduct({ available: false, anchorPrice: 38, anchorPriceDate: '2025-05-02' })])
  runGeneratorIn(dir)
  const csv = readFileSync(join(dir, 'public/cjenici/latest.csv'), 'utf-8')
  assert(csv.includes(';nedostupno'), 'available:false generira "nedostupno" u CSV-u')
  assert(csv.includes(';38.00;2025-05-02;'), 'Sidrena cijena i datum se ispravno ispisuju kad su postavljeni')
  rmSync(dir, { recursive: true, force: true })
}

// --- Test 4: nedostajuća cijena mora prekinuti generiranje s greškom ---
{
  const dir = setupProject([baseProduct({ price: undefined })])
  let threw = false
  try {
    runGeneratorIn(dir)
  } catch {
    threw = true
  }
  assert(threw, 'Generator prekida s greškom (exit code != 0) kad proizvodu nedostaje cijena')
  rmSync(dir, { recursive: true, force: true })
}

// --- Test 5: nedostajući naziv proizvoda mora prekinuti generiranje s greškom ---
{
  const dir = setupProject([baseProduct({ name: undefined })])
  let threw = false
  try {
    runGeneratorIn(dir)
  } catch {
    threw = true
  }
  assert(threw, 'Generator prekida s greškom kad proizvodu nedostaje naziv')
  rmSync(dir, { recursive: true, force: true })
}

// --- Test 6: ponovljeno pokretanje istog dana ne stvara duplikate arhivskih datoteka ---
{
  const dir = setupProject([baseProduct({ price: 40 })])
  runGeneratorIn(dir)
  runGeneratorIn(dir)
  runGeneratorIn(dir)
  const dated = readdirSync(join(dir, 'public/cjenici')).filter(f => /^cjenik-\d{4}-\d{2}-\d{2}\.csv$/.test(f))
  assert(dated.length === 1, 'Tri pokretanja istog dana daju jednu datiranu datoteku (bez duplikata)')
  rmSync(dir, { recursive: true, force: true })
}

console.log('')
if (failures > 0) {
  console.error(`${failures} test(ova) nije prošlo.`)
  process.exit(1)
} else {
  console.log('Svi testovi prošli.')
}
