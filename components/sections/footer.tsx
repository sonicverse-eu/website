import Link from "next/link";

import { footerLinks } from "@/data/home";

import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <Container className="space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg text-foreground">
              Open Initiative
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              A production-ready homepage starter for open-source organizations
              that want clarity, credibility, and a premium visual foundation.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Designed for teams building in public.</p>
          <p>Next.js, Tailwind, shadcn/ui, Magic UI, Motion.</p>
        </div>
      </Container>
    </footer>
  );
}
