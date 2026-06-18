Icon-only button with a 44px+ round hit area — nav menu/close, carousel arrows, social/contact links. Always provide `aria-label`.

```jsx
<IconButton aria-label="Open menu"><Menu size={22} strokeWidth={1.75} /></IconButton>
<IconButton tone="onDark" aria-label="Next slide"><ChevronRight size={22} /></IconButton>
<IconButton tone="gold" variant="outline" aria-label="Instagram"><Instagram size={20} /></IconButton>
```

Tones: `default | onDark | gold`. Variants: `ghost` (default) or `outline` (gold hairline). Pair with Lucide icons at 1.75 stroke.
