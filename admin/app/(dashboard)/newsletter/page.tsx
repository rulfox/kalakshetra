import Link from 'next/link';
import { backendFetch } from '@/lib/backendClient';
import type { Page, Subscriber } from '@/lib/types';

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(0, Number(pageParam || 0));
  const data = await backendFetch<Page<Subscriber>>(`/api/admin/newsletter-subscribers?page=${page}&size=20&sort=id,desc`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', margin: '0 0 0.25rem' }}>Newsletter subscribers</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
          {data.totalElements} {data.totalElements === 1 ? 'person has' : 'people have'} joined the atelier list.
        </p>
      </div>

      <div className="ks-card">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Source</th>
              <th>Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((s) => (
              <tr key={s.id}>
                <td>{s.email}</td>
                <td>{s.source || '—'}</td>
                <td>{new Date(s.subscribedAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {data.content.length === 0 && (
              <tr>
                <td colSpan={3} style={{ color: 'var(--text-muted)' }}>
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Array.from({ length: data.totalPages }).map((_, i) => (
            <Link key={i} href={`/newsletter?page=${i}`} className="ks-btn secondary" style={i === page ? { background: 'var(--gold)' } : {}}>
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
