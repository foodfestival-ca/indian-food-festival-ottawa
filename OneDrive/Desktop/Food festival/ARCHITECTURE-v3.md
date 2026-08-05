# Indian Food Festival of Ottawa 2026
## Information Architecture — v3 (refinement of v2)

**Status:** Awaiting approval. No code written.
**Scope:** Targeted refinement. The v2 philosophy — Thali Principle, five-act narrative, Passport-first conversion, scroll-depth discipline — is unchanged. Ten changes applied below.

---

## 0. Status board

| | |
|---|---|
| Project folder | ✅ Connected — `Desktop/Food festival`, writable, Node 22 |
| 21st.dev MCP | ✅ Live — 2 code retrievals/day (Hero P1, Gallery Lightbox P2) |
| UI/UX Pro Max | ✅ Installed and queried |
| Design reference | ✅ Homepage screenshot |
| Content brief | ❌ Not received |
| Influencer media kit | ❌ Not received |
| Photographs | ❌ Not received |
| Videos | ❌ Not received |

The folder is empty. Points 3 and 5 below (Featured Flavours, Gallery) are the most asset-hungry parts of the build — I can construct both engines and write all the copy, but the photography is what makes them land.

---

## 1. Pages — resolved

You offered two shapes. Neither quite works as given, because **Get Involved must also fit inside the 3-page limit.** Here's the resolution:

```
/                Home
/passport        Festival Passport
/about           Our Story  ·  and  ·  Get Involved
```

**Three pages. Four nav entries.**

```
Home  |  About  |  Get Involved  |  Passport        [ Get Passport ]
                        ↓
        both point to /about, at different anchors
        /about   and   /about#get-involved
```

**Why this beats both of your options.** "About & Contact" as a single label undersells the commercial half — a sponsor doesn't click "About". "Home / About / Passport" leaves vendor, sponsor and media enquiries homeless. Splitting the *navigation* while merging the *page* gives every visitor an intuitive door — a curious visitor clicks About, a sponsor clicks Get Involved — while the client's 3-page ceiling holds.

It also reads as one coherent narrative when scrolled top to bottom: *this is who we are* → *this is how you join us*. The commercial ask is earned by the story that precedes it, which is strictly better than a cold partnerships page.

### `/partner` is retired
Renamed **Get Involved**, per your instruction, and absorbed into `/about`. It keeps everything: Vendor Information, Sponsor Information, Media & Creator Collaboration, General Contact, Map, Social Links.

---

## 2. Final sitemap

```
/                                    Home — 16 sections, five acts
├── #why-visit  #flavours  #performances  #marketplace
├── #experiences  #gallery  #journey  #media
├── #schedule  #venue  #faq  #sponsors
│
/passport                            Festival Passport
│
/about                               Our Story
└── #get-involved                    Vendors · Sponsors · Media · Contact
    ├── #vendors   #sponsors   #media   #contact

Non-page surfaces (depth without navigation cost):
   Gallery Lightbox    full-screen, category-filtered, deep-linkable
   Schedule Timeline   day-switchable, deep-linkable
   Press Kit           direct download, /about#media
```

---

## 3. Homepage section order — updated

Five acts retained. Marketplace promoted to its own section, Food expanded into the page's centrepiece.

### ACT I — DESIRE *(0–15%)*

**1 · Hero** `[21st P1]`
Cinematic video, poster fallback. "Tastes Like India, Feels Like Home."
Date · Clarke Fields Park · **FREE**.

> **CTA hierarchy — updated per §6 of your brief**
> **① Get Passport** — saffron solid, primary weight
> **② View Schedule** — maroon outline
> **③ Explore Festival** — ghost/text with arrow
>
> This is the right call. v2 led with "Explore Festival", which is a non-committal verb pointing at a scroll. Leading with the Passport aligns the loudest pixel on the page with the only real conversion the site has.

**2 · Countdown + Facts Bar**
Ticket-notch panel, per the reference. See §7 for countdown behaviour.

### ACT II — TASTE *(15–45%)*

**3 · Why Visit** — bento grid of six, anchoring to sections below. Doubles as in-page contents for scanners.

**4 · Featured Indian Flavours** ⭐ *the page's visual highlight*
Expanded from a generic food section. Detail in §4 below.

