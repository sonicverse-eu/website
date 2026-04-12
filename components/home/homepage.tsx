import Link from "next/link";

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
import { Separator } from "@/components/ui/separator";
import {
  capabilities,
  principles,
  projectArchetypes,
  serviceAreas,
} from "@/lib/site-data";

export function HomePage() {
  return (
    <>
      <PageHero
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
      >
        <HeroSystemCard />
      </PageHero>

      <section className="pb-8 sm:pb-10">
        <Container>
          <Reveal className="section-frame px-6 py-5 sm:px-8">
            <div className="grid gap-5 md:grid-cols-4">
              {principles.map((principle, index) => (
                <div key={principle} className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary/80">
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

function HeroSystemCard() {
  return (
    <div className="space-y-5">
      <div className="rounded-[1.7rem] border border-border/70 bg-background/60 p-5">
        <div className="flex items-center justify-between text-xs tracking-[0.18em] uppercase text-foreground/44">
          <span>System map</span>
          <span>Cloudflare-ready</span>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          {[
            ["Surface", "Marketing site, product shell, open-source narrative"],
            ["Foundation", "Design system, routing, deployment"],
            ["Delivery", "Intentional motion and readable code"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid gap-2 rounded-[1.25rem] border border-border/60 bg-background/44 p-4"
            >
              <span className="text-xs tracking-[0.18em] uppercase text-foreground/44">
                {label}
              </span>
              <span className="text-sm leading-7 text-foreground/72">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-primary/[0.08]">
          <CardHeader>
            <CardTitle className="text-xl">Open by default</CardTitle>
            <CardDescription>Public thinking and shared primitives.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Built with intent</CardTitle>
            <CardDescription>Calm decisions and a product-minded sense of finish.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
