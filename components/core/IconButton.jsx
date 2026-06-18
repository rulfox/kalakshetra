import React from 'react';

/**
 * Icon-only button (nav menu, carousel arrows, close, social).
 * Always pass an accessible label via `aria-label`.
 * Tones: "default" (ink on light), "onDark" (ivory on dark), "gold".
 */
export function IconButton({
  children,
  tone = 'default',
  size = 44,
  variant = 'ghost',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const tones = {
    default: { color: 'var(--ink)', hoverBg: 'rgba(28,26,23,0.06)' },
    onDark: { color: 'var(--on-dark)', hoverBg: 'rgba(250,247,240,0.12)' },
    gold: { color: 'var(--accent-strong)', hoverBg: 'rgba(201,162,39,0.12)' },
  };
  const t = tones[tone];

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
