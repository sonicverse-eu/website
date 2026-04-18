import Link from 'next/link'

import { BrandMark } from '@/components/site/brand-mark'
import { Container } from '@/components/ui/container'
import { docsHref, footerNavGroups } from '@/lib/site-data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 pt-12 pb-10 sm:pt-16">
      <Container>
        <div className="surface-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <BrandMark className="h-9 w-auto text-primary" />
                <div>
                  <p className="font-heading text-sm font-semibold tracking-[0.16em] uppercase">
                    Sonicverse
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Open-source products, hosted systems, and technical consulting.
                  </p>
                </div>
              </div>
              <h2 className="max-w-xl text-[2rem] leading-[1.04] font-semibold tracking-[-0.05em] text-balance">
                A software company built around readable products, public signals, and calm
                technical confidence.
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <Link href="/contact" className="quiet-link">
                  Start a project
                </Link>
                <Link href="/products" className="quiet-link">
                  Explore products
                </Link>
                <Link href={docsHref} className="quiet-link" target="_blank" rel="noreferrer">
                  Docs
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {footerNavGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[1.5rem] border border-border/80 bg-card/70 p-4"
                >
                  <p className="panel-label mb-4">{group.title}</p>
                  <div className="space-y-3">
                    {group.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-[1.1rem] px-3 py-3 transition hover:bg-secondary"
                      >
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-border/80 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Sonicverse. Built in public where it helps software get better.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/security" className="quiet-link">
                Security
              </Link>
              <Link href="/roadmap" className="quiet-link">
                Roadmap
              </Link>
              <Link href="/changelog" className="quiet-link">
                Changelog
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
