/* @ds-bundle: {"format":3,"namespace":"KalakshetraHandpaintingsDesignSystem_6971f4","components":[{"name":"WhatsAppGlyph","sourcePath":"components/brand/WhatsAppButton.jsx"},{"name":"WhatsAppButton","sourcePath":"components/brand/WhatsAppButton.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"ProductCard","sourcePath":"components/content/ProductCard.jsx"},{"name":"PullQuote","sourcePath":"components/content/PullQuote.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"StatPill","sourcePath":"components/core/StatPill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"NewsletterForm","sourcePath":"components/forms/NewsletterForm.jsx"},{"name":"Lookbook","sourcePath":"components/navigation/Lookbook.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/brand/WhatsAppButton.jsx":"311587149eb3","components/brand/Wordmark.jsx":"765022345a30","components/content/Card.jsx":"dbaad9fb289b","components/content/ProductCard.jsx":"70f46847fb58","components/content/PullQuote.jsx":"5df77d452efc","components/content/SectionHeading.jsx":"127b3771f5ef","components/core/Button.jsx":"9a174648fc37","components/core/IconButton.jsx":"1297ab8ce2e6","components/core/StatPill.jsx":"d57e7734abe4","components/core/Tag.jsx":"4d77007c29e7","components/forms/Input.jsx":"17774924eebc","components/forms/NewsletterForm.jsx":"482af0ae64bd","components/navigation/Lookbook.jsx":"f985d7f8b94b","components/navigation/NavBar.jsx":"4af9e76c484e","ui_kits/website/sections.jsx":"339fa2440e76"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KalakshetraHandpaintingsDesignSystem_6971f4 = window.KalakshetraHandpaintingsDesignSystem_6971f4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Official WhatsApp glyph as an inline SVG (Lucide has no WhatsApp mark). */
function WhatsAppGlyph({
  size = 20,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
  }));
}
const PRIMARY_NUMBER = '919400384167';

/**
 * Persistent floating WhatsApp order button (brand green, glow shadow).
 * Builds a wa.me link with a URL-encoded, per-product pre-filled message.
 */
function WhatsAppButton({
  product = null,
  number = PRIMARY_NUMBER,
  label = 'Order on WhatsApp',
  floating = false,
  message = null,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const text = message || (product ? `Hi Kalakshetra, I'm interested in the '${product}' hand-painted piece. Could you share details on size, fabric and price?` : `Hi Kalakshetra, I'd love to know more about your hand-painted pieces — size, fabric and price.`);
  const href = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  if (floating) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: 'fixed',
        right: '1.5rem',
        bottom: '1.5rem',
        zIndex: 90,
        width: 60,
        height: 60,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--whatsapp)',
        color: '#fff',
        boxShadow: 'var(--shadow-float)',
        transform: hover ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform var(--dur-base) var(--ease-out)',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(WhatsAppGlyph, {
      size: 30
    }));
  }
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.6rem',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: '0.8125rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#fff',
      background: hover ? '#1a6841' : 'var(--whatsapp-ink)',
      border: '1px solid transparent',
      borderRadius: 'var(--radius-md)',
      padding: '0.8rem 1.4rem',
      cursor: 'pointer',
      transition: 'background var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(WhatsAppGlyph, {
    size: 18
  }), label);
}
Object.assign(__ds_scope, { WhatsAppGlyph, WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Kalakshetra serif wordmark + tagline, rendered as live text.
 * `tone` controls light/dark surfaces; `showTagline` toggles the
 * "Hand Painted with Love" line.
 */
function Wordmark({
  tone = 'dark',
  // "dark" = ink text (on light), "light" = ivory (on dark)
  size = 'md',
  showTagline = true,
  as = 'a',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      name: '1.25rem',
      tag: '0.55rem'
    },
    md: {
      name: '1.7rem',
      tag: '0.6rem'
    },
    lg: {
      name: '2.4rem',
      tag: '0.7rem'
    }
  };
  const s = sizes[size];
  const nameColor = tone === 'light' ? 'var(--on-dark)' : 'var(--ink)';
  const tagColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--accent-strong)';
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      lineHeight: 1,
      textDecoration: 'none',
      ...style
    },
    "aria-label": "Kalakshetra Handpaintings \u2014 Hand Painted with Love"
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: s.name,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.01em',
      color: nameColor
    }
  }, "Kalakshetra"), showTagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: s.tag,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: tagColor,
      marginTop: '0.35rem'
    }
  }, "Hand Painted with Love"));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Generic surface card — white, near-square corners, soft warm shadow,
 * optional lift on hover. Compose ProductCard and content blocks on top.
 */
