/* Kalakshetra Handpaintings — website UI-kit sections.
   Composes the design-system primitives from window.<Namespace>. */
const KS = window.KalakshetraHandpaintingsDesignSystem_6971f4;
const { NavBar, Wordmark, WhatsAppButton, WhatsAppGlyph, Button, IconButton,
  Tag, StatPill, SectionHeading, PullQuote, ProductCard, Lookbook,
  NewsletterForm, Input } = KS;

const wrap = { maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)' };
const section = { padding: 'var(--space-9) 0' };

/* Placeholder images — swap these src values when real photos arrive */
const PH_HERO     = 'assets/hero.png';
const PH_PORTRAIT = 'assets/placeholders/portrait.svg';
const PH_LOOKBOOK = 'assets/placeholders/lookbook.svg';

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <header id="top" style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end',
      background: '#1C1A17', overflow: 'hidden'
    }}>
      {/* Hero image — replace PH_HERO src with real photo when ready */}
      <img
        src={PH_HERO}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', display: 'block',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,23,0.65), rgba(28,26,23,0.12) 50%, rgba(28,26,23,0.35))' }} />
      <div style={{ ...wrap, position: 'relative', paddingBottom: 'var(--space-10)', paddingTop: 'calc(var(--nav-h) + var(--space-7))' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.7rem', fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-eyebrow)', fontWeight: 600, letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)'
        }}>
          <span style={{ width: 30, height: 1, background: 'var(--gold)' }} /> Mavelikkara · Kerala
        </span>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h1)', fontWeight: 500, lineHeight: 1.02,
          letterSpacing: 'var(--ls-tight)', color: 'var(--on-dark)', margin: '1.2rem 0 0', maxWidth: '16ch', textWrap: 'balance'
        }}>
          Wearable art, painted by hand.
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-lead)', lineHeight: 1.6, color: 'var(--on-dark-soft)',
          margin: '1.4rem 0 2.2rem', maxWidth: '46ch', textWrap: 'pretty'
        }}>
          One-of-a-kind shirts and pieces, hand-painted in Kerala — made to order, never repeated.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Button as="a" href="#shop" variant="outline" size="lg">Discover the Art</Button>
          <WhatsAppButton style={{ padding: '1.05rem 2rem' }} />
        </div>
      </div>
      {/* scroll cue */}
      <a href="#philosophy" aria-label="Scroll to philosophy" style={{ position: 'absolute', bottom: '1.6rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--on-dark-soft)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </a>
    </header>
  );
}

/* -------------------------- PHILOSOPHY -------------------------- */
function Philosophy() {
  return (
    <section id="philosophy" style={{ ...section, background: 'var(--surface-alt)', position: 'relative', overflow: 'hidden' }}>
      <img
        src="assets/lord_krishna.png"
        alt=""
        aria-hidden="true"
        className="ks-phil-bg"
        style={{
          position: 'absolute', top: 0, right: 0,
          height: '100%', width: 'auto',
          objectFit: 'cover', objectPosition: 'top right',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-7)', position: 'relative', zIndex: 1 }} className="ks-two-col">
        <SectionHeading eyebrow="The Philosophy"
          title="Ayurvedic roots, painted by hand"
          intro="Founded by Dr. Aswathy Sudarsanan — an Ayurvedic physician and textile artist — Kalakshetra carries Kerala's mornings into something you can wear. Each piece is painted slowly, by hand, and never repeated." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <PullQuote author="Dr. Aswathy Sudarsanan" role="Founder · Physician & Textile Artist">
            Every brushstroke carries a little of Kerala into a piece made only for you.
          </PullQuote>
        </div>
      </div>
      <style>{`
        .ks-phil-bg{opacity:0.1}
        @media(min-width:880px){
          .ks-phil-bg{opacity:0.5}
          .ks-two-col{grid-template-columns:1fr 1fr;align-items:center;gap:var(--space-9)}
        }
      `}</style>
    </section>
  );
}

/* ---------------------- CUSTOM COMMISSION ----------------------- */
function CustomCommissionBanner() {
  const waMsg = encodeURIComponent("Hi Kalakshetra, I'd like to commission a custom hand-painted piece. Here's what I have in mind:");
  const waUrl = `https://wa.me/918547516011?text=${waMsg}`;
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: '#2a1a0e',
      borderRadius: 'var(--radius-md)', padding: 'var(--space-7)',
      marginBottom: 'var(--space-7)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 'var(--space-6)',
      boxShadow: '0 8px 32px rgba(28,26,23,0.18)',
    }}>
      {/* Banner image — replace PH_HERO src with real photo when ready */}
      <img
        src={PH_HERO}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', display: 'block',
          pointerEvents: 'none', opacity: 0.35,
        }}
      />
      {/* top & bottom gold rule */}
      <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C9A227 40%, #C9A227 60%, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C9A227 40%, #C9A227 60%, transparent)' }} />
      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.85rem', position: 'relative' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 600,
          letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)'
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          Custom Commission
        </span>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
          fontWeight: 500, color: '#FAF7F0', margin: 0, lineHeight: 1.08, letterSpacing: '-0.01em'
        }}>
          Commission Your Own
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', lineHeight: 1.7,
          color: 'rgba(250,247,240,0.78)', margin: 0, maxWidth: '54ch'
        }}>
          Any motif — Kathakali, Theyyam, a deity, a peacock, or a memory entirely your own — hand-painted onto your choice of shirt, saree, kurta or kids' wear, made to order just for you.
        </p>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontStyle: 'italic', color: 'rgba(201,162,39,0.75)' }}>
          Share your idea, fabric and size on WhatsApp — we'll paint it by hand.
        </span>
      </div>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          aria-label="Request a custom hand-painted piece on WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            padding: '0.95rem 1.9rem',
            fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: 'var(--radius-pill)',
            background: hovered ? '#B8860B' : 'var(--gold)',
            color: '#1C1A17',
            boxShadow: hovered ? '0 8px 24px rgba(201,162,39,0.45)' : '0 4px 16px rgba(201,162,39,0.25)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.22s cubic-bezier(0.25,0.46,0.45,0.94)',
            whiteSpace: 'nowrap',
          }}>
          <WhatsAppGlyph size={16} />
          Request a Custom Piece
        </a>
      </div>
    </div>
  );
}

