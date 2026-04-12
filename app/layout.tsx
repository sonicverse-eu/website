import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ThemeProvider } from "@/components/theme-provider";
import { baseMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import "./globals.css";

const heading = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(heading.variable, body.variable, mono.variable)}
    >
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
  );
}
