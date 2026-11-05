import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Divider from '@/components/Divider';
import { PageHero, SectionHead } from '@/components/Blocks';
import { careerAreas, careerLookFor, site } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Career',
  description: 'Join Sparsh Magic and take employee productivity to the world. We hire systems thinkers who are their own managers.',
  alternates: { canonical: '/career' },
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/about', label: 'About' }, { label: 'Career' }]}
        eyebrow="Career"
        title={
          <>
            Take employee productivity
            <br />
            <span className="purple">to the world.</span>
          </>
        }
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="manifesto rv">
            <p>
              We believe work should be easy to do well. That teams should know what they own. That founders should get their lives back. And that none of
              this needs shouting, only <span className="hl-ink">better systems.</span>
            </p>
            <p className="big-own">
              Here, <span className="mark">you are your own manager.</span>
            </p>
          </div>
        </div>
      </section>

      <Divider variant="cells" />

      <section className="sec-tight">
        <div className="wrap career-grid">
          <div>
            <SectionHead eyebrow="What we look for" title="Four things, no hand-holding." />
            <ul className="look">
              {careerLookFor.map((l, i) => (
                <li key={l.title} className="rv" style={{ ['--rd' as string]: `${i * 0.05}s` }}>
                  <span>0{i + 1}</span>
                  <div>
                    <b>{l.title}</b>
                    <p>{l.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="lead">A collaborative environment built for growth and new ideas. We reward hard work, and results are visible to everyone, including you.</p>
          </div>
          <aside className="roles rv" aria-label="Open roles">
            <span className="state ok">OPEN</span>
            <h3>Always looking for systems thinkers.</h3>
            <p>No fixed openings right now? Apply anyway. These are the areas we hire for most:</p>
            <ul className="chips light">
              {careerAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 14 }}>
              Prefer email? Write to{' '}
              <a className="text-link" href={`mailto:${site.email}?subject=Career%20at%20Sparsh%20Magic`}>
                {site.email}
              </a>
            </p>
          </aside>
        </div>
      </section>

      <section className="sec-tight paper" id="apply">
        <Divider variant="grid" className="dv-top" />
        <div className="wrap wrap-narrow">
          <SectionHead eyebrow="Apply" title="Tell us who you are." lead="Five minutes. No cover letter template needed, just tell us why this work matters to you." />
          <div className="form-card rv">
            <ContactForm kind="career" roles={careerAreas} />
          </div>
        </div>
      </section>
    </>
  );
}
