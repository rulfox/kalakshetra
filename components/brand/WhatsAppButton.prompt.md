The brand's only purchase affordance — opens a WhatsApp chat with a per-product, URL-encoded pre-filled enquiry. No cart, no prices.

```jsx
{/* inline CTA on a product card */}
<WhatsAppButton product="Kathakali Maestro" />

{/* persistent site-wide float */}
<WhatsAppButton floating product={null} />

{/* custom message */}
<WhatsAppButton message="Hi Kalakshetra, do you ship to the UK?" label="Ask a question" />
```

`WhatsAppGlyph` is exported separately for use inside other buttons/links. Default number is 919400384167; never display a price anywhere near this CTA.
