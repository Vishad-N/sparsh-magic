'use client';

import { useEffect, useRef } from 'react';
import Motif, { type MotifName } from './Motifs';

/**
 * Places business-analyst motifs in a section's negative space.
 *
 * Put <Backdrop items={[...]} /> as the first child of any section; the
 * section's .wrap stays above it. Each item is positioned with l/r/t/b
 * (any CSS length) and has a depth (0 far … 1 near).
 *
 * Motion (shared engine, one rAF, transform only):
 *  - parallax: motifs drift slower than the content, far ones more so
 *  - alignment: tilted motifs rotate toward 0° as their section reaches
 *    the middle of the screen (the MAP49 chaos → order idea)
 * Hidden below 1240px unless `mob` is set. Static for reduced motion.
 */

export type BackdropItem = {
  m: MotifName;
  w: number;
  l?: string;
  r?: string;
  t?: string;
  b?: string;
  rot?: number;
  d?: number;
  mob?: boolean;
};

type Entry = { root: HTMLElement; nodes: { el: HTMLElement; rot: number; d: number }[]; visible: boolean };

const entries = new Set<Entry>();
let raf = 0;
let bound = false;

function frame() {
  raf = 0;
  const vh = window.innerHeight;
  const k = window.innerWidth < 768 ? 0.5 : 1;
  entries.forEach((e) => {
    if (!e.visible) return;
    const r = e.root.getBoundingClientRect();
    const off = vh / 2 - (r.top + r.height / 2); // + when section is above centre
    const settle = Math.min(1, Math.abs(off) / (vh * 0.9));
    e.nodes.forEach((n) => {
      const y = off * (0.04 + (1 - n.d) * 0.1) * k;
      n.el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) rotate(${(n.rot * settle).toFixed(2)}deg)`;
    });
  });
}
const kick = () => {
  if (!raf) raf = requestAnimationFrame(frame);
};

function register(e: Entry) {
  entries.add(e);
  if (!bound) {
    bound = true;
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
  }
  kick();
  return () => {
    entries.delete(e);
    if (!entries.size && bound) {
      bound = false;
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    }
  };
}

export default function Backdrop({ items, tone = 'light' }: { items: BackdropItem[]; tone?: 'light' | 'dark' }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const section = el?.parentElement;
    if (!el || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const entry: Entry = {
      root: section,
      visible: false,
      nodes: Array.from(el.querySelectorAll<HTMLElement>('.bd-i')).map((n, i) => ({ el: n, rot: items[i]?.rot ?? 0, d: items[i]?.d ?? 0.5 })),
    };
    const io = new IntersectionObserver(([x]) => {
      entry.visible = x.isIntersecting;
      kick();
    });
    io.observe(section);
    const off = register(entry);
    return () => {
      io.disconnect();
      off();
    };
  }, [items]);

  return (
    <div className={`bd bd-${tone}`} ref={root} aria-hidden="true">
      {items.map((it, i) => (
        <div
          key={i}
          className={`bd-i${it.mob ? ' mob' : ''}`}
          style={
            {
              width: it.w,
              left: it.l,
              right: it.r,
              top: it.t,
              bottom: it.b,
              transform: `rotate(${it.rot ?? 0}deg)`,
              '--bd-o': (0.55 + (it.d ?? 0.5) * 0.45).toFixed(2),
              '--bd-f': `${9 + (i % 3) * 2}s`,
              '--bd-del': `${-i * 1.7}s`,
            } as React.CSSProperties
          }
        >
          <div className="bd-float">
            <Motif name={it.m} />
          </div>
        </div>
      ))}
    </div>
  );
}
