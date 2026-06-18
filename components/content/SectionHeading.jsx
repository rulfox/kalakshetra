import React from 'react';

/**
 * Section heading lockup: uppercase gold eyebrow + short gold rule + serif title,
 * with optional intro paragraph. The recurring section-header pattern across the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',     // "dark" = on light surface; "light" = on dark surface
  style = {},
  ...rest
}) {
  const titleColor = tone === 'light' ? 'var(--on-dark)' : 'var(--text-strong)';
  const introColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--text-body)';
  const centered = align === 'center';

  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
        gap: '0.9rem',
        maxWidth: centered ? '640px' : 'none',
        marginLeft: centered ? 'auto' : 0,
        marginRight: centered ? 'auto' : 0,
        ...style,
      }}
      {...rest}
    >
      {eyebrow && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.7rem',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-eyebrow)',
          fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--ls-eyebrow)',
          textTransform: 'uppercase',
          color: 'var(--accent-strong)',
        }}>
          <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-h2)',
          fontWeight: 'var(--fw-medium)',
          lineHeight: 'var(--lh-snug)',
          letterSpacing: 'var(--ls-tight)',
          color: titleColor,
          margin: 0,
          textWrap: 'balance',
        }}>{title}</h2>
      )}
      {intro && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-lead)',
          lineHeight: 'var(--lh-relaxed)',
          color: introColor,
          maxWidth: '52ch',
          textWrap: 'pretty',
          margin: 0,
        }}>{intro}</p>
      )}
    </header>
  );
}
