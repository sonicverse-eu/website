import {
  docsHref,
  footerNavGroups,
  mainNavItems,
  siteName,
  siteTagline,
  type FooterNavGroup,
  type NavItem,
} from './site-data/navigation'
import {
  collaborationPrompts,
  commercialTracks,
  companyPrinciples,
  contactFaq,
  technicalStandards,
} from './site-data/marketing'
import { openSourceLibraries, openSourcePrinciples } from './site-data/open-source'
import { featuredProducts, productSignals } from './site-data/products'
import { featuredProjects, projectFitSignals } from './site-data/projects'
import { trustSignals, trustStatements } from './site-data/trust'

export {
  collaborationPrompts,
  commercialTracks,
  contactFaq,
  docsHref,
  featuredProducts,
  footerNavGroups,
  mainNavItems,
  openSourcePrinciples,
  productSignals,
  projectFitSignals,
  siteName,
  siteTagline,
  technicalStandards,
  trustSignals,
  trustStatements,
  type FooterNavGroup,
  type NavItem,
}

export const navItems = mainNavItems
export const principles = companyPrinciples
export const openSourceProjects = openSourceLibraries

export const serviceAreas = [
  {
    title: 'Commercial hosting',
    description: 'Managed operations, performance stewardship, and support for production systems.',
    bullets: ['Managed deployments', 'Operational oversight', 'Performance tuning'],
  },
  {
    title: 'Technical consulting',
    description:
      'Architecture, implementation, and redesign work for teams shaping high-trust software.',
    bullets: ['Architecture reviews', 'Implementation support', 'System redesign'],
  },
  {
    title: 'Product surfaces',
    description: 'Marketing and application layers that need design-aware engineering quality.',
    bullets: ['Design systems', 'App Router builds', 'Accessible UI'],
  },
  {
    title: 'Platform foundations',
    description: 'Runtime, deployment, and system boundaries that keep software easier to evolve.',
    bullets: ['Edge-native deployments', 'Type-safe contracts', 'Performance budgets'],
  },
]

export const operatingModel = [
  {
    title: 'Direct collaboration',
    description: 'The people shaping the system stay close to the product and technical decisions.',
  },
  {
    title: 'Visible tradeoffs',
    description:
      'Important constraints and decisions are made explicit instead of hidden in process.',
  },
  {
    title: 'Long-term structure',
    description:
      'Architecture, release hygiene, and maintainability are treated as part of the product.',
  },
]

export const projectArchetypes = featuredProjects
export const repositorySignals = trustStatements
