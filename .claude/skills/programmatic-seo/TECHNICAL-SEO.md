# Technical SEO Standards

This document defines the technical SEO requirements for all programmatic pages on ebikepsi.com. Every page must meet these standards before deployment.

## Meta Tags

### Title Tag
```tsx
// Format: {Primary Keyword} | {Brand/Context} | E-Bike PSI
// Length: 50-60 characters (Google truncates at ~60)

// Examples:
"20x4.0 Fat Tire Pressure Guide | All Models | E-Bike PSI"
"Cargo E-Bike Tire Pressure | Load-Based PSI Charts | E-Bike PSI"
"UK E-Bike Tyre Pressure Guide | PSI & Bar Charts | E-Bike PSI"
```

### Meta Description
```tsx
// Length: 150-160 characters
// Include: Primary keyword, value proposition, call-to-action
// Avoid: Keyword stuffing, generic claims

// Example:
"Complete tire pressure guide for 20x4.0 fat tire e-bikes. Weight-based PSI charts for 15+ models including Lectric, Rad Power, and more. Free calculator."
```

### Canonical URL
```tsx
// Always set canonical to prevent duplicate content issues
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://ebikepsi.com${pathname}`,
    },
  };
}
```

### Open Graph Tags
```tsx
openGraph: {
  title: pageTitle,
  description: pageDescription,
  type: 'article', // or 'website' for index pages
  url: canonicalUrl,
  siteName: 'E-Bike PSI',
  locale: 'en_US', // or 'en_GB' for UK pages
}
```

### Twitter Card
```tsx
twitter: {
  card: 'summary_large_image',
  title: pageTitle,
  description: pageDescription,
}
```

## JSON-LD Schema Markup

### Required Schema Types

Every programmatic page needs at minimum:

1. **BreadcrumbList** - Navigation path
2. **FAQPage** - FAQ section (if present)
3. **Article** or **WebPage** - Main content

### BreadcrumbList Schema

```typescript
import { generateBreadcrumbSchema } from '@/lib/schema';

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://ebikepsi.com' },
  { name: 'Tire Sizes', url: 'https://ebikepsi.com/tire-sizes' },
  { name: '20x4.0 Tire Pressure', url: 'https://ebikepsi.com/tire-size/20x4-0' },
]);

// Output:
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ebikepsi.com"
    },
    // ...
  ]
}
```

### FAQPage Schema

```typescript
import { generateFAQSchema, type FAQItem } from '@/lib/schema';

const faqs: FAQItem[] = [
  {
    question: "What PSI should I use for 20x4.0 fat tires?",
    answer: "For 20x4.0 fat tires, recommended PSI ranges from 15-25 depending on rider weight and terrain. A 180 lb rider on pavement should start around 18-20 PSI."
  },
  // ... more FAQs
];

const faqSchema = generateFAQSchema(faqs);
```

### Article Schema (for content pages)

```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": pageTitle,
  "description": pageDescription,
  "author": {
    "@type": "Organization",
    "name": "E-Bike PSI"
  },
  "publisher": {
    "@type": "Organization",
    "name": "E-Bike PSI",
    "url": "https://ebikepsi.com"
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": canonicalUrl
  }
};
```

### ItemList Schema (for directory pages)

```typescript
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "E-bikes with 20x4.0 Fat Tires",
  "description": "Complete list of e-bike models featuring 20x4.0 fat tires",
  "numberOfItems": models.length,
  "itemListElement": models.map((model, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": `${model.brand} ${model.model}`,
    "url": `https://ebikepsi.com/models/${model.slug}`
  }))
};
```

## Semantic HTML Structure

### Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>...</title>
  <meta name="description" content="...">
  <link rel="canonical" href="...">
  <script type="application/ld+json">...</script>
</head>
<body>
  <header role="banner">
    <!-- Site navigation -->
  </header>
  
  <main role="main">
    <article>
      <header>
        <nav aria-label="Breadcrumb">...</nav>
        <h1>Primary Heading</h1>
      </header>
      
      <section aria-labelledby="section-1-heading">
        <h2 id="section-1-heading">Section Title</h2>
        <!-- Content -->
      </section>
      
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <!-- FAQs -->
      </section>
    </article>
    
    <aside>
      <!-- Related content -->
    </aside>
  </main>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

### Heading Hierarchy

```
H1: Page title (ONE per page)
├── H2: Major section
│   ├── H3: Subsection
│   │   └── H4: Detail (rare)
│   └── H3: Subsection
├── H2: Major section
└── H2: FAQ
    ├── H3: Question 1
    └── H3: Question 2
