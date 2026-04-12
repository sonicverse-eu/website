import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: ComponentPropsWithoutRef<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("relative py-20 sm:py-24", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "mx-auto max-w-3xl items-center text-center",
      )}
    >
      {eyebrow ? (
        <Badge
          variant="outline"
          className="w-fit rounded-full border-border/70 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground backdrop-blur"
        >
          {eyebrow}
        </Badge>
      ) : null}
      <div className={cn("space-y-3", centered && "items-center")}>
        <h2 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
