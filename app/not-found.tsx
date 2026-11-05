import type { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

const rand = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap nf-grid">
        <div>
          <span className="eyebrow">Error 404 · Cell not found</span>
          <h1 className="h1">This cell isn’t on the matrix.</h1>
          <p className="lead">The page you’re looking for has moved or never existed. Let’s put you back into a system that works.</p>
          <div className="btn-row">
            <Button href="/" variant="lime" arrow>
              Back to home
            </Button>
            <Button href="/aura" variant="ghost">
              Start AURA Scan
            </Button>
          </div>
        </div>
        <div className="nf-matrix dark" aria-hidden="true">
          {Array.from({ length: 49 }, (_, i) => (
            <i
              key={i}
              className={i === 24 ? 'gone' : rand(i, 9) > 0.8 ? 'p' : ''}
              style={{
                ['--x' as string]: `${(rand(i, 2) * 30 - 15).toFixed(1)}px`,
                ['--y' as string]: `${(rand(i, 3) * 30 - 15).toFixed(1)}px`,
                ['--r' as string]: `${(rand(i, 4) * 40 - 20).toFixed(0)}deg`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
