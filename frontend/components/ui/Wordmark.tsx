import type { CSSProperties, ElementType, ComponentPropsWithoutRef } from 'react';

interface WordmarkProps {
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  as?: ElementType;
  style?: CSSProperties;
}

const SIZES = {
  sm: { name: '1.25rem', tag: '0.55rem' },
  md: { name: '1.7rem', tag: '0.6rem' },
  lg: { name: '2.4rem', tag: '0.7rem' },
};

export function Wordmark({
  tone = 'dark',
  size = 'md',
  showTagline = true,
  as: Tag = 'a',
  style = {},
  ...rest
}: WordmarkProps & Omit<ComponentPropsWithoutRef<'a'>, keyof WordmarkProps>) {
  const s = SIZES[size];
  const nameColor = tone === 'light' ? 'var(--on-dark)' : 'var(--ink)';
  const tagColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--accent-strong)';

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
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: s.name,
          fontWeight: 'var(--fw-semibold)',
          letterSpacing: '0.01em',
          color: nameColor,
        }}
      >
        Kalakshetra
      </span>
      {showTagline && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: s.tag,
            fontWeight: 'var(--fw-semibold)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: tagColor,
            marginTop: '0.35rem',
          }}
        >
          Hand Painted with Love
        </span>
      )}
    </Tag>
  );
}
