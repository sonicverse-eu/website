import { projectHighlights } from "@/data/home";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";

export function ProjectsSection() {
  return (
    <Section id="projects" className="border-b border-border/60">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <FadeIn>
          <SectionHeading
            eyebrow="Projects"
            title="Show the workstreams that make the initiative tangible."
            description="These cards are placeholders for the programs, repositories, or product surfaces that help visitors quickly understand what exists and what is coming next."
          />
        </FadeIn>

        <div className="grid gap-5">
          {projectHighlights.map((project, index) => {
            const Icon = project.icon;
            return (
              <FadeIn key={project.title} delay={index * 0.08}>
                <Card className="rounded-[1.75rem] border-border/70 bg-gradient-to-br from-card to-card/70 py-0">
                  <CardHeader className="gap-4 border-b border-border/60 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-muted/80">
                          <Icon className="size-5 text-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="rounded-full px-3 py-1">
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-5">
                    <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                      <div className="rounded-2xl border border-border/60 bg-muted/50 px-4 py-3">
                        Ownership is explicit.
                      </div>
                      <div className="rounded-2xl border border-border/60 bg-muted/50 px-4 py-3">
                        Documentation is public.
                      </div>
                      <div className="rounded-2xl border border-border/60 bg-muted/50 px-4 py-3">
                        Adoption path is simple.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
