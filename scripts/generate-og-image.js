import sharp from 'sharp'
import { Buffer } from 'node:buffer'

const WIDTH = 1200
const HEIGHT = 630

const bg = await sharp('public/images/title-slika.jpg')
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 0.55, saturation: 1.05 })
  .toBuffer()

const logo = await sharp('public/images/logo_final.png')
  .resize({ height: 220 })
  .toBuffer()
const logoMeta = await sharp(logo).metadata()
const logoLeft = Math.round((WIDTH - logoMeta.width) / 2)

const overlaySvg = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="vign" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vign)"/>
  <text x="50%" y="470" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="600" fill="#F5F1E8">
    OPG Kulin Ćorić
  </text>
  <text x="50%" y="520" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#D4B84A">
    DOMAĆI KULIN I SUHOMESNATI PROIZVODI — ĐAKOVO
  </text>
</svg>
`)

await sharp(bg)
  .composite([
    { input: logo, left: logoLeft, top: 90 },
    { input: overlaySvg, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88 })
  .toFile('public/og-image.jpg')

console.log('og-image.jpg generated')
