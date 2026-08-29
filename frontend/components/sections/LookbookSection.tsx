import { SectionHeading } from '@/components/ui/SectionHeading';
import { Lookbook } from '@/components/ui/Lookbook';
import { resolveImageUrl } from '@/lib/api';
import type { LookbookSlide } from '@/lib/types';
import { wrap, section } from './layout';

export function LookbookSection({ slides }: { slides: LookbookSlide[] }) {
  const mapped = slides.map((s) => ({
    image: resolveImageUrl(s.imageUrl),
    alt: s.imageAlt,
    eyebrow: s.eyebrow,
    caption: s.caption,
  }));

  return (
    <section id="lookbook" style={{ ...section, background: 'var(--wood)' }}>
      <div style={wrap}>
        <SectionHeading tone="light" align="center" eyebrow="Lookbook" title="Worn, not just made" style={{ marginBottom: 'var(--space-7)' }} />
        <Lookbook slides={mapped} interval={6000} />
      </div>
    </section>
  );
}
