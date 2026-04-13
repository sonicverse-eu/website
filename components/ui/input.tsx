import * as React from 'react'

import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-12 w-full rounded-2xl border border-border/80 bg-background/70 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] outline-none backdrop-blur-md backdrop-saturate-[1.4] transition placeholder:text-foreground/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
