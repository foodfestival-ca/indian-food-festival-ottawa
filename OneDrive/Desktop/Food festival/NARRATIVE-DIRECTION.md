# Narrative Direction
### Indian Food Festival of Ottawa 2026 — the connective tissue

The architecture told us *what* the sections are. This tells us *how they hold together*, which is the difference between a cinematic page and a stack of well-made components.

---

## 1. The problem this solves

Sixteen sections, each individually good, will still read as a list. Long landing pages fail narratively for one specific reason: **every section opens a new topic instead of answering the question the previous section raised.** The visitor keeps re-orienting, and re-orienting is fatigue.

The fix is a contract at every boundary: **each section ends by raising a question the next section answers.** Nothing is placed because it belongs in a festival website. Everything is placed because of what precedes it.

---

## 2. The emotional arc

```
    LONGING  →  DESIRE  →  BELONGING  →  TRUST  →  READINESS  →  COMMITMENT
      Hero      Flavours    Community    Media     Venue/FAQ     Passport
       ↑                        ↑                      ↑             ↑
    a promise            "these are my         "nothing is      the ask
                            people"            stopping me"
```

Emotion first, information second, conversion last — and critically, **information is not allowed to interrupt emotion.** That's why parking, timings and FAQ all sit in Act IV rather than being scattered helpfully throughout. A logistics detail dropped into the Flavours section would break the spell for a marginal convenience gain.

---

## 3. The sensory triad

The heart of the page (Acts II) is built on three senses in sequence. This is the structural idea that makes the middle of the page feel composed rather than assembled.

| Section | Sense | What the visitor does |
|---|---|---|
| **Featured Flavours** | **Taste** | Reads five dishes and starts salivating |
| **Live Performances** | **Sound** | Hears the festival — video-forward, not photo-forward |
| **The Marketplace** | **Touch** | Sees hands, textiles, close crops |

Then **More Than Food** pulls back from objects to *people*, and the register shifts from sensory to social. That widening — from a bowl, to a stage, to a stall, to a crowd — is the camera pulling back before the Gallery delivers the emotional peak.

---

## 4. Boundary contracts

Every transition is specified. `Q` is the question the section leaves open; `A` is how the next one answers it.

| # | Boundary | The handoff |
|---|---|---|
| 1 | **Hero → Countdown** | Q: *Is this real?* → A: a live clock. Not a new section — it sits inside the hero region, as in the reference. |
| 2 | **Countdown → Facts** | Q: *How big is this?* → A: four numbers. Cold on purpose; the warmth is coming. |
| 3 | **Facts → Why Visit** | Q: *Numbers are impressive. But why would* I *go?* → A: six reasons in the second person. **The register turns from institutional to personal here.** |
| 4 | **Why Visit → Flavours** | Why Visit's lead card *is* the food card, spanning two columns. It names Jigarthanda without explaining it — a deliberate hook. Flavours pays it off immediately. |
| 5 | **Flavours → Performances** | Q: *What happens while I'm eating?* → A: sound. Copy bridge: *"Put the plate down. Something's starting."* Taste hands to sound. |
| 6 | **Performances → Marketplace** | Q: *And when the set ends?* → A: the crowd disperses into the stalls. Bridge: *"The music stops. You wander."* |
| 7 | **Marketplace → More Than Food** | Q: *Who else is here?* → A: children, dancers, neighbours. Objects → people. |
| 8 | **More Than Food → Gallery** | Q: *What does all of this actually look like?* → A: it looks like this. **No header, no eyebrow — the gallery opens full-bleed and unannounced.** The one section that interrupts the page's grammar, because that's what makes it land. |
| 9 | **Gallery → Journey** | Q: *When was all this?* → A: 2024, 2025, and now. Feeling gains a history. |
| 10 | **Journey → Media** | Q: *Says who?* → A: CBC. CTV. Fifteen thousand people. External voices. |
| 11 | **Media → Schedule** | **The hinge of the page.** Q: *I'm convinced. Can I actually do this?* → A: here are the hours. **Tone drops from lyrical to plain, deliberately.** |
| 12 | **Schedule → Venue → FAQ** | Sustained plainness. Friction removal. Short sentences, no ornament flourishes, answers before atmosphere. |
| 13 | **FAQ → Passport** | Q: *Nothing's stopping me. What now?* → A: the ask. **Warmth returns in full** — full-bleed maroon, the page's loudest moment. |
| 14 | **Passport → Sponsors** | A different conversation, and signalled as one. |
| 15 | **Sponsors → Social** | Q: *How do I stay close until August?* → A: follow, subscribe. |

**The tonal drop at boundary 11 is the most important decision in this document.** A page that stays lyrical through parking instructions is a page that doesn't trust its own story. Going plain exactly when the visitor becomes practical is what makes the earlier lyricism credible rather than decorative.

---

## 5. Voice

**Second person, present tense, sensory-specific.**

> ✗ "Visitors can enjoy a wide variety of authentic regional Indian cuisine."
> ✓ "Crisp shell, cloud-soft centre. The snack Vijayawada eats standing up, in the rain."

Rules:
- **Never "authentic."** It's the word every festival site uses and it means nothing. Specificity does the work instead: *Madurai*, *Mandvi*, *Vidarbha*.
- **Never "immerse yourself in."** Show the thing.
- **Concrete nouns over abstract ones.** Not "vibrant cultural traditions" — *bangles stacked by colour*.
- **Sentence fragments are permitted** in section intros, for rhythm. Not in FAQ or Venue, where clarity beats cadence.
- **Numbers are always specific.** "15,000+" not "thousands".

