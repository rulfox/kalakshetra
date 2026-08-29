import Link from 'next/link';
import { backendFetch } from '@/lib/backendClient';
import type { Category } from '@/lib/types';
import { createCategory, deleteCategory, moveCategory, updateCategory } from './actions';

export default async function CategoriesPage() {
  const categories = await backendFetch<Category[]>('/api/admin/categories');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', margin: '0 0 0.25rem' }}>Categories</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
          The categories customers browse on the site (e.g. Men, Women, Kids).
        </p>
      </div>

      <div className="ks-card">
        <table>
          <thead>
            <tr>
              <th style={{ width: 60 }}>Order</th>
              <th>Name</th>
              <th>Slug</th>
              <th style={{ width: 260 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, i) => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <form action={moveCategory.bind(null, c.id, 'up')}>
                      <button className="ks-btn secondary" type="submit" disabled={i === 0} style={{ padding: '0.2rem 0.5rem' }}>
                        ↑
                      </button>
                    </form>
                    <form action={moveCategory.bind(null, c.id, 'down')}>
                      <button
                        className="ks-btn secondary"
                        type="submit"
                        disabled={i === categories.length - 1}
                        style={{ padding: '0.2rem 0.5rem' }}
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                </td>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Link href={`/categories/${c.id}/items`} className="ks-btn secondary">
                      Items
                    </Link>
                    <EditCategoryForm category={c} />
                    <form action={deleteCategory.bind(null, c.id)}>
                      <button className="ks-btn danger" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} style={{ color: 'var(--text-muted)' }}>
                  No categories yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="ks-card" style={{ maxWidth: 420 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: '0 0 1rem' }}>Add a category</h2>
        <form action={createCategory} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required placeholder="e.g. Men" />
          </div>
          <div>
            <label htmlFor="slug">Slug (optional — derived from name)</label>
            <input id="slug" name="slug" type="text" placeholder="e.g. men" />
          </div>
          <button className="ks-btn" type="submit" style={{ alignSelf: 'flex-start' }}>
            Add category
          </button>
        </form>
      </div>
    </div>
  );
}

function EditCategoryForm({ category }: { category: Category }) {
  const action = updateCategory.bind(null, category.id);
  return (
    <details>
      <summary className="ks-btn secondary" style={{ display: 'inline-flex', listStyle: 'none' }}>
        Edit
      </summary>
      <form action={action} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <input name="name" defaultValue={category.name} required style={{ width: 140 }} />
        <input name="slug" defaultValue={category.slug} required style={{ width: 140 }} />
        <button className="ks-btn" type="submit">
          Save
        </button>
      </form>
    </details>
  );
}
