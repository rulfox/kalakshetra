import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getItem, getItems, getSiteContent, resolveImageUrl } from '@/lib/api';
import { Tag, type TagTone } from '@/components/ui/Tag';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { wrap, section } from '@/components/sections/layout';

export async function generateStaticParams() {
  const items = await getItems();
  return items.map((i) => ({ category: i.categorySlug, item: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; item: string }>;
}): Promise<Metadata> {
  const { category, item } = await params;
  const found = await getItem(category, item);
  if (!found) return {};
  const image = resolveImageUrl(found.imageUrl);
  const description = found.themeDescription || `A hand-painted, one-of-a-kind ${found.categoryName.toLowerCase()}'s piece from Kalakshetra Handpaintings.`;
  return {
    title: found.title,
    description,
    alternates: { canonical: `/shop/${category}/${item}` },
    openGraph: { images: image ? [image] : undefined },
  };
}

export default async function ItemPage({ params }: { params: Promise<{ category: string; item: string }> }) {
  const { category, item } = await params;
  const [found, content] = await Promise.all([getItem(category, item), getSiteContent()]);
  if (!found) notFound();

  const image = resolveImageUrl(found.imageUrl);

  // No `offers`/price on purpose — this brand deliberately never publishes prices (WhatsApp
  // enquiry-only), so this is a valid but not rich-result-eligible Product entry.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: found.title,
    description: found.themeDescription || undefined,
    image: image ? [image] : undefined,
    category: found.categoryName,
  };

  return (
    <main>
      <section style={{ ...section, background: 'var(--surface-page)', paddingTop: 'calc(var(--nav-h) + var(--space-7))' }}>
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-7)' }} className="ks-item-cols">
          <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: found.swatchColor || 'var(--warm-white)', boxShadow: 'var(--shadow-card)' }}>
            <Image
              src={image || '/assets/placeholders/portrait.svg'}
              alt={`${found.title} — hand-painted ${found.themeDescription || 'piece'}`}
              fill
              sizes="(max-width: 880px) 100vw, 560px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Link
              href={`/shop/${found.categorySlug}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-strong)',
              }}
            >
              ← {found.categoryName}
            </Link>
            <Tag tone={found.categoryTone as TagTone}>{found.categoryName}</Tag>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h3)', margin: 0, color: 'var(--text-strong)' }}>
              {found.title}
            </h1>
            {found.themeDescription && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-lead)', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>
                {found.themeDescription}
              </p>
            )}
            {found.comingSoon ? (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
                New pieces arriving — enquire on WhatsApp to be notified first.
              </p>
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Price on enquiry
              </span>
            )}
            <div>
              <WhatsAppButton number={content.contact.whatsappNumber} product={found.title} label="Order on WhatsApp" style={{ padding: '1rem 1.8rem' }} />
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media(min-width:880px){ .ks-item-cols{grid-template-columns:1fr 1fr;align-items:start;gap:var(--space-9)} }
      `}</style>
    </main>
  );
}
