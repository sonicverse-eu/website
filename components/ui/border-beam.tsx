'use client'

import { motion, useReducedMotion } from 'motion/react'

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
        className="absolute top-0 left-[-35%] h-px w-1/2 bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.92),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.92),transparent)]"
        animate={{ x: ['0%', '220%'] }}
        transition={{ duration: 6, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}