**5 · Live Performances** — video-forward. Music and dance.

**6 · The Marketplace** ⭐ *new dedicated section*
Detail in §5 below.

**7 · More Than Food** — Kids Zone, Culture, Community as three editorial cards. Marketplace has moved out to §6, so this section tightens rather than bloats.

### ACT III — BELIEVE *(45–62%)*

**8 · Gallery** `[21st P2]` — category-driven. Detail in §6 below.

**9 · Festival Journey** — 2024 → 2025 → 2026, scroll-linked horizontal timeline.

**10 · Media & Voices** — CBC and CTV coverage, attendee testimonials. `NEEDS_ASSET`

> **Fold-50 line.** Everything above stands alone as a complete pitch.

### ACT IV — PLAN *(62–82%)*

**11 · Schedule** — interactive three-day timeline, add-to-calendar per event.
**12 · Venue** — map, directions, parking, timings.
**13 · FAQ** — accordion, and the source for FAQPage structured data (§9).

### ACT V — ACT *(82–100%)*

**14 · Passport CTA** — full-bleed maroon, loudest moment on the page.
**15 · Sponsors + Get Involved CTA** — showcase doubling as the B2B doorway.
**16 · Instagram · Newsletter · Footer**

### Pacing discipline

Sixteen sections risks scroll fatigue. Three controls:

1. **Alternating heights** — never two tall immersive sections in a row. Facts Bar, Media, FAQ and Sponsors are compact bands; Flavours, Gallery and Venue are tall.
2. **Alternating grounds** — the Thali rule from v2 holds: no two adjacent sections share a background.
3. **Why Visit as escape hatch** — anyone unwilling to scroll linearly jumps from §3 to whatever they came for.

---

## 4. Featured Indian Flavours — the centrepiece

**Concept: *Five Dishes, Five States, One Plate.***

Not a food gallery. A geography lesson disguised as one. Each card carries a dish, its home region, and a two-sentence story — turning "there's Indian food" into "there is *this specific thing, from this specific place, and here is why it exists.*" That's the difference between a food festival and a food *experience*, and it's the single strongest use of the tagline *Where Every Bite Tells a Story.*

### The five cards

| Dish | Region | The story |
|---|---|---|
| **Jigarthanda** | Madurai, **Tamil Nadu** | Chilled milk, almond gum and nannari root syrup, crowned with ice cream. The name means "cool heart" — Madurai's answer to a 40°C afternoon, sold on the same street corners for generations. |
| **Dabeli** | Kutch, **Gujarat** | Spiced potato pressed into a soft pav with pomegranate, roasted peanuts and a crackle of sev. Born in Mandvi in the 1960s and carried across India by Kutchi families — sweet, sharp and hot in the same bite. |
| **Punugulu** | Coastal **Andhra Pradesh** | Golden fritters spooned from fermented dosa batter into hot oil — crisp shell, cloud-soft centre. The snack Vijayawada eats standing up, in the rain, with coconut chutney. |
| **Methi Na Gota** | Ahmedabad, **Gujarat** | Fenugreek leaves in a spiced chickpea batter, fried into fat golden clouds. A monsoon and kite-festival ritual: eaten hot, in company, with fried chillies on the side. |
| **Varan Batti** | Vidarbha, **Maharashtra** | Wheat dough roasted into dense golden battis, broken by hand into simple toor dal and drowned in ghee. Farmhouse food — nothing decorative about it, which is the point. |

### Design treatment

- **Editorial cards, not a grid.** Large food photograph, region as a small-caps gold eyebrow, dish name in Playfair display, two-line story in Inter. Hover: 1.04 image scale, maroon veil lift, story fades up.
- **Stagger the layout** — cards 1, 3, 5 sit slightly higher than 2 and 4. A flat five-across row is exactly the generic treatment we're avoiding.
- **A regional motif, not a political map.** ⚠️ Deliberate call: no accurate outline map of India. Border depictions carry real legal and political sensitivity, and a festival site has nothing to gain by wading in. Instead an abstract mandala-compass ornament with the five region names on gold radial rules — prettier, on-brand, and risk-free.
- **Extensible.** Five cards ship; the component reads from `content/dishes.ts`, so a sixth is a data entry, not a code change.
- **Newcomer guidance** — a quiet "First time? Start with Dabeli" line. Removes the single biggest barrier for a non-Indian visitor: not knowing where to begin.

