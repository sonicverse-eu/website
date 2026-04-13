import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Cloud,
  Globe,
  Package2,
  Server,
  Sparkles,
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
  repositorySignals,
  serviceAreas,
} from "@/lib/site-data";
import {
  getFeaturedBlogPost,
  getLatestBlogPosts,
  getLatestChangelogEntries,
  getRecentRoadmapEntries,
} from "@/lib/content";

const capabilityIcons: LucideIcon[] = [Sparkles, Server, Package2];

const capabilityRows: { id: string; icon: LucideIcon; label: string; sub: string }[] = [
  { id: "product",  icon: Sparkles, label: "Product engineering",  sub: "Modern surfaces & delivery systems" },
  { id: "platform", icon: Server,   label: "Platform foundations", sub: "Cloudflare-ready web platforms"     },
  { id: "oss",      icon: Package2, label: "Open-source tooling",  sub: "Public primitives & packages"       },
];

const statusSignals: { id: string; icon: LucideIcon; label: string; value: string }[] = [
  { id: "reach",    icon: Globe,        label: "Platform",  value: "Edge-ready"   },
  { id: "finish",   icon: Sparkles,     label: "Quality",   value: "Intent-first" },
  { id: "momentum", icon: ArrowUpRight, label: "Delivery",  value: "Open source"  },
];


function HeroImageVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.6rem]">
      <Image
        src="/images/radio-mixer.jpg"
        alt="Professional audio mixing console"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 30rem"
        priority
      />
    </div>
  );
}

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
            {capabilities.map((item, index) => {
              const CapIcon = capabilityIcons[index];
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-border/60 bg-primary/10 text-primary">
                        <CapIcon className="size-5" strokeWidth={1.8} />
                      </div>
                      <Badge variant="muted">0{index + 1}</Badge>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>
              );
            })}
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
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="inline-flex items-center rounded-full border border-border/55 bg-background/40 px-3 py-1 text-xs text-foreground/60"
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>
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
        <Container>
          <Reveal>
            <div className="section-frame space-y-10 px-6 py-10 sm:px-10 sm:py-12">
              <SectionHeader
                eyebrow="Open source"
                title="Open source is part of the operating model."
                description="Public building blocks, clear contribution paths, and systems that stay legible outside the core team."
              />
              <div className="grid gap-4 md:grid-cols-3">
                {repositorySignals.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-xl">{item}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
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
  const railIcons = capabilityRows.map(({ id, icon }) => ({ id, icon }));

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
          <div className="rounded-[1.75rem] border border-border/60 bg-background/62 p-4 shadow-[0_20px_50px_rgba(16,18,33,0.1)] sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-foreground/40">
                Capability areas
              </span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Cloud className="size-3" strokeWidth={2} />
              </div>
            </div>
            <div className="grid gap-3">
              {capabilityRows.map(({ id, icon: Icon, label, sub }) => (
                <div key={id} className="rounded-[1.35rem] border border-border/60 bg-background/52 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-border/60 bg-primary/10 text-primary">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium tracking-[-0.01em] text-foreground/84">{label}</p>
                      <p className="mt-0.5 truncate text-xs text-foreground/48">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {statusSignals.map(({ id, icon, label, value }) => (
              <HeroSignal key={id} icon={icon} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSignal({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-border/60 bg-background/54 p-3 shadow-[0_16px_40px_rgba(16,18,33,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] border border-border/60 bg-background/78 text-primary">
          <Icon className="size-4" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-medium tracking-[0.14em] uppercase text-foreground/40">{label}</p>
          <p className="text-sm font-medium text-foreground/76">{value}</p>
        </div>
        <div className="mt-2 h-px w-full bg-white/10" />
      </div>
    </div>
  );
}
