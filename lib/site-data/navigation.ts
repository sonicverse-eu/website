export type NavItem = {
  href: string
  label: string
  description?: string
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
export const siteTagline = 'Open-source products, hosted systems, and technical consulting.'
export const docsHref = 'https://docs.sonicverse.eu'

export const mainNavItems: NavItem[] = [
  {
    href: '/products',
    label: 'Products',
    description: 'Products and libraries in the Sonicverse stack.',
  },
  {
    href: '/open-source',
    label: 'Open Source',
    description: 'Public building blocks, release signals, and contribution posture.',
  },
  {
    href: '/hosting',
    label: 'Hosting',
    description: 'Managed production operations around Sonicverse software.',
  },
  {
    href: '/consulting',
    label: 'Consulting',
    description: 'Architecture, implementation, and systems work.',
  },
  {
    href: '/projects',
    label: 'Projects',
    description: 'Selected work and implementation categories.',
  },
  { href: '/about', label: 'About', description: 'Why Sonicverse exists and how it works.' },
  {
    href: '/journal',
    label: 'Journal',
    description: 'Blog, changelog, and roadmap in one public layer.',
  },
]

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: 'Product Surface',
    links: [
      {
        href: '/products',
        label: 'Products',
        description: 'Flagship products, supporting libraries, and the ecosystem around them.',
      },
      {
        href: '/open-source',
        label: 'Open Source',
        description: 'How Sonicverse ships, maintains, and evolves work in public.',
      },
      {
        href: '/journal',
        label: 'Journal',
        description: 'Writing, releases, and roadmap movement in one place.',
      },
    ],
  },
  {
    title: 'Commercial Paths',
    links: [
      {
        href: '/hosting',
        label: 'Hosting',
        description: 'Managed operations, performance, and reliability for production systems.',
      },
      {
        href: '/consulting',
        label: 'Consulting',
        description: 'Selective architecture and implementation support for complex software work.',
      },
      {
        href: '/contact',
        label: 'Start a Project',
        description: 'Bring the product shape, the current reality, and the next milestone.',
      },
    ],
  },
  {
    title: 'Trust Signals',
    links: [
      {
        href: '/projects',
        label: 'Projects',
        description: 'Applied work, product surfaces, and believable implementation proof.',
      },
      {
        href: '/security',
        label: 'Security',
        description: 'Disclosure policy, operational posture, and direct reporting path.',
      },
      {
        href: '/roadmap',
        label: 'Roadmap',
        description: 'Structured direction and visible progress instead of opaque planning.',
      },
    ],
  },
]
