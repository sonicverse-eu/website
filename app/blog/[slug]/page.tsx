import type { Metadata } from 'next'

import { getStaticSlugs } from '@/lib/content'

import { BlogDetailPageContent, getBlogDetailMetadata } from '../blog-detail-page'

export const dynamicParams = false

export async function generateStaticParams() {
  return getStaticSlugs('blog')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return getBlogDetailMetadata(slug)
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogDetailPageContent slug={slug} />
}
