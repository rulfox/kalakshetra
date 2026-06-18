import React from 'react';

function Chevron({ dir }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

/**
 * Immersive Lookbook carousel — state-driven, looping, autoplay w/ pause on hover,
 * dot indicators, prev/next, keyboard (←/→) and swipe friendly.
 *
 * `slides`: [{ swatch?, image?, alt?, caption?, eyebrow? }]
 */
export function Lookbook({
  slides = [],
  autoPlay = true,
  interval = 5000,
  style = {},
  ...rest
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = slides.length;
  const touch = React.useRef(null);

  const go = React.useCallback((i) => setIndex(((i % n) + n) % n), [n]);
  const next = React.useCallback(() => go(index + 1), [go, index]);
  const prev = React.useCallback(() => go(index - 1), [go, index]);

  React.useEffect(() => {
    if (!autoPlay || paused || n <= 1) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % n), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, n, interval]);

  if (n === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Lookbook"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }}
      tabIndex={0}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        touch.current = null;
      }}
      style={{ position: 'relative', ...style }}
      {...rest}
    >
      {/* Track */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${index * 100}%)`,
          transition: 'transform var(--dur-slow) var(--ease-in-out)',
        }}>
          {slides.map((s, i) => (
            <div key={i} aria-hidden={i !== index} style={{ minWidth: '100%', position: 'relative' }}>
              <div style={{ aspectRatio: '16 / 9', background: s.swatch || 'linear-gradient(135deg,#5C4033,#B05E3B)', overflow: 'hidden' }}>
                {s.image && (
                  <img src={s.image} alt={s.alt || s.caption || 'Lookbook image'} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              {(s.caption || s.eyebrow) && (
                <div style={{
                  position: 'absolute', left: 0, bottom: 0, right: 0,
                  padding: 'var(--space-7) var(--space-6) var(--space-6)',
                  background: 'linear-gradient(to top, rgba(28,26,23,0.7), transparent)',
                  color: 'var(--on-dark)',
                }}>
                  {s.eyebrow && (
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 'var(--fw-semibold)',
                      letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)',
                    }}>{s.eyebrow}</span>
                  )}
                  {s.caption && (
                    <p style={{
                      fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,2rem)', fontStyle: 'italic',
                      color: 'var(--on-dark)', margin: '0.4rem 0 0', maxWidth: '28ch', textWrap: 'balance',
                    }}>{s.caption}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        <CarouselArrow dir="left" onClick={prev} />
        <CarouselArrow dir="right" onClick={next} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: 'var(--space-5)' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            style={{
              width: i === index ? 28 : 9, height: 9, padding: 0, border: 'none', cursor: 'pointer',
              borderRadius: 'var(--radius-pill)',
              background: i === index ? 'var(--gold)' : 'var(--border-strong)',
              transition: 'width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselArrow({ dir, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      aria-label={dir === 'left' ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [dir]: 'var(--space-5)',
        width: 48, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
        background: hover ? 'var(--ivory)' : 'rgba(250,247,240,0.85)',
        color: 'var(--ink)', boxShadow: 'var(--shadow-sm)',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}
    >
      <Chevron dir={dir} />
    </button>
  );
}
