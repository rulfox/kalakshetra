The featured-collection card. Image zooms and the card lifts on hover; a gold "Hand-painted · 1-of-1" caption reveals. CTA opens a per-product WhatsApp enquiry. Never shows a price.

```jsx
<ProductCard name="Kathakali Maestro" theme="Kathakali face in temple reds & Kathakali green" category="Men" />
<ProductCard name="Theyyam Crown" theme="Theyyam mask & crown motif" category="Men" categoryTone="red"
  swatch="linear-gradient(135deg,#8B2E2E,#5C4033)" />
<ProductCard name="Lotus Whisper" category="Women" comingSoon />
```

Pass a real `image` URL when available; otherwise the warm `swatch` placeholder keeps a fixed 3:4 box (no layout shift). Use `comingSoon` for the Women's placeholder state.
