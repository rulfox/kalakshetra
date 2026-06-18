import * as React from 'react';

export interface PullQuoteProps extends React.HTMLAttributes<HTMLElement> {
  /** The quote text. */
  children?: React.ReactNode;
  /** Attribution name (e.g. "Dr. Aswathy Sudarsanan"). */
  author?: React.ReactNode;
  /** Role/credit under the name. */
  role?: React.ReactNode;
  /** "dark" on light surfaces, "light" on dark. Default "dark". */
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

/** Large italic serif pull-quote with founder attribution. */
export function PullQuote(props: PullQuoteProps): JSX.Element;
