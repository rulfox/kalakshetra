'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError('Invalid username or password.');
        return;
      }
      router.push('/categories');
      router.refresh();
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <form
        onSubmit={onSubmit}
        className="ks-card"
        style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 0.25rem', color: 'var(--text-strong)' }}>
            Kalakshetra Admin
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>Sign in to manage the shop.</p>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" required autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'var(--temple-red)', fontSize: 'var(--fs-sm)', margin: 0 }}>{error}</p>}
        <button type="submit" className="ks-btn" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
