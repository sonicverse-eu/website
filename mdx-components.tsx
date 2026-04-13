import type { MDXComponents } from 'mdx/types'

import { mdxComponents } from '@/components/content/mdx-components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}
