import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { mdxComponents } from '@/components/content/mdx-components'
import { buildArticleMeta, ContentArticleShell, StatusBadge } from '@/components/content/content-ui'
import { contentMetadata } from '@/lib/content/metadata'
import { getCollectionEntries, getStaticSlugs } from '@/lib/content'
import { getMdxComponent } from '@/lib/content/mdx-imports'

export const dynamicParams = false

export async function generateStaticParams() {
  return getStaticSlugs('roadmap')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entries = await getCollectionEntries('roadmap')
  const entry = entries.find((e) => e.slug === slug)

  if (!entry) {
    return {}
  }

  return contentMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    pathname: entry.href,
    publishedAt: entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
  })
}

export default async function RoadmapDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [entries, MdxComponent] = await Promise.all([
    getCollectionEntries('roadmap'),
    getMdxComponent('roadmap', slug),
  ])

  const entry = entries.find((e) => e.slug === slug)

  if (!entry || !MdxComponent) {
    notFound()
  }

  return (
    <ContentArticleShell
      eyebrow="Roadmap"
      title={entry.frontmatter.title}
      description={entry.frontmatter.description}
      meta={buildArticleMeta({
        publishedAt: entry.frontmatter.publishedAt,
        updatedAt: entry.frontmatter.updatedAt,
        status: entry.frontmatter.status,
      })}
      badges={<StatusBadge status={entry.frontmatter.status} />}
      tags={entry.frontmatter.tags}
    >
      <MdxComponent components={mdxComponents} />
    </ContentArticleShell>
  )
}
