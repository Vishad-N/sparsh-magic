import type { Metadata } from 'next';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { CtaBand, FounderStats, JsonLd, PageHero, Portrait, SectionHead } from '@/components/Blocks';
import { founder, map49, site, specialties } from '@/lib/data';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'About Sparsh Magic & Rupak Aich',
  description: `${founder.name}, ${founder.title}, founded Sparsh Magic in Indore to help MSME founders run their businesses on systems, not daily intervention.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: founder.name,
          jobTitle: founder.title,
          worksFor: { '@type': 'Organization', name: site.name },
          email: site.founderEmail,
        }}
      />
      <PageHero
        crumbs={[{ label: 'About' }]}
        backdrop={bd.about.hero}
        eyebrow="About Sparsh Magic"
        title={
          <>
            Creating happy businesses
            <br />
            by <span className="purple">empowering people.</span>
          </>
        }
        lead={`${site.legalName} was founded in Indore in ${site.founded} with one aim: help Indian MSME founders run and grow their businesses without daily intervention.`}
      />

      <Divider variant="grid" />

      <section className="sec-tight">
        <div className="wrap founder">
          <Portrait />
          <div>
            <span className="eyebrow rv">The founder</span>
            <h2 className="h2 rv" style={{ ['--rd' as string]: '.06s' }}>
              {founder.name}
            </h2>
            <p className="muted rv mono" style={{ marginTop: 10, fontSize: 13, letterSpacing: '.04em' }}>
              {founder.title.toUpperCase()}
            </p>
            <div className="bio rv" style={{ ['--rd' as string]: '.12s' }}>
              {founder.bio.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <FounderStats />
            <div className="book rv">
              <span className="book-k" aria-hidden="true">
                BOOK
              </span>
              <div>
                <b>{founder.book}</b>
                <span>By {founder.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec dark">
        <Backdrop items={bd.about.truth} tone="dark" />
        <Divider variant="cells" tone="dark" className="dv-top" />
        <div className="wrap truth">
          <span className="eyebrow rv">Why systems, not people</span>
          <blockquote className="truth-q rv" style={{ ['--rd' as string]: '.06s' }}>
            {founder.truth.split('. ')[0]}. <span className="hl">{founder.truth.split('. ')[1]}</span>
          </blockquote>
          <div className="truth-grid">
            <p className="rv">
              Most founders believe their team problem is a people problem: the wrong hires, low motivation, a lazy culture. After 30+ years inside Indian
              businesses, Rupak’s finding is the opposite. People behave the way the system lets them.
            </p>
            <p className="rv" style={{ ['--rd' as string]: '.06s' }}>
              When roles are vague, ownership is shared and nothing is measured, even good people wait to be told. Change the system and the same people
              start owning results. That is what {map49.name} is built to do.
            </p>
          </div>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <SectionHead eyebrow="What we do" title="Seven specialties, one system." lead="Each specialty is a building block inside MAP49™. Together they make accountability measurable." />
          <ul className="spec rv">
            {specialties.map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Divider variant="trail" />

      <section className="sec-tight">
        <Backdrop items={bd.about.facts} />
        <div className="wrap">
          <div className="facts rv">
            <div>
              <b>{site.founded}</b>
              <span>Founded in Indore</span>
            </div>
            <div>
              <b>{site.teamSize}</b>
              <span>People on the Sparsh team</span>
            </div>
            <div>
              <b>2</b>
              <span>Offices in Indore</span>
            </div>
            <div>
              <b>10+</b>
              <span>Sectors served</span>
            </div>
          </div>
          <div className="btn-row">
            <Button href="/team" variant="ghost" arrow>
              Meet the team
            </Button>
            <Button href="/culture" variant="ghost" arrow>
              Our culture
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
