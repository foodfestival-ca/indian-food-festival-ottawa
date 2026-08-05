# Mobile-First Specification
### Indian Food Festival of Ottawa 2026 — binding build rules

Mobile is the primary target, not a responsive afterthought. Every component is authored at 360px first and enhanced upward with `min-width` queries only. There is not a single `max-width` breakpoint in the codebase, which is the structural guarantee that desktop never comes first.

---

## 1. Breakpoints

| Token | Width | Device reality |
|---|---|---|
| *(base)* | **360px** | Small Android — the design baseline |
| `xs` | 360px | Galaxy A-series, older iPhone SE |
| `sm` | 428px | iPhone Pro Max, large Android |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / small laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

The nav switches from drawer to inline links at `lg`, not `md` — four nav entries plus a CTA don't fit comfortably at 768px, and a cramped nav bar is worse than a clean drawer.

---

## 2. Fluid typography

Every size is a `clamp()` interpolating between 360px and 1440px. No step changes, no per-breakpoint overrides.

```
--text-base : 16px → 17px
--text-lg   : 18px → 21px
--text-3xl  : 28px → 38px
--text-4xl  : 34px → 52px
--text-5xl  : 40px → 72px    (hero)
--text-6xl  : 46px → 96px
```

Two hard rules:

- **Body text never drops below 16px.** Below that, iOS Safari zooms the viewport on input focus — the single most common mobile UX defect on form-bearing sites.
- **`-webkit-text-size-adjust: 100%`** on `html`, which stops iOS inflating text when a phone is rotated to landscape.

---

## 3. Touch

- **44×44px minimum** on every interactive element, via the `tap-target` utility. WCAG 2.2 AA (2.5.8) only requires 24px; we hold the stricter Apple/Material figure.
- Button sizes clear it structurally: `sm` = 44px, `md` = 48px, `lg` = 54px.
- **8px minimum spacing** between adjacent targets.
- Hero CTAs are **full-width stacked on mobile**, inline from `sm`. Thumb-width beats elegance below 428px.
- No hover-only affordances anywhere. Every hover state has a tap or focus equivalent.
- `active:scale-[0.98]` on buttons gives immediate tactile feedback — mobile has no hover to confirm a press landed.

---

## 4. Safe areas — iPhone notch and Dynamic Island

```
viewport: { viewportFit: "cover" }     ← required, or every inset resolves to 0
```

| Surface | Treatment |
|---|---|
| Nav | `padding-top: var(--safe-top)` |
| Floating CTA | `bottom: calc(var(--safe-bottom) + 1rem)` |
| Footer | `padding-bottom: calc(var(--safe-bottom) + 5rem)` — clears the floating CTA |
| Body | `padding-inline: var(--safe-left) / var(--safe-right)` for landscape |
| Drawer | Safe insets on both top and bottom |

`maximumScale` is deliberately **not** set. Capping zoom fails WCAG 1.4.4 and is a common accessibility regression on festival sites.

---

## 5. Landscape

Phone landscape is short (~380px tall) and frequently forgotten.

- Hero uses `min-h-[100svh]`, not `100vh` — `svh` accounts for iOS browser chrome, so the CTA is never pushed below the fold.
- Hero vertical padding is fluid and collapses in landscape.
- The mobile drawer scrolls internally rather than overflowing.
- Body honours `safe-left` / `safe-right`, which is where the notch actually sits in landscape.

---

## 6. Performance — Lighthouse mobile 95+

Budget on a simulated mid-tier Android over 4G:

| Metric | Target |
|---|---|
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |
| Total JS | < 180KB gzipped |

Measures already in the codebase:

- **Server Components by default.** Only genuinely interactive leaves carry `"use client"`: Nav, Countdown, Hero, StickyMobileCTA, Counter, Reveal, SmoothScroll. `FactsBar` and `Footer` ship zero client JS.
- **`content-visibility: auto`** on every section (`cv-auto`). With 16 sections on one page, off-screen sections skip layout and paint entirely — the single biggest win on low-end Android.
- **Self-hosted fonts** via `next/font`. No render-blocking request to Google, and `adjustFontFallback` matches fallback metrics so CLS stays at zero.
- **Smooth scroll is desktop-only.** Lenis is disabled on `(pointer: coarse)`. Mobile browsers already have excellent native scroll physics; hijacking them costs frames and breaks pull-to-refresh and browser-chrome auto-hide.
- **rAF-coalesced scroll listeners**, passive, with a single shared hook rather than one listener per component.
- **Countdown pauses when the tab is hidden** and ticks once per minute (not per second) under reduced motion.
- **AVIF/WebP** with device sizes starting at 360px, so a phone never downloads a desktop-width image.
- Hero video: `preload="none"` behind a poster, and suppressed entirely on coarse pointer + reduced motion so phones on cellular never pay for it.

