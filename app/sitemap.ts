import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://by1.net';

  // Add your static pages
  const routes = [
    '',
    '/ai-customer-service',
    '/blog',
    '/about',
    '/contact',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogPosts];
}
