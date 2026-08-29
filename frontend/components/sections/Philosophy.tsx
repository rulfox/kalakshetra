import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PullQuote } from '@/components/ui/PullQuote';
import type { SiteContentGroups } from '@/lib/types';
import { wrap, section } from './layout';

export function Philosophy({ content }: { content: SiteContentGroups['philosophy'] }) {
  return (
    <section id="philosophy" style={{ ...section, background: 'var(--surface-alt)', position: 'relative', overflow: 'hidden' }}>
      <Image
        src="/assets/lord_krishna.png"
        alt=""
        aria-hidden="true"
        fill
        className="ks-phil-bg"
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'top right', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}
      />
      <div
        className="ks-two-col"
        style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-7)', position: 'relative', zIndex: 1 }}
      >
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <PullQuote author={content.quoteAuthor} role={content.quoteRole}>
            {content.quote}
          </PullQuote>
        </div>
      </div>
      <style>{`
        .ks-phil-bg{opacity:0.1}
        @media(min-width:880px){
          .ks-phil-bg{opacity:0.5}
          .ks-two-col{grid-template-columns:1fr 1fr;align-items:center;gap:var(--space-9)}
        }
      `}</style>
    </section>
  );
}
