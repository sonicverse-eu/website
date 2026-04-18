import type { Metadata } from 'next'
import { IBM_Plex_Mono, Manrope, Sora } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { SiteBackdrop } from '@/components/site/shell/site-backdrop'
import { ThemeProvider } from '@/components/theme-provider'
import { baseMetadata } from '@/lib/metadata'

import './globals.css'

const sans = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const display = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading-display',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-data',
  weight: ['400', '500'],
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteBackdrop />
          <div className="site-shell">
            <Header />
            <main id="content" className="relative z-10 flex-1 pt-5">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
