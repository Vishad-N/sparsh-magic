'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { meetings, walls, wallTitles, WALLS } from '@/lib/meetings';

const STEP = 360 / WALLS;
const AUTO_MS = 5200;

export default function MeetingsGallery() {
  const [idx, setIdx] = useState(0); // unbounded so the room never spins backwards
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lb, setLb] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const hold = useRef(false); // pointer or focus is inside the room
  const inView = useRef(true);
  const wallNo = ((idx % WALLS) + WALLS) % WALLS;

  // Auto-turn only on desktop-size screens, when motion is welcome, the room is on screen and untouched.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting));
    io.observe(el);
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 761px)');
    const t = window.setInterval(() => {
      if (motionOk && wide.matches && inView.current && !hold.current && !document.hidden) setIdx((i) => i + 1);
    }, AUTO_MS);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, []);

  const go = useCallback((d: number) => setIdx((i) => i + d), []);
  const toWall = (n: number) =>
    setIdx((i) => {
      let d = n - (((i % WALLS) + WALLS) % WALLS);
      if (d > WALLS / 2) d -= WALLS;
      if (d < -WALLS / 2) d += WALLS;
      return i + d;
    });

  const open = (i: number) => {
    setLb(i);
    dlg.current?.showModal();
  };
  const close = () => dlg.current?.close();
  const step = useCallback((d: number) => setLb((i) => (i === null ? i : (i + d + meetings.length) % meetings.length)), []);

  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb, step]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };

  return (
    <>
      <div
        className="mr"
        ref={stage}
        onPointerEnter={() => (hold.current = true)}
        onPointerLeave={() => {
          hold.current = false;
          setTilt({ x: 0, y: 0 });
        }}
        onFocusCapture={() => (hold.current = true)}
        onBlurCapture={() => (hold.current = false)}
        onPointerMove={onMove}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client meetings room gallery"
      >
        <div className="mr-cam" style={{ ['--tx' as string]: `${tilt.x * 5}deg`, ['--ty' as string]: `${tilt.y * -3}deg` }}>
          <div className="mr-ring" style={{ ['--rot' as string]: `${-idx * STEP}deg` }}>
            {walls.map((w, i) => (
              <section
                key={i}
                className={`mr-wall${i === wallNo ? ' on' : ''}`}
                style={{ ['--a' as string]: `${i * STEP}deg` }}
                aria-label={`${wallTitles[i]}, wall ${i + 1} of ${WALLS}`}
                onClick={() => i !== wallNo && toWall(i)}
              >
                <h3 className="mr-tag">
                  <span>{String(i + 1).padStart(2, '0')}</span> {wallTitles[i]}
                </h3>
                <div className="mr-mosaic">
                  {w.map((m, j) => (
                    <button
                      key={m.src}
                      type="button"
                      className="mr-ph"
                      tabIndex={i === wallNo ? 0 : -1}
                      aria-label={`Enlarge photo: ${m.alt}`}
                      onClick={(e) => {
                        if (i !== wallNo) return; // a side-wall click only turns the room
                        e.stopPropagation();
                        open(meetings.indexOf(m));
                      }}
                    >
                      <Image
                        src={m.src}
                        alt={m.alt}
                        fill
                        sizes="(max-width: 760px) 44vw, 300px"
                        loading={i === 0 && j < 2 ? 'eager' : 'lazy'}
                        style={{ objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div className="mr-ctl">
          <button type="button" onClick={() => go(-1)} aria-label="Previous wall">
            ←
          </button>
          <ol className="mr-dots">
            {wallTitles.map((t, i) => (
              <li key={t}>
                <button type="button" onClick={() => toWall(i)} aria-label={`Go to ${t}`} aria-current={i === wallNo ? 'true' : undefined} />
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => go(1)} aria-label="Next wall">
            →
          </button>
        </div>
      </div>

      <div className="mg-head">
        <span className="eyebrow">Every photo</span>
        <h2>{meetings.length} moments with founders.</h2>
      </div>
      <ul className="mg-grid" role="list">
        {meetings.map((m, i) => (
          <li key={m.src} className="mg-item">
            <button type="button" onClick={() => open(i)} aria-label={`Enlarge photo ${i + 1}: ${m.alt}`}>
              <Image src={m.src} alt={m.alt} width={m.w} height={m.h} sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dlg} className="mg-lb" onClose={() => setLb(null)} onClick={(e) => e.target === dlg.current && close()} aria-label="Photo viewer">
        {lb !== null && (
          <figure>
            <div className="mg-lb-img">
              <Image src={meetings[lb].src} alt={meetings[lb].alt} fill sizes="100vw" style={{ objectFit: 'contain' }} priority />
            </div>
            <figcaption>
              {lb + 1} / {meetings.length} · {meetings[lb].alt}
            </figcaption>
          </figure>
        )}
        <button type="button" className="mg-lb-x" onClick={close} aria-label="Close viewer">
          ✕
        </button>
        <button type="button" className="mg-lb-p" onClick={() => step(-1)} aria-label="Previous photo">
          ←
        </button>
        <button type="button" className="mg-lb-n" onClick={() => step(1)} aria-label="Next photo">
          →
        </button>
      </dialog>
    </>
  );
}
