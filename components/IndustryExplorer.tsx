'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Industry } from '@/lib/data';
import Icon from './Icon';

const rand = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Snippet({ seed }: { seed: number }) {
  return (
    <span className="mm" aria-hidden="true">
      {Array.from({ length: 21 }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const h = 1 + Math.floor(rand(col, seed) * 3);
        const on = 3 - row <= h;
        return <i key={i} className={on ? (3 - row === h && col >= 4 ? 'on hot' : 'on') : ''} style={{ ['--k' as string]: i }} />;
      })}
    </span>
  );
}

/**
 * Industry grid with filter chips (lightly highlight matching cards) and
 * an expandable panel per card listing specific system applications.
 */
export default function IndustryExplorer({ items }: { items: Industry[] }) {
  const filters = ['All', ...Array.from(new Set(items.flatMap((i) => i.tags)))];
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="ix">
      <div className="ix-filters" role="group" aria-label="Filter industries">
        {filters.map((f) => (
          <button key={f} type="button" className="fchip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="ix-grid">
        {items.map((ind, i) => {
          const match = filter === 'All' || ind.tags.includes(filter);
          const isOpen = open === ind.slug;
          return (
            <article
              key={ind.slug}
              className={`ix-card${ind.primary ? ' big' : ''}${match ? (filter !== 'All' ? ' match' : '') : ' dimmed'}${isOpen ? ' open' : ''}`}
            >
              <div className="ix-top">
                <span className="ii" aria-hidden="true">
                  <Icon name={ind.icon} />
                </span>
                <Snippet seed={i + 3} />
              </div>
              <h3>
                <Link href={`/industries/${ind.slug}`} className="ix-link">
                  {ind.title}
                </Link>
              </h3>
              <p className="ix-po">
                <span>{ind.pain}</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
                <b>{ind.outcome}</b>
              </p>
              <div className="ix-foot">
                <button
                  type="button"
                  className="ix-toggle"
                  aria-expanded={isOpen}
                  aria-controls={`ix-${ind.slug}`}
                  onClick={() => setOpen(isOpen ? null : ind.slug)}
                >
                  {isOpen ? 'Hide' : 'Show'} system applications
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <Link href={`/industries/${ind.slug}`} className="text-link" aria-label={`${ind.title} in detail`}>
                  Details →
                </Link>
              </div>
              <div className="ix-panel" id={`ix-${ind.slug}`} hidden={!isOpen}>
                <ul>
                  {ind.applications.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
