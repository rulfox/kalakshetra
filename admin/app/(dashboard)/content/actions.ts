'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch } from '@/lib/backendClient';

export async function saveContentGroup(keys: string[], formData: FormData) {
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
}
