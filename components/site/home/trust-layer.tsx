import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { trustSignals } from '@/lib/site-data/trust'

import { Reveal } from '../reveal'
import { SectionHeader } from '../section-header'

export function TrustLayer() {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Trust layer"
            title="Trust comes from how the company behaves in public, not from filler testimonials."
            description="Public signals, release hygiene, and operational clarity do more for this brand than generic quote blocks."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-4">
          {trustSignals.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-[1.15rem]">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