function Card({
  children,
  hoverLift = false,
  padded = true,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      boxShadow: hoverLift && hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
      transform: hoverLift && hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      overflow: 'hidden',
      padding: padded ? 'var(--space-6)' : 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/PullQuote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Large serif pull-quote with optional founder attribution/signature.
 * Used in The Philosophy and Our Story.
 */
function PullQuote({
  children,
  author = null,
  role = null,
  tone = 'dark',
  align = 'left',
  style = {},
  ...rest
}) {
  const quoteColor = tone === 'light' ? 'var(--on-dark)' : 'var(--text-strong)';
  const metaColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--text-muted)';
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      gap: '1.4rem',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '3.5rem',
      lineHeight: 0.5,
      color: 'var(--gold)',
      height: '0.6em',
      marginBottom: '0.2rem'
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.6rem, 3.2vw, 2.35rem)',
      fontWeight: 'var(--fw-regular)',
      fontStyle: 'italic',
      lineHeight: 1.35,
      letterSpacing: 'var(--ls-tight)',
      color: quoteColor,
      maxWidth: '24ch',
      textWrap: 'balance'
    }
  }, children), author && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      color: quoteColor
    }
  }, author), role && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: metaColor
    }
  }, role)));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Section heading lockup: uppercase gold eyebrow + short gold rule + serif title,
 * with optional intro paragraph. The recurring section-header pattern across the site.
 */
function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  // "dark" = on light surface; "light" = on dark surface
  style = {},
  ...rest
}) {
  const titleColor = tone === 'light' ? 'var(--on-dark)' : 'var(--text-strong)';
  const introColor = tone === 'light' ? 'var(--on-dark-soft)' : 'var(--text-body)';
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      gap: '0.9rem',
      maxWidth: centered ? '640px' : 'none',
      marginLeft: centered ? 'auto' : 0,
      marginRight: centered ? 'auto' : 0,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.7rem',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--accent-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--gold)',
      display: 'inline-block'
    }
  }), eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--fw-medium)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-tight)',
      color: titleColor,
      margin: 0,
      textWrap: 'balance'
    }
  }, title), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-relaxed)',
      color: introColor,
      maxWidth: '52ch',
      textWrap: 'pretty',
      margin: 0
    }
  }, intro));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Kalakshetra primary button.
 * Variants:
 *  - "outline" (default): gold outline that fills with gold on hover (the hero CTA look)
 *  - "solid":   solid wood/ink button for secondary emphasis
 *  - "whatsapp": WhatsApp-green order CTA
 *  - "ghost":   quiet text button with a growing gold underline
 */
