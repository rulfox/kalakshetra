import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { SiteContentGroups } from '@/lib/types';
import { wrap } from './layout';

export function Hero({ content, whatsappNumber }: { content: SiteContentGroups['hero']; whatsappNumber: string }) {
  return (
    <header
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        background: '#1C1A17',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/assets/hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(28,26,23,0.65), rgba(28,26,23,0.12) 50%, rgba(28,26,23,0.35))',
        }}
      />
      <div style={{ ...wrap, position: 'relative', paddingBottom: 'var(--space-10)', paddingTop: 'calc(var(--nav-h) + var(--space-7))' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-eyebrow)',
            fontWeight: 600,
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          <span style={{ width: 30, height: 1, background: 'var(--gold)' }} /> {content.eyebrow}
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h1)',
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: 'var(--ls-tight)',
            color: 'var(--on-dark)',
            margin: '1.2rem 0 0',
            maxWidth: '16ch',
          }}
        >
          {content.headline}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-lead)',
            lineHeight: 1.6,
            color: 'var(--on-dark-soft)',
            margin: '1.4rem 0 2.2rem',
            maxWidth: '46ch',
          }}
        >
          {content.subcopy}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Button as="a" href="#shop" variant="outline" size="lg">
            Discover the Art
          </Button>
          <WhatsAppButton number={whatsappNumber} style={{ padding: '1.05rem 2rem' }} />
        </div>
      </div>
      <a
        href="#philosophy"
        aria-label="Scroll to philosophy"
        style={{ position: 'absolute', bottom: '1.6rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--on-dark-soft)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </header>
  );
}
