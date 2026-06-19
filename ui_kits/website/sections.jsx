/* Kalakshetra Handpaintings — website UI-kit sections.
   Composes the design-system primitives from window.<Namespace>. */
const KS = window.KalakshetraHandpaintingsDesignSystem_6971f4;
const { NavBar, Wordmark, WhatsAppButton, WhatsAppGlyph, Button, IconButton,
        Tag, StatPill, SectionHeading, PullQuote, ProductCard, Lookbook,
        NewsletterForm, Input } = KS;

const wrap = { maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)' };
const section = { padding: 'var(--space-9) 0' };

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <header id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end',
      background: 'linear-gradient(160deg, #2E3A59 0%, #5C4033 45%, #8B2E2E 100%)', overflow: 'hidden' }}>
      {/* painterly wash */}
      <div style={{ position: 'absolute', inset: 0, background:
        'radial-gradient(120% 90% at 75% 15%, rgba(201,162,39,0.35), transparent 55%), radial-gradient(80% 70% at 15% 90%, rgba(31,95,91,0.45), transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,23,0.65), rgba(28,26,23,0.12) 50%, rgba(28,26,23,0.35))' }} />
      <div style={{ ...wrap, position: 'relative', paddingBottom: 'var(--space-10)', paddingTop: 'calc(var(--nav-h) + var(--space-7))' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-eyebrow)', fontWeight: 600, letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)' }}>
          <span style={{ width: 30, height: 1, background: 'var(--gold)' }} /> Mavelikkara · Kerala
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h1)', fontWeight: 500, lineHeight: 1.02,
          letterSpacing: 'var(--ls-tight)', color: 'var(--on-dark)', margin: '1.2rem 0 0', maxWidth: '16ch', textWrap: 'balance' }}>
          Wearable art, painted by hand.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-lead)', lineHeight: 1.6, color: 'var(--on-dark-soft)',
          margin: '1.4rem 0 2.2rem', maxWidth: '46ch', textWrap: 'pretty' }}>
          One-of-a-kind shirts and pieces, hand-painted in Kerala — made to order, never repeated.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Button as="a" href="#shop" variant="outline" size="lg" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>Discover the Art</Button>
          <WhatsAppButton style={{ padding: '1.05rem 2rem' }} />
        </div>
      </div>
      {/* scroll cue */}
      <a href="#philosophy" aria-label="Scroll to philosophy" style={{ position: 'absolute', bottom: '1.6rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--on-dark-soft)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </a>
    </header>
  );
}

/* -------------------------- PHILOSOPHY -------------------------- */
function Philosophy() {
  return (
    <section id="philosophy" style={{ ...section, background: 'var(--surface-alt)' }}>
      <div style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-7)' }} className="ks-two-col">
        <SectionHeading eyebrow="The Philosophy"
          title="Ayurvedic roots, painted by hand"
          intro="Founded by Dr. Aswathy Sudarsanan — an Ayurvedic physician and textile artist — Kalakshetra carries Kerala's mornings into something you can wear. Each piece is painted slowly, by hand, and never repeated." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <PullQuote author="Dr. Aswathy Sudarsanan" role="Founder · Physician & Textile Artist">
            Every brushstroke carries a little of Kerala into a piece made only for you.
          </PullQuote>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--accent-strong)' }}>Aswathy</span>
        </div>
      </div>
      <style>{`@media(min-width:880px){.ks-two-col{grid-template-columns:1fr 1fr;align-items:center;gap:var(--space-9)}}`}</style>
    </section>
  );
}

