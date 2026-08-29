import type { Category, Item, LookbookSlide, SiteContentGroups, SiteContentResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/**
 * Falls back to today's live-site copy if the backend can't be reached (e.g. a preview build
 * with no backend deployed yet) so `next build`/`next dev` still produce a working page — real
 * data takes over the moment the backend is reachable, via ISR revalidation.
 */
const FALLBACK_SITE_CONTENT: SiteContentGroups = {
  hero: {
    eyebrow: 'Mavelikkara · Kerala',
    headline: 'Wearable art, painted by hand.',
    subcopy:
      'One-of-a-kind shirts and pieces, painted by hand in Mavelikkara, Kerala — made to order, never repeated.',
  },
  philosophy: {
    eyebrow: 'The Philosophy',
    title: 'Ayurvedic roots, painted by hand',
    intro: 'Every piece begins on a blank weave and a quiet morning.',
    quote:
      'I paint the way I practice medicine — slowly, by hand, with attention to what the body and the eye both need.',
    quoteAuthor: 'Dr. Aswathy Sudarsanan',
    quoteRole: 'Founder, Kalakshetra Handpaintings',
  },
  commission: {
    eyebrow: 'Custom Commission',
    title: 'Have something in mind?',
    body: "Tell us your theme and we'll hand-paint it just for you.",
    footnote: 'Price on enquiry.',
  },
  story: {
    imageUrl: '/assets/placeholders/portrait.svg',
    eyebrow: 'Our Story',
    title: 'Slow craft, from Kerala to your wardrobe',
    intro:
      'What began as a small studio in Mavelikkara is now a growing atelier of hand-painted wearable art.',
    stat1Value: '100%',
    stat1Label: 'hand painted',
    stat2Value: '1-of-1',
    stat2Label: '',
    stat3Label: 'Kerala-rooted',
  },
  howToOrder: {
    step1Title: 'Tap Order on WhatsApp',
    step1Body: 'Message us the piece you love, straight from the site.',
    step2Title: 'We confirm the details',
    step2Body: 'Size, fabric and price — all discussed on WhatsApp.',
    step3Title: 'We hand-paint & ship',
    step3Body: 'Your piece is painted to order and shipped, India & worldwide.',
  },
  contact: {
    whatsappNumber: '918547516011',
    phoneDisplay: '+91 85475 16011',
    email: 'hello@kalakshetrahandpaintings.com',
    instagramHandle: '@kalakshetra_handpaintings',
    instagramUrl: 'https://instagram.com/kalakshetra_handpaintings',
    locationLine: 'Mavelikkara, Alappuzha, Kerala, India',
  },
  footer: {
    tagline: 'Hand Painted with Love',
    shippingLine: 'Made to order in Kerala. Ships across India and worldwide.',
  },
};

async function safeFetch<T>(path: string, tag: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 3600, tags: [tag] } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getCategories(): Promise<Category[]> {
  return safeFetch<Category[]>('/api/public/categories', 'categories', []);
}

export async function getItems(categorySlug?: string): Promise<Item[]> {
  const qs = categorySlug ? `?category=${encodeURIComponent(categorySlug)}` : '';
  return safeFetch<Item[]>(`/api/public/items${qs}`, 'items', []);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/items/${categorySlug}/${itemSlug}`, {
      next: { revalidate: 3600, tags: ['items'] },
    });
    if (!res.ok) return null;
    return (await res.json()) as Item;
  } catch {
    return null;
  }
}

export async function getLookbook(): Promise<LookbookSlide[]> {
  return safeFetch<LookbookSlide[]>('/api/public/lookbook', 'lookbook', []);
}

export async function getSiteContent(): Promise<SiteContentGroups> {
  const response = await safeFetch<SiteContentResponse>('/api/public/site-content', 'site-content', {
    groups: FALLBACK_SITE_CONTENT,
  });
  return { ...FALLBACK_SITE_CONTENT, ...response.groups } as SiteContentGroups;
}

/** Resolves a stored image path/URL to something <img>/next/image can load. */
export function resolveImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  // Seeded dev content still uses the legacy relative asset paths (e.g. "assets/hero.png"),
  // which this app also ships under /assets for local/dev parity with the live site.
  return `/${imageUrl.replace(/^\/+/, '')}`;
}
