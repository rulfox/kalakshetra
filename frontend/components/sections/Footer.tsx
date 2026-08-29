import type { ReactNode } from 'react';
import { Wordmark } from '@/components/ui/Wordmark';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppButton';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import type { SiteContentGroups } from '@/lib/types';
import { wrap } from './layout';

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.18 2 2 0 012.5.5h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.84 8.06a16 16 0 006.1 6.1l.88-.88a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface FooterLink {
  text: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-eyebrow)',
          fontWeight: 600,
          letterSpacing: 'var(--ls-eyebrow)',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}
      >
        {title}
      </span>
      {links.map((l) => (
        <a
          key={l.text}
          href={l.href}
          {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-sm)',
            color: 'var(--on-dark-soft)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4em',
          }}
        >
          {l.icon}
          {l.text}
        </a>
      ))}
    </nav>
  );
}

export function Footer({ content }: { content: SiteContentGroups['footer'] & SiteContentGroups['contact'] }) {
  const waHref = `https://wa.me/${content.whatsappNumber}`;
  return (
    <footer id="contact" role="contentinfo" style={{ background: 'var(--ink)', color: 'var(--on-dark)', paddingTop: 'var(--space-9)' }}>
      <div
        style={{
          ...wrap,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
          gap: 'var(--space-7)',
          paddingBottom: 'var(--space-8)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', gridColumn: '1 / -1', maxWidth: 420 }}>
          <Wordmark tone="light" size="lg" as="div" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', lineHeight: 1.7, color: 'var(--on-dark-soft)', margin: 0 }}>
            Hand-painted wearable art from Mavelikkara, Alappuzha, Kerala. Made to order, one of a kind.
          </p>
        </div>
        <FooterCol
          title="Explore"
          links={[
            { text: 'Shop', href: '#shop' },
            { text: 'Lookbook', href: '#lookbook' },
            { text: 'Our Story', href: '#story' },
            { text: 'How to Order', href: '#how-to-order' },
          ]}
        />
        <FooterCol
          title="Reach us"
          links={[
            { text: `WhatsApp · ${content.phoneDisplay}`, href: waHref, external: true, icon: <WhatsAppGlyph size={13} /> },
            { text: `Call · ${content.phoneDisplay}`, href: `tel:+${content.whatsappNumber}`, icon: <PhoneIcon /> },
            { text: content.email, href: `mailto:${content.email}`, icon: <EmailIcon /> },
            { text: content.instagramHandle, href: content.instagramUrl, external: true, icon: <InstagramIcon /> },
          ]}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-eyebrow)',
              fontWeight: 600,
              letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.4rem',
            }}
          >
            Newsletter
          </span>
          <NewsletterForm tone="dark" />
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(250,247,240,0.14)' }}>
        <div
          style={{
            ...wrap,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-5) var(--gutter)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--on-dark-soft)' }}>{content.shippingLine}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--on-dark-soft)' }}>
            © {new Date().getFullYear()} Kalakshetra Handpaintings · {content.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
