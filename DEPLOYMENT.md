# Deployment Guide - E-Bike PSI Calculator

## Vercel Deployment (Recommended)

### Initial Setup

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI (if not already installed)
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Project Settings in Vercel Dashboard**
   - Framework Preset: **Next.js**
   - Build Command: `pnpm run build`
   - Output Directory: `.next` (default)
   - Install Command: `pnpm install`
   - Node Version: 18.x or higher

3. **Set Environment Variables** (Optional)
   Go to Project Settings → Environment Variables and add:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://ebikepsi.com
   ```

4. **Custom Domain Setup**
   - Go to Project Settings → Domains
   - Add `ebikepsi.com` and `www.ebikepsi.com`
   - Configure DNS:
     - Type: `A` Record → `76.76.21.21`
     - Type: `CNAME` → `cname.vercel-dns.com`

### Continuous Deployment

- **Production**: Push to `main` branch
- **Preview**: All pull requests get preview URLs automatically

### Post-Deployment Checklist

1. **Verify Analytics**
   - ✅ Plausible Analytics: Visit site and check Plausible dashboard at plausible.io
   - ✅ Google Analytics: Check GA4 Real-time reports
   - Test event tracking by using calculator

2. **Google Search Console**
   - ✅ Property already verified (per user confirmation)
   - Submit sitemap: `https://ebikepsi.com/sitemap.xml`
   - Request indexing for key pages:
     - `https://ebikepsi.com/`
     - `https://ebikepsi.com/calculate`
     - `https://ebikepsi.com/ebike-tire-pressure`

3. **Test Core Web Vitals**
   Run PageSpeed Insights on:
   - Homepage: `https://pagespeed.web.dev/`
   - Calculator: `https://ebikepsi.com/calculate`
   - Model page: `https://ebikepsi.com/models/rad-power-radrunner-plus`
   
   Target metrics (mobile):
   - LCP < 2.5s ✅
   - FID < 100ms ✅
   - CLS < 0.1 ✅

4. **Verify PWA Installation**
   - Open site on mobile
   - Check for "Install App" prompt
   - Test offline functionality

5. **Test Internal Links**
   - Verify all model page links work
   - Check breadcrumb navigation
   - Test related models section

## Build Locally (Testing)

```bash
# Install dependencies
pnpm install

# Build production bundle
pnpm run build

# Test production build locally
pnpm start

# Run tests
pnpm test
```

## Monitoring

- **Analytics**: plausible.io/ebikepsi.com
- **Google Analytics**: analytics.google.com
- **Search Console**: search.google.com/search-console
- **Vercel Dashboard**: vercel.com/dashboard

## Rollback

If deployment fails:
```bash
# Redeploy previous version
vercel rollback
```

## Production URLs

- **Primary**: https://ebikepsi.com
- **Alternate**: https://www.ebikepsi.com
- **Vercel**: https://ebike-tire-pressure.vercel.app

## Notes

- PWA service worker is automatically generated on build
- Sitemap is generated post-build via `next-sitemap`
- All static pages are pre-rendered at build time for optimal performance
- Calculator uses client-side rendering for interactivity

