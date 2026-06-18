import React from 'react';

/**
 * Kalakshetra primary button.
 * Variants:
 *  - "outline" (default): gold outline that fills with gold on hover (the hero CTA look)
 *  - "solid":   solid wood/ink button for secondary emphasis
 *  - "whatsapp": WhatsApp-green order CTA
 *  - "ghost":   quiet text button with a growing gold underline
 */
export function Button({
  children,
  variant = 'outline',
  size = 'md',
  as = 'button',
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.8125rem' },
    md: { padding: '0.85rem 1.75rem', fontSize: '0.875rem' },
    lg: { padding: '1.05rem 2.4rem', fontSize: '0.95rem' },
  };

  const base = {
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
    ...sizes[size],
  };

  const variants = {
    outline: {
      background: hover ? 'var(--gold)' : 'transparent',
      color: hover ? 'var(--ink)' : 'var(--accent-strong)',
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

  const Tag = as;
  return (
    <Tag
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
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
