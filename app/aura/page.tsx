import type { Metadata } from 'next';
import AuraScan from '@/components/AuraScan';
import Divider from '@/components/Divider';
import { PageHero, SectionHead } from '@/components/Blocks';
import { site, tel, waLink } from '@/lib/data';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'AURA Scan: Free 5-Minute Team System Diagnostic',
  description:
    'Take the AURA Scan, a free founder diagnostic from Sparsh Magic. See your system health score, your level on each MAP49™ pillar, and the two leaks to fix first.',
  alternates: { canonical: '/aura' },
};

const GET = [
  { k: '01', title: 'System health score', text: 'One number, 0–100, for how self-driven your business is today.' },
  { k: '02', title: 'Your 7-pillar map', text: 'Where you sit on each MAP49™ pillar, from founder-driven to leads-others.' },
  { k: '03', title: 'Your first two fixes', text: 'The two leaks costing you most, and the first move for each.' },
];

export default function AuraPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'AURA Scan' }]}
        backdrop={bd.aura.hero}
        eyebrow="AURA Scan · Free diagnostic"
        title={
          <>
            Scan your business.
            <br />
            <span className="purple">Find the leaks.</span>
          </>
        }
        lead="Ten quick questions, about five minutes. The AURA Scan places your business on the MAP49™ matrix and shows exactly where accountability breaks down."
      >
        <ul className="ticks light rv" style={{ ['--rd' as string]: '.18s' }}>
          <li>No cost, no obligation</li>
          <li>For teams of 10+</li>
          <li>Personal debrief call</li>
        </ul>
      </PageHero>

      <section className="aura-sec">
        <div className="wrap">
          <AuraScan />
        </div>
      </section>

      <Divider variant="grid" />

      <section className="sec-tight">
        <div className="wrap">
          <SectionHead eyebrow="What you get" title="Three things, before any sales call." />
          <div className="grid-3 get-grid">
            {GET.map((g, i) => (
              <article key={g.k} className="card rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
                <span className="eyebrow">{g.k}</span>
                <h3 style={{ marginTop: 16 }}>{g.title}</h3>
                <p>{g.text}</p>
              </article>
            ))}
          </div>
          <p className="note">
            Prefer to talk? Call <a className="text-link" href={tel(site.phones[0])}>{site.phones[0]}</a> or{' '}
            <a className="text-link" href={waLink('Hi Sparsh Magic, I would like to start my AURA Scan.')}>
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
