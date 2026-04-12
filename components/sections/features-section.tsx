import { features } from "@/data/home";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";

export function FeaturesSection() {
  return (
    <Section id="features" className="border-b border-border/60">
      <FadeIn>
        <SectionHeading
          eyebrow="Why this starter works"
          title="A design foundation that feels polished before the content is even final."
          description="The structure is intentionally reusable: crisp primitives, rounded surfaces, a dark-first palette, and just enough motion to make the experience feel engineered."
        />
      </FadeIn>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <FadeIn key={feature.title} delay={index * 0.08}>
              <Card className="h-full rounded-[1.75rem] border-border/70 bg-card/80 shadow-[0_12px_50px_rgba(0,0,0,0.12)]">
                <CardHeader className="space-y-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-muted/80">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
