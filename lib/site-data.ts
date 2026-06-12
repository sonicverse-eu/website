export type NavItem = {
  href: string
  label: string
}

export type FooterNavGroup = {
  title: string
  links: Array<{
    href: string
    label: string
    description: string
  }>
}

export const siteName = 'Sonicverse'

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/platform', label: 'Platform' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: 'Product',
    links: [
      {
        href: '/platform',
        label: 'Platform',
        description:
          'The open broadcast stack — playout, scheduling, streaming, and station tooling.',
      },
      {
        href: '/open-source',
        label: 'Open Source',
        description: 'Why the whole stack is open, and how to follow the work as it ships.',
      },
      {
        href: '/roadmap',
        label: 'Roadmap',
        description: 'What we are building next across the broadcast workflow, in the open.',
      },
      {
        href: '/changelog',
        label: 'Changelog',
        description: 'Release notes and build-in-public progress as the stack takes shape.',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        href: '/about',
        label: 'About',
        description: 'Broadcasters and developers building the software radio has been missing.',
      },
      {
        href: '/broadcasters',
        label: 'Broadcasters',
        description: 'Who the stack is for — independent stations, managers, and technical teams.',
      },
      {
        href: '/contact',
        label: 'Contact',
        description: 'Get early access or tell us how your station actually works.',
      },
    ],
  },
]

export const principles = [
  'Open source at the core',
  'Built by broadcasters',
  'On-air reliability first',
  'Your stack, your roadmap',
]

export const capabilities = [
  {
    title: 'Playout & automation',
    description:
      'A reliable on-air engine — automated playback, live assist, and failover that holds.',
  },
  {
    title: 'Scheduling & delivery',
    description:
      'Music and traffic scheduling wired straight through to streaming and distribution.',
  },
  {
    title: 'Station tooling',
    description: 'Show prep, station management, and the infrastructure glue around the workflow.',
  },
]

export const serviceAreas = [
  {
    title: 'Playout & automation',
    description:
      'The on-air engine: automated playback, live assist, and failover built for 24/7 uptime.',
    bullets: ['Automated playout', 'Live assist', 'Failover & redundancy'],
  },
  {
    title: 'Scheduling & traffic',
    description: 'Music and traffic scheduling that reflects how stations actually plan their day.',
    bullets: ['Music scheduling', 'Traffic & logs', 'Clocks & rotations'],
  },
  {
    title: 'Streaming & delivery',
    description: 'Stream origin and distribution on open standards, built on the FFmpeg lineage.',
    bullets: ['Stream origin', 'Multi-bitrate', 'Open formats'],
  },
  {
    title: 'Show preparation',
    description: 'The tools presenters and producers use to build a show before it goes to air.',
    bullets: ['Run sheets', 'Audio & links', 'Handover notes'],
  },
  {
    title: 'Station management',
    description:
      'The operational layer — libraries, users, and the moving parts behind the signal.',
    bullets: ['Media library', 'Roles & access', 'Reporting'],
  },
  {
    title: 'Infrastructure tooling',
    description:
      'Deployment, monitoring, and the plumbing that keeps a station on air and observable.',
    bullets: ['Self-host ready', 'Monitoring', 'Open APIs'],
  },
]

export const operatingModel = [
  {
    title: 'In the open',
    description: 'We build in public — source, decisions, and roadmap visible as the work happens.',
  },
  {
    title: 'With broadcasters, not at them',
    description: 'Shaped by people who run stations, against how a broadcast day actually works.',
  },
  {
    title: 'Open standards, no lock-in',
    description: 'Open formats and APIs so the pieces interoperate and your data stays yours.',
  },
]

export const technicalStandards = [
  'On-air reliability treated as the baseline, not a feature',
  'Open formats and APIs so tools interoperate by default',
  'Built on the FFmpeg and Linux foundation that already runs broadcast',
  'Observable systems you can self-host and inspect end to end',
]

export const projectArchetypes = [
  {
    title: 'Independent & community stations',
    description:
      'Stations that need capable infrastructure without the long contracts and opaque pricing of legacy vendors.',
  },
  {
    title: 'Station managers',
    description:
      'Operators who want licensing costs to become variable, and budget freed for people and content instead.',
  },
  {
    title: 'Technical teams at stations',
    description:
      'Engineers who want source access — to fix bugs, extend workflows, and stop waiting on a vendor release cycle.',
  },
  {
    title: 'Multi-station networks',
    description:
      'Groups that need interoperable, open tooling to run several stations without bespoke middleware for every integration.',
  },
]

export const openSourceProjects = [
  {
    name: 'Playout engine',
    summary: 'The on-air core — automated playback and live assist, designed for 24/7 reliability.',
    tags: ['In development', 'Playout', 'Reliability'],
  },
  {
    name: 'Scheduling service',
    summary: 'Music and traffic scheduling that maps to real station clocks and rotations.',
    tags: ['In development', 'Scheduling', 'Open APIs'],
  },
  {
    name: 'Streaming server',
    summary: 'Open-standard stream origin and delivery, built on the FFmpeg lineage.',
    tags: ['In development', 'Streaming', 'Open formats'],
  },
]

export const repositorySignals = [
  'Fix a bug from the source instead of waiting on a support ticket',
  'Own the roadmap — open projects do not get acquired and sunset',
  'Interoperate on open standards, not someone else’s upsell strategy',
]

export const contactFaq = [
  {
    question: 'Is this ready to run a station today?',
    answer:
      'Not yet. Sonicverse is early and we are building in the open. Early access means following the work closely and shaping it — not a finished product.',
  },
  {
    question: 'Which stations is it for?',
    answer:
      'Independent and community stations first — anyone underserved by legacy vendors. The stack is designed to scale to multi-station networks over time.',
  },
  {
    question: 'Can I self-host it?',
    answer:
      'Yes. The stack is open source and built to be self-hosted, with open APIs and formats so it interoperates with what you already run.',
  },
  {
    question: 'How do I follow along or get early access?',
    answer:
      'Tell us how your station works and what you need. We will keep you in the loop as modules ship and open early access as they are ready.',
  },
]

export const collaborationPrompts = [
  'You run an independent or community station and the legacy contracts no longer add up.',
  'You are a developer at a station and want source access to fix and extend your own tools.',
  'You are evaluating alternatives to a proprietary vendor before the next renewal.',
]
