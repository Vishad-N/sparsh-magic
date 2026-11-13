'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero backdrop that tells the MAP49 story: chaos → order.
 *
 *  - A ghost 7×7 matrix sits behind the control panel, tilted.
 *  - Matrix fragments float at different depths, rotated off-grid.
 *  - Faint circuit traces run along the hero edges.
 *
 * As the visitor scrolls, the ghost matrix and every fragment rotate into
 * alignment (order), each layer moving at its own parallax speed. On
 * desktop, fragments also drift slightly with the pointer, scaled by depth.
 * Transform-only, one rAF loop, paused off-screen, static for reduced motion.
 */

type Cell = [col: number, row: number, kind?: 'o' | 'l'];
type Fragment = { x: number; y: number; depth: number; rot: number; cells: Cell[]; desk?: boolean; float: number };

// Positions are % of the hero; kept clear of the headline and CTA area.
const FRAGMENTS: Fragment[] = [
  { x: 2.5, y: 8, depth: 0.3, rot: -22, float: 7, cells: [[0, 0], [1, 0], [2, 0, 'o'], [0, 1, 'o'], [1, 1]] },
  { x: 41, y: 5, depth: 0.65, rot: 28, float: 9, cells: [[0, 0], [1, 0, 'o'], [2, 0], [3, 0, 'l']] },
  { x: 47, y: 46, depth: 0.45, rot: -34, float: 8, desk: true, cells: [[0, 0], [0, 1], [0, 2, 'o'], [1, 2]] },
  { x: 93, y: 6, depth: 0.9, rot: 18, float: 10, cells: [[0, 0, 'l'], [1, 0], [0, 1], [1, 1, 'o'], [1, 2]] },
  { x: 84, y: 93, depth: 0.35, rot: -14, float: 11, cells: [[0, 0], [1, 0, 'o'], [2, 0], [3, 0, 'o'], [4, 0], [5, 0, 'o'], [6, 0, 'l']] },
  { x: 54, y: 90, depth: 0.75, rot: 38, float: 7, desk: true, cells: [[0, 0], [1, 0, 'o'], [0, 1, 'o'], [1, 1]] },
  { x: 0.5, y: 52, depth: 0.2, rot: 10, float: 12, desk: true, cells: [[0, 0, 'o'], [0, 1], [0, 2], [0, 3, 'o']] },
  { x: 36, y: 95, depth: 0.55, rot: -26, float: 9, cells: [[0, 0], [1, 1, 'l'], [2, 2, 'o']] },
];

const STEP = 17;
const SIZE = 12;

function FragmentSvg({ cells }: { cells: Cell[] }) {
  const w = (Math.max(...cells.map((c) => c[0])) + 1) * STEP;
  const h = (Math.max(...cells.map((c) => c[1])) + 1) * STEP;
  return (
    <svg width={w} height={h} viewBox={`-1 -1 ${w + 2} ${h + 2}`} xmlns="http://www.w3.org/2000/svg" focusable="false">
      {cells.map(([c, r, k], i) =>
        k === 'o' ? (
          <rect key={i} x={c * STEP + 0.75} y={r * STEP + 0.75} width={SIZE - 1.5} height={SIZE - 1.5} rx="2.4" fill="none" stroke="#071722" strokeOpacity=".28" strokeWidth="1.1" />
        ) : k === 'l' ? (
          <rect key={i} x={c * STEP} y={r * STEP} width={SIZE} height={SIZE} rx="2.6" fill="#52DDB6" stroke="#071722" strokeOpacity=".22" strokeWidth=".9" />
        ) : (
          <rect key={i} x={c * STEP} y={r * STEP} width={SIZE} height={SIZE} rx="2.6" fill="#2E94A0" fillOpacity=".55" />
        ),
      )}
    </svg>
  );
}

