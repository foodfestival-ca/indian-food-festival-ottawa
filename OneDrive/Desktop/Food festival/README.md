# Indian Food Festival of Ottawa 2026

Premium festival website — Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion.
Mobile-first. Three pages, four nav entries.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

> **Note:** the first `npm install` needs network access to fetch Google Fonts metadata for `next/font`. Fonts are then self-hosted at build time — no runtime request to Google.

## Documents

| File | Purpose |
|---|---|
| `ARCHITECTURE-v3.md` | Approved information architecture, sitemap, section order, UX flows |
| `MOBILE-FIRST-SPEC.md` | Binding responsive, performance and accessibility rules |

## Project shape

```
app/            routes, global styles, sitemap, robots
components/
  ui/           Button, Container, Section, SectionHeader
  motion/       Reveal, RevealGroup, Counter, SmoothScroll
  ornament/     mandala, gold rule, ticket notch, brand icons
  layout/       Nav, Footer, StickyMobileCTA
  home/         Hero, Countdown, FactsBar   (sections 3–16 to come)
content/        ← single source of truth, Zod-validated
lib/            hooks, motion tokens, SEO + JSON-LD builders, .ics
public/media/   photography, foldered by category
```

## The one rule

**No copy or data lives in a component.** Everything comes from `content/`.
Changing the venue is a one-line edit in `content/festival.ts` that propagates to the hero, countdown, footer, JSON-LD, OG image and meta description simultaneously.

## Content status

| File | State |
|---|---|
| `festival.ts` | ✅ Complete |
| `dishes.ts` | ✅ Five flavours written — **please fact-check** |
| `marketplace.ts` | ✅ Five categories |
| `faq.ts` | ✅ Ten questions, feeds FAQPage schema |
| `journey.ts` | ✅ 2024 / 2025 / 2026 |
| `whyVisit.ts` · `experiences.ts` | ✅ Complete |
| `schedule.ts` | ⚠️ Placeholder programme — structure final, times indicative |
| `gallery.ts` | ⚠️ Empty manifest — awaiting photography |

## Adding photography

1. Drop files into `public/media/<category>/` — `food/`, `dance/`, `music/`, `cultural/`, `kids/`, `marketplace/`, `community/`, `highlights/`
2. Add entries to `content/gallery.ts` with real descriptive `alt` text (never a filename)
3. Set `feature: true` on images that earn full-bleed or 2× grid placement

Category is the folder. **Year is metadata, not a path** — the gallery navigates by category, not chronology.

## Design tokens

All tokens live in `app/globals.css` under `@theme`. Never hardcode a hex value in a component.

Contrast is documented inline. The important one: **saffron `#E8792B` is 3.1:1 on cream — large text and non-text UI only, never body copy.**

## Deferred

- Sections 3–16 (Phases 2–5)
- `/passport` and `/about` routes
- Gallery lightbox — 21st.dev Priority 2
- Hero video layer — 21st.dev Priority 1
- Newsletter / passport / contact API routes
- `opengraph-image.tsx`
