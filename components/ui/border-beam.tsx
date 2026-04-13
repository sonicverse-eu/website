'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type BorderBeamProps = {
  className?: string
}

export function BorderBeam({ className }: BorderBeamProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]',
        className,
      )}
    >
      <motion.div
        className="absolute top-0 left-[-35%] h-px w-1/2 bg-[linear-gradient(90deg,transparent,rgba(67,45,215,0.95),transparent)]"
        animate={{ x: ['0%', '220%'] }}
        transition={{ duration: 6, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}
