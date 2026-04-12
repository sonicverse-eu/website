import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Globe,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";

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
        visual={<HeroIntentVisual />}
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

function HeroIntentVisual() {
  const railIcons: { id: string; icon: LucideIcon }[] = [
    { id: "layers", icon: Layers3 },
    { id: "workflow", icon: Workflow },
    { id: "code", icon: Code2 },
  ];
  const topIcons: { id: string; icon: LucideIcon }[] = [
    { id: "spark", icon: Sparkles },
    { id: "structure", icon: Layers3 },
    { id: "launch", icon: ArrowUpRight },
  ];
  const rows: { id: string; icon: LucideIcon }[] = [
    { id: "surface", icon: Layers3 },
    { id: "runtime", icon: Code2 },
    { id: "delivery", icon: Workflow },
  ];
  const sideTiles: { id: string; icon: LucideIcon }[] = [
    { id: "globe", icon: Globe },
    { id: "flow", icon: Workflow },
  ];
  const bottomSignals: { id: string; icon: LucideIcon }[] = [
    { id: "reach", icon: Globe },
    { id: "finish", icon: Sparkles },
    { id: "momentum", icon: ArrowUpRight },
  ];

  return (
    <div className="relative isolate flex h-full min-h-[320px] items-stretch">
      <div className="absolute inset-0 rounded-[1.8rem] bg-[radial-gradient(circle_at_top_right,rgba(117,95,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(117,95,255,0.1),transparent_30%)]" />
      <div className="hero-section-mask absolute inset-0 opacity-45">
        <div className="quiet-grid h-full w-full" />
      </div>
      <div className="absolute top-6 right-5 h-28 w-28 rounded-full border border-primary/12 bg-primary/10 blur-3xl" />
      <div className="absolute bottom-5 left-5 h-24 w-24 rounded-full border border-primary/10 bg-primary/8 blur-2xl" />

      <div className="relative z-10 grid h-full w-full gap-4 lg:grid-cols-[76px_minmax(0,1fr)]">
        <div className="hidden h-full flex-col justify-between py-3 lg:flex">
          {railIcons.map(({ id, icon: Icon }) => (
            <div
              key={id}
              className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-border/60 bg-background/54 text-foreground/72 shadow-[0_14px_40px_rgba(16,18,33,0.08)]"
            >
              <Icon className="size-5" strokeWidth={1.7} />
            </div>
          ))}
        </div>

        <div className="grid h-full gap-4">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_148px]">
            <div className="rounded-[1.75rem] border border-border/60 bg-background/62 p-4 shadow-[0_20px_50px_rgba(16,18,33,0.1)] sm:p-5">
              <div className="flex flex-wrap gap-2">
                {topIcons.map(({ id, icon: Icon }) => (
                  <div
                    key={id}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/68 text-primary"
                  >
                    <Icon className="size-4" strokeWidth={1.8} />
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3">
                {rows.map(({ id, icon: Icon }, index) => (
                  <div
                    key={id}
                    className="rounded-[1.35rem] border border-border/60 bg-background/52 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-border/60 bg-primary/10 text-primary">
                        <Icon className="size-5" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div
                          className="h-2 rounded-full bg-foreground/14"
                          style={{ width: `${70 - index * 8}%` }}
                        />
                        <div
                          className="h-2 rounded-full bg-foreground/9"
                          style={{ width: `${90 - index * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.7rem] border border-border/60 bg-background/58 p-4 shadow-[0_18px_44px_rgba(16,18,33,0.08)]">
                <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-border/55" />
                  <div className="absolute inset-[16%] rounded-full border border-primary/35" />
                  <div className="absolute inset-[32%] rounded-full border border-border/45" />
                  <div className="absolute top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary/80" />
                  <div className="absolute right-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-foreground/36" />
                  <div className="absolute bottom-2 left-5 h-2.5 w-2.5 rounded-full bg-foreground/30" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/12 text-primary">
                    <Cloud className="size-6" strokeWidth={1.8} />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-1">
                {sideTiles.map(({ id, icon: Icon }) => (
                  <div
                    key={id}
                    className="rounded-[1.35rem] border border-border/60 bg-background/52 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] bg-primary/10 text-primary">
                        <Icon className="size-4" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 rounded-full bg-foreground/12" />
                        <div className="h-2 w-2/3 rounded-full bg-foreground/8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {bottomSignals.map(({ id, icon: Icon }) => (
              <HeroSignal key={id} icon={Icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSignal({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="rounded-[1.35rem] border border-border/60 bg-background/54 p-3 shadow-[0_16px_40px_rgba(16,18,33,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] border border-border/60 bg-background/78 text-primary">
          <Icon className="size-4" strokeWidth={1.8} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-2 rounded-full bg-foreground/12" />
          <div className="h-2 w-3/4 rounded-full bg-foreground/8" />
        </div>
      </div>
    </div>
  );
}
