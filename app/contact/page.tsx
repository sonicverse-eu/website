import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/contact-form'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { collaborationPrompts, contactFaq } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'Contact',
  'Start a conversation with Sonicverse about products, hosting, consulting, or open-source-backed systems.',
  '/contact',
)

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Bring the current system shape and the next decision that needs to get better."
        description="A concise brief is enough. The best starting point is what exists today, what is getting in the way, and what a stronger version should feel like."
        highlights={[
          'Products, hosting, consulting, or OSS-backed system work',
          'Mixed technical and commercial audiences welcome',
          'A direct intake path without agency fluff',
        ]}
        compact
      />

      <section className="section-space pt-0">
        <Container className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.8fr)]">
          <Reveal className="section-shell">
            <SectionHeader
              eyebrow="Inquiry"
              title="Share the context that matters."
              description="The form should help us understand the product, the system, and the next milestone without forcing a long discovery ritual."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
          <div className="space-y-5">
            <Reveal className="section-shell">
              <SectionHeader
                eyebrow="Useful prompts"
                title="Any of these is enough to start."
                description="If your brief is messy, that is normal. Just point at the pressure points."
              />
              <div className="mt-6 grid gap-3">
                {collaborationPrompts.map((prompt) => (
                  <div
                    key={prompt}
                    className="rounded-[1.15rem] border border-border/80 bg-card/78 px-4 py-4 text-sm leading-7 text-muted-foreground"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.06} className="section-shell">
              <p className="panel-label">Direct contact</p>
              <p className="mt-3 text-[1.35rem] leading-[1.08] font-semibold tracking-[-0.04em]">
                hello@sonicverse.eu
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Use email if you already know what needs to be discussed and want a more direct
                path.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title="A little context before the first conversation."
              description="These answers exist to reduce ambiguity, not to gatekeep contact."
            />
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
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
  )
}
