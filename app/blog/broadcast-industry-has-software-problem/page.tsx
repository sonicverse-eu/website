import type { Metadata } from 'next'

import { BlogDetailPageContent, getBlogDetailMetadata } from '../blog-detail-page'

const slug = 'broadcast-industry-has-software-problem'

export async function generateMetadata(): Promise<Metadata> {
  return getBlogDetailMetadata(slug)
}

export default async function BroadcastIndustryHasASoftwareProblemPage() {
  return <BlogDetailPageContent slug={slug} />
}
