'use client';

import { useId, useState, type ChangeEvent } from 'react';
import type { PresignResponse } from '@/lib/types';

interface ImageUploadFieldProps {
  kind: 'items' | 'lookbook' | 'categories';
  initialImageUrl?: string | null;
  initialS3Key?: string | null;
}

/**
 * Uploads straight to S3 via a presigned URL (this backend never proxies image bytes): request a
 * presigned PUT URL from our own /api/uploads/presign route (which forwards to the Spring backend
 * using the httpOnly auth cookie the browser can't read directly), PUT the file to S3, then stash
 * the resulting public URL/key in hidden inputs so the surrounding <form action={serverAction}>
 * submits them like any other field.
 */
export function ImageUploadField({ kind, initialImageUrl = null, initialS3Key = null }: ImageUploadFieldProps) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const [s3Key, setS3Key] = useState(initialS3Key || '');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const inputId = useId();

  async function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('uploading');
    try {
      const presignRes = await fetch('/api/uploads/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, kind }),
      });
      if (!presignRes.ok) throw new Error('presign failed');
      const presigned: PresignResponse = await presignRes.json();

      const putRes = await fetch(presigned.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error('upload failed');

      setImageUrl(presigned.publicUrl);
      setS3Key(presigned.s3Key);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor={inputId}>Image</label>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }} />
      )}
      <input id={inputId} type="file" accept="image/*" onChange={onFileChange} />
      {status === 'uploading' && <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Uploading…</span>}
      {status === 'error' && <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--temple-red)' }}>Upload failed — try again.</span>}
      <input type="hidden" name="imageUrl" value={imageUrl} readOnly />
      <input type="hidden" name="s3Key" value={s3Key} readOnly />
    </div>
  );
}
