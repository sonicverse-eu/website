import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { buildArticleMeta, ContentArticleShell } from '@/components/content/content-ui'
import { mdxComponents } from '@/components/content/mdx-components'
import { Badge } from '@/components/ui/badge'
import { getCollectionEntries } from '@/lib/content'
import { contentMetadata } from '@/lib/content/metadata'
import { getMdxComponent } from '@/lib/content/mdx-imports'

export async function getBlogDetailMetadata(slug: string): Promise<Metadata> {
  const entries = await getCollectionEntries('blog')
  const entry = entries.find((item) => item.slug === slug)

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

export async function BlogDetailPageContent({ slug }: { slug: string }) {
  const [entries, MdxComponent] = await Promise.all([
    getCollectionEntries('blog'),
    getMdxComponent('blog', slug),
  ])

  const entry = entries.find((item) => item.slug === slug)

  if (!entry || !MdxComponent) {
    notFound()
  }

  return (
    <ContentArticleShell
      eyebrow="Blog"
      title={entry.frontmatter.title}
      description={entry.frontmatter.description}
      meta={buildArticleMeta({
        publishedAt: entry.frontmatter.publishedAt,
      })}
      badges={<Badge variant="muted">Technical note</Badge>}
      tags={entry.frontmatter.tags}
    >
      <MdxComponent components={mdxComponents} />
    </ContentArticleShell>
  )
}
