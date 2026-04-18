'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { BrandMark } from '@/components/site/brand-mark'
import { ThemeToggle } from '@/components/site/theme-toggle'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { docsHref, mainNavItems, siteName } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateScrolled = () => {
      setScrolled(window.scrollY > 8)
      frameRef.current = null
    }

    const onScroll = () => {
      if (frameRef.current !== null) {
        return
      }

      frameRef.current = window.requestAnimationFrame(updateScrolled)
    }

    updateScrolled()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const isActivePath = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <motion.header
      className="sticky top-0 z-50"
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      initial={reduceMotion ? undefined : { y: -12, opacity: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="pt-4 sm:pt-5">
        <div
          className={cn(
            'surface-panel flex items-center justify-between gap-4 rounded-[1.5rem] px-4 py-3 sm:px-5',
            scrolled && 'border-primary/10 shadow-[0_22px_70px_rgba(15,23,42,0.12)]',
          )}
          style={{ backgroundColor: 'var(--header-bg)' }}
        >
          <Link href="/" className="flex items-center gap-3 rounded-full">
            <BrandMark className="h-9 w-auto text-primary" />
            <div className="leading-none">
              <p className="font-heading text-sm font-semibold tracking-[0.16em] uppercase">
                {siteName}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Products, OSS, hosting</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {mainNavItems.map((item) => {
              const active = isActivePath(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-full px-3 py-2 text-sm transition',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href={docsHref} className="quiet-link" target="_blank" rel="noreferrer">
              Docs
            </Link>
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link href="/products">Explore products</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/contact">Start a project</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="size-10 rounded-full p-0">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{siteName}</SheetTitle>
                  <SheetDescription>
                    Open-source products, commercial hosting, and technical consulting.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'rounded-[1.15rem] border px-4 py-3 text-sm transition',
                          isActivePath(item.href)
                            ? 'border-primary/20 bg-primary/8 text-primary'
                            : 'border-border/80 bg-card/80 text-foreground',
                        )}
                      >
                        <span className="block font-medium">{item.label}</span>
                        {item.description ? (
                          <span className="mt-1 block text-sm text-muted-foreground">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/80 pt-4">
                  <ThemeToggle />
                  <div className="flex gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/products">Products</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild size="sm">
                        <Link href="/contact">Start</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.header>
  )
}
