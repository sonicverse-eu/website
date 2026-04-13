import { promises as fs } from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'content')
const outputFile = path.join(rootDir, 'lib/content/manifest.generated.ts')
const collections = ['blog', 'changelog', 'roadmap']

async function readCollectionEntries(collection) {
  const directory = path.join(contentDir, collection)

  try {
    const filenames = (await fs.readdir(directory))
      .filter((filename) => filename.endsWith('.mdx'))
      .sort((left, right) => left.localeCompare(right))

    return Promise.all(
      filenames.map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        const source = await fs.readFile(path.join(directory, filename), 'utf8')
        const { data, content } = matter(source)

        return {
          slug,
          frontmatter: data,
          body: content.trim(),
          importPath: `@/content/${collection}/${slug}.mdx`,
          importName: `${collection}_${slug}`.replace(/[^a-zA-Z0-9_$]/g, '_'),
        }
      }),
    )
  } catch (unknownError) {
    const error = /** @type {NodeJS.ErrnoException} */ (unknownError)

    if (error.code === 'ENOENT') {
      return []
    }

    throw error
  }
}

function renderEntry(entry) {
  return `{
      slug: ${JSON.stringify(entry.slug)},
      frontmatter: ${JSON.stringify(entry.frontmatter, null, 2)},
      body: ${JSON.stringify(entry.body)},
      module: ${entry.importName},
    }`
}

async function main() {
  const manifest = Object.fromEntries(
    await Promise.all(
      collections.map(async (collection) => [collection, await readCollectionEntries(collection)]),
    ),
  )
  const imports = collections
    .flatMap((collection) => manifest[collection])
    .map((entry) => `import * as ${entry.importName} from ${JSON.stringify(entry.importPath)}`)
    .join('\n')

  const output = `${imports}

import type { MDXProps } from 'mdx/types'
import type { ComponentType } from 'react'

import type { ContentCollection } from './types'

type ContentModule = {
  default: ComponentType<MDXProps>
  frontmatter?: Record<string, unknown>
}

export type ContentManifestEntry = {
  slug: string
  frontmatter: Record<string, unknown>
  body: string
  module: ContentModule
}

export const contentManifest: Record<ContentCollection, ContentManifestEntry[]> = {
${collections
  .map(
    (collection) =>
      `  ${collection}: [\n${manifest[collection].map((entry) => `    ${renderEntry(entry)}`).join(',\n')}\n  ]`,
  )
  .join(',\n')}
}
`

  await fs.writeFile(outputFile, output)
}

await main()
