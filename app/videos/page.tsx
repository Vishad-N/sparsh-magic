import type { Metadata } from 'next';
import Divider from '@/components/Divider';
import VideoGallery from '@/components/VideoGallery';
import { CtaBand, PageHero } from '@/components/Blocks';
import { shorts, videos } from '@/lib/videos';

export const metadata: Metadata = {
  title: 'Video Gallery: MAP49 Talks & Shorts',
  description:
    'Watch Rupak Aich and the Sparsh Magic team: full-length talks on team accountability and founder freedom, plus quick YouTube Shorts on building self-driven teams.',
  alternates: { canonical: '/videos' },
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Videos' }]}
        eyebrow="Video gallery"
        title={
          <>
            See the system
            <br />
            <span className="purple">before you install it.</span>
          </>
        }
        lead={`${videos.length} full-length videos and ${shorts.length} Shorts from Rupak Aich on team accountability, ownership and founder freedom. Pick a long talk, or swipe through the quick ones.`}
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <VideoGallery />
        </div>
      </section>

      <Divider variant="scan" />
      <CtaBand />
    </>
  );
}
