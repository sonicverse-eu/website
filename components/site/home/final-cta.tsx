import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { Reveal } from '../reveal'

export function FinalCta() {
  return (
    <section className="section-space pt-6">
      <Container>
        <Reveal className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="space-y-4">
              <p className="panel-label">Next move</p>
              <h2 className="section-title max-w-3xl">
                Explore the products if you want proof. Start a project if you already know the
                system needs to get sharper.
              </h2>
              <p className="section-copy">
                Sonicverse works best when the product surface, the runtime shape, and the delivery
                choices all need to feel more deliberate at the same time.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg">
                <Link href="/products">Explore products</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Start a project</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
