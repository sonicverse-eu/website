import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { ThemeProvider } from '@/components/theme-provider'
import { baseMetadata } from '@/lib/metadata'

import './globals.css'

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={mono.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ofv2hls.css" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
