# Technical SEO & GEO Audit Report
**Site:** ebikepsi.com  
**Date:** March 9, 2026  
**Audit Type:** Full Technical SEO + GEO (Geographic) Analysis

---

## Executive Summary

ebikepsi.com has a **strong technical SEO foundation** with solid structured data, programmatic pages, and good crawlability. The UK/EU GEO implementation is well-executed. Several issues require attention, particularly around canonical consistency, hreflang completeness, and missing GEO page types.

**Overall Grade: B+** (Strong foundation, targeted improvements needed)

---

## 1. CRAWLABILITY & INDEXING

### 1.1 Robots.txt ✅ GOOD
- **Location:** `https://ebikepsi.com/robots.txt`
- **Allow:** `User-agent: *` with `Allow: /`
- **Sitemap:** Correctly referenced
- **Issue:** `Host: https://ebikepsi.com` — The Host directive should be domain-only (`Host: ebikepsi.com`). The protocol is non-standard and may be ignored by some crawlers.

### 1.2 Sitemap ✅ GOOD
- **URLs indexed:** ~350+ URLs (home, blog, brands, models, tire sizes, categories, UK page)
- **Structure:** Single sitemap (no index sitemap; `generateIndexSitemap: false`)
- **Coverage:** Models, brands, tire sizes, category pages, climate pages, UK page all included
- **lastmod:** Present on all URLs; some blog posts use file dates, others use build timestamp
- **changefreq/priority:** Appropriately set (daily for homepage/calculate, weekly for models, monthly for categories)

### 1.3 Exclusions ⚠️ REVIEW
- **Excluded from sitemap:** `/_not-found`, `/api/*`, `/privacy`, `/terms`, `/brands/*/*-tire-pressure`
- **Privacy/Terms:** Excluded — consider including if you want these indexed for trust signals
- **Brand tire-pressure pages:** Correctly excluded (301 redirect to `/models/[slug]`)

---

## 2. CANONICAL & URL STRUCTURE

### 2.1 Canonical URLs ⚠️ MIXED
| Page Type | Implementation | Status |
|-----------|----------------|--------|
| Homepage | `https://ebikepsi.com` | ✅ |
| Calculator | Uses `getBaseUrl()` | ✅ |
| Models | `model.canonicalUrl` (from brandMetadata) | ✅ |
| UK Page | `getBaseUrl()/ebike-tyre-pressure` | ✅ |
| Categories | Mix: some hardcoded `https://ebikepsi.com/...`, some dynamic | ⚠️ |
| Blog | `post.canonical` from frontmatter | ✅ |
| FAQ | Hardcoded `https://ebikepsi.com/faq` | ✅ |

**Issue:** Inconsistent base URL usage. Some pages hardcode `https://ebikepsi.com` while others use `getBaseUrl()`. For staging/preview environments, hardcoded URLs will point to production.

**Files with hardcoded canonicals:** `app/ebike-tire-pressure/layout.tsx`, `app/commuter-ebike-tire-pressure/page.tsx`, `app/moto-style-ebike-tire-pressure/page.tsx`, `app/lightweight-rider-tire-pressure/page.tsx`, `app/cold-weather-ebike-tire-pressure/page.tsx`, `app/hot-weather-ebike-tire-pressure/page.tsx`, `app/brands/[brand]/page.tsx`

### 2.2 www vs Non-www ⚠️ DUPLICATE CONTENT RISK
- **ebikepsi.com** and **www.ebikepsi.com** both serve identical content
- No redirect observed from www → non-www (or vice versa)
- **Action:** Implement 301 redirect to preferred version (typically non-www) and set canonical consistently

### 2.3 URL Structure ✅ GOOD
- Clean, hyphenated URLs
- Tire sizes use `20x4-0` format (periods replaced) — correct per programmatic SEO standards
- No trailing slashes in sitemap
- Redirects: `/brands/[brand]/[model]-tire-pressure` → `/models/[slug]` (301)

---

## 3. STRUCTURED DATA (JSON-LD)

### 3.1 Implemented ✅
| Schema Type | Location | Status |
|-------------|----------|--------|
| Organization | Root layout | ✅ |
| WebSite + SearchAction | Root layout | ✅ |
| SoftwareApplication | /calculate | ✅ |
| HowTo | /calculate | ✅ |
| BreadcrumbList | Breadcrumbs component, UK page, blog, models | ✅ |
| FAQPage | FAQ page, UK page, model pages | ✅ |
| Article/TechArticle | Model pages | ✅ |
| BlogPosting | Blog posts | ✅ |
| Article | Blog posts (alongside BlogPosting) | ✅ |

