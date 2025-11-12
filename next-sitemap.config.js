const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ebikepsi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Exclude API routes, internal routes, legal pages
  exclude: ['/_not-found', '/api/*', '/server-sitemap.xml', '/privacy', '/terms'],
  // Add additional paths for dynamic routes
  additionalPaths: async (config) => {
    const paths = [];

    // Add model pages
    const models = require('./data/models.json');
    models.forEach((model) => {
      paths.push({
        loc: `/models/${model.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // Add blog posts
    const blogDir = path.join(process.cwd(), 'content/blog');
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      files
        .filter((file) => file.endsWith('.mdx'))
        .forEach((file) => {
          const slug = file.replace(/\.mdx$/, '');
          const fullPath = path.join(blogDir, file);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);

          paths.push({
            loc: `/blog/${slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: data.date || new Date().toISOString(),
          });
        });

      // Add blog index
      paths.push({
        loc: '/blog',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    // Add FAQ
    paths.push({
      loc: '/faq',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });

    return paths;
  },
};
