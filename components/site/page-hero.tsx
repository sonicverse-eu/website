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

type BaseHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  className?: string;
  compact?: boolean;
};

type SingleHeroProps = BaseHeroProps & {
  layout?: "single";
  visual?: never;
};

type SplitHeroProps = BaseHeroProps & {
  layout: "split";
  // Visual-only slot for illustration, icons, or UI shapes. Avoid prose here.
  visual: ReactNode;
};

type PageHeroProps = SingleHeroProps | SplitHeroProps;

export function PageHero({
  eyebrow,
  title,
  description,
  highlights,
  primaryAction,
  secondaryAction,
  layout = "single",
  visual,
  className,
  compact = false,
}: PageHeroProps) {
  const isSplit = layout === "split";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-32 pb-[4.5rem] sm:pt-36 sm:pb-[5.5rem] lg:pt-40 lg:pb-24",
        compact && "pb-16 sm:pb-20",
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
        <div
          className={cn(
            isSplit
              ? "grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_30rem] lg:gap-12"
              : "max-w-5xl",
          )}
        >
          <Reveal className={cn("space-y-6", isSplit && "lg:pb-3")}>
            <Badge>{eyebrow}</Badge>
            <div className="space-y-4 sm:space-y-5">
              <h1 className={cn("hero-title", isSplit ? "max-w-3xl" : "max-w-5xl")}>
                {title}
              </h1>
              <p className={cn("copy-lg", isSplit ? "max-w-2xl" : "max-w-3xl")}>
                {description}
              </p>
            </div>
            {highlights?.length ? (
              <div
                className={cn(
                  "grid gap-3 sm:grid-cols-2",
                  isSplit ? "sm:max-w-xl" : "sm:max-w-3xl",
                )}
              >
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
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryAction ? (
                  <Button asChild size="lg" variant={primaryAction.variant ?? "default"}>
                    <Link href={primaryAction.href}>{primaryAction.label}</Link>
                  </Button>
                ) : null}
                {secondaryAction ? (
                  <Button
                    asChild
                    size="lg"
                    variant={secondaryAction.variant ?? "outline"}
                  >
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  </Button>
                ) : null}
              </div>
            )}
          </Reveal>
          {isSplit ? (
            <Reveal delay={0.08} className="self-stretch">
              <div className="hero-visual-shell relative h-full min-h-[320px] overflow-hidden rounded-[2.2rem] p-4 sm:min-h-[360px] sm:p-5 lg:min-h-[400px]">
                <BorderBeam />
                <div className="relative h-full">{visual}</div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
