'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Icon from './Icon';
import { channel, embedUrl, featuredVideo, shorts, thumb, videos, watchUrl, type Short, type Video } from '@/lib/videos';

/**
 * Video gallery. Nothing from YouTube loads until a visitor presses play:
 * every card is a thumbnail "facade" and the privacy-enhanced embed
 * (youtube-nocookie.com) replaces it on click. That keeps the page light
 * (no iframes, no player JS) even with 70 videos on it.
 */

type Filter = 'all' | 'videos' | 'shorts';

const VIDEO_STEP = 9;
const SHORT_STEP = 10;

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" fill="currentColor" />
    </svg>
  );
}

/** Embedded player; focuses itself so keyboard users land on the video. */
function Embed({ id, title }: { id: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <iframe
      ref={ref}
      className="vg-frame"
      src={embedUrl(id)}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

function Facade({ id, title, onPlay, eager }: { id: string; title: string; onPlay: () => void; eager?: boolean }) {
  return (
    <button type="button" className="vg-facade" onClick={onPlay} aria-label={`Play video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb(id)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <span className="vg-play" aria-hidden="true">
        <PlayGlyph />
      </span>
    </button>
  );
}

export default function VideoGallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [featured, setFeatured] = useState<Video>(featuredVideo);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [playingShort, setPlayingShort] = useState<string | null>(null);
  const [videoCount, setVideoCount] = useState(VIDEO_STEP);
  const [shortCount, setShortCount] = useState(SHORT_STEP);
  const stageRef = useRef<HTMLDivElement>(null);

  const gridVideos = videos.filter((v) => v.id !== featured.id);
  const showVideos = filter !== 'shorts';
  const showShorts = filter !== 'videos';

  const playFromGrid = (v: Video) => {
    setFeatured(v);
    setFeaturedPlaying(true);
    setPlayingShort(null);
    stageRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  const playShort = (s: Short) => {
    setPlayingShort(s.id);
    setFeaturedPlaying(false);
  };

  const filters: { key: Filter; label: string; n: number }[] = [
    { key: 'all', label: 'All', n: videos.length + shorts.length },
    { key: 'videos', label: 'Full videos', n: videos.length },
    { key: 'shorts', label: 'Shorts', n: shorts.length },
  ];

  return (
    <>
      <div className="vg-bar" role="group" aria-label="Filter videos">
        <div className="vg-filters">
          {filters.map((f) => (
            <button key={f.key} type="button" className="fchip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label} <span className="vg-n">{f.n}</span>
            </button>
          ))}
        </div>
        <a className="text-link" href={channel.url} target="_blank" rel="noopener noreferrer">
          Subscribe on YouTube <span aria-hidden="true">→</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {showVideos && (
        <section id="full-videos" className="vg-sec" aria-labelledby="vg-videos-h">
          <header className="vg-head">
            <h2 id="vg-videos-h" className="h3">
              Full-length videos
            </h2>
            <p>Talks, frameworks and founder conversations.</p>
          </header>

          <div className="vg-stage dark" ref={stageRef}>
            <div className="vg-player">
              {featuredPlaying ? (
                <Embed id={featured.id} title={featured.title} />
              ) : (
                <Facade id={featured.id} title={featured.title} onPlay={() => setFeaturedPlaying(true)} eager />
              )}
            </div>
            <div className="vg-meta">
              <span className="eyebrow">{featured.id === featuredVideo.id ? 'Featured' : 'Now playing'}</span>
              <h3>{featured.title}</h3>
              <div className="vg-meta-row">
                {featured.duration && <span className="vg-chip">{featured.duration}</span>}
                <a className="text-link" href={watchUrl(featured.id)} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube <span aria-hidden="true">→</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>

          <ul className="vg-grid">
            {gridVideos.slice(0, videoCount).map((v) => (
              <li key={v.id}>
                <button type="button" className="vg-card" onClick={() => playFromGrid(v)} aria-label={`Play video: ${v.title}${v.duration ? `, ${v.duration}` : ''}`}>
                  <span className="vg-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(v.id)} alt="" loading="lazy" decoding="async" />
                    <span className="vg-play sm" aria-hidden="true">
                      <PlayGlyph />
                    </span>
                    {v.duration && <i className="vg-dur">{v.duration}</i>}
                  </span>
                  <span className="vg-t">{v.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {videoCount < gridVideos.length && (
            <div className="vg-more">
              <Button variant="ghost" onClick={() => setVideoCount((c) => c + VIDEO_STEP)}>
                Show more videos
              </Button>
            </div>
          )}
        </section>
      )}

      {showShorts && (
        <section id="shorts" className="vg-sec" aria-labelledby="vg-shorts-h">
          <header className="vg-head">
            <h2 id="vg-shorts-h" className="h3">
              YouTube Shorts
            </h2>
            <p>Quick, one-idea clips. Swipe through on mobile.</p>
          </header>

          <ul className="sh-track" aria-label="YouTube Shorts">
            {shorts.slice(0, shortCount).map((s) => (
              <li key={s.id} className="sh-card">
                {playingShort === s.id ? (
                  <Embed id={s.id} title={s.title} />
                ) : (
                  <button type="button" className="sh-btn" onClick={() => playShort(s)} aria-label={`Play short: ${s.title}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(s.id)} alt="" loading="lazy" decoding="async" />
                    <span className="vg-play sm" aria-hidden="true">
                      <PlayGlyph />
                    </span>
                    <span className="sh-t">{s.title}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          {shortCount < shorts.length && (
            <div className="vg-more">
              <Button variant="ghost" onClick={() => setShortCount((c) => c + SHORT_STEP)}>
                Show more Shorts
              </Button>
            </div>
          )}
        </section>
      )}

      <p className="note center">
        <Icon name="youtube" size={14} className="vg-yt" /> Videos play from YouTube with privacy-enhanced mode on. Nothing loads until you press play.
      </p>
    </>
  );
}
