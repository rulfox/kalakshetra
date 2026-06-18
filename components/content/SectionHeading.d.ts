import * as React from 'react';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLElement> {
  /** Uppercase gold eyebrow label, e.g. "THE PHILOSOPHY". */
  eyebrow?: React.ReactNode;
  /** Serif section title. */
  title?: React.ReactNode;
  /** Optional lead intro paragraph. */
  intro?: React.ReactNode;
  /** Text alignment. Default "left". */
  align?: 'left' | 'center';
  /** "dark" on light surfaces, "light" on dark. Default "dark". */
  tone?: 'dark' | 'light';
  style?: React.CSSProperties;
}

/** Recurring section-header lockup: eyebrow + gold rule + serif title + intro. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
