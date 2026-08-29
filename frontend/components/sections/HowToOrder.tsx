import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { SiteContentGroups } from '@/lib/types';
import { wrap, section } from './layout';

export function HowToOrder({ content, whatsappNumber }: { content: SiteContentGroups['howToOrder']; whatsappNumber: string }) {
  const steps = [
    { n: '01', t: content.step1Title, d: content.step1Body },
    { n: '02', t: content.step2Title, d: content.step2Body },
    { n: '03', t: content.step3Title, d: content.step3Body },
  ];
  return (
    <section id="how-to-order" style={{ ...section, background: 'var(--surface-page)' }}>
      <div style={wrap}>
        <SectionHeading align="center" eyebrow="How to Order" title="A conversation, not a checkout" style={{ marginBottom: 'var(--space-7)' }} />
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
          <WhatsAppButton number={whatsappNumber} label="Start on WhatsApp" style={{ padding: '1.05rem 2rem' }} />
        </div>
      </div>
    </section>
  );
}
