# Logo Integration Report

Official lockup integrated. No redesign, no palette change, no typography change.

---

## Source processing

Both supplied files were 1920×1080 with the mark centred in a large transparent field — unusable as-is (the actual artwork occupied 11% of the canvas). Processing applied:

1. **Trimmed** to the alpha bounding box → **442 × 483** (ratio 0.9151)
2. **Ink colours sampled:** orange `#EE4D2C`, amber `#ED8D0B`
3. **Cream colourway derived** by alpha-mask recolour from the orange master — see contrast table below
4. **Optimised PNG** with alpha preserved (~24 KB each); `next/image` handles AVIF/WebP negotiation and per-breakpoint resizing at request time

---

## Where the logo appears

| Location | Variant | Height | Notes |
|---|---|---|---|
| **Desktop header** | orange | 64px | `priority` — above the fold, preloaded |
| **Mobile header** | orange | 44px | Same component, stepped down |
| **Mobile drawer** | orange | 72px | Decorative; nav links follow |
| **Footer** | **cream** | 92 / 108px | Maroon ground |
| **Favicon** (`app/icon.png`) | cream on maroon tile | 512px | Auto-served by Next.js |
| **Apple touch icon** | cream on maroon tile | 180px | Auto-served |
| **Organization JSON-LD** | orange | — | `logo` now points at the real asset |

**Removed:** the placeholder star SVG and the temporary `IFFO.` wordmark in the header, plus `shortName: "IFFO"` in `content/festival.ts`. **Zero "IFFO" references remain in code.**

---

## Which version on which background — and why

Measured contrast (WCAG; non-text UI needs ≥ 3:1):

| Colourway | On cream `#FDF8F0` | On maroon `#6B1028` |
|---|---|---|
| **Orange `#EE4D2C`** | **3.46:1** ✅ *chosen for light* | 3.31:1 ⚠ passes but muddy — red on maroon |
| Amber `#ED8D0B` | 2.36:1 ❌ fails | 4.86:1 ✅ |
| **Cream `#FDF8F0`** *(derived)* | — | **11.48:1** ✅✅ *chosen for dark* |

**Light backgrounds → orange.** It's the primary brand colourway and the only supplied version that clears 3:1 on cream. Amber fails at 2.36:1 and would look washed out on the header.

**Dark maroon → cream.** Worth explaining, since it isn't one of the two files you sent. Amber does technically pass on maroon at 4.86:1, but warm-orange on warm-maroon vibrates optically and reads as a colour clash rather than a deliberate choice. The cream version — generated from your orange master by swapping RGB while preserving the exact alpha mask, so the artwork is untouched — sits at 11.48:1 and matches the cream typography already in the footer.

**Amber is retained** at `public/brand/logo-amber.png`. If you'd rather use your supplied file on dark grounds, it's a one-word change: `variant="cream"` → `variant="amber"` in `Footer.tsx`.

---

## Technical handling

- **Never stretched.** `Logo.tsx` derives width from height using the intrinsic 0.9151 ratio. Width is not settable — it's structurally impossible to distort.
- **Zero CLS.** Explicit `width` and `height` on every instance, so the box is reserved before the image loads.
- **Accessibility.** Header logo carries `alt="Indian Food Festival of Ottawa — Navatara Inc."`. Footer and drawer instances are `alt=""` + `aria-hidden` because adjacent text already names the festival — otherwise a screen reader hears the name three times in a row. Keyboard nav and focus rings unchanged.
- **Performance.** Header instance is `priority`; everything else lazy-loads. `sizes` is pinned to the rendered width so no oversized variant is ever fetched.

### One layout change, and why it was necessary

Nav height went **64 → 72px** (mobile) and **88 → 96px** (desktop).

Your lockup is a five-line stacked wordmark. In a 64px bar, the maximum safe height after clear space was ~44px — at which "NAVATARA'S / indian / FOOD / festival / of OTTAWA" is not legible. The 8px increase buys enough height to read while keeping the mark subordinate to the nav links and CTA. Nothing else moved; `--nav-h` is a token and every dependent offset recalculated automatically.

---

## Recommendations

**1. Supply an SVG master — highest value.** PNG is the one real compromise here. At 442×483 the raster is sharp at every size currently used, but SVG would be ~4 KB instead of 24 KB, infinitely crisp, and recolourable in CSS without generating separate files. If you have the original Illustrator artwork, an SVG export removes three PNGs from the build.

**2. Commission a horizontal lockup for the header.** This is a design recommendation rather than a technical one. A tall stacked mark is working against a horizontal nav bar — it either shrinks until the small type is illegible, or it forces the header taller than it should be. A one- or two-line horizontal variant would sit properly at 40–48px and let the header return to 64px. Most festival brands maintain both.

**3. Consider a standalone icon mark.** The favicon currently places the cream lockup on a maroon tile — legible and on-brand, but a purpose-built glyph would read far better at 16px. A single letterform or a simplified device from the existing artwork would do it.

**4. Confirm the cream colourway.** It's derived, not supplied. The alpha mask is pixel-identical to your orange file, so the artwork is unaltered — but you may want brand sign-off on using a cream version at all.

---

## Files added

```
public/brand/logo-orange.png    24 KB   light grounds
public/brand/logo-amber.png     24 KB   supplied alternate, unused by default
public/brand/logo-cream.png     22 KB   dark grounds (derived)
app/icon.png                    84 KB   favicon, auto-served
app/apple-icon.png              24 KB   apple touch icon
components/ui/Logo.tsx                  single integration point
```

Modified: `Nav.tsx`, `Footer.tsx`, `globals.css` (nav height token only), `jsonld.tsx` (logo URL), `festival.ts` (shortName).
Nothing outside logo integration was touched.
