import Link from 'next/link'

import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { navItems } from '@/lib/site-data'

import { BrandMark } from './brand-mark'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-[linear-gradient(180deg,var(--surface-1),var(--surface-2))] py-14 backdrop-blur-xl backdrop-saturate-[1.5]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />
      <Container className="space-y-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="h-8 w-auto text-primary/70" />
              <p className="font-heading text-sm font-semibold tracking-[0.12em] uppercase text-foreground/62">
                Sonicverse
              </p>
            </div>
            <h2 className="max-w-md text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-balance">
              Modern software systems, digital products, and open-source technology.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-foreground/62">
              Built with strong engineering taste, open collaboration, and a preference for systems
              that stay understandable as they grow.
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[0.04em] text-foreground/76">
              Navigation
            </p>
            <div className="grid gap-2 text-sm text-foreground/62">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-[0.04em] text-foreground/76">Contact</p>
            <div className="space-y-2 text-sm leading-7 text-foreground/62">
              <p>hello@sonicverse.eu</p>
              <p>Open collaboration, careful delivery, and long-term technical thinking.</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2 text-sm text-foreground/48 sm:flex-row sm:items-center sm:justify-between">
          <p>Open source by default. Built to be readable, maintainable, and calm.</p>
          <p>Cloudflare-ready Next.js App Router implementation.</p>
        </div>
      </Container>
    </footer>
  )
}
