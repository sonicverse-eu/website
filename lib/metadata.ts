import type { Metadata } from "next";

import { siteName } from "./site-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && URL.canParse(process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://sonicverse.dev";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Open-source-native software systems`,
    template: `%s | ${siteName}`,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  description:
    "Sonicverse builds modern software systems, digital products, and open-source technology with calm technical ambition.",
  openGraph: {
    title: `${siteName} | Open-source-native software systems`,
    description:
      "Modern software systems, digital products, and open-source technology built with strong engineering taste.",
    url: siteUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Open-source-native software systems`,
    description:
      "Calm, modern product engineering and open-source technology built with intent.",
  },
};

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: pathname,
    },
    twitter: {
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
