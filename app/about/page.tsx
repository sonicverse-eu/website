import type { Metadata } from 'next'

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
  'Why Sonicverse exists, what it builds, and how it approaches product and system quality.',
  '/about',
)

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Sonicverse exists to make software feel more deliberate in public and in production."
        description="It is a product company with an open-source posture, a hosting path, and a consulting model designed to support serious software work."
        highlights={[
          'Products and libraries first',
          'Commercial support where production confidence matters',
          'A calmer operating model than the usual studio or startup marketing shell',
        ]}
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Principles"
              title="A small number of principles should shape both the product and the company."
              description="The site should make these priorities visible instead of hiding them inside generic culture copy."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal key={principle} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">0{index + 1}</Badge>
                    <CardTitle>{principle}</CardTitle>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
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
    </>
  )
}
