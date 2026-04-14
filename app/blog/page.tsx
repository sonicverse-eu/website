import type { Metadata } from 'next'
import Link from 'next/link'

import {
  ContentLinkCard,
  ContentPageHeader,
  MetaInline,
  TagList,
} from '@/components/content/content-ui'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { getCollectionEntries, getFeaturedBlogPost, formatContentDate } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata(
  'Blog',
  'Technical notes, system thinking, and product-engineering perspective from Sonicverse.',
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
      <ContentPageHeader
        eyebrow="Blog"
        title="Technical perspective, product systems, and quiet software ambition."
        description="Long-form notes from Sonicverse on software architecture, communication systems, design-aware implementation, and open-source-native delivery."
        kicker={
          <Card>
            <CardHeader>
              <Badge variant="muted">Index signal</Badge>
              <CardTitle className="text-[1.25rem]">
                Newest first, with one featured technical note.
              </CardTitle>
              <CardDescription>
                The blog behaves like a product thinking layer, not a generic publishing archive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        }
      />

      <section className="pb-10">
        <Container className="space-y-8">
          {featured ? (
            <Reveal>
              <Link
                href={featured.href}
                className="section-frame block p-6 backdrop-blur-xl backdrop-saturate-[1.5] transition hover:border-primary/28 sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
                  <div className="space-y-5">
                    <Badge>Featured post</Badge>
                    <div className="space-y-4">
                      <h2 className="text-[2.2rem] leading-[1.11] font-semibold tracking-[-0.06em] text-foreground sm:text-[2.9rem] sm:leading-[1.07]">
                        {featured.frontmatter.title}
                      </h2>
                      <p className="max-w-2xl text-[0.98rem] leading-8 text-foreground/72">
                        {featured.frontmatter.description}
                      </p>
                    </div>
                    <TagList tags={featured.frontmatter.tags} />
                  </div>
                  <div className="space-y-4 rounded-[1.7rem] border border-border/60 bg-background/52 p-5 backdrop-blur-sm backdrop-saturate-[1.4]">
                    <MetaInline>{formatContentDate(featured.frontmatter.publishedAt)}</MetaInline>
                    <Button size="lg" className="w-full">
                      Read featured note
                    </Button>
                  </div>
                </div>
              </Link>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container className="space-y-8">
          <Reveal className="space-y-4">
            <Badge variant="muted">Archive</Badge>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {archive.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 0.05}>
                <ContentLinkCard
                  href={entry.href}
                  eyebrow="Technical insight"
                  title={entry.frontmatter.title}
                  description={entry.frontmatter.description}
                  badges={<TagList tags={entry.frontmatter.tags?.slice(0, 2)} />}
                  meta={
                    <>
                      <MetaInline>{formatContentDate(entry.frontmatter.publishedAt)}</MetaInline>
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
