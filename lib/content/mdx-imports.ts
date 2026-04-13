import 'server-only'

import type { ContentCollection } from './types'
import type { MDXProps } from 'mdx/types'
import { contentManifest } from './manifest.generated'

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
  const manifestEntry = contentManifest[collection].find((entry) => entry.slug === slug)

  if (!manifestEntry) {
    throw new Error(`MDX file not found for ${collection}/${slug}`)
  }

  try {
    const importedMdx = await manifestEntry.module
    return {
      default: importedMdx.default,
      frontmatter: importedMdx.frontmatter ?? manifestEntry.frontmatter,
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
  return contentManifest[collection].map((entry) => entry.slug)
}
