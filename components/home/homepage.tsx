import Image from "next/image";
import Link from "next/link";

import { SignalsSection } from "@/components/content/content-ui";
import { CTASection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  capabilities,
  principles,
  projectArchetypes,
  serviceAreas,
} from "@/lib/site-data";
import {
  getFeaturedBlogPost,
  getLatestBlogPosts,
  getLatestChangelogEntries,
  getRecentRoadmapEntries,
} from "@/lib/content";

export async function HomePage() {
  const [featuredBlog, recentChangelog, recentRoadmap] = await Promise.all([
    getFeaturedBlogPost(),
    getLatestChangelogEntries(3),
    getRecentRoadmapEntries(3),
  ]);
  const recentBlog = await getLatestBlogPosts(2, {
    excludeSlug: featuredBlog?.slug,
  });

  return (
    <>
      <PageHero
        layout="split"
        eyebrow="Open-source-native software systems"
        title="Software systems with intent."
        description="Modern products, platform foundations, and open-source technology built with calm technical ambition."
        highlights={[
          "Premium product surfaces",
          "Cloudflare-ready foundations",
          "Open source by default",
        ]}
        primaryAction={{ href: "/contact", label: "Start a project" }}
        secondaryAction={{ href: "/open-source", label: "Explore open source" }}
        visual={<HeroImageVisual />}
      />

      <section className="pb-8 sm:pb-10">
        <Container>
          <Reveal className="section-frame px-6 py-5 sm:px-8">
            <div className="grid gap-5 md:grid-cols-4">
              {principles.map((principle, index) => (
                <div key={principle} className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-primary/80">
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
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Capabilities"
              title="Focused capabilities for modern product systems."
              description="Each area of work is designed to strengthen the product surface and the system underneath it."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">0{index + 1}</Badge>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <SignalsSection
        featuredBlog={featuredBlog}
        recentBlog={recentBlog}
        recentChangelog={recentChangelog}
        recentRoadmap={recentRoadmap}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Services preview"
              title="Modern product engineering, without generic studio packaging."
              description="Architecture, interfaces, delivery systems, and the product surfaces people actually touch."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceAreas.slice(0, 4).map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {service.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-2xl border border-border/60 bg-background/34 px-4 py-3 text-sm text-foreground/66"
                      >
                        {bullet}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">See all services</Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Open source"
              title="Open source is part of the operating model."
              description="Public building blocks, clear contribution paths, and systems that stay legible outside the core team."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Public primitives shaped by delivery work",
              "Architecture that stays readable outside the founding team",
              "Tooling that helps maintainers as much as adopters",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{item}</CardTitle>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Projects"
              title="Capability shown through believable archetypes."
              description="Public-facing sites, developer products, operational tools, and shared internal systems."
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
        eyebrow="Start well"
        title="Bring the system shape and the next milestone."
        description="The strongest briefs are clear, direct, and grounded in real constraints."
      />
    </>
  );
}

function HeroImageVisual() {
  return (
    <div className="relative isolate h-full min-h-[320px] overflow-hidden rounded-[1.8rem]">
      <Image
        src="/images/home-hero-console.jpg"
        alt="Close-up of an audio mixing console with faders and lit controls."
        fill
        sizes="(max-width: 1024px) 100vw, 30rem"
        className="object-cover object-[center_55%]"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.04),rgba(7,10,18,0.26))]" />
      <div className="absolute inset-0 rounded-[1.8rem] ring-1 ring-white/12 ring-inset" />
      <div className="absolute inset-x-5 bottom-5 rounded-[1.2rem] border border-white/14 bg-black/28 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.16em] uppercase text-white/72">
          <span className="h-2 w-2 rounded-full bg-white/70" />
          Sonicverse
        </div>
        <div className="mt-2 h-px w-full bg-white/10" />
      </div>
    </div>
  );
}
