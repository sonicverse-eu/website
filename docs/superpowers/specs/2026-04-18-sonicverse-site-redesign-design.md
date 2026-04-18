# Sonicverse Full-Site Redesign Design

Date: 2026-04-18
Status: Approved in conversation, awaiting user review of written spec
Owner: Codex

## 1. Context

Sonicverse needs a full-site redesign for its existing Next.js App Router marketing site. The current site already has a working route structure, a shared marketing shell, and a content model for blog, changelog, and roadmap pages, but the overall experience feels dated and does not yet project the level of polish, clarity, and technical confidence expected from a modern open-source software brand.

The redesign should establish Sonicverse as:

- a credible open-source technology company
- a maker of real products and libraries
- a commercial partner for hosting and consulting
- a brand that feels calm, exact, modern, and premium

The site should speak to both developers and buyers. Developers need proof. Buyers need confidence. The design must make those two needs feel compatible rather than split.

## 2. Goals

Primary goals:

- establish brand credibility for open source
- showcase Sonicverse products and OSS libraries
- explain the commercial model around hosting and consulting
- make the entire site feel premium, fast, and technically mature

Secondary goals:

- improve information architecture across all routes
- rewrite copy to be sharper and more proof-led
- keep the runtime mostly server-rendered and low-JS
- create a reusable design system that can scale with new products and content

Non-goals:

- flashy animation-heavy storytelling
- agency-style marketing language
- a generic startup landing page aesthetic
- turning the site into a client-rendered motion surface

## 3. Design Thesis

The redesign should follow a proof-first minimal approach.

Sonicverse should feel closer to Vercel and Linear than to a loud startup site. The design should be quiet, sharp, and highly controlled. Instead of trying to impress with visual excess, the site should communicate quality through:

- strong typography
- disciplined spacing
- calm but exact motion
- clear product and OSS evidence
- well-structured commercial pathways

This should feel like the website of a real software company with taste, not a portfolio studio and not a template-derived marketing site.

## 4. Audience and Jobs To Be Done

Primary audiences:

- developers evaluating Sonicverse products, libraries, and OSS credibility
- buyers evaluating whether Sonicverse can be trusted for hosting or consulting

The site should help these audiences answer:

- What does Sonicverse actually build?
- Is the open-source work real, active, and maintained well?
- Is there a coherent product ecosystem here?
- Can Sonicverse commercially support or extend this work?
- Does the team have the judgment to build and operate serious systems?

## 5. Brand Direction

### 5.1 Tone

Brand tone should be:

- technically confident
- calm
- precise
- modern
- open by default
- credible without hype

The copy should sound like a company that ships, maintains, and stands behind its systems. It should avoid inflated claims, vague “innovation” language, or generic consulting boilerplate.

### 5.2 Visual References

Primary references:

- Vercel for restraint, contrast, and premium technical calm
- Linear for spacing discipline, product confidence, and interaction polish

Secondary reference:

- Stripe only for editorial clarity and explanatory section structure

### 5.3 Theme Strategy

The site should support a balanced light and dark system where both themes feel equally intentional. Dark mode should not feel like the primary design with a weaker light fallback, and light mode should not feel like a stripped-down version of dark.

## 6. Information Architecture

### 6.1 Global Navigation

Top-level global navigation should shift from the current minimal set toward a product-and-proof structure:

- Products
- Open Source
- Hosting
- Consulting
- Projects
- About
- Journal

Utility actions:

- Docs
- Theme toggle
- CTA: Explore products
- CTA: Start a project

### 6.2 Route Strategy

Recommended route structure:

- `/`
- `/products`
- `/open-source`
- `/hosting`
- `/consulting`
- `/projects`
- `/about`
- `/journal`
- `/blog`
- `/changelog`
- `/roadmap`
- `/contact`
- `/security`

Notes:

- `blog`, `changelog`, and `roadmap` already exist and should remain as dedicated content surfaces.
- `journal` should be added as an aggregate editorial landing page that links into `blog`, `changelog`, and `roadmap`.
- Current `services` messaging should be split into `hosting` and `consulting`.
- Existing routes should be redesigned, not simply re-skinned.

