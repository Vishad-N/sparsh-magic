/**
 * Footer wordmark "Sparsh.Magic" as SVG.
 *
 * textLength locks the word to the viewBox width, so it always fits the
 * footer exactly, whatever font the browser falls back to.
 *
 * Magic layers (all looping, CSS/SMIL, no JS):
 *  - outline:  the quiet purple stroke
 *  - shine:    a purple → lime → white band sweeping across the stroke
 *  - glow:     a soft blurred copy of the shine
 *  - sparkles: four-point stars twinkling over the letters
 *  - the dot:  pulses gently
 * Motion is removed for prefers-reduced-motion (see .wm-* in CSS).
 */

const W = 1000;
const H = 204;
const BASE = 160;

// Sparkle positions in viewBox units, with size and stagger.
const SPARKS = [
  { x: 70, y: 40, s: 14, d: 0 },
  { x: 268, y: 98, s: 9, d: 1.1 },
  { x: 415, y: 30, s: 12, d: 2.3 },
  { x: 560, y: 120, s: 8, d: 0.6 },
  { x: 655, y: 46, s: 15, d: 1.7 },
  { x: 812, y: 104, s: 10, d: 2.9 },
  { x: 955, y: 36, s: 12, d: 0.3 },
  { x: 172, y: 150, s: 7, d: 3.4 },
];

const star = (x: number, y: number, s: number) =>
  `M${x} ${y - s}C${x + s * 0.18} ${y - s * 0.18} ${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y}C${x + s * 0.18} ${y + s * 0.18} ${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s}C${x - s * 0.18} ${y + s * 0.18} ${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y}C${x - s * 0.18} ${y - s * 0.18} ${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z`;

function Word({ className }: { className: string }) {
  return (
    <text className={className} x="2" y={BASE} textLength={W - 4} lengthAdjust="spacingAndGlyphs">
      Sparsh<tspan className="wm-dot-t">.</tspan>Magic
    </text>
  );
}

export default function Wordmark() {
  return (
    <div className="wordmark" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          {/* A narrow bright band that travels left → right on a loop */}
          <linearGradient id="wm-shine" gradientUnits="userSpaceOnUse" x1="-400" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#987ED6" stopOpacity="0" />
            <stop offset=".42" stopColor="#987ED6" stopOpacity=".9" />
            <stop offset=".5" stopColor="#E4FF3B" />
            <stop offset=".56" stopColor="#FFFFFF" />
            <stop offset=".64" stopColor="#987ED6" stopOpacity=".9" />
            <stop offset="1" stopColor="#987ED6" stopOpacity="0" />
            <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="1400 0" dur="5.5s" repeatCount="indefinite" />
          </linearGradient>
          <filter id="wm-glow" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <Word className="wm-outline" />
        <g className="wm-glow" filter="url(#wm-glow)">
          <Word className="wm-shine" />
        </g>
        <Word className="wm-shine" />

        <g className="wm-sparks">
          {SPARKS.map((p, i) => (
            <path key={i} d={star(p.x, p.y, p.s)} style={{ animationDelay: `${p.d}s` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
