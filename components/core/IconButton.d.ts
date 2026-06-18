import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color tone for the icon. Default "default". */
  tone?: 'default' | 'onDark' | 'gold';
  /** Square hit-target size in px (min 44 for touch). Default 44. */
  size?: number;
  /** "ghost" (no border) or "outline" (gold hairline). Default "ghost". */
  variant?: 'ghost' | 'outline';
  /** REQUIRED for a11y — describes the action. */
  'aria-label': string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Icon-only button for nav, carousel arrows, close, and social links. */
export function IconButton(props: IconButtonProps): JSX.Element;
