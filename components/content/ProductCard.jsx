import React from 'react';
import { Tag } from '../core/Tag.jsx';
import { WhatsAppButton } from '../brand/WhatsAppButton.jsx';

/**
 * Featured product card — image (real photo or warm placeholder swatch),
 * name, one-line theme description, category tag, and an Order-on-WhatsApp CTA.
 * Hover = image zoom (~1.05) + card lift + gold caption reveal.
 *
 * Pricing is enquiry-only — never pass or render a price.
 */
export function ProductCard({
  name,
  theme,                 // one-line theme description
  category,              // "Men" | "Women" | "Kids"
  categoryTone = 'gold',
  image = null,          // image URL; falls back to a warm placeholder swatch
  swatch = 'linear-gradient(135deg, #C9A227 0%, #B05E3B 55%, #5C4033 100%)',
  comingSoon = false,    // "new pieces arriving — enquire" placeholder state
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...rest}
    >
      {/* Fixed 3:4 media box — no layout shift */}
      <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', background: swatch }}>
        {image && (
          <img
            src={image}
            alt={`${name} — hand-painted ${theme || 'piece'}`}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform var(--dur-slow) var(--ease-out)',
            }}
          />
        )}
        {/* category tag, top-left */}
        {category && (
          <div style={{ position: 'absolute', top: '0.9rem', left: '0.9rem' }}>
            <Tag tone={categoryTone} style={{ background: 'rgba(250,247,240,0.92)' }}>{category}</Tag>
          </div>
        )}
        {comingSoon && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(28,26,23,0.34)',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 'var(--fw-semibold)',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark)',
            }}>New pieces arriving — enquire</span>
          </div>
        )}
        {/* gold caption reveal on hover */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '1.4rem 1rem 0.9rem',
          background: 'linear-gradient(to top, rgba(28,26,23,0.78), transparent)',
          color: 'var(--on-dark)',
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 'var(--fw-semibold)',
            letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)',
          }}>Hand-painted · 1-of-1</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h5)', fontWeight: 'var(--fw-medium)',
          color: 'var(--text-strong)', margin: 0,
        }}>{name}</h3>
        {theme && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)',
            color: 'var(--text-body)', margin: 0,
          }}>{theme}</p>
        )}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 'var(--fw-medium)',
            letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>Price on enquiry</span>
          <WhatsAppButton product={name} label="Order" style={{ padding: '0.6rem 1rem', fontSize: '0.7rem' }} />
        </div>
      </div>
    </article>
  );
}
