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
    host: 'ebikepsi.com', // Domain only (no protocol) per robots.txt spec
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

    // Add programmatic tire size pages (dynamically from models.json)
    const uniqueTireSizes = [...new Set(models.map(m => m.stockTire.size))];
    uniqueTireSizes.forEach((size) => {
      // Convert tire size to URL format (e.g., "20x4.0" -> "20x4-0")
      const urlSize = size.replace(/\./g, '-');
      paths.push({
        loc: `/tire-size/${urlSize}`,
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
    paths.push(
      {
        loc: '/heavy-rider-ebike-tire-pressure',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/lightweight-rider-tire-pressure',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    );

    // Add climate/weather pages
    paths.push(
      {
        loc: '/hot-weather-ebike-tire-pressure',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/cold-weather-ebike-tire-pressure',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    );

    // Add tire size directory page
    paths.push({
      loc: '/tire-size',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // Add brand pages
    const brandSlugs = [...new Set(models.map(m => {
      return m.brand
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/bikes?$/i, '')
        .replace(/-+$/g, '')
        .trim();
    }))];
    brandSlugs.forEach((slug) => {
      paths.push({
        loc: `/brands/${slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    // Add brands directory
    paths.push({
      loc: '/brands',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });

    return paths;
  },
};
