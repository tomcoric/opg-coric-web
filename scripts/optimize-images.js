import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const DIRS = [
  'public/images/proizvodi',
  'public/images',
]
const EXTS = ['.png', '.jpg', '.jpeg']
const WEBP_QUALITY = 82

async function optimizeDir(dir) {
  let files
  try { files = await readdir(dir) } catch { return }

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!EXTS.includes(ext)) continue

    const src = join(dir, file)
    const dest = join(dir, basename(file, ext) + '.webp')

    const srcStat = await stat(src)
    const srcKB = Math.round(srcStat.size / 1024)

    await sharp(src)
      .webp({ quality: WEBP_QUALITY })
      .toFile(dest)

    const destStat = await stat(dest)
    const destKB = Math.round(destStat.size / 1024)
    const saved = Math.round((1 - destStat.size / srcStat.size) * 100)

    console.log(`${file} → ${basename(dest)}  ${srcKB}KB → ${destKB}KB  (-${saved}%)`)
  }
}

for (const dir of DIRS) {
  await optimizeDir(dir)
}
console.log('\nDone.')
