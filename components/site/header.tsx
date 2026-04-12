"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { navItems, siteName } from "@/lib/site-data";

import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const TOP_OFFSET = 18;
    const HIDE_OFFSET = 96;
    const DIRECTION_THRESHOLD = 10;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      const delta = currentScrollY - previousScrollY;
      const nearTop = currentScrollY <= TOP_OFFSET;

      const shouldShowScrolledState = !nearTop;
      setScrolled((current) =>
        current !== shouldShowScrolledState ? shouldShowScrolledState : current,
      );

      if (menuOpen || nearTop) {
        setHidden(false);
        lastScrollYRef.current = currentScrollY;
        frameRef.current = null;
        return;
      }

      if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        const shouldHide = delta > 0 && currentScrollY > HIDE_OFFSET;
        setHidden((current) => (current !== shouldHide ? shouldHide : current));
        lastScrollYRef.current = currentScrollY;
      }

      frameRef.current = null;
    };

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={
        reduceMotion
          ? { y: 0, scale: 1, filter: "blur(0px)" }
          : hidden
            ? {
                y: "-118%",
                scale: 0.985,
                filter: "blur(3px)",
              }
            : {
                y: [hidden ? -24 : -14, 0],
                scale: [0.985, 1],
                filter: ["blur(4px)", "blur(0px)"],
              }
      }
      transition={
        reduceMotion
          ? { duration: 0.18, ease: [0.4, 0, 0.2, 1] }
          : hidden
            ? {
                duration: 0.2,
                ease: [0.4, 0, 1, 1],
              }
            : {
                y: {
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                  mass: 0.82,
                },
                scale: {
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
                filter: {
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
      }
      onFocusCapture={() => setHidden(false)}
      style={{ transformOrigin: "top center" }}
    >
      <Container className="pt-5">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between rounded-full px-3 py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 will-change-transform sm:px-4",
            scrolled
              ? "glass-nav border border-border/70 backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-3 rounded-full px-2 py-1">
            <BrandMark className="h-9 w-auto text-primary transition-transform duration-300 group-hover:scale-[1.06]" />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-sm font-semibold tracking-[0.12em] uppercase">
                {siteName}
              </span>
              <span className="mt-1 text-[0.72rem] tracking-[0.04em] text-foreground/52">
                Open-source software initiative
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/40 p-1 backdrop-blur md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm text-foreground/62 transition hover:text-foreground",
                    active && "bg-primary/10 text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle className="hidden md:flex" />
            <Button asChild size="sm" className="h-10 px-4">
              <Link href="/contact">Start a project</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet
              open={menuOpen}
              onOpenChange={(open) => {
                setMenuOpen(open);
                if (open) {
                  setHidden(false);
                }
              }}
            >
              <SheetTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="size-10 rounded-full p-0"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Sonicverse</SheetTitle>
                  <SheetDescription>
                    Open-source-native product engineering with a calm technical point of
                    view.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm transition",
                            active
                              ? "border-primary/18 bg-primary/8 text-primary"
                              : "border-border/60 bg-background/50 text-foreground/72",
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <ThemeToggle />
                  <Button asChild className="flex-1">
                    <SheetClose asChild>
                      <Link href="/contact">Start a project</Link>
                    </SheetClose>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
