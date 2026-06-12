import Link from 'next/link'

import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { footerNavGroups } from '@/lib/site-data'

import { BrandMark } from './brand-mark'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-shell relative overflow-hidden border-t border-border/70 py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />
      <Container className="space-y-10">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <BrandMark className="h-8 w-auto text-primary/70" />
              <p className="font-heading text-sm font-semibold tracking-[0.08em] uppercase text-foreground/62">
                Sonicverse
              </p>
            </div>
            <h2 className="max-w-md text-3xl leading-[1.18] font-semibold tracking-normal text-balance">
              Open-source software for modern radio.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-foreground/62">
              The open broadcast stack — playout, scheduling, streaming, and station tooling, built
              by broadcasters and developers, in the open.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {footerNavGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-lg border border-border/70 bg-background/36 p-4 shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
              >
                <p className="mb-4 text-sm font-semibold tracking-[0.08em] uppercase text-foreground/72">
                  {group.title}
                </p>
                <div className="space-y-2.5">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block rounded-md border border-transparent px-3 py-3 transition hover:border-border/80 hover:bg-background/60"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-foreground/86 transition group-hover:text-foreground">
                          {item.label}
                        </span>
                        <span className="text-xs tracking-[0.14em] uppercase text-primary/58 transition group-hover:translate-x-0.5 group-hover:text-primary">
                          Go
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-[28ch] text-sm leading-6 text-foreground/58">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border/70 bg-background/42 px-5 py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/82">
                Run a station? Build for one?
              </p>
              <p className="text-sm text-foreground/58">
                Get early access and help shape the open broadcast stack as it ships.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border/80 bg-background/70 px-4 py-2 text-sm font-medium text-foreground/76 transition hover:border-primary/40 hover:text-foreground"
            >
              Get early access
            </Link>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2 text-sm text-foreground/48 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Sonicverse - MIT License</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <Link href="/security" className="transition hover:text-foreground">
              Security
            </Link>
            <Link href="/roadmap" className="transition hover:text-foreground">
              Roadmap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
