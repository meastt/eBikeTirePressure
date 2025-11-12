import { getAllPosts } from '@/lib/blog';
import { generateRSS } from '@/lib/rss';

export async function GET() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 20);

  const rss = generateRSS(latestPosts, {
    title: 'E-Bike PSI Blog',
    description:
      'Expert guides on e-bike tire pressure for all bike types and terrains.',
    siteUrl: 'https://ebikepsi.com',
    language: 'en-us',
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

