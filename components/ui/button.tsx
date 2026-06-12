import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground shadow-[0_10px_24px_color-mix(in_srgb,var(--on-air)_16%,transparent)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--on-air)_90%,black)] hover:shadow-[0_14px_34px_color-mix(in_srgb,var(--on-air)_22%,transparent)]',
        outline:
          'border-border/95 bg-background text-foreground/84 shadow-[0_1px_0_rgba(255,255,255,0.8)] hover:-translate-y-px hover:border-primary/50 hover:bg-primary/[0.04] hover:text-foreground',
        ghost:
          'border-transparent bg-transparent text-foreground/68 hover:bg-foreground/[0.06] hover:text-foreground',
        secondary:
          'border-border/80 bg-secondary/70 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] hover:-translate-y-px hover:border-primary/35 hover:bg-secondary',
      },
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-[0.95rem]',
        sm: 'h-9 px-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
