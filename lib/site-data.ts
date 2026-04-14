export type NavItem = {
  href: string
  label: string
}

export const siteName = 'Sonicverse'

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
]

export const principles = [
  'Open source by default',
  'Systems designed for change',
  'Calm collaboration',
  'Performance with intent',
]

export const capabilities = [
  {
    title: 'Product engineering',
    description: 'Modern product systems with clear architecture and long-term composure.',
  },
  {
    title: 'Platform foundations',
    description: 'Web platforms, shared tooling, and foundations that reduce drag for teams.',
  },
  {
    title: 'Open-source tooling',
    description: 'Public packages and reusable building blocks that compound over time.',
  },
]

export const serviceAreas = [
  {
    title: 'Custom software development',
    description: 'Purpose-built systems with sober choices and clear boundaries.',
    bullets: ['App Router and modern web stacks', 'Type-safe APIs', 'Incremental delivery'],
  },
  {
    title: 'Web platforms',
    description: 'Marketing sites and application shells aligned with product goals.',
    bullets: ['Design-aware implementation', 'Performance budgets', 'Accessibility by default'],
  },
  {
    title: 'Design systems',
    description: 'Reusable UI systems with careful tokens and operational clarity.',
    bullets: ['Token strategy', 'Composable primitives', 'Visual consistency'],
  },
  {
    title: 'Technical architecture',
    description: 'Rendering, runtime, and delivery decisions that keep systems coherent.',
    bullets: ['Cloudflare-ready deployments', 'Boundary setting', 'Runtime pragmatism'],
  },
  {
    title: 'Performance optimization',
    description: 'Measured improvements to loading, rendering, and interaction quality.',
    bullets: ['Core Web Vitals', 'Network efficiency', 'Asset strategy'],
  },
  {
    title: 'Developer experience',
    description: 'Tooling and workflows that reduce rework and keep codebases easier to operate.',
    bullets: ['Linting and standards', 'Build and preview flows', 'Sensible automation'],
  },
]

export const operatingModel = [
  {
    title: 'Direct collaboration',
    description: 'The people shaping the system stay close to the decisions that matter.',
  },
  {
    title: 'Transparent tradeoffs',
    description: 'Constraints are named early and tradeoffs stay visible.',
  },
  {
    title: 'Long-term structure',
    description: 'Architecture and handoff quality are treated as part of the product.',
  },
]

export const technicalStandards = [
  'Semantic HTML and accessible interaction patterns',
  'Type safety and explicit contracts at boundaries',
  'Measured performance, not ornamental complexity',
  'Documentation and structure that help future contributors',
]

export const projectArchetypes = [
  {
    title: 'Operational platforms',
    description:
      'Internal systems, dashboards, and shared platforms that support ongoing product or business operations.',
  },
  {
    title: 'Developer-facing products',
    description:
      'APIs, tooling surfaces, documentation systems, and product experiences built for technical audiences.',
  },
  {
    title: 'Open-source ecosystems',
    description:
      'Public packages, templates, starter kits, and integration layers designed to invite contribution.',
  },
  {
    title: 'High-trust web experiences',
    description:
      'Marketing and product surfaces where clarity, credibility, and technical taste matter as much as polish.',
  },
]

export const openSourceProjects = [
  {
    name: 'System primitives',
    summary: 'Reusable UI and layout patterns extracted from real delivery work.',
    tags: ['UI foundations', 'Accessibility', 'Design tokens'],
  },
  {
    name: 'Workflow utilities',
    summary: 'Checks, generators, and environment helpers that make workflows easier to read.',
    tags: ['DX', 'Automation', 'Release hygiene'],
  },
  {
    name: 'Cloud-native starters',
    summary: 'Composable starters for teams shipping on modern edge runtimes.',
    tags: ['Cloudflare', 'Deployment', 'Architecture'],
  },
]

export const repositorySignals = [
  'Public decisions instead of hidden tribal knowledge',
  'Issues and contribution paths that are approachable',
  'Tooling that works for maintainers as well as adopters',
]

export const contactFaq = [
  {
    question: 'What kinds of teams do you work with?',
    answer:
      'We work with teams that want product quality and engineering quality to move forward together.',
  },
  {
    question: 'Do you only work on open-source projects?',
    answer:
      'No. We work on both proprietary and open-source projects. Open source informs our approach to clarity, maintainability, and collaboration.',
  },
  {
    question: 'What helps a first conversation go well?',
    answer:
      'A short brief is enough: your current setup, the main challenge, and the outcome you want to achieve next.',
  },
]

export const collaborationPrompts = [
  'You are starting a new product and need a strong technical foundation.',
  'An existing platform has become harder to maintain, extend, or scale.',
  'Your team wants to turn internal patterns into stable, reusable systems.',
]
