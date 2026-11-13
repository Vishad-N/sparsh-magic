import Image from 'next/image';

/**
 * Polaroid collage of team photos, shown below the /team hero.
 * Source: https://www.sparshmagic.com/sparsh-team/ (pre-resized webp in /public/team).
 * The source page gives no names or roles, so captions are scene labels only.
 * To add or change a photo, edit `shots`. Layout slots (a-f) live in styles/pages.css.
 */
type Shot = { slot: string; src: string; w: number; h: number; alt: string; caption: string; rot: number };

const shots: Shot[] = [
  { slot: 'a', src: '/team/team-together.webp', w: 1100, h: 619, alt: 'The Sparsh Magic team standing together in the Indore office, smiling at the camera', caption: 'The whole team', rot: -3 },
  { slot: 'b', src: '/team/review-room.webp', w: 1100, h: 825, alt: 'Team members gathered around a meeting table during a review session', caption: 'Review session', rot: 2.5 },
  { slot: 'c', src: '/team/office-floor.webp', w: 768, h: 1024, alt: 'Team members standing in a group on the office floor', caption: 'On the office floor', rot: -2 },
  { slot: 'd', src: '/team/focus-room-a.webp', w: 1100, h: 496, alt: 'Team members working at laptops around a long table in the Focus room', caption: 'In the Focus room', rot: 2 },
  { slot: 'e', src: '/team/focus-room-b.webp', w: 1100, h: 495, alt: 'A working session in the Focus room with a screen on the wall', caption: 'Mid-session', rot: -2.5 },
  { slot: 'f', src: '/team/focus-room-c.webp', w: 1100, h: 495, alt: 'Team members at laptops in the Focus room during a workshop', caption: 'Heads down', rot: 3 },
];

export default function TeamShowcase() {
  return (
    <section className="tp-sec" aria-labelledby="tp-title">
      <div className="wrap">
        <div className="tp-head">
          <span className="eyebrow">In the room</span>
          <h2 id="tp-title">Where the work happens.</h2>
        </div>
        <ul className="tp-board" role="list">
          {shots.map((s, i) => (
            <li key={s.src} className={`tp-slot tp-${s.slot} rv`} style={{ ['--rd' as string]: `${i * 0.06}s` }}>
              <figure className="tp" tabIndex={0} style={{ ['--rot' as string]: `${s.rot}deg` }}>
                <div className="tp-img" style={{ aspectRatio: `${s.w} / ${s.h}` }}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 760px) 78vw, (max-width: 1240px) 40vw, 480px"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <figcaption>{s.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
