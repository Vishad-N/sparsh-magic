import { pillars, type Industry } from './data';

export type ExplorerItem = {
  /** Matrix row (pillar index 0–6). */
  row: number;
  label: string;
  sub?: string;
  tag?: string;
  title: string;
  body: string;
  chips?: string[];
  change?: string;
};

/** Explorer items for all seven MAP49™ pillars. */
export const pillarItems = (withChange = false): ExplorerItem[] =>
  pillars.map((p, i) => ({
    row: i,
    label: p.name,
    sub: withChange ? p.promise : undefined,
    tag: `PILLAR ${i + 1} OF 7 · 7 LEVELS`,
    title: `${p.name}: ${p.promise}`,
    body: p.summary,
    chips: p.tools,
    change: withChange ? p.founderChange : undefined,
  }));

/** Explorer items showing how MAP49™ applies to one industry. */
export const industryItems = (ind: Industry): ExplorerItem[] =>
  ind.mapping.map((m) => {
    const row = pillars.findIndex((p) => p.key === m.pillar);
    return {
      row,
      label: m.title,
      sub: pillars[row].name,
      tag: `P${row + 1} · ${pillars[row].name.toUpperCase()} IN ${ind.title.toUpperCase()}`,
      title: m.title,
      body: m.body,
      chips: m.chips,
    };
  });
