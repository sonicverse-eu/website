import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { featuredProducts, productSignals } from '@/lib/site-data'

import { Reveal } from '../reveal'
import { SectionHeader } from '../section-header'

export function ProductSuite() {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Products"
            title="Products, libraries, and runtime support presented as one coherent stack."
            description="Sonicverse should feel like a real software company immediately, not a consulting wrapper around future intent."
          />
        </Reveal>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.name} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader className="h-full justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="muted">{product.category}</Badge>
                        <Badge>{product.status}</Badge>
                      </div>
                      <div className="space-y-3">
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
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
          <Reveal delay={0.08} className="section-shell space-y-5">
            <div className="space-y-3">
              <p className="panel-label">System signals</p>
              <h3 className="text-[1.7rem] leading-[1.08] font-semibold tracking-[-0.05em]">
                The commercial model is built around software that already exists.
              </h3>
            </div>
            <div className="space-y-4">
              {productSignals.map((signal) => (
                <div
                  key={signal.value}
                  className="rounded-[1.2rem] border border-border/80 bg-card/78 p-4"
                >
                  <p className="text-sm font-semibold tracking-[-0.03em] text-foreground">
                    {signal.value}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{signal.label}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Browse the product surface</Link>
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
