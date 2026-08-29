'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { CustomCommissionBanner } from './CustomCommissionBanner';
import { resolveImageUrl } from '@/lib/api';
import type { Category, Item, SiteContentGroups } from '@/lib/types';
import type { TagTone } from '@/components/ui/Tag';
import { wrap, section } from './layout';

export function Shop({
  categories,
  items,
  commissionContent,
  whatsappNumber,
}: {
  categories: Category[];
  items: Item[];
  commissionContent: SiteContentGroups['commission'];
  whatsappNumber: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string>('all');
  const cats = [{ slug: 'all', name: 'All' }, ...categories];
  const list = activeSlug === 'all' ? items : items.filter((p) => p.categorySlug === activeSlug);

  return (
    <section id="shop" style={{ ...section, background: 'var(--surface-page)' }}>
      <div style={wrap}>
        <SectionHeading
          eyebrow="Featured"
          title="Hand-painted collections"
          intro="Shirts and pieces across Men, Women and Kids — each one a single canvas."
        />
        <div role="tablist" aria-label="Categories" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: 'var(--space-6) 0 var(--space-7)' }}>
          {cats.map((c) => {
            const active = c.slug === activeSlug;
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveSlug(c.slug)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '0.6rem 1.2rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-pill)',
                  border: `1px solid ${active ? 'var(--gold)' : 'var(--border-strong)'}`,
                  background: active ? 'var(--gold)' : 'transparent',
                  color: active ? 'var(--ink)' : 'var(--text-body)',
                  transition: 'all var(--dur-base) var(--ease-out)',
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        <CustomCommissionBanner content={commissionContent} whatsappNumber={whatsappNumber} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
          {list.map((p) => (
            <ProductCard
              key={p.id}
              name={p.title}
              theme={p.themeDescription}
              category={p.categoryName}
              categoryTone={p.categoryTone as TagTone}
              image={resolveImageUrl(p.imageUrl)}
              swatch={p.swatchColor || undefined}
              comingSoon={p.comingSoon}
              whatsappNumber={whatsappNumber}
              href={`/shop/${p.categorySlug}/${p.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
