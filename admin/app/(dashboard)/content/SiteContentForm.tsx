'use client';

import { useActionState, type ReactNode } from 'react';
import type { SaveState } from './actions';

/**
 * Wraps a site-content group's fields with a save button that visibly reports pending/success/
 * error — the raw <form action={serverAction}> gave zero feedback on click, which read as
 * "nothing happening" (the RSC re-render after a no-op save looks identical to before).
 */
export function SiteContentForm({
  action,
  groupLabel,
  children,
}: {
  action: (state: SaveState, formData: FormData) => Promise<SaveState>;
  groupLabel: string;
  children: ReactNode;
}) {
  const [state, formAction, isPending] = useActionState(action, { status: 'idle' });

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      {children}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="ks-btn" type="submit" disabled={isPending} style={{ alignSelf: 'flex-start' }}>
          {isPending ? 'Saving…' : `Save ${groupLabel.toLowerCase()}`}
        </button>
        {!isPending && state.status === 'success' && (
          <span style={{ color: 'var(--success-green, #2e7d32)', fontSize: 'var(--fs-sm)' }}>Saved</span>
        )}
        {!isPending && state.status === 'error' && (
          <span style={{ color: 'var(--temple-red)', fontSize: 'var(--fs-sm)' }}>
            Save failed{state.error ? `: ${state.error}` : ''} — try again.
          </span>
        )}
      </div>
    </form>
  );
}
