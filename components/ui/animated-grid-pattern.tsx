'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

type Square = {
  id: number
  pos: [number, number]
  iteration: number
}

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<'svg'> {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: number
  numSquares?: number
  maxOpacity?: number
  duration?: number
  repeatDelay?: number
}

export function AnimatedGridPattern({
  width = 44,
  height = 44,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 32,
  className,
  maxOpacity = 0.22,
  duration = 5,
  repeatDelay = 0.8,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState<Array<Square>>([])

  const generateSquaresForDimensions = useCallback(
    (count: number, containerWidth: number, containerHeight: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: [
          Math.floor((Math.random() * containerWidth) / width),
          Math.floor((Math.random() * containerHeight) / height),
        ] as [number, number],
        iteration: 0,
      })),
    [height, width],
  )

  const getPos = useCallback(
    (): [number, number] => [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ],
    [dimensions.height, dimensions.width, height, width],
  )

  const updateSquarePosition = useCallback(
    (squareId: number) => {
      setSquares((currentSquares) => {
        const current = currentSquares[squareId]
        if (!current || current.id !== squareId) {
          return currentSquares
        }

        const nextSquares = currentSquares.slice()
        nextSquares[squareId] = {
          ...current,
          pos: getPos(),
          iteration: current.iteration + 1,
        }

        return nextSquares
      })
    },
    [getPos],
  )

  useEffect(() => {
    const element = containerRef.current
    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions((currentDimensions) => {
          const nextWidth = entry.contentRect.width
          const nextHeight = entry.contentRect.height

          if (currentDimensions.width === nextWidth && currentDimensions.height === nextHeight) {
            return currentDimensions
          }

          setSquares(generateSquaresForDimensions(numSquares, nextWidth, nextHeight))
          return { width: nextWidth, height: nextHeight }
        })
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [generateSquaresForDimensions, numSquares])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-current stroke-current',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [squareX, squareY], id, iteration }, index) => (
          <motion.rect
            key={`${id}-${iteration}`}
            width={width - 1}
            height={height - 1}
            x={squareX * width + 1}
            y={squareY * height + 1}
            fill="currentColor"
            strokeWidth="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.12,
              repeatType: 'reverse',
              repeatDelay,
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
          />
        ))}
      </svg>
    </svg>
  )
}