`NEEDS_ASSET:` five hero dish photographs. This section lives or dies on them.

---

## 5. The Marketplace — new dedicated section

**Positioning: *More Than a Meal.*** The message is that a visit is an afternoon, not a lunch — which lifts dwell time on the day and gives non-food-motivated visitors a reason to come.

Five categories:

- **Local Businesses** — Ottawa's Indian-owned shops and makers
- **Handcrafted Products** — textiles, jewellery, home goods
- **Accessories** — bangles, bags, adornment
- **Apparel** — sarees, kurtas, festival wear
- **Community Vendors** — non-profits, cultural associations, local collectives

**Treatment:** horizontal scroll-snap rail on mobile, asymmetric editorial grid on desktop. Warm, tactile photography — hands, textiles, close crops. A "Become a Vendor" link to `/about#vendors`, which quietly makes this section commercially useful as well as decorative.

`NEEDS_ASSET`

---

## 6. Gallery — category-driven

**Changed per §5 of your brief.** Years no longer drive navigation.

**Filter rail** (sticky through the section):

```
Highlights · Food · Cultural Performances · Music · Dance
Kids Zone · Marketplace · Community · Videos
```

**Years become storytelling, not structure.** They survive as: caption metadata on each image (`Marketplace · 2025`), an optional secondary year toggle inside the lightbox, and the Festival Journey section (§9) which is *explicitly* chronological — that's where 2024 vs 2025 belongs.

Why this is better: a visitor thinks *"show me the dancing"*, never *"show me 2024."* v2's year-first navigation asked the user to organise by the festival's internal calendar rather than their own curiosity.

**Structure:** full-bleed parallax feature → masonry cluster → editorial pair with pull-quote → video feature → triptych. No two consecutive blocks share a layout.

**Lightbox** `[21st P2]`: full-screen portal, arrow/Esc/Home/End keys, swipe, pinch and double-tap zoom with pan, caption and counter, focus trap, `aria-modal`, body-scroll lock, adjacent preload, deep-linkable (`/#gallery?c=dance&i=7`), restores scroll position on close.

---

## 7. Countdown — dynamic, timezone-correct

**Target:** `2026-08-21T16:00:00-04:00` — August 21, 2026, 4:00 PM, Ottawa (America/Toronto, EDT).

Anchoring to a fixed UTC offset is essential: a visitor in Mumbai must see the countdown to *Ottawa's* 4 PM, not their own. This is the most common bug in event countdowns.

**Four states, handled automatically:**

| State | Condition | Display |
|---|---|---|
| **Counting** | now < Aug 21, 4:00 PM | `128 : 07 : 45 : 32` DAYS/HOURS/MINUTES/SECONDS |
| **Live** | Aug 21 4PM → Aug 23 6PM | Pulsing gold dot — "HAPPENING NOW · Sunday until 6 PM" |
| **Ended** | after Aug 23, 6:00 PM | "Thank you, Ottawa. See you in 2027." → newsletter CTA |
| **Reduced motion** | user preference | Static, updates each minute instead of each second |

**Implementation notes:** hydration-safe — server renders a static snapshot, the ticking interval starts after mount, so no SSR/client mismatch. Tabular numerals prevent digit-width jitter. `aria-live="off"` on the seconds digit; a screen reader announcing every second is torture. Interval cleared when the tab is hidden.

---

## 8. Mobile floating CTA

Appears once the hero leaves the viewport. Persists until the footer enters.

**Design:** pill, maroon ground, saffron ticket icon, "Get Passport". `bottom: calc(1rem + env(safe-area-inset-bottom))`, centred, ~90% width capped at 380px, soft maroon-tinted shadow, `backdrop-blur` so content reads through it. Enters with a 300ms fade-up, exits the same way.

**Restraint:** one dismissal, remembered for the session. Never covers a form field or the footer. Hidden entirely on `/passport` — the ask is already the page.

