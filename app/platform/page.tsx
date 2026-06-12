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
  'Platform',
  'The open broadcast stack — playout, scheduling, streaming, show prep, station management, and infrastructure tooling.',
  '/platform',
)

export default function PlatformPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="The stack"
        title="One open stack for the whole broadcast workflow."
        description="The modules that cover a station’s day — from the on-air engine to the tooling around it, built to interoperate on open standards."
        highlights={['Playout & automation', 'Scheduling & traffic', 'Streaming & delivery']}
        primaryAction={{ href: '/contact', label: 'Get early access' }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Modules"
              title="The pieces a broadcast day actually needs."
              description="Each module is being built in the open, designed to stand alone or wire together through open APIs — no proprietary middleware required."
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
                        className="rounded-md border border-border/70 bg-background/56 px-4 py-3 text-sm text-foreground/66"
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
              eyebrow="Interoperability"
              title="Designed to play together."
              description="Open standards mean a scheduling system, a playout engine, and a streaming server can be wired together to serve your operation — not a vendor’s upsell strategy."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Open APIs and formats between every module.',
              'Self-host the stack and own your data end to end.',
              'Mix in the modules you need, leave the rest.',
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
              title="Broadcast-grade by default."
              description="The defaults the stack is held to — not optional polish."
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
        eyebrow="Early access"
        title="Want to run the open stack at your station?"
        description="Get early access and help shape the modules around how your station actually works."
      />
    </>
  )
}
