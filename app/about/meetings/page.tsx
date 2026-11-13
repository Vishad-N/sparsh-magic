import type { Metadata } from 'next';
import Divider from '@/components/Divider';
import MeetingsGallery from '@/components/MeetingsGallery';
import { CtaBand, PageHero } from '@/components/Blocks';
import { meetings } from '@/lib/meetings';

export const metadata: Metadata = {
  title: 'Client Meetings Gallery',
  description: 'Photos from Sparsh Magic client meetings, expo booths, leadership programmes and workshops with MSME founders across India.',
  alternates: { canonical: '/about/meetings' },
};

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/about', label: 'About' }, { label: 'Client meetings' }]}
        eyebrow="Client meetings"
        title={
          <>
            Step into the room
            <br />
            <span className="purple">where the work starts.</span>
          </>
        }
        lead={`${meetings.length} photos from expo floors, leadership programmes and founder workshops. Turn the room, or tap any photo to enlarge it.`}
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <MeetingsGallery />
        </div>
      </section>

      <Divider variant="scan" />
      <CtaBand />
    </>
  );
}
