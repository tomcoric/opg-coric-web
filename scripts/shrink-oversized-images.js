import sharp from 'sharp'
import { statSync } from 'fs'

const MAX_WIDTH = 900
const WEBP_QUALITY = 82

const targets = [
  'public/images/proizvodi/kulin_1',
  'public/images/proizvodi/seka',
  'public/images/proizvodi/kobasica',
  'public/images/proizvodi/slanina',
  'public/images/proizvodi/budola',
  'public/images/proizvodi/pecenica',
  'public/images/kulin_visi',
]

for (const base of targets) {
  const src = base + '.png'
  const out = base + '.webp'
  const beforeKB = Math.round(statSync(out).size / 1024)
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(out)
  const afterKB = Math.round(statSync(out).size / 1024)
  console.log(`${out}: ${beforeKB}KB -> ${afterKB}KB`)
}
