'use client'

import { motion } from 'framer-motion'
import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { useStableReducedMotion } from '@/lib/use-stable-reduced-motion'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const reduceMotion = useStableReducedMotion()
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const isDark = mounted && resolvedTheme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'
  const transition = reduceMotion
    ? { duration: 0.14, ease: 'linear' as const }
    : { type: 'spring' as const, stiffness: 420, damping: 30, mass: 0.78 }

  return (
    <motion.button
      type="button"
      role="switch"
      aria-label="Toggle color theme"
      aria-checked={isDark}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      className={cn(
        'relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-md border border-border bg-background p-1 text-foreground/70 shadow-[0_1px_0_rgba(255,255,255,0.8)] transition-[border-color,background-color,box-shadow,color] duration-300 hover:border-primary/35 focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35 dark:bg-background/70 dark:shadow-[0_12px_28px_rgba(0,0,0,0.2)]',
        className,
      )}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[3px] rounded-sm bg-secondary/60 dark:bg-secondary/50"
      />

      <motion.span
        aria-hidden="true"
        className="absolute top-1 left-1 z-10 flex size-7 items-center justify-center rounded-sm bg-background text-primary shadow-[0_8px_18px_rgba(15,18,22,0.12)] dark:bg-card dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
        animate={{
          x: mounted ? (isDark ? 31 : 0) : 0,
        }}
        transition={transition}
      >
        <motion.span
          animate={{
            rotate: mounted && isDark ? -18 : 0,
            scale: mounted ? 1 : 0.94,
          }}
          transition={
            reduceMotion
              ? { duration: 0.12, ease: 'linear' }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
          className="relative flex size-4 items-center justify-center"
        >
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: mounted && isDark ? 0 : 1,
              scale: mounted && isDark ? 0.72 : 1,
              rotate: mounted && isDark ? -40 : 0,
            }}
            transition={
              reduceMotion
                ? { duration: 0.1, ease: 'linear' }
                : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <SunMedium className="size-4" />
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: mounted && isDark ? 1 : 0,
              scale: mounted && isDark ? 1 : 0.72,
              rotate: mounted && isDark ? 0 : 40,
            }}
            transition={
              reduceMotion
                ? { duration: 0.1, ease: 'linear' }
                : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <MoonStar className="size-4" />
          </motion.span>
        </motion.span>
      </motion.span>

      <motion.span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute top-1/2 flex size-4 -translate-y-1/2 items-center justify-center transition-[left,right,opacity,transform,color] duration-200',
          isDark ? 'left-[0.64rem] text-foreground/50' : 'right-[0.64rem] text-foreground/50',
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: isDark ? 0.96 : 1,
                rotate: isDark ? -10 : 10,
              }
        }
      >
        {isDark ? (
          <SunMedium className="size-3.5" strokeWidth={2.1} />
        ) : (
          <MoonStar className="size-3.5" strokeWidth={2.1} />
        )}
      </motion.span>

      <span className="sr-only">
        {mounted
          ? `Current theme: ${isDark ? 'dark' : 'light'}. Activate to switch to ${nextTheme} mode.`
          : 'Toggle color theme'}
      </span>
    </motion.button>
  )
}
