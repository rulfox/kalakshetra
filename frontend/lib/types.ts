export interface Category {
  id: number;
  slug: string;
  name: string;
  sortOrder: number;
  updatedAt: string;
}

export interface Item {
  id: number;
  slug: string;
  title: string;
  themeDescription: string | null;
  categorySlug: string;
  categoryName: string;
  categoryTone: string;
  imageUrl: string | null;
  imageAlt: string | null;
  swatchColor: string | null;
  comingSoon: boolean;
  published: boolean;
  sortOrder: number;
  updatedAt: string;
}

export interface LookbookSlide {
  id: number;
  imageUrl: string;
  imageAlt: string | null;
  eyebrow: string | null;
  caption: string | null;
  sortOrder: number;
  updatedAt: string;
}

export interface SiteContentGroups {
  hero: { eyebrow: string; headline: string; subcopy: string };
  philosophy: {
    eyebrow: string;
    title: string;
    intro: string;
    quote: string;
    quoteAuthor: string;
    quoteRole: string;
  };
  commission: { eyebrow: string; title: string; body: string; footnote: string };
  story: {
    eyebrow: string;
    title: string;
    intro: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Label: string;
  };
  howToOrder: {
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };
  contact: {
    whatsappNumber: string;
    phoneDisplay: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    locationLine: string;
  };
  footer: { tagline: string; shippingLine: string };
}

export interface SiteContentResponse {
  groups: Partial<SiteContentGroups>;
}
