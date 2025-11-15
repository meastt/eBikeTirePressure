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
  // Redirects from old blog posts to new brand/model structure
  async redirects() {
    return [
      {
        source: '/blog/aventon-aventure-2-psi',
        destination: '/brands/aventon/aventure-2-tire-pressure',
        permanent: true,
      },
      {
        source: '/blog/lectric-xp-3-psi-guide',
        destination: '/brands/lectric/xp-3-tire-pressure',
        permanent: true,
      },
      // Redirects from old .0 decimal URLs to new simplified URLs
      {
        source: '/brands/lectric/xp-3-0-tire-pressure',
        destination: '/brands/lectric/xp-3-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/specialized/turbo-como-4-0-tire-pressure',
        destination: '/brands/specialized/turbo-como-4-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/lectric/xpedition-2-0-tire-pressure',
        destination: '/brands/lectric/xpedition-2-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/lectric/xpeak-2-0-tire-pressure',
        destination: '/brands/lectric/xpeak-2-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/specialized/turbo-vado-5-0-tire-pressure',
        destination: '/brands/specialized/turbo-vado-5-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/specialized/turbo-vado-sl-5-0-tire-pressure',
        destination: '/brands/specialized/turbo-vado-sl-5-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/specialized/turbo-tero-x-4-0-tire-pressure',
        destination: '/brands/specialized/turbo-tero-x-4-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/heybike/mars-2-0-tire-pressure',
        destination: '/brands/heybike/mars-2-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/lectric/xpeak-1-0-tire-pressure',
        destination: '/brands/lectric/xpeak-1-tire-pressure',
        permanent: true,
      },
      {
        source: '/brands/lectric/xpedition-1-0-tire-pressure',
        destination: '/brands/lectric/xpedition-1-tire-pressure',
        permanent: true,
      },
    ];
  },
  // OPTIONAL: uncomment if you want static export for Capacitor later
  // output: 'export',
};

module.exports = withPWA(nextConfig);
