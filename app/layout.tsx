import type { Metadata } from "next";
import {
  Instrument_Sans,
  JetBrains_Mono,
  Schibsted_Grotesk,
} from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Open Initiative",
    template: "%s | Open Initiative",
  },
  description:
    "A premium, dark-first Next.js starter for open-source initiatives and developer-facing programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${schibstedGrotesk.variable} ${jetbrainsMono.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-full flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
