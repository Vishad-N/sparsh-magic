import Link from 'next/link';
import Backdrop from '@/components/Backdrop';
import Button from '@/components/Button';
import { bd } from '@/lib/backdrops';
import CountUp from '@/components/CountUp';
import Divider from '@/components/Divider';
import HeroPanel from '@/components/HeroPanel';
import HeroPattern from '@/components/HeroPattern';
import Icon from '@/components/Icon';
import PillarExplorer from '@/components/PillarExplorer';
import { CtaBand, FounderStats, Num, IconTile, PainList, Portrait, ResultsGrid, SectionHead, Steps, Ticker } from '@/components/Blocks';
import { caseStudies, founder, industries, stats } from '@/lib/data';
import { pillarItems } from '@/lib/explorer';

const PAINS = [
  { title: 'Daily chasing', body: 'You ask once. Nothing happens. You ask again. You start to feel like the only one who cares about deadlines.', cost: 'Costs: 4+ founder hours / day' },
  { title: 'Instructions for everything', body: 'Nothing moves without a direct order. The day you step away, the business quietly stops.', cost: 'Costs: no holidays, no scale' },
  { title: 'Problems, never solutions', body: 'People bring you issues, not options. Every fire lands on your desk because ownership was never designed.', cost: 'Costs: decision fatigue' },
  { title: 'Good people leave', body: 'Top performers carry the weak ones until they burn out and resign. Hiring more only adds cost.', cost: 'Costs: rising manpower bill' },
];

const BENEFITS = [
  { icon: 'pulse' as const, title: 'Plug-and-play system', text: 'So simple a 10-year-old could follow it. Ready from week one.' },
  { icon: 'people' as const, title: 'Talent retention', text: 'Clear growth paths keep your best people, with 12% higher productivity.' },
  { icon: 'clock' as const, title: 'Time back for you', text: 'Hours a day returned to strategy, sales and family.' },
  { icon: 'chart' as const, title: 'Every effort measured', text: 'Real-time tracking delivers 37% higher salary ROI.' },
];

