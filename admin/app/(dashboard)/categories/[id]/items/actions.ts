'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch } from '@/lib/backendClient';
import type { Item } from '@/lib/types';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildItemPayload(categoryId: number, formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  return {
    title,
    slug: slugify(String(formData.get('slug') || '') || title),
    themeDescription: String(formData.get('themeDescription') || '').trim() || null,
    categoryId,
    imageUrl: String(formData.get('imageUrl') || '').trim() || null,
    imageAlt: title ? `${title} — hand-painted piece` : null,
    s3Key: String(formData.get('s3Key') || '').trim() || null,
    categoryTone: String(formData.get('categoryTone') || 'gold'),
    swatchColor: String(formData.get('swatchColor') || '').trim() || null,
    comingSoon: formData.get('comingSoon') === 'on',
    published: formData.get('published') === 'on',
  };
}

export async function createItem(categoryId: number, formData: FormData) {
  const payload = buildItemPayload(categoryId, formData);
  if (!payload.title) return;
  await backendFetch('/api/admin/items', { method: 'POST', body: JSON.stringify(payload) });
  revalidatePath(`/categories/${categoryId}/items`);
}

export async function updateItem(categoryId: number, itemId: number, formData: FormData) {
  const payload = buildItemPayload(categoryId, formData);
  if (!payload.title) return;
  await backendFetch(`/api/admin/items/${itemId}`, { method: 'PUT', body: JSON.stringify(payload) });
  revalidatePath(`/categories/${categoryId}/items`);
}

export async function deleteItem(categoryId: number, itemId: number) {
  await backendFetch(`/api/admin/items/${itemId}`, { method: 'DELETE' }, { parseJson: false });
  revalidatePath(`/categories/${categoryId}/items`);
}

export async function moveItem(categoryId: number, categorySlug: string, itemId: number, direction: 'up' | 'down') {
  const items = (await backendFetch<Item[]>(`/api/admin/items?category=${categorySlug}`)).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
  const ids = items.map((i) => i.id);
  const index = ids.indexOf(itemId);
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= ids.length) return;
  [ids[index], ids[swapWith]] = [ids[swapWith], ids[index]];
  await backendFetch(
    '/api/admin/items/reorder',
    { method: 'PATCH', body: JSON.stringify({ categoryId, orderedIds: ids }) },
    { parseJson: false },
  );
  revalidatePath(`/categories/${categoryId}/items`);
}
