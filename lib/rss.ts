import { BlogPost } from './blog';

export interface RSSConfig {
  title: string;
  description: string;
  siteUrl: string;
  language?: string;
}

/**
 * Generate RSS 2.0 feed XML
 */
export function generateRSS(posts: BlogPost[], config: RSSConfig): string {
  const { title, description, siteUrl, language = 'en-us' } = config;
  const buildDate = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <description>${description}</description>
    <link>${siteUrl}</link>
    <language>${language}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}

