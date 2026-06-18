import * as React from 'react';

export interface WhatsAppGlyphProps {
  size?: number;
  style?: React.CSSProperties;
}
/** Official WhatsApp glyph as inline SVG. */
export function WhatsAppGlyph(props: WhatsAppGlyphProps): JSX.Element;

export interface WhatsAppButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Product name — builds a per-product pre-filled enquiry message. */
  product?: string | null;
  /** Override the wa.me number. Default 919400384167. */
  number?: string;
  /** Visible label (hidden when floating). Default "Order on WhatsApp". */
  label?: string;
  /** Render as the persistent floating round button. Default false. */
  floating?: boolean;
  /** Fully custom pre-filled message (overrides the product template). */
  message?: string | null;
  style?: React.CSSProperties;
}

/**
 * WhatsApp order CTA — the brand's only "buy" affordance (no cart/checkout).
 * @startingPoint section="Brand" subtitle="WhatsApp order CTA + float" viewport="700x200"
 */
export function WhatsAppButton(props: WhatsAppButtonProps): JSX.Element;
