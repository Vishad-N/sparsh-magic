import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Divider from '@/components/Divider';
import { CtaBand, JsonLd } from '@/components/Blocks';
import { formatDate, getPost, posts, readMinutes, sortedPosts } from '@/lib/blog';
import { founder, site } from '@/lib/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', publishedTime: post.date, title: post.title, description: post.excerpt },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.date,
          description: post.excerpt,
          author: { '@type': 'Person', name: founder.name },
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }}
      />
      <article className="post">
        <header className="post-head wrap wrap-narrow">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <span aria-current="page">{post.category}</span>
              </li>
            </ol>
          </nav>
          <span className="post-meta">
            <span className="tag">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {readMinutes(post)} min read
          </span>
          <h1>{post.title}</h1>
          <p className="post-dek">{post.excerpt}</p>
        </header>
        <Divider variant="trail" />
        <div className="prose wrap wrap-narrow">
          {post.body.map((b, i) => {
            if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>;
            if (b.type === 'quote') return <blockquote key={i}>{b.text}</blockquote>;
            if (b.type === 'ul')
              return (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.text}</p>;
          })}
          <p className="byline">
            Written by the Sparsh Magic team, drawing on {founder.name}’s work with 342+ MSMEs.
          </p>
        </div>
      </article>

      <Divider variant="scan" />

      <section className="sec-tight">
        <div className="wrap">
          <h2 className="h3">Keep reading</h2>
          <div className="post-grid related">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                <span className="post-meta">
                  <span className="tag">{p.category}</span>
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                </span>
                <h3>
                  <span className="ul">{p.title}</span>
                </h3>
                <p>{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Turn the idea into <em>a system.</em>
          </>
        }
        lead="The AURA Scan shows where your business stands on the MAP49™ matrix, and the first fix to make this week."
      />
    </>
  );
}
