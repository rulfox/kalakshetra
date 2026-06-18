import React from 'react';
import { Input } from './Input.jsx';
import { Button } from '../core/Button.jsx';

/**
 * Newsletter signup with email validation and inline error + success state.
 * Self-contained (useState only). Lives in the footer.
 */
export function NewsletterForm({ tone = 'dark', style = {}, ...rest }) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [done, setDone] = React.useState(false);

  const onDark = tone === 'dark';

  function submit(e) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        padding: '1.1rem 1.25rem',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-md)',
        background: onDark ? 'rgba(201,162,39,0.08)' : 'rgba(201,162,39,0.06)',
        ...style,
      }} role="status" {...rest}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontStyle: 'italic',
          color: onDark ? 'var(--on-dark)' : 'var(--text-strong)',
        }}>Thank you — you're on the list.</span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)',
          color: onDark ? 'var(--on-dark-soft)' : 'var(--text-body)',
        }}>We'll write softly, and only about new hand-painted pieces.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem', ...style }} {...rest}>
      <Input
        label="Join the atelier list"
        type="email"
        tone={tone}
        placeholder="you@example.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
        error={error}
        aria-label="Email address"
      />
      <Button type="submit" variant="outline" size="md">Subscribe</Button>
    </form>
  );
}
