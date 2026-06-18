import * as React from 'react';

export interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Product name, e.g. "Kathakali Maestro". */
  name: string;
  /** One-line theme description, e.g. "Kathakali face in temple reds". */
  theme?: string;
  /** Category label: "Men" | "Women" | "Kids". */
  category?: string;
  /** Tag tone for the category chip. Default "gold". */
  categoryTone?: 'gold' | 'wood' | 'red' | 'green' | 'indigo';
  /** Image URL. Omit to use the warm gradient placeholder. */
  image?: string | null;
  /** CSS background for the placeholder swatch when no image. */
  swatch?: string;
  /** Show "new pieces arriving — enquire" overlay (Women's placeholder). */
  comingSoon?: boolean;
  style?: React.CSSProperties;
}

/**
 * Featured product card — image, name, theme, category, Order-on-WhatsApp CTA.
 * Hover zooms the image and lifts the card. Pricing is enquiry-only.
 * @startingPoint section="Content" subtitle="Hand-painted product card" viewport="360x520"
 */
export function ProductCard(props: ProductCardProps): JSX.Element;