---

## 6. Recurring motifs

Four elements repeat across the page. Recurrence is what turns sections into a single object.

1. **The gold rule with a diamond** — appears in every section header. The plate's rim. The most-repeated element on the site, and the reason it coheres.
2. **The word "story"** — surfaces exactly four times: hero theme line, Flavours header, Gallery, Journey. Four is deliberate. Ten would be a tic.
3. **Numbered courses** — eyebrows carry `FIRST TASTE`, `THE MAIN`, `SWEET FINISH` at three points only — Flavours, Gallery, Passport. Restraint keeps it charming rather than cute.
4. **One ornament per viewport, maximum.** Enforced by convention. A mandala in the hero and a mandala in the next section means neither is special.

---

## 7. Cinematic on mobile

Desktop gets cinema for free — wide viewports, parallax, side-by-side reveals. Mobile needs different technique for the same feeling.

**What actually creates cinema on a phone:**

- **Full-bleed media.** Images break the container and run edge to edge. Gutters around a photograph on a 390px screen kill immersion instantly. Text keeps its gutters; media does not.
- **One idea per screen.** Mobile pacing is vertical time. Sections breathe with generous vertical space rather than cramming.
- **Sticky section headers** that hold while content scrolls beneath — gives the sense of moving *through* a space rather than past a list.
- **Scroll-snap on horizontal rails only.** Flavours and Marketplace snap card to card. Full-page scroll-snap is never used — it fights the user and breaks the browser's own scroll affordances.
- **Staggered entrance, 80ms.** Cards arriving together read as a page load. Arriving in sequence reads as choreography.
- **Type that fills the width.** Display headings at `--text-4xl` on a 390px screen should nearly touch both gutters. Timid mobile type is the single biggest tell of a desktop-first design.
- **No parallax on touch.** It's janky on low-end Android and adds nothing on a small viewport. Depth on mobile comes from scale and overlap instead.

**Transitions on mobile** are carried by ground colour changes and the gold divider, not by elaborate motion. A cream → maroon → cream sequence gives clear chaptering at a glance, costs zero JavaScript, and works identically under `prefers-reduced-motion`.

---

## 8. Section-by-section narrative brief — Phase 2

### §3 Why Visit — *the turn to "you"*
**Job:** convert institutional scale into personal reason.
**Opening move:** the register changes. Everything before this is about the festival; this is about the reader.
**Eyebrow:** `Why You'll Love It`
**Structure:** six bento cards. The Flavours card spans two columns and names a dish without explaining it — the hook into §4. The Passport card also spans two, and is the page's first conversion touch at ~18% scroll.
**Mobile:** single column stack. Wide cards are simply taller. Each card is a tap target in full.

### §4 Featured Indian Flavours — *the emotional peak of Act II*
**Job:** manufacture appetite through specificity.
**Eyebrow:** `First Taste` · **Header:** *Five Dishes. Five States. One Plate.*
**Why it works:** nobody desires "Indian food". People desire *a cold glass of jigarthanda in Madurai heat*. Named, placed, storied.
**Structure:** five editorial cards, staggered vertically on desktop — cards 1/3/5 sit higher. A flat row of five is the generic treatment we exist to avoid.
**The first-timer line** — "First time? Start with Dabeli" — removes the single biggest barrier for a non-Indian visitor, which is not spice tolerance but not knowing where to begin.
**Mobile:** horizontal scroll-snap carousel, one card per screen, full-bleed image. This is the most cinematic moment available on a phone — each swipe is a reveal.

### §5 Live Performances — *taste hands to sound*
**Job:** the sensory handoff, and proof the festival is more than a food court.
**Bridge line:** *"Put the plate down. Something's starting."*
**Eyebrow:** `On The Stage`
**Video-forward, not photo-forward.** Dance is motion; a still photograph of dance is a compromise. Video cards with poster frames, muted preview on hover for desktop only.
**Mobile:** stacked full-bleed video cards, tap to play in place. No autoplay on cellular.

### §6 The Marketplace — *sound hands to touch*
**Job:** establish that a visit is an afternoon, not a lunch.
**Bridge line:** *"The music stops. You wander."*
**Eyebrow:** `Beyond The Plate` · **Header:** *More Than a Meal*
**Photography direction:** hands, close crops, texture. Not wide shots of stalls. The section is about touch, and wide shots communicate logistics rather than texture.
**Commercial quiet-work:** a "Become a Vendor" link to `/about#vendors` sits at the section's end, making a decorative section commercially useful without breaking tone.
**Mobile:** horizontal scroll-snap rail — the physical metaphor of walking past stalls, which is exactly right for the content.

---

## 9. What must be true when Phase 2 ships

- [ ] Reading §3→§6 continuously feels like one passage, not four
- [ ] Each section's opening line acknowledges the one before it
- [ ] No two adjacent sections share a ground colour
- [ ] Exactly one ornament per viewport
- [ ] The word "authentic" appears zero times
- [ ] Mobile: media full-bleed, text guttered
- [ ] Mobile: Flavours and Marketplace swipe with scroll-snap
- [ ] Every card is a full tap target, ≥44px
- [ ] Stagger 80ms, disabled under reduced motion
- [ ] No parallax on coarse pointers
