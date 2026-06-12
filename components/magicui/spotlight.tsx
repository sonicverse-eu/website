import { cn } from '@/lib/utils'

type SpotlightProps = {
  className?: string
}

export function Spotlight({ className }: SpotlightProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="absolute inset-0 atlas-map opacity-18 dark:opacity-35" />
      <div className="absolute top-24 left-[8%] h-px w-[30rem] rotate-[18deg] bg-primary/8" />
      <div className="absolute top-40 right-[10%] h-px w-[24rem] -rotate-[24deg] bg-foreground/6" />
      <div className="absolute top-28 right-[18%] size-1.5 border border-primary/45 bg-background" />
      <div className="absolute top-52 left-[18%] size-1.5 border border-foreground/20 bg-background" />
    </div>
  )
}
