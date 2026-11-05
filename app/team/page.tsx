import type { Metadata } from 'next';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { CtaBand, PageHero, SectionHead } from '@/components/Blocks';
import { founder, site, teamUnits } from '@/lib/data';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'Team',
  description: `The Sparsh Magic team: ${site.teamSize} people in Indore who diagnose, install and run MAP49™ systems with MSME founders.`,
  alternates: { canonical: '/team' },
};

function CardMark() {
  return (
    <span className="tm-mark" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/about', label: 'About' }, { label: 'Team' }]}
        backdrop={bd.team.hero}
        eyebrow="Team"
        title={
          <>
            The people who
            <br />
            <span className="purple">install the system.</span>
          </>
        }
        lead={`A team of ${site.teamSize} across two offices in Indore. Each group owns one part of the MAP49™ system, the same way we ask our clients’ teams to.`}
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="team-grid">
            <article className="tm lead-tm rv">
              <CardMark />
              <span className="tm-ava">{founder.initials}</span>
              <h3>{founder.name}</h3>
              <span className="tm-role">Founder · Creator of MAP49™</span>
              <p>Designs the system and leads every founder debrief. 30+ years inside Indian businesses.</p>
            </article>
            {teamUnits.map((u, i) => (
              <article key={u.title} className="tm rv" style={{ ['--rd' as string]: `${(i + 1) * 0.05}s` }}>
                <CardMark />
                <span className="tm-ava">{u.initials}</span>
                <h3>{u.title}</h3>
                <span className="tm-role">Sparsh Magic team</span>
                <p>{u.text}</p>
              </article>
            ))}
          </div>
          <p className="note">Individual profiles are coming soon.</p>
        </div>
      </section>

      <Divider variant="scan" />

      <section className="sec-tight">
        <Backdrop items={bd.team.join} />
        <div className="wrap join">
          <SectionHead eyebrow="Join us" title="Want to take employee productivity to the world?" lead="We hire people who are their own managers. Read how we work, then tell us about yourself." />
          <div className="btn-row">
            <Button href="/career" variant="lime" arrow>
              See careers
            </Button>
            <Button href="/culture" variant="ghost">
              Our culture
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
