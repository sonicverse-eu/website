'use client'

import { useReducedMotion } from 'framer-motion'
import { useSyncExternalStore } from 'react'

export function useStableReducedMotion() {
  const shouldReduce = useReducedMotion()
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  return mounted && shouldReduce
}