> ⚠️ **One change to your spec.** You wrote 🎟 as the icon. I'd use the **Lucide `Ticket`** SVG instead. Emoji render differently on every OS — Windows, iOS and Android each draw a different ticket, at different optical weights — which quietly undermines a premium build. It's also the first item on the UI/UX Pro Max pre-delivery checklist: *no emojis as icons.* Same meaning, consistent everywhere, colour-controllable.

---

## 9. SEO — expanded

### Structured data (JSON-LD)

| Schema | Where | Carries |
|---|---|---|
| **Event** | `/` | name, `startDate` 2026-08-21T16:00-04:00, `endDate` 2026-08-23T18:00-04:00, Place + geo for Clarke Fields Park, `Offer` price 0 CAD, `eventStatus`, `eventAttendanceMode`, organizer, images |
| **Organization** | all pages | Navatara Inc., logo, founders Bhakti Sheth & Sagar Vora, `sameAs` socials |
| **FAQPage** | `/` | generated from `content/faq.ts` — one source, no drift |
| **BreadcrumbList** | `/passport`, `/about` | Home › Page |
| **WebSite** | root | `SearchAction`, site name |

The **`Offer` with `price: 0`** is the highest-leverage line of markup on the site — it's what makes Google surface "Free" in the event rich result, and free admission is this festival's strongest differentiator.

### Metadata

- Per-route `title`, `description`, canonical
- **Open Graph** — `og:type=website`, 1200×630 images generated at build via `next/og`, per-page
- **Twitter** — `summary_large_image`, title, description, image
- `robots.ts`, `sitemap.ts` with `lastModified`
- Locale `en-CA`; geo meta for Ottawa

### Targets
Primary: *Indian food festival Ottawa*, *Ottawa Indian festival 2026*, *free festival Ottawa August*.
Long-tail via FAQ: *is the Indian Food Festival Ottawa free*, *Clarke Fields Park parking*, *kid friendly festivals Ottawa*.

Rich-result eligibility: Event card (dates, venue, **free**), FAQ accordion in SERP, sitelinks via breadcrumbs.

---

## 10. Page breakdown

### `/` — Home
16 sections, five acts. Sole `<h1>`. Event + FAQPage + Organization JSON-LD.

### `/passport` — Festival Passport
Hero with 3D-tilt passport artwork → What It Is → How It Works (four-step gold spine, SVG path drawing on scroll: **Claim → Visit → Check In → Win**) → Benefits → Prizes `NEEDS_ASSET` → **Claim form** (email + name only; every extra field costs completions) → Passport FAQ → sticky claim bar on mobile.

### `/about` — Our Story · Get Involved

**Act 1 — Our Story** *(`/about`)*
1. Hero — Navatara Inc., founded by Bhakti Sheth and Sagar Vora
2. The Story — how it began
3. Mission & Vision — paired cards
4. Our Journey — 2024 (10,000+ attendees, 30+ vendors) → 2025 (expanded, CBC & CTV) → 2026 (third edition)
5. Community Impact — animated counters
6. Meet the Organizers — portrait cards `NEEDS_ASSET`

**Act 2 — Get Involved** *(`/about#get-involved`)*
7. By The Numbers — the reach pitch: 15,000 attendees · 100+ vendors · CBC/CTV · 3 years
8. **Vendors** `#vendors` — booth tiers, what's included, application form
9. **Sponsors** `#sponsors` — packages, past sponsors, enquiry form
10. **Media & Creators** `#media` — press kit download, influencer collaboration, accreditation `NEEDS_ASSET: media kit`
11. **Contact** `#contact` — general form, email, social links
12. Map & directions

The transition between acts is a full-bleed maroon divider — a clear "you are now in a different conversation" signal, so the commercial half never feels smuggled in.

---

## 11. UX flows — updated

**F1 · Instagram → attendance** *(dominant path)*
IG bio → mobile hero → floating CTA appears → **Flavours** (the new hook — "wait, *Jigarthanda*?") → Gallery → Venue → **Passport claim.**

**F2 · Cold search → convert**
SERP Event rich result showing **Free** → hero → Why Visit → Flavours → FAQ → Passport.

**F3 · Returning attendee, festival week**
Direct → nav anchor → Schedule → Venue/parking. Countdown reads **HAPPENING NOW**.

