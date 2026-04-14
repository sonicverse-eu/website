import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ArrowUpRight } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type CalloutProps = {
  title?: string
  tone?: 'default' | 'info'
  children: ReactNode
}

export function Callout({ title, tone = 'default', children }: CalloutProps) {
  return (
    <aside
      className={cn(
        'rounded-[1.6rem] border px-5 py-5 shadow-[var(--shadow-soft)] sm:px-6',
        tone === 'info'
          ? 'border-primary/18 bg-primary/[0.08] backdrop-blur-sm backdrop-saturate-[1.4]'
          : 'border-border/70 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] backdrop-blur-xl backdrop-saturate-[1.5]',
      )}
    >
      {title ? (
        <p className="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-primary/88">
          {title}
        </p>
      ) : null}
      <div className="mt-3 space-y-4 text-sm leading-7 text-foreground/72">{children}</div>
    </aside>
  )
}

function MdxLink({ href = '#', children, className, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = href.startsWith('http')

  const content = (
    <>
      <span>{children}</span>
      {isExternal ? <ArrowUpRight className="size-3.5" /> : null}
    </>
  )

  const linkClassName = cn(
    'inline-flex items-center gap-1.5 text-primary underline decoration-primary/28 underline-offset-4 transition hover:decoration-primary',
    className,
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={linkClassName} {...props}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={linkClassName} {...props}>
      {content}
    </Link>
  )
}

function InlineCode({ className, ...props }: ComponentPropsWithoutRef<'code'>) {
  if (className?.includes('language-')) {
    return <code className={cn('font-mono text-sm text-white', className)} {...props} />
  }

  return (
    <code
      className={cn(
        'rounded-full border border-border/70 bg-background/70 px-2 py-1 font-mono text-[0.85em] text-foreground backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  )
}

function PreformattedBlock({ className, ...props }: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      className={cn(
        'overflow-x-auto rounded-[1.7rem] border border-border/70 bg-[#0b1020] px-5 py-5 text-sm leading-7 text-white shadow-[var(--shadow-strong)]',
        className,
      )}
      {...props}
    />
  )
}

function DataTable({ className, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-border/70 bg-background/58 backdrop-blur-sm backdrop-saturate-[1.3]">
      <table className={cn('min-w-full border-collapse text-left text-sm', className)} {...props} />
    </div>
  )
}

export const mdxComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'text-[2.4rem] leading-[1.2] font-medium tracking-[-0.04em] text-foreground sm:text-[2.9rem] sm:leading-[1.14]',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'pt-7 text-[1.65rem] leading-[1.22] font-medium tracking-[-0.04em] text-foreground sm:text-[1.95rem] sm:leading-[1.15]',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'pt-4 text-[1.22rem] leading-[1.22] font-medium tracking-[-0.035em] text-foreground sm:text-[1.35rem]',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'text-lg leading-[1.24] font-medium tracking-[-0.03em] text-foreground',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('text-[0.98rem] leading-8 text-foreground/72', className)} {...props} />
  ),
  a: MdxLink,
  ul: ({ className, ...props }) => (
    <ul
      className={cn('space-y-3 pl-6 text-[0.98rem] leading-8 text-foreground/72', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn('space-y-3 pl-6 text-[0.98rem] leading-8 text-foreground/72', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => <li className={cn('pl-1', className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'rounded-[1.5rem] border-l-2 border-primary/50 bg-primary/[0.05] px-5 py-4 text-[0.98rem] leading-8 text-foreground/72 italic',
        className,
      )}
      {...props}
    />
  ),
  pre: PreformattedBlock,
  code: InlineCode,
  table: DataTable,
  thead: ({ className, ...props }) => (
    <thead className={cn('bg-foreground/[0.03] text-foreground/72', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th className={cn('border-b border-border/70 px-4 py-3 font-medium', className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('border-t border-border/60 px-4 py-3 align-top text-foreground/68', className)}
      {...props}
    />
  ),
  hr: () => <Separator className="my-4 bg-border/70" />,
  Callout,
} satisfies MDXComponents
