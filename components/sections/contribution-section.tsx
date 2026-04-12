import { contributionTracks } from "@/data/home";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";

export function ContributionSection() {
  return (
    <Section id="contribute" className="border-b border-border/60">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
        <div className="grid gap-5">
          {contributionTracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <FadeIn key={track.title} delay={index * 0.08}>
                <Card className="rounded-[1.75rem] border-border/70 bg-card/80">
                  <CardHeader className="gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-muted/80">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <CardTitle className="text-lg">{track.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 text-muted-foreground">
                      {track.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.12}>
          <div className="sticky top-28 rounded-[2rem] border border-border/70 bg-gradient-to-b from-muted/70 to-card p-7 shadow-[0_16px_60px_rgba(0,0,0,0.12)]">
            <SectionHeading
              eyebrow="Contribution"
              title="Give people a straightforward way to get involved."
              description="This starter includes the right structure for contribution paths, contributor docs, and calls to action without turning the page into a cluttered marketing template."
            />
            <div className="mt-8 space-y-3 text-sm leading-7 text-muted-foreground">
              <p>Replace this panel with your real onboarding sequence.</p>
              <p>
                Good next additions: issue labels, governance notes, sponsor
                tiers, maintainer expectations, and public milestones.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-full">Open contribution guide</Button>
              <Button variant="outline" className="rounded-full">
                See roadmap issues
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