function GhostMatrix() {
  const cell = 84;
  const gap = 12;
  const o = 40;
  const span = 7 * cell + 6 * gap;
  return (
    <svg viewBox={`0 0 ${span + o * 2} ${span + o * 2}`} xmlns="http://www.w3.org/2000/svg" focusable="false">
      <g fill="none" stroke="#071722" strokeOpacity=".14" strokeWidth="1.3" strokeDasharray="3 5">
        {Array.from({ length: 49 }, (_, i) => (
          <rect key={i} x={o + (i % 7) * (cell + gap)} y={o + Math.floor(i / 7) * (cell + gap)} width={cell} height={cell} rx="16" />
        ))}
      </g>
      {/* a few cells already "on": the system starting to form */}
      <g fill="#2E94A0" fillOpacity=".11">
        {[45, 46, 39, 40, 47, 33, 41, 48].map((i) => (
          <rect key={i} x={o + (i % 7) * (cell + gap)} y={o + Math.floor(i / 7) * (cell + gap)} width={cell} height={cell} rx="16" />
        ))}
      </g>
      <g fill="#071722" fillOpacity=".22" fontFamily="ui-monospace, Consolas, monospace" fontSize="13" letterSpacing="1">
        {Array.from({ length: 7 }, (_, i) => (
          <text key={`l${i}`} x={o + i * (cell + gap) + cell / 2} y={o - 14} textAnchor="middle">
            L{i + 1}
          </text>
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <text key={`p${i}`} x={o - 12} y={o + i * (cell + gap) + cell / 2 + 4} textAnchor="end">
            P{i + 1}
          </text>
        ))}
      </g>
      {/* corner registration marks */}
      <g stroke="#2E94A0" strokeOpacity=".45" strokeWidth="1.5" fill="none">
        <path d={`M${o - 22} ${o - 4}V${o - 22}H${o - 4}`} />
        <path d={`M${span + o + 4} ${span + o + 22}H${span + o + 22}V${span + o + 4}`} />
      </g>
    </svg>
  );
}

function Traces() {
  return (
    <svg className="hp-traces" viewBox="0 0 1200 820" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <g fill="none" stroke="#2E94A0" strokeOpacity=".35" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path className="tr tr-a" d="M-10 64H300l26 26H560" />
        <path className="tr tr-b" d="M1210 772H880l-30-30H640" />
        <path className="tr tr-c" d="M140 820V700l24-24h130" />
      </g>
      <g fill="#2E94A0" fillOpacity=".5">
        <rect x="556" y="86" width="8" height="8" rx="2" />
        <rect x="636" y="738" width="8" height="8" rx="2" />
        <rect x="290" y="672" width="8" height="8" rx="2" />
      </g>
    </svg>
  );
}

export default function HeroPattern() {
  const root = useRef<HTMLDivElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const traces = useRef<HTMLDivElement>(null);
  const frags = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const small = window.matchMedia('(max-width: 767px)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let raf = 0;
    let visible = true;
    // pointer target and smoothed value, -1..1
    const tgt = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const frame = () => {
      raf = 0;
      if (!visible) return;
      const y = window.scrollY;
      const h = el.offsetHeight || 1;
      const k = small.matches ? 0.5 : 1;
      const p = Math.min(1, y / (h * 0.55)); // 0 = chaos, 1 = aligned

      cur.x += (tgt.x - cur.x) * 0.08;
      cur.y += (tgt.y - cur.y) * 0.08;

      if (ghost.current) {
        ghost.current.style.transform = `translate3d(${(cur.x * -6).toFixed(1)}px, ${(y * 0.18 * k).toFixed(1)}px, 0) rotate(${(-7 * (1 - p)).toFixed(2)}deg)`;
      }
      if (traces.current) traces.current.style.transform = `translate3d(0, ${(y * 0.3 * k).toFixed(1)}px, 0)`;

      FRAGMENTS.forEach((f, i) => {
        const node = frags.current[i];
        if (!node) return;
        // far fragments (low depth) lag more behind the scroll
        const speed = (0.5 - f.depth * 0.38) * k;
        const mx = cur.x * f.depth * 18;
        const my = cur.y * f.depth * 12;
        node.style.transform = `translate3d(${mx.toFixed(1)}px, ${(y * speed + my).toFixed(1)}px, 0) rotate(${(f.rot * (1 - p)).toFixed(2)}deg)`;
      });

      // keep easing toward the pointer until settled
      if (Math.abs(tgt.x - cur.x) > 0.002 || Math.abs(tgt.y - cur.y) > 0.002) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onPointer = (e: PointerEvent) => {
      if (!finePointer.matches || small.matches) return;
      tgt.x = (e.clientX / window.innerWidth) * 2 - 1;
      tgt.y = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(el);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', kick);
    frame();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', kick);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hp-wrap" ref={root} aria-hidden="true">
      <div className="hp-ghost" ref={ghost}>
        <GhostMatrix />
        <span className="hp-scan" />
      </div>
      <div className="hp-tr" ref={traces}>
        <Traces />
      </div>
      {FRAGMENTS.map((f, i) => (
        <div
          key={i}
          ref={(n) => {
            frags.current[i] = n;
          }}
          className={`hp-frag${f.desk ? ' desk' : ''}`}
          style={
            {
              left: `${f.x}%`,
              top: `${f.y}%`,
              transform: `rotate(${f.rot}deg)`,
              '--depth': f.depth,
              '--float': `${f.float}s`,
              '--delay': `${-i * 1.3}s`,
            } as React.CSSProperties
          }
        >
          <div className="hp-float">
            <FragmentSvg cells={f.cells} />
          </div>
        </div>
      ))}
    </div>
  );
}
