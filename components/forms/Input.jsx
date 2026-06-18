import React from 'react';

/**
 * Text input with optional label, helper, and error/success states.
 * Gold focus ring; thin hairline border; near-square corners.
 */
export function Input({
  label,
  id,
  error = null,
  success = null,
  tone = 'light',     // "light" surface or "dark" (footer)
  style = {},
  containerStyle = {},
  ...rest
}) {
  const reactId = React.useId();
  const inputId = id || reactId;
  const [focus, setFocus] = React.useState(false);

  const onDark = tone === 'dark';
  const labelColor = onDark ? 'var(--on-dark-soft)' : 'var(--text-body)';
  const borderColor = error
    ? 'var(--temple-red)'
    : success
      ? 'var(--whatsapp-ink)'
      : focus
        ? 'var(--gold)'
        : onDark ? 'rgba(250,247,240,0.25)' : 'var(--border-strong)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', ...containerStyle }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: labelColor,
        }}>{label}</label>
      )}
      <input
        id={inputId}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        aria-invalid={!!error}
        style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)',
          color: onDark ? 'var(--on-dark)' : 'var(--text-strong)',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${borderColor}`,
          borderRadius: 0,
          padding: '0.7rem 0.1rem',
          outline: 'none',
          transition: 'border-color var(--dur-base) var(--ease-out)',
          ...style,
        }}
        {...rest}
      />
      {error && (
        <span role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--temple-red)' }}>{error}</span>
      )}
      {!error && success && (
        <span style={{ fontSize: 'var(--fs-caption)', color: onDark ? '#7BD3A0' : 'var(--whatsapp-ink)' }}>{success}</span>
      )}
    </div>
  );
}
