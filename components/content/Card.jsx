import React from 'react';

/**
 * Generic surface card — white, near-square corners, soft warm shadow,
 * optional lift on hover. Compose ProductCard and content blocks on top.
 */
export function Card({
  children,
  hoverLift = false,
  padded = true,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: hoverLift && hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
        transform: hoverLift && hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        overflow: 'hidden',
        padding: padded ? 'var(--space-6)' : 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
