import type { Metadata } from "next";
import { festival } from "@/content/festival";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://indianfoodfestival.ca";

interface PageMetaArgs {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/** Per-route metadata builder. Keeps OG/Twitter/canonical consistent
 *  so no page can silently ship without them. */
export function pageMeta({ title, description, path = "/", image }: PageMetaArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: festival.name,
      title,
      description,
      url,
      locale: "en_CA",
      images: [{ url: ogImage, width: 1200, height: 630, alt: festival.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
