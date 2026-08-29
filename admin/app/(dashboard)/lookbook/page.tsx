import { backendFetch } from '@/lib/backendClient';
import type { LookbookSlide } from '@/lib/types';
import { ImageUploadField } from '@/components/ImageUploadField';
import { createSlide, deleteSlide, moveSlide, updateSlide } from './actions';

export default async function LookbookPage() {
  const slides = (await backendFetch<LookbookSlide[]>('/api/admin/lookbook')).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', margin: '0 0 0.25rem' }}>Lookbook</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
          The photo carousel on the homepage — a small eyebrow label plus a caption per slide.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {slides.map((slide, i) => (
          <div key={slide.id} className="ks-card" style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
            {slide.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.imageUrl} alt="" style={{ width: 120, height: 68, objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <strong>{slide.eyebrow || '(no eyebrow)'}</strong>
              <p style={{ margin: '0.25rem 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>{slide.caption}</p>
              <details style={{ marginTop: '0.6rem' }}>
                <summary className="ks-btn secondary" style={{ display: 'inline-flex', listStyle: 'none' }}>
                  Edit
                </summary>
                <div style={{ marginTop: '0.75rem' }}>
                  <SlideForm action={updateSlide.bind(null, slide.id)} initial={slide} />
                </div>
              </details>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
              <form action={moveSlide.bind(null, slide.id, 'up')}>
                <button className="ks-btn secondary" type="submit" disabled={i === 0} style={{ padding: '0.2rem 0.5rem' }}>
                  ↑
                </button>
              </form>
              <form action={moveSlide.bind(null, slide.id, 'down')}>
                <button className="ks-btn secondary" type="submit" disabled={i === slides.length - 1} style={{ padding: '0.2rem 0.5rem' }}>
                  ↓
                </button>
              </form>
              <form action={deleteSlide.bind(null, slide.id)}>
                <button className="ks-btn danger" type="submit" style={{ padding: '0.2rem 0.5rem' }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {slides.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No lookbook slides yet — add one below.</p>}
      </div>

      <div className="ks-card" style={{ maxWidth: 480 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: '0 0 1rem' }}>Add a slide</h2>
        <SlideForm action={createSlide} />
      </div>
    </div>
  );
}

function SlideForm({ action, initial }: { action: (formData: FormData) => void; initial?: LookbookSlide }) {
  // Multiple SlideForm instances render on one page (add form + one per slide's inline edit) —
  // ids must be unique per instance.
  const uid = initial ? `slide-${initial.id}` : 'slide-new';
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <ImageUploadField kind="lookbook" initialImageUrl={initial?.imageUrl} />
      <div>
        <label htmlFor={`${uid}-eyebrow`}>Eyebrow label</label>
        <input id={`${uid}-eyebrow`} name="eyebrow" type="text" defaultValue={initial?.eyebrow ?? ''} placeholder="e.g. Worn in Kerala" />
      </div>
      <div>
        <label htmlFor={`${uid}-caption`}>Caption</label>
        <textarea id={`${uid}-caption`} name="caption" defaultValue={initial?.caption ?? ''} />
      </div>
      <button className="ks-btn" type="submit" style={{ alignSelf: 'flex-start' }}>
        {initial ? 'Save changes' : 'Add slide'}
      </button>
    </form>
  );
}
