import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import {
  getFeaturedBlogPost,
  getLatestBlogPosts,
  getLatestChangelogEntries,
  getRecentRoadmapEntries,
  formatContentDate,
} from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata(
  'Journal',
  'The public communication layer for Sonicverse: writing, release notes, and roadmap movement.',
  '/journal',
)

export default async function JournalPage() {
  const [featuredBlog, recentBlog, recentChangelog, recentRoadmap] = await Promise.all([
    getFeaturedBlogPost(),
    getLatestBlogPosts(2),
    getLatestChangelogEntries(2),
    getRecentRoadmapEntries(2),
  ])

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="One public surface for writing, releases, and the direction of travel."
        description="The journal makes Sonicverse feel active, accountable, and readable without forcing users to jump between separate content silos immediately."
        highlights={[
          'Technical writing and product thinking',
          'Versioned release movement',
          'Roadmap direction grouped into concrete initiatives',
        ]}
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Public signals"
              title="Each stream answers a different trust question."
              description="Blog explains the thinking, changelog shows movement, and roadmap frames where the system is heading next."
            />
          </Reveal>
          <div className="grid gap-5 xl:grid-cols-3">
            <Reveal>
              <Card className="h-full">
                <CardHeader>
                  <Badge variant="muted">Blog</Badge>
                  <CardTitle>
                    {featuredBlog?.frontmatter.title ?? 'Technical perspective'}
                  </CardTitle>
                  <CardDescription>
                    {featuredBlog?.frontmatter.description ??
                      'Long-form thinking around software systems, interfaces, and product structure.'}
                  </CardDescription>
                  <div className="space-y-2 pt-2">
                    {recentBlog.map((entry) => (
                      <Link key={entry.slug} href={entry.href} className="quiet-link block">
                        {entry.frontmatter.title}
                      </Link>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
            <Reveal delay={0.05}>
              <Card className="h-full">
                <CardHeader>
                  <Badge variant="muted">Changelog</Badge>
                  <CardTitle>Recent release movement</CardTitle>
                  <CardDescription>
                    Versioned improvements and shipped changes with clear context.
                  </CardDescription>
                  <div className="space-y-3 pt-2">
                    {recentChangelog.map((entry) => (
                      <div
                        key={entry.slug}
                        className="rounded-[1.1rem] border border-border/80 bg-card/78 px-4 py-3"
                      >
                        <Link
                          href={entry.href}
                          className="block text-sm font-medium text-foreground"
                        >
                          {entry.frontmatter.title}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {entry.frontmatter.version} ·{' '}
                          {formatContentDate(entry.frontmatter.publishedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="h-full">
                <CardHeader>
                  <Badge variant="muted">Roadmap</Badge>
                  <CardTitle>Direction in concrete initiatives</CardTitle>
                  <CardDescription>
                    Roadmap signals should feel specific enough to trust.
                  </CardDescription>
                  <div className="space-y-3 pt-2">
                    {recentRoadmap.map((entry) => (
                      <div
                        key={entry.slug}
                        className="rounded-[1.1rem] border border-border/80 bg-card/78 px-4 py-3"
                      >
                        <Link
                          href={entry.href}
                          className="block text-sm font-medium text-foreground"
                        >
                          {entry.frontmatter.title}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {entry.frontmatter.status} ·{' '}
                          {formatContentDate(
                            entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
