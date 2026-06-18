import React from 'react';

/**
 * Large serif pull-quote with optional founder attribution/signature.
 * Used in The Philosophy and Our Story.
 */
export function PullQuote({
  children,
  author = null,
  role = null,
  tone = 'dark',
  align = 'left',
  style = {},
  ...rest
}) {
  const quoteColor = tone === 'light' ? 'var(--on-dark)' : 'var(--text-strong)';
  const metaColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--text-muted)';
  const centered = align === 'center';

  return (
    <figure
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
        gap: '1.4rem',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '3.5rem',
        lineHeight: 0.5,
        color: 'var(--gold)',
        height: '0.6em',
        marginBottom: '0.2rem',
      }}>&ldquo;</span>
      <blockquote style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.6rem, 3.2vw, 2.35rem)',
        fontWeight: 'var(--fw-regular)',
        fontStyle: 'italic',
        lineHeight: 1.35,
        letterSpacing: 'var(--ls-tight)',
        color: quoteColor,
        maxWidth: '24ch',
        textWrap: 'balance',
      }}>{children}</blockquote>
      {author && (
        <figcaption style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            color: quoteColor,
          }}>{author}</span>
          {role && (
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-eyebrow)',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase',
              color: metaColor,
            }}>{role}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
