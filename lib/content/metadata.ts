import type { Metadata } from "next";

import { siteName } from "@/lib/site-data";

type ContentMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  publishedAt?: string;
};

export function contentMetadata({
  title,
  description,
  pathname,
  publishedAt,
}: ContentMetadataInput): Metadata {
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
      type: "article",
      publishedTime: publishedAt,
    },
    twitter: {
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
