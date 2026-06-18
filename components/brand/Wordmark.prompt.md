The brand logo — a serif "Kalakshetra" wordmark with the "Hand Painted with Love" tagline beneath, rendered as live text (no raster).

```jsx
<Wordmark tone="dark" size="md" />          {/* on ivory */}
<Wordmark tone="light" size="lg" showTagline={false} /> {/* on wood/dark footer */}
```

Use `tone="light"` on dark sections. Drop the tagline (`showTagline={false}`) in tight nav contexts.
