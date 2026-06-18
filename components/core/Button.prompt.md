Primary call-to-action button — use for "Discover the Art", "Order on WhatsApp", and other invitations across the site.

```jsx
<Button variant="outline" size="lg">Discover the Art</Button>
<Button variant="whatsapp" iconLeft={<WhatsAppGlyph />}>Order on WhatsApp</Button>
<Button variant="solid">Our Story</Button>
<Button variant="ghost">Read more</Button>
```

Variants: `outline` (default — gold outline filling to gold on hover, the hero look), `solid` (wood/ink), `whatsapp` (green order CTA), `ghost` (text with growing gold underline). Sizes `sm | md | lg`. Pass `as="a"` + `href` for link buttons. Labels are uppercase + tracked except `ghost`.
