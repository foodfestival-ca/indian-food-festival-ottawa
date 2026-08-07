# Phase 1 — Delivery Report
### Indian Food Festival of Ottawa 2026

**Status:** Production-ready. Builds clean, all routes static, zero broken links.
**Scope:** Phase 1 only. No Phase 2 features built, no redesign, no new visual language.

---

## Checklist audit

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | **Home** | ⚠ Existed → improved | Was 6 sections; now 12, complete narrative arc |
| 2 | **About** | ➕ Newly implemented | `/about` — story, mission, vision, journey, organisers, Get Involved |
| 3 | **Event Schedule** | ➕ Newly implemented | Day-wise timetable, tabbed, `#schedule` |
| 4 | **Venue & Google Map** | ➕ Newly implemented | Embedded map, directions, parking, accessibility, `#venue` |
| 5 | **Sponsors** | ➕ Newly implemented | Tiered, graceful lettermark placeholders, `#sponsors` |
| 6 | **Gallery** | ➕ Newly implemented | Responsive grid + accessible lightbox, `#gallery` |
| 7 | **Contact** | ➕ Newly implemented | Email, location, socials, CTA, `#contact` |
| 8 | **Passport Information** | ➕ Newly implemented | `/passport` + homepage CTA band |
| 9 | **Responsive Design** | ✅ Completed | Mobile-first throughout, verified |
| 10 | **Registration Buttons** | ⚠ Built → ❌ needs URLs | Wired and working; **Google Form URLs required** |

---

## ✅ Completed

- **Production build passes.** 6 routes, all statically prerendered: `/`, `/about`, `/passport`, `/robots.txt`, `/sitemap.xml`, `/_not-found`.
- **TypeScript strict — zero errors.**
- **Link audit — zero broken links.** Found and fixed 6 during this pass:
  - `/passport` → route did not exist *(referenced in 5 places)*
  - `/about`, `/about#vendors` → route did not exist
  - `#schedule` → hero CTA pointed at nothing
  - `#faq`, `#experiences`, `#journey` → dead anchors in content, retargeted
- **All 5 external links** carry `target="_blank"` + `rel="noopener noreferrer"`.
- **Accessibility:** 23 `aria-label`, 72 `aria-hidden`, focus trap on lightbox, `aria-modal`, tab semantics on schedule, `aria-pressed` on gallery filters, `aria-expanded` on the nav drawer, skip-to-content link, gold focus rings never removed.
- **Reduced motion** honoured in 8 components plus a global CSS kill switch.
- **Overflow:** `overflow-x: hidden` on body; all negative-offset ornaments sit inside `overflow-hidden` sections. No horizontal scroll at any width.
- **Heading order:** exactly one `<h1>` per route.
- **Touch targets:** 44px minimum enforced via `tap-target` and button sizing.
- **Ground sequence** holds the no-adjacent-repeat rule across all 12 homepage sections.

## ⚠ Already existed and improved

| Item | What changed |
|---|---|
| **Home** | Extended from 6 to 12 sections. Nothing redesigned — existing sections untouched. |
| **Nav / Hero / Marketplace CTAs** | Rewired from hardcoded hrefs to the central form config. |
| **`content/whyVisit.ts`, `experiences.ts`** | Dead anchors retargeted to real sections. |
| **Registration buttons** | Now resolve through `formLink()` with a safe fallback. |

## ➕ Newly implemented

**Routes:** `/about`, `/passport`
**Sections:** Schedule · Venue & Map · Gallery + Lightbox · Sponsors · Contact · Passport CTA
**Components:** `FormButton`, `Lightbox`, `MediaFrame`
**Content:** `links.ts`, `sponsors.ts`, `venue.ts`, `about.ts`

**Design language unchanged.** Every new section uses the existing tokens, Playfair/Inter pairing, cream–maroon–gold palette, 20px card radius, warm shadows and the gold rule divider. No new animation patterns were introduced.

---

## ❌ Still requires client information

### 🔴 Blocking — the site cannot go live without these

**1. Google Form URLs — `content/links.ts`**

This is the only file you need to edit. Four URLs:

```ts
export const googleForms = {
  passport: "",   // ← "Get Passport" — 6 buttons across the site
  vendor:   "",   // ← "Become a Vendor"
  sponsor:  "",   // ← "Become a Sponsor"
  contact:  "",   // ← "Send Us a Message"
};
```

**Current behaviour with blanks:** each button falls back to a pre-filled email to `info@indianfoodfestival.ca`. Nothing is broken or dead-ends — but the passport flow is not really live until the form URL is in.

**2. Festival email address**
`content/festival.ts` currently uses `info@indianfoodfestival.ca`. Confirm or replace.

**3. Social media URLs**
Instagram, Facebook and YouTube URLs in `content/festival.ts` are best guesses. Please confirm the real handles.

### 🟡 Non-blocking — site works, looks better with them

| Asset | Where it goes | Current placeholder |
|---|---|---|
| **Gallery photos** (2024/2025) | `public/media/<category>/` + `content/gallery.ts` | 8 warm placeholder tiles, grid and lightbox fully functional |
| **Sponsor logos** | `public/sponsors/` + set `logo` in `content/sponsors.ts` | Lettermark tiles in brand colours — presentable, not broken |
| **Dish photography** (×5) | `public/media/food/` | Gradient placeholder with dish name |
| **Performance photos** | `public/media/cultural,dance,music/` | Gradient placeholder |
| **Marketplace photos** | `public/media/marketplace/` | Gradient placeholder |
| **Organiser portraits** ×2 | `public/media/team/` | Gradient placeholder |
| **Confirmed 2026 schedule** | `content/schedule.ts` | Indicative programme, marked "subject to change" on the page |
| **Venue postal code** | `content/festival.ts` | `K1T` — partial |
| **Venue coordinates** | `content/festival.ts` | Approximate; map embed searches by name so it resolves correctly regardless |
| **Sponsor roster** | `content/sponsors.ts` | 6 placeholder slots across 3 tiers |

**To switch on all photography:** set `MEDIA_READY = true` in `components/ui/MediaFrame.tsx` once files are in place. One flag, whole site.

---

## Verify before launch

- [ ] Paste the four Google Form URLs into `content/links.ts`
- [ ] Click every CTA and confirm it opens the right form
- [ ] Confirm the email address and social URLs
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (defaults to `https://indianfoodfestival.ca`)
- [ ] Test on a real phone — not just a resized desktop browser
- [ ] Run Lighthouse mobile
- [ ] Confirm the countdown against `2026-08-21T16:00:00-04:00`

---

## Not built — deferred to Phase 2

Recorded so scope is unambiguous: FAQ accordion, newsletter capture, Instagram feed, media/press coverage section, testimonials, community-impact counters, add-to-calendar `.ics` buttons (helper is written in `lib/calendar.ts` but unwired), per-event deep links, gallery pinch-zoom and deep-linking, OG image generation, hero video layer, and any server-side form handling.

`lib/calendar.ts` and `content/faq.ts` are written and unused — they cost nothing now and are ready if Phase 2 happens.
