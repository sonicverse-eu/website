import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/contact-form'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import {
  CONTACT_DESCRIPTION,
  CONTACT_DIRECT_DESCRIPTION,
  CONTACT_DIRECT_LABEL,
  CONTACT_FAQ_DESCRIPTION,
  CONTACT_FAQ_EYEBROW,
  CONTACT_FAQ_TITLE,
  CONTACT_HIGHLIGHTS,
  CONTACT_INQUIRY_DESCRIPTION,
  CONTACT_INQUIRY_EYEBROW,
  CONTACT_INQUIRY_TITLE,
  CONTACT_PAGE_EYEBROW,
  CONTACT_PAGE_METADATA_DESCRIPTION,
  CONTACT_TITLE,
  CONTACT_TOPICS_DESCRIPTION,
  CONTACT_TOPICS_EYEBROW,
  CONTACT_TOPICS_TITLE,
} from '@/content/site/site-config'
import { pageMetadata } from '@/lib/metadata'
import { collaborationPrompts, contactFaq } from '@/lib/site-data'

export const metadata: Metadata = pageMetadata(
  'Contact',
  CONTACT_PAGE_METADATA_DESCRIPTION,
  '/contact',
)

export default function ContactPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow={CONTACT_PAGE_EYEBROW}
        title={CONTACT_TITLE}
        description={CONTACT_DESCRIPTION}
        highlights={CONTACT_HIGHLIGHTS}
        compact
      />

      <section className="section-space">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="section-frame px-6 py-8 md:px-8">
            <SectionHeader
              eyebrow={CONTACT_INQUIRY_EYEBROW}
              title={CONTACT_INQUIRY_TITLE}
              description={CONTACT_INQUIRY_DESCRIPTION}
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal className="section-frame px-6 py-8 md:px-8">
              <SectionHeader
                eyebrow={CONTACT_TOPICS_EYEBROW}
                title={CONTACT_TOPICS_TITLE}
                description={CONTACT_TOPICS_DESCRIPTION}
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
              <Badge>{CONTACT_DIRECT_LABEL}</Badge>
              <div className="mt-5 space-y-3 text-sm leading-7 text-foreground/66">
                <p>hello@sonicverse.eu</p>
                <p>{CONTACT_DIRECT_DESCRIPTION}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow={CONTACT_FAQ_EYEBROW}
              title={CONTACT_FAQ_TITLE}
              description={CONTACT_FAQ_DESCRIPTION}
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
  )
}
