# Kalakshetra Handpaintings — Design System

A brand & UI design system for **Kalakshetra Handpaintings**, a Kerala-based artisan
studio creating premium **hand-painted wearable art**. This repository holds the brand's
visual foundations (color, type, spacing, motion), reusable UI components, a website UI
kit, and the tone-of-voice & iconography guidance needed to design on-brand surfaces.

> **Tagline:** "Hand Painted with Love"

---

## 1. Brand context

**Kalakshetra Handpaintings** sells one-of-a-kind, hand-painted clothing — primarily
**shirts**, plus a **kids'** line and an emerging **women's** line. Every piece is painted
by hand, **made to order**, and unique. The studio is founded by **Dr. Aswathy
Sudarsanan**, an Ayurvedic physician and textile artist, who blends Kerala's cultural
heritage with international luxury-retail polish.

The design DNA references **Picchika** (minimalist whitespace, hand-painted florals),
**Anita Dongre** (traditional craft at global e-commerce scale), and **Torani &
Sabyasachi** (rich heritage storytelling).

**Confirmed brand facts (use literally):**
- Location: **Mavelikkara, Alappuzha, Kerala, India**
- WhatsApp / phone: **9400384167** (primary), **8547516011** (secondary)
- Instagram: **@kalakshetra_handpaintings**
- Painted themes → product names/categories: **Kathakali** faces, **Theyyam** masks &
  crowns, **deities** (Krishna/Guruvayurappan, Ganesha), **peacocks/parrots & temple-mural
  birds (Pattachitra)**, **gold mandala**, **boho/mural botanicals**, **lotus**.

### The shopping model — IMPORTANT
There is **no cart, no checkout, no payment gateway**. The site is a curated gallery that
converts to a **WhatsApp conversation**:
- Every product card and a persistent floating button carries an **"Order on WhatsApp"** CTA.
- CTAs open `https://wa.me/919400384167?text=<url-encoded pre-filled message>` naming the
  specific product.
- **Pricing is enquiry-only** — never display prices; price is discussed on WhatsApp.
- A short "How to Order" strip explains: tap → we confirm size/fabric/price → we hand-paint
  & ship (India + worldwide).

### Sources
This system was built from a written brand brief (no Figma or codebase was attached). If a
production codebase or Figma file exists, attach it and the system can be reconciled
against the real source of truth. No external links were provided.

---

## 2. Index / manifest

| Path | What it is |
|---|---|
| `styles.css` | Global entry point (consumers link this). `@import` list only. |
| `tokens/colors.css` | Color tokens — Kasavu gold + heritage earth + mural accents. |
| `tokens/typography.css` | Families, type scale, weights, line-height, letter-spacing. |
| `tokens/spacing.css` | Spacing scale, radii, shadows, motion, layout vars. |
| `tokens/fonts.css` | Webfont loading (Cormorant Garamond + Inter). |
| `tokens/base.css` | Reset + document defaults + `.eyebrow` + focus ring. |
| `foundations/*.html` | Specimen cards for the Design System tab (Type/Colors/Spacing/Brand). |
| `components/` | Reusable React UI primitives (see component list below). |
| `ui_kits/website/` | Kalakshetra homepage recreation (UI kit). |
| `assets/` | Logo wordmark, brand glyphs, imagery. |
| `SKILL.md` | Agent-Skill manifest for use in Claude Code. |

