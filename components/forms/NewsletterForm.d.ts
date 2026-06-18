import * as React from 'react';

export interface NewsletterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  /** "dark" (footer, default) or "light". */
  tone?: 'dark' | 'light';
  style?: React.CSSProperties;
}

/**
 * Footer newsletter signup with email validation + success confirmation.
 * @startingPoint section="Forms" subtitle="Newsletter signup w/ validation" viewport="420x220"
 */
export function NewsletterForm(props: NewsletterFormProps): JSX.Element;
