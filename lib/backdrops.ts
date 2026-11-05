import type { BackdropItem } from '@/components/Backdrop';

/**
 * Where the business-analyst motifs go, page by page.
 *
 * Decided from a negative-space audit at 1280px: for every section the free
 * width beside real content was measured in three bands (top / middle /
 * bottom). Motifs only go where a band had roughly 250px+ free, and are
 * sized to fit inside that gap. Sections with only the normal page margin
 * (~70px) get nothing. Most items hide below 1240px, where there is no room;
 * `mob` items are small corner pieces that stay on phones.
 *
 * Audit figures are noted as "free R/L" (px) next to each entry.
 */

const corner: BackdropItem = { m: 'fragment', w: 46, r: '14px', t: '14px', rot: 14, d: 0.4, mob: true };

export const bd = {
  home: {
    // problem: free R 439 (top band)
    problem: [{ m: 'flow', w: 250, r: '4%', t: '96px', rot: -6, d: 0.6 }],
    // framework: free R 230 (top)
    framework: [{ m: 'gauge', w: 150, r: '4%', t: '70px', rot: 8, d: 0.5 }],
    // results (dark): free R 489 (top)
    results: [{ m: 'bars', w: 240, r: '6%', t: '110px', rot: -5, d: 0.6 }],
    // how it works: free R 596 (top)
    how: [
      { m: 'gantt', w: 280, r: '6%', t: '96px', rot: 4, d: 0.6 },
      { m: 'fragment', w: 54, r: '30%', t: '70px', rot: -18, d: 0.3 },
    ],
  },
  framework: {
    // pillars in depth: free R 465 (bottom band, last row has two cards)
    deep: [
      { m: 'org', w: 240, r: '12%', b: '120px', rot: -5, d: 0.6 },
    ],
    // in practice: free R 500 (top), 650 (middle)
    practice: [
      { m: 'gantt', w: 270, r: '5%', t: '90px', rot: -4, d: 0.6 },
      { m: 'scatter', w: 210, r: '7%', t: '50%', rot: 7, d: 0.45 },
    ],
    // FAQ (narrow column): free L 273 / R 291
    faq: [
      { m: 'flow', w: 210, l: '2.5%', t: '28%', rot: -7, d: 0.5 },
      { m: 'kanban', w: 210, r: '2.5%', t: '18%', rot: 6, d: 0.6 },
    ],
  },
  aura: {
    // hero: free R 482 (top/mid), 731 (bottom)
    hero: [
      { m: 'scorecard', w: 260, r: '6%', t: '30%', rot: -5, d: 0.6 },
      { m: 'gauge', w: 140, r: '32%', b: '36px', rot: 10, d: 0.4 },
      corner,
    ],
  },
  industries: {
    // hero: free R 470 (top/mid), 661 (bottom)
    hero: [
      { m: 'quadrant', w: 190, r: '8%', t: '22%', rot: 8, d: 0.6 },
      { m: 'funnel', w: 170, r: '28%', b: '34px', rot: -6, d: 0.4 },
      corner,
    ],
    // steps: free R 281 (top)
    steps: [{ m: 'flow', w: 180, r: '2%', t: '40px', rot: 5, d: 0.5 }],
  },
  industry: {
    // pains: free L 556 (bottom band, under the sticky heading)
    pains: [{ m: 'funnel', w: 200, l: '6%', b: '70px', rot: -6, d: 0.55 }],
    // mapping: free L 605 (bottom band, under the pillar list)
    mapping: [{ m: 'org', w: 230, l: '5%', b: '70px', rot: 5, d: 0.55 }],
  },
  results: {
    // dark hero: free R 321 (top)
    hero: [{ m: 'bars', w: 220, r: '5%', t: '120px', rot: -6, d: 0.6 }],
  },
  about: {
    // hero: free R 213 (top), 637 (bottom)
    hero: [
      { m: 'donut', w: 130, r: '10%', b: '40px', rot: -8, d: 0.55 },
      { m: 'fragment', w: 60, r: '4%', t: '90px', rot: 16, d: 0.35 },
      corner,
    ],
    // truth (dark): free R 514 (top)
    truth: [{ m: 'quadrant', w: 200, r: '6%', t: '70px', rot: 8, d: 0.6 }],
    // facts: free R 883 (bottom band, beside the buttons; only ~110px tall)
    facts: [{ m: 'gauge', w: 130, r: '8%', b: '30px', rot: -6, d: 0.5 }],
  },
  team: {
    // hero: free R 547 (top/mid)
    hero: [{ m: 'org', w: 290, r: '6%', t: '26%', rot: -4, d: 0.6 }, corner],
    // join: free R 935 (bottom band)
    join: [{ m: 'flow', w: 240, r: '8%', b: '50px', rot: 5, d: 0.5 }],
  },
  culture: {
    // hero: free R 391
    hero: [
      { m: 'donut', w: 150, r: '8%', t: '30%', rot: 8, d: 0.6 },
      { m: 'fragment', w: 64, r: '27%', b: '40px', rot: -14, d: 0.35 },
      corner,
    ],
  },
  career: {
    // hero: free R 171 (top), 740 (bottom)
    hero: [
      { m: 'gauge', w: 130, r: '10%', b: '16px', rot: -6, d: 0.55 },
      { m: 'fragment', w: 56, r: '4%', t: '90px', rot: 14, d: 0.35 },
      corner,
    ],
    // manifesto: free R 500 / 484
    manifesto: [{ m: 'bars', w: 220, r: '5%', t: '24%', rot: 6, d: 0.55 }],
    // career grid: free R 569 (bottom band, below the sticky aside)
    grid: [{ m: 'scorecard', w: 230, r: '7%', b: '60px', rot: -4, d: 0.5 }],
    // apply (narrow): free L 273 / R 291
    apply: [
      { m: 'flow', w: 210, l: '2.5%', t: '30%', rot: -6, d: 0.5 },
      { m: 'quadrant', w: 160, r: '3.5%', t: '42%', rot: 7, d: 0.55 },
    ],
  },
  blog: {
    // hero: free R 548
    hero: [
      { m: 'bars', w: 220, r: '7%', t: '24%', rot: -5, d: 0.6 },
      { m: 'donut', w: 110, r: '29%', b: '30px', rot: 10, d: 0.4 },
      corner,
    ],
    // post (narrow column): free L 273 / R 302
    post: [
      { m: 'scatter', w: 200, l: '2.5%', t: '18%', rot: -6, d: 0.5 },
      { m: 'gantt', w: 230, r: '2%', t: '46%', rot: 5, d: 0.6 },
      { m: 'fragment', w: 66, l: '7%', t: '76%', rot: 12, d: 0.35 },
    ],
  },
  contact: {
    // hero: free R 310 (top), 714 (bottom)
    hero: [
      { m: 'flow', w: 230, r: '5%', b: '24px', rot: -5, d: 0.55 },
      { m: 'fragment', w: 60, r: '9%', t: '28%', rot: 14, d: 0.35 },
      corner,
    ],
  },
  legal: {
    // hero: free R 648
    hero: [{ m: 'scorecard', w: 240, r: '7%', t: '24%', rot: -4, d: 0.55 }],
    // body (narrow): free L 273 / R 309
    body: [
      { m: 'org', w: 200, l: '2.5%', t: '12%', rot: -5, d: 0.5 },
      { m: 'donut', w: 130, r: '5%', t: '48%', rot: 8, d: 0.5 },
    ],
  },
} satisfies Record<string, Record<string, BackdropItem[]>>;
