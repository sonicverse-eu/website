import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'

import { SignalsSection } from '@/components/content/content-ui'
import { CTASection } from '@/components/site/cta-section'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { SignalFlow } from '@/components/site/signal-flow'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { principles, projectArchetypes, repositorySignals, serviceAreas } from '@/lib/site-data'
import {
  getFeaturedBlogPost,
  getLatestBlogPosts,
  getLatestChangelogEntries,
  getRecentRoadmapEntries,
} from '@/lib/content'

const legacyProblems: { id: string; title: string; body: string }[] = [
  {
    id: 'lock-in',
    title: 'Vendor lock-in',
    body: 'A handful of proprietary vendors, long contracts, and roadmaps dictated by someone else’s priorities.',
  },
  {
    id: 'silos',
    title: 'Tools that don’t talk',
    body: 'Closed formats and limited APIs mean every integration needs expensive middleware to bridge the gap.',
  },
  {
    id: 'sunset',
    title: 'Acquired and sunset',
    body: 'When a vendor gets bought or shuts a product down, the station is left scrambling. The community can’t.',
  },
]

const openStackPoints = [
  'Open source and community driven',
  'Modular by design',
  'Interoperable APIs and standards',
  'Run on your infrastructure',
]

export async function HomePage() {
  const [featuredBlog, recentChangelog, recentRoadmap] = await Promise.all([
    getFeaturedBlogPost(),
    getLatestChangelogEntries(3),
    getRecentRoadmapEntries(3),
  ])
  const recentBlog = await getLatestBlogPosts(2, {
    excludeSlug: featuredBlog?.slug,
  })

  return (
    <>
      <PageHero
        layout="split"
        title="Broadcast software, built in the open."
        description="Open-source playout, scheduling, streaming, and station tooling — built by broadcasters and developers for the realities of modern radio."
        primaryAction={{ href: '/contact', label: 'Get early access' }}
        secondaryAction={{ href: '/platform', label: 'Explore the stack' }}
        visual={<SignalFlow />}
      />

      <section className="pb-8 sm:pb-10">
        <Container>
          <Reveal variant="line" className="border-y border-border">
            <div className="grid gap-0 divide-y divide-border/70 md:grid-cols-4 md:divide-x md:divide-y-0">
              {principles.map((principle, index) => (
                <div key={principle} className="flex items-center gap-3 px-0 py-3 md:px-4 md:py-2">
                  <span className="font-mono text-xs font-medium tracking-[0.15em] text-primary/80">
                    0{index + 1}
                  </span>
                  <p className="text-sm text-foreground/68">{principle}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-space">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="The problem"
              title="Radio has been stuck with the same software for decades."
              description="Proprietary vendors, opaque pricing, and tools that were never built for how stations actually work. That era is ending."
            />
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {legacyProblems.map((item, index) => (
              <Reveal key={item.id} variant="row" delay={index * 0.05}>
                <div className="grid gap-5 py-6 md:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.1fr)] md:items-start">
                  <div className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.16em] text-primary uppercase">
                    <X className="size-3" />0{index + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-normal text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-foreground/64">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeader
              eyebrow="The open stack"
              title="One open stack for the whole broadcast workflow."
              description="From the on-air engine to the tooling around it — designed to interoperate on open standards instead of vendor lock-in."
            />
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {openStackPoints.map((item, index) => (
              <Reveal key={item} variant="row" delay={index * 0.05}>
                <div className="flex items-center gap-4 py-5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-primary/30 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <p className="text-sm text-foreground/72">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Modules"
              title="Every part of the day, covered."
              description="The pieces that have been underserved for too long — from show preparation to station management to infrastructure."
            />
          </Reveal>
          <div className="divide-y divide-border border border-border bg-card">
            {serviceAreas.slice(0, 6).map((service, index) => (
              <Reveal key={service.title} variant="row" delay={index * 0.04}>
                <Link
                  href="/platform"
                  className="group grid gap-5 px-5 py-5 transition hover:bg-primary/[0.035] lg:grid-cols-[4rem_0.8fr_1fr_auto] lg:items-center lg:px-6"
                >
                  <div className="flex size-10 items-center justify-center rounded-sm border border-border text-primary transition group-hover:border-primary/35">
                    <span className="font-mono text-[0.7rem] tracking-[0.1em]">0{index + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.68rem] tracking-[0.18em] text-primary uppercase">
                      Module
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-foreground/64">{service.description}</p>
                  <div className="flex items-center gap-4 lg:justify-end">
                    {service.bullets.map((bullet) => (
                      <span
                        key={bullet}
                        className="hidden rounded-sm border border-border px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.12em] text-foreground/52 uppercase sm:inline-flex"
                      >
                        {bullet}
                      </span>
                    ))}
                    <ArrowRight className="size-4 shrink-0 text-foreground/42 transition group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Button asChild variant="outline" size="lg">
              <Link href="/platform">
                Explore the full stack
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      <SignalsSection
        featuredBlog={featuredBlog}
        recentBlog={recentBlog}
        recentChangelog={recentChangelog}
        recentRoadmap={recentRoadmap}
      />

      <section className="section-space">
        <Container>
          <Reveal>
            <div className="border-y border-border py-10 sm:py-12">
              <SectionHeader
                eyebrow="Why open source"
                title="Your stack, your roadmap."
                description="Open source has already solved these problems for industries far more demanding than broadcasting. Radio deserves the same control."
              />
              <div className="mt-10 grid gap-0 divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
                {repositorySignals.map((item, index) => (
                  <Reveal key={item} variant="row" delay={index * 0.05}>
                    <div className="flex min-h-32 flex-col justify-between gap-6 px-5 py-5">
                      <span className="font-mono text-[0.7rem] tracking-[0.16em] text-primary uppercase">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl leading-snug font-semibold text-foreground">{item}</h3>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Who it’s for"
              title="Built for the people who run stations."
              description="Independent and community stations, the managers who budget for them, and the technical teams who keep them on air."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {projectArchetypes.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Early access"
        title="The tools are ready. The only question is whether your station is."
        description="We’re building in the open and shaping the stack around real stations. Get early access, or tell us how yours works."
      />
    </>
  )
}
