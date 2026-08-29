'use client';

import { useState, type CSSProperties, type ReactNode, type ComponentPropsWithoutRef } from 'react';

interface IconButtonProps {
  children?: ReactNode;
  tone?: 'default' | 'onDark' | 'gold';
  size?: number;
  variant?: 'ghost' | 'outline';
  style?: CSSProperties;
}

const TONES: Record<string, { color: string; hoverBg: string }> = {
  default: { color: 'var(--ink)', hoverBg: 'rgba(28,26,23,0.06)' },
  onDark: { color: 'var(--on-dark)', hoverBg: 'rgba(250,247,240,0.12)' },
  gold: { color: 'var(--accent-strong)', hoverBg: 'rgba(201,162,39,0.12)' },
};

export function IconButton({
  children,
  tone = 'default',
  size = 44,
  variant = 'ghost',
  style = {},
  ...rest
}: IconButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof IconButtonProps>) {
  const [hover, setHover] = useState(false);
  const t = TONES[tone];
  const bordered = variant === 'outline';

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        minWidth: size,
        padding: 0,
        color: t.color,
        background: hover ? t.hoverBg : 'transparent',
        border: bordered ? '1px solid var(--border-gold)' : '1px solid transparent',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </button>
  );
}
