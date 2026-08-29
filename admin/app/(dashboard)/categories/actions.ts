'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch } from '@/lib/backendClient';
import type { Category } from '@/lib/types';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  if (!name) return;
  const slug = slugify(String(formData.get('slug') || '') || name);
  await backendFetch('/api/admin/categories', {
    method: 'POST',
    body: JSON.stringify({ name, slug }),
  });
  revalidatePath('/categories');
}

export async function updateCategory(id: number, formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const slug = slugify(String(formData.get('slug') || '') || name);
  if (!name) return;
  await backendFetch(`/api/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, slug }),
  });
  revalidatePath('/categories');
}

export async function deleteCategory(id: number) {
  await backendFetch(`/api/admin/categories/${id}`, { method: 'DELETE' }, { parseJson: false });
  revalidatePath('/categories');
}

export async function moveCategory(id: number, direction: 'up' | 'down') {
  const categories = await backendFetch<Category[]>('/api/admin/categories');
  const ids = categories.map((c) => c.id);
  const index = ids.indexOf(id);
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= ids.length) return;
  [ids[index], ids[swapWith]] = [ids[swapWith], ids[index]];
  await backendFetch(
    '/api/admin/categories/reorder',
    { method: 'PATCH', body: JSON.stringify({ orderedIds: ids }) },
    { parseJson: false },
  );
  revalidatePath('/categories');
}
