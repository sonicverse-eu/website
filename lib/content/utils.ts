import type { ContentCollection, ContentEntry, RoadmapStatus } from "./types";

export function formatContentDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRoadmapStatus(status: RoadmapStatus) {
  return status;
}

export function compareNewestFirst<T extends { frontmatter: { publishedAt: string } }>(
  left: T,
  right: T,
) {
  return (
    new Date(right.frontmatter.publishedAt).getTime() -
    new Date(left.frontmatter.publishedAt).getTime()
  );
}

export function sortRoadmapEntries(
  entries: ContentEntry<"roadmap">[],
): ContentEntry<"roadmap">[] {
  return [...entries].sort((left, right) => {
    const leftOrder = left.frontmatter.order;
    const rightOrder = right.frontmatter.order;

    if (leftOrder !== undefined && rightOrder !== undefined && leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    if (leftOrder !== undefined && rightOrder === undefined) {
      return -1;
    }

    if (leftOrder === undefined && rightOrder !== undefined) {
      return 1;
    }

    const leftDate = left.frontmatter.updatedAt ?? left.frontmatter.publishedAt;
    const rightDate = right.frontmatter.updatedAt ?? right.frontmatter.publishedAt;

    return new Date(rightDate).getTime() - new Date(leftDate).getTime();
  });
}

export function orderRoadmapGroups(status: RoadmapStatus) {
  const order: RoadmapStatus[] = ["Exploring", "Planned", "In Progress", "Shipped"];
  return order.indexOf(status);
}

export function estimateReadingTime(body: string) {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 220));
}

export function getContentHref<C extends ContentCollection>(collection: C, slug: string) {
  return `/${collection}/${slug}` as const;
}
