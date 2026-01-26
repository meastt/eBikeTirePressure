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
  // Exclude API routes, internal routes, legal pages, and tire pressure pages (now redirected to /models/)
  exclude: [
    '/_not-found',
    '/api/*',
    '/server-sitemap.xml',
    '/privacy',
    '/terms',
    '/brands/*/*-tire-pressure', // Exclude all tire pressure pages (redirected to /models/)
  ],
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

    // Add programmatic tire size pages
    const tireSizes = [
      '20x3-0', '20x4-0', '26x4-0', '27-5x2-2', '27-5x2-4',
      '700x35c', '700x40c', '20x2-4', '22x3-0', '16x1-5',
      '24x2-4', '29x2-5', '27-5x2-6', '20x2-5', '19x2-5'
    ];
    tireSizes.forEach((size) => {
      paths.push({
        loc: `/tire-size/${size}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // Add category pages
    const categoryPages = [
      'cargo-ebike-tire-pressure',
      'folding-ebike-tire-pressure',
      'fat-tire-ebike-tire-pressure',
      'commuter-ebike-tire-pressure',
      'moto-style-ebike-tire-pressure',
    ];
    categoryPages.forEach((page) => {
      paths.push({
        loc: `/${page}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // Add UK/GEO page
    paths.push({
      loc: '/ebike-tyre-pressure',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // Add weight category pages
    paths.push({
      loc: '/heavy-rider-ebike-tire-pressure',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    return paths;
  },
};
