import Link from 'next/link'
import type { ContentEntry } from '@/lib/content'
import { formatContentDate } from '@/lib/content'

import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'

import { Reveal } from '../reveal'
import { SectionHeader } from '../section-header'

type JournalStripProps = {
  featuredBlog: ContentEntry<'blog'> | null
  recentChangelog: ContentEntry<'changelog'>[]
  recentRoadmap: ContentEntry<'roadmap'>[]
}

export function JournalStrip({ featuredBlog, recentChangelog, recentRoadmap }: JournalStripProps) {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Journal"
            title="Writing, releases, and roadmap movement keep the site feeling alive and accountable."
            description="This is where Sonicverse shows what it is thinking, what has shipped, and what is changing next."
          />
        </Reveal>
        <div className="grid gap-5 xl:grid-cols-3">
          <Reveal>
            <Card className="h-full">
              <CardHeader>
                <Badge variant="muted">Featured blog</Badge>
                <CardTitle className="text-[1.25rem]">
                  {featuredBlog?.frontmatter.title ?? 'Technical notes and system thinking'}
                </CardTitle>
                <CardDescription>
                  {featuredBlog?.frontmatter.description ??
                    'Long-form writing around product systems, implementation, and software judgment.'}
                </CardDescription>
                <Link href={featuredBlog?.href ?? '/blog'} className="quiet-link pt-2">
                  Open blog
                </Link>
              </CardHeader>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="h-full">
              <CardHeader>
                <Badge variant="muted">Latest release</Badge>
                <CardTitle className="text-[1.25rem]">
                  {recentChangelog[0]?.frontmatter.title ??
                    'Release notes and shipped improvements'}
                </CardTitle>
                <CardDescription>
                  {recentChangelog[0]
                    ? `${recentChangelog[0].frontmatter.version} · ${formatContentDate(recentChangelog[0].frontmatter.publishedAt)}`
                    : 'Recent software movement and versioned changes.'}
                </CardDescription>
                <Link href="/changelog" className="quiet-link pt-2">
                  Open changelog
                </Link>
              </CardHeader>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <Badge variant="muted">Roadmap</Badge>
                <CardTitle className="text-[1.25rem]">
                  {recentRoadmap[0]?.frontmatter.title ?? 'Visible direction and public planning'}
                </CardTitle>
                <CardDescription>
                  {recentRoadmap[0]
                    ? `${recentRoadmap[0].frontmatter.status} · ${formatContentDate(recentRoadmap[0].frontmatter.updatedAt ?? recentRoadmap[0].frontmatter.publishedAt)}`
                    : 'What Sonicverse is shaping next and how it is progressing.'}
                </CardDescription>
                <Link href="/roadmap" className="quiet-link pt-2">
                  Open roadmap
                </Link>
              </CardHeader>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
