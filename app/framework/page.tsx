import type { Metadata } from 'next';
import Link from 'next/link';
import BeforeAfter, { type BARow } from '@/components/BeforeAfter';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import PillarExplorer from '@/components/PillarExplorer';
import { CtaBand, JsonLd, Num, SectionHead } from '@/components/Blocks';
import { benefits, levels, map49, pillars, site, specialties } from '@/lib/data';
import { pillarItems } from '@/lib/explorer';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'MAP49 Framework: 7 Pillars × 7 Levels',
  description:
    'Inside MAP49, the Matrix of Accountability & Productivity: seven accountability pillars, seven maturity levels and 49 checkpoints that turn a founder-dependent team into a self-driven one.',
  alternates: { canonical: '/framework' },
};

const BA_ROWS: BARow[] = [
  { label: 'Founder follow-ups / day', before: { value: '30+', w: 90 }, after: { value: '< 5', w: 12 }, lowerIsBetter: true },
  { label: 'Hours spent chasing / day', before: { value: '4+ hrs', w: 80 }, after: { value: '< 1 hr', w: 18 }, lowerIsBetter: true },
  { label: 'Roles with a clear scorecard', before: { value: 'Few', w: 20 }, after: { value: 'All', w: 96 } },
  { label: 'Annual operating cost', before: { value: 'Baseline', w: 78 }, after: { value: '−9–15%', w: 66 }, lowerIsBetter: true },
  { label: 'Profit', before: { value: 'Baseline', w: 52 }, after: { value: '+21%', w: 74 } },
  { label: 'Team productivity', before: { value: 'Baseline', w: 58 }, after: { value: '+12%', w: 70 } },
];

const PRACTICE = [
  { when: 'Week 0', title: 'AURA Scan', pillars: [] as number[], text: 'A 5-minute founder diagnostic and a debrief call. You see your current level on each pillar.' },
  { when: 'Week 1', title: 'Map the 49', pillars: [0, 1, 2, 3, 4, 5, 6], text: 'Every role is plotted on the matrix. Interviews, a process audit and the Employee Engagement Index show where work leaks.' },
  { when: 'Weeks 2–4', title: 'Clarity & ownership', pillars: [0, 1], text: 'Role scorecards and ownership charts go live. Every recurring problem gets exactly one owner.' },
  { when: 'Weeks 5–8', title: 'Rhythm, metrics & solving', pillars: [2, 3, 4], text: 'Daily huddles and weekly reviews start running without you. The one-page business monitor goes live.' },
  { when: 'Month 3+', title: 'Growth & rewards', pillars: [5, 6], text: 'Skill ladders, successors and output-linked rewards lock the system in. You review one page, not people.' },
];

const faq = [
  { q: 'What does MAP49 stand for?', a: `${map49.fullName}. Seven pillars of accountability, each moved through seven levels of maturity, giving 49 checkpoints.` },
  { q: 'Do I need to replace my team?', a: 'No. MAP49 goes in on top of the team you already have. The premise is that you need better systems, not better people.' },
  { q: 'How long does it take?', a: 'The first changes are visible within weeks. A typical installation runs about three months, after which the team runs the rhythm itself.' },
];