**F4 · Vendor / sponsor**
Footer or nav "Get Involved" → `/about#get-involved` → By The Numbers → tiers → form. Lands mid-page but reads standalone.

**F5 · Journalist / creator**
`/about#media` → press kit download, ungated → accreditation form.

**F6 · Curious non-Indian visitor** *(new)*
Home → Flavours → "First time? Start with Dabeli" → FAQ (vegetarian? spice levels?) → Passport.
*This is the segment the original brief served worst, and Ottawa's largest available growth audience.*

---

## 12. Component hierarchy

```
app/layout.tsx ── <Nav> <Footer> <SmoothScroll> <StickyMobileCTA> JSON-LD

app/page.tsx ─ Home
├── <Hero>                    [21st P1]  media layer · Reveal headline · CTAs(1/2/3)
│   └── <CountdownPanel>      4 states · tz-locked · hydration-safe
├── <FactsBar>                <Counter> ×4
├── <WhyVisit>                <BentoCard> ×6 → anchors
├── <FeaturedFlavours>        ⭐ <DishCard> ×5 · <RegionMotif> · <FirstTimerTip>
├── <Performances>            <VideoCard> · <PerformerCard>
├── <Marketplace>             ⭐ <VendorCategoryCard> ×5 · <ScrollSnapRail>
├── <MoreThanFood>            <ExperienceCard> ×3  (Kids · Culture · Community)
├── <Gallery>                 [21st P2]
│   ├── <CategoryRail> <MasonryCluster> <FeatureParallax>
│   ├── <EditorialPair> <VideoCard> <Triptych>
│   └── <Lightbox>            portal · focus trap · swipe · zoom · deep-link
├── <JourneyTimeline>         <YearPanel> ×3 scroll-linked
├── <MediaVoices>             <PressLogo> · <Testimonial>
├── <ScheduleSection>         <DayTabs layoutId> <TimelineTrack> <EventCard> <AddToCalendar>
├── <VenueSection>            <MapEmbed lazy> <DirectionsCard> <ParkingCard> <HoursCard>
├── <FAQ>                     <Accordion> → feeds FAQPage JSON-LD
├── <PassportCTA>
├── <SponsorShowcase>         <SponsorTier> · <GetInvolvedCTA>
└── <SocialNewsletter>        <InstagramFeed> · <NewsletterForm>

app/passport/page.tsx
└── <PassportHero> <PassportMock3D> <StepSpine> <StepCard>×4
    <BenefitGrid> <PrizeShowcase> <ClaimForm> <PassportFAQ> <StickyClaimBar>

app/about/page.tsx
├── Act 1  <AboutHero> <StoryBlock> <MissionVision>
│          <JourneyTimeline shared> <ImpactStats> <OrganizerCard>×2
├──        <ActDivider>
└── Act 2  <ByTheNumbers> <VendorTiers> <SponsorTiers>
           <MediaKit> <ContactForm> <MapEmbed>

shared/
├── ui/        Button(primary|outline|ghost|onDark) · Card · Badge · Chip
│              Input · Accordion · SectionHeader · Container · Divider
├── motion/    FadeUp · ScaleIn · Parallax · Counter · Reveal
│              PageTransition · SmoothScroll
├── ornament/  MandalaCorner · GoldRule · DottedArc · PatternField
│              TicketNotch · RegionCompass
└── layout/    Nav(scroll-state · anchor-aware · 4 entries) · MobileDrawer
               StickyMobileCTA · Footer
```

**21st.dev swap contract — unchanged from v2.** Sections own layout, spacing, motion and tokens; interactive cores sit behind fixed prop interfaces. `<Lightbox>`: `{ items, index, onClose, onIndexChange }`. `<Hero>` media layer: `{ videoSrc, posterSrc, reducedMotion }`. Swapping a 21st component later means conforming it to the interface — never a section rewrite. This is what keeps the upgrade path open on a 2-retrieval/day budget.

---

## 13. Folder structure

