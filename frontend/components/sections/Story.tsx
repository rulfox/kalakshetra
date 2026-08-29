import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatPill } from '@/components/ui/StatPill';
import { resolveImageUrl } from '@/lib/api';
import type { SiteContentGroups } from '@/lib/types';
import { wrap, section } from './layout';

export function Story({ content }: { content: SiteContentGroups['story'] }) {
  return (
    <section id="story" style={{ ...section, background: 'var(--surface-alt)' }}>
      <div className="ks-two-col" style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-7)' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: 'var(--warm-white)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <Image
            src={resolveImageUrl(content.imageUrl) || '/assets/placeholders/portrait.svg'}
            alt="The Kalakshetra studio in Mavelikkara"
            fill
            sizes="(max-width: 880px) 100vw, 600px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <StatPill value={content.stat1Value} label={content.stat1Label} />
            <StatPill value={content.stat2Value} label={content.stat2Label} />
            <StatPill label={content.stat3Label} />
          </div>
        </div>
      </div>
      <style>{`
        @media(min-width:880px){
          .ks-two-col{grid-template-columns:1fr 1fr;align-items:center;gap:var(--space-9)}
        }
      `}</style>
    </section>
  );
}
