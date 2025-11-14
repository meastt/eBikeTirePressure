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
        destination: '/brands/lectric/xp-3-0-tire-pressure',
        permanent: true,
      },
    ];
  },
  // OPTIONAL: uncomment if you want static export for Capacitor later
  // output: 'export',
};

module.exports = withPWA(nextConfig);
