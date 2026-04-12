import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[linear-gradient(135deg,#4d35ef_0%,#432dd7_100%)] text-white shadow-[0_14px_40px_rgba(67,45,215,0.28)] hover:-translate-y-0.5 hover:shadow-[0_20px_54px_rgba(67,45,215,0.36)]",
        outline:
          "border-border/80 bg-background/52 text-foreground/84 backdrop-blur-md backdrop-saturate-[1.4] hover:border-primary/30 hover:bg-primary/8 hover:text-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground/68 hover:bg-background/52 hover:text-foreground hover:backdrop-blur-sm",
        secondary:
          "border-border/80 bg-secondary/70 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-sm backdrop-saturate-[1.3] hover:-translate-y-0.5 hover:border-primary/20 hover:bg-secondary",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6 text-[0.95rem]",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
