import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/passport`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/schedule`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/venue`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/vendor`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sponsors`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    // /about now also carries Contact (merged); /venue now also carries
    // FAQs (merged). /contact and /faqs are redirect-only routes and are
    // deliberately not listed here.
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
