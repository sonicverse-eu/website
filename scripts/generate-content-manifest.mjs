import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'content')
const outputDir = path.join(rootDir, 'generated')
const outputFile = path.join(outputDir, 'content-manifest.ts')
const collections = ['blog', 'changelog', 'roadmap']

const manifest = {}

for (const collection of collections) {
  const directory = path.join(contentDir, collection)

  let files = []

  try {
    files = (await fs.readdir(directory))
      .filter((filename) => filename.endsWith('.mdx'))
      .sort((left, right) => left.localeCompare(right))
  } catch (error) {
    if (error.code === 'ENOENT') {
      files = []
    } else {
      throw error
    }
  }

  manifest[collection] = {}

  for (const filename of files) {
    const slug = filename.replace(/\.mdx$/, '')
    const source = await fs.readFile(path.join(directory, filename), 'utf8')
    manifest[collection][slug] = source
  }
}

const fileContents = `import type { ContentCollection } from "@/lib/content/types";

/**
 * Auto-generated from the /content directory.
 * Run \`npm run content:manifest\` after adding or updating MDX files.
 */
export const contentManifest = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<
  ContentCollection,
  Record<string, string>
>;
`

await fs.mkdir(outputDir, { recursive: true })
await fs.writeFile(outputFile, fileContents)
