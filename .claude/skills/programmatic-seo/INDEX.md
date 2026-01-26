# Programmatic SEO Implementation Index

Quick reference for all skill files in this directory.

## File Overview

| File | Purpose | When to Use |
|------|---------|-------------|
| `SKILL.md` | Core guidelines and principles | Start here for any implementation |
| `TECHNICAL-SEO.md` | Technical requirements | Metadata, schema, URLs, performance |
| `GEO-CONTENT.md` | International/regional content | UK pages, climate pages, state pages |
| `PAGE-TEMPLATES.md` | Component structure | Building new page types |
| `CONTENT-PLAN-DATA.md` | Full data reference | Checking priorities, keywords, slugs |
| `QA-CHECKLIST.md` | Quality assurance | Before deploying any page |
| `LIB-UTILITIES.md` | Code specifications | Building utilities in `lib/programmatic/` |

## Quick Start

### Implementing a New Tire Size Page

1. Read `SKILL.md` → Core principles
2. Check `CONTENT-PLAN-DATA.md` → Confirm page is in plan
3. Review `PAGE-TEMPLATES.md` → Page Type 1: Tire Size Directory
4. Implement using `LIB-UTILITIES.md` → `tire-sizes.ts`
5. Verify with `TECHNICAL-SEO.md` → Meta tags, schema
6. Test with `QA-CHECKLIST.md` → Full checklist

### Implementing a Category Page

1. Read `SKILL.md` → Core principles
2. Check `CONTENT-PLAN-DATA.md` → Get category definition
3. Review `PAGE-TEMPLATES.md` → Page Type 2: Category Hub Pages
4. Implement using `LIB-UTILITIES.md` → `categories.ts`
5. Verify with `TECHNICAL-SEO.md` → Meta tags, schema
6. Test with `QA-CHECKLIST.md` → Full checklist

### Implementing a GEO Page

1. Read `SKILL.md` → Core principles
2. Read `GEO-CONTENT.md` → Language, units, content guidelines
3. Check `CONTENT-PLAN-DATA.md` → Get GEO page definition
4. Review `PAGE-TEMPLATES.md` → Adapt for GEO specifics
5. Implement using `LIB-UTILITIES.md` → `geo.ts`
6. Verify with `TECHNICAL-SEO.md` → i18n requirements
7. Test with `QA-CHECKLIST.md` → Include i18n checklist

## Implementation Priority

### Phase 1 (P0) - 9 pages
Core high-value pages to implement first:

- [ ] `/tire-size/20x3-0/`
- [ ] `/tire-size/20x4-0/`
- [ ] `/tire-size/26x4-0/`
- [ ] `/tire-size/27-5x2-2/`
- [ ] `/cargo-ebike-tire-pressure/`
- [ ] `/folding-ebike-tire-pressure/`
- [ ] `/fat-tire-ebike-tire-pressure/`
- [ ] `/ebike-tyre-pressure/` (UK)
- [ ] `/heavy-rider-ebike-tire-pressure/`

### Phase 2 (P1) - 15 pages
Secondary pages with good search volume:

- [ ] `/tire-size/27-5x2-4/`
- [ ] `/tire-size/700x35c/`
- [ ] `/tire-size/700x40c/`
- [ ] `/tire-size/20x2-4/`
- [ ] `/commuter-ebike-tire-pressure/`
- [ ] `/moto-style-ebike-tire-pressure/`
- [ ] `/hot-weather-ebike-tire-pressure/`
- [ ] `/cold-weather-ebike-tire-pressure/`
- [ ] `/300-lb-rider-ebike-tire-pressure/`
- [ ] `/compare/lectric-xp-3-vs-rad-power-radrunner-plus/`
- [ ] `/compare/aventon-aventure-2-vs-rad-power-radrover-6-plus/`
- [ ] `/learn/psi-vs-bar/`
- [ ] `/learn/pinch-flat/`
- [ ] Plus 2 more comparisons

### Phase 3 (P2+) - 25+ pages
Long-tail pages as resources allow.

## Code Architecture

```
app/
├── tire-size/
│   └── [size]/
│       └── page.tsx          ← Uses getTireSizeInfo(), generateStaticParams()
├── compare/
│   └── [...slugs]/
│       └── page.tsx          ← Uses parseComparisonUrl()
├── learn/
│   └── [topic]/
│       └── page.tsx          ← Uses LEARN_TOPICS
├── (geo)/
│   ├── ebike-tyre-pressure/
│   │   └── page.tsx          ← Uses UK_PAGE, toBritishEnglish()
│   └── [state]-ebike-tire-pressure/
│       └── page.tsx          ← Uses US_STATE_PAGES
├── cargo-ebike-tire-pressure/
│   └── page.tsx              ← Uses CATEGORIES['cargo']
├── folding-ebike-tire-pressure/
│   └── page.tsx              ← Uses CATEGORIES['folding']
├── fat-tire-ebike-tire-pressure/
│   └── page.tsx              ← Uses CATEGORIES['fat-tire']
├── commuter-ebike-tire-pressure/
│   └── page.tsx              ← Uses CATEGORIES['commuter']
└── moto-style-ebike-tire-pressure/
    └── page.tsx              ← Uses CATEGORIES['moto-style']

lib/
└── programmatic/
    ├── index.ts              ← Barrel exports
    ├── tire-sizes.ts         ← Tire size utilities
    ├── categories.ts         ← Category definitions
    ├── geo.ts                ← GEO utilities
    ├── schema-generators.ts  ← JSON-LD helpers
    └── url-utils.ts          ← URL normalization

components/
└── programmatic/
    ├── ModelGrid.tsx
    ├── PSIQuickTable.tsx
    ├── FAQSection.tsx
    ├── CalculatorCTA.tsx
    ├── RelatedLinks.tsx
    └── QuickStats.tsx
```

## Key Metrics to Track

After implementation, monitor in Google Search Console:

1. **Indexing Rate** - Pages discovered vs indexed
2. **CTR by Page Type** - Which templates perform best
3. **Position Distribution** - Ranking improvements over time
4. **Core Web Vitals** - Performance in field data

## Common Pitfalls to Avoid

1. **Don't launch all pages at once** - Stagger to monitor quality
2. **Don't copy content between pages** - Each needs unique value
3. **Don't skip schema markup** - Critical for rich results
4. **Don't forget mobile testing** - Most e-bike searches are mobile
5. **Don't ignore page speed** - Programmatic pages can bloat

## Questions?

For implementation questions, refer to the specific skill file or check:
- Existing model pages: `/app/models/[slug]/page.tsx`
- Existing brand pages: `/app/brands/[brand]/page.tsx`
- Existing schema helpers: `/lib/schema.ts`

These provide working examples of Next.js programmatic page patterns already in use on the site.