### 6.3 Global Shell

The global shell should feel stable and understated:

- slim sticky header with subtle blur and compression
- page-width container system shared across routes
- calm persistent site backdrop with very restrained texture
- footer that behaves like a trust index, not a sitemap dump

## 7. Homepage Structure

The homepage should establish the brand thesis and route users into the right proof paths. It should not try to explain everything.

### 7.1 Hero

Layout:

- left-heavy content column with strong typographic hierarchy
- right-side ambient visual panel or product-system signal field
- dual CTA row
- small proof strip beneath core copy

UX intent:

- establish credibility immediately
- communicate products plus OSS plus commercial support in one glance
- split traffic toward product discovery or commercial engagement

Content structure:

- eyebrow
- headline
- short proof-led supporting paragraph
- CTA 1: Explore products
- CTA 2: Start a project
- 2-3 proof signals such as open source, hosted systems, public roadmap

### 7.2 Product Suite

Layout:

- structured card grid or stacked panel system
- flagship products first, supporting libraries second

UX intent:

- make Sonicverse feel real and active
- show that there is a coherent ecosystem, not a vague promise

Content structure:

- section intro
- featured products
- supporting OSS libraries
- status or role metadata

### 7.3 Open-Source Proof

Layout:

- mixed proof panel with stats, repo signals, release activity, and links into roadmap/changelog/docs

UX intent:

- reassure developers that the OSS posture is real
- reassure buyers that the company operates with rigor and transparency

Content structure:

- philosophy statement
- repo or maintenance metrics
- links to changelog, roadmap, docs
- contribution posture

### 7.4 Hosting and Consulting

Layout:

- two side-by-side tracks on desktop
- stacked panels on mobile

UX intent:

- separate product/OSS credibility from commercial offers while keeping them connected
- help buyers understand what Sonicverse sells without turning the site into a services brochure

Content structure:

- Hosting panel: managed operations, performance, reliability, platform stewardship
- Consulting panel: architecture, implementation, migrations, design-aware engineering

### 7.5 Selected Projects

Layout:

- 3-5 curated featured items in a clean staggered or masonry-like arrangement without becoming visually noisy

UX intent:

- show applied judgment and concrete system work
- provide believable examples without inventing fake case studies

Content structure:

- project name or archetype
- short outcome framing
- technology or product context
- link to more detail where possible

### 7.6 Trust Layer

Layout:

- compact signal row or proof matrix

UX intent:

- replace generic testimonials with signals that fit a technical brand

Content structure:

- public roadmap
- security posture
- docs quality
- changelog cadence
- open-source maintenance approach

### 7.7 Journal Strip

Layout:

- narrow editorial preview band near the bottom of the page

UX intent:

- reinforce that Sonicverse builds in public
- add freshness and operational credibility

Content structure:

- latest blog post
- recent changelog item
- roadmap highlight

### 7.8 Final CTA

Layout:

- calm closing panel with dual CTA repeated

UX intent:

- give both audience types a low-friction next step

Content structure:

- short closing headline
- one supporting sentence
- Explore products
- Start a project

## 8. Interior Page Templates

### 8.1 Products

Purpose:

- make the product ecosystem legible

Sections:

- page hero
- flagship products
- supporting libraries
- implementation or deployment context
- CTA toward docs or contact

### 8.2 Open Source

Purpose:

- act as the strongest developer-trust page on the site

Sections:

- philosophy and maintenance stance
- featured repositories/libraries
- release and roadmap proof
- contribution path
- docs and community links

### 8.3 Hosting

Purpose:

- explain the managed commercial offer around Sonicverse products and OSS stacks

Sections:

- page hero
- what Sonicverse hosts
- operational principles
- support and stewardship model
- contact CTA

### 8.4 Consulting

Purpose:

- explain selective consulting without diluting the product-first brand

Sections:

- page hero
- engagements Sonicverse is well-suited for
- delivery model
- technical strengths
- intake CTA

### 8.5 Projects

Purpose:

- show applied work and credible implementation categories

Sections:

- page hero
- featured projects or archetypes
- problem types
- fit signals

### 8.6 About

Purpose:

