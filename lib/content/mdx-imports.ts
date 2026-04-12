import "server-only";

import type { ContentCollection } from "./types";
import { contentManifest } from "@/generated/content-manifest";
import type { MDXProps } from "mdx/types";

/**
 * Dynamically import an MDX file based on collection and slug
 */
export async function importMdxFile<
  C extends ContentCollection,
>(
  collection: C,
  slug: string,
): Promise<{ 
  default: React.ComponentType<MDXProps>;
  frontmatter: Record<string, unknown>;
}> {
  try {
    // Construct the import path based on collection and slug
    const importedMdx = await import(`../../content/${collection}/${slug}.mdx`);
    return {
      default: importedMdx.default,
      frontmatter: importedMdx.frontmatter,
    };
  } catch (error) {
    console.error(`Failed to import MDX file for ${collection}/${slug}:`, error);
    throw new Error(`MDX file not found for ${collection}/${slug}`);
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
    const { default: MdxComponent } = await importMdxFile(collection, slug);
    return MdxComponent;
  } catch (error) {
    console.error(`Failed to get MDX component for ${collection}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all slugs for a collection by reading the content directory
 */
export async function getCollectionSlugs(collection: ContentCollection): Promise<string[]> {
  // Use the manifest as the source of truth
  return Object.keys(contentManifest[collection] || {});
}