/* ----------------------------- SHOP ----------------------------- */
const PRODUCTS = [
  { name: 'Kathakali Maestro', theme: 'Kathakali face in temple reds & Kathakali green', category: 'Men', tone: 'green', swatch: 'linear-gradient(150deg,#1F5F5B,#5C4033)' },
  { name: 'Theyyam Crown', theme: 'Theyyam mask & crown, painted in fire reds', category: 'Men', tone: 'red', swatch: 'linear-gradient(150deg,#8B2E2E,#5C4033)' },
  { name: 'Guruvayurappan', theme: 'Krishna of Guruvayur, in gold & indigo', category: 'Men', tone: 'indigo', swatch: 'linear-gradient(150deg,#2E3A59,#5C4033)' },
  { name: 'Peacock (Pattachitra)', theme: 'Temple-mural peacock, brushed by hand', category: 'Men', tone: 'green', swatch: 'linear-gradient(150deg,#1F5F5B,#2E3A59)' },
  { name: 'Gold Mandala', theme: 'A single Kasavu-gold mandala on ivory', category: 'Women', tone: 'gold', swatch: 'linear-gradient(150deg,#C9A227,#B05E3B)' },
  { name: 'Lotus Whisper', theme: 'New pieces arriving', category: 'Women', tone: 'gold', comingSoon: true, swatch: 'linear-gradient(150deg,#B05E3B,#C9A227)' },
  { name: 'Little Ganesha', theme: 'Ganesha motif for the smallest canvas', category: 'Kids', tone: 'red', swatch: 'linear-gradient(150deg,#D99A2B,#B05E3B)' },
  { name: 'Parrot & Mango', theme: 'Temple-mural birds in mustard & green', category: 'Kids', tone: 'green', swatch: 'linear-gradient(150deg,#1F5F5B,#D99A2B)' },
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
                transition: 'all var(--dur-base) var(--ease-out)' }}>{c}</button>
            );
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
          {list.map((p) => (
            <ProductCard key={p.name} name={p.name} theme={p.theme} category={p.category}
              categoryTone={p.tone} swatch={p.swatch} comingSoon={p.comingSoon} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- LOOKBOOK --------------------------- */
const LOOK_SLIDES = [
  { swatch: 'linear-gradient(135deg,#5C4033,#B05E3B)', eyebrow: 'Worn in Kerala', caption: 'A painted shirt with the set-mundu.' },
  { swatch: 'linear-gradient(135deg,#1F5F5B,#2E3A59)', eyebrow: 'Pattachitra', caption: 'Temple-mural peacock, brushed by hand.' },
  { swatch: 'linear-gradient(135deg,#8B2E2E,#5C4033)', eyebrow: 'Kathakali', caption: 'A face of the festival, on cotton.' },
  { swatch: 'linear-gradient(135deg,#C9A227,#B05E3B)', eyebrow: 'Gold Mandala', caption: 'Kasavu gold, quietly placed.' },
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
        <div style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-md)', background: 'linear-gradient(150deg,#5C4033,#1F5F5B)', boxShadow: 'var(--shadow-card)' }} aria-label="The Kalakshetra studio in Mavelikkara" role="img" />
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
          { text: 'WhatsApp · 9400384167', href: 'https://wa.me/919400384167', external: true },
          { text: 'Call · 8547516011', href: 'tel:+918547516011' },
          { text: '@kalakshetra_handpaintings', href: 'https://www.instagram.com/kalakshetra_handpaintings/', external: true }
        ]} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 600, letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>Newsletter</span>
          <NewsletterForm tone="dark" />
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(250,247,240,0.14)' }}>
        <div style={{ ...wrap, display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-5) var(--gutter)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--on-dark-soft)' }}>
            We ship: India · Worldwide · COD · UPI / Bank
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--on-dark-soft)' }}>
            © {new Date().getFullYear()} Kalakshetra Handpaintings · Hand Painted with Love
          </span>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links }) {
  return (
    <nav aria-label={title} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-eyebrow)', fontWeight: 600, letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--gold)' }}>{title}</span>
      {links.map((l) => (
        <a key={l.text} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', color: 'var(--on-dark-soft)', textDecoration: 'none' }}>{l.text}</a>
      ))}
    </nav>
  );
}

Object.assign(window, { Hero, Philosophy, Shop, LookbookSection, Story, HowToOrder, Footer });
