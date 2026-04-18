'use client'

import { motion, useReducedMotion } from 'motion/react'
import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const isDark = mounted && resolvedTheme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'

  return (
    <motion.button
      type="button"
      role="switch"
      aria-label="Toggle color theme"
      aria-checked={isDark}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      className={cn(
        'relative inline-flex h-10 w-[4.4rem] items-center rounded-full border border-border/90 bg-card/90 p-1 text-foreground shadow-[var(--shadow-soft)] transition-[border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60',
        className,
      )}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-1 flex size-8 items-center justify-center rounded-full bg-background text-foreground shadow-[0_10px_30px_rgba(15,23,42,0.16)]"
        animate={{ x: isDark ? 30 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0.12, ease: 'linear' }
            : { type: 'spring', stiffness: 420, damping: 30, mass: 0.78 }
        }
      >
        {isDark ? <MoonStar className="size-4" /> : <SunMedium className="size-4" />}
      </motion.span>
      <span
        className={cn(
          'absolute left-[0.72rem] top-1/2 -translate-y-1/2 text-muted-foreground transition-opacity',
          isDark && 'opacity-0',
        )}
      >
        <SunMedium className="size-3.5" />
      </span>
      <span
        className={cn(
          'absolute right-[0.72rem] top-1/2 -translate-y-1/2 text-muted-foreground transition-opacity',
          !isDark && 'opacity-0',
        )}
      >
        <MoonStar className="size-3.5" />
      </span>
      <span className="sr-only">
        {mounted
          ? `Current theme: ${isDark ? 'dark' : 'light'}. Activate to switch to ${nextTheme} mode.`
          : 'Toggle color theme'}
      </span>
    </motion.button>
  )
}
