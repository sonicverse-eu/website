import "server-only";

import { cache } from "react";

import matter from "gray-matter";

import { contentManifest } from "@/generated/content-manifest";
import { importMdxFile } from "./mdx-imports";

import {
  blogFrontmatterSchema,
  changelogFrontmatterSchema,
  roadmapFrontmatterSchema,
} from "./schema";
import type {
  ContentCollection,
  ContentEntry,
  FrontmatterByCollection,
  RenderedContentEntry,
  RoadmapStatus,
} from "./types";
import {
  compareNewestFirst,
  estimateReadingTime,
  getContentHref,
  orderRoadmapGroups,
  sortRoadmapEntries,
} from "./utils";

type CollectionConfig<C extends ContentCollection> = {
  schema: {
    parse: (value: unknown) => FrontmatterByCollection[C];
  };
};

const collectionConfig: {
  [K in ContentCollection]: CollectionConfig<K>;
} = {
  blog: {
    schema: blogFrontmatterSchema,
  },
  changelog: {
    schema: changelogFrontmatterSchema,
  },
  roadmap: {
    schema: roadmapFrontmatterSchema,
  },
};

function listCollectionSlugs(collection: ContentCollection) {
  return Object.keys(contentManifest[collection] as Record<string, string>);
}

function readEntryFile(collection: ContentCollection, slug: string) {
  const collectionEntries = contentManifest[collection] as Record<string, string>;
  return collectionEntries[slug] ?? null;
}

function parseFrontmatter<C extends ContentCollection>(
  collection: C,
  slug: string,
  source: string,
): ContentEntry<C> {
  const { data, content } = matter(source);
  const frontmatter = collectionConfig[collection].schema.parse(data);

  return {
    collection,
    slug,
    href: getContentHref(collection, slug),
    frontmatter,
    body: content.trim(),
    readingTimeMinutes: estimateReadingTime(content),
  };
}

async function compileEntry<C extends ContentCollection>(
  entry: ContentEntry<C>,
): Promise<RenderedContentEntry<C>> {
  // Direct MDX import will be used instead of dynamic compilation.
  // This function can be removed or refactored as needed.
  return {
    ...entry,
    content: null, // Placeholder, update usage to direct MDX import
  };
}

const getCollectionEntriesCached = cache(async <C extends ContentCollection>(collection: C) => {
  const entries = listCollectionSlugs(collection).map((slug) => {
    const source = readEntryFile(collection, slug);

    if (!source) {
      throw new Error(`Missing content source for ${collection}/${slug}`);
    }

    return parseFrontmatter(collection, slug, source);
  });

  if (collection === "roadmap") {
    return sortRoadmapEntries(entries as ContentEntry<"roadmap">[]) as ContentEntry<C>[];
  }

  return entries.sort(compareNewestFirst) as ContentEntry<C>[];
});

const getRenderedEntryCached = cache(async <C extends ContentCollection>(
  collection: C,
  slug: string,
) => {
  const source = readEntryFile(collection, slug);

  if (!source) {
    return null;
  }

  const entry = parseFrontmatter(collection, slug, source);

  return compileEntry(entry);
});

/**
 * Get an MDX component for direct rendering
 */
export async function getMdxComponent<C extends ContentCollection>(
  collection: C,
  slug: string,
) {
  try {
    const { default: MdxComponent } = await importMdxFile(collection, slug);
    return MdxComponent;
  } catch (error) {
    console.error(`Failed to get MDX component for ${collection}/${slug}:`, error);
    return null;
  }
}

export async function getCollectionEntries<C extends ContentCollection>(collection: C) {
  return getCollectionEntriesCached(collection);
}

export async function getRenderedEntry<C extends ContentCollection>(
  collection: C,
  slug: string,
) {
  return getRenderedEntryCached(collection, slug);
}

export async function getStaticSlugs(collection: ContentCollection) {
  const entries = await getCollectionEntries(collection);
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function getFeaturedBlogPost() {
  const entries = await getCollectionEntries("blog");
  return entries.find((entry) => entry.frontmatter.featured) ?? entries[0] ?? null;
}

export async function getLatestBlogPosts(limit: number, options?: { excludeSlug?: string }) {
  const entries = await getCollectionEntries("blog");
  return entries
    .filter((entry) => entry.slug !== options?.excludeSlug)
    .slice(0, limit);
}

export async function getLatestChangelogEntries(limit: number) {
  const entries = await getCollectionEntries("changelog");
  return entries.slice(0, limit);
}

export async function getRoadmapGroups() {
  const entries = await getCollectionEntries("roadmap");
  const grouped = entries.reduce<Record<RoadmapStatus, ContentEntry<"roadmap">[]>>(
    (accumulator, entry) => {
      accumulator[entry.frontmatter.status].push(entry);
      return accumulator;
    },
    {
      Exploring: [],
      Planned: [],
      "In Progress": [],
      Shipped: [],
    },
  );

  return Object.entries(grouped)
    .sort(([left], [right]) => orderRoadmapGroups(left as RoadmapStatus) - orderRoadmapGroups(right as RoadmapStatus))
    .map(([status, items]) => ({
      status: status as RoadmapStatus,
      items,
    }));
}

export async function getRecentRoadmapEntries(limit: number) {
  const entries = await getCollectionEntries("roadmap");
  return [...entries]
    .sort((left, right) => {
      const leftDate = left.frontmatter.updatedAt ?? left.frontmatter.publishedAt;
      const rightDate = right.frontmatter.updatedAt ?? right.frontmatter.publishedAt;
      return new Date(rightDate).getTime() - new Date(leftDate).getTime();
    })
    .slice(0, limit);
}

export type {
  BlogFrontmatter,
  ChangelogFrontmatter,
  ContentEntry,
  ContentCollection,
  FrontmatterByCollection,
  RenderedContentEntry,
  RoadmapFrontmatter,
  RoadmapStatus,
} from "./types";
export { formatContentDate } from "./utils";
