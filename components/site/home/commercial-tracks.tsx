import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { commercialTracks } from '@/lib/site-data'

import { Reveal } from '../reveal'
import { SectionHeader } from '../section-header'

export function CommercialTracks() {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Commercial paths"
            title="Hosting and consulting should feel like support around the product ecosystem, not a generic agency menu."
            description="Each path is clear, specific, and directly connected to the software Sonicverse builds and maintains."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {commercialTracks.map((track, index) => (
            <Reveal key={track.title} delay={index * 0.06}>
              <Card className="h-full">
                <CardHeader className="h-full justify-between">
                  <div className="space-y-4">
                    <CardTitle className="text-[1.8rem]">{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </div>
                  <div className="space-y-3">
                    {track.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-[1.1rem] border border-border/80 bg-card/78 px-4 py-3 text-sm text-muted-foreground"
                      >
                        {bullet}
                      </div>
                    ))}
                    <Button asChild variant="outline">
                      <Link
                        href={track.title === 'Commercial hosting' ? '/hosting' : '/consulting'}
                      >
                        Explore {track.title.toLowerCase()}
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
