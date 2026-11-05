/**
 * Section dividers drawn from the MAP49™ matrix language.
 * Minimal, low-contrast and decorative only (aria-hidden).
 *
 *  grid  – a seven-cell grid fragment with a travelling lime glow
 *  cells – a staggered cell cluster stepping into a dashed rule
 *  trail – a diagonal trail of cells ending in a lit cell
 *  scan  – a dashed hairline with a short purple→lime scan light
 */

type Variant = 'grid' | 'cells' | 'trail' | 'scan';

// Fixed pattern (rows of 6) so server and client render identically.
const CLUSTER = [
  '', 'on', '', '', 'on', '',
  'on', '', 'on', 'hot', '', 'on',
  '', 'on', 'on', '', 'on', '',
];

export default function Divider({
  variant = 'grid',
  tone = 'light',
  align = 'center',
  className = '',
}: {
  variant?: Variant;
  tone?: 'light' | 'dark';
  align?: 'center' | 'left' | 'right';
  className?: string;
}) {
  const cls = `dv dv-${variant} ${tone === 'dark' ? 'dv-dark dark' : ''} ${className}`;
  const left = align !== 'left';
  const right = align !== 'right';

  return (
    <div className={cls} aria-hidden="true" role="presentation">
      <div className="wrap">
        {variant === 'grid' && (
          <>
            {left && <span className="dv-line l" />}
            <span className="cells">
              {Array.from({ length: 7 }, (_, i) => (
                <i key={i} />
              ))}
            </span>
            {right && <span className="dv-line r" />}
          </>
        )}
        {variant === 'cells' && (
          <>
            {left && <span className="dv-line l" />}
            <span className="cluster">
              {CLUSTER.map((c, i) => (
                <i key={i} className={c} />
              ))}
            </span>
            {right && <span className="dv-line r" />}
          </>
        )}
        {variant === 'trail' && (
          <>
            {left && <span className="dv-line l" />}
            <span className="trail">
              {Array.from({ length: 11 }, (_, k) => (
                <i key={k} style={{ ['--k' as string]: k }} />
              ))}
            </span>
            {right && <span className="dv-line r" />}
          </>
        )}
        {variant === 'scan' && (
          <>
            <span className="tick" />
            <span className="beam" />
            <span className="tick" />
          </>
        )}
      </div>
    </div>
  );
}
