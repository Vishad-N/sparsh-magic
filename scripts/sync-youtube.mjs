#!/usr/bin/env node
/**
 * Refreshes lib/videos.json from the public Sparsh Magic / Rupak Aich YouTube
 * channel (no API key needed). Run:  npm run sync:videos
 *
 * It reads the channel's /videos and /shorts tabs and keeps the two groups
 * separate: anything on the Shorts tab is a Short, everything else is a
 * full-length video. If YouTube changes its page format the script fails
 * loudly and leaves the existing snapshot untouched.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HANDLE = 'rupakaich939';
const OUT = fileURLToPath(new URL('../lib/videos.json', import.meta.url));
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; SparshMagicSync/1.0)',
  'Accept-Language': 'en',
  Cookie: 'CONSENT=YES+1; SOCS=CAI',
};

async function initialData(tab) {
  const res = await fetch(`https://www.youtube.com/@${HANDLE}/${tab}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`${tab}: HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!m) throw new Error(`${tab}: ytInitialData not found`);
  return JSON.parse(m[1]);
}

function* find(o, key) {
  if (Array.isArray(o)) for (const v of o) yield* find(v, key);
  else if (o && typeof o === 'object') {
    if (key in o) yield o[key];
    for (const v of Object.values(o)) yield* find(v, key);
  }
}

const [videosData, shortsData] = await Promise.all([initialData('videos'), initialData('shorts')]);

const shorts = [];
const shortIds = new Set();
for (const r of find(shortsData, 'shortsLockupViewModel')) {
  const id = r?.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
  const title = r?.overlayMetadata?.primaryText?.content;
  if (!id || !title || shortIds.has(id)) continue;
  shortIds.add(id);
  shorts.push({ id, title });
}

const videos = [];
const seen = new Set();
for (const l of find(videosData, 'lockupViewModel')) {
  const id = l?.contentId;
  const title = l?.metadata?.lockupMetadataViewModel?.title?.content;
  if (!id || !title || seen.has(id) || shortIds.has(id)) continue;
  seen.add(id);
  const badge = [...find(l.contentImage ?? {}, 'thumbnailBadgeViewModel')][0];
  videos.push({ id, title, duration: badge?.text ?? null });
}

if (!videos.length || !shorts.length) throw new Error(`Parsed ${videos.length} videos / ${shorts.length} shorts, refusing to overwrite`);

const out = {
  channel: { handle: `@${HANDLE}`, url: `https://www.youtube.com/@${HANDLE}` },
  syncedAt: new Date().toISOString().slice(0, 10),
  videos,
  shorts,
};
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${videos.length} videos + ${shorts.length} shorts to lib/videos.json`);
