import type { Metadata } from 'next';
import Divider from '@/components/Divider';
import IndustryExplorer from '@/components/IndustryExplorer';
import { CtaBand, PageHero, SectionHead, Steps } from '@/components/Blocks';
import { industries } from '@/lib/data';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'Industries: MAP49 for Manufacturing, Retail, Fitness, Restaurants & More',
  description:
    'How Sparsh Magic’s MAP49 system applies to manufacturing, retail, fitness, restaurants, distribution, healthcare, finance and service businesses.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industries' }]}
        backdrop={bd.industries.hero}
        eyebrow="Industries"
        title={
          <>
            One system.
            <br />
            Tuned to <span className="purple">your floor.</span>
          </>
        }
        lead="The pillars are the same everywhere. What changes is where work leaks: the shift handover, the billing counter, the kitchen pass, the collections call. Pick your sector to see how MAP49 maps onto it."
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <IndustryExplorer items={industries} />
        </div>
      </section>

      <Divider variant="trail" />

      <section className="sec-tight">
        <Backdrop items={bd.industries.steps} />
        <div className="wrap">
          <SectionHead
            eyebrow="Same steps, every sector"
            title="How we install it in your industry."
            lead="Every engagement starts with the AURA Scan and follows the same four moves. The scorecards and rhythms are built around your sector’s own numbers."
          />
          <Steps />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Don’t see your sector? <em>It still applies.</em>
          </>
        }
        lead="Sparsh Magic has worked with fashion, tech, tourism and many more. The AURA Scan works for any business with a team of 10 or more."
      />
    </>
  );
}
