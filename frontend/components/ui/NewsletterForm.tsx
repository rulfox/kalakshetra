'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { Input } from './Input';
import { Button } from './Button';

interface NewsletterFormProps {
  tone?: 'light' | 'dark';
  style?: CSSProperties;
}

export function NewsletterForm({ tone = 'dark', style = {}, ...rest }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onDark = tone === 'dark';

  async function submit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok || res.status === 409) {
        // 409 = already subscribed — still a "you're on the list" outcome for the visitor.
        setDone(true);
      } else {
        setError('Something went wrong — please try again in a moment.');
      }
    } catch {
      setError('Something went wrong — please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1.1rem 1.25rem',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          background: onDark ? 'rgba(201,162,39,0.08)' : 'rgba(201,162,39,0.06)',
          ...style,
        }}
        role="status"
        {...rest}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            color: onDark ? 'var(--on-dark)' : 'var(--text-strong)',
          }}
        >
          Thank you — you&rsquo;re on the list.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-sm)',
            color: onDark ? 'var(--on-dark-soft)' : 'var(--text-body)',
          }}
        >
          We&rsquo;ll write softly, and only about new hand-painted pieces.
        </span>
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
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(null);
        }}
        error={error}
        aria-label="Email address"
      />
      <Button type="submit" variant="outline" size="md" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Subscribe'}
      </Button>
    </form>
  );
}
