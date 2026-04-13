import 'server-only'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { ContentCollection } from './types'
import type { MDXProps } from 'mdx/types'

/**
 * Dynamically import an MDX file based on collection and slug
 */
export async function importMdxFile<C extends ContentCollection>(
  collection: C,
  slug: string,
): Promise<{
  default: React.ComponentType<MDXProps>
  frontmatter: Record<string, unknown>
}> {
  try {
    // Construct the import path based on collection and slug
    const importedMdx = await import(`../../content/${collection}/${slug}.mdx`)
    return {
      default: importedMdx.default,
      frontmatter: importedMdx.frontmatter,
    }
  } catch (error) {
    console.error(`Failed to import MDX file for ${collection}/${slug}:`, error)
    throw new Error(`MDX file not found for ${collection}/${slug}`)
  }
}

/**
 * Get an MDX component for direct rendering
 */
export async function getMdxComponent<C extends ContentCollection>(
  collection: C,
  slug: string,
): Promise<React.ComponentType<MDXProps> | null> {
  try {
    const { default: MdxComponent } = await importMdxFile(collection, slug)
    return MdxComponent
  } catch (error) {
    console.error(`Failed to get MDX component for ${collection}/${slug}:`, error)
    return null
  }
}

/**
 * Get all slugs for a collection by reading the content directory
 */
export async function getCollectionSlugs(collection: ContentCollection): Promise<string[]> {
  const directory = path.join(process.cwd(), 'content', collection)

  try {
    return (await fs.readdir(directory))
      .filter((filename) => filename.endsWith('.mdx'))
      .sort((left, right) => left.localeCompare(right))
      .map((filename) => filename.replace(/\.mdx$/, ''))
  } catch (unknownError) {
    const error = unknownError as NodeJS.ErrnoException

    if (error.code === 'ENOENT') {
      return []
    }

    throw error
  }
}