- explain worldview, operating model, and why Sonicverse exists

Sections:

- brand thesis
- principles
- operating model
- why OSS matters to the company

### 8.7 Journal

Purpose:

- give buyers and developers one place to see public activity

Sections:

- hero
- featured writing
- latest changelog
- roadmap snapshot
- links into each dedicated content stream

### 8.8 Blog, Changelog, Roadmap

Purpose:

- remain dedicated content surfaces but inherit the new shell and stronger page headers

Required redesigns:

- cleaner page headers
- tighter metadata hierarchy
- better list/detail templates
- stronger in-content typography
- calmer navigation between entries

### 8.9 Contact

Purpose:

- become a high-signal intake page with less filler

Sections:

- short hero
- fit framing
- concise form
- FAQ or engagement expectations

### 8.10 Security

Purpose:

- express trust clearly and concisely

Sections:

- disclosure policy
- reporting path
- operational posture
- response expectations

## 9. UI System

### 9.1 Typography

Recommended direction:

- migrate from the current external Typekit dependency to `next/font`
- use either one excellent variable sans across the site or a display/body pair with tight visual discipline
- keep mono for metadata, status, tags, and code-adjacent labels

Type scale:

- Hero display: `64/72`
- H1: `48/56`
- H2: `36/44`
- H3: `28/36`
- H4: `22/30`
- Body large: `18/30`
- Body: `16/28`
- Small: `14/22`
- Meta: `12/18`

Typography rules:

- headings should feel compact and confident
- body copy should avoid long paragraphs on marketing pages
- metadata should use mono or tighter caps sparingly
- article and documentation-adjacent surfaces should widen line-height for readability

### 9.2 Color Palette

Light palette:

- Background: `#F6F8FB`
- Surface: `#FFFFFF`
- Surface muted: `#EEF2F7`
- Text strong: `#0F172A`
- Text muted: `#475569`
- Border: `#D9E1EC`
- Accent: `#2563EB`
- Accent soft: `#DBEAFE`
- Success: `#0F766E`

Dark palette:

- Background: `#0A0F18`
- Surface: `#0F1724`
- Surface muted: `#131D2B`
- Text strong: `#E5EDF7`
- Text muted: `#94A3B8`
- Border: `#223044`
- Accent: `#60A5FA`
- Accent soft: `rgba(96,165,250,0.14)`
- Success: `#2DD4BF`

Usage rules:

- keep accents sparse
- use borders and tonal surfaces for structure
- reserve bright accent usage for active states and decision points
- avoid decorative gradient overload

### 9.3 Spacing System

Base system:

- 8pt grid

Recommended spacing bands:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64
- 80
- 96
- 120
- 144

Section spacing:

- desktop: `96-144px`
- tablet: `80-112px`
- mobile: `64-88px`

Content widths:

- narrow: `720px`
- reading: `840px`
- standard: `1120px`
- wide: `1280px`

### 9.4 Component Styles

Buttons:

- medium height
- rounded but restrained
- strong active and focus states
- no glossy or noisy gradients

Cards:

- subtle tonal fill
- thin border
- slight elevation
- sharp interior spacing

Navigation:

- compact
- highly legible
- active state visible but not oversized

Badges and pills:

- quiet metadata
- one-line, compact, low-saturation

Forms:

- minimal chrome
- strong focus ring
- obvious validation hierarchy

## 10. Motion System

### 10.1 Motion Principles

Motion should feel almost invisible until users notice how polished the experience is.

Core rules:

- fast reactions, slow ambience
- most transitions under `400ms`
- animate transform and opacity first
- keep shell continuity stronger than route choreography
- respect reduced motion everywhere

### 10.2 Motion Types

Header:

- subtle blur/compression transition on scroll

Section reveal:

- fade + translateY once on entry
- stagger children lightly

Card hover:

- small lift
- border brightening
- slight shadow shift

Button:

- `160-220ms` hover and press behavior

Ambient background:

- large, slow light-field drift
- low-contrast grid or scan detail
- no particles, no strong parallax

Theme change:

- `~220ms` token transition

### 10.3 Motion Tokens

