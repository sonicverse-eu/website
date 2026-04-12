import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-medium tracking-[0.13em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/40 bg-primary text-white backdrop-blur-sm backdrop-saturate-[1.4]",
        muted: "border-border/70 bg-background/52 text-foreground/62 backdrop-blur-sm backdrop-saturate-[1.3]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
