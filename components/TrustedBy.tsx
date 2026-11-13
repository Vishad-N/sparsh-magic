import { clients } from '@/lib/clients';

/**
 * "Trusted by Brands": the same client logos as sparshmagic.com.
 * A slow marquee for pointer/touch users (pauses on hover/focus), and a
 * static wrapped grid for anyone who prefers reduced motion. The duplicate
 * set that makes the loop seamless is hidden from assistive tech.
 */
export default function TrustedBy() {
  return (
    <section className="trusted" aria-labelledby="trusted-h">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow rv">Trusted by brands</span>
          <h2 id="trusted-h" className="trusted-h rv" style={{ ['--rd' as string]: '.06s' }}>
            Founders across India run on <span className="purple">MAP49.</span>
          </h2>
        </div>
      </div>

      <div className="trusted-mask rv" style={{ ['--rd' as string]: '.12s' }}>
        <div className="trusted-rail">
        <ul className="trusted-track" aria-label="Client logos">
          {clients.map((c) => (
            <li key={c.file} className="logo-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/clients/${c.file}.webp`} width={c.w} height={c.h} alt={c.name} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <ul className="trusted-track dup" aria-hidden="true">
          {clients.map((c) => (
            <li key={c.file} className="logo-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/clients/${c.file}.webp`} width={c.w} height={c.h} alt="" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
