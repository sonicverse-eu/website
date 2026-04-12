import type { Metadata } from "next";

import { CTASection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";
import { operatingModel, principles } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "About",
  "How Sonicverse thinks about modern software systems, open-source technology, and long-term technical quality.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="About Sonicverse"
        title="Technical ambition, with a calmer operating model."
        description="Modern software systems and digital products built with structure, clarity, and long-term care."
        highlights={[
          "Direct collaboration",
          "Transparent tradeoffs",
          "Long-term structure",
        ]}
        primaryAction={{ href: "/contact", label: "Start a conversation" }}
        secondaryAction={{ href: "/services", label: "View services" }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Mission"
              title="Build software that feels deliberate."
              description="Products that feel composed. Architecture that stays understandable. Collaboration that keeps trust intact."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {operatingModel.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
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
              eyebrow="Values"
              title="A small set of principles shapes the work."
              description="Practical filters for product, engineering, and collaboration decisions."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal key={principle} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">0{index + 1}</Badge>
                    <CardTitle>{principle}</CardTitle>
                    <CardDescription>A preference for systems that remain useful over time.</CardDescription>
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
              eyebrow="Open-source philosophy"
              title="Open collaboration keeps systems sharper."
              description="Reusable knowledge should travel further than a single private project."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Architecture stays easier to inspect.",
              "Contribution becomes more realistic.",
              "Shared patterns become easier to maintain.",
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

      <CTASection
        eyebrow="How we work"
        title="When product judgment and engineering discipline need to move together, Sonicverse is built for that intersection."
        description="Bring the system shape and the direction of travel."
      />
    </>
  );
}
