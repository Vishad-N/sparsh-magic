/**
 * Server-rendered building blocks shared across pages.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { founder, howSteps, stats, type IconName } from '@/lib/data';
import Backdrop, { type BackdropItem } from './Backdrop';
import Button from './Button';
import CountUp from './CountUp';
import Icon from './Icon';

const rand = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------- Number ranges ---------- */

/** Renders "9–15%" with breathing room around the dash (big tight-tracked numbers). */
export function Num({ value }: { value: string }) {
  const parts = value.split(/([–-])/);
  return (
    <>
      {parts.map((p, i) =>
        p === '–' || p === '-' ? (
          <span key={i} className="num-dash">
            –
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

/* ---------- Headings ---------- */

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  as = 'h2',
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  as?: 'h1' | 'h2';
}) {
  const H = as;
  return (
    <div className={center ? 'center' : undefined}>
      <span className="eyebrow rv">{eyebrow}</span>
      <H className={`${as === 'h1' ? 'h1' : 'h2'} rv`} style={{ ['--rd' as string]: '.06s' }}>
        {title}
      </H>
      {lead && (
        <p className="lead rv" style={{ ['--rd' as string]: '.12s' }}>
          {lead}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
  backdrop,
}: {
  crumbs: { href?: string; label: string }[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  backdrop?: BackdropItem[];
}) {
  return (
    <section className="phero">
      {backdrop && <Backdrop items={backdrop} />}
      <div className="wrap">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <div className={aside ? 'phero-grid' : undefined}>
          <div>
            <SectionHead as="h1" eyebrow={eyebrow} title={title} lead={lead} />
            {children}
          </div>
          {aside && <div className="rv" style={{ ['--rd' as string]: '.18s' }}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand({
  eyebrow = 'The AURA Form',
  title = (
    <>
      Find your 49 leaks in <em>5 minutes.</em>
    </>
  ),
  lead = 'Take the AURA Scan, a short founder diagnostic. See where accountability breaks in your business and what to fix first.',
  ticks = ['No cost, no obligation', 'For teams of 10+', 'Personal debrief from the Sparsh team'],
  primary = { href: '/aura', label: 'Start my AURA Scan' },
  secondary = { href: '/contact', label: 'Talk to the team' },
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  ticks?: string[];
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="cta">
      <div className="wrap">
        <div className="cta-box dark rv">
          <div className="bgm" aria-hidden="true">
            {Array.from({ length: 288 }, (_, i) => (
              <i key={i} style={{ ['--d' as string]: `${(rand(i, 7) * 6).toFixed(2)}s` }} />
            ))}
          </div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          {ticks.length > 0 && (
            <ul className="ticks">
              {ticks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <div className="cta-actions">
            <Button href={primary.href} variant="lime" arrow>
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mini matrix snippet ---------- */

/** A 7×3 matrix strip; `pattern` lists lit cells, the last one glows lime. */
export function MiniMatrix({ seed = 1, rows = 3 }: { seed?: number; rows?: number }) {
  const n = rows * 7;
  return (
    <span className="mm" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const height = 1 + Math.floor(rand(col, seed) * rows);
        const on = rows - row <= height;
        const hot = on && rows - row === height && col >= 4;
        return <i key={i} className={hot ? 'on hot' : on ? 'on' : ''} style={{ ['--k' as string]: i }} />;
      })}
    </span>
  );
}

/* ---------- Icon tile ---------- */

export function IconTile({ name }: { name: IconName }) {
  return (
    <span className="ii" aria-hidden="true">
      <Icon name={name} />
    </span>
  );
}

/* ---------- Portrait ---------- */

export function Portrait() {
  return (
    <div className="portrait rv" role="img" aria-label={`${founder.name}, founder of Sparsh Magic`}>
      <div className="grid-o" />
      <div className="mono-l">{founder.initials}</div>
      <div className="cap">
        <b>{founder.name}</b>
        <span>{founder.role}</span>
      </div>
    </div>
  );
}

export function FounderStats() {
  return (
    <div className="f-stats rv" style={{ ['--rd' as string]: '.18s' }}>
      <div>
        <b>{stats.years}</b>
        <span>years inside Indian businesses</span>
      </div>
      <div>
        <b>
          <CountUp to={stats.msmes} />+
        </b>
        <span>founders & MSMEs transformed</span>
      </div>
      <div>
        <b>32K+</b>
        <span>team members analysed</span>
      </div>
    </div>
  );
}

/* ---------- Big results grid ---------- */

export function ResultsGrid() {
  return (
    <div className="res-grid rv" style={{ ['--rd' as string]: '.1s' }}>
      <div className="stat">
        <div className="num">
          <CountUp to={stats.profit} />
          <sup>%</sup>
        </div>
        <h3>Profit increase</h3>
        <p>From focused execution and fewer leaks, with the same team.</p>
      </div>
      <div className="stat">
        <div className="num">
          <Num value={stats.cost} />
          <sup>%</sup>
        </div>
        <h3>Annual cost reduction</h3>
        <p>Right roles, right output. Less waste, not mass layoffs.</p>
      </div>
      <div className="stat">
        <div className="num">
          <CountUp to={stats.msmes} />
          <sup>+</sup>
        </div>
        <h3>MSMEs transformed</h3>
        <p>Built from real Indian case studies, not imported theory.</p>
      </div>
      <div className="stat">
        <div className="num">
          <CountUp to={32} />
          <sup>K+</sup>
        </div>
        <h3>Team members analysed</h3>
        <p>Patterns from 32,000+ people across industries.</p>
      </div>
    </div>
  );
}

/* ---------- Steps ---------- */

export function Steps({ items = howSteps }: { items?: { n: string; when: string; title: string; text: string }[] }) {
  return (
    <div className="steps">
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      {items.map((s, i) => (
        <article key={s.n} className="step rv" style={{ ['--rd' as string]: `${i * 0.08}s` }}>
          <div className="sn">
            <b>{s.n}</b>
            <i>{s.when}</i>
          </div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </article>
      ))}
    </div>
  );
}

/* ---------- Pain cards ---------- */

export function PainList({ items }: { items: { title: string; body: string; cost: string }[] }) {
  return (
    <div className="pains">
      {items.map((p, i) => (
        <article key={p.title} className="pain rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
          <span className="n">0{i + 1}</span>
          <div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <span className="cost">{p.cost}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------- Ticker ---------- */

const TICKER = ['Self-driven teams', 'No daily chasing', 'Clear ownership', 'Focused execution', 'Measurable profit', 'Talent that stays', 'Founder freedom', 'Plug-and-play systems'];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- JSON-LD ---------- */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
