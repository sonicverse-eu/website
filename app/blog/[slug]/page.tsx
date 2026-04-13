import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { buildArticleMeta, ContentArticleShell } from '@/components/content/content-ui'
import { mdxComponents } from '@/components/content/mdx-components'
import { Badge } from '@/components/ui/badge'
import { contentMetadata } from '@/lib/content/metadata'
import { getCollectionEntries, getStaticSlugs } from '@/lib/content'

export const dynamicParams = false

async function loadBlogPost(slug: string) {
  try {
    const { default: Post } = await import(`@/content/blog/${slug}.mdx`)
    return Post
  } catch (error) {
    console.error(`Failed to import blog post for slug "${slug}":`, error)
    return null
  }
}

export async function generateStaticParams() {
  return getStaticSlugs('blog')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entries = await getCollectionEntries('blog')
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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [entries, MdxComponent] = await Promise.all([
    getCollectionEntries('blog'),
    loadBlogPost(slug),
  ])

  const entry = entries.find((e) => e.slug === slug)

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
