import type { Metadata } from 'next'

import { CTASection } from '@/components/site/cta-section'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { operatingModel, principles } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'About',
  'Sonicverse is built by broadcasters and developers, building the open-source software radio has been missing.',
  '/about',
)

export default function AboutPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="About Sonicverse"
        title="Built by broadcasters. Built in the open."
        description="We started Sonicverse because we felt the gap firsthand — tools that didn’t talk to each other and vendor roadmaps that didn’t reflect how stations actually work."
        highlights={['In the open', 'With broadcasters', 'Open standards']}
        primaryAction={{ href: '/contact', label: 'Get early access' }}
        secondaryAction={{ href: '/platform', label: 'Explore the stack' }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="How we build"
              title="The broadcast industry deserves software built with craft."
              description="Built with the same ambition that goes into the content stations produce every day — open source at the core, designed for broadcasters, by people who know the industry from the inside."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {operatingModel.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
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
              eyebrow="Principles"
              title="A small set of principles shapes the work."
              description="Practical filters for every product, engineering, and roadmap decision."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal key={principle} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">0{index + 1}</Badge>
                    <CardTitle>{principle}</CardTitle>
                    <CardDescription>
                      A default we hold to as the stack takes shape.
                    </CardDescription>
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
              eyebrow="Open-source first"
              title="Open source isn’t a feature. It’s the model."
              description="The infrastructure is already there — Linux runs broadcast servers, FFmpeg powers the audio pipeline. The question is whether the industry is structured to take advantage of it."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Fix bugs from the source, not a support ticket.',
              'Extend tools to fit your exact workflow.',
              'Own the roadmap — open projects don’t get sunset.',
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
        title="If you’re a broadcaster curious about what we’re building, we’d love to hear from you."
        description="We’re just getting started, and there’s a lot ahead. Tell us how your station works."
      />
    </>
  )
}
