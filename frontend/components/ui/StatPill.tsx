import type { CSSProperties } from 'react';

interface StatPillProps {
  value?: string;
  label: string;
  style?: CSSProperties;
}

export function StatPill({ value, label, style = {}, ...rest }: StatPillProps) {
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
      {value != null && value !== '' && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--accent-strong)',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
      )}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 'var(--fw-medium)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-body)',
        }}
      >
        {label}
      </span>
    </span>
  );
}
