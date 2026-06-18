import React from 'react';

/**
 * Small category / status tag. Uppercase, tracked, pill-shaped.
 * Mural-accent tones are used sparingly (category chips, "made to order").
 */
export function Tag({ children, tone = 'gold', style = {}, ...rest }) {
  const tones = {
    gold: { color: 'var(--accent-strong)', border: 'var(--border-gold)', bg: 'rgba(201,162,39,0.08)' },
    wood: { color: 'var(--wood)', border: 'rgba(92,64,51,0.3)', bg: 'rgba(92,64,51,0.06)' },
    red: { color: 'var(--temple-red)', border: 'rgba(139,46,46,0.3)', bg: 'rgba(139,46,46,0.06)' },
    green: { color: 'var(--kathakali-green)', border: 'rgba(31,95,91,0.3)', bg: 'rgba(31,95,91,0.06)' },
    indigo: { color: 'var(--indigo)', border: 'rgba(46,58,89,0.3)', bg: 'rgba(46,58,89,0.06)' },
  };
  const t = tones[tone] || tones.gold;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '0.6875rem',
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: t.color,
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 'var(--radius-pill)',
        padding: '0.3rem 0.7rem',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
