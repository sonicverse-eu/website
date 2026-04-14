import type { Metadata } from 'next'

import { VulnReportForm } from '@/components/forms/vuln-report-form'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata(
  'Security',
  'Report vulnerabilities privately, understand Sonicverse security expectations, and follow a coordinated disclosure process.',
  '/security',
)

const reportingGuidance = [
  {
    title: 'Report privately',
    description:
      'Use the form below or email security@sonicverse.eu. Include which Sonicverse project, deployment, or repository is affected, and avoid public issue trackers for security-sensitive reports.',
  },
  {
    title: 'Include the essentials',
    description:
      'A strong report covers the issue summary, reproduction steps, impact, and any version, environment, URL, project name, or commit details that help us verify it quickly.',
  },
  {
    title: 'Expect coordinated disclosure',
    description:
      'We aim to acknowledge reports within 3 business days, complete initial triage within 7, and share follow-up updates as work progresses. Please do not disclose the issue publicly before coordination.',
  },
] as const

export default function SecurityPage() {
  return (
    <>
      <PageHero
        layout="single"
        eyebrow="Security"
        title="Report vulnerabilities through one clear private path."
        description="Use the form below to share the issue, how to reproduce it, and which Sonicverse project is affected."
        highlights={['Private reporting', 'Reproduction details', 'Coordinated disclosure']}
        primaryAction={{ href: '#report-a-vulnerability', label: 'Report a vulnerability' }}
        compact
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Policy"
              title="A simpler security reporting policy."
              description="Everything needed to report responsibly, without making the page harder to scan."
            />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {reportingGuidance.map((item, index) => (
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

      <section id="report-a-vulnerability" className="pb-24 scroll-mt-24 sm:pb-28">
        <Container className="space-y-6">
          <Reveal className="section-frame px-6 py-6 md:px-8">
            <div className="grid gap-4 md:grid-cols-[0.34fr_1fr] md:items-start md:gap-8">
              <div className="space-y-2">
                <p className="eyebrow">Before you send</p>
                <h2 className="text-[1.35rem] leading-[1.08] font-medium tracking-[-0.03em] text-foreground">
                  A few practical guardrails.
                </h2>
              </div>
              <div className="space-y-3 text-sm leading-7 text-foreground/66">
                <p>
                  Use the form on this page or email{' '}
                  <a
                    href="mailto:security@sonicverse.eu?subject=Security%20Report"
                    className="text-primary transition hover:text-primary/80"
                  >
                    security@sonicverse.eu
                  </a>
                  .
                </p>
                <p>Avoid accessing, modifying, or retaining other people’s data while testing.</p>
                <p>
                  If sensitive data may have been exposed, stop testing and tell us immediately in
                  your report.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="section-frame px-6 py-8 md:px-8">
            <SectionHeader
              eyebrow="Report form"
              title="Report a vulnerability."
              description="Tell us what happened, how to reproduce it, and what the impact looks like."
            />
            <div className="mt-8">
              <VulnReportForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
