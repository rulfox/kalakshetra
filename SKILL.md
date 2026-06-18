---
name: kalakshetra-design
description: Use this skill to generate well-branded interfaces and assets for Kalakshetra Handpaintings — a Kerala-based hand-painted wearable-art studio — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build
or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## Quick map
- `styles.css` — link this one file to get all tokens + fonts.
- `tokens/` — color, typography, spacing/radii/shadow/motion CSS variables.
- `components/` — reusable React primitives (Button, IconButton, Tag, StatPill, Card,
  ProductCard, SectionHeading, PullQuote, Input, NewsletterForm, NavBar, Lookbook, Wordmark,
  WhatsAppButton). Each has a `.prompt.md` with usage.
- `ui_kits/website/` — full homepage recreation.
- `foundations/` — visual specimen cards.

## Non-negotiable brand rules
- **No cart, no checkout, no prices.** Ordering is a WhatsApp conversation
  (`wa.me/919400384167` with a per-product pre-filled message). Pricing is enquiry-only.
- Kasavu **gold is an accent**, never a large fill. Mural accents (temple red, Kathakali
  green, indigo, mustard) stay under ~10% of any surface.
- Serif (Cormorant Garamond) for display, sans (Inter) for body/UI. Uppercase eyebrows with
  0.22em tracking, in gold.
- Calm, editorial motion. Abundant whitespace. Near-square corners. No emoji.
- Voice: warm, reverent toward craft. "We" / "you". Words: hand-painted, one-of-a-kind,
  made to order, Kerala-rooted. Avoid: sale, discount, buy now, urgency.
