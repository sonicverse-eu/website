import type { Metadata } from 'next'
import Link from 'next/link'

import { ContentLinkCard, TagList } from '@/components/content/content-ui'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { formatContentDate, getCollectionEntries, getFeaturedBlogPost } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata(
  'Blog',
  'Technical notes, product thinking, and open-source software perspective from Sonicverse.',
  '/blog',
)

export default async function BlogPage() {
  const [entries, featured] = await Promise.all([
    getCollectionEntries('blog'),
    getFeaturedBlogPost(),
  ])

  const archive = entries.filter((entry) => entry.slug !== featured?.slug)
  const tags = Array.from(new Set(entries.flatMap((entry) => entry.frontmatter.tags ?? []))).sort(
    (left, right) => left.localeCompare(right),
  )

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Technical perspective, product systems, and notes from the public edge of the work."
        description="The blog is where Sonicverse explains the thinking behind products, interfaces, architecture, and the tradeoffs that shape them."
        highlights={[
          'Long-form technical writing',
          'Product and system judgment in one place',
          'Part of the same public layer as roadmap and changelog',
        ]}
        kicker={
          <div className="space-y-4">
            <p className="panel-label">Index signal</p>
            <h3 className="text-[1.5rem] leading-[1.08] font-semibold tracking-[-0.05em]">
              Writing should feel like product infrastructure, not generic marketing content.
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        }
      />

      <section className="section-space pt-0">
        <Container className="space-y-8">
          {featured ? (
            <Reveal>
              <Link
                href={featured.href}
                className="section-shell block transition hover:border-primary/20"
              >
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
                  <div className="space-y-4">
                    <Badge>Featured note</Badge>
                    <h2 className="section-title text-[2.2rem]">{featured.frontmatter.title}</h2>
                    <p className="section-copy">{featured.frontmatter.description}</p>
                    <TagList tags={featured.frontmatter.tags} />
                  </div>
                  <Card className="bg-card/78">
                    <CardHeader>
                      <CardTitle className="text-[1.1rem]">Latest featured entry</CardTitle>
                      <CardDescription>
                        {formatContentDate(featured.frontmatter.publishedAt)} ·{' '}
                        {featured.readingTimeMinutes} min read
                      </CardDescription>
                      <Button size="lg">Read the note</Button>
                    </CardHeader>
                  </Card>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <div className="grid gap-5 lg:grid-cols-2">
            {archive.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 0.05}>
                <ContentLinkCard
                  href={entry.href}
                  eyebrow="Technical note"
                  title={entry.frontmatter.title}
                  description={entry.frontmatter.description}
                  badges={<TagList tags={entry.frontmatter.tags?.slice(0, 2)} />}
                  meta={
                    <>
                      {formatContentDate(entry.frontmatter.publishedAt)} ·{' '}
                      {entry.readingTimeMinutes} min read
                    </>
                  }
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
