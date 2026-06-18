import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Default "outline" (gold outline → gold fill on hover). */
  variant?: 'outline' | 'solid' | 'whatsapp' | 'ghost';
  /** Size. Default "md". */
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element, e.g. "a" for links. Default "button". */
  as?: 'button' | 'a';
  /** Stretch to fill container width. */
  fullWidth?: boolean;
  /** Optional icon node before the label. */
  iconLeft?: React.ReactNode;
  /** Optional icon node after the label. */
  iconRight?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Primary call-to-action button for Kalakshetra.
 * @startingPoint section="Core" subtitle="Gold-outline & WhatsApp CTAs" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
