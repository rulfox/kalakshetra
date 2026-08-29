'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch } from '@/lib/backendClient';
import type { LookbookSlide } from '@/lib/types';

function buildPayload(formData: FormData) {
  return {
    imageUrl: String(formData.get('imageUrl') || '').trim() || null,
    imageAlt: String(formData.get('eyebrow') || 'Lookbook photo'),
    s3Key: String(formData.get('s3Key') || '').trim() || null,
    eyebrow: String(formData.get('eyebrow') || '').trim() || null,
    caption: String(formData.get('caption') || '').trim() || null,
  };
}

export async function createSlide(formData: FormData) {
  const payload = buildPayload(formData);
  if (!payload.imageUrl) return;
  await backendFetch('/api/admin/lookbook', { method: 'POST', body: JSON.stringify(payload) });
  revalidatePath('/lookbook');
}

export async function updateSlide(id: number, formData: FormData) {
  const payload = buildPayload(formData);
  await backendFetch(`/api/admin/lookbook/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  revalidatePath('/lookbook');
}

export async function deleteSlide(id: number) {
  await backendFetch(`/api/admin/lookbook/${id}`, { method: 'DELETE' }, { parseJson: false });
  revalidatePath('/lookbook');
}

export async function moveSlide(id: number, direction: 'up' | 'down') {
  const slides = (await backendFetch<LookbookSlide[]>('/api/admin/lookbook')).sort((a, b) => a.sortOrder - b.sortOrder);
  const ids = slides.map((s) => s.id);
  const index = ids.indexOf(id);
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= ids.length) return;
  [ids[index], ids[swapWith]] = [ids[swapWith], ids[index]];
  await backendFetch('/api/admin/lookbook/reorder', { method: 'PATCH', body: JSON.stringify({ orderedIds: ids }) }, { parseJson: false });
  revalidatePath('/lookbook');
}
