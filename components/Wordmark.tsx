import { WORDMARK } from '@/lib/brand';

/**
 * Footer wordmark: the official SPARSH MAGIC letterforms (vector-traced from
 * the brand PNG, see lib/brand.ts) drawn as an outline.
 *
 * The SVG viewBox is the wordmark's own box, so it always fits the footer
 * width exactly, whatever fonts the browser has.
 *
 * Magic layers (all looping, CSS/SMIL, no JS):
 *  - outline:  the quiet teal stroke
 *  - shine:    a teal → mint → magenta band sweeping across the stroke
 *  - glow:     a soft blurred copy of the shine
 *  - sparkles: four-point stars twinkling over the letters
 * Motion is removed for prefers-reduced-motion (see .wm-* in CSS).
 */

const { w: W, h: H, d: D } = WORDMARK;
const PAD_Y = 26; // headroom for the sparkles

// Sparkle positions in wordmark units, with size and stagger.
const SPARKS = [
  { x: 100, y: 20, s: 17, d: 0 },
  { x: 380, y: 96, s: 11, d: 1.1 },
  { x: 590, y: 12, s: 14, d: 2.3 },
  { x: 800, y: 118, s: 10, d: 0.6 },
  { x: 930, y: 28, s: 18, d: 1.7 },
  { x: 1160, y: 100, s: 12, d: 2.9 },
  { x: 1380, y: 18, s: 14, d: 0.3 },
  { x: 245, y: 150, s: 9, d: 3.4 },
];

const star = (x: number, y: number, s: number) =>
  `M${x} ${y - s}C${x + s * 0.18} ${y - s * 0.18} ${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y}C${x + s * 0.18} ${y + s * 0.18} ${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s}C${x - s * 0.18} ${y + s * 0.18} ${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y}C${x - s * 0.18} ${y - s * 0.18} ${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z`;

export default function Wordmark() {
  return (
    <div className="wordmark" aria-hidden="true">
      <svg viewBox={`-4 ${-PAD_Y} ${W + 8} ${H + PAD_Y + 6}`} xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          {/* A narrow bright band that travels left → right on a loop */}
          <linearGradient id="wm-shine" gradientUnits="userSpaceOnUse" x1="-500" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#2E94A0" stopOpacity="0" />
            <stop offset=".4" stopColor="#2E94A0" stopOpacity=".95" />
            <stop offset=".5" stopColor="#52DDB6" />
            <stop offset=".58" stopColor="#FA0082" />
            <stop offset=".68" stopColor="#C9006D" stopOpacity=".9" />
            <stop offset="1" stopColor="#C9006D" stopOpacity="0" />
            <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to={`${W + 520} 0`} dur="5.5s" repeatCount="indefinite" />
          </linearGradient>
          <filter id="wm-glow" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <path className="wm-outline" d={D} />
        <g className="wm-glow" filter="url(#wm-glow)">
          <path className="wm-shine" d={D} />
        </g>
        <path className="wm-shine" d={D} />

        <g className="wm-sparks">
          {SPARKS.map((p, i) => (
            <path key={i} d={star(p.x, p.y, p.s)} style={{ animationDelay: `${p.d}s` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
