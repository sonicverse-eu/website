import Link from "next/link";

import { navigation } from "@/data/home";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <span className="font-heading text-sm font-semibold tracking-[0.22em] text-white">
              OS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-medium text-foreground">
              Open Initiative
            </span>
            <span className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Built in the open
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden rounded-full md:inline-flex"
          >
            Read the docs
          </Button>
          <Button size="sm" className="rounded-full">
            Join GitHub
          </Button>
        </div>
      </Container>
    </header>
  );
}
