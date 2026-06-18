import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Accent tone. Default "gold". Mural tones used sparingly. */
  tone?: 'gold' | 'wood' | 'red' | 'green' | 'indigo';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Small uppercase pill tag for categories (Men/Women/Kids) and quiet status labels. */
export function Tag(props: TagProps): JSX.Element;