```
Food festival/
├── app/
│   ├── layout.tsx · template.tsx · globals.css
│   ├── page.tsx                        Home
│   ├── passport/page.tsx
│   ├── about/page.tsx
│   ├── api/{passport,newsletter,vendor,sponsor,contact}/route.ts
│   ├── sitemap.ts · robots.ts · opengraph-image.tsx
│   └── manifest.ts
├── components/
│   ├── ui/ · motion/ · ornament/ · layout/
│   ├── home/          16 section components
│   ├── gallery/       rail · masonry · feature · video · lightbox
│   ├── passport/ · about/
├── content/                            ← single source of truth (Zod)
│   ├── festival.ts    dates · venue · hours · admission · socials · countdown target
│   ├── dishes.ts      ⭐ the five flavours
│   ├── marketplace.ts ⭐ five vendor categories
│   ├── performances.ts · experiences.ts
│   ├── schedule.ts · journey.ts · faq.ts
│   ├── sponsors.ts · testimonials.ts · media.ts
│   ├── organizers.ts · passport.ts · getInvolved.ts
│   └── gallery.ts     ← ASSET MANIFEST (category-keyed)
├── lib/
│   ├── motion.ts · cn.ts
│   ├── useCountdown.ts · useLightbox.ts · useMediaQuery.ts · useScrollState.ts
│   ├── seo.ts         metadata builders
│   ├── jsonld.ts      Event · Organization · FAQPage · BreadcrumbList · WebSite
│   └── calendar.ts    .ics generation
├── public/
│   ├── media/         photography — category-foldered, not year-foldered
│   ├── video/ · ornament/ · sponsors/ · press-kit/
└── README.md
```

Note `public/media/` is now **category-foldered** (`food/`, `dance/`, `marketplace/`…) to mirror the gallery's category-first navigation. Year lives in the manifest metadata, not the path.

---

## 14. Change log — v2 → v3

| # | Change | Rationale |
|---|---|---|
| 1 | About page restored; `/partner` retired | Client brief requires About. Merging Story + Get Involved keeps 3 pages while letting the commercial ask be earned by the story before it. |
| 2 | 3 pages, 4 nav entries | A sponsor won't click "About"; a visitor won't click "Partner". Splitting navigation while merging the page serves both without a fourth page. |
| 3 | Food → **Featured Indian Flavours**, 5 named regional dishes | Turns "there's Indian food" into five specific stories from five states. The strongest possible expression of *Where Every Bite Tells a Story*. |
| 4 | **Marketplace** promoted to its own section | Communicates that a visit is an afternoon, not a lunch — and gives non-food-motivated visitors a reason to attend. |
| 5 | Gallery: category-first, years demoted to metadata | Visitors think "show me the dancing", never "show me 2024". Chronology belongs in Journey, where it's the actual point. |
| 6 | Hero CTA reordered to Passport-first | Aligns the loudest pixel with the site's only real conversion. v2 led with a non-committal verb. |
| 7 | Countdown: 4 states, tz-locked to America/Toronto | Auto-expiry as requested, plus a Live state that makes the site useful *during* the festival — its highest-traffic moment. |
| 8 | Mobile CTA: Lucide `Ticket` instead of 🎟 | Emoji render differently per OS, undermining a premium build. First item on the UI/UX Pro Max checklist. |
| 9 | SEO expanded to 5 schemas + OG + Twitter | `Offer price: 0` surfaces "Free" in Google's event rich result — this festival's single strongest differentiator. |
| 10 | Regional motif instead of a map of India | Border depictions carry legal and political sensitivity. An abstract compass ornament is prettier, on-brand and risk-free. |
| 11 | `public/media/` foldered by category | Filesystem mirrors the gallery's navigation model. Year lives in metadata. |
| 12 | Homepage 15 → 16 sections, with pacing rules | Marketplace added; controlled via alternating heights, alternating grounds, and Why Visit as an escape hatch. |

---

## 15. To approve

1. **The 3-page / 4-nav-entry structure** (§1) — the one genuine design decision here.
2. **Featured Flavours copy** (§4) — the five dish stories are written; correct anything factually off. You know these dishes better than I do.
3. **Lucide icon over emoji** (§8).
4. **Assets** — brief, media kit, photographs, videos. Flavours and Gallery are the hungriest.

On approval, Phase 1: scaffold Next.js 15 + TS + Tailwind 4, design tokens, self-hosted fonts, `content/` schemas with all copy, motion library, ornament SVGs. Nothing in Phase 1 depends on assets or on 21st.dev.
