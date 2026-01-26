---
name: programmatic-seo
description: Create programmatic SEO pages for ebikepsi.com that rank well and provide excellent user experiences. Use this skill when implementing tire size pages, category pages, GEO pages, comparison pages, or any templated content at scale.
---

# Programmatic SEO Implementation Guide

This skill guides creation of programmatic SEO pages that are both search-engine optimized and provide genuine value to users. All pages must be technically sound, fast, accessible, and useful.

## Core Principles

1. **Value First**: Every programmatic page must answer a real user question
2. **Unique Content**: Even templated pages need unique, useful content sections
3. **Technical Excellence**: Perfect Core Web Vitals, proper schema, semantic HTML
4. **Internal Linking**: Every page strengthens the site's topical authority
5. **No Thin Content**: Minimum viable content threshold must be met

## Page Quality Checklist

Before any programmatic page is considered complete:

### Content Requirements
- [ ] H1 contains primary keyword naturally
- [ ] At least 300 words of unique, helpful content
- [ ] PSI table or data visualization present
- [ ] FAQ section with 3-5 relevant questions
- [ ] Clear CTA to calculator
- [ ] Internal links to related pages (min 3)
- [ ] External link to authoritative source (optional but recommended)

### Technical SEO Requirements
- [ ] Unique title tag (50-60 characters)
- [ ] Unique meta description (150-160 characters)
- [ ] Canonical URL set correctly
- [ ] Open Graph tags present
- [ ] JSON-LD schema (FAQ, BreadcrumbList, Article)
- [ ] Semantic HTML structure (header, main, article, section)
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text on all images
- [ ] Mobile-responsive layout
- [ ] Fast LCP (< 2.5s)

### User Experience Requirements
- [ ] Clear visual hierarchy
- [ ] Scannable content with subheadings
- [ ] Interactive elements where appropriate
- [ ] Breadcrumb navigation
- [ ] Related content suggestions
- [ ] Easy path to calculator

## URL Structure Standards

All programmatic pages follow these URL patterns:

```
/tire-size/[size]/                    → Tire size directory
/[category]-ebike-tire-pressure/      → Use case categories
/[location]-ebike-tire-pressure/      → GEO pages
/ebike-tyre-pressure/                 → UK market page
/[weight]-rider-tire-pressure/        → Weight-based pages
/compare/[model-a]-vs-[model-b]/      → Model comparisons
/psi-range/[min]-[max]/               → PSI range pages
/learn/[topic]/                       → Educational pages
```

### URL Formatting Rules
- Always lowercase
- Use hyphens, never underscores
- No trailing slashes
- Remove special characters
- Keep URLs under 75 characters when possible
- Tire sizes: `20x3-0` not `20x3.0` (periods cause issues)

## Data Sources

All programmatic pages pull from:

1. **models.json** - E-bike specifications
2. **brandMetadata.ts** - Brand information
3. **lib/brands.ts** - Category classification logic
4. **calc/engine.ts** - PSI calculation formulas

### Key Data Fields for Filtering

```typescript
// From models.json
interface ModelPreset {
  slug: string;
  brand: string;
  model: string;
  bikeWeightLbs: number;
  isTrike?: boolean;
  stockTire: {
    size: string;      // "20x3.0", "26x4.0", etc.
    minPSI?: number;
    maxPSI?: number;
    casing: "standard" | "reinforced";
  };
  axleBias: {
    front: number;     // 0.40-0.50 typically
    rear: number;      // 0.50-0.60 typically
  };
}
```

### Category Classification

Use the existing `getModelType()` function from `lib/brands.ts`:
- **Fat Tire**: tireWidth >= 3.5 or size includes "4.0"
- **Cargo**: bikeWeightLbs > 70 AND cargo-related brand/model name
- **Folding**: 16x or 14x tire size, or Brompton brand
- **Moto-Style**: bikeWeightLbs > 100 or Sur-Ron/Talaria/UBCO
- **Standard**: Everything else

## Template Structure

Every programmatic page follows this component structure:

```tsx
<>
  {/* JSON-LD Schema */}
  <script type="application/ld+json">...</script>
  
  <main>
    {/* Breadcrumb Navigation */}
    <Breadcrumbs items={[...]} />
    
    {/* H1 + Intro */}
    <header>
      <h1>{primaryKeyword}</h1>
      <p>{introText}</p>
    </header>
    
    {/* Quick Stats Card */}
    <QuickStats data={...} />
    
    {/* Main Content Sections */}
    <section>
      <h2>...</h2>
      {/* PSI Table, Model Grid, etc. */}
    </section>
    
    {/* FAQ Section */}
    <FAQSection items={faqs} />
    
    {/* Calculator CTA */}
    <CalculatorCTA />
    
    {/* Related Content */}
    <RelatedContent links={[...]} />
  </main>
</>
```

## Internal Linking Strategy

### From Programmatic Pages, Link To:
1. Calculator (`/calculate`)
2. Related brand pages (`/brands/[brand]`)
3. Related model pages (`/models/[slug]`)
4. Related blog posts
5. Other programmatic pages in same category
6. FAQ page for general questions

### Link Anchor Text Guidelines:
- Use descriptive, keyword-rich anchor text
- Vary anchor text (don't use same phrase repeatedly)
- Contextual links within content > nav-style link lists
- Example: "See our [Lectric tire pressure guide](/brands/lectric)" not "Click here"

## Content Generation Guidelines

### Avoid:
- Generic filler text
- Keyword stuffing
- Duplicate content across pages
- Thin content (< 300 words)
- AI-sounding phrases ("In the realm of...", "It's important to note...")
- Over-promising ("definitive guide", "everything you need")

### Include:
- Specific data and numbers
- Actionable recommendations
- Model-specific details
- Safety warnings where relevant
- Temperature/terrain adjustments
- Links to deeper content

## File Organization

```
app/
├── tire-size/
│   └── [size]/
│       └── page.tsx
├── compare/
│   └── [...slugs]/
│       └── page.tsx
├── learn/
│   └── [topic]/
│       └── page.tsx
├── psi-range/
│   └── [range]/
│       └── page.tsx
├── (geo)/
│   ├── ebike-tyre-pressure/
│   │   └── page.tsx
│   └── [location]-ebike-tire-pressure/
│       └── page.tsx
└── (categories)/
    ├── cargo-ebike-tire-pressure/
    ├── folding-ebike-tire-pressure/
    ├── commuter-ebike-tire-pressure/
    └── ...

lib/
├── programmatic/
│   ├── tire-sizes.ts      # Tire size grouping utilities
│   ├── categories.ts      # Category page data
│   ├── geo.ts             # GEO page data & utilities
│   ├── comparisons.ts     # Comparison page logic
│   └── schema-helpers.ts  # JSON-LD generators
```

## Testing Checklist

Before deploying programmatic pages:

1. **Build Test**: `pnpm build` passes without errors
2. **Type Check**: `pnpm typecheck` passes
3. **Lint Check**: `pnpm lint` passes
4. **Visual Check**: Pages render correctly on mobile and desktop
5. **Schema Check**: Test JSON-LD with Google's Rich Results Test
6. **Performance Check**: Lighthouse score > 90
7. **Link Check**: All internal links resolve correctly
8. **Sitemap Check**: Pages appear in generated sitemap

## Monitoring & Iteration

After launch, monitor:
- Google Search Console indexing status
- Core Web Vitals in field data
- Click-through rates by page type
- Bounce rates and time on page
- Conversion to calculator usage

Iterate based on data - pages that underperform may need:
- Better content
- Improved internal linking
- Schema markup fixes
- Title/meta description optimization
