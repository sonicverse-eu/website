import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()

const manifestPaths = [
  '.next/prerender-manifest.json',
  '.open-next/server-functions/default/.next/prerender-manifest.json',
]

const bundlePaths = [
  '.open-next/middleware/handler.mjs',
  '.open-next/server-functions/default/index.mjs',
  '.open-next/server-functions/default/handler.mjs',
]

const runtimePreviewSecretBlock = `var runtimePreviewModeSigningKey = process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || process.env.NEXT_PREVIEW_MODE_SIGNING_KEY || "";
var runtimePreviewModeEncryptionKey = process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || process.env.NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "";
`

const runtimePreviewEnvBlock = `process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;
process.env.__NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;
if (!process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY) process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY = runtimePreviewModeSigningKey;
if (!process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY) process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY = runtimePreviewModeEncryptionKey;`

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function sanitizeManifest(relativePath) {
  const manifestPath = path.join(rootDir, relativePath)

  if (!(await fileExists(manifestPath))) {
    return
  }

  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))

  if (!manifest.preview) {
    return
  }

  manifest.preview.previewModeSigningKey = ''
  manifest.preview.previewModeEncryptionKey = ''

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}

function sanitizeBundleSource(source) {
  let updated = source

  if (!updated.includes(runtimePreviewSecretBlock.trim())) {
    updated = updated.replace('var PrerenderManifest = ', `${runtimePreviewSecretBlock}var PrerenderManifest = `)
  }

  updated = updated.replace(
    /"preview": \{ "previewModeId": "([^"]+)", "previewModeSigningKey": "[^"]*", "previewModeEncryptionKey": "[^"]*" \}/,
    '"preview": { "previewModeId": "$1", "previewModeSigningKey": runtimePreviewModeSigningKey, "previewModeEncryptionKey": runtimePreviewModeEncryptionKey }',
  )

  updated = updated.replace(
    /preview:\{previewModeId:"([^"]+)",previewModeSigningKey:"[^"]*",previewModeEncryptionKey:"[^"]*"\}/,
    'preview:{previewModeId:"$1",previewModeSigningKey:runtimePreviewModeSigningKey,previewModeEncryptionKey:runtimePreviewModeEncryptionKey}',
  )

  updated = updated.replace(
    /process\.env\.NEXT_PREVIEW_MODE_ID = PrerenderManifest\?\.preview\?\.previewModeId;/,
    runtimePreviewEnvBlock,
  )

  updated = updated.replace(
    /process\.env\.NEXT_PREVIEW_MODE_ID=PrerenderManifest\?\.preview\?\.previewModeId;/,
    runtimePreviewEnvBlock.replaceAll(' = ', '=').replaceAll('if (!', 'if(!').replaceAll(') process', ')process'),
  )

  return updated
}

async function sanitizeBundle(relativePath) {
  const bundlePath = path.join(rootDir, relativePath)

  if (!(await fileExists(bundlePath))) {
    return
  }

  const source = await fs.readFile(bundlePath, 'utf8')
  const updated = sanitizeBundleSource(source)

  if (updated !== source) {
    await fs.writeFile(bundlePath, updated)
  }
}

await Promise.all(manifestPaths.map(sanitizeManifest))
await Promise.all(bundlePaths.map(sanitizeBundle))