export default function Home() {
  const star = caseStudies[0];
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <HeroPattern />
        <div className="wrap hero-grid">
          <div>
            <span className="badge rv">
              <b>MAP49™</b> Matrix of Accountability &amp; Productivity
            </span>
            <h1 className="rv" style={{ ['--rd' as string]: '.08s' }}>
              Fix lazy team culture. <span className="mark">Forever.</span>
            </h1>
            <p className="hero-sub rv" style={{ ['--rd' as string]: '.16s' }}>
              Stop <span className="strike">chasing your team</span> every morning. MAP49™ installs a self-driven operating system in your MSME, so work
              moves without you and profit shows up on the P&amp;L.
            </p>
            <div className="btn-row rv" style={{ ['--rd' as string]: '.24s' }}>
              <Button href="/aura" variant="lime" arrow>
                Get Founder Freedom
              </Button>
              <Button href="/framework" variant="ghost">
                See the 49-point matrix
              </Button>
            </div>
            <div className="proof rv" style={{ ['--rd' as string]: '.32s' }}>
              <div>
                <b>
                  <CountUp to={stats.profit} />
                  <em>%</em>
                </b>
                <span>average profit increase</span>
              </div>
              <div>
                <b>
                  <Num value={stats.cost} />
                  <em>%</em>
                </b>
                <span>annual cost reduction</span>
              </div>
              <div>
                <b>
                  <CountUp to={stats.msmes} />
                  <em>+</em>
                </b>
                <span>MSMEs transformed</span>
              </div>
            </div>
          </div>

          <div className="panel-shell rv" style={{ ['--rd' as string]: '.2s' }}>
            <div className="float-chip a" aria-hidden="true">
              <span className="dot">✓</span>
              <div>
                <b>0</b> follow-ups today
                <br />
                <small>Team self-reported 9:42 AM</small>
              </div>
            </div>
            <div className="float-chip b" aria-hidden="true">
              <span className="dot" style={{ background: 'var(--purple)', color: 'var(--paper)' }}>
                ↑
              </span>
              <div>
                <b>+21%</b>
                <br />
                <small>Profit, same headcount</small>
              </div>
            </div>
            <HeroPanel />
          </div>
        </div>
      </section>

      <Ticker />

      {/* ============ PROBLEM ============ */}
      <section className="sec">
        <Backdrop items={bd.home.problem} />
        <div className="wrap">
          <SectionHead
            eyebrow="The stuck pattern"
            title={
              <>
                You built a business.
                <br />
                It became a <span className="purple">babysitting job.</span>
              </>
            }
            lead="Your team isn’t lazy by nature. It runs on the only system it has: you. Every instruction, every reminder, every decision routes through the founder’s phone."
          />
          <div className="prob-grid">
            <div className="chat" aria-label="Example of a founder’s daily follow-up messages">
              <div className="chat-h">
                <span className="ava">You</span>
                <div>
                  <b>Team · Operations</b>
                  <small>Typical Tuesday, 9:10 AM onwards</small>
                </div>
              </div>
              <div className="msgs">
                <div className="msg">
                  Dispatch for Sharma order gone?<small>09:12</small>
                </div>
                <div className="msg reply">
                  Sir, checking…<small>10:47</small>
                </div>
                <div className="msg">
                  Please share today’s sales update.<small>11:30</small>
                </div>
                <div className="msg">
                  Reminder again: stock count by 5.<small>16:02</small>
                </div>
                <div className="msg">
                  Who is handling the complaint??<small>18:55</small>
                </div>
              </div>
              <div className="counter-chip">
                Hours you spend chasing, every day <b>4+ hrs</b>
              </div>
            </div>
            <PainList items={PAINS} />
          </div>
        </div>
      </section>

      {/* ============ FRAMEWORK ============ */}
      <section className="sec paper">
        <Backdrop items={bd.home.framework} />
        <Divider variant="grid" className="dv-top" />
        <div className="wrap">
          <SectionHead
            eyebrow="The MAP49™ Framework"
            title={
              <>
                7 pillars × 7 levels.
                <br />
                <span className="purple">49 checkpoints</span> that run your team.
              </>
            }
            lead="MAP49™ maps every role against seven accountability pillars, then moves each one up seven maturity levels, from founder-dependent to fully self-driven. Pick a pillar to see it on the matrix."
          />
          <div className="sec-body rv">
            <PillarExplorer items={pillarItems()} auto id="home-px" stickyView />
          </div>
          <p className="rv" style={{ marginTop: 28 }}>
            <Link className="text-link" href="/framework">
              Explore the full framework →
            </Link>
          </p>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="sec dark">
        <Backdrop items={bd.home.results} tone="dark" />
        <div className="wrap">
          <SectionHead
            eyebrow="Results on the P&L"
            title={
              <>
                Systems, not slogans.
                <br />
                Numbers, not motivation.
              </>
            }
            lead="MAP49™ is plug-and-play. It goes in on top of the team you already have, and it’s measured the way a founder measures: cost, profit and time back."
          />
          <ResultsGrid />
          <div className="benefits">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="benefit rv" style={{ ['--rd' as string]: `${i * 0.05}s` }}>
                <span className="ic" aria-hidden="true">
                  <Icon name={b.icon} size={20} />
                </span>
                <div>
                  <b>{b.title}</b>
                  <span>{b.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="split-row">
            <p className="note">Figures are Sparsh Magic’s reported client averages. Individual results depend on implementation.</p>
            <Link className="text-link" href="/results">
              See transformation stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="sec">
        <Backdrop items={bd.home.how} />
        <div className="wrap">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                From chaos to control
                <br />
                in four moves.
              </>
            }
          />
          <Steps />
        </div>
      </section>

      <Divider variant="trail" />

      {/* ============ INDUSTRIES ============ */}
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Industries"
            title={
              <>
                One system.
                <br />
                Tuned to how <span className="purple">your floor</span> works.
              </>
            }
          />
          <div className="ind-grid">
            {industries
              .filter((i) => i.primary)
              .map((ind, i) => (
                <Link key={ind.slug} href={`/industries/${ind.slug}`} className="ind rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
                  <div>
                    <IconTile name={ind.icon} />
                    <h3>{ind.title}</h3>
                    <p>{ind.card}</p>
                  </div>
                  <span className="k">{ind.kpis.slice(0, 3).join(' · ')}</span>
                </Link>
              ))}
          </div>
          <p className="rv" style={{ marginTop: 28 }}>
            <Link className="text-link" href="/industries">
              All industries we work with →
            </Link>
          </p>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section className="sec paper">
        <Divider variant="cells" className="dv-top" />
        <div className="wrap founder">
          <Portrait />
          <div>
            <SectionHead
              eyebrow="The founder"
              title={
                <>
                  A practitioner,
                  <br />
                  not a motivational speaker.
                </>
              }
              lead={`${founder.name} has spent ${stats.years} years inside real Indian businesses, diagnosing why teams underperform and fixing it with systems. MAP49™ is the distilled result of 342+ MSME transformations and 32,000+ team members analysed.`}
            />
            <FounderStats />
            <blockquote className="quote rv" style={{ ['--rd' as string]: '.24s' }}>
              “{star.quote}”<cite>{star.person}, {star.personRole}</cite>
            </blockquote>
            <div className="btn-row rv">
              <Button href="/about" variant="ghost" size="sm">
                Read Rupak’s story
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ paddingTop: 88 }} />
      <CtaBand />
    </>
  );
}
