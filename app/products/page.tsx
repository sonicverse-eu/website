import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { featuredProducts, productSignals } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'Products',
  'Sonicverse products, supporting libraries, and the commercial layers around them.',
  '/products',
)

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="A product surface designed to show what Sonicverse actually ships."
        description="Products, libraries, hosting, and consulting are presented as one connected stack, with clear signals about what exists today and how it is supported."
        highlights={[
          'Flagship products and supporting libraries',
          'Commercial support around real software',
          'Documentation, roadmap, and release signals kept visible',
        ]}
        primaryAction={{ href: '/open-source', label: 'See open-source proof' }}
        secondaryAction={{ href: '/contact', label: 'Talk about a project' }}
        kicker={
          <div className="space-y-3">
            <p className="panel-label">Stack view</p>
            {productSignals.map((signal) => (
              <div
                key={signal.value}
                className="rounded-[1.15rem] border border-border/80 bg-card/80 p-4"
              >
                <p className="text-sm font-semibold text-foreground">{signal.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{signal.label}</p>
              </div>
            ))}
          </div>
        }
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Catalog"
              title="The product ecosystem should feel legible in one pass."
              description="Each entry explains its role in the Sonicverse system rather than pretending every item is a standalone SaaS category."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.name} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="muted">{product.category}</Badge>
                      <Badge>{product.status}</Badge>
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.tags.map((tag) => (
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

      <section className="section-space pt-0">
        <Container>
          <Reveal className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="space-y-4">
                <p className="panel-label">Where to go next</p>
                <h2 className="section-title max-w-3xl">
                  Dive into open-source proof if you want to inspect the public layer, or start a
                  project if you need commercial support around it.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild size="lg">
                  <Link href="/open-source">Open source</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Start a project</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
