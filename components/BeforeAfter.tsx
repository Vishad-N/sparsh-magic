/**
 * Before / After comparison drawn as control-panel bars.
 * Bars grow when the block scrolls into view (`.rv.in`).
 */
export type BARow = {
  label: string;
  before: { value: string; w: number };
  after: { value: string; w: number };
  /** true when a shorter bar is the better outcome */
  lowerIsBetter?: boolean;
};

export default function BeforeAfter({ rows, footnote }: { rows: BARow[]; footnote?: string }) {
  return (
    <div className="ba rv">
      <div className="ba-col dark">
        <div className="p-head">
          <div className="p-title">
            Before<b>Founder-run business</b>
          </div>
          <span className="state">CHAOS</span>
        </div>
        <ul className="ba-rows">
          {rows.map((r) => (
            <li key={r.label} className="read">
              <div className="read-top">
                {r.label}
                <b>{r.before.value}</b>
              </div>
              <div className={`bar${r.lowerIsBetter ? '' : ' muted-bar'}`}>
                <i style={{ ['--w' as string]: `${r.before.w}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="ba-col dark ordered">
        <div className="p-head">
          <div className="p-title">
            After MAP49™<b>System-run business</b>
          </div>
          <span className="state">ORDER</span>
        </div>
        <ul className="ba-rows">
          {rows.map((r) => (
            <li key={r.label} className="read">
              <div className="read-top">
                {r.label}
                <b>{r.after.value}</b>
              </div>
              <div className="bar good">
                <i style={{ ['--w' as string]: `${r.after.w}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {footnote && <p className="note ba-note">{footnote}</p>}
    </div>
  );
}
