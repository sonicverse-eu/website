import Link from "next/link";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

import { Reveal } from "./reveal";

type CTASectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Start a project",
  secondaryHref = "/open-source",
  secondaryLabel = "See our open-source stance",
}: CTASectionProps) {
  return (
    <section className="py-18 sm:py-24">
      <Container>
        <Reveal className="section-frame relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
          <BorderBeam />
          <AnimatedGridPattern
            numSquares={18}
            maxOpacity={0.12}
            duration={6}
            repeatDelay={1.2}
            className="hero-grid-mask text-foreground/12"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-5">
              <Badge>{eyebrow}</Badge>
              <h2 className="section-title max-w-3xl">
                {title}
              </h2>
              <p className="section-copy max-w-xl">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg">
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
