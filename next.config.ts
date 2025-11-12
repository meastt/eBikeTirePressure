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
  // OPTIONAL: uncomment if you want static export for Capacitor later
  // output: 'export',
};

module.exports = withPWA(nextConfig);
