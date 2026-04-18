import type { Metadata } from 'next'

import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { technicalStandards } from '@/lib/site-data'

const consultingAreas = [
  {
    title: 'Architecture and restructuring',
    description:
      'For products that need stronger boundaries, clearer runtime choices, and a better long-term shape.',
  },
  {
    title: 'Design-aware implementation',
    description:
      'For teams that need high-quality frontend execution without separating interface quality from technical quality.',
  },
  {
    title: 'Product and platform delivery',
    description:
      'For systems where the visible product and the underlying operational model need to get stronger together.',
  },
]

export const metadata: Metadata = pageMetadata(
  'Consulting',
  'Technical consulting for teams shaping products, platforms, and open-source-adjacent systems.',
  '/consulting',
)

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title="Selective consulting for teams that need sharper systems, not agency packaging."
        description="Sonicverse consulting is strongest where product quality, technical structure, and open-source-adjacent thinking all need to move together."
        highlights={[
          'Architecture, implementation, and redesign work',
          'A product-company lens rather than generic delivery process',
          'Built for mixed technical and commercial audiences',
        ]}
        primaryAction={{ href: '/contact', label: 'Start a conversation' }}
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Focus"
              title="The consulting offer is intentionally narrow."
              description="It exists to support high-trust software work where clarity, credibility, and long-term maintainability matter."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {consultingAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{area.title}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <SectionHeader
              eyebrow="Standards"
              title="Every engagement should leave the system easier to trust."
              description="These standards matter because the consulting work is supposed to strengthen the software, not just ship a milestone."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {technicalStandards.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">Standard 0{index + 1}</Badge>
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
