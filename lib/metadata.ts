import type { Metadata } from 'next'

import { siteName } from './site-data'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && URL.canParse(process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://sonicverse.tech'

const baseDescription =
  'Sonicverse is the open broadcast stack — open-source playout, scheduling, streaming, and station tooling, built by broadcasters and developers.'
const baseTitle = `${siteName} - The Open Broadcast Stack`

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: baseTitle,
    template: `%s - ${siteName}`,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  description: baseDescription,
  openGraph: {
    title: baseTitle,
    description: baseDescription,
    url: siteUrl,
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseTitle,
    description: baseDescription,
  },
}

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: `${title} - ${siteName}`,
      description,
      url: pathname,
    },
    twitter: {
      title: `${title} - ${siteName}`,
      description,
    },
  }
}