export default function FrameworkPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      {/* ============ HERO + LIVE MATRIX ============ */}
      <section className="phero fw-hero">
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span aria-current="page">Framework</span>
              </li>
            </ol>
          </nav>
          <PillarExplorer
            id="fw-px"
            items={pillarItems(true)}
            stickyView
            intro={
              <div className="fw-intro">
                <span className="eyebrow rv">The MAP49 Framework</span>
                <h1 className="h1 rv" style={{ ['--rd' as string]: '.06s' }}>
                  MAP49: 7 pillars <span className="purple">×</span> 7 levels.
                </h1>
                <p className="lead rv" style={{ ['--rd' as string]: '.12s' }}>
                  The {map49.fullName}. {map49.description}
                </p>
                <p className="fw-hint rv" style={{ ['--rd' as string]: '.18s' }}>
                  Select a pillar to light its row on the live matrix.
                </p>
              </div>
            }
          />
        </div>
      </section>

      <Divider variant="grid" />

      {/* ============ 7 LEVELS ============ */}
      <section className="sec-tight">
        <div className="wrap">
          <SectionHead
            eyebrow="The 7 levels"
            title={
              <>
                Every pillar climbs the same <span className="purple">ladder.</span>
              </>
            }
            lead="Each role is scored on each pillar. The goal isn’t perfection on day one. It’s steady movement up the ladder, from work that needs you to work that leads itself."
          />
          <ol className="ladder rv">
            {levels.map((l, i) => (
              <li key={l.name} style={{ ['--i' as string]: i }}>
                <span className="lv">L{i + 1}</span>
                <b>{l.name}</b>
                <span className="lt">{l.text}</span>
                <span className="step-bar" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Divider variant="trail" align="right" />

      {/* ============ PILLARS IN DEPTH ============ */}
      <section className="sec-tight">
        <Backdrop items={bd.framework.deep} />
        <div className="wrap">
          <SectionHead
            eyebrow="The 7 pillars in depth"
            title={
              <>
                What each pillar installs,
                <br />
                and what it gives you back.
              </>
            }
          />
          <div className="deep">
            {pillars.map((p, i) => (
              <article key={p.key} className="deep-card rv" id={p.key}>
                <header>
                  <span className="deep-n">P{i + 1}</span>
                  <span className="deep-row" aria-hidden="true">
                    {pillars.map((_, j) => (
                      <i key={j} className={j === i ? 'on' : ''} />
                    ))}
                  </span>
                </header>
                <h3>{p.name}</h3>
                <p className="deep-promise">{p.promise}</p>
                <p>{p.summary}</p>
                <div className="deep-ex">
                  <b>In practice</b>
                  {p.example}
                </div>
                <div className="deep-change">
                  <b>What changes for the founder</b>
                  {p.founderChange}
                </div>
                <ul className="chips light">
                  {p.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Divider variant="scan" />

      {/* ============ BEFORE / AFTER ============ */}
      <section className="sec-tight">
        <div className="wrap">
          <SectionHead
            eyebrow="Before & after"
            title={
              <>
                Same team. <span className="mark">Different system.</span>
              </>
            }
            lead="What typically changes when MAP49 goes in. Same people, same office, same customers."
          />
          <BeforeAfter
            rows={BA_ROWS}
            footnote="Cost, profit and productivity rows are Sparsh Magic’s reported client averages. Founder-time rows are illustrative of a typical engagement."
          />
        </div>
      </section>

      <Divider variant="cells" />

      {/* ============ IN PRACTICE ============ */}
      <section className="sec-tight">
        <Backdrop items={bd.framework.practice} />
        <div className="wrap">
          <SectionHead
            eyebrow="How it works in practice"
            title={
              <>
                Installed in sequence,
                <br />
                one pillar group at a time.
              </>
            }
            lead="MAP49 is not a workshop you take notes in. It is a sequence of changes your team runs with, guided by Sparsh Magic coaches."
          />
          <ol className="practice">
            {PRACTICE.map((s, i) => (
              <li key={s.title} className="rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
                <span className="pr-when">{s.when}</span>
                <div className="pr-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <span className="pr-cells" aria-label={s.pillars.length ? `Pillars: ${s.pillars.map((x) => pillars[x].name).join(', ')}` : 'Diagnostic'}>
                  {pillars.map((_, j) => (
                    <i key={j} className={s.pillars.includes(j) ? 'on' : ''} />
                  ))}
                </span>
              </li>
            ))}
          </ol>

          <div className="inside rv">
            <h3>What’s inside the system</h3>
            <ul className="chips light">
              {specialties.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ TYPICAL RESULTS ============ */}
      <section className="sec dark">
        <Divider variant="grid" tone="dark" className="dv-top" />
        <div className="wrap">
          <SectionHead
            eyebrow="Typical results"
            title={
              <>
                What MAP49 is <span className="lime">measured</span> on.
              </>
            }
          />
          <div className="bn-grid">
            {benefits.map((b, i) => (
              <article key={b.title} className="bn rv" style={{ ['--rd' as string]: `${i * 0.05}s` }}>
                <span className="bn-num"><Num value={b.metric} /></span>
                <span className="bn-lab">{b.metricLabel}</span>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </article>
            ))}
          </div>
          <p className="note">Reported across Sparsh Magic client engagements. Individual results depend on implementation.</p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="sec-tight">
        <Backdrop items={bd.framework.faq} />
        <div className="wrap wrap-narrow">
          <SectionHead eyebrow="Questions founders ask" title="Before you start." />
          <div className="faq rv">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="btn-row">
            <Button href="/results" variant="ghost">
              See the results
            </Button>
            <Button href={`mailto:${site.email}`} variant="ghost">
              Email {site.email}
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="See it in your business"
        title={
          <>
            See how this looks <em>in your business.</em>
          </>
        }
        lead="The AURA Scan places your business on the MAP49 matrix in five minutes and shows the two pillars to fix first."
        primary={{ href: '/aura', label: 'Start AURA Scan' }}
      />
    </>
  );
}
