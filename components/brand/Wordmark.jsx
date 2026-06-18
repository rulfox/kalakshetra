import React from 'react';

/**
 * Kalakshetra serif wordmark + tagline, rendered as live text.
 * `tone` controls light/dark surfaces; `showTagline` toggles the
 * "Hand Painted with Love" line.
 */
export function Wordmark({
  tone = 'dark',          // "dark" = ink text (on light), "light" = ivory (on dark)
  size = 'md',
  showTagline = true,
  as = 'a',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { name: '1.25rem', tag: '0.55rem' },
    md: { name: '1.7rem', tag: '0.6rem' },
    lg: { name: '2.4rem', tag: '0.7rem' },
  };
  const s = sizes[size];
  const nameColor = tone === 'light' ? 'var(--on-dark)' : 'var(--ink)';
  const tagColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--accent-strong)';

  const Tag = as;
  return (
    <Tag
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        lineHeight: 1,
        textDecoration: 'none',
        ...style,
      }}
      aria-label="Kalakshetra Handpaintings — Hand Painted with Love"
      {...rest}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: s.name,
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: '0.01em',
        color: nameColor,
      }}>Kalakshetra</span>
      {showTagline && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: s.tag,
          fontWeight: 'var(--fw-semibold)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: tagColor,
          marginTop: '0.35rem',
        }}>Hand Painted with Love</span>
      )}
    </Tag>
  );
}
