import Link from 'next/link';
import { LogoutButton } from '@/components/LogoutButton';

const NAV = [
  { href: '/categories', label: 'Categories' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/content', label: 'Site text' },
  { href: '/newsletter', label: 'Newsletter' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: 'var(--ink)',
          color: 'var(--on-dark)',
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>Kalakshetra</div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-soft)' }}>
            Admin
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--on-dark-soft)',
                textDecoration: 'none',
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <LogoutButton />
        </div>
      </aside>
      <main style={{ flex: 1, padding: 'var(--space-6)', maxWidth: 1100 }}>{children}</main>
    </div>
  );
}
