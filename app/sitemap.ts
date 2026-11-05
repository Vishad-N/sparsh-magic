import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog';
import { industries, site } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/framework', '/aura', '/industries', '/results', '/about', '/team', '/culture', '/career', '/blog', '/contact', '/privacy', '/terms'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : p === '/aura' || p === '/framework' ? 0.9 : 0.7 })),
    ...industries.map((i) => ({ url: `${site.url}/industries/${i.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
