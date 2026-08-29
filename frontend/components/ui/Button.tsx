'use client';

import { useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface ButtonOwnProps {
  children?: ReactNode;
  variant?: 'outline' | 'solid' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: ElementType;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}

const SIZES: Record<string, CSSProperties> = {
  sm: { padding: '0.5rem 1rem', fontSize: '0.8125rem' },
  md: { padding: '0.85rem 1.75rem', fontSize: '0.875rem' },
  lg: { padding: '1.05rem 2.4rem', fontSize: '0.95rem' },
};

export function Button({
  children,
  variant = 'outline',
  size = 'md',
  as: Tag = 'button',
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}: ButtonOwnProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--dur-base) var(--ease-out)',
    width: fullWidth ? '100%' : 'auto',
    transform: active ? 'scale(0.98)' : 'scale(1)',
    lineHeight: 1,
    ...SIZES[size],
  };

  const variants: Record<string, CSSProperties> = {
    outline: {
      background: hover ? 'var(--gold)' : 'transparent',
      color: hover ? 'var(--ink)' : 'var(--gold)',
      borderColor: 'var(--gold)',
    },
    solid: {
      background: hover ? '#4a332a' : 'var(--wood)',
      color: 'var(--on-dark)',
      borderColor: 'transparent',
    },
    whatsapp: {
      background: hover ? '#1a6841' : 'var(--whatsapp-ink)',
      color: '#FFFFFF',
      borderColor: 'transparent',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent',
      letterSpacing: '0.04em',
      textTransform: 'none',
      boxShadow: hover ? 'inset 0 -1px 0 var(--gold)' : 'inset 0 -1px 0 transparent',
      borderRadius: 0,
    },
  };

  return (
    <Tag
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
