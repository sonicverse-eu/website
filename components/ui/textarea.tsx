import * as React from 'react'

import { cn } from '@/lib/utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-32 w-full rounded-[1.4rem] border border-border/80 bg-background/70 px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] outline-none transition placeholder:text-foreground/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
