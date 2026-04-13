import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  buildArticleMeta,
  ContentArticleShell,
  VersionBadge,
} from '@/components/content/content-ui'
import { mdxComponents } from '@/components/content/mdx-components'
import { contentMetadata } from '@/lib/content/metadata'
import { getCollectionEntries, getStaticSlugs } from '@/lib/content'
import { getMdxComponent } from '@/lib/content/mdx-imports'

export const dynamicParams = false

export async function generateStaticParams() {
  return getStaticSlugs('changelog')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entries = await getCollectionEntries('changelog')
  const entry = entries.find((e) => e.slug === slug)

  if (!entry) {
    return {}
  }

  return contentMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    pathname: entry.href,
    publishedAt: entry.frontmatter.publishedAt,
  })
}

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [entries, MdxComponent] = await Promise.all([
    getCollectionEntries('changelog'),
    getMdxComponent('changelog', slug),
  ])

  const entry = entries.find((e) => e.slug === slug)

  if (!entry || !MdxComponent) {
    notFound()
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
      <MdxComponent components={mdxComponents} />
    </ContentArticleShell>
  )
}
