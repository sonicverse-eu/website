import type { Metadata } from 'next'

import { siteName } from './site-data'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && URL.canParse(process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://sonicverse.eu'

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - OSS for Independent Media`,
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
    'Sonicverse builds innovative software for independent media. Always open-source, thoughtfully designed, and engineered with care.',
  openGraph: {
    title: `${siteName} - OSS for Independent Media`,
    description:
      'Sonicverse builds innovative software for independent media. Always open-source, thoughtfully designed, and engineered with care.',
    url: siteUrl,
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - OSS for Independent Media`,
    description:
      'Sonicverse builds innovative software for independent media. Always open-source, thoughtfully designed, and engineered with care.',
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
