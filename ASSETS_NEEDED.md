# Assets Needed

This file tracks all visual assets, images, and icons that need to be provided.

## PWA Icons (Phase 0)

### Standard Icons
- **icon-192.png** (192x192px)
  - Location: `/public/icons/icon-192.png`
  - Purpose: Standard PWA icon for Android
  - Design: E-Bike PSI logo/branding
  - Format: PNG with transparent or white background

- **icon-512.png** (512x512px)
  - Location: `/public/icons/icon-512.png`
  - Purpose: High-res PWA icon for splash screens
  - Design: E-Bike PSI logo/branding
  - Format: PNG with transparent or white background

### Maskable Icon
- **maskable-512.png** (512x512px)
  - Location: `/public/icons/maskable-512.png`
  - Purpose: Adaptive icon for Android (handles different shapes)
  - Design: E-Bike PSI logo centered in 80% safe zone
  - Format: PNG with solid background color (#1E88E5 brand blue recommended)
  - Notes: See [Maskable.app](https://maskable.app) for safe zone guidelines

---

## Domain & Configuration

### Production Domain Setup ✅
- **Domain purchased**: `ebikepsi.com` ✅
- **DNS configured**: Points to Vercel deployment ✅
- **SSL Certificate**: Auto-configured by Vercel ✅

### Code Updates Completed ✅
- `/next-sitemap.config.js` - Updated to `ebikepsi.com` ✅
- `/lib/schema.ts` - Updated WebSite schema URL ✅
- `/app/layout.tsx` - Added Google Analytics 4 tracking ✅
- `/public/manifest.webmanifest` - No changes needed (uses relative URLs) ✅

### Vercel Environment Variables (Manual Setup Required)
- Set `SITE_URL` environment variable to `https://ebikepsi.com` in Vercel dashboard
- Trigger redeploy after setting environment variable

---

## Future Assets (Phase 2+)

_Assets for future phases will be added here as needed_

---

## Status Legend
- ❌ Not provided yet
- ✅ Provided and committed
- 🔄 In progress

## Current Status
- icon-192.png: ❌
- icon-512.png: ❌
- maskable-512.png: ❌
