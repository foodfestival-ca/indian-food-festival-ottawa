/**
 * ══════════════════════════════════════════════════════════════════
 *  Single source of truth for social profile URLs.
 * ══════════════════════════════════════════════════════════════════
 *
 * Every Instagram icon/link anywhere on the site (Footer, Contact, About —
 * About's social block is Contact.tsx, merged into that page — and any
 * future shared SocialLinks component) must import `SOCIAL_URLS.instagram`
 * from here rather than hardcoding the URL. `content/festival.ts`'s
 * `social.instagram` also resolves from this constant, so there is exactly
 * one literal string for the Instagram URL in the whole codebase.
 */
export const SOCIAL_URLS = {
  instagram: "https://www.instagram.com/theindianfoodfestival/",
} as const;
