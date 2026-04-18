# Sonicverse Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Sonicverse marketing site around the approved proof-first minimal redesign, including a new shell, new page templates, rewritten page structure, and a low-JS App Router implementation.

**Architecture:** Keep pages and layouts server-rendered by default, move motion into a few focused client components, and centralize marketing content into route-aware site-data modules. Rebuild the shell and design tokens first so every route inherits the same typography, spacing, motion, and surface system.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS v4, `next/font`, `motion/react`, existing content collections, existing form/actions setup

---

## File Map

Primary files to create:

- `docs/superpowers/plans/2026-04-18-sonicverse-site-redesign-implementation.md`
- `app/products/page.tsx`
- `app/hosting/page.tsx`
- `app/consulting/page.tsx`
- `app/journal/page.tsx`
- `components/site/shell/site-backdrop.tsx`
- `components/site/home/home-hero-background.tsx`
- `components/site/home/product-suite.tsx`
- `components/site/home/open-source-proof.tsx`
- `components/site/home/commercial-tracks.tsx`
- `components/site/home/project-showcase.tsx`
- `components/site/home/trust-layer.tsx`
- `components/site/home/journal-strip.tsx`
- `components/site/home/final-cta.tsx`
- `lib/site-data/navigation.ts`
- `lib/site-data/marketing.ts`
- `lib/site-data/products.ts`
- `lib/site-data/open-source.ts`
- `lib/site-data/projects.ts`
- `lib/site-data/trust.ts`

Primary files to modify:

- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/open-source/page.tsx`
- `app/projects/page.tsx`
- `app/blog/page.tsx`
- `app/changelog/page.tsx`
- `app/roadmap/page.tsx`
- `app/contact/page.tsx`
- `app/security/page.tsx`
- `components/home/homepage.tsx`
- `components/site/header.tsx`
- `components/site/footer.tsx`
- `components/site/page-hero.tsx`
- `components/site/section-header.tsx`
- `components/site/reveal.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/badge.tsx`
- `components/ui/container.tsx`
- `lib/site-data.ts`
- `lib/metadata.ts`

Verification commands:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Task 1: Rebuild design tokens and shell primitives

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/ui/button.tsx`
- Modify: `components/ui/card.tsx`
- Modify: `components/ui/badge.tsx`
- Modify: `components/ui/container.tsx`

- [ ] Replace external font loading with `next/font` and apply font variables at the root layout.
- [ ] Rewrite global CSS tokens for balanced light/dark palettes, spacing rhythm, surface styles, and motion variables.
- [ ] Update shared UI primitives so button, badge, card, and container styles match the new system.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit the shell-token pass.

## Task 2: Rebuild the global marketing shell

**Files:**

- Modify: `components/site/header.tsx`
- Modify: `components/site/footer.tsx`
- Create: `components/site/shell/site-backdrop.tsx`
- Modify: `app/layout.tsx`
- Modify: `lib/site-data.ts`
- Create: `lib/site-data/navigation.ts`

- [ ] Rewrite navigation around Products, Open Source, Hosting, Consulting, Projects, About, and Journal.
- [ ] Rebuild the header with restrained sticky behavior, dual CTA emphasis, and a simpler mobile menu.
- [ ] Rebuild the footer as a trust-oriented destination index.
- [ ] Add a reusable backdrop layer that can sit behind the entire site without forcing client rendering.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit the shell rebuild.

## Task 3: Rebuild section primitives and motion islands

**Files:**

- Modify: `components/site/page-hero.tsx`
- Modify: `components/site/section-header.tsx`
- Modify: `components/site/reveal.tsx`
- Create: `components/site/home/home-hero-background.tsx`

- [ ] Replace the current hero pattern with a more restrained proof-first layout that works for both home and interior pages.
- [ ] Update section intro/header patterns to support the new page rhythm.
- [ ] Move reveal behavior to `motion/react` and wire it to `useReducedMotion`.
- [ ] Create a dedicated hero background client component for subtle ambient motion.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit the shared section pass.

## Task 4: Rebuild the homepage

**Files:**

- Modify: `app/page.tsx`
- Modify: `components/home/homepage.tsx`
- Create: `components/site/home/product-suite.tsx`
- Create: `components/site/home/open-source-proof.tsx`
- Create: `components/site/home/commercial-tracks.tsx`
- Create: `components/site/home/project-showcase.tsx`
- Create: `components/site/home/trust-layer.tsx`
- Create: `components/site/home/journal-strip.tsx`
- Create: `components/site/home/final-cta.tsx`
- Create: `lib/site-data/marketing.ts`
- Create: `lib/site-data/products.ts`
- Create: `lib/site-data/open-source.ts`
- Create: `lib/site-data/projects.ts`
- Create: `lib/site-data/trust.ts`

- [ ] Replace the old homepage with the new hero, product suite, OSS proof, commercial tracks, projects, trust, journal, and final CTA flow.
- [ ] Move homepage copy and section data into focused site-data modules.
- [ ] Keep the page server-rendered, with only ambient motion and reveal wrappers as client islands.
- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Commit the homepage redesign.

## Task 5: Add new route pages and rebuild route-level IA

**Files:**

- Create: `app/products/page.tsx`
- Create: `app/hosting/page.tsx`
- Create: `app/consulting/page.tsx`
- Create: `app/journal/page.tsx`
- Modify: `lib/metadata.ts`

- [ ] Add the missing route pages required by the approved IA.
- [ ] Connect each page to the new shared page hero and section patterns.
- [ ] Ensure metadata and canonical paths match the new route map.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit the new routes.

## Task 6: Rebuild existing interior marketing pages

**Files:**

- Modify: `app/about/page.tsx`
- Modify: `app/open-source/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/security/page.tsx`

- [ ] Rewrite the page structure and copy framing for each existing marketing route.
- [ ] Align each page to the new proof-first information model instead of repeating the old hero-plus-card-grid pattern.
- [ ] Reuse shared shell and section primitives rather than creating one-off layouts.
- [ ] Run `npm run lint` and `npm run typecheck`.
- [ ] Commit the interior marketing pages.

## Task 7: Refresh content surfaces

**Files:**

- Modify: `app/blog/page.tsx`
- Modify: `app/changelog/page.tsx`
- Modify: `app/roadmap/page.tsx`

- [ ] Redesign list-page headers and supporting structure so blog, changelog, and roadmap feel like part of the new brand system.
- [ ] Preserve existing content fetching and route semantics while updating hierarchy and pacing.
- [ ] Keep the implementation server-first and avoid adding route-level client weight.
- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Commit the content surface refresh.

## Task 8: Final verification and cleanup

**Files:**

- Review all touched files

- [ ] Run `npm run format`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Review theme parity, route coverage, and navigation consistency.
- [ ] Commit any final fixes.
