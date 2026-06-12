'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Container } from '@/components/ui/container'
import { useStableReducedMotion } from '@/lib/use-stable-reduced-motion'
import { cn } from '@/lib/utils'
import { navItems, siteName } from '@/lib/site-data'

import { BrandMark } from './brand-mark'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const pathname = usePathname()
  const reduceMotion = useStableReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollYRef = useRef(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const TOP_OFFSET = 18
    const HIDE_OFFSET = 96
    const DIRECTION_THRESHOLD = 10

    const updateHeader = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current
      const delta = currentScrollY - previousScrollY
      const nearTop = currentScrollY <= TOP_OFFSET

      const shouldShowScrolledState = !nearTop
      setScrolled((current) =>
        current !== shouldShowScrolledState ? shouldShowScrolledState : current,
      )

      if (menuOpen || nearTop) {
        setHidden(false)
        lastScrollYRef.current = currentScrollY
        frameRef.current = null
        return
      }

      if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        const shouldHide = delta > 0 && currentScrollY > HIDE_OFFSET
        setHidden((current) => (current !== shouldHide ? shouldHide : current))
        lastScrollYRef.current = currentScrollY
      }

      frameRef.current = null
    }

    const onScroll = () => {
      if (frameRef.current !== null) {
        return
      }

      frameRef.current = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [menuOpen])

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      {/*
        Blur layer lives here — outside motion.header — so it has no transformed
        ancestor. backdrop-filter only works when the element itself (or a
        non-transformed fixed ancestor) paints directly over the viewport.
      */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-[49] h-[5.25rem] border-b border-border/70',
          scrolled && !hidden ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          backdropFilter: 'blur(16px) saturate(1.08)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.08)',
          background: 'linear-gradient(180deg, var(--header-bg-from), var(--header-bg-to))',
        }}
      />

      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        initial={{ y: -24, opacity: 0 }}
        animate={
          reduceMotion
            ? { y: 0, opacity: 1 }
            : hidden
              ? { y: '-120%', opacity: 0 }
              : { y: 0, opacity: 1 }
        }
        transition={
          reduceMotion
            ? { duration: 0.15 }
            : hidden
              ? { duration: 0.22, ease: [0.4, 0, 1, 1] }
              : {
                  y: { type: 'spring', stiffness: 380, damping: 28, mass: 0.7 },
                  opacity: { duration: 0.18, ease: 'easeOut' },
                }
        }
        onFocusCapture={() => setHidden(false)}
        style={{ transformOrigin: 'top center' }}
      >
        <Container className="pt-6 pb-5">
          <div className="pointer-events-auto flex items-center justify-between px-1 sm:px-2">
            <Link href="/" className="group flex items-center gap-3 rounded-md px-2 py-1">
              <BrandMark className="h-9 w-auto transition-transform duration-300 group-hover:scale-[1.04]" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-sm font-semibold tracking-[0.08em] uppercase">
                  {siteName}
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const active = isActivePath(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative py-2 text-sm font-medium transition after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-200',
                      active
                        ? 'text-foreground after:scale-x-100'
                        : 'text-foreground/62 after:scale-x-0 hover:text-foreground hover:after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle className="hidden lg:flex" />
              <Button asChild size="sm" className="h-10 px-4">
                <Link href="https://docs.sonicverse.tech">
                  Documentation
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            <div className="lg:hidden">
              <Sheet
                open={menuOpen}
                onOpenChange={(open) => {
                  setMenuOpen(open)
                  if (open) {
                    setHidden(false)
                  }
                }}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="size-10 p-0"
                    aria-label="Open menu"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Sonicverse</SheetTitle>
                    <SheetDescription>
                      The open broadcast stack — built by broadcasters and developers, in the open.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const active = isActivePath(item.href)
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              'rounded-md border px-4 py-3 text-sm transition',
                              active
                                ? 'border-primary/18 bg-primary/10 text-primary'
                                : 'border-border/60 bg-background/68 text-foreground/72',
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <ThemeToggle />
                    <Button asChild className="flex-1">
                      <SheetClose asChild>
                        <Link href="https://docs.sonicverse.tech">Documentation</Link>
                      </SheetClose>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </motion.header>
    </>
  )
}
