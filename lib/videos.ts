import data from './videos.json';

/**
 * Video gallery data. `lib/videos.json` is a snapshot of the public YouTube
 * channel, refreshed with `npm run sync:videos` (see scripts/sync-youtube.mjs).
 * Shorts and full-length videos are kept as two separate lists.
 */
export type Video = { id: string; title: string; duration: string | null };
export type Short = { id: string; title: string };

export const channel = data.channel;
export const videos: Video[] = data.videos;
export const shorts: Short[] = data.shorts;

/** hq720 exists for every public upload, including Shorts. */
export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hq720.jpg`;
export const watchUrl = (id: string, isShort = false) =>
  isShort ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
export const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/** "1:22" → 82 */
export const seconds = (d: string | null) =>
  d ? d.split(':').reduce((a, n) => a * 60 + Number(n), 0) : 0;

/** Lead video: the longest of the 12 most recent uploads (a proper talk, not a clip). */
export const featuredVideo: Video = videos
  .slice(0, 12)
  .reduce((best, v) => (seconds(v.duration) > seconds(best.duration) ? v : best), videos[0]);
