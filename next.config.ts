import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// @ts-ignore
const withPWA = require("next-pwa")({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,
  // conservative cache; calculator must stay instant
  cacheOnFrontEndNav: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Performance optimizations
  compress: true,
  // Generate optimized static pages for better Core Web Vitals
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // Turbopack config (Next.js 16+ uses Turbopack by default)
  // Empty config acknowledges webpack usage from next-pwa
  turbopack: {},
  // Redirects for SEO consolidation: /brands/[brand]/[model]-tire-pressure → /models/[model-slug]
  async redirects() {
    const modelsData = require('./data/models.json');
    const redirects = [];

    // Helper functions (inline to avoid TypeScript compilation issues at build time)
    const getBrandSlug = (brandName: string): string => {
      return brandName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/bikes?$/i, '')
        .replace(/-+$/g, '')
        .trim();
    };

    const getModelSlug = (modelName: string): string => {
      return modelName
        .toLowerCase()
        .replace(/[^a-z0-9\s-.]/g, '')
        .replace(/\./g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    // Generate redirects from all tire pressure pages to model pages
    modelsData.forEach((model: any) => {
      const brandSlug = getBrandSlug(model.brand);
      const modelSlug = getModelSlug(model.model);

      redirects.push({
        source: `/brands/${brandSlug}/${modelSlug}-tire-pressure`,
        destination: `/models/${model.slug}`,
        permanent: true,
      });
    });

    // Legacy redirects from old blog posts to model pages
    redirects.push(
      {
        source: '/blog/aventon-aventure-2-psi',
        destination: '/models/aventon-aventure-2',
        permanent: true,
      },
      {
        source: '/blog/lectric-xp-3-psi-guide',
        destination: '/models/lectric-xp-3',
        permanent: true,
      }
    );

    return redirects;
  },
  // OPTIONAL: uncomment if you want static export for Capacitor later
  // output: 'export',
};

module.exports = withPWA(nextConfig);
