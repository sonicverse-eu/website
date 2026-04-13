import type { Metadata } from 'next'

import { CTASection } from '@/components/site/cta-section'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { serviceAreas, technicalStandards } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'Services',
  'Product engineering, software foundations, web platforms, design systems, and open-source tooling.',
  '/services',
)

export default function ServicesPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Services"
        title="Services for product quality and system clarity."
        description="Sonicverse helps teams ship systems that are easier to evolve, operate, and trust."
        highlights={['Product engineering', 'Platform foundations', 'Technical architecture']}
        primaryAction={{ href: '/contact', label: 'Discuss a project' }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Offerings"
              title="A service set built for real product and platform work."
              description="Each engagement starts with the same question: what structure will make this system stronger later, not just at launch."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceAreas.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-3">
                    {service.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-[1.25rem] border border-border/60 bg-background/56 px-4 py-3 text-sm text-foreground/66 backdrop-blur-sm backdrop-saturate-[1.3]"
                      >
                        {bullet}
                      </div>
                    ))}
                  </CardContent>
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
              eyebrow="Delivery"
              title="A clear delivery cadence."
              description="Frame the system. Settle the critical decisions. Build in focused increments."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Frame the system and the highest-risk decisions.',
              'Lock the architecture, interfaces, and delivery order.',
              'Ship in focused increments with a cleaner codebase.',
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
          <Reveal>
            <SectionHeader
              eyebrow="Standards"
              title="Technical standards that keep quality observable."
              description="Defaults, not optional polish."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {technicalStandards.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
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
        eyebrow="Delivery"
        title="Need a product-minded engineering partner instead of a generic implementation vendor?"
        description="Sonicverse is designed for the moments where technical structure matters as much as visible output."
      />
    </>
  )
}
