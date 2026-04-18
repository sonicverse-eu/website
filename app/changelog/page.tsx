import type { Metadata } from 'next'

import { TimelineEntry } from '@/components/content/content-ui'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { getCollectionEntries } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata(
  'Changelog',
  'Release notes, shipped improvements, and versioned product movement from Sonicverse.',
  '/changelog',
)

export default async function ChangelogPage() {
  const entries = await getCollectionEntries('changelog')
  const latestRelease = entries[0]

  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="A release feed that makes product movement easier to trust."
        description="The changelog exists to show concrete progress, versioned releases, and the shape of what Sonicverse is actually shipping."
        highlights={[
          'Newest release first',
          'Versioned notes with product context',
          'Part of the same public communication layer as blog and roadmap',
        ]}
        kicker={
          latestRelease ? (
            <div className="space-y-4">
              <p className="panel-label">Latest release</p>
              <Badge>{latestRelease.frontmatter.version}</Badge>
              <h3 className="text-[1.45rem] leading-[1.08] font-semibold tracking-[-0.05em]">
                {latestRelease.frontmatter.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                {latestRelease.frontmatter.description}
              </p>
            </div>
          ) : undefined
        }
      />

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <Reveal>
            <Card className="bg-card/78">
              <CardHeader>
                <CardTitle className="text-[1.25rem]">Release feed</CardTitle>
                <CardDescription>
                  Clear versioning and enough context to understand what changed without reading a
                  commit log first.
                </CardDescription>
              </CardHeader>
            </Card>
          </Reveal>
          <div className="space-y-6">
            {entries.map((entry) => (
              <TimelineEntry key={entry.slug} entry={entry} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
