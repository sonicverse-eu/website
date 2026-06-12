'use client'

import { motion } from 'framer-motion'
import { Radio, CalendarClock, Play, Podcast, Activity, Archive } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useStableReducedMotion } from '@/lib/use-stable-reduced-motion'
import { cn } from '@/lib/utils'

const modules = [
  {
    id: 'ingest',
    label: 'Ingest',
    detail: 'Live inputs',
    icon: Radio,
    column: 'sources',
    x: 16,
    y: 28,
  },
  {
    id: 'scheduler',
    label: 'Scheduler',
    detail: 'Clocks & rules',
    icon: CalendarClock,
    column: 'core',
    x: 48,
    y: 24,
  },
  {
    id: 'playout',
    label: 'Playout',
    detail: 'Automation',
    icon: Play,
    column: 'core',
    x: 48,
    y: 50,
  },
  {
    id: 'stream',
    label: 'Stream',
    detail: 'RTP / HLS',
    icon: Podcast,
    column: 'delivery',
    x: 80,
    y: 34,
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    detail: 'Logs & alerts',
    icon: Activity,
    column: 'operations',
    x: 80,
    y: 62,
  },
  {
    id: 'archive',
    label: 'Archive',
    detail: 'Recordings',
    icon: Archive,
    column: 'operations',
    x: 48,
    y: 76,
  },
] as const

const connections = [
  { from: 'ingest', to: 'scheduler', path: 'M92 122 C158 122 168 103 236 103' },
  { from: 'ingest', to: 'playout', path: 'M92 122 C166 122 162 206 236 206' },
  { from: 'scheduler', to: 'stream', path: 'M312 103 C392 103 392 146 456 146' },
  { from: 'playout', to: 'stream', path: 'M312 206 C380 206 392 146 456 146' },
  { from: 'playout', to: 'monitoring', path: 'M312 206 C392 206 392 266 456 266' },
  { from: 'playout', to: 'archive', path: 'M272 230 C272 260 272 298 272 316' },
] as const

const columnLabels = [
  { label: 'Sources', x: 16, y: 8 },
  { label: 'Core', x: 48, y: 8 },
  { label: 'Delivery', x: 80, y: 8 },
  { label: 'Operations', x: 80, y: 54 },
] as const

type ModuleId = (typeof modules)[number]['id']

type SignalFlowProps = {
  className?: string
  compact?: boolean
}

export function SignalFlow({ className, compact = false }: SignalFlowProps) {
  const reduceMotion = useStableReducedMotion()
  const [activeId, setActiveId] = useState<ModuleId>('playout')

  const activeConnections = useMemo(
    () =>
      connections.filter(
        (connection) => connection.from === activeId || connection.to === activeId,
      ),
    [activeId],
  )

  const isConnected = (moduleId: ModuleId) =>
    moduleId === activeId ||
    activeConnections.some(
      (connection) => connection.from === moduleId || connection.to === moduleId,
    )

  return (
    <div
      className={cn(
        'group/signal relative isolate overflow-hidden rounded-md border border-border bg-card text-foreground shadow-[var(--shadow-soft)]',
        compact ? 'min-h-[22rem]' : 'min-h-[28rem]',
        className,
      )}
    >
      <div className="quiet-grid absolute inset-0 opacity-55 dark:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,rgba(181,31,46,0.08),transparent_18rem)] dark:bg-[radial-gradient(circle_at_52%_45%,rgba(181,31,46,0.12),transparent_18rem)]" />

      <div className="relative flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="size-1.5 bg-primary" />
          <p className="font-mono text-[0.66rem] font-medium tracking-[0.18em] text-foreground/58 uppercase">
            System overview
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] text-primary uppercase">
          <span className="h-px w-8 bg-primary/60" />
          Live
        </div>
      </div>

      <div className="relative h-[22rem] sm:h-[25rem]">
        <svg
          aria-hidden="true"
          viewBox="0 0 560 400"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <g fill="none" stroke="currentColor" className="text-foreground/12">
            {connections.map((connection) => (
              <path key={`${connection.from}-${connection.to}-base`} d={connection.path} />
            ))}
          </g>
          <g fill="none" stroke="var(--on-air)" strokeLinecap="square">
            {activeConnections.map((connection, index) => (
              <motion.path
                key={`${connection.from}-${connection.to}-active`}
                d={connection.path}
                strokeWidth="2"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
                animate={
                  reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.72,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              />
            ))}
          </g>
        </svg>

        {columnLabels.map((column) => (
          <span
            key={`${column.label}-${column.x}`}
            className="absolute -translate-x-1/2 font-mono text-[0.62rem] tracking-[0.18em] text-foreground/38 uppercase"
            style={{ left: `${column.x}%`, top: `${column.y}%` }}
          >
            {column.label}
          </span>
        ))}

        {modules.map((module) => {
          const Icon = module.icon
          const active = module.id === activeId
          const connected = isConnected(module.id)

          return (
            <button
              key={module.id}
              type="button"
              onPointerEnter={() => setActiveId(module.id)}
              onFocus={() => setActiveId(module.id)}
              className={cn(
                'absolute grid w-[9rem] -translate-x-1/2 -translate-y-1/2 grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-md border bg-background/92 px-3 py-3 text-left shadow-[0_10px_28px_rgba(15,18,22,0.06)] transition duration-200 dark:bg-background/86 dark:shadow-[0_16px_34px_rgba(0,0,0,0.28)]',
                active
                  ? 'border-primary text-foreground shadow-[0_18px_44px_rgba(181,31,46,0.16)]'
                  : connected
                    ? 'border-primary/30 text-foreground'
                    : 'border-border text-foreground/70 hover:border-foreground/28 hover:text-foreground',
              )}
              style={{ left: `${module.x}%`, top: `${module.y}%` }}
              aria-pressed={active}
            >
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-sm border transition',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground/62',
                )}
              >
                <Icon className="size-4" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{module.label}</span>
                <span className="mt-0.5 block text-[0.68rem] leading-4 text-foreground/52">
                  {module.detail}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative grid grid-cols-3 border-t border-border bg-background/74">
        {['Route 01', activeId, 'Observable'].map((item, index) => (
          <div
            key={item}
            className="border-r border-border px-5 py-3 font-mono text-[0.66rem] tracking-[0.14em] text-foreground/58 uppercase last:border-r-0"
          >
            {index === 1 ? <span className="text-primary">{item}</span> : item}
          </div>
        ))}
      </div>
    </div>
  )
}
