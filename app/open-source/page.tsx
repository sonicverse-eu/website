import type { Metadata } from 'next'

import { CTASection } from '@/components/site/cta-section'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { openSourceProjects, repositorySignals } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'Open Source',
  'Sonicverse treats open source as a core brand pillar and a practical way of building better systems.',
  '/open-source',
)

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Open Source"
        title="Open source is a product quality decision."
        description="Open collaboration makes systems more legible, reusable, and trustworthy."
        highlights={[
          'Readable foundations',
          'Practical contribution paths',
          'Tooling that compounds',
        ]}
        primaryAction={{ href: '/contact', label: 'Talk about a project' }}
        secondaryAction={{ href: '/projects', label: 'See project archetypes' }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Featured structures"
              title="The kinds of public work Sonicverse invests in."
              description="Useful building blocks, not volume for its own sake."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {openSourceProjects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.summary}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
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

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Contribution philosophy"
              title="Open collaboration works when the path is clear."
              description="Approachable issue framing, maintainable structure, and defaults that make contribution realistic."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {repositorySignals.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{item}</CardTitle>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Open collaboration"
        title="If your product needs a stronger public foundation, Sonicverse can help shape it."
        description="From reusable primitives to deployment-aware architecture, the open-source posture is part of the system design."
      />
    </>
  )
}
