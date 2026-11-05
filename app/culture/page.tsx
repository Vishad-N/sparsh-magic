import type { Metadata } from 'next';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { CtaBand, PageHero, SectionHead, Steps } from '@/components/Blocks';
import { values } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Culture',
  description: 'How Sparsh Magic works: seven values built on systems integrity and ownership, and the rhythm we follow with every client.',
  alternates: { canonical: '/culture' },
};

const CLIENT_RHYTHM = [
  { n: '01', when: 'Listen', title: 'Scan first', text: 'We start with the AURA Scan and your numbers, never a sales pitch.' },
  { n: '02', when: 'Agree', title: 'Agree the map', text: 'You see your MAP49™ map and agree what changes first, and who owns it.' },
  { n: '03', when: 'Install', title: 'Build with your team', text: 'Coaches work alongside your people. We install, they run.' },
  { n: '04', when: 'Hand over', title: 'Step back', text: 'Success is the day your team no longer needs us in the room.' },
];

const INTERNAL = [
  { title: 'We run on MAP49™ ourselves', text: 'Every role at Sparsh Magic has a scorecard, an owner and a weekly review. We don’t sell a system we don’t use.' },
  { title: 'You are your own manager', text: 'Nobody chases you here. You own your results and the rhythm that gets you there.' },
  { title: 'Feedback flows both ways', text: 'Juniors review processes as freely as seniors. The best idea wins, not the loudest.' },
];

export default function CulturePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/about', label: 'About' }, { label: 'Culture' }]}
        eyebrow="Culture"
        title={
          <>
            Systems integrity.
            <br />
            <span className="purple">Ownership by default.</span>
          </>
        }
        lead="Our culture is the same one we help clients build: clear outcomes, one owner per result, and a rhythm that runs without anyone chasing."
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow="7 values" title="Seven values, one per pillar." lead="Like MAP49™, our values come in sevens. Each one is something you can see in how we work, not a poster on the wall." />
          <div className="values">
            {values.map((v, i) => (
              <article key={v.title} className="val rv" style={{ ['--rd' as string]: `${i * 0.04}s` }}>
                <span className="vcue" aria-hidden="true">
                  {values.map((_, j) => (
                    <i key={j} className={j === i ? 'on' : j < i ? 'past' : ''} />
                  ))}
                </span>
                <span className="vn">V{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
            <article className="val val-cta rv">
              <span className="vn">→</span>
              <h3>Sounds like you?</h3>
              <p>We’re always looking for systems thinkers.</p>
              <Button href="/career" variant="lime" size="sm" arrow>
                Careers
              </Button>
            </article>
          </div>
        </div>
      </section>

      <Divider variant="trail" />

      <section className="sec-tight">
        <div className="wrap">
          <SectionHead eyebrow="How we work with clients" title="A simple four-step rhythm." />
          <Steps items={CLIENT_RHYTHM} />
        </div>
      </section>

      <section className="sec-tight paper">
        <Divider variant="grid" className="dv-top" />
        <div className="wrap">
          <SectionHead eyebrow="How we work internally" title="We practise what we install." />
          <div className="grid-3 internal">
            {INTERNAL.map((x, i) => (
              <article key={x.title} className="card rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div style={{ paddingTop: 88 }} />
      <CtaBand />
    </>
  );
}