- hover: `160-220ms ease-out`
- press: `90-120ms ease-out`
- reveal: `420-560ms cubic-bezier(0.22, 1, 0.36, 1)`
- stagger: `40-80ms`
- ambient drift: `12-20s`

### 10.4 Reduced Motion

Reduced motion behavior should:

- replace x/y movement with opacity where appropriate
- disable ambient drift and parallax-like behavior
- keep state changes readable without motion-heavy transitions

## 11. Technical Architecture

### 11.1 Rendering Model

The redesigned site should remain mostly server-rendered.

Based on current Next.js App Router guidance:

- pages and layouts stay Server Components by default
- data fetching lives in server components
- client components are introduced only where interaction or browser APIs are required
- props flow from server sections into small motion or interaction islands

This is important for:

- fast first paint
- lower client bundle size
- easier maintainability
- better runtime discipline across a mostly informational site

### 11.2 Client Boundaries

Use client components only for:

- theme toggle
- sticky header scroll behavior, if retained
- reveal-on-scroll wrappers
- ambient hero or backdrop motion
- optional hover-enhanced interactive panels

Do not mark whole pages as client components just to enable motion.

### 11.3 Lazy Loading

Use `next/dynamic` for:

- below-the-fold decorative motion units
- non-critical client-only visual sections
- any heavy interactive visual module that is not necessary for first paint

Do not lazy-load critical above-the-fold copy or primary CTA content.

### 11.4 Fonts

Use `next/font` for self-hosted or optimized font loading in `app/layout.tsx`.

Recommended rules:

- apply primary font variables at the html root
- use `display: swap`
- avoid external stylesheet font dependencies for the new design

## 12. Tailwind and CSS Strategy

Tailwind v4 is the right implementation layer for this redesign.

Use Tailwind in three layers:

- utilities for layout, spacing, typography, responsiveness
- CSS variables for tokens such as color, radius, shadow, and motion
- a thin `@layer components` layer for repeated site patterns

Suggested repeatable classes:

- `surface-panel`
- `section-shell`
- `site-grid`
- `proof-strip`
- `btn-primary`
- `btn-secondary`
- `dark-surface`

This should reduce class soup while keeping the site fast to build and easy to evolve.

## 13. Recommended File Structure

```txt
app/
  layout.tsx
  page.tsx
  products/page.tsx
  open-source/page.tsx
  hosting/page.tsx
  consulting/page.tsx
  projects/page.tsx
  about/page.tsx
  journal/page.tsx
  blog/page.tsx
  changelog/page.tsx
  roadmap/page.tsx
  contact/page.tsx
  security/page.tsx

components/
  site/
    shell/
      Header.tsx
      Footer.tsx
      SiteBackdrop.tsx
    home/
      HomeHero.tsx
      HomeHeroBackground.tsx
      ProductSuite.tsx
      OpenSourceProof.tsx
      CommercialTracks.tsx
      ProjectShowcase.tsx
      TrustLayer.tsx
      JournalStrip.tsx
      FinalCta.tsx
    pages/
      PageHero.tsx
      SectionShell.tsx
      SectionIntro.tsx
      ProofGrid.tsx
      StatStrip.tsx
  motion/
    Reveal.tsx
    StaggerGroup.tsx
    AmbientOrbs.tsx
  ui/
    Button.tsx
    Card.tsx
    Badge.tsx
    SurfacePanel.tsx
    Pill.tsx
    Container.tsx

lib/
  site-data/
    navigation.ts
    marketing.ts
    products.ts
    oss.ts
    projects.ts
    trust.ts
```

## 14. Migration Notes From Current Repo

Current repo realities:

- existing routes include `about`, `projects`, `open-source`, `blog`, `roadmap`, `changelog`, `contact`, `security`
- the current homepage and interior pages rely on repeated hero + card grid patterns
- the current site data is bundled inside `lib/site-data.ts`
- typography currently uses an external Typekit stylesheet in `app/layout.tsx`

Recommended migration steps:

- split `lib/site-data.ts` into route- and domain-specific files
- replace the current global style direction with a new token system
- redesign header and footer before page-specific work so the shell stabilizes early
- introduce shared section primitives before rebuilding each route
- rewrite copy route by route rather than patching in place
- standardize motion usage on `motion/react` so reveal and interaction patterns do not mix two React motion APIs

