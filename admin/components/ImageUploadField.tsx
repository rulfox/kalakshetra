'use client';

import { useId, useRef, useState, type ChangeEvent } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import type { PresignResponse } from '@/lib/types';
import { getCroppedImageBlob } from '@/lib/cropImage';

interface ImageUploadFieldProps {
  kind: 'items' | 'lookbook' | 'categories';
  /** Crop ratio (width / height) — e.g. 3/4 for product cards, 16/9 for lookbook slides. */
  aspectRatio: number;
  initialImageUrl?: string | null;
  initialS3Key?: string | null;
}

/**
 * Uploads straight to S3 via a presigned URL (this backend never proxies image bytes): the
 * selected file is first cropped client-side (react-easy-crop) to the target aspect ratio, then
 * a presigned PUT URL is requested from our own /api/uploads/presign route (which forwards to
 * the Spring backend using the httpOnly auth cookie the browser can't read directly), the
 * cropped blob is PUT to S3, and the resulting public URL/key is stashed in hidden inputs so the
 * surrounding <form action={serverAction}> submits them like any other field.
 */
export function ImageUploadField({ kind, aspectRatio, initialImageUrl = null, initialS3Key = null }: ImageUploadFieldProps) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const [s3Key, setS3Key] = useState(initialS3Key || '');
  const [status, setStatus] = useState<'idle' | 'cropping' | 'uploading' | 'error'>('idle');
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setRawImageSrc(URL.createObjectURL(file));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setStatus('cropping');
  }

  function closeCropModal() {
    if (rawImageSrc) URL.revokeObjectURL(rawImageSrc);
    setRawImageSrc(null);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function onCancelCrop() {
    closeCropModal();
    setStatus('idle');
  }

  async function onConfirmCrop() {
    if (!rawImageSrc || !croppedAreaPixels) return;
    setStatus('uploading');
    try {
      const blob = await getCroppedImageBlob(rawImageSrc, croppedAreaPixels);
      await uploadBlob(blob, `${kind}-${Date.now()}.jpg`, 'image/jpeg');
      closeCropModal();
      setStatus('idle');
    } catch {
      closeCropModal();
      setStatus('error');
    }
  }

  async function uploadBlob(blob: Blob, fileName: string, contentType: string) {
    const presignRes = await fetch('/api/uploads/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, contentType, kind }),
    });
    if (!presignRes.ok) throw new Error('presign failed');
    const presigned: PresignResponse = await presignRes.json();

    const putRes = await fetch(presigned.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: blob,
    });
    if (!putRes.ok) throw new Error('upload failed');

    setImageUrl(presigned.publicUrl);
    setS3Key(presigned.s3Key);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor={inputId}>Image</label>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          style={{
            width: 120,
            height: 120 / aspectRatio,
            objectFit: 'cover',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
        />
      )}
      <input ref={fileInputRef} id={inputId} type="file" accept="image/*" onChange={onFileChange} />
      {status === 'uploading' && <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Uploading…</span>}
      {status === 'error' && <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--temple-red)' }}>Upload failed — try again.</span>}
      <input type="hidden" name="imageUrl" value={imageUrl} readOnly />
      <input type="hidden" name="s3Key" value={s3Key} readOnly />

      {status === 'cropping' && rawImageSrc && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="ks-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: 'min(90vw, 480px)' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: `min(60vh, calc(min(90vw, 480px) / ${aspectRatio}))`,
                background: '#000',
              }}
            >
              <Cropper
                image={rawImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              aria-label="Zoom"
            />
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
              <button type="button" className="ks-btn secondary" onClick={onCancelCrop}>
                Cancel
              </button>
              <button
                type="button"
                className="ks-btn"
                onClick={onConfirmCrop}
                disabled={!croppedAreaPixels}
              >
                Use this crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