function Button({
  children,
  variant = 'outline',
  size = 'md',
  as = 'button',
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.8125rem'
    },
    md: {
      padding: '0.85rem 1.75rem',
      fontSize: '0.875rem'
    },
    lg: {
      padding: '1.05rem 2.4rem',
      fontSize: '0.95rem'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--dur-base) var(--ease-out)',
    width: fullWidth ? '100%' : 'auto',
    transform: active ? 'scale(0.98)' : 'scale(1)',
    lineHeight: 1,
    ...sizes[size]
  };
  const variants = {
    outline: {
      background: hover ? 'var(--gold)' : 'transparent',
      color: hover ? 'var(--ink)' : 'var(--accent-strong)',
      borderColor: 'var(--gold)'
    },
    solid: {
      background: hover ? '#4a332a' : 'var(--wood)',
      color: 'var(--on-dark)',
      borderColor: 'transparent'
    },
    whatsapp: {
      background: hover ? '#1a6841' : 'var(--whatsapp-ink)',
      color: '#FFFFFF',
      borderColor: 'transparent'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent',
      letterSpacing: '0.04em',
      textTransform: 'none',
      boxShadow: hover ? 'inset 0 -1px 0 var(--gold)' : 'inset 0 -1px 0 transparent',
      borderRadius: 0
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon-only button (nav menu, carousel arrows, close, social).
 * Always pass an accessible label via `aria-label`.
 * Tones: "default" (ink on light), "onDark" (ivory on dark), "gold".
 */
function IconButton({
  children,
  tone = 'default',
  size = 44,
  variant = 'ghost',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    default: {
      color: 'var(--ink)',
      hoverBg: 'rgba(28,26,23,0.06)'
    },
    onDark: {
      color: 'var(--on-dark)',
      hoverBg: 'rgba(250,247,240,0.12)'
    },
    gold: {
      color: 'var(--accent-strong)',
      hoverBg: 'rgba(201,162,39,0.12)'
    }
  };
  const t = tones[tone];
  const bordered = variant === 'outline';
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      minWidth: size,
      padding: 0,
      color: t.color,
      background: hover ? t.hoverBg : 'transparent',
      border: bordered ? '1px solid var(--border-gold)' : '1px solid transparent',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/StatPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Quiet "stat pill" used in Our Story — e.g. 100% hand painted · 1-of-1 · Kerala-rooted.
 * Gold hairline border, serif numeral optional via `value`.
 */
function StatPill({
  value,
  label,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '0.5rem',
      border: '1px solid var(--border-gold)',
      borderRadius: 'var(--radius-pill)',
      padding: '0.6rem 1.2rem',
      background: 'transparent',
      ...style
    }
  }, rest), value != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--accent-strong)',
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.75rem',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small category / status tag. Uppercase, tracked, pill-shaped.
 * Mural-accent tones are used sparingly (category chips, "made to order").
 */
function Tag({
  children,
  tone = 'gold',
  style = {},
  ...rest
}) {
  const tones = {
    gold: {
      color: 'var(--accent-strong)',
      border: 'var(--border-gold)',
      bg: 'rgba(201,162,39,0.08)'
    },
    wood: {
      color: 'var(--wood)',
      border: 'rgba(92,64,51,0.3)',
      bg: 'rgba(92,64,51,0.06)'
    },
    red: {
      color: 'var(--temple-red)',
      border: 'rgba(139,46,46,0.3)',
      bg: 'rgba(139,46,46,0.06)'
    },
    green: {
      color: 'var(--kathakali-green)',
      border: 'rgba(31,95,91,0.3)',
      bg: 'rgba(31,95,91,0.06)'
    },
    indigo: {
      color: 'var(--indigo)',
      border: 'rgba(46,58,89,0.3)',
      bg: 'rgba(46,58,89,0.06)'
    }
  };
  const t = tones[tone] || tones.gold;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: '0.6875rem',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: t.color,
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-pill)',
      padding: '0.3rem 0.7rem',
      lineHeight: 1,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Featured product card — image (real photo or warm placeholder swatch),
 * name, one-line theme description, category tag, and an Order-on-WhatsApp CTA.
 * Hover = image zoom (~1.05) + card lift + gold caption reveal.
 *
 * Pricing is enquiry-only — never pass or render a price.
 */
function ProductCard({
  name,
  theme,
  // one-line theme description
  category,
  // "Men" | "Women" | "Kids"
  categoryTone = 'gold',
  image = null,
  // image URL; falls back to a warm placeholder swatch
  swatch = 'linear-gradient(135deg, #C9A227 0%, #B05E3B 55%, #5C4033 100%)',
  comingSoon = false,
  // "new pieces arriving — enquire" placeholder state
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '3 / 4',
      overflow: 'hidden',
      background: swatch
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: `${name} — hand-painted ${theme || 'piece'}`,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), category && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '0.9rem',
      left: '0.9rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: categoryTone,
    style: {
      background: 'rgba(250,247,240,0.92)'
    }
  }, category)), comingSoon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(28,26,23,0.34)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.7rem',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--on-dark)'
    }
  }, "New pieces arriving \u2014 enquire")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '1.4rem 1rem 0.9rem',
      background: 'linear-gradient(to top, rgba(28,26,23,0.78), transparent)',
      color: 'var(--on-dark)',
      opacity: hover ? 1 : 0,
      transform: hover ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.6875rem',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--gold)'
    }
  }, "Hand-painted \xB7 1-of-1"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.45rem',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h5)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, name), theme && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, theme), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.7rem',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Price on enquiry"), /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
    product: name,
    label: "Order",
    style: {
      padding: '0.6rem 1rem',
      fontSize: '0.7rem'
    }
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label, helper, and error/success states.
 * Gold focus ring; thin hairline border; near-square corners.
 */
