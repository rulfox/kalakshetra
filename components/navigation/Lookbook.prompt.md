Editorial lookbook carousel — looping, autoplay (pauses on hover/focus), dot indicators, prev/next arrows, keyboard (←/→) and swipe.

```jsx
<Lookbook slides={[
  { swatch:'linear-gradient(135deg,#5C4033,#B05E3B)', eyebrow:'Worn in Kerala', caption:'Painted shirt with the set-mundu.' },
  { image:'/lookbook/02.jpg', alt:'Model in hand-painted peacock shirt', caption:'Temple-mural peacock.' },
]} interval={6000} />
```

Each slide takes `swatch` or `image` (+`alt`), plus optional `eyebrow` and serif `caption`. Media is a fixed 16:9 box.
