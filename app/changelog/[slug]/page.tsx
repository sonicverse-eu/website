import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildArticleMeta, ContentArticleShell, VersionBadge } from "@/components/content/content-ui";
import { contentMetadata } from "@/lib/content/metadata";
import { getRenderedEntry, getStaticSlugs } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getStaticSlugs("changelog");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getRenderedEntry("changelog", slug);

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

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getRenderedEntry("changelog", slug);

  if (!entry) {
    notFound();
  }

  return (
    <ContentArticleShell
      eyebrow="Changelog"
      title={entry.frontmatter.title}
      description={entry.frontmatter.description}
      meta={buildArticleMeta({
        publishedAt: entry.frontmatter.publishedAt,
        version: entry.frontmatter.version,
      })}
      badges={<VersionBadge version={entry.frontmatter.version} />}
      tags={entry.frontmatter.tags}
    >
      {entry.content}
    </ContentArticleShell>
  );
}