function Input({
  label,
  id,
  error = null,
  success = null,
  tone = 'light',
  // "light" surface or "dark" (footer)
  style = {},
  containerStyle = {},
  ...rest
}) {
  const reactId = React.useId();
  const inputId = id || reactId;
  const [focus, setFocus] = React.useState(false);
  const onDark = tone === 'dark';
  const labelColor = onDark ? 'var(--on-dark-soft)' : 'var(--text-body)';
  const borderColor = error ? 'var(--temple-red)' : success ? 'var(--whatsapp-ink)' : focus ? 'var(--gold)' : onDark ? 'rgba(250,247,240,0.25)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: labelColor
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    "aria-invalid": !!error,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      color: onDark ? 'var(--on-dark)' : 'var(--text-strong)',
      background: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${borderColor}`,
      borderRadius: 0,
      padding: '0.7rem 0.1rem',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest)), error && /*#__PURE__*/React.createElement("span", {
    role: "alert",
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--temple-red)'
    }
  }, error), !error && success && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: onDark ? '#7BD3A0' : 'var(--whatsapp-ink)'
    }
  }, success));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/NewsletterForm.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Newsletter signup with email validation and inline error + success state.
 * Self-contained (useState only). Lives in the footer.
 */
function NewsletterForm({
  tone = 'dark',
  style = {},
  ...rest
}) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const onDark = tone === 'dark';
  function submit(e) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setDone(true);
  }
  if (done) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1.1rem 1.25rem',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-md)',
        background: onDark ? 'rgba(201,162,39,0.08)' : 'rgba(201,162,39,0.06)',
        ...style
      },
      role: "status"
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '1.25rem',
        fontStyle: 'italic',
        color: onDark ? 'var(--on-dark)' : 'var(--text-strong)'
      }
    }, "Thank you \u2014 you're on the list."), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        color: onDark ? 'var(--on-dark-soft)' : 'var(--text-body)'
      }
    }, "We'll write softly, and only about new hand-painted pieces."));
  }
  return /*#__PURE__*/React.createElement("form", _extends({
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    label: "Join the atelier list",
    type: "email",
    tone: tone,
    placeholder: "you@example.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      if (error) setError(null);
    },
    error: error,
    "aria-label": "Email address"
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    variant: "outline",
    size: "md"
  }, "Subscribe"));
}
Object.assign(__ds_scope, { NewsletterForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NewsletterForm.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Lookbook.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chevron({
  dir
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, dir === 'left' ? /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  }) : /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }));
}

/**
 * Immersive Lookbook carousel — state-driven, looping, autoplay w/ pause on hover,
 * dot indicators, prev/next, keyboard (←/→) and swipe friendly.
 *
 * `slides`: [{ swatch?, image?, alt?, caption?, eyebrow? }]
 */
function Lookbook({
  slides = [],
  autoPlay = true,
  interval = 5000,
  style = {},
  ...rest
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = slides.length;
  const touch = React.useRef(null);
  const go = React.useCallback(i => setIndex((i % n + n) % n), [n]);
  const next = React.useCallback(() => go(index + 1), [go, index]);
  const prev = React.useCallback(() => go(index - 1), [go, index]);
  React.useEffect(() => {
    if (!autoPlay || paused || n <= 1) return;
    const id = setInterval(() => setIndex(p => (p + 1) % n), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, n, interval]);
  if (n === 0) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "region",
    "aria-roledescription": "carousel",
    "aria-label": "Lookbook",
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onKeyDown: e => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    },
    tabIndex: 0,
    onTouchStart: e => {
      touch.current = e.touches[0].clientX;
    },
    onTouchEnd: e => {
      if (touch.current == null) return;
      const dx = e.changedTouches[0].clientX - touch.current;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      touch.current = null;
    },
    style: {
      position: 'relative',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      transform: `translateX(-${index * 100}%)`,
      transition: 'transform var(--dur-slow) var(--ease-in-out)'
    }
  }, slides.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    "aria-hidden": i !== index,
    style: {
      minWidth: '100%',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16 / 9',
      background: s.swatch || 'linear-gradient(135deg,#5C4033,#B05E3B)',
      overflow: 'hidden'
    }
  }, s.image && /*#__PURE__*/React.createElement("img", {
    src: s.image,
    alt: s.alt || s.caption || 'Lookbook image',
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), (s.caption || s.eyebrow) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      padding: 'var(--space-7) var(--space-6) var(--space-6)',
      background: 'linear-gradient(to top, rgba(28,26,23,0.7), transparent)',
      color: 'var(--on-dark)'
    }
  }, s.eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold)'
    }
  }, s.eyebrow), s.caption && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.4rem,3vw,2rem)',
      fontStyle: 'italic',
      color: 'var(--on-dark)',
      margin: '0.4rem 0 0',
      maxWidth: '28ch',
      textWrap: 'balance'
    }
  }, s.caption))))), /*#__PURE__*/React.createElement(CarouselArrow, {
    dir: "left",
    onClick: prev
  }), /*#__PURE__*/React.createElement(CarouselArrow, {
    dir: "right",
    onClick: next
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.6rem',
      marginTop: 'var(--space-5)'
    }
  }, slides.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    "aria-label": `Go to slide ${i + 1}`,
    "aria-current": i === index,
    onClick: () => go(i),
    style: {
      width: i === index ? 28 : 9,
      height: 9,
      padding: 0,
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      background: i === index ? 'var(--gold)' : 'var(--border-strong)',
      transition: 'width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)'
    }
  }))));
}
function CarouselArrow({
  dir,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": dir === 'left' ? 'Previous slide' : 'Next slide',
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [dir]: 'var(--space-5)',
      width: 48,
      height: 48,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: 'pointer',
      background: hover ? 'var(--ivory)' : 'rgba(250,247,240,0.85)',
      color: 'var(--ink)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    dir: dir
  }));
}
Object.assign(__ds_scope, { Lookbook });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Lookbook.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MenuIcon({
  open
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    "aria-hidden": "true",
    style: {
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, open ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "5",
    x2: "19",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "5",
    x2: "5",
    y2: "19"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "7",
    x2: "21",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "17",
    x2: "21",
    y2: "17"
  })));
}

/**
 * Site navigation. Transparent over the hero, transitions to solid ivory + shadow
 * on scroll. Items collapse to an animated drawer on mobile.
 *
 * Pass `links` (defaults to Shop / Lookbook / Our Story / Contact).
 * `forceSolid` renders the solid state immediately (useful inside cards/kits).
 */
function NavBar({
  links = [{
    label: 'Shop',
    href: '#shop'
  }, {
    label: 'Lookbook',
    href: '#lookbook'
  }, {
    label: 'Our Story',
    href: '#story'
  }, {
    label: 'Contact',
    href: '#contact'
  }],
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
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceSolid]);
  const solid = scrolled || open;
  const linkColor = solid ? 'var(--text-strong)' : 'var(--on-dark)';
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Primary",
    style: {
      position: forceSolid ? 'relative' : 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 80,
      background: solid ? 'var(--surface-page)' : 'transparent',
      boxShadow: scrolled ? 'var(--shadow-nav)' : 'none',
      borderBottom: solid ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      height: 'var(--nav-h)',
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    tone: solid ? 'dark' : 'light',
    size: "md",
    href: "#top"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ks-nav-desktop",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '2.4rem'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l.label,
    href: l.href,
    color: linkColor
  }, l.label)), /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
    floating: false,
    label: "Enquire",
    style: {
      padding: '0.6rem 1.1rem',
      fontSize: '0.7rem'
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "ks-nav-toggle",
    "aria-label": open ? 'Close menu' : 'Open menu',
    "aria-expanded": open,
    onClick: () => setOpen(v => !v),
    style: {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      border: 'none',
      background: 'transparent',
      color: linkColor,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(MenuIcon, {
    open: open
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ks-nav-drawer",
    style: {
      display: 'none',
      overflow: 'hidden',
      maxHeight: open ? '420px' : '0px',
      opacity: open ? 1 : 0,
      transition: 'max-height var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
      background: 'var(--surface-page)',
      borderBottom: open ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--gutter) var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.4rem'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    onClick: () => setOpen(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.95rem',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, l.label)), /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
    label: "Order on WhatsApp",
    style: {
      marginTop: '0.5rem'
    }
  }))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 860px) {
          .ks-nav-desktop { display: none !important; }
          .ks-nav-toggle { display: inline-flex !important; }
          .ks-nav-drawer { display: block !important; }
        }
      `));
}
function NavLink({
  href,
  color,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      fontFamily: 'var(--font-body)',
      fontSize: '0.75rem',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      paddingBottom: '0.2rem',
      boxShadow: `inset 0 -1px 0 ${hover ? 'var(--gold)' : 'transparent'}`,
      transition: 'box-shadow var(--dur-base) var(--ease-out)'
    }
  }, children);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Kalakshetra Handpaintings — website UI-kit sections.
   Composes the design-system primitives from window.<Namespace>. */
