import type { Metadata } from 'next'

import { ContentLinkCard, StatusBadge, TagList } from '@/components/content/content-ui'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { formatContentDate, getRoadmapGroups } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata(
  'Roadmap',
  'Current Sonicverse initiatives grouped by status, from exploration through shipped outcomes.',
  '/roadmap',
)

export default async function RoadmapPage() {
  const groups = await getRoadmapGroups()

  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title="Structured direction for what Sonicverse is shaping next."
        description="The roadmap should communicate concrete movement without collapsing into vague future promises. Grouping by status keeps the direction readable."
        highlights={[
          'Exploring, planned, in progress, and shipped',
          'Each initiative has its own detail page',
          'A public signal for both product users and commercial partners',
        ]}
        kicker={
          <div className="space-y-4">
            <p className="panel-label">Status model</p>
            <Card className="bg-card/78">
              <CardHeader>
                <CardTitle className="text-[1.25rem]">
                  Exploring, Planned, In Progress, Shipped
                </CardTitle>
                <CardDescription>
                  The roadmap should feel like real software planning, not decorative future-state
                  marketing.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        }
      />

      <section className="section-space pt-0">
        <Container className="space-y-6">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.status} delay={groupIndex * 0.04}>
              <div className="section-shell space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <Badge variant="muted">Status group</Badge>
                    <div className="flex items-center gap-3">
                      <h2 className="text-[1.9rem] leading-[1.08] font-semibold tracking-[-0.05em]">
                        {group.status}
                      </h2>
                      <StatusBadge status={group.status} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {group.items.length} initiative{group.items.length === 1 ? '' : 's'}
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.items.map((entry) => (
                    <ContentLinkCard
                      key={entry.slug}
                      href={entry.href}
                      eyebrow="Initiative"
                      title={entry.frontmatter.title}
                      description={entry.frontmatter.description}
                      badges={<StatusBadge status={entry.frontmatter.status} />}
                      meta={
                        <>
                          {formatContentDate(
                            entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
                          )}
                          <TagList tags={entry.frontmatter.tags?.slice(0, 2)} />
                        </>
                      }
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  )
}
