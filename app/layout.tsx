import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/pages.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SiteEffects from '@/components/SiteEffects';
import { JsonLd } from '@/components/Blocks';
import { founder, site } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Sparsh Magic | Fix Lazy Team Culture Forever with MAP49',
    template: '%s | Sparsh Magic',
  },
  description:
    'Sparsh Magic helps Indian MSME founders build self-driven teams with MAP49, the Matrix of Accountability & Productivity. No more chasing. Just smooth systems, focused execution and founder freedom.',
  applicationName: site.name,
  authors: [{ name: founder.name }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#EAEDF0',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  slogan: site.mission,
  description: `${site.tagline}. MAP49 team accountability and productivity system for MSMEs.`,
  foundingDate: String(site.founded),
  founder: { '@type': 'Person', name: founder.name, jobTitle: founder.title },
  email: site.email,
  telephone: site.phones[0],
  areaServed: 'IN',
  sameAs: site.social.map((s) => s.href),
  address: {
    '@type': 'PostalAddress',
    streetAddress: '315 Shagun Arcade, Rasoma Square, Vijay Nagar',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452010',
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so reveal animations never hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={orgLd} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
