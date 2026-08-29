import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kalakshetra Admin',
  description: 'Kalakshetra Handpaintings — content admin',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, background: 'var(--surface-alt)', minHeight: '100vh' }}>{children}</body>
    </html>
  );
}