### 3.2 Breadcrumb Schema ⚠️ HARDCODED BASE URL
- **File:** `components/Breadcrumbs.tsx`
- **Issue:** `item: \`https://ebikepsi.com${item.href}\`` — Hardcoded domain. Should use `getBaseUrl()` for staging/preview compatibility.

### 3.3 Missing / Incomplete
- **Homepage FAQ schema:** Not present (audit recommended adding 3–5 key FAQs)
- **Product schema:** Model pages use Article/TechArticle, not Product — acceptable for informational content
- **VideoObject:** N/A (no video content)

---

## 4. META TAGS & OPEN GRAPH

### 4.1 Title Tags ✅
- Unique per page type
- Include year (2026) where relevant
- Length generally 50–60 chars

### 4.2 Meta Descriptions ✅
- Present on all audited pages
- Target length 150–160 chars — verify per-page

### 4.3 Open Graph ✅
- `metadataBase: https://ebikepsi.com` in layout
- OG title, description, type set
- UK page: `locale: 'en_GB'` for UK page
- Twitter cards: `summary_large_image`

### 4.4 Images
- OG images: Blog posts support `post.ogImage`; fallback to logo
- **Verify:** `og:image` width/height on key pages for optimal sharing

---

## 5. GEO / INTERNATIONAL SEO

### 5.1 UK/EU Page ✅ EXCELLENT
- **URL:** `/ebike-tyre-pressure`
- **Content:** Bar + PSI units, British spelling (tyre, colour), UK/EU brand focus (Tern, Brompton, Riese & Müller, Gazelle, etc.)
- **UK-specific tips:** Wet conditions, winter riding, commuting, pressure checking
- **Internal links:** To US version (`/ebike-tire-pressure`), calculator, cargo page
- **Schema:** BreadcrumbList, FAQPage
- **Metadata:** `locale: 'en_GB'`, `alternates.languages` for en-GB and en-US

### 5.2 Hreflang Implementation ⚠️ INCOMPLETE
- **UK page:** Has `alternates.languages` with `en-GB` and `en-US` pointing to correct URLs
- **US page (`/ebike-tire-pressure`):** Layout has `canonical` only — **no `alternates.languages`** for hreflang
- **Result:** One-way hreflang. UK page declares both; US page does not declare UK alternate. Google may not fully understand the relationship.

**Fix:** Add to `app/ebike-tire-pressure/layout.tsx`:
```ts
alternates: {
  canonical: "...",
  languages: {
    'en-US': 'https://ebikepsi.com/ebike-tire-pressure',
    'en-GB': 'https://ebikepsi.com/ebike-tyre-pressure',
  },
},
```

### 5.3 Location-Based GEO Pages ❌ NOT IMPLEMENTED
- **Skill mentions:** `/[location]-ebike-tire-pressure/` (e.g., `seattle-ebike-tire-pressure`, `london-ebike-tire-pressure`)
- **Current state:** No `[location]` dynamic route exists
- **Sitemap:** No city/region GEO pages
- **Opportunity:** City/state pages could target "ebike tire pressure [city]" queries if you expand programmatic GEO

### 5.4 Climate GEO ✅ IMPLEMENTED
- Hot weather: `/hot-weather-ebike-tire-pressure`
- Cold weather: `/cold-weather-ebike-tire-pressure`
- Both in sitemap with appropriate metadata

---

## 6. CONTENT & PAGE QUALITY

### 6.1 Programmatic Pages ✅
- **Tire sizes:** 30+ sizes (e.g., `/tire-size/20x4-0`)
- **Categories:** Cargo, folding, fat tire, commuter, moto-style
- **Weight:** Heavy rider, lightweight rider
- **Models:** 141 models with unique content, FAQs, PSI tables

### 6.2 Internal Linking ✅
- Breadcrumbs on programmatic pages
- Related models on model pages
- Calculator CTA on category/UK pages
- Footer links

### 6.3 Thin Content Check
- Model pages: Unique H1, specs, PSI table, 4 FAQs, related models — **adequate**
- Category pages: QuickStats, model grids, FAQs — **adequate**
- UK page: 300+ words, tables, UK tips, FAQs — **strong**

---

## 7. TECHNICAL PERFORMANCE

### 7.1 Core Web Vitals
- Next.js static generation
- `compress: true` in config
- `optimizePackageImports` for components
- PWA with conservative caching
- **Recommendation:** Run Lighthouse on key URLs (home, calculate, model page) to confirm LCP < 2.5s

### 7.2 Mobile
- Responsive layout
- `viewport` configured
- Touch targets on calculator

### 7.3 Security
- `poweredByHeader: false` ✅

---

## 8. ISSUES SUMMARY

