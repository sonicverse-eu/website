const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [['remark-frontmatter'], ['remark-mdx-frontmatter']],
    rehypePlugins: [],
    providerImportSource: null,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)
