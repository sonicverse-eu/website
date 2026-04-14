import type { ReactNode } from 'react'

import { CalendarDays, Clock3, GitCommitHorizontal, MoveRight, Radar, Sparkles } from 'lucide-react'
import Link from 'next/link'

import type { ContentEntry, RoadmapStatus } from '@/lib/content'
import { formatContentDate } from '@/lib/content'
import { cn } from '@/lib/utils'

import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'

import { ContentHoverCard } from './content-hover-card'

export function TagList({ tags, className }: { tags?: string[]; className?: string }) {
  if (!tags?.length) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <Badge key={tag} variant="muted">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

const statusStyles: Record<RoadmapStatus, string> = {
  Exploring: 'border-[rgba(89,104,144,0.14)] bg-background/54 text-foreground/72',
  Planned: 'border-primary/18 bg-primary/[0.08] text-primary',
  'In Progress':
    'border-[rgba(71,128,255,0.18)] bg-[rgba(71,128,255,0.12)] text-[rgb(73,103,209)] dark:text-[rgb(167,189,255)]',
  Shipped:
    'border-[rgba(40,167,105,0.18)] bg-[rgba(40,167,105,0.12)] text-[rgb(27,122,78)] dark:text-[rgb(126,219,178)]',
}

export function StatusBadge({ status }: { status: RoadmapStatus }) {
  return <Badge className={statusStyles[status]}>{status}</Badge>
}

export function VersionBadge({ version }: { version: string }) {
  return <Badge className="border-primary/18 bg-primary/[0.08] text-primary">{version}</Badge>
}

type MetaItem = {
  label: string
  value: string
  icon?: ReactNode
}

export function MetaRail({ items, className }: { items: MetaItem[]; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[1.7rem] border border-border/70 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl backdrop-saturate-[1.6]',
        className,
      )}
    >
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.label}-${item.value}`} className="space-y-3">
            {index > 0 ? <Separator /> : null}
            <div className="flex items-start gap-3">
              {item.icon ? (
                <span className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/50 text-foreground/64">
                  {item.icon}
                </span>
              ) : null}
              <div className="space-y-1">
                <p className="text-[0.68rem] font-medium tracking-[0.22em] uppercase text-foreground/46">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-foreground/72">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type ContentLinkCardProps = {
  href: string
  eyebrow: string
  title: string
  description: string
  meta?: ReactNode
  badges?: ReactNode
  className?: string
}

export function ContentLinkCard({
  href,
  eyebrow,
  title,
  description,
  meta,
  badges,
  className,
}: ContentLinkCardProps) {
  return (
    <ContentHoverCard className={className}>
      <Card className="h-full transition-[border-color,background-color] duration-200 hover:border-primary/18">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <Badge variant="muted">{eyebrow}</Badge>
            {badges}
          </div>
          <div className="space-y-3">
            <CardTitle className="text-[1.5rem] leading-[1.15] sm:text-[1.6rem] sm:leading-[1.11]">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {meta ? (
            <div className="flex flex-wrap gap-3 text-sm text-foreground/58">{meta}</div>
          ) : null}
        </CardHeader>
        <CardContent className="flex items-center justify-between pt-0">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/72 transition hover:text-foreground"
          >
            Open entry
            <MoveRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </ContentHoverCard>
  )
}

type ContentPageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  kicker?: ReactNode
  showGridPattern?: boolean
}

export function ContentPageHeader({
  eyebrow,
  title,
  description,
  kicker,
  showGridPattern = false,
}: ContentPageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-12 sm:pt-40 sm:pb-16">
      {showGridPattern ? (
        <>
          <AnimatedGridPattern
            numSquares={24}
            maxOpacity={0.14}
            duration={5.5}
            repeatDelay={1}
            className="hero-grid-mask absolute inset-0 text-foreground/10"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </>
      ) : null}
      <Container className="relative space-y-8">
        <Reveal className="space-y-6">
          <Badge>{eyebrow}</Badge>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="space-y-5">
              <h1 className="hero-title max-w-5xl text-[2.6rem] sm:text-[3.8rem] lg:text-[4.45rem]">
                {title}
              </h1>
              <p className="copy-lg max-w-2xl">{description}</p>
            </div>
            {kicker ? <div>{kicker}</div> : null}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

type ContentArticleShellProps = {
  eyebrow: string
  title: string
  description: string
  meta: MetaItem[]
  badges?: ReactNode
  tags?: string[]
  children: ReactNode
}

export function ContentArticleShell({
  eyebrow,
  title,
  description,
  meta,
  badges,
  tags,
  children,
}: ContentArticleShellProps) {
  return (
    <>
      <ContentPageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        kicker={
          <div className="rounded-[1.7rem] border border-border/70 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl backdrop-saturate-[1.6]">
            <div className="space-y-3">
              <p className="text-[0.7rem] font-medium tracking-[0.24em] uppercase text-foreground/44">
                Entry signal
              </p>
              <div className="flex flex-wrap gap-2">{badges}</div>
              <TagList tags={tags} />
            </div>
          </div>
        }
      />
      <section className="pb-24 sm:pb-28">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <Reveal>
            <article className="rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] px-6 py-7 shadow-[var(--shadow-soft)] backdrop-blur-xl backdrop-saturate-[1.6] sm:px-8 sm:py-9">
              <div className="space-y-6">{children}</div>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <MetaRail items={meta} className="lg:sticky lg:top-28" />
          </Reveal>
        </Container>
      </section>
    </>
  )
}

export function TimelineEntry({ entry }: { entry: ContentEntry<'changelog'> }) {
  return (
    <Reveal>
      <div className="grid gap-4 lg:grid-cols-[170px_minmax(0,1fr)]">
        <div className="pt-5">
          <p className="text-[0.74rem] font-medium tracking-[0.18em] uppercase text-foreground/46">
            {formatContentDate(entry.frontmatter.publishedAt)}
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-border/70 lg:block" />
          <div className="absolute -left-[5px] top-7 hidden size-3 rounded-full border border-primary/30 bg-primary/90 lg:block" />
          <div className="lg:pl-8">
            <ContentLinkCard
              href={entry.href}
              eyebrow="Release"
              title={entry.frontmatter.title}
              description={entry.frontmatter.description}
              badges={<VersionBadge version={entry.frontmatter.version} />}
              meta={
                <>
                  <MetaInline icon={<GitCommitHorizontal className="size-4" />}>
                    {entry.frontmatter.version}
                  </MetaInline>
                  <MetaInline icon={<CalendarDays className="size-4" />}>
                    {formatContentDate(entry.frontmatter.publishedAt)}
                  </MetaInline>
                </>
              }
            />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function MetaInline({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      {icon ? <span className="text-foreground/42">{icon}</span> : null}
      <span>{children}</span>
    </span>
  )
}

type SignalsSectionProps = {
  featuredBlog: ContentEntry<'blog'> | null
  recentBlog: ContentEntry<'blog'>[]
  recentChangelog: ContentEntry<'changelog'>[]
  recentRoadmap: ContentEntry<'roadmap'>[]
}

export function SignalsSection({
  featuredBlog,
  recentBlog,
  recentChangelog,
  recentRoadmap,
}: SignalsSectionProps) {
  return (
    <section className="section-space">
      <Container className="space-y-10">
        <Reveal>
          <div className="space-y-5">
            <Badge variant="muted">Signals</Badge>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <div className="space-y-4">
                <h2 className="section-title">
                  A cleaner communication layer for product and platform work.
                </h2>
                <p className="section-copy">
                  Recent thinking, shipped releases, and the direction of travel, presented like
                  product signals instead of generic editorial blocks.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-border/70 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-xl backdrop-saturate-[1.5]">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 size-4 text-primary" />
                  <p className="text-sm leading-7 text-foreground/68">
                    Blog explains the system. Changelog shows movement. Roadmap frames what is
                    becoming real next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-3">
          <Reveal>
            <SignalColumn
              title="Blog"
              description="Technical notes and system-level thinking."
              href="/blog"
              icon={<Sparkles className="size-4" />}
            >
              {featuredBlog ? (
                <div className="rounded-[1.5rem] border border-primary/18 bg-primary/[0.1] p-5 backdrop-blur-sm">
                  <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-primary/88">
                    Featured
                  </p>
                  <Link href={featuredBlog.href} className="mt-3 block space-y-3">
                    <h3 className="text-[1.35rem] leading-[1.16] font-medium tracking-[-0.05em] text-foreground">
                      {featuredBlog.frontmatter.title}
                    </h3>
                    <p className="text-sm leading-7 text-foreground/68">
                      {featuredBlog.frontmatter.description}
                    </p>
                  </Link>
                </div>
              ) : null}
              <div className="space-y-3">
                {recentBlog.map((entry) => (
                  <SignalLink
                    key={entry.slug}
                    href={entry.href}
                    title={entry.frontmatter.title}
                    meta={`${formatContentDate(entry.frontmatter.publishedAt)} · ${entry.readingTimeMinutes} min read`}
                  />
                ))}
              </div>
            </SignalColumn>
          </Reveal>

          <Reveal delay={0.05}>
            <SignalColumn
              title="Changelog"
              description="Recent releases and product movement."
              href="/changelog"
              icon={<GitCommitHorizontal className="size-4" />}
            >
              <div className="space-y-3">
                {recentChangelog.map((entry) => (
                  <SignalLink
                    key={entry.slug}
                    href={entry.href}
                    title={entry.frontmatter.title}
                    meta={`${entry.frontmatter.version} · ${formatContentDate(entry.frontmatter.publishedAt)}`}
                    trailing={<VersionBadge version={entry.frontmatter.version} />}
                  />
                ))}
              </div>
            </SignalColumn>
          </Reveal>

          <Reveal delay={0.1}>
            <SignalColumn
              title="Roadmap"
              description="Initiatives in motion and the shape of what is next."
              href="/roadmap"
              icon={<Radar className="size-4" />}
            >
              <div className="space-y-3">
                {recentRoadmap.map((entry) => (
                  <SignalLink
                    key={entry.slug}
                    href={entry.href}
                    title={entry.frontmatter.title}
                    meta={formatContentDate(
                      entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt,
                    )}
                    trailing={<StatusBadge status={entry.frontmatter.status} />}
                  />
                ))}
              </div>
            </SignalColumn>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function SignalColumn({
  title,
  description,
  href,
  icon,
  children,
}: {
  title: string
  description: string
  href: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground/72">
            <span className="flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/44 text-primary">
              {icon}
            </span>
            {title}
          </div>
          <Link href={href} className="text-sm text-foreground/54 transition hover:text-foreground">
            View all
          </Link>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

function SignalLink({
  href,
  title,
  meta,
  trailing,
}: {
  href: string
  title: string
  meta: string
  trailing?: ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-start justify-between gap-4 rounded-[1.35rem] border border-border/60 bg-background/58 px-4 py-4 backdrop-blur-sm backdrop-saturate-[1.4] transition hover:border-primary/18 hover:bg-primary/[0.06]"
    >
      <div className="space-y-1.5">
        <p className="text-[1rem] leading-7 font-medium tracking-[-0.03em] text-foreground">
          {title}
        </p>
        <p className="text-sm text-foreground/54">{meta}</p>
      </div>
      {trailing}
    </Link>
  )
}

export function buildArticleMeta(options: {
  publishedAt: string
  readingTimeMinutes?: number
  version?: string
  status?: RoadmapStatus
  updatedAt?: string
}) {
  const items: MetaItem[] = [
    {
      label: 'Published',
      value: formatContentDate(options.publishedAt),
      icon: <CalendarDays className="size-4" />,
    },
  ]

  if (options.updatedAt) {
    items.push({
      label: 'Updated',
      value: formatContentDate(options.updatedAt),
      icon: <CalendarDays className="size-4" />,
    })
  }

  if (options.readingTimeMinutes) {
    items.push({
      label: 'Reading time',
      value: `${options.readingTimeMinutes} min`,
      icon: <Clock3 className="size-4" />,
    })
  }

  if (options.version) {
    items.push({
      label: 'Version',
      value: options.version,
      icon: <GitCommitHorizontal className="size-4" />,
    })
  }

  if (options.status) {
    items.push({
      label: 'Status',
      value: options.status,
      icon: <Radar className="size-4" />,
    })
  }

  return items
}
