import * as React from 'react';

export interface NavLinkItem { label: string; href: string; }

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Nav items. Defaults to Shop / Lookbook / Our Story / Contact. */
  links?: NavLinkItem[];
  /** Render the solid ivory state immediately (no scroll listener). Default false. */
  forceSolid?: boolean;
  style?: React.CSSProperties;
}

/**
 * Sticky site navigation: transparent over hero → solid ivory + shadow on scroll,
 * with an animated mobile drawer.
 * @startingPoint section="Navigation" subtitle="Sticky nav + mobile drawer" viewport="1280x120"
 */
export function NavBar(props: NavBarProps): JSX.Element;
