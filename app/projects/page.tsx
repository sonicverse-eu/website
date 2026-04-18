import type { Metadata } from 'next'

import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { pageMetadata } from '@/lib/metadata'
import { featuredProjects, projectFitSignals } from '@/lib/site-data/projects'

export const metadata: Metadata = pageMetadata(
  'Projects',
  'Selected implementation categories and project signals for Sonicverse.',
  '/projects',
)

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Projects are shown as believable implementation categories, not fictional case studies."
        description="The purpose of this page is to show where Sonicverse judgment gets applied: product surfaces, developer-facing systems, hosted deployments, and operational platforms."
        highlights={[
          'Applied product and platform work',
          'Technical credibility as part of the visible brand surface',
          'A fit model built around complexity, not volume',
        ]}
      />

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Selected categories"
              title="The work is strongest when structure matters as much as visible output."
              description="These categories show the kind of systems Sonicverse is designed to build and support."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
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
          <div className="grid gap-4 md:grid-cols-3">
            {projectFitSignals.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-[1.1rem]">{item}</CardTitle>
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
