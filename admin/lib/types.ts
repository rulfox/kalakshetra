export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  displayName: string;
}

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

export interface SiteContentEntry {
  key: string;
  value: string;
  label: string;
  group: string;
  updatedAt: string;
}

export interface Subscriber {
  id: number;
  email: string;
  source: string | null;
  subscribedAt: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface PresignResponse {
  uploadUrl: string;
  publicUrl: string;
  s3Key: string;
  expiresInSeconds: number;
}
