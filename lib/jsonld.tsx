import { festival } from "@/content/festival";
import { faqs } from "@/content/faq";
import { SITE_URL } from "@/lib/seo";

/**
 * Structured data. The single highest-leverage line here is the Offer with
 * price 0 — it is what makes Google surface "Free" in the event rich result,
 * and free admission is this festival's strongest differentiator.
 */

export function eventJsonLd() {
  const v = festival.venue;
  return {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: festival.name,
    description: `${festival.subheading}. ${festival.dateLabel} at ${v.name}, Ottawa. Free admission.`,
    startDate: festival.startsAt,
    endDate: festival.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: SITE_URL,
    image: [`${SITE_URL}/opengraph-image`],
    location: {
      "@type": "Place",
      name: v.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: v.street,
        addressLocality: v.city,
        addressRegion: v.regionCode,
        postalCode: v.postalCode,
        addressCountry: v.countryCode,
      },
      geo: { "@type": "GeoCoordinates", latitude: v.lat, longitude: v.lng },
    },
    offers: {
      "@type": "Offer",
      price: festival.admissionPrice,
      priceCurrency: festival.currency,
      availability: "https://schema.org/InStock",
      url: SITE_URL,
      validFrom: "2026-01-01T00:00:00-05:00",
    },
    organizer: {
      "@type": "Organization",
      name: festival.organizer.name,
      url: festival.organizer.url,
    },
    isAccessibleForFree: true,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: festival.organizer.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-orange.png`,
    email: festival.organizer.email,
    founder: festival.organizer.founders.map((name) => ({ "@type": "Person", name })),
    sameAs: [
      festival.social.instagram,
      festival.social.facebook,
      festival.social.youtube,
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: festival.name,
    url: SITE_URL,
    inLanguage: "en-CA",
  };
}

/** Renders a JSON-LD block. Server component — zero client JS. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from local typed data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