---

## 7. Accessibility — WCAG 2.2 AA

- Contrast verified: ink 13.1:1, maroon 11.4:1, ink-muted 5.4:1 on cream. **Saffron is 3.1:1 — large text and non-text UI only, never body copy.** Recorded as a comment in `globals.css` so it can't be misused later.
- Focus rings are gold, 3px, offset 3px, and **never removed**.
- Skip-to-content link, focusable and visible.
- Drawer: `aria-expanded`, `aria-controls`, Escape to close, body-scroll lock.
- **Countdown seconds are `aria-hidden`.** A live region ticking every second is genuinely unusable with a screen reader.
- **Counters expose the final value** to assistive tech, not the intermediate animation frames.
- Schedule categories carry icon + label, never colour alone (1.4.1).
- All ornament SVGs are `aria-hidden` — they carry no information.
- `prefers-reduced-motion` is a global kill switch in CSS *and* a per-component branch in JS. Reveals collapse to a no-op rather than merely shortening.

---

## 8. Per-section responsive intent

| Section | Mobile (360) | Tablet (768) | Desktop (1024+) |
|---|---|---|---|
| **Hero** | 1 col, centred, CTAs stacked full-width, countdown below | Wider measure, CTAs inline | 2 col — narrative left, countdown panel right |
| **Countdown** | 4 units across, ~68px each | Larger digits, more gutter | Panel with ticket notches |
| **Facts Bar** | **2 cols** — 4 would crush labels | 4 cols | 5 cols with Memories inline |
| **Why Visit** | 1 col stack | 2 col bento | 3 col bento, wide cards span 2 |
| **Flavours** | Scroll-snap carousel, 1 card | 2 col grid | 5 staggered editorial cards |
| **Marketplace** | Horizontal scroll-snap rail | 2 col | Asymmetric editorial grid |
| **Gallery** | 1 col + swipe, filter rail scrolls horizontally | 2 col masonry | 3 col masonry + full-bleed features |
| **Lightbox** | Full-screen, swipe, pinch-zoom, 44px controls | Same + arrows | Keyboard-first, shared-layout transition |
| **Schedule** | Stacked cards, day tabs scroll horizontally | Timeline with time gutter | Full timeline, sliding tab indicator |
| **Venue** | Map below content, click-to-load | Side by side | 2 col with large map |
| **Footer** | 1 col stacked | 3 col | 3 col + wide brand block |

---

## 9. Forms — mobile keyboards

Every input declares the right keyboard so the correct one appears on first tap:

| Field | `type` | `inputMode` | `autoComplete` |
|---|---|---|---|
| Email | `email` | `email` | `email` |
| Name | `text` | `text` | `name` |
| Phone | `tel` | `tel` | `tel` |
| Postal code | `text` | `text` | `postal-code` |
| Message | `textarea` | `text` | — |

Plus: `enterKeyHint` on the final field, 16px minimum font size, labels always visible (never placeholder-only), errors adjacent to the field rather than collected at the top, and `autoCapitalize="off"` on email.

---

## 10. Verification checklist — run before each phase is called done

- [ ] 360 · 428 · 768 · 1024 · 1440 · 1920 widths
- [ ] Phone landscape (844×390)
- [ ] iPhone with Dynamic Island — safe areas respected
- [ ] Keyboard-only walkthrough, including lightbox and drawer
- [ ] Screen reader pass on nav, countdown, forms
- [ ] `prefers-reduced-motion: reduce` enabled
- [ ] Throttled to mid-tier mobile CPU + 4G
- [ ] Lighthouse mobile ≥ 95 on all four categories
- [ ] axe-core: zero violations
- [ ] No horizontal scroll at any width
