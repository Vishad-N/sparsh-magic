import Link from 'next/link';

/**
 * Official Sparsh Magic identity: overlapping gradient circles + the serif
 * wordmark. Assets live in /public/brand (vector, recreated from the brand PNG).
 * `tone` picks the artwork for the surface it sits on: "light" for the
 * #EAEDF0 / white theme, "dark" for the carved dark sections.
 */
type Tone = 'light' | 'dark';

const suffix = (tone: Tone) => (tone === 'dark' ? '-on-dark' : '');

export function LogoMark({ tone = 'light', className = '' }: { tone?: Tone; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`logo-mark ${className}`.trim()}
      src={`/brand/sparsh-mark${suffix(tone)}.svg`}
      width={47}
      height={42}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}

/** Horizontal lock-up (mark + wordmark) for the nav. */
export default function Logo({ tone = 'light' }: { tone?: Tone }) {
  return (
    <Link className="logo" href="/" aria-label="Sparsh Magic home">
      <LogoMark tone={tone} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="logo-word"
        src={`/brand/sparsh-wordmark${suffix(tone)}.svg`}
        width={162}
        height={20}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    </Link>
  );
}

/** Full stacked logo: mark, SPARSH MAGIC and "Growth. Yours forever." */
export function LogoStacked({ tone = 'light' }: { tone?: Tone }) {
  return (
    <Link className="logo-stacked" href="/" aria-label="Sparsh Magic. Growth. Yours forever. Home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/brand/sparsh-logo${suffix(tone)}.svg`} width={240} height={125} alt="" aria-hidden="true" decoding="async" />
    </Link>
  );
}
