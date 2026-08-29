'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch } from '@/lib/backendClient';

export type SaveState = { status: 'idle' | 'success' | 'error'; error?: string };

export async function saveContentGroup(keys: string[], _prevState: SaveState, formData: FormData): Promise<SaveState> {
  try {
    await Promise.all(
      keys.map((key) => {
        const value = String(formData.get(key) ?? '');
        return backendFetch(`/api/admin/site-content/${encodeURIComponent(key)}`, {
          method: 'PUT',
          body: JSON.stringify({ value }),
        });
      }),
    );
    revalidatePath('/content');
    return { status: 'success' };
  } catch (err) {
    return { status: 'error', error: err instanceof Error ? err.message : 'Save failed' };
  }
}
