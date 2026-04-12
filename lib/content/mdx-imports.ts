import "server-only";

import type { ContentCollection } from "./types";

/**
 * Dynamically import an MDX file based on collection and slug
 */
export async function importMdxFile<
  C extends ContentCollection,
>(
  collection: C,
  slug: string,
): Promise<{ 
  default: React.ComponentType<any>;
  frontmatter: any;
}> {
  try {
    // Construct the import path based on collection and slug
    const module = await import(`../../content/${collection}/${slug}.mdx`);
    return {
      default: module.default,
      frontmatter: module.frontmatter,
    };
  } catch (error) {
    console.error(`Failed to import MDX file for ${collection}/${slug}:`, error);
    throw new Error(`MDX file not found for ${collection}/${slug}`);
  }
}

/**
 * Get all slugs for a collection by reading the content directory
 */
export async function getCollectionSlugs(collection: ContentCollection): Promise<string[]> {
  // This will be replaced with a more robust solution, but for now
  // we'll use the manifest as the source of truth
  const { contentManifest } = await import("./generated/content-manifest");
  return Object.keys(contentManifest[collection] || {});
}