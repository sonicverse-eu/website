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
  'The whole broadcast stack is open source — built on the FFmpeg and Linux foundation, with the roadmap owned by the community.',
  '/open-source',
)

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Open Source"
        title="Your stack, your roadmap."
        description="Open source has quietly matured into a broadcast-ready force. The tools exist, the communities are active, and the upside is significant."
        highlights={[
          'Built on FFmpeg & Linux',
          'Self-host and inspect everything',
          'Community-owned roadmap',
        ]}
        primaryAction={{ href: '/contact', label: 'Get early access' }}
        secondaryAction={{ href: '/broadcasters', label: 'See who it’s for' }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="The stack"
              title="The open pillars we’re building."
              description="Sonicverse is early — we’re not going to pretend otherwise. But the foundation is intentional, and every piece is being built in the open."
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
              eyebrow="Why it matters"
              title="What open source gives a station."
              description="Not because it’s free — though that helps — but because it puts you in control of your own stack, your own roadmap, and your own future."
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
        eyebrow="Early access"
        title="The stations that thrive next will have the most flexible infrastructure."
        description="Open source is how you build that. Get early access and follow the work as it ships."
      />
    </>
  )
}
