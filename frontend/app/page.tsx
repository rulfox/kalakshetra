import type { Metadata } from 'next';
import { getCategories, getItems, getLookbook, getSiteContent } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Shop } from '@/components/sections/Shop';
import { LookbookSection } from '@/components/sections/LookbookSection';
import { Story } from '@/components/sections/Story';
import { HowToOrder } from '@/components/sections/HowToOrder';
import { Footer } from '@/components/sections/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.hero.headline,
    description: content.hero.subcopy,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const [content, categories, items, lookbook] = await Promise.all([
    getSiteContent(),
    getCategories(),
    getItems(),
    getLookbook(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kalakshetra Handpaintings',
    description: content.hero.subcopy,
    image: '/assets/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mavelikkara',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    telephone: content.contact.phoneDisplay,
    email: content.contact.email,
    sameAs: [content.contact.instagramUrl],
  };

  return (
    <main>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero content={content.hero} whatsappNumber={content.contact.whatsappNumber} />
      <Philosophy content={content.philosophy} />
      <Shop
        categories={categories}
        items={items}
        commissionContent={content.commission}
        whatsappNumber={content.contact.whatsappNumber}
      />
      <LookbookSection slides={lookbook} />
      <Story content={content.story} />
      <HowToOrder content={content.howToOrder} whatsappNumber={content.contact.whatsappNumber} />
      <Footer content={{ ...content.footer, ...content.contact }} />
    </main>
  );
}
