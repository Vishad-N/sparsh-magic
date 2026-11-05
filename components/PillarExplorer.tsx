'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { levels, pillars } from '@/lib/data';
import type { ExplorerItem } from '@/lib/explorer';

/**
 * Pillar list + live 7×7 matrix + detail panel. Selecting an item lights its
 * row; levels 6–7 glow lime. Hovering a cell reads out its pillar and level.
 */
export default function PillarExplorer({
  items,
  auto = false,
  intro,
  id = 'px',
  stickyView = false,
}: {
  items: ExplorerItem[];
  auto?: boolean;
  intro?: ReactNode;
  id?: string;
  stickyView?: boolean;
}) {
  const [cur, setCur] = useState(0);
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const select = useCallback(
    (i: number, user = false) => {
      if (user) stop();
      setCur(i);
      setAnimKey((k) => k + 1);
    },
    [stop],
  );

  useEffect(() => {
    if (!auto || !root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer.current) {
          timer.current = setInterval(() => {
            setCur((c) => (c + 1) % items.length);
            setAnimKey((k) => k + 1);
          }, 3800);
        } else if (!e.isIntersecting) stop();
      },
      { threshold: 0.35 },
    );
    io.observe(root.current);
    return () => {
      io.disconnect();
      stop();
    };
  }, [auto, items.length, stop]);

  const item = items[cur];
  const rowsWithItems = new Set(items.map((x) => x.row));

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    const n =
      e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
    select(n, true);
    tabs.current[n]?.focus();
  };

  return (
    <div className="px" ref={root} onPointerEnter={stop}>
      <div>
        {intro}
        <div className="pillars" role="tablist" aria-orientation="vertical" aria-label="MAP49 pillars">
          {items.map((it, i) => (
            <button
              key={it.label + i}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              className="pillar"
              role="tab"
              aria-selected={i === cur}
              aria-controls={`${id}-panel`}
              tabIndex={i === cur ? 0 : -1}
              onClick={() => select(i, true)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="k">P{it.row + 1}</span>
              <span>
                <b>{it.label}</b>
                {it.sub && <small>{it.sub}</small>}
              </span>
              <span className="chev" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`px-view${stickyView ? ' sticky' : ''}`}>
        <div className="fm-wrap">
          <div className="fm" aria-hidden="true" onPointerLeave={() => setHover(null)}>
            <span className="lab" />
            {levels.map((_, c) => (
              <span key={c} className="lab">
                L{c + 1}
              </span>
            ))}
            {pillars.map((p, r) => {
              const on = r === item.row;
              return [
                <span key={`l${r}`} className={`lab${on ? ' r-on' : rowsWithItems.has(r) ? ' has' : ''}`}>
                  P{r + 1}
                </span>,
                ...levels.map((_, c) => (
                  <span
                    key={`${r}-${c}`}
                    className={`c${on ? ' r-on' : ''}${on && c >= 5 ? ' lvl' : ''}${!rowsWithItems.has(r) ? ' dim' : ''}`}
                    onPointerEnter={() => setHover({ r, c })}
                  />
                )),
              ];
            })}
          </div>
          <div className="fm-read" aria-hidden="true">
            {hover ? (
              <span>
                <b>
                  P{hover.r + 1} {pillars[hover.r].name}
                </b>{' '}
                · L{hover.c + 1} {levels[hover.c].name}
              </span>
            ) : (
              <span>Hover a cell to read its checkpoint</span>
            )}
            <span>49 checkpoints</span>
          </div>
        </div>

        <div
          key={animKey}
          className="px-detail swap"
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${cur}`}
          aria-live="polite"
        >
          {item.tag && <span className="tag">{item.tag}</span>}
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.change && (
            <div className="change">
              <b>WHAT CHANGES FOR THE FOUNDER</b>
              {item.change}
            </div>
          )}
          {item.chips && (
            <ul className="chips">
              {item.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
