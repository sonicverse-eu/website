'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { useStableReducedMotion } from '@/lib/use-stable-reduced-motion'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  variant?: 'fade' | 'hero' | 'row' | 'line'
}

const variants = {
  fade: (y: number) => ({ opacity: 0, y }),
  hero: () => ({ opacity: 0, y: 22, filter: 'blur(8px)' }),
  row: () => ({ opacity: 0, x: -12 }),
  line: () => ({ opacity: 0, clipPath: 'inset(0 100% 0 0)' }),
}

const visibleVariants = {
  fade: { opacity: 1, y: 0 },
  hero: { opacity: 1, y: 0, filter: 'blur(0px)' },
  row: { opacity: 1, x: 0 },
  line: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
}

export function Reveal({ children, className, delay = 0, y = 18, variant = 'fade' }: RevealProps) {
  const reduceMotion = useStableReducedMotion()
  const visible = visibleVariants[variant]

  return (
    <motion.div
      className={cn(className)}
      initial={variants[variant](y)}
      animate={reduceMotion ? visible : undefined}
      whileInView={reduceMotion ? undefined : visible}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: variant === 'hero' ? 0.72 : 0.55, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      {children}
    </motion.div>
  )
}
