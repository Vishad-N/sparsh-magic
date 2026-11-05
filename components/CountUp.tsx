'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders the final number on the server (good for SEO and no-JS),
 * then counts up from zero the first time it scrolls into view.
 */
export default function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => Math.round(n).toLocaleString('en-IN');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    el.textContent = fmt(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = fmt(to);
    };
  }, [to, duration]);

  return <span ref={ref}>{fmt(to)}</span>;
}