### Critical
| Issue | Impact | Fix |
|-------|--------|-----|
| www vs non-www duplicate | Duplicate content, split authority | 301 redirect to preferred domain |
| US page missing hreflang | Incomplete GEO signals | Add `alternates.languages` to ebike-tire-pressure layout |

### High
| Issue | Impact | Fix |
|-------|--------|-----|
| Hardcoded canonicals | Staging/preview point to prod | Use `getBaseUrl()` consistently |
| Breadcrumbs hardcoded domain | Schema URLs wrong in staging | Use `getBaseUrl()` in Breadcrumbs.tsx |
| robots.txt Host format | Minor crawler confusion | Use `Host: ebikepsi.com` |

### Medium
| Issue | Impact | Fix |
|-------|--------|-----|
| Privacy/Terms excluded from sitemap | May reduce trust indexing | Consider including |
| Location GEO pages not built | Missed programmatic opportunity | Implement `[location]-ebike-tire-pressure` if desired |

---

## 9. GEO-SPECIFIC RECOMMENDATIONS

1. **Complete hreflang:** Add `alternates.languages` to US `/ebike-tire-pressure` layout so both US and UK pages declare each other.
2. **x-default:** Consider adding `x-default` to hreflang pointing to US version as default for unspecified regions.
3. **Location pages:** If targeting local queries, add `app/[location]-ebike-tire-pressure/page.tsx` with `generateStaticParams` for priority cities (Seattle, Portland, Denver, etc.) and UK cities (London, Manchester, etc.).
4. **GEO content depth:** UK page is strong. Consider EU-specific variants (e.g., German Bar-focused page) if expanding internationally.

---

## 10. QUICK WINS (Priority Order)

1. **Add hreflang to US page** — 15 min
2. **Fix Breadcrumbs base URL** — 10 min
3. **Implement www → non-www redirect** — Vercel/hosting config
4. **Fix robots.txt Host** — 2 min
5. **Audit hardcoded canonicals** — Replace with `getBaseUrl()` — 30 min

---

## 11. VALIDATION CHECKLIST

- [ ] Google Rich Results Test on homepage, model page, UK page
- [ ] Schema.org Validator on key pages
- [ ] Lighthouse performance on /, /calculate, /models/rad-power-radrunner-plus
- [ ] Google Search Console: Check indexing status, hreflang errors
- [ ] Verify www redirect in production

---

---

## 12. AHREFS ISSUES INVESTIGATION & FIXES (March 2026)

### Ahrefs Reported Issues

| Issue | Count | Root Cause | Fix Applied |
|-------|-------|------------|-------------|
| 404 page | 4 | Brand slug mismatch: sitemap uses getBrandSlug(), BRAND_METADATA uses different keys | Added SLUG_ALIASES in brandMetadata.ts |
| 4XX page | 4 | Same as 404 | Same fix |
| Orphan page | 1 | TBD – page with no incoming links | Monitor after other fixes |
| Links to broken page | 1 | Brands page linked to /brands/juiced-bikes etc. (404) | Brands page now uses urlSlug from models |
| Duplicate pages without canonical | 144 | www.ebikepsi.com + ebikepsi.com serving same content | Added www→non-www 301 in vercel.json |
| Missing reciprocal hreflang | 2 | US /ebike-tire-pressure didn't declare UK alternate | Added alternates.languages to layout |
| 4XX in sitemap | 3 | Same 3 brand URLs returning 404 | Brand slug alias fix |

### Brand Slug Mismatches (404 Root Cause)

| Brand | getBrandSlug() Output | BRAND_METADATA Key | Result |
|-------|----------------------|--------------------|--------|
| Juiced Bikes | juiced | juiced-bikes | 404 at /brands/juiced |
| HeyBike | hey | heybike | 404 at /brands/hey |
| Riese & Müller | riese-mller (ü stripped) | riese-muller | 404 at /brands/riese-mller |

**Fix:** Added `SLUG_ALIASES` in `lib/brandMetadata.ts` so `getBrandMetadata("juiced")` returns metadata for `juiced-bikes`, etc.

### Files Changed

- `lib/brandMetadata.ts` – SLUG_ALIASES, getSlugsForBrand()
- `app/brands/page.tsx` – Filter + urlSlug for aliased brands
- `app/ebike-tire-pressure/layout.tsx` – alternates.languages (hreflang)
- `vercel.json` – www→non-www 301 redirect
- `next-sitemap.config.js` – robotsTxtOptions.host
- `public/robots.txt` – Host: ebikepsi.com (if not overwritten by next-sitemap)

### Orphan Page (1) – Pending

Ahrefs reports 1 orphan page. Possible candidates: a tire-size page, model page, or category page not linked from nav/footer. After deployment, re-crawl to identify.

---

**Report generated:** March 9, 2026  
**Next review:** After implementing Critical/High priority fixes
