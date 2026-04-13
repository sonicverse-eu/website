import type { Metadata } from 'next'

import {
  ContentLinkCard,
  ContentPageHeader,
  MetaInline,
  StatusBadge,
  TagList,
} from '@/components/content/content-ui'
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
      <ContentPageHeader
        eyebrow="Roadmap"
        title="Structured direction for what Sonicverse is shaping next."
        description="Roadmap initiatives are grouped by status so the direction of travel is easy to inspect without collapsing into vague future promises."
        kicker={
          <Card>
            <CardHeader className="space-y-4">
              <Badge variant="muted">Status model</Badge>
              <CardTitle className="text-[1.3rem]">
                Exploring, Planned, In Progress, Shipped.
              </CardTitle>
              <CardDescription>
                Each initiative is a concrete page with context, not a loose bullet in a backlog.
              </CardDescription>
            </CardHeader>
          </Card>
        }
      />

      <section className="pb-24 sm:pb-28">
        <Container className="space-y-6">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.status} delay={groupIndex * 0.04}>
              <div className="section-frame space-y-6 p-6 backdrop-blur-xl backdrop-saturate-[1.5] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <StatusBadge status={group.status} />
                    <h2 className="section-title text-[1.6rem] sm:text-[1.9rem] lg:text-[2.1rem]">
                      {group.status}
                    </h2>
                  </div>
                  <p className="text-sm text-foreground/54">
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
                          <MetaInline>
                            {formatContentDate(
                              entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
                            )}
                          </MetaInline>
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
