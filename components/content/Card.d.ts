import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lift + deepen shadow on hover. Default false. */
  hoverLift?: boolean;
  /** Apply default inner padding. Default true. */
  padded?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Generic white surface card with soft warm shadow and near-square corners. */
export function Card(props: CardProps): JSX.Element;
