import type { Metadata } from 'next'

import { VulnReportForm } from '@/components/forms/vuln-report-form'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'

const reportingGuidance = [
  {
    title: 'Report privately',
    description:
      'Use the form on this page or email security@sonicverse.eu. Avoid public issue trackers for security-sensitive reports.',
  },
  {
    title: 'Include what matters',
    description:
      'Tell us which product, repository, deployment, or runtime is affected, how to reproduce the issue, and what the impact looks like.',
  },
  {
    title: 'Coordinate disclosure',
    description:
      'We aim to acknowledge reports quickly, triage clearly, and work toward a coordinated disclosure path.',
  },
]

export const metadata: Metadata = pageMetadata(
  'Security',
  'Sonicverse security reporting path, disclosure expectations, and vulnerability intake form.',
  '/security',
)

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="A clear private path for reporting vulnerabilities."
        description="Security should be easy to report, easy to route, and framed with enough clarity that researchers and operators know what to expect."
        highlights={[
          'Private disclosure first',
          'Concrete reproduction details help most',
          'Coordinated follow-up instead of ambiguous silence',
        ]}
        primaryAction={{ href: '#report-a-vulnerability', label: 'Report a vulnerability' }}
        compact
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Policy"
              title="Short, direct guidance is better than a dense trust page."
              description="This page should tell people how to report, what to include, and how Sonicverse handles the path after that."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
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

      <section id="report-a-vulnerability" className="section-space scroll-mt-28 pt-0">
        <Container>
          <Reveal className="section-shell">
            <SectionHeader
              eyebrow="Report form"
              title="Report a vulnerability"
              description="Share the issue, how to reproduce it, and the context we need to verify it quickly."
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
