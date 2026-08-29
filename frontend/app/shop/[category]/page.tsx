import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategories, getItems, getSiteContent, resolveImageUrl } from '@/lib/api';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import type { TagTone } from '@/components/ui/Tag';
import { wrap, section } from '@/components/sections/layout';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategories();
  const found = categories.find((c) => c.slug === category);
  if (!found) return {};
  return {
    title: `${found.name}'s hand-painted collection`,
    description: `Browse ${found.name.toLowerCase()}'s one-of-a-kind, hand-painted pieces from Kalakshetra Handpaintings — made to order in Kerala.`,
    alternates: { canonical: `/shop/${found.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const [categories, items, content] = await Promise.all([getCategories(), getItems(category), getSiteContent()]);
  const found = categories.find((c) => c.slug === category);
  if (!found) notFound();

  const published = items.filter((i) => i.published);

  return (
    <main>
      <section style={{ ...section, background: 'var(--surface-page)', paddingTop: 'calc(var(--nav-h) + var(--space-7))' }}>
        <div style={wrap}>
          <Link
            href="/#shop"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-strong)',
              display: 'inline-block',
              marginBottom: 'var(--space-5)',
            }}
          >
            ← All collections
          </Link>
          <SectionHeading
            eyebrow="Collection"
            title={`${found.name}'s hand-painted pieces`}
            intro="Each piece is a single canvas, painted by hand and made to order — never repeated."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-7)' }}>
            {published.map((p) => (
              <ProductCard
                key={p.id}
                name={p.title}
                theme={p.themeDescription}
                category={p.categoryName}
                categoryTone={p.categoryTone as TagTone}
                image={resolveImageUrl(p.imageUrl)}
                swatch={p.swatchColor || undefined}
                comingSoon={p.comingSoon}
                whatsappNumber={content.contact.whatsappNumber}
                href={`/shop/${p.categorySlug}/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