### Components
- **core/** — `Button`, `IconButton`, `Badge`, `Tag`, `StatPill`
- **forms/** — `Input`, `NewsletterForm`
- **content/** — `Card`, `ProductCard`, `SectionHeading`, `PullQuote`
- **navigation/** — `NavBar`, `Lookbook` (carousel)
- **brand/** — `Wordmark`, `WhatsAppButton`

---

## 3. CONTENT FUNDAMENTALS — voice & copy

**Overall vibe:** calm, warm, reverent toward craft. Reads like a small atelier speaking
softly to a discerning guest — never a marketplace shouting deals. Heritage pride without
heaviness; luxury without coldness.

**Person & address.** Brand speaks as **"we"** (the studio), addresses the reader as
**"you"**. First-person singular ("I") is reserved for the founder's voice in *The
Philosophy* / signature moments. Warm and personal, e.g. *"Every piece begins on a blank
weave and a quiet morning."*

**Casing.**
- **Eyebrow labels & nav:** UPPERCASE with generous letter-spacing (`--ls-eyebrow`,
  0.22em). E.g. `THE PHILOSOPHY`, `FEATURED`, `OUR STORY`.
- **Headlines:** Title-ish sentence case in serif. E.g. *"Wearable art, painted by hand."*
- **Body & buttons:** Sentence case. Buttons read as gentle invitations:
  *"Discover the Art"*, *"Order on WhatsApp"*, *"Start on WhatsApp"*.

**Tone examples (use these patterns):**
- Hero supporting line: *"One-of-a-kind shirts and pieces, painted by hand in Mavelikkara,
  Kerala — made to order, never repeated."*
- Product theme descriptions: short, evocative, one line. *"Kathakali face in temple reds
  and Kathakali green."* / *"Temple-mural peacock in Pattachitra style."*
- How to Order: numbered, plain, reassuring. *"Tap Order on WhatsApp → we confirm size,
  fabric & price → we hand-paint your piece and ship it, India & worldwide."*
- Pricing: never a number. Always *"Enquire on WhatsApp"* / *"Price on enquiry"*.

**Words we use:** hand-painted, one-of-a-kind, made to order, atelier/studio, heritage,
mural, Kasavu, Kerala-rooted, wearable art, slow craft.
**Words we avoid:** sale, discount, cheap, buy now, add to cart, checkout, limited-time,
hurry. No urgency tactics. No exclamation-mark spam (at most one, rarely).

**Emoji:** **not used** in editorial/marketing copy. The only emoji-adjacent mark is the
WhatsApp brand glyph on order CTAs (rendered as an icon, not an emoji). Keep surfaces
emoji-free.

**Numbers / stats:** used sparingly as quiet "stat pills": **100% hand painted · 1-of-1 ·
Kerala-rooted**. No invented metrics, no fake review counts.

---

## 4. VISUAL FOUNDATIONS

**Color.** Built on a warm **ivory canvas** (`#FAF7F0`) with a secondary **warm white**
(`#F3EDE2`) for alternating sections. **Kasavu gold** (`#C9A227` / deep `#B8860B`) is the
single signature accent — used for hairlines, eyebrow labels, button outlines, and small
flourishes, never as large fills. **Ettukettu wood** (`#5C4033`) anchors dark sections and
the footer; **terracotta** (`#B05E3B`) is a warm secondary. **Mural accents** (temple red,
Kathakali green, indigo, mustard) appear on **< 10% of any surface** — as tiny tags, dot
indicators, painted-art imagery only. Text is near-black `#1C1A17` on light, ivory on dark.

**Typography.** Headlines in **Cormorant Garamond** — large, airy, medium weight, slightly
tightened tracking (`--ls-tight`). Body/UI in **Inter** at comfortable 16px with 1.5
line-height. Eyebrow labels and nav are uppercase Inter with **0.22em tracking** in gold.
The serif/sans pairing is the core type signature: editorial serif for emotion, neutral
sans for clarity.

**Spacing & layout.** Abundant whitespace — gallery-like. Sections breathe with
`--space-9`/`--space-10` (96–128px) vertical padding. Content sits in a `1240px` container;
prose narrows to `760px`. Mobile-first; expands generously on tablet/desktop.

**Backgrounds.** Mostly flat ivory / warm-white blocks. **No gradient backgrounds** as
decoration. Large **editorial imagery** is the visual hero (full-bleed hero, large product
shots). Imagery skews **warm** (golden-hour, natural light, painterly), never cold or
high-contrast b&w. Until real photos exist, use fixed-aspect warm-tinted placeholder blocks
with descriptive alt text (no layout shift).

**Borders & dividers.** Thin **hairlines** (`rgba(28,26,23,0.12)`) and **gold hairlines**
for accents. Section dividers are often a single short gold rule under an eyebrow label.

**Corner radii.** Restrained. Cards and inputs use **2–4px** (`--radius-sm`/`--radius-md`) —
near-square edges read as luxury. **Pills** (`--radius-pill`) only for tags, stat pills, and
the WhatsApp float. Avoid large 16px+ rounding.

**Cards.** White surface, near-square corners, **soft warm shadow**
(`--shadow-card`: `0 12px 32px -12px rgba(28,26,23,0.18)`), thin hairline optional. On hover
they **lift** (`--shadow-lift`) and the product image **zooms** ~1.05 with a gold caption
reveal.

**Shadows.** Soft, warm-tinted, diffuse — never hard black drop shadows. Nav gains a subtle
shadow on scroll; the WhatsApp float carries a green-tinted glow.

**Motion.** Calm and editorial. Default easing `cubic-bezier(0.22,1,0.36,1)` (`--ease-out`),
durations 180–600ms. **Fades and gentle rises** on scroll-in; **slow image zoom** on hover;
**no bounces, no springy overshoot, no infinite loops**. Carousel slides cross-fade/slide
smoothly. Respect `prefers-reduced-motion`.

**Hover states.** Buttons: gold outline → gold fill (primary), or subtle darken (solid).
Links: gold underline grows in. Cards: lift + image zoom + caption reveal. **Press states:**
slight scale-down (0.98) and/or deeper gold — never a color jump.

**Transparency & blur.** Nav is **transparent over the hero**, transitioning to solid ivory
with shadow on scroll (optional subtle backdrop-blur over imagery). Used sparingly; the brand
favors solid, honest surfaces over heavy glassmorphism.

---

## 5. ICONOGRAPHY

The brand is **type- and image-led, not icon-heavy**. Icons are functional and quiet.

- **UI icon set:** **Lucide** (`lucide-react` in React; `lucide` CDN in static HTML).
  Thin **1.75px stroke**, rounded line caps — matches the calm, editorial feel. Used for
  nav (menu/close), carousel arrows (`ChevronLeft`/`ChevronRight`), form states
  (`Check`/`AlertCircle`), contact (`Phone`, `MapPin`, `Instagram`), and the scroll cue
  (`ChevronDown`).
- **WhatsApp glyph:** Lucide has no WhatsApp mark, so the brand's official WhatsApp glyph is
  shipped as an inline SVG (`assets/icons/whatsapp.svg`) and used on all order CTAs and the
  float. This is the one "brand logo" icon in the set.
- **No emoji** as icons anywhere. No PNG icon sprites. No decorative unicode glyphs (the only
  non-icon mark used editorially is a thin middot `·` separating stat pills and meta).
- **Logo:** a **serif wordmark** ("Kalakshetra" in Cormorant Garamond) with the tagline
  "Hand Painted with Love" set small in uppercase tracked Inter beneath — rendered as live
  text (see `assets/` + `Wordmark` component), not a raster logo.

**Substitution flagged:** Lucide is used as the UI icon set as a sensible default (no icon
source was provided in the brief). If the studio has its own icon assets, drop them into
`assets/icons/` and update this section.

---

## 6. Caveats / substitutions
- **Fonts** are loaded from **Google Fonts CDN** (Cormorant Garamond + Inter). No font
  binaries were provided; if you need offline/self-hosted fonts, download them and swap
  `tokens/fonts.css` for local `@font-face` rules.
- **Imagery** uses warm placeholder blocks — replace with the studio's real product and
  on-model photography.
- **Icons:** Lucide substitution flagged above.