const KS = window.KalakshetraHandpaintingsDesignSystem_6971f4;
const {
  NavBar,
  Wordmark,
  WhatsAppButton,
  WhatsAppGlyph,
  Button,
  IconButton,
  Tag,
  StatPill,
  SectionHeading,
  PullQuote,
  ProductCard,
  Lookbook,
  NewsletterForm,
  Input
} = KS;
const wrap = {
  maxWidth: 'var(--container)',
  margin: '0 auto',
  padding: '0 var(--gutter)'
};
const section = {
  padding: 'var(--space-9) 0'
};

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return /*#__PURE__*/React.createElement("header", {
    id: "top",
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      background: 'linear-gradient(160deg, #2E3A59 0%, #5C4033 45%, #8B2E2E 100%)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 90% at 75% 15%, rgba(201,162,39,0.35), transparent 55%), radial-gradient(80% 70% at 15% 90%, rgba(31,95,91,0.45), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(28,26,23,0.65), rgba(28,26,23,0.12) 50%, rgba(28,26,23,0.35))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      paddingBottom: 'var(--space-10)',
      paddingTop: 'calc(var(--nav-h) + var(--space-7))'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.7rem',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 600,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 1,
      background: 'var(--gold)'
    }
  }), " Mavelikkara \xB7 Kerala"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h1)',
      fontWeight: 500,
      lineHeight: 1.02,
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--on-dark)',
      margin: '1.2rem 0 0',
      maxWidth: '16ch',
      textWrap: 'balance'
    }
  }, "Wearable art, painted by hand."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.6,
      color: 'var(--on-dark-soft)',
      margin: '1.4rem 0 2.2rem',
      maxWidth: '46ch',
      textWrap: 'pretty'
    }
  }, "One-of-a-kind shirts and pieces, hand-painted in Kerala \u2014 made to order, never repeated."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#shop",
    variant: "outline",
    size: "lg",
    style: {
      borderColor: 'var(--gold)',
      color: 'var(--gold)'
    }
  }, "Discover the Art"), /*#__PURE__*/React.createElement(WhatsAppButton, {
    style: {
      padding: '1.05rem 2rem'
    }
  }))), /*#__PURE__*/React.createElement("a", {
    href: "#philosophy",
    "aria-label": "Scroll to philosophy",
    style: {
      position: 'absolute',
      bottom: '1.6rem',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'var(--on-dark-soft)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))));
}

/* -------------------------- PHILOSOPHY -------------------------- */
function Philosophy() {
  return /*#__PURE__*/React.createElement("section", {
    id: "philosophy",
    style: {
      ...section,
      background: 'var(--surface-alt)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'var(--space-7)'
    },
    className: "ks-two-col"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Philosophy",
    title: "Ayurvedic roots, painted by hand",
    intro: "Founded by Dr. Aswathy Sudarsanan \u2014 an Ayurvedic physician and textile artist \u2014 Kalakshetra carries Kerala's mornings into something you can wear. Each piece is painted slowly, by hand, and never repeated."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(PullQuote, {
    author: "Dr. Aswathy Sudarsanan",
    role: "Founder \xB7 Physician & Textile Artist"
  }, "Every brushstroke carries a little of Kerala into a piece made only for you."))), /*#__PURE__*/React.createElement("style", null, `@media(min-width:880px){.ks-two-col{grid-template-columns:1fr 1fr;align-items:center;gap:var(--space-9)}}`));
}

/* ----------------------------- SHOP ----------------------------- */
const PRODUCTS = [{
  name: 'Kathakali Maestro',
  theme: 'Kathakali face in temple reds & Kathakali green',
  category: 'Men',
  tone: 'green',
  swatch: 'linear-gradient(150deg,#1F5F5B,#5C4033)'
}, {
  name: 'Theyyam Crown',
  theme: 'Theyyam mask & crown, painted in fire reds',
  category: 'Men',
  tone: 'red',
  swatch: 'linear-gradient(150deg,#8B2E2E,#5C4033)'
}, {
  name: 'Guruvayurappan',
  theme: 'Krishna of Guruvayur, in gold & indigo',
  category: 'Men',
  tone: 'indigo',
  swatch: 'linear-gradient(150deg,#2E3A59,#5C4033)'
}, {
  name: 'Peacock (Pattachitra)',
  theme: 'Temple-mural peacock, brushed by hand',
  category: 'Men',
  tone: 'green',
  swatch: 'linear-gradient(150deg,#1F5F5B,#2E3A59)'
}, {
  name: 'Gold Mandala',
  theme: 'A single Kasavu-gold mandala on ivory',
  category: 'Women',
  tone: 'gold',
  swatch: 'linear-gradient(150deg,#C9A227,#B05E3B)'
}, {
  name: 'Lotus Whisper',
  theme: 'New pieces arriving',
  category: 'Women',
  tone: 'gold',
  comingSoon: true,
  swatch: 'linear-gradient(150deg,#B05E3B,#C9A227)'
}, {
  name: 'Little Ganesha',
  theme: 'Ganesha motif for the smallest canvas',
  category: 'Kids',
  tone: 'red',
  swatch: 'linear-gradient(150deg,#D99A2B,#B05E3B)'
}, {
  name: 'Parrot & Mango',
  theme: 'Temple-mural birds in mustard & green',
  category: 'Kids',
  tone: 'green',
  swatch: 'linear-gradient(150deg,#1F5F5B,#D99A2B)'
}];
const CATS = ['All', 'Men', 'Women', 'Kids'];
function Shop() {
  const [cat, setCat] = React.useState('All');
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  return /*#__PURE__*/React.createElement("section", {
    id: "shop",
    style: {
      ...section,
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Featured",
    title: "Hand-painted collections",
    intro: "Shirts and pieces across Men, Women and Kids \u2014 each one a single canvas."
  }), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    "aria-label": "Categories",
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      margin: 'var(--space-6) 0 var(--space-7)'
    }
  }, CATS.map(c => {
    const active = c === cat;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      role: "tab",
      "aria-selected": active,
      onClick: () => setCat(c),
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '0.6rem 1.2rem',
        cursor: 'pointer',
        borderRadius: 'var(--radius-pill)',
        border: `1px solid ${active ? 'var(--gold)' : 'var(--border-strong)'}`,
        background: active ? 'var(--gold)' : 'transparent',
        color: active ? 'var(--ink)' : 'var(--text-body)',
        transition: 'all var(--dur-base) var(--ease-out)'
      }
    }, c);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: 'var(--space-6)'
    }
  }, list.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.name,
    name: p.name,
    theme: p.theme,
    category: p.category,
    categoryTone: p.tone,
    swatch: p.swatch,
    comingSoon: p.comingSoon
  })))));
}

