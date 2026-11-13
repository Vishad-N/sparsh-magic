/**
 * Business-analyst motif library: the tools a team-productivity analyst
 * works with, drawn in the MAP49 house style (rounded cells, dashed
 * hairlines, purple fills, a single lime "spark").
 *
 * Colours come from CSS classes so one SVG works on cream and ink:
 *   .s  hairline stroke      .d  dashed stroke     .f  purple fill
 *   .f2 soft purple fill     .l  lime spark        .t  mono label
 */

export type MotifName =
  | 'flow'
  | 'bars'
  | 'funnel'
  | 'gantt'
  | 'org'
  | 'gauge'
  | 'kanban'
  | 'scorecard'
  | 'donut'
  | 'scatter'
  | 'quadrant'
  | 'fragment';

const svg = (w: number, h: number) => ({
  viewBox: `0 0 ${w} ${h}`,
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: false as const,
  'aria-hidden': true as const,
});

/** Process flowchart: start → task → decision → yes / no branches. */
function Flow() {
  return (
    <svg {...svg(252, 140)}>
      <rect className="f2 s" x="3" y="58" width="46" height="24" rx="12" />
      <path className="s" d="M49 70h25m-5-4 5 4-5 4" />
      <rect className="s" x="78" y="51" width="52" height="38" rx="7" />
      <rect className="f2" x="86" y="61" width="30" height="5" rx="2.5" />
      <rect className="f2" x="86" y="72" width="20" height="5" rx="2.5" />
      <path className="s" d="M130 70h20m-5-4 5 4-5 4" />
      <path className="f" d="M172 51l19 19-19 19-19-19z" />
      <path className="d" d="M172 51V22h24M172 89v29h24" />
      <rect className="s" x="200" y="8" width="48" height="28" rx="6" />
      <rect className="l" x="200" y="104" width="48" height="28" rx="6" />
      <text className="t" x="178" y="44">Y</text>
      <text className="t" x="178" y="104">N</text>
    </svg>
  );
}

/** Rising bar chart with a dashed trend line. */
function Bars() {
  const hs = [26, 38, 34, 52, 64, 84];
  return (
    <svg {...svg(220, 140)}>
      <path className="s" d="M14 8v118h200" />
      {hs.map((h, i) => (
        <rect key={i} className={i === hs.length - 1 ? 'l' : i % 2 ? 'f' : 'f2'} x={28 + i * 30} y={124 - h} width="18" height={h} rx="4" />
      ))}
      <path className="d" d="M37 92 67 80 97 86 127 66 157 54 187 30" />
      {[[37, 92], [67, 80], [97, 86], [127, 66], [157, 54], [187, 30]].map(([x, y], i) => (
        <circle key={i} className="s dot" cx={x} cy={y} r="3" />
      ))}
    </svg>
  );
}

/** Conversion funnel with stage percentages. */
function Funnel() {
  const rows = [
    [10, 170, '100'],
    [26, 154, '62'],
    [42, 138, '38'],
    [58, 122, '21'],
  ] as const;
  return (
    <svg {...svg(214, 150)}>
      {rows.map(([l, r, t], i) => (
        <g key={t}>
          <path className={i === 3 ? 'l' : i % 2 ? 'f' : 'f2 s'} d={`M${l} ${8 + i * 35}H${r}L${r - 14} ${36 + i * 35}H${l + 14}Z`} />
          <path className="d" d={`M${r + 4} ${22 + i * 35}H${186}`} />
          <text className="t" x="190" y={26 + i * 35}>
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Project timeline: tasks over weeks, a milestone and a "today" line. */
function Gantt() {
  const rows = [
    [40, 70],
    [86, 64],
    [118, 80],
    [150, 56],
    [176, 62],
  ];
  return (
    <svg {...svg(262, 132)}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <text key={i} className="t" x={46 + i * 36} y="10">
          W{i + 1}
        </text>
      ))}
      {rows.map(([x, w], i) => (
        <g key={i}>
          <rect className="f2" x="2" y={22 + i * 22} width="26" height="6" rx="3" />
          <rect className={i === 2 ? 'f' : 's'} x={x} y={18 + i * 22} width={w} height="14" rx="5" />
        </g>
      ))}
      <path className="l" d="M240 112l8 8-8 8-8-8z" />
      <path className="d" d="M150 14v114" />
    </svg>
  );
}

/** Ownership tree: one owner, three leads, their team. */
function Org() {
  const mid = [36, 120, 204];
  return (
    <svg {...svg(240, 150)}>
      <rect className="l" x="96" y="4" width="48" height="26" rx="7" />
      <path className="s" d="M120 30v16M36 46h168M36 46v12M120 46v12M204 46v12" />
      {mid.map((x) => (
        <g key={x}>
          <rect className="f" x={x - 22} y="58" width="44" height="24" rx="6" />
          <path className="d" d={`M${x} 82v14M${x - 14} 96h28M${x - 14} 96v10M${x + 14} 96v10`} />
          <rect className="s" x={x - 24} y="106" width="20" height="18" rx="5" />
          <rect className="s" x={x + 4} y="106" width="20" height="18" rx="5" />
        </g>
      ))}
    </svg>
  );
}

/** KPI dial with value arc, ticks and needle. */
function Gauge() {
  return (
    <svg {...svg(180, 112)}>
      <path className="d" d="M14 98a76 76 0 0 1 152 0" />
      <path className="fstroke" d="M22 98a68 68 0 0 1 120-44" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI - (i * Math.PI) / 8;
        const x1 = 90 + Math.cos(a) * 84;
        const y1 = 98 - Math.sin(a) * 84;
        const x2 = 90 + Math.cos(a) * 92;
        const y2 = 98 - Math.sin(a) * 92;
        return <path key={i} className="s" d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
      })}
      <path className="s needle" d="M90 98 138 52" />
      <circle className="l" cx="90" cy="98" r="7" />
      <text className="t" x="78" y="80">72</text>
    </svg>
  );
}

