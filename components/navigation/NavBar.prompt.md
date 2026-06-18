Sticky top navigation. Sits transparent over the hero and becomes a solid ivory bar with a soft shadow once the page scrolls; collapses to an animated hamburger drawer under 860px.

```jsx
<NavBar />
<NavBar links={[{label:'Shop',href:'#shop'},{label:'Lookbook',href:'#lookbook'}]} />
<NavBar forceSolid /> {/* inside a kit/card preview */}
```

Renders the `Wordmark` + a WhatsApp "Enquire" CTA. Use `forceSolid` when there's no scrollable hero behind it.
