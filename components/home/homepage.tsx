import Link from 'next/link'

import { HomeHeroBackground } from '@/components/site/home/home-hero-background'
import { CommercialTracks } from '@/components/site/home/commercial-tracks'
import { FinalCta } from '@/components/site/home/final-cta'
import { JournalStrip } from '@/components/site/home/journal-strip'
import { OpenSourceProof } from '@/components/site/home/open-source-proof'
import { ProductSuite } from '@/components/site/home/product-suite'
import { ProjectShowcase } from '@/components/site/home/project-showcase'
import { TrustLayer } from '@/components/site/home/trust-layer'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  getFeaturedBlogPost,
  getLatestChangelogEntries,
  getRecentRoadmapEntries,
} from '@/lib/content'

export async function HomePage() {
  const [featuredBlog, recentChangelog, recentRoadmap] = await Promise.all([
    getFeaturedBlogPost(),
    getLatestChangelogEntries(1),
    getRecentRoadmapEntries(1),
  ])

  return (
    <>
      <section className="relative overflow-hidden pt-18 pb-10 sm:pt-24 sm:pb-12 lg:pt-28">
        <Container>
          <div className="surface-panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <HomeHeroBackground />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.8fr)] lg:items-end">
              <Reveal className="space-y-6">
                <Badge>Open-source products, hosted systems, and technical consulting</Badge>
                <div className="space-y-5">
                  <h1 className="hero-title max-w-4xl">
                    Sonicverse builds products in public and stands behind them in production.
                  </h1>
                  <p className="copy-lg max-w-2xl">
                    A modern software brand for products, OSS libraries, commercial hosting, and
                    consulting that feels precise enough for developers and credible enough for
                    buyers.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button asChild size="lg">
                    <Link href="/products">Explore products</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Start a project</Link>
                  </Button>
                </div>
                <div className="grid gap-3 pt-2 sm:grid-cols-3">
                  {[
                    'Open-source credibility built through visible product signals.',
                    'Commercial hosting and support around real software.',
                    'Consulting for teams that need stronger systems, not louder marketing.',
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.15rem] border border-border/80 bg-card/72 px-4 py-3 text-sm leading-7 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06} className="hero-kicker space-y-5">
                <p className="panel-label">Current surface</p>
                <div className="rounded-[1.3rem] border border-border/80 bg-card/78 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Products and libraries
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Built as a coherent ecosystem instead of disconnected offerings.
                      </p>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-primary">
                      Live
                    </span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Open source', 'Readable by default'],
                    ['Hosting', 'Production support'],
                    ['Consulting', 'Architecture + delivery'],
                    ['Journal', 'Roadmap, releases, writing'],
                  ].map(([label, sub]) => (
                    <div
                      key={label}
                      className="rounded-[1.15rem] border border-border/80 bg-card/72 p-4"
                    >
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <ProductSuite />
      <OpenSourceProof />
      <CommercialTracks />
      <ProjectShowcase />
      <TrustLayer />
      <JournalStrip
        featuredBlog={featuredBlog}
        recentChangelog={recentChangelog}
        recentRoadmap={recentRoadmap}
      />
      <FinalCta />
    </>
  )
}
