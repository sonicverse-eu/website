export type ProductEntry = {
  name: string
  category: string
  description: string
  status: string
  href?: string
  tags: string[]
}

export const featuredProducts: ProductEntry[] = [
  {
    name: 'Sonicverse Platform',
    category: 'Flagship product',
    description:
      'The main Sonicverse operating surface for publishing, orchestration, and product-level systems.',
    status: 'Production-minded',
    tags: ['Product surface', 'Operations', 'Independent media'],
  },
  {
    name: 'Sonicverse Libraries',
    category: 'Open-source layer',
    description:
      'Composable libraries and building blocks extracted from real delivery work, maintained in public.',
    status: 'Maintained in public',
    tags: ['OSS', 'Components', 'Developer ergonomics'],
  },
  {
    name: 'Hosting Stack',
    category: 'Commercial infrastructure',
    description:
      'Managed deployment, runtime stewardship, and production support around Sonicverse software.',
    status: 'Commercially supported',
    tags: ['Hosting', 'Performance', 'Reliability'],
  },
  {
    name: 'Implementation Systems',
    category: 'Consulting offer',
    description:
      'Architecture and implementation support for teams shaping high-trust software systems.',
    status: 'Selective engagements',
    tags: ['Consulting', 'Architecture', 'Execution'],
  },
]

export const productSignals = [
  { value: 'OSS-first', label: 'Products and libraries built in public where possible.' },
  { value: 'Hosted', label: 'Commercial operations and stewardship for production use.' },
  {
    value: 'Readable',
    label: 'Documentation, release notes, and roadmap signals designed to be legible.',
  },
]
