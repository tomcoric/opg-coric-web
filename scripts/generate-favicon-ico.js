import { readFileSync, writeFileSync } from 'fs'
import { Buffer } from 'node:buffer'

const png = readFileSync('public/favicon-32.png')

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)

const entry = Buffer.alloc(16)
entry.writeUInt8(32, 0)
entry.writeUInt8(32, 1)
entry.writeUInt8(0, 2)
entry.writeUInt8(0, 3)
entry.writeUInt16LE(1, 4)
entry.writeUInt16LE(32, 6)
entry.writeUInt32LE(png.length, 8)
entry.writeUInt32LE(header.length + entry.length, 12)

writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png]))
console.log('favicon.ico generated')
