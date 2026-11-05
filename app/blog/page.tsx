import type { Metadata } from 'next';
import Link from 'next/link';
import Divider from '@/components/Divider';
import { CtaBand, MiniMatrix, PageHero } from '@/components/Blocks';
import { formatDate, readMinutes, sortedPosts } from '@/lib/blog';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'Blog: Team Productivity & Accountability for MSMEs',
  description: 'Practical writing from Sparsh Magic on employee empowerment, hiring, engagement and productivity for Indian MSME founders.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts();
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Blog' }]}
        backdrop={bd.blog.hero}
        eyebrow="Blog"
        title={
          <>
            Notes on building
            <br />
            <span className="purple">self-driven teams.</span>
          </>
        }
        lead="Practical, plain-language thinking for founders who want their business to run without them."
      />

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Link href={`/blog/${featured.slug}`} className="post-feat rv">
            <div className="pf-art dark" aria-hidden="true">
              <MiniMatrix seed={4} rows={7} />
            </div>
            <div className="pf-body">
              <span className="post-meta">
                <span className="tag">{featured.category}</span> Featured · {formatDate(featured.date)} · {readMinutes(featured)} min read
              </span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="text-link">Read article →</span>
            </div>
          </Link>
        </div>
      </section>

      <Divider variant="grid" />

      <section className="sec-tight">
        <div className="wrap">
          <div className="post-grid">
            {rest.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card rv" style={{ ['--rd' as string]: `${i * 0.06}s` }}>
                <span className="post-meta">
                  <span className="tag">{p.category}</span>
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                </span>
                <h3>
                  <span className="ul">{p.title}</span>
                </h3>
                <p>{p.excerpt}</p>
                <span className="post-read">{readMinutes(p)} min read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
