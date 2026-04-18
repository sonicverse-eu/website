import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import {
  maintenanceSignals,
  openSourceLibraries,
  openSourcePrinciples,
} from '@/lib/site-data/open-source'

import { Reveal } from '../reveal'
import { SectionHeader } from '../section-header'

export function OpenSourceProof() {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Open source"
            title="Public proof should make the products feel more credible, not more abstract."
            description="The open-source layer exists to make Sonicverse easier to inspect, adopt, and trust."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)]">
          <Reveal className="section-shell">
            <div className="grid gap-4 md:grid-cols-3">
              {openSourcePrinciples.map((item, index) => (
                <div key={item} className="rounded-[1.2rem] border border-border/80 bg-card/70 p-4">
                  <p className="panel-label">0{index + 1}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {openSourceLibraries.map((library) => (
                <Card key={library.name} className="h-full bg-card/78">
                  <CardHeader>
                    <CardTitle className="text-[1.1rem]">{library.name}</CardTitle>
                    <CardDescription>{library.summary}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {library.tags.map((tag) => (
                        <Badge key={tag} variant="muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="section-shell space-y-4">
            <p className="panel-label">Maintenance quality</p>
            <h3 className="text-[1.7rem] leading-[1.08] font-semibold tracking-[-0.05em]">
              Buyers get confidence from the same signals developers use.
            </h3>
            <div className="space-y-3">
              {maintenanceSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-[1.2rem] border border-border/80 bg-card/78 px-4 py-4 text-sm leading-7 text-muted-foreground"
                >
                  {signal}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/open-source">See open-source proof</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/roadmap">View roadmap</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
