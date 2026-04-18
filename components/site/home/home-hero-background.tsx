'use client'

import { motion, useReducedMotion } from 'motion/react'

export function HomeHeroBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <div className="site-grid absolute inset-0 opacity-40 dark:opacity-25" />
      <motion.div
        className="absolute -left-16 top-6 h-44 w-44 rounded-full bg-primary/16 blur-3xl dark:bg-primary/20"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 18, -10, 0],
                y: [0, 14, 6, 0],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-10 top-10 h-36 w-36 rounded-full bg-cyan-400/14 blur-3xl dark:bg-cyan-300/18"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -16, 10, 0],
                y: [0, 20, -8, 0],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-28 w-56 rounded-full bg-primary/10 blur-3xl dark:bg-primary/12"
        animate={reduceMotion ? undefined : { x: [0, 20, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent opacity-70" />
    </div>
  )
}