/* ----------------------------- SHOP ----------------------------- */
const PRODUCTS = [
  { name: 'Kathakali Maestro', theme: 'Kathakali face in temple reds & Kathakali green', category: 'Men', tone: 'green', image: 'assets/products/kathakali_masestro.png' },
  { name: 'Theyyam Crown', theme: 'Theyyam mask & crown, painted in fire reds', category: 'Men', tone: 'red', image: 'assets/products/theyyam_crown.png' },
  { name: 'Guruvayurappan', theme: 'Krishna of Guruvayur, in gold & indigo', category: 'Men', tone: 'indigo' },
  { name: 'Peacock (Pattachitra)', theme: 'Temple-mural peacock, brushed by hand', category: 'Men', tone: 'green', image: 'assets/products/peacock.png' },
  { name: 'Gold Mandala', theme: 'A single Kasavu-gold mandala on ivory', category: 'Women', tone: 'gold' },
  { name: 'Lotus Whisper', theme: 'New pieces arriving', category: 'Women', tone: 'gold', comingSoon: true },
  { name: 'Little Ganesha', theme: 'Ganesha motif for the smallest canvas', category: 'Kids', tone: 'red' },
  { name: 'Parrot & Mango', theme: 'Temple-mural birds in mustard & green', category: 'Kids', tone: 'green' },
];
const CATS = ['All', 'Men', 'Women', 'Kids'];

