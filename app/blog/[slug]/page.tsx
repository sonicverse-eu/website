import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildArticleMeta, ContentArticleShell } from "@/components/content/content-ui";
import { Badge } from "@/components/ui/badge";
import { contentMetadata } from "@/lib/content/metadata";
import { getRenderedEntry, getStaticSlugs } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getStaticSlugs("blog");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getRenderedEntry("blog", slug);

  if (!entry) {
    return {};
  }

  return contentMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    pathname: entry.href,
    publishedAt: entry.frontmatter.publishedAt,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getRenderedEntry("blog", slug);

  if (!entry) {
    notFound();
  }

  return (
    <ContentArticleShell
      eyebrow="Blog"
      title={entry.frontmatter.title}
      description={entry.frontmatter.description}
      meta={buildArticleMeta({
        publishedAt: entry.frontmatter.publishedAt,
        readingTimeMinutes: entry.readingTimeMinutes,
      })}
      badges={<Badge variant="muted">Technical note</Badge>}
      tags={entry.frontmatter.tags}
    >
      {entry.content}
    </ContentArticleShell>
  );
}