```

## URL Optimization

### URL Best Practices

1. **Lowercase only**: `/tire-size/20x4-0/` not `/Tire-Size/20x4.0/`
2. **Hyphens for spaces**: `/cargo-ebike/` not `/cargo_ebike/`
3. **No special characters**: Replace `.` with `-` in tire sizes
4. **No trailing slashes**: Configure in `next.config.ts`
5. **Short but descriptive**: `/tire-size/20x4-0/` not `/tire-pressure-guide-for-20-inch-by-4-inch-fat-tires/`

### Tire Size URL Normalization

```typescript
function normalizeTireSizeForUrl(size: string): string {
  return size
    .toLowerCase()
    .replace(/\./g, '-')      // 20x3.0 → 20x3-0
    .replace(/\s+/g, '-')     // 700x 40c → 700x-40c
    .replace(/[^a-z0-9-x]/g, '') // Remove other special chars
    .replace(/-+/g, '-');     // Multiple hyphens → single
}

// Examples:
// "20x3.0" → "20x3-0"
// "26x4.0" → "26x4-0"
// "700x35c" → "700x35c"
// "27.5x2.2" → "27-5x2-2"
```

## Sitemap Configuration

Update `next-sitemap.config.js` to include programmatic pages:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ebikepsi.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/admin/*'],
  additionalPaths: async (config) => {
    const paths = [];
    
    // Add tire size pages
    const tireSizes = ['20x3-0', '20x4-0', '26x4-0', '27-5x2-2', /* ... */];
    for (const size of tireSizes) {
      paths.push({
        loc: `/tire-size/${size}`,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
    
    // Add category pages
    const categories = ['cargo', 'folding', 'commuter', 'moto-style'];
    for (const cat of categories) {
      paths.push({
        loc: `/${cat}-ebike-tire-pressure`,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
    
    return paths;
  },
};
```

## Robots.txt

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://ebikepsi.com/sitemap.xml

# Block API routes
Disallow: /api/

# Allow search engines to crawl everything else
Allow: /tire-size/
Allow: /compare/
Allow: /learn/
```

## Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTFB | < 600ms | Time to First Byte |
| FCP | < 1.8s | First Contentful Paint |

### Optimization Strategies

1. **Images**: Use Next.js `<Image>` with proper sizing
2. **Fonts**: Use `next/font` for optimized font loading
3. **Code Splitting**: Dynamic imports for heavy components
4. **Static Generation**: Use `generateStaticParams` for programmatic pages
5. **Caching**: Leverage ISR for frequently changing data

## Accessibility Requirements

- Minimum WCAG 2.1 AA compliance
- Color contrast ratio ≥ 4.5:1 for text
- All interactive elements keyboard accessible
- ARIA labels on icon-only buttons
- Skip-to-content link
- Focus indicators visible
- Screen reader testing with NVDA/VoiceOver

## Mobile Optimization

- Viewport meta tag present
- Touch targets ≥ 44x44px
- No horizontal scroll
- Readable text without zooming (16px minimum)
- Forms use appropriate input types
- Tables horizontally scroll on small screens

## Internationalization (i18n) Considerations

For UK/EU pages (`/ebike-tyre-pressure/`):

```tsx
// Use British spelling in content
const tireWord = isUKPage ? 'Tyre' : 'Tire';
const pressureUnit = isUKPage ? 'Bar' : 'PSI';

// Set lang attribute
<html lang={isUKPage ? 'en-GB' : 'en-US'}>

// Set locale in Open Graph
openGraph: {
  locale: isUKPage ? 'en_GB' : 'en_US',
}

// Hreflang tags for language variants
<link rel="alternate" hreflang="en-US" href="https://ebikepsi.com/..." />
<link rel="alternate" hreflang="en-GB" href="https://ebikepsi.com/ebike-tyre-pressure/..." />
```

## Testing Tools

| Tool | Purpose |
|------|---------|
| Google Search Console | Indexing, crawl errors, performance |
| Google Rich Results Test | Schema validation |
| PageSpeed Insights | Core Web Vitals |
| Lighthouse | Performance, accessibility, SEO |
| Screaming Frog | Crawl analysis |
| Ahrefs/Semrush | Backlinks, rankings |
