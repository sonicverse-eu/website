import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] duration-200 outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-primary text-primary-foreground shadow-[0_16px_44px_rgba(37,99,235,0.22)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--primary)_88%,black)]',
        outline:
          'border-border/90 bg-card/78 text-foreground hover:-translate-y-0.5 hover:border-primary/22 hover:bg-primary/6',
        ghost:
          'border border-transparent bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
        secondary:
          'border-border/90 bg-secondary text-foreground hover:-translate-y-0.5 hover:border-primary/18 hover:bg-card',
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
