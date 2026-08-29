'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, type TagTone } from './Tag';
import { WhatsAppButton } from './WhatsAppButton';

const CARD_PLACEHOLDER = '/assets/placeholders/portrait.svg';

interface ProductCardProps {
  name: string;
  theme?: string | null;
  category?: string | null;
  categoryTone?: TagTone;
  image?: string | null;
  swatch?: string | null;
  comingSoon?: boolean;
  whatsappNumber: string;
  href?: string;
}

export function ProductCard({
  name,
  theme,
  category,
  categoryTone = 'gold',
  image = null,
  swatch = 'var(--warm-white)',
  comingSoon = false,
  whatsappNumber,
  href,
}: ProductCardProps) {
  const [hover, setHover] = useState(false);
  const imgSrc = image || CARD_PLACEHOLDER;

  // The card links to the item's detail page (SEO deep link) but also carries a WhatsApp CTA
  // anchor — nesting an <a> inside a Next.js <Link>'s <a> is invalid HTML, so instead of wrapping
  // the whole card in Link, the link is a "stretched" full-card overlay (z-index below the CTA)
  // and the CTA sits above it in its own stacking context, per the standard stretched-link
  // pattern for a card that's both a link and hosts an inner interactive control.
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {href && (
        <Link href={href} aria-label={name} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      )}
      <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', background: swatch || undefined }}>
        <Image
          src={imgSrc}
          alt={`${name} — hand-painted ${theme || 'piece'}`}
          fill
          unoptimized
          sizes="(max-width: 700px) 50vw, 300px"
          style={{ objectFit: 'cover', transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform var(--dur-slow) var(--ease-out)' }}
        />
        {category && (
          <div style={{ position: 'absolute', top: '0.9rem', left: '0.9rem' }}>
            <Tag tone={categoryTone} style={{ background: 'rgba(250,247,240,0.92)' }}>
              {category}
            </Tag>
          </div>
        )}
        {comingSoon && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(28,26,23,0.34)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 'var(--fw-semibold)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--on-dark)',
                padding: '0 1rem',
                textAlign: 'center',
              }}
            >
              New pieces arriving — enquire
            </span>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '1.4rem 1rem 0.9rem',
            background: 'linear-gradient(to top, rgba(28,26,23,0.78), transparent)',
            color: 'var(--on-dark)',
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            Hand-painted · 1-of-1
          </span>
        </div>
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h5)',
            fontWeight: 'var(--fw-medium)',
            color: 'var(--text-strong)',
            margin: 0,
          }}
        >
          {name}
        </h3>
        {theme && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)', margin: 0 }}>
            {theme}
          </p>
        )}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 'auto',
            paddingTop: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 'var(--fw-medium)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Price on enquiry
          </span>
          <WhatsAppButton
            number={whatsappNumber}
            product={name}
            label="Order"
            style={{ padding: '0.6rem 1rem', fontSize: '0.7rem' }}
          />
        </div>
      </div>
    </article>
  );
}
