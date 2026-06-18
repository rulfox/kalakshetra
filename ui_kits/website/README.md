# Website UI Kit — Kalakshetra Handpaintings homepage

A high-fidelity recreation of the Kalakshetra single-page homepage, composing the
design-system primitives (no re-implemented components).

## Files
- `index.html` — mounts the full page. Loads `styles.css`, the compiled `_ds_bundle.js`,
  then `sections.jsx` and the app entry. Also a starting point.
- `sections.jsx` — the page sections (`Hero`, `Philosophy`, `Shop`, `LookbookSection`,
  `Story`, `HowToOrder`, `Footer`), exported to `window`.

## Sections demonstrated
1. **NavBar** — transparent over hero → solid ivory on scroll; mobile drawer.
2. **Hero** — full-viewport editorial wash, serif headline, "Discover the Art" + WhatsApp CTAs, scroll cue.
3. **Philosophy** — section heading + founder pull-quote & signature.
4. **Shop** — All/Men/Women/Kids filter tabs over a `ProductCard` grid (state-driven).
5. **Lookbook** — `Lookbook` carousel on a wood section.
6. **Our Story** — narrative + `StatPill` row.
7. **How to Order** — 3-step WhatsApp flow + "Start on WhatsApp".
8. **Footer** — `Wordmark`, link columns, contact, `NewsletterForm`, shipping + fine print.
9. **Floating WhatsApp** button, site-wide.

## Interactions
Sticky nav scroll state, mobile drawer, category filter, looping autoplay carousel
(pause on hover, keyboard, swipe), newsletter validation + success, per-product WhatsApp
enquiry links. **No cart / checkout / prices** — ordering is a WhatsApp conversation.

## Notes
- Imagery uses warm gradient placeholders (no layout shift). Swap `swatch` for real
  `image` URLs when photography is available.
- Requires `_ds_bundle.js` (auto-compiled at the project root).
