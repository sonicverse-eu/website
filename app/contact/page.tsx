import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";
import { collaborationPrompts, contactFaq } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Start a conversation with Sonicverse about a product, platform, or open-source initiative.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Contact"
        title="Start with the problem shape."
        description="A short, thoughtful brief is enough."
        highlights={["Current state", "What is changing", "Where judgment matters most"]}
        compact
      />

      <section className="section-space">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="section-frame px-6 py-8 md:px-8">
            <SectionHeader
              eyebrow="Inquiry form"
              title="A premium handoff, not a generic lead form."
              description="Validated server-side and posted to a configurable webhook."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal className="section-frame px-6 py-8 md:px-8">
              <SectionHeader
                eyebrow="What to include"
                title="Helpful prompts"
                description="Any of these is enough to start a practical conversation."
              />
              <div className="mt-8 grid gap-3">
                {collaborationPrompts.map((prompt) => (
                  <div
                    key={prompt}
                    className="rounded-[1.35rem] border border-border/60 bg-background/44 px-4 py-4 text-sm leading-7 text-foreground/66"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06} className="section-frame px-6 py-8 md:px-8">
              <Badge>Direct contact</Badge>
              <div className="mt-5 space-y-3 text-sm leading-7 text-foreground/66">
                <p>hello@sonicverse.eu</p>
                <p>Open-source-first product engineering and software systems.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title="A few expectations, upfront."
              description="Enough context to make the first conversation more useful."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {contactFaq.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{item.question}</CardTitle>
                    <CardDescription>{item.answer}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
