import type { Metadata } from 'next'

import { CTASection } from '@/components/site/cta-section'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { projectArchetypes } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'Broadcasters',
  'Who the open broadcast stack is for — independent and community stations, station managers, and technical teams.',
  '/broadcasters',
)

export default function BroadcastersPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Who it’s for"
        title="Built for the people who run stations."
        description="Independent and community stations underserved by legacy vendors — and the managers and technical teams who keep them on air."
        highlights={['Independent stations', 'Station managers', 'Technical teams']}
        primaryAction={{ href: '/contact', label: 'Get early access' }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Who it’s for"
              title="Made for stations the legacy vendors forgot."
              description="The stack is shaped around real operators — not a generic media buyer. These are the people it’s built with."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {projectArchetypes.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
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
              eyebrow="The pain"
              title="The friction that pushed us to build this."
              description="If any of these sound like your station, the open stack is being built for you."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Long contracts and pricing that scales with your growth',
              'A roadmap dictated by someone else’s priorities',
              'Tools that don’t talk to each other without costly middleware',
            ].map((item, index) => (
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
        eyebrow="Early access"
        title="Run a station that deserves better software?"
        description="Get early access and help shape the stack around how your station actually works."
      />
    </>
  )
}
