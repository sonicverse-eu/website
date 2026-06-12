import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 font-mono text-[0.66rem] font-medium tracking-[0.18em] uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/50 bg-primary/12 text-primary',
        muted: 'border-border/80 bg-background/38 text-foreground/62',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