## 15. Code Patterns

These are not final implementation files. They are direction-setting examples for the implementation phase.

### 15.1 Hero Structure

```tsx
import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const HomeHeroBackground = dynamic(() => import('@/components/site/home/HomeHeroBackground'), {
  ssr: false,
})

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <HomeHeroBackground />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Open-source software, hosted and supported</p>
            <h1 className="mt-6 text-6xl leading-none tracking-[-0.05em] text-balance">
              Sonicverse builds products in public and stands behind them in production.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Open-source libraries, commercial hosting, and consulting for teams that want stronger
              software systems and calmer technical surfaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">Explore products</Button>
              <Button size="lg" variant="secondary">
                Start a project
              </Button>
            </div>
          </div>
          <div className="surface-panel min-h-[22rem] p-6">Product signal panel</div>
        </div>
      </Container>
    </section>
  )
}
```

### 15.2 Reduced-Motion-Safe Reveal

```tsx
'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.48,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 15.3 Reusable Button Primitive

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-[color-mix(in_srgb,var(--accent)_90%,black)]',
        secondary: 'border border-border bg-surface text-foreground hover:bg-surface-muted',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export function Button({
  asChild,
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
```

## 16. Performance Rules

Performance priorities:

- fast first paint
- low client JavaScript
- minimal font layout shift
- restrained use of blurred layers
- no large decorative image assets where gradients can do the job

Implementation rules:

- keep static content as server-rendered as possible
- use `next/image` for real imagery
- prefer CSS gradients and texture over bitmap backgrounds
- lazy-load only non-critical client visuals
- avoid large page transition frameworks
- verify motion impact on low-end devices and mobile

## 17. Responsive Design Rules

Mobile rules:

- keep the hero concise and front-load the dual CTA
- convert side-by-side proof panels into stacked sections
- reduce blur count and ambient effects on small screens
- ensure nav, CTA, and proof signals remain visible without excessive scrolling

Tablet and desktop rules:

- widen layout progressively, not abruptly
- preserve the same hierarchy across breakpoints
- use density carefully; do not turn desktop into a cluttered dashboard

## 18. Wow-Factor Details

Subtle enhancements that fit the brand:

- hero ambient field with slow drifting orbs and faint grid texture
- scan-line or beam accent inside a featured product panel
- precise hover emphasis on product cards and trust rows
- smooth theme transition that preserves perceived depth
- journal strip with live-feeling freshness through recent updates
- restrained border glow on key surfaces when focused or hovered

These effects should be quiet enough that the site still feels mature if motion is disabled.

## 19. Acceptance Criteria

The redesign should be considered successful when:

- the site feels premium and modern without becoming flashy
- the homepage clearly communicates products, OSS credibility, hosting, and consulting
- every major route has a distinct purpose and stronger narrative
- light and dark themes both feel equally finished
- motion improves perceived quality without driving up bundle cost significantly
- the implementation remains mostly server-rendered with isolated client islands

## 20. Recommended Implementation Sequence

1. Rebuild the token system and global shell.
2. Replace fonts with `next/font`.
3. Create shared layout and section primitives.
4. Rebuild homepage with new information architecture.
5. Rebuild high-priority interior routes: Products, Open Source, Hosting, Consulting.
6. Rebuild Projects, About, Journal, Contact, Security.
7. Restyle Blog, Changelog, Roadmap list and detail templates.
8. Verify light/dark, motion, responsiveness, and performance.

## 21. Sources and Notes

Current documentation checks used while shaping this spec:

- Next.js App Router docs: pages and layouts are Server Components by default, with client components layered in only for interactivity and browser APIs.
- Next.js font docs: `next/font` should be used from `app/layout.tsx` for optimized self-hosted font loading and lower layout shift.
- Next.js lazy loading docs: `next/dynamic` is appropriate for non-critical client components and client-only visual sections.
- Motion React docs: `useInView` and `useReducedMotion` should drive subtle reveal patterns and accessibility-safe motion branching.
