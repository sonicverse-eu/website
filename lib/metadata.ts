import type { Metadata } from 'next'

import { siteName } from './site-data'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && URL.canParse(process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://sonicverse.eu'

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Open-source Products, Hosting, and Consulting`,
    template: `%s - ${siteName}`,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  description:
    'Sonicverse builds open-source products, supports them in production, and helps teams shape stronger software systems.',
  openGraph: {
    title: `${siteName} - Open-source Products, Hosting, and Consulting`,
    description:
      'Sonicverse builds open-source products, supports them in production, and helps teams shape stronger software systems.',
    url: siteUrl,
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Open-source Products, Hosting, and Consulting`,
    description:
      'Sonicverse builds open-source products, supports them in production, and helps teams shape stronger software systems.',
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
