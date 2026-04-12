import type { ReactNode } from "react";

export const roadmapStatuses = [
  "Exploring",
  "Planned",
  "In Progress",
  "Shipped",
] as const;

export type RoadmapStatus = (typeof roadmapStatuses)[number];
export type ContentCollection = "blog" | "changelog" | "roadmap";

type SharedFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  tags?: string[];
};

export type BlogFrontmatter = SharedFrontmatter & {
  featured: boolean;
};

export type ChangelogFrontmatter = SharedFrontmatter & {
  version: string;
};

export type RoadmapFrontmatter = SharedFrontmatter & {
  status: RoadmapStatus;
  updatedAt?: string;
  order?: number;
};

export type FrontmatterByCollection = {
  blog: BlogFrontmatter;
  changelog: ChangelogFrontmatter;
  roadmap: RoadmapFrontmatter;
};

export type ContentEntry<C extends ContentCollection> = {
  collection: C;
  slug: string;
  href: `/${C}/${string}`;
  frontmatter: FrontmatterByCollection[C];
  body: string;
  readingTimeMinutes: number;
};

export type RenderedContentEntry<C extends ContentCollection> = ContentEntry<C> & {
  content: ReactNode;
};
