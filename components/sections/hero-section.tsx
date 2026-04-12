"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { heroSignals, stats } from "@/data/home";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_25%),linear-gradient(180deg,#050816_0%,#090d1a_35%,#050816_100%)]" />
      <AnimatedGridPattern
        className="opacity-30 [mask-image:radial-gradient(circle_at_center,white,transparent_82%)]"
        numSquares={28}
        maxOpacity={0.18}
        duration={3}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-sky-300" />
              Open-source initiative starter
            </div>
            <h1 className="max-w-4xl font-heading text-5xl leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Premium infrastructure for ambitious work in the open.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Launch a credible public-facing foundation with a dark-first,
              developer-friendly presence that feels as intentional as the
              software behind it.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-6">
                Explore roadmap
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white/10 bg-white/5 px-6 text-white hover:bg-white/10"
              >
                View contributor guide
              </Button>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <div className="text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="relative lg:pl-8"
          >
            <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/6 py-0 shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <CardContent className="space-y-6 p-6 sm:p-8">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-sm text-zinc-400">Launch mode</p>
                    <p className="mt-1 font-medium text-white">
                      Foundation sprint
                    </p>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Contributor-ready
                  </div>
                </div>

                <div className="grid gap-4">
                  {heroSignals.map((signal) => (
                    <div
                      key={signal.label}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                        {signal.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-zinc-200">
                        {signal.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
