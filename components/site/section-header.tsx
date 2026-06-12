import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn('max-w-3xl space-y-6', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow ? (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-primary/70" />
          <p className="signal-label">{eyebrow}</p>
        </div>
      ) : null}
      <div className="space-y-5">
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-copy">{description}</p> : null}
      </div>
    </div>
  )
}
