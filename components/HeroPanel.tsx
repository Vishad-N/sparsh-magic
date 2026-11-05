'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/** Deterministic pseudo-random in [0,1) so server and client markup match. */
const rand = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

type Readout = { label: string; chaos: number; order: number; suffix?: string; dec?: number; barChaos: number; barOrder: number; down?: boolean };

const READOUTS: Readout[] = [
  { label: 'Founder follow-ups / day', chaos: 37, order: 2, barChaos: 92, barOrder: 6, down: true },
  { label: 'Tasks closed without you', chaos: 18, order: 91, suffix: '%', barChaos: 18, barOrder: 91 },
  { label: 'Accountability score', chaos: 3.1, order: 9.2, dec: 1, barChaos: 31, barOrder: 92 },
];

function Tween({ value, dec = 0, suffix = '' }: { value: number; dec?: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = prev.current;
    prev.current = value;
    if (from === value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value.toFixed(dec) + suffix;
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      el.textContent = (from + (value - from) * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suffix;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, dec, suffix]);
  return <b ref={ref}>{value.toFixed(dec) + suffix}</b>;
}

/**
 * The MAP49™ control panel: 49 cells scattered in "chaos" that snap into a
 * rising bar chart when the system is switched on.
 */
export default function HeroPanel({ autoStart = true }: { autoStart?: boolean }) {
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!autoStart) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setOrdered(true), reduce ? 0 : 1300);
    return () => clearTimeout(t);
  }, [autoStart]);

  const cells = useMemo(
    () =>
      Array.from({ length: 49 }, (_, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        const r = rand(i, 1);
        const cls = ['cell', r > 0.82 ? 'c-p' : r > 0.72 ? 'c-l' : '', row === 6 - col ? 'hot' : row > 6 - col ? 'on' : '']
          .filter(Boolean)
          .join(' ');
        return {
          cls,
          style: {
            '--x': `${(rand(i, 2) * 90 - 45).toFixed(1)}px`,
            '--y': `${(rand(i, 3) * 90 - 45).toFixed(1)}px`,
            '--r': `${(rand(i, 4) * 120 - 60).toFixed(0)}deg`,
            '--sc': (0.55 + rand(i, 5) * 0.6).toFixed(2),
            '--d': `${(row + col) * 45}ms`,
          } as React.CSSProperties,
        };
      }),
    [],
  );

  return (
    <div className={`panel${ordered ? ' ordered' : ''}`} role="group" aria-label="MAP49 control panel demo">
      <div className="p-head">
        <div className="p-title">
          MAP49™ Control Panel<b>Your business · Live</b>
        </div>
        <span className="state" aria-live="polite">
          {ordered ? 'ORDER' : 'CHAOS'}
        </span>
      </div>
      <div className="p-body">
        <div className="matrix-wrap">
          <div className="matrix" aria-hidden="true">
            {cells.map((c, i) => (
              <span key={i} className={c.cls} style={c.style} />
            ))}
          </div>
          <span className="scan" aria-hidden="true" />
        </div>
        <div className="reads">
          {READOUTS.map((r) => (
            <div key={r.label} className={`read${r.down ? ' down' : ''}`}>
              <div className="read-top">
                {r.label}
                <Tween value={ordered ? r.order : r.chaos} dec={r.dec} suffix={r.suffix} />
              </div>
              <div className="bar">
                <i style={{ ['--w' as string]: `${ordered ? r.barOrder : r.barChaos}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="toggle" aria-pressed={ordered} onClick={() => setOrdered((o) => !o)}>
          <span>{ordered ? 'MAP49™ running. Switch off to see chaos' : 'Switch on MAP49™ system'}</span>
          <span className="sw" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
