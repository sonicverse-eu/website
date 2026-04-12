import type { Metadata } from "next";

import { CTASection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";
import { projectArchetypes } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "Projects",
  "Project archetypes and system types Sonicverse is designed to build without inventing fake case studies.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Projects"
        title="Capability, shown through the systems we build."
        description="Products, platforms, internal systems, and open-source infrastructure with visible design judgment."
        highlights={[
          "Operational platforms",
          "Developer-facing products",
          "Open-source ecosystems",
        ]}
        primaryAction={{ href: "/contact", label: "Talk through your system" }}
      />

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Selected archetypes"
              title="Real categories of work, not fictional case studies."
              description="Archetypes that show the kind of system thinking Sonicverse brings to a project."
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

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Project signals"
              title="A few signs that the fit is right."
              description="The work is strongest when technical structure matters as much as visible output."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Multiple audiences and complex interaction surfaces",
              "Technical credibility is part of the brand experience",
              "Shared structure needs to get stronger before the platform can scale",
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
        eyebrow="Project fit"
        title="If the system needs technical structure and product-level finish, that is the right kind of brief."
        description="Sonicverse is best used where long-term clarity matters as much as short-term delivery."
      />
    </>
  );
}
