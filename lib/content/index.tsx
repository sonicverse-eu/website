import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/content/mdx-components";

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

const contentRoot = path.join(process.cwd(), "content");

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

async function readDirectory(collection: ContentCollection) {
  const directory = path.join(contentRoot, collection);
  const filenames = await fs.readdir(directory);

  return filenames.filter((filename) => filename.endsWith(".mdx"));
}

async function readEntryFile(collection: ContentCollection, slug: string) {
  const filePath = path.join(contentRoot, collection, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
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
  const { compileMDX } = await import("next-mdx-remote/rsc");
  const { content } = await compileMDX({
    source: entry.body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
  });

  return {
    ...entry,
    content,
  };
}

const getCollectionEntriesCached = cache(async <C extends ContentCollection>(collection: C) => {
  const filenames = await readDirectory(collection);
  const entries = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const source = await readEntryFile(collection, slug);
      return parseFrontmatter(collection, slug, source);
    }),
  );

  if (collection === "roadmap") {
    return sortRoadmapEntries(entries as ContentEntry<"roadmap">[]) as ContentEntry<C>[];
  }

  return entries.sort(compareNewestFirst) as ContentEntry<C>[];
});

const getRenderedEntryCached = cache(async <C extends ContentCollection>(
  collection: C,
  slug: string,
) => {
  const source = await readEntryFile(collection, slug);
  const entry = parseFrontmatter(collection, slug, source);

  return compileEntry(entry);
});

export async function getCollectionEntries<C extends ContentCollection>(collection: C) {
  return getCollectionEntriesCached(collection);
}

export async function getRenderedEntry<C extends ContentCollection>(
  collection: C,
  slug: string,
) {
  try {
    return await getRenderedEntryCached(collection, slug);
  } catch (error) {
    const maybeFsError = error as NodeJS.ErrnoException;

    if (maybeFsError.code === "ENOENT") {
      return null;
    }

    throw error;
  }
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
