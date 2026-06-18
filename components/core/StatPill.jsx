import React from 'react';

/**
 * Quiet "stat pill" used in Our Story — e.g. 100% hand painted · 1-of-1 · Kerala-rooted.
 * Gold hairline border, serif numeral optional via `value`.
 */
export function StatPill({ value, label, style = {}, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-pill)',
        padding: '0.6rem 1.2rem',
        background: 'transparent',
        ...style,
      }}
      {...rest}
    >
      {value != null && (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 'var(--fw-semibold)',
          color: 'var(--accent-strong)',
          lineHeight: 1,
        }}>{value}</span>
      )}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-body)',
      }}>{label}</span>
    </span>
  );
}