/* --------------------------- LOOKBOOK --------------------------- */
const LOOK_SLIDES = [{
  swatch: 'linear-gradient(135deg,#5C4033,#B05E3B)',
  eyebrow: 'Worn in Kerala',
  caption: 'A painted shirt with the set-mundu.'
}, {
  swatch: 'linear-gradient(135deg,#1F5F5B,#2E3A59)',
  eyebrow: 'Pattachitra',
  caption: 'Temple-mural peacock, brushed by hand.'
}, {
  swatch: 'linear-gradient(135deg,#8B2E2E,#5C4033)',
  eyebrow: 'Kathakali',
  caption: 'A face of the festival, on cotton.'
}, {
  swatch: 'linear-gradient(135deg,#C9A227,#B05E3B)',
  eyebrow: 'Gold Mandala',
  caption: 'Kasavu gold, quietly placed.'
}];
function LookbookSection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "lookbook",
    style: {
      ...section,
      background: 'var(--wood)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "light",
    align: "center",
    eyebrow: "Lookbook",
    title: "Worn, not just made",
    style: {
      marginBottom: 'var(--space-7)'
    }
  }), /*#__PURE__*/React.createElement(Lookbook, {
    slides: LOOK_SLIDES,
    interval: 6000
  })));
}

/* ---------------------------- STORY ----------------------------- */
function Story() {
  return /*#__PURE__*/React.createElement("section", {
    id: "story",
    style: {
      ...section,
      background: 'var(--surface-alt)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'var(--space-7)'
    },
    className: "ks-two-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 5',
      borderRadius: 'var(--radius-md)',
      background: 'linear-gradient(150deg,#5C4033,#1F5F5B)',
      boxShadow: 'var(--shadow-card)'
    },
    "aria-label": "The Kalakshetra studio in Mavelikkara",
    role: "img"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Our Story",
    title: "A small studio in Mavelikkara",
    intro: "We paint slowly, one piece at a time, in Alappuzha district. No prints, no repeats \u2014 only hand and brush on cloth. We ship across India and worldwide."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement(StatPill, {
    value: "100%",
    label: "Hand painted"
  }), /*#__PURE__*/React.createElement(StatPill, {
    value: "1-of-1",
    label: "Never repeated"
  }), /*#__PURE__*/React.createElement(StatPill, {
    label: "Kerala-rooted"
  })))));
}

