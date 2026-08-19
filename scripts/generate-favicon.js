import sharp from 'sharp'
import { Buffer } from 'node:buffer'

const CANVAS = 512
const GOLD = '#D4B84A'
const BG = '#0A0A0A'

const ringSvg = Buffer.from(`
<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${CANVAS / 2 - 14}" fill="${BG}" stroke="${GOLD}" stroke-width="14"/>
</svg>
`)

const logo = await sharp('public/images/kulin_coric_mali_logo_web.png')
  .resize({ width: Math.round(CANVAS * 0.62) })
  .toBuffer()
const logoMeta = await sharp(logo).metadata()

const baseBuffer = await sharp(ringSvg)
  .composite([
    {
      input: logo,
      left: Math.round((CANVAS - logoMeta.width) / 2),
      top: Math.round((CANVAS - logoMeta.height) / 2) - 6,
    },
  ])
  .png()
  .toBuffer()

const sizes = [16, 32, 48, 180]
for (const size of sizes) {
  await sharp(baseBuffer).resize(size, size).png().toFile(`public/favicon-${size}.png`)
}

console.log('favicon PNGs generated:', sizes.join(', '))
