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
  // Exclude API routes, internal routes, and system files
  exclude: ['/_not-found', '/api/*', '/server-sitemap.xml'],
  // Add additional paths for dynamic routes (these will be generated via generateStaticParams)
  additionalPaths: async (config) => {
    const models = require('./data/models.json');
    return models.map((model) => ({
      loc: `/models/${model.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