/* ------------------------- HOW TO ORDER ------------------------- */
function HowToOrder() {
  const steps = [{
    n: '01',
    t: 'Tap "Order on WhatsApp"',
    d: 'Pick a piece and message us — the chat opens with the name pre-filled.'
  }, {
    n: '02',
    t: 'We confirm the details',
    d: 'Together we settle size, fabric and price. Everything is made to order.'
  }, {
    n: '03',
    t: 'We paint & ship',
    d: 'Your piece is hand-painted and sent — India & worldwide, COD / UPI / bank.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...section,
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "How to Order",
    title: "A conversation, not a checkout",
    style: {
      marginBottom: 'var(--space-7)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))',
      gap: 'var(--space-6)'
    }
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '2.4rem',
      color: 'var(--gold)',
      lineHeight: 1
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h5)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: 0
    }
  }, s.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    label: "Start on WhatsApp",
    style: {
      padding: '1.05rem 2rem'
    }
  }))));
}

/* ---------------------------- FOOTER ---------------------------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    id: "contact",
    style: {
      background: 'var(--ink)',
      color: 'var(--on-dark)',
      paddingTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
      gap: 'var(--space-7)',
      paddingBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      gridColumn: '1 / -1',
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    tone: "light",
    size: "lg",
    as: "div"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.7,
      color: 'var(--on-dark-soft)',
      margin: 0
    }
  }, "Hand-painted wearable art from Mavelikkara, Alappuzha, Kerala. Made to order, one of a kind.")), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Explore",
    links: ['Shop', 'Lookbook', 'Our Story', 'How to Order']
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Reach us",
    links: ['WhatsApp · 9400384167', 'Call · 8547516011', '@kalakshetra_handpaintings']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 600,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold)',
      marginBottom: '0.4rem'
    }
  }, "Newsletter"), /*#__PURE__*/React.createElement(NewsletterForm, {
    tone: "dark"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(250,247,240,0.14)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--space-5) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--on-dark-soft)'
    }
  }, "We ship: India \xB7 Worldwide \xB7 COD \xB7 UPI / Bank"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--on-dark-soft)'
    }
  }, "\xA9 ", new Date().getFullYear(), " Kalakshetra Handpaintings \xB7 Hand Painted with Love"))));
}
function FooterCol({
  title,
  links
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 600,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold)'
    }
  }, title), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--on-dark-soft)'
    }
  }, l)));
}
Object.assign(window, {
  Hero,
  Philosophy,
  Shop,
  LookbookSection,
  Story,
  HowToOrder,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.WhatsAppGlyph = __ds_scope.WhatsAppGlyph;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.StatPill = __ds_scope.StatPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.NewsletterForm = __ds_scope.NewsletterForm;

__ds_ns.Lookbook = __ds_scope.Lookbook;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
