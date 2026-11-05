import type { Metadata } from 'next';
import Link from 'next/link';
import Divider from '@/components/Divider';
import TimeSaved from '@/components/TimeSaved';
import { CtaBand, ResultsGrid, SectionHead } from '@/components/Blocks';
import { benefits, caseStudies, testimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Results & Case Studies',
  description:
    '21% profit increase, 9–15% cost reduction, 342+ MSMEs transformed. Real Sparsh Magic stories from distribution, manufacturing and finance founders.',
  alternates: { canonical: '/results' },
};

export default function ResultsPage() {
  return (
    <>
      <section className="sec dark res-hero">
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span aria-current="page">Results</span>
              </li>
            </ol>
          </nav>
          <SectionHead
            as="h1"
            eyebrow="Results"
            title={
              <>
                Measured where founders measure:
                <br />
                <span className="lime">on the P&amp;L.</span>
              </>
            }
            lead="Not motivation scores. Cost, profit, retention and the hours you get back."
          />
          <ResultsGrid />
          <div className="bn-grid compact">
            {benefits.map((b, i) => (
              <article key={b.title} className="bn rv" style={{ ['--rd' as string]: `${i * 0.05}s` }}>
                <span className="bn-num">{b.metric}</span>
                <span className="bn-lab">{b.metricLabel}</span>
                <h3>{b.title}</h3>
              </article>
            ))}
          </div>
          <p className="note">Reported across Sparsh Magic client engagements. Individual results depend on implementation.</p>
        </div>
      </section>

      <Divider variant="scan" />

      <section className="sec-tight">
        <div className="wrap">
          <SectionHead
            eyebrow="Transformation stories"
            title={
              <>
                From chaos to <span className="purple">system.</span>
              </>
            }
            lead="Three founders, three sectors, the same pattern: a capable team waiting on the founder, then a system that runs without them."
          />
          <div className="cases">
            {caseStudies.map((c, i) => (
              <article key={c.slug} id={c.slug} className="case rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
                <header className="case-head">
                  <div>
                    <span className="case-sector">{c.sector}</span>
                    <h3>{c.company}</h3>
                    <p>{c.headline}</p>
                  </div>
                  <div className="case-metric">
                    <b>{c.metric}</b>
                    <span>{c.metricLabel}</span>
                  </div>
                </header>
                <ol className="tl">
                  {c.stages.map((s, j) => (
                    <li key={s.label} className={`tl-${j}`}>
                      <span className="tl-dot" aria-hidden="true" />
                      <span className="tl-lab">{s.label}</span>
                      <b>{s.title}</b>
                      <p>{s.text}</p>
                    </li>
                  ))}
                </ol>
                <blockquote className="quote">
                  “{c.quote}”<cite>
                    {c.person}, {c.personRole}
                  </cite>
                </blockquote>
                {c.industrySlug && (
                  <Link href={`/industries/${c.industrySlug}`} className="text-link case-link">
                    MAP49™ for {c.sector} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Divider variant="cells" />

      <section className="sec-tight">
        <div className="wrap ts-wrap">
          <SectionHead
            eyebrow="Founder freedom"
            title={
              <>
                The number that
                <br />
                isn’t on the P&amp;L.
              </>
            }
            lead="Time. Every follow-up the system handles is time you get back."
          />
          <div className="rv">
            <TimeSaved />
          </div>
        </div>
      </section>

      <section className="sec-tight paper">
        <Divider variant="grid" className="dv-top" />
        <div className="wrap">
          <SectionHead eyebrow="Founders say" title="In their words." />
          <div className="grid-2 says">
            {testimonials.map((t) => (
              <figure key={t.person} className="card rv">
                <p>{t.text}</p>
                <figcaption>
                  <b>{t.person}</b> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div style={{ paddingTop: 88 }} />
      <CtaBand
        title={
          <>
            Your story <em>starts with a scan.</em>
          </>
        }
      />
    </>
  );
}