/** Task board: to do / doing / done. */
function Kanban() {
  const cols = [
    ['s', 's', 'f2'],
    ['f', 's'],
    ['f2', 'f', 'l'],
  ];
  return (
    <svg {...svg(236, 150)}>
      {cols.map((cards, c) => (
        <g key={c}>
          <rect className="f2" x={4 + c * 78} y="4" width="70" height="8" rx="4" />
          {cards.map((k, i) => (
            <g key={i}>
              <rect className={k} x={4 + c * 78} y={22 + i * 42} width="70" height="34" rx="7" />
              <rect className="f2" x={12 + c * 78} y={32 + i * 42} width={30 + ((i + c) % 3) * 8} height="4" rx="2" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Role scorecard: rows of owners with status cells and progress bars. */
function Scorecard() {
  const status = [
    ['f', 'f', 'f'],
    ['f', 'f', 'o'],
    ['f', 'o', 'o'],
    ['f', 'f', 'l'],
    ['o', 'o', 'o'],
  ];
  const bars = [62, 48, 30, 70, 16];
  return (
    <svg {...svg(230, 140)}>
      <rect className="f2" x="2" y="2" width="226" height="18" rx="6" />
      {status.map((row, r) => (
        <g key={r}>
          <path className="d" d={`M2 ${44 + r * 24}H228`} />
          <rect className="s" x="6" y={28 + r * 24} width="42" height="8" rx="4" />
          {row.map((k, c) =>
            k === 'o' ? (
              <circle key={c} className="s" cx={74 + c * 22} cy={32 + r * 24} r="6" />
            ) : (
              <circle key={c} className={k} cx={74 + c * 22} cy={32 + r * 24} r="6" />
            ),
          )}
          <rect className="f2" x="148" y={28 + r * 24} width="74" height="8" rx="4" />
          <rect className="f" x="148" y={28 + r * 24} width={bars[r]} height="8" rx="4" />
        </g>
      ))}
    </svg>
  );
}

/** Donut chart split into four segments. */
function Donut() {
  const c = 2 * Math.PI * 46;
  const segs = [
    [0.4, 'fstroke'],
    [0.25, 'f2stroke'],
    [0.2, 'dstroke'],
    [0.15, 'lstroke'],
  ] as const;
  let acc = 0;
  return (
    <svg {...svg(130, 130)}>
      <g transform="rotate(-90 65 65)">
        {segs.map(([p, k], i) => {
          const el = (
            <circle key={i} className={k} cx="65" cy="65" r="46" strokeDasharray={`${(p * c - 3).toFixed(1)} ${c.toFixed(1)}`} strokeDashoffset={(-acc * c).toFixed(1)} />
          );
          acc += p;
          return el;
        })}
      </g>
      <circle className="d" cx="65" cy="65" r="26" />
      <text className="t" x="52" y="69">40%</text>
    </svg>
  );
}

/** Scatter plot with a regression line: effort vs output. */
function Scatter() {
  const pts = [
    [30, 110], [42, 96], [52, 104], [64, 84], [74, 90], [86, 70], [98, 76],
    [110, 60], [122, 64], [136, 46], [150, 52], [166, 30],
  ];
  return (
    <svg {...svg(200, 140)}>
      <path className="s" d="M14 6v122h182" />
      <path className="d" d="M22 118 184 22" />
      {pts.map(([x, y], i) => (
        <circle key={i} className={i === pts.length - 1 ? 'l' : i % 3 ? 'f' : 'f2 s'} cx={x} cy={y} r={i % 4 === 0 ? 5 : 4} />
      ))}
    </svg>
  );
}

/** Impact / effort prioritisation matrix. */
function Quadrant() {
  return (
    <svg {...svg(170, 170)}>
      <rect className="s" x="4" y="4" width="162" height="162" rx="14" />
      <path className="d" d="M85 4v162M4 85h162" />
      <rect className="f2" x="10" y="10" width="69" height="69" rx="10" />
      <circle className="l" cx="40" cy="38" r="8" />
      <circle className="f" cx="60" cy="58" r="5" />
      <circle className="f" cx="118" cy="36" r="6" />
      <circle className="s" cx="132" cy="122" r="5" />
      <circle className="f" cx="46" cy="124" r="4" />
      <circle className="s" cx="110" cy="140" r="4" />
      <text className="t" x="12" y="98">IMPACT</text>
      <text className="t" x="122" y="160">EFFORT</text>
    </svg>
  );
}

/** A stepped MAP49 matrix fragment. */
function Fragment() {
  const cells: [number, number, string][] = [
    [0, 2, 'f'], [1, 2, 'f'], [2, 2, 'f'], [1, 1, 'f'], [2, 1, 'f'], [2, 0, 'l'], [0, 1, 's'], [0, 0, 's'], [1, 0, 's'],
  ];
  return (
    <svg {...svg(64, 64)}>
      {cells.map(([c, r, k], i) => (
        <rect key={i} className={k} x={2 + c * 21} y={2 + r * 21} width="18" height="18" rx="5" />
      ))}
    </svg>
  );
}

const MAP: Record<MotifName, () => JSX.Element> = {
  flow: Flow,
  bars: Bars,
  funnel: Funnel,
  gantt: Gantt,
  org: Org,
  gauge: Gauge,
  kanban: Kanban,
  scorecard: Scorecard,
  donut: Donut,
  scatter: Scatter,
  quadrant: Quadrant,
  fragment: Fragment,
};

export default function Motif({ name }: { name: MotifName }) {
  const C = MAP[name];
  return <C />;
}
