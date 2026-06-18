import * as React from 'react';

export interface StatPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Optional leading value, e.g. "100%" or "1-of-1". Renders in serif gold. */
  value?: React.ReactNode;
  /** Label text, set uppercase + tracked. */
  label: React.ReactNode;
  style?: React.CSSProperties;
}

/** Quiet stat pill for the Our Story credibility row. */
export function StatPill(props: StatPillProps): JSX.Element;
