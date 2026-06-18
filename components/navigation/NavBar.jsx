import React from 'react';
import { Wordmark } from '../brand/Wordmark.jsx';
import { WhatsAppButton } from '../brand/WhatsAppButton.jsx';

function MenuIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"
      style={{ transition: 'transform var(--dur-base) var(--ease-out)' }}>
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}

/**
 * Site navigation. Transparent over the hero, transitions to solid ivory + shadow
 * on scroll. Items collapse to an animated drawer on mobile.
 *
 * Pass `links` (defaults to Shop / Lookbook / Our Story / Contact).
 * `forceSolid` renders the solid state immediately (useful inside cards/kits).
 */
export function NavBar({
  links = [
    { label: 'Shop', href: '#shop' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Our Story', href: '#story' },
    { label: 'Contact', href: '#contact' },
  ],
  forceSolid = false,
  style = {},
  ...rest
}) {
  const [scrolled, setScrolled] = React.useState(forceSolid);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (forceSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceSolid]);

  const solid = scrolled || open;
  const linkColor = solid ? 'var(--text-strong)' : 'var(--on-dark)';

  return (
    <nav
      aria-label="Primary"
      style={{
        position: forceSolid ? 'relative' : 'fixed',
        top: 0, left: 0, right: 0, zIndex: 80,
        background: solid ? 'var(--surface-page)' : 'transparent',
        boxShadow: scrolled ? 'var(--shadow-nav)' : 'none',
        borderBottom: solid ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto', height: 'var(--nav-h)',
        padding: '0 var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
      }}>
        <Wordmark tone={solid ? 'dark' : 'light'} size="md" href="#top" />

        {/* desktop links */}
        <div className="ks-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
          {links.map((l) => (
            <NavLink key={l.label} href={l.href} color={linkColor}>{l.label}</NavLink>
          ))}
          <WhatsAppButton floating={false} label="Enquire" style={{ padding: '0.6rem 1.1rem', fontSize: '0.7rem' }} />
        </div>

        {/* mobile toggle */}
        <button
          className="ks-nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'none', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, border: 'none', background: 'transparent',
            color: linkColor, cursor: 'pointer',
          }}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className="ks-nav-drawer"
        style={{
          display: 'none',
          overflow: 'hidden',
          maxHeight: open ? '420px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
          background: 'var(--surface-page)',
          borderBottom: open ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <div style={{ padding: 'var(--space-5) var(--gutter) var(--space-6)', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 'var(--fw-semibold)',
              letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-strong)',
            }}>{l.label}</a>
          ))}
          <WhatsAppButton label="Order on WhatsApp" style={{ marginTop: '0.5rem' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ks-nav-desktop { display: none !important; }
          .ks-nav-toggle { display: inline-flex !important; }
          .ks-nav-drawer { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ href, color, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color,
        paddingBottom: '0.2rem',
        boxShadow: `inset 0 -1px 0 ${hover ? 'var(--gold)' : 'transparent'}`,
        transition: 'box-shadow var(--dur-base) var(--ease-out)',
      }}
    >{children}</a>
  );
}
