import Link from "next/link";
import type { ReactNode } from "react";

import { Spotlight } from "@/components/magicui/spotlight";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

type HeroAction = {
  href: string;
  label: string;
  variant?: "default" | "outline";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  highlights,
  primaryAction,
  secondaryAction,
  children,
  className,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24",
        compact && "pb-18 sm:pb-20",
        className,
      )}
    >
      <Spotlight />
      <AnimatedGridPattern
        numSquares={32}
        maxOpacity={0.16}
        duration={5}
        repeatDelay={1}
        className="hero-grid-mask absolute inset-0 text-foreground/10"
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background" />
      <Container className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <Reveal className="space-y-7">
            <Badge>{eyebrow}</Badge>
            <div className="space-y-5">
              <h1 className="hero-title max-w-4xl">{title}</h1>
              <p className="copy-lg">{description}</p>
            </div>
            {highlights?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-border/60 bg-background/38 px-4 py-3 text-sm text-foreground/66"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {primaryAction ? (
                  <Button asChild size="lg">
                    <Link href={primaryAction.href}>{primaryAction.label}</Link>
                  </Button>
                ) : null}
                {secondaryAction ? (
                  <Button asChild size="lg" variant="outline">
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  </Button>
                ) : null}
              </div>
            )}
          </Reveal>
          {children ? (
            <Reveal delay={0.08}>
              <div className="section-frame relative overflow-hidden rounded-[2.1rem] p-6 sm:p-7">
                <BorderBeam />
                {children}
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
