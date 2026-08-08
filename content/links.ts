/**
 * ══════════════════════════════════════════════════════════════════
 *  CLIENT ACTION REQUIRED — paste your Google Form URLs below.
 *  This is the ONLY file you need to edit to wire up registration.
 * ══════════════════════════════════════════════════════════════════
 *
 * Leave a value as an empty string and the button still works: it falls back
 * to a pre-filled email to the festival address, so nothing on the live site
 * is ever broken or dead-ends. Replace with the real URL when ready.
 */

import { festival } from "@/content/festival";

export const googleForms = {
  /** "Get Passport" — every passport CTA across the site. Reserved via
   *  Eventbrite rather than a Google Form. */
  passport: "https://www.eventbrite.com/e/indian-food-festival-of-ottawa-2026-tickets-1992183332977",
  /** "Become a Vendor" — marketplace + about page. */
  vendor: "",
  /** "Become a Sponsor" — sponsors section. */
  sponsor: "",
  /** General contact / enquiry. */
  contact: "",
} as const;

export type FormKey = keyof typeof googleForms;

const FALLBACK_SUBJECTS: Record<FormKey, string> = {
  passport: "Festival Passport request",
  vendor: "Vendor enquiry",
  sponsor: "Sponsorship enquiry",
  contact: "General enquiry",
};

export interface ResolvedLink {
  href: string;
  /** True when no Google Form URL is set and we're using the email fallback. */
  isFallback: boolean;
  /** External links need target=_blank + rel. */
  external: boolean;
}

export function formLink(key: FormKey): ResolvedLink {
  const url = googleForms[key];
  if (url) return { href: url, isFallback: false, external: true };

  const subject = encodeURIComponent(
    `${FALLBACK_SUBJECTS[key]} — ${festival.name} ${festival.dateLabel}`
  );
  return {
    href: `mailto:${festival.organizer.email}?subject=${subject}`,
    isFallback: true,
    external: false,
  };
}

/** True only when every form URL has been filled in. Used by the audit script. */
export const ALL_FORMS_CONFIGURED = Object.values(googleForms).every(Boolean);
