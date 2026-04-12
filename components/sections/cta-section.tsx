import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { FadeIn } from "@/components/ui/fade-in";
import { Section } from "@/components/ui/section";

export function CtaSection() {
  return (
    <Section className="overflow-hidden">
      <FadeIn>
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(8,11,22,0.96))] p-8 shadow-[0_24px_120px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.2),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.18),transparent_30%)]" />
          <BorderBeam
            size={220}
            duration={8}
            colorFrom="#7dd3fc"
            colorTo="#ffffff"
            borderWidth={1.5}
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">
                Next step
              </p>
              <h2 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">
                Replace the placeholder copy, connect your repo, and you have a
                serious launch surface.
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
                The structure is already ready for real content, project
                metadata, contribution links, and trust-building proof points.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full px-6">
                Start customizing
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white/10 bg-white/5 px-6 text-white hover:bg-white/10"
              >
                Review architecture
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
