import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[1.9rem] border border-border/70 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] shadow-[var(--shadow-soft)] backdrop-blur-xl backdrop-saturate-[1.6]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3 p-6 sm:p-8", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-[1.75rem] leading-[1.08] font-medium tracking-[-0.025em] text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("text-sm leading-7 text-foreground/68", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0 sm:px-8 sm:pb-8", className)} {...props} />;
}
