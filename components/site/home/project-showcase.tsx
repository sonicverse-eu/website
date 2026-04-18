import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { featuredProjects } from '@/lib/site-data/projects'

import { Reveal } from '../reveal'
import { SectionHeader } from '../section-header'

export function ProjectShowcase() {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            title="Selected implementation categories that make Sonicverse believable."
            description="The site should show where the design judgment and technical judgment actually get applied."
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
        <Reveal>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">See project categories</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
