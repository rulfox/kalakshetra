'use client';

import { useState } from 'react';
import Image from 'next/image';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppButton';
import { buildWhatsAppUrl, commissionEnquiryMessage } from '@/lib/whatsapp';
import type { SiteContentGroups } from '@/lib/types';

export function CustomCommissionBanner({
  content,
  whatsappNumber,
}: {
  content: SiteContentGroups['commission'];
  whatsappNumber: string;
}) {
  const waUrl = buildWhatsAppUrl(whatsappNumber, commissionEnquiryMessage());
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#2a1a0e',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-7)',
        marginBottom: 'var(--space-7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-6)',
        boxShadow: '0 8px 32px rgba(28,26,23,0.18)',
      }}
    >
      <Image
        src="/assets/hero.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', opacity: 0.35 }}
      />
      <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C9A227 40%, #C9A227 60%, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C9A227 40%, #C9A227 60%, transparent)' }} />
      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.85rem', position: 'relative' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-eyebrow)',
            fontWeight: 600,
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          <span style={{ width: 24, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          {content.eyebrow}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
            fontWeight: 500,
            color: '#FAF7F0',
            margin: 0,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
          }}
        >
          {content.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            lineHeight: 1.7,
            color: 'rgba(250,247,240,0.78)',
            margin: 0,
            maxWidth: '54ch',
          }}
        >
          {content.body}
        </p>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontStyle: 'italic', color: 'rgba(201,162,39,0.75)' }}>
          {content.footnote}
        </span>
      </div>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Request a custom hand-painted piece on WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.95rem 1.9rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 'var(--radius-pill)',
            background: hovered ? '#B8860B' : 'var(--gold)',
            color: '#1C1A17',
            boxShadow: hovered ? '0 8px 24px rgba(201,162,39,0.45)' : '0 4px 16px rgba(201,162,39,0.25)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.22s cubic-bezier(0.25,0.46,0.45,0.94)',
            whiteSpace: 'nowrap',
          }}
        >
          <WhatsAppGlyph size={16} />
          Request a Custom Piece
        </a>
      </div>
    </div>
  );
}
