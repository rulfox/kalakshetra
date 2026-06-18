import * as React from 'react';

export interface WordmarkProps extends React.HTMLAttributes<HTMLElement> {
  /** "dark" = ink text on light surfaces; "light" = ivory on dark. Default "dark". */
  tone?: 'dark' | 'light';
  /** Size. Default "md". */
  size?: 'sm' | 'md' | 'lg';
  /** Show the "Hand Painted with Love" tagline line. Default true. */
  showTagline?: boolean;
  /** Element to render. Default "a". */
  as?: 'a' | 'div' | 'span';
  style?: React.CSSProperties;
}

/**
 * Serif wordmark + tagline lockup (the brand logo, as live text).
 * @startingPoint section="Brand" subtitle="Serif wordmark + tagline" viewport="700x160"
 */
export function Wordmark(props: WordmarkProps): JSX.Element;
