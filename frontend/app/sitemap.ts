import type { MetadataRoute } from 'next';
import { getCategories, getItems } from '@/lib/api';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalakshetrahandpaintings.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, items] = await Promise.all([getCategories(), getItems()]);

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/shop/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const itemUrls: MetadataRoute.Sitemap = items
    .filter((i) => i.published)
    .map((i) => ({
      url: `${siteUrl}/shop/${i.categorySlug}/${i.slug}`,
      lastModified: i.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...categoryUrls,
    ...itemUrls,
  ];
}