function Shop() {
  const [cat, setCat] = React.useState('All');
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <section id="shop" style={{ ...section, background: 'var(--surface-page)' }}>
      <div style={wrap}>
        <SectionHeading eyebrow="Featured" title="Hand-painted collections"
          intro="Shirts and pieces across Men, Women and Kids — each one a single canvas." />
        {/* filter tabs */}
        <div role="tablist" aria-label="Categories" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: 'var(--space-6) 0 var(--space-7)' }}>
          {CATS.map((c) => {
            const active = c === cat;
            return (
              <button key={c} role="tab" aria-selected={active} onClick={() => setCat(c)} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '0.6rem 1.2rem', cursor: 'pointer', borderRadius: 'var(--radius-pill)',
                border: `1px solid ${active ? 'var(--gold)' : 'var(--border-strong)'}`,
                background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--ink)' : 'var(--text-body)',
                transition: 'all var(--dur-base) var(--ease-out)'
              }}>{c}</button>
            );
          })}
        </div>
        <CustomCommissionBanner />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
          {list.map((p) => (
            <ProductCard key={p.name} name={p.name} theme={p.theme} category={p.category}
              categoryTone={p.tone} image={p.image} swatch={p.swatch} comingSoon={p.comingSoon} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- LOOKBOOK --------------------------- */
/* replace image values with real lookbook photos when ready */
const LOOK_SLIDES = [
  { image: PH_LOOKBOOK, alt: 'Lookbook slide 1', eyebrow: 'Worn in Kerala', caption: 'A painted shirt with the set-mundu.' },
  { image: PH_LOOKBOOK, alt: 'Lookbook slide 2', eyebrow: 'Pattachitra', caption: 'Temple-mural peacock, brushed by hand.' },
  { image: PH_LOOKBOOK, alt: 'Lookbook slide 3', eyebrow: 'Kathakali', caption: 'A face of the festival, on cotton.' },
  { image: PH_LOOKBOOK, alt: 'Lookbook slide 4', eyebrow: 'Gold Mandala', caption: 'Kasavu gold, quietly placed.' },
];
function LookbookSection() {
  return (
    <section id="lookbook" style={{ ...section, background: 'var(--wood)' }}>
      <div style={wrap}>
        <SectionHeading tone="light" align="center" eyebrow="Lookbook" title="Worn, not just made"
          style={{ marginBottom: 'var(--space-7)' }} />
        <Lookbook slides={LOOK_SLIDES} interval={6000} />
      </div>
    </section>
  );
}

/* ---------------------------- STORY ----------------------------- */
function Story() {
  return (
    <section id="story" style={{ ...section, background: 'var(--surface-alt)' }}>
      <div style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-7)' }} className="ks-two-col">
        <div style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--warm-white)', boxShadow: 'var(--shadow-card)' }}>
          {/* replace PH_PORTRAIT src with studio photo when ready */}
          <img
            src={PH_PORTRAIT}
            alt="The Kalakshetra studio in Mavelikkara"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <SectionHeading eyebrow="Our Story" title="A small studio in Mavelikkara"
            intro="We paint slowly, one piece at a time, in Alappuzha district. No prints, no repeats — only hand and brush on cloth. We ship across India and worldwide." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <StatPill value="100%" label="Hand painted" />
            <StatPill value="1-of-1" label="Never repeated" />
            <StatPill label="Kerala-rooted" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- HOW TO ORDER ------------------------- */
function HowToOrder() {
  const steps = [
    { n: '01', t: 'Tap "Order on WhatsApp"', d: 'Pick a piece and message us — the chat opens with the name pre-filled.' },
    { n: '02', t: 'We confirm the details', d: 'Together we settle size, fabric and price. Everything is made to order.' },
    { n: '03', t: 'We paint & ship', d: 'Your piece is hand-painted and sent — India & worldwide, COD / UPI / bank.' },
  ];
  return (
    <section id="how-to-order" style={{ ...section, background: 'var(--surface-page)' }}>
      <div style={wrap}>
        <SectionHeading align="center" eyebrow="How to Order" title="A conversation, not a checkout"
          style={{ marginBottom: 'var(--space-7)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 'var(--space-6)' }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--gold)', lineHeight: 1 }}>{s.n}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h5)', color: 'var(--text-strong)', margin: 0 }}>{s.t}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-7)' }}>
          <WhatsAppButton label="Start on WhatsApp" style={{ padding: '1.05rem 2rem' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FOOTER ---------------------------- */
function Footer() {
  return (
    <footer id="contact" role="contentinfo" style={{ background: 'var(--ink)', color: 'var(--on-dark)', paddingTop: 'var(--space-9)' }}>
      <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 'var(--space-7)', paddingBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', gridColumn: '1 / -1', maxWidth: 420 }}>
          <Wordmark tone="light" size="lg" as="div" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', lineHeight: 1.7, color: 'var(--on-dark-soft)', margin: 0 }}>
            Hand-painted wearable art from Mavelikkara, Alappuzha, Kerala. Made to order, one of a kind.
          </p>
        </div>
        <FooterCol title="Explore" links={[
          { text: 'Shop', href: '#shop' },
          { text: 'Lookbook', href: '#lookbook' },
          { text: 'Our Story', href: '#story' },
          { text: 'How to Order', href: '#how-to-order' }
        ]} />
        <FooterCol title="Reach us" links={[
          { text: 'WhatsApp · 8547516011', href: 'https://wa.me/918547516011', external: true, icon: 'whatsapp' },
          { text: 'Call · 8547516011', href: 'tel:+918547516011', icon: 'phone' },
          { text: 'hello@kalakshetrahandpaintings.com', href: 'mailto:hello@kalakshetrahandpaintings.com', icon: 'email' },
          { text: '@kalakshetra_handpaintings', href: 'https://www.instagram.com/kalakshetra_handpaintings/', external: true, icon: 'instagram' },
        ]} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 600, letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>Newsletter</span>
          <NewsletterForm tone="dark" />
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(250,247,240,0.14)' }}>
        <div style={{ ...wrap, display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-5) var(--gutter)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--on-dark-soft)' }}>
            We ship: India · Worldwide · UPI / Bank
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--on-dark-soft)' }}>
            © {new Date().getFullYear()} Kalakshetra Handpaintings · Hand Painted with Love
          </span>
        </div>
      </div>
    </footer>
  );
}
function FooterIcon({ type }) {
  if (type === 'whatsapp') return <WhatsAppGlyph size={13} />;
  if (type === 'phone') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.18 2 2 0 012.5.5h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.84 8.06a16 16 0 006.1 6.1l.88-.88a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
  if (type === 'email') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
  if (type === 'instagram') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
  return null;
}

function FooterCol({ title, links }) {
  return (
    <nav aria-label={title} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 600, letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)' }}>{title}</span>
      {links.map((l) => (
        <a key={l.text} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', color: 'var(--on-dark-soft)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
          {l.icon && <FooterIcon type={l.icon} />}
          {l.text}
        </a>
      ))}
    </nav>
  );
}

Object.assign(window, { Hero, Philosophy, Shop, LookbookSection, Story, HowToOrder, Footer });