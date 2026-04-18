import type { Metadata } from 'next'

import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import {
  maintenanceSignals,
  openSourceLibraries,
  openSourcePrinciples,
} from '@/lib/site-data/open-source'

export const metadata: Metadata = pageMetadata(
  'Open Source',
  'Sonicverse open-source products, libraries, and the maintenance signals behind them.',
  '/open-source',
)

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        eyebrow="Open Source"
        title="Open source is part of how Sonicverse proves product quality."
        description="The open-source layer exists to make the company easier to inspect, trust, and collaborate with, while still supporting a commercial model around real software."
        highlights={[
          'Products and libraries maintained in public',
          'Release notes and roadmap used as trust signals',
          'Commercial support available when the software needs stronger operational backing',
        ]}
        primaryAction={{ href: '/journal', label: 'See public signals' }}
        secondaryAction={{
          href: '/contact',
          label: 'Talk about an OSS-backed project',
          variant: 'outline',
        }}
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Approach"
              title="Open collaboration only works when the structure is clear enough to participate in."
              description="The Sonicverse open-source posture should signal maintainability, release discipline, and contribution realism rather than just repo count."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {openSourcePrinciples.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">0{index + 1}</Badge>
                    <CardTitle className="text-[1.1rem]">{item}</CardTitle>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {openSourceLibraries.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.summary}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container>
          <Reveal className="section-shell space-y-4">
            <p className="panel-label">Maintenance quality</p>
            <div className="grid gap-4 md:grid-cols-2">
              {maintenanceSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-[1.15rem] border border-border/80 bg-card/78 px-4 py-4 text-sm leading-7 text-muted-foreground"
                >
                  {signal}
                </div>
              ))}
            </div>
            <Button asChild variant="outline">
              <a href="https://docs.sonicverse.eu" target="_blank" rel="noreferrer">
                Open documentation
              </a>
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
