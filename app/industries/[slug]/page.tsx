import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import PillarExplorer from '@/components/PillarExplorer';
import { CtaBand, IconTile, Num, PageHero, PainList, SectionHead } from '@/components/Blocks';
import { caseStudies, getIndustry, industries, stats } from '@/lib/data';
import { industryItems } from '@/lib/explorer';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return {
    title: `MAP49™ for ${ind.title}`,
    description: `${ind.headline} ${ind.intro}`.slice(0, 158),
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();
  const story = caseStudies.find((c) => c.slug === ind.caseSlug);
  const others = industries.filter((i) => i.slug !== ind.slug && i.primary).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ href: '/industries', label: 'Industries' }, { label: ind.title }]}
        eyebrow={`MAP49™ for ${ind.title}`}
        title={ind.headline}
        lead={ind.intro}
        aside={
          <div className="ind-aside">
            <IconTile name={ind.icon} />
            <p>
              <span className="muted">From</span> {ind.pain}
            </p>
            <p>
              <span className="muted">To</span> <b>{ind.outcome}</b>
            </p>
            <ul className="chips light">
              {ind.kpis.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        }
      />

      <Divider variant="cells" />

      <section className="sec-tight">
        <Backdrop items={bd.industry.pains} />
        <div className="wrap ind-split">
          <div>
            <SectionHead
              eyebrow="Where work leaks"
              title={
                <>
                  The {ind.pains.length} biggest problems in <span className="purple">{ind.title.toLowerCase()}.</span>
                </>
              }
            />
          </div>
          <PainList items={ind.pains} />
        </div>
      </section>

      <section className="sec-tight paper">
        <Backdrop items={bd.industry.mapping} />
        <Divider variant="grid" className="dv-top" />
        <div className="wrap">
          <SectionHead
            eyebrow="How MAP49™ maps onto it"
            title="The system, built for your sector."
            lead="Each fix below sits on one MAP49™ pillar. Select one to see it on the matrix."
          />
          <div className="sec-body rv">
            <PillarExplorer id={`ind-${ind.slug}`} items={industryItems(ind)} />
          </div>
        </div>
      </section>

      <section className="strip dark">
        <div className="wrap strip-in">
          <div>
            <span className="strip-num"><Num value={stats.cost} />%</span>
            <span className="strip-lab">annual cost reduction</span>
          </div>
          <div>
            <span className="strip-num">{stats.profit}%</span>
            <span className="strip-lab">profit increase</span>
          </div>
          {story ? (
            <div>
              <span className="strip-num">{story.metric}</span>
              <span className="strip-lab">
                {story.metricLabel} · {story.company}
              </span>
            </div>
          ) : (
            <div>
              <span className="strip-num">{stats.productivity}%</span>
              <span className="strip-lab">higher productivity</span>
            </div>
          )}
        </div>
        <div className="wrap">
          <p className="note">Sparsh Magic’s reported client averages across sectors. Individual results depend on implementation.</p>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="similar rv">
            <div>
              <span className="eyebrow">Proof</span>
              <h2 className="h3" style={{ marginTop: 14 }}>
                {story ? `See how ${story.company} did it.` : 'See a similar business transformed.'}
              </h2>
              {story && <p className="muted" style={{ marginTop: 8 }}>“{story.quote}”</p>}
            </div>
            <Button href={story ? `/results#${story.slug}` : '/results'} variant="ghost" arrow>
              Read the story
            </Button>
          </div>
          <div className="more-ind">
            <span className="muted">Other industries:</span>
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="text-link">
                {o.title}
              </Link>
            ))}
            <Link href="/industries" className="text-link">
              All →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Map your {ind.title.toLowerCase()} business <em>in 5 minutes.</em>
          </>
        }
      />
    </>
  );
}
