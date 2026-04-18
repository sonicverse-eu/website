import Link from 'next/link'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

import { Reveal } from './reveal'

type HeroAction = {
  href: string
  label: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
}

type PageHeroProps = {
  layout?: 'single' | 'split'
  eyebrow: string
  title: string
  description: string
  highlights?: string[]
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  kicker?: ReactNode
  visual?: ReactNode
  className?: string
  compact?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  highlights,
  primaryAction,
  secondaryAction,
  kicker,
  visual,
  className,
  compact = false,
}: PageHeroProps) {
  const sidePanel = visual ?? kicker

  return (
    <section
      className={cn(
        'relative overflow-hidden pt-18 pb-8 sm:pt-24 sm:pb-12 lg:pt-28',
        compact && 'pb-4 sm:pb-8',
        className,
      )}
    >
      <Container className="relative">
        <div
          className={cn(
            'grid gap-8 lg:items-end',
            sidePanel ? 'lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.68fr)]' : 'max-w-4xl',
          )}
        >
          <Reveal className="space-y-6">
            <Badge>{eyebrow}</Badge>
            <div className="space-y-5">
              <h1 className="page-title">{title}</h1>
              <p className="copy-lg max-w-2xl">{description}</p>
            </div>
            {highlights?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.15rem] border border-border/80 bg-card/78 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryAction ? (
                  <Button asChild size="lg" variant={primaryAction.variant ?? 'default'}>
                    <Link href={primaryAction.href}>{primaryAction.label}</Link>
                  </Button>
                ) : null}
                {secondaryAction ? (
                  <Button asChild size="lg" variant={secondaryAction.variant ?? 'outline'}>
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  </Button>
                ) : null}
              </div>
            )}
          </Reveal>
          {sidePanel ? (
            <Reveal delay={0.06} className="hero-kicker">
              {sidePanel}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
