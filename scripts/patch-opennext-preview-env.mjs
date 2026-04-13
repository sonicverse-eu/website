import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const serverBundlePath = path.join(cwd, '.open-next/server-functions/default/index.mjs')
const initPath = path.join(cwd, '.open-next/cloudflare/init.js')

const serverBundle = await readFile(serverBundlePath, 'utf8')
const initFile = await readFile(initPath, 'utf8')

const previewModeId = readPreviewValue(serverBundle, 'previewModeId')
const previewModeSigningKey = readPreviewValue(serverBundle, 'previewModeSigningKey')
const previewModeEncryptionKey = readPreviewValue(serverBundle, 'previewModeEncryptionKey')

const marker = '// Injected by scripts/patch-opennext-preview-env.mjs'
const injectedBlock = [
  marker,
  `process.env.__NEXT_PREVIEW_MODE_ID ??= ${JSON.stringify(previewModeId)};`,
  `process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY ??= ${JSON.stringify(previewModeSigningKey)};`,
  `process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY ??= ${JSON.stringify(previewModeEncryptionKey)};`,
].join('\n')

if (!initFile.includes(marker)) {
  const anchor = '  process.env.__NEXT_PRIVATE_ORIGIN = url.origin;\n'

  if (!initFile.includes(anchor)) {
    throw new Error(`Could not find injection anchor in ${initPath}`)
  }

  const patchedInitFile = initFile.replace(anchor, `${anchor}${injectedBlock}\n`)
  await writeFile(initPath, patchedInitFile)
  console.log('Patched OpenNext Cloudflare init with preview mode environment variables.')
} else {
  console.log('OpenNext Cloudflare init already contains preview mode patch.')
}

function readPreviewValue(contents, key) {
  const pattern = new RegExp(`"${key}":\\s*"([^"]+)"`)
  const match = contents.match(pattern)

  if (!match) {
    throw new Error(`Could not find ${key} in ${serverBundlePath}`)
  }

  return match[1]
}
