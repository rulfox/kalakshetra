import * as React from 'react';

export interface LookbookSlide {
  /** CSS background for the placeholder when no image. */
  swatch?: string;
  /** Image URL. */
  image?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Serif caption overlaid bottom-left. */
  caption?: string;
  /** Uppercase gold eyebrow above the caption. */
  eyebrow?: string;
}

export interface LookbookProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: LookbookSlide[];
  /** Autoplay (pauses on hover/focus). Default true. */
  autoPlay?: boolean;
  /** Autoplay interval in ms. Default 5000. */
  interval?: number;
  style?: React.CSSProperties;
}

/**
 * Immersive editorial carousel — looping, autoplay w/ pause on hover, dots,
 * prev/next, keyboard + swipe.
 * @startingPoint section="Navigation" subtitle="Editorial lookbook carousel" viewport="900x560"
 */
export function Lookbook(props: LookbookProps): JSX.Element;
