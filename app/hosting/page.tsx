import type { Metadata } from 'next'

import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'

const hostingPrinciples = [
  'Managed deployments for products that already matter in production.',
  'Performance and reliability work shaped around the realities of the software.',
  'Operational stewardship that keeps products easier to trust over time.',
]

export const metadata: Metadata = pageMetadata(
  'Hosting',
  'Commercial hosting and production stewardship around Sonicverse software and adjacent systems.',
  '/hosting',
)

export default function HostingPage() {
  return (
    <>
      <PageHero
        eyebrow="Hosting"
        title="Commercial hosting for software that already deserves a calmer production path."
        description="Sonicverse hosting is designed for teams that want real operational support around products, libraries, and systems they expect people to rely on."
        highlights={[
          'Managed deployments and runtime stewardship',
          'Performance and release-aware operations',
          'A direct path from product ownership to production support',
        ]}
        primaryAction={{ href: '/contact', label: 'Discuss hosting' }}
        secondaryAction={{ href: '/products', label: 'See products', variant: 'outline' }}
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Operational model"
              title="Hosting should feel like stewardship, not just infrastructure resale."
              description="The offer is strongest when Sonicverse already understands the software surface and can support it as a living product."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {hostingPrinciples.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-[1.1rem]">{item}</CardTitle>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
