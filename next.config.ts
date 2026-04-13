import withMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMdxConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [['remark-frontmatter'], ['remark-mdx-frontmatter']],
    rehypePlugins: [],
    providerImportSource: null,
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMdxConfig(nextConfig)
