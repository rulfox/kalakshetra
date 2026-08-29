import Link from 'next/link';
import { notFound } from 'next/navigation';
import { backendFetch } from '@/lib/backendClient';
import type { Category, Item } from '@/lib/types';
import { ImageUploadField } from '@/components/ImageUploadField';
import { createItem, deleteItem, moveItem, updateItem } from './actions';

const TONES = ['gold', 'red', 'green', 'indigo', 'wood'];

export default async function ItemsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryId = Number(id);

  const categories = await backendFetch<Category[]>('/api/admin/categories');
  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const items = (await backendFetch<Item[]>(`/api/admin/items?category=${category.slug}`)).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <Link href="/categories" style={{ fontSize: 'var(--fs-sm)', color: 'var(--accent-strong)' }}>
          ← All categories
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', margin: '0.4rem 0 0.25rem' }}>{category.name} — Items</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
          Title, theme description and photo for each hand-painted piece in this category.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {items.map((item, i) => (
          <ItemRow key={item.id} item={item} index={i} count={items.length} category={category} />
        ))}
        {items.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No items in this category yet — add one below.</p>}
      </div>

      <div className="ks-card" style={{ maxWidth: 480 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: '0 0 1rem' }}>Add an item</h2>
        <ItemForm action={createItem.bind(null, categoryId)} />
      </div>
    </div>
  );
}

function ItemRow({ item, index, count, category }: { item: Item; index: number; count: number; category: Category }) {
  const move = moveItem.bind(null, category.id, category.slug, item.id);
  return (
    <div className="ks-card" style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
      {item.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imageUrl}
          alt=""
          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{item.title}</strong>
          {item.comingSoon && <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--terracotta)' }}>Coming soon</span>}
          {!item.published && <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Unpublished</span>}
        </div>
        {item.themeDescription && (
          <p style={{ margin: '0.25rem 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>{item.themeDescription}</p>
        )}
        <details style={{ marginTop: '0.6rem' }}>
          <summary className="ks-btn secondary" style={{ display: 'inline-flex', listStyle: 'none' }}>
            Edit
          </summary>
          <div style={{ marginTop: '0.75rem' }}>
            <ItemForm action={updateItem.bind(null, category.id, item.id)} initial={item} />
          </div>
        </details>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
        <form action={move.bind(null, 'up')}>
          <button className="ks-btn secondary" type="submit" disabled={index === 0} style={{ padding: '0.2rem 0.5rem' }}>
            ↑
          </button>
        </form>
        <form action={move.bind(null, 'down')}>
          <button className="ks-btn secondary" type="submit" disabled={index === count - 1} style={{ padding: '0.2rem 0.5rem' }}>
            ↓
          </button>
        </form>
        <form action={deleteItem.bind(null, category.id, item.id)}>
          <button className="ks-btn danger" type="submit" style={{ padding: '0.2rem 0.5rem' }}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

function ItemForm({ action, initial }: { action: (formData: FormData) => void; initial?: Item }) {
  // Multiple ItemForm instances render on one page (the "add" form plus one per item's inline
  // edit) — ids must be unique per instance or <label htmlFor> pairing and any DOM/automation
  // tooling that queries by id breaks.
  const uid = initial ? `item-${initial.id}` : 'item-new';
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <div>
        <label htmlFor={`${uid}-title`}>Title</label>
        <input id={`${uid}-title`} name="title" type="text" required defaultValue={initial?.title} placeholder="e.g. Kathakali Maestro" />
      </div>
      <div>
        <label htmlFor={`${uid}-slug`}>Slug (optional — derived from title)</label>
        <input id={`${uid}-slug`} name="slug" type="text" defaultValue={initial?.slug} />
      </div>
      <div>
        <label htmlFor={`${uid}-themeDescription`}>Theme description</label>
        <textarea id={`${uid}-themeDescription`} name="themeDescription" defaultValue={initial?.themeDescription ?? ''} />
      </div>
      <div>
        <label htmlFor={`${uid}-categoryTone`}>Tag color</label>
        <select id={`${uid}-categoryTone`} name="categoryTone" defaultValue={initial?.categoryTone ?? 'gold'}>
          {TONES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <ImageUploadField kind="items" initialImageUrl={initial?.imageUrl} initialS3Key={undefined} />
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
        <input type="checkbox" name="comingSoon" defaultChecked={initial?.comingSoon} style={{ width: 'auto' }} />
        Coming soon
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
        <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} style={{ width: 'auto' }} />
        Published
      </label>
      <button className="ks-btn" type="submit" style={{ alignSelf: 'flex-start' }}>
        {initial ? 'Save changes' : 'Add item'}
      </button>
    </form>
  );
}
