import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const serverBundlePath = path.join(cwd, '.open-next/server-functions/default/index.mjs')
const prerenderManifestPath = path.join(
  cwd,
  '.open-next/server-functions/default/.next/prerender-manifest.json',
)
const initPath = path.join(cwd, '.open-next/cloudflare/init.js')

const serverBundle = await readFile(serverBundlePath, 'utf8')
const initFile = await readFile(initPath, 'utf8')

const previewModeId = await readPreviewValue(serverBundle, 'previewModeId')
const previewModeSigningKey = await readPreviewValue(serverBundle, 'previewModeSigningKey')
const previewModeEncryptionKey = await readPreviewValue(serverBundle, 'previewModeEncryptionKey')

const marker = '// Injected by scripts/patch-opennext-preview-env.mjs'

if (!initFile.includes(marker)) {
  const anchor = /^([ \t]*)process\.env\.__NEXT_PRIVATE_ORIGIN = url\.origin;\r?\n/m

  if (!anchor.test(initFile)) {
    throw new Error(`Could not find injection anchor in ${initPath}`)
  }

  const anchorMatch = initFile.match(anchor)

  if (!anchorMatch) {
    throw new Error(`Could not find injection anchor in ${initPath}`)
  }

  const matchedAnchor = anchorMatch[0]
  const indentation = anchorMatch[1] ?? ''
  const lineEnding = matchedAnchor.endsWith('\r\n') ? '\r\n' : '\n'
  const injectedBlock = [
    marker,
    `process.env.__NEXT_PREVIEW_MODE_ID ??= ${JSON.stringify(previewModeId)};`,
    `process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY ??= ${JSON.stringify(previewModeSigningKey)};`,
    `process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY ??= ${JSON.stringify(previewModeEncryptionKey)};`,
  ]
    .map((line) => `${indentation}${line}`)
    .join(lineEnding)

  const patchedInitFile = initFile.replace(anchor, `${matchedAnchor}${injectedBlock}${lineEnding}`)
  await writeFile(initPath, patchedInitFile)
  console.log('Patched OpenNext Cloudflare init with preview mode environment variables.')
} else {
  console.log('OpenNext Cloudflare init already contains preview mode patch.')
}

async function readPreviewValue(contents, key) {
  const pattern = new RegExp(`"${key}":\\s*"([^"]+)"`)
  const match = contents.match(pattern)

  if (match) {
    return match[1]
  }

  try {
    const prerenderManifest = JSON.parse(await readFile(prerenderManifestPath, 'utf8'))
    const previewValue = prerenderManifest?.preview?.[key]

    if (typeof previewValue === 'string') {
      return previewValue
    }
  } catch {
    // Fall back to the existing error below when the manifest is missing or invalid.
  }

  throw new Error(`Could not find ${key} in ${serverBundlePath} or ${prerenderManifestPath}`)
}
