import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/ui/NavBar';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getSiteContent } from '@/lib/api';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalakshetrahandpaintings.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kalakshetra Handpaintings — Wearable art, painted by hand',
    template: '%s · Kalakshetra Handpaintings',
  },
  description:
    'One-of-a-kind shirts and pieces, hand-painted in Mavelikkara, Kerala — made to order, never repeated.',
  openGraph: {
    type: 'website',
    siteName: 'Kalakshetra Handpaintings',
    images: ['/assets/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og-image.png'],
  },
  icons: { icon: '/favicon.svg' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <NavBar whatsappNumber={content.contact.whatsappNumber} />
        {children}
        <WhatsAppButton floating number={content.contact.whatsappNumber} label="Order on WhatsApp" />
      </body>
    </html>
  );
}
