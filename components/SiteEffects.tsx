'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Site-wide progressive enhancement:
 *  - reveals `.rv` elements (and `.steps`, `.chat`) as they scroll into view
 *  - drives the liquid-button fill origin via one delegated pointer listener
 * Re-runs on every client-side navigation.
 */
export default function SiteEffects() {
  const path = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' },
    );
    // Wait a frame so the new route's DOM is in place.
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('.rv:not(.in), .steps:not(.in), .chat:not(.in), .lit-on-view:not(.in)').forEach((el) => io.observe(el));
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [path]);

  useEffect(() => {
    const set = (e: PointerEvent) => {
      const b = (e.target as Element | null)?.closest?.('.liquid') as HTMLElement | null;
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
      b.style.setProperty('--s', String(Math.ceil(Math.hypot(r.width, r.height) / 6)));
    };
    const focus = (e: FocusEvent) => {
      const b = (e.target as Element | null)?.closest?.('.liquid') as HTMLElement | null;
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--s', String(Math.ceil(Math.hypot(r.width, r.height) / 6)));
    };
    document.addEventListener('pointerover', set);
    document.addEventListener('pointerout', set);
    document.addEventListener('focusin', focus);
    return () => {
      document.removeEventListener('pointerover', set);
      document.removeEventListener('pointerout', set);
      document.removeEventListener('focusin', focus);
    };
  }, []);

  return null;
}
