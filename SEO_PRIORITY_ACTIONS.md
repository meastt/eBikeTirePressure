# SEO Priority Action List
**Quick Reference Guide for Implementation**

## ✅ Progress Summary

**Week 1 Status:** ✅ **8 of 8 items completed (100%)**  
**Week 2 Status:** ✅ **2 of 3 items completed (67%)**  
**Week 3 Status:** ✅ **3 of 3 items completed (100%)**

**Week 1 Completed:**
- ✅ BreadcrumbList Schema (all pages: blog, models, brands, FAQ)
- ✅ Organization Schema (root layout)
- ✅ SoftwareApplication Schema (calculator)
- ✅ HowTo Schema (calculator + 2 tutorial blog posts)
- ✅ Enhanced BlogPosting Schema (dateModified, articleSection, inLanguage)
- ✅ Author Schema fix (Person instead of Organization)
- ✅ Article Schema (added alongside BlogPosting)
- ✅ Homepage FAQ Schema

**Week 2 Completed:**
- ✅ Meta Description Audit (all pages optimized)
- ✅ Image Alt Text Audit (all images have proper alt text + ImageObject schema)
- ⚠️ Table of Contents Schema (deferred - requires MDX parsing)

**Week 3 Completed:**
- ✅ Product Schema Enhancements (added offers)
- ✅ Heading Hierarchy Audit (verified proper structure)
- ✅ Category/Tag Schema (keywords meta tag added)

**Ongoing Items Completed:**
- ✅ Last Updated Dates (dateModified support added)
- ✅ WebSite Schema with SearchAction (added to layout)

---

## 🚀 Week 1: Critical AI-Search Optimizations (12-18 hours)

### 1. ✅ BreadcrumbList Schema (2-3 hours) **COMPLETED**
**Files to modify:**
- `app/blog/[slug]/page.tsx`
- `app/models/[slug]/page.tsx`
- `app/brands/[brand]/page.tsx`
- `app/brands/[brand]/[...slug]/page.tsx`
- `app/faq/page.tsx`

**What to add:**
```json
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
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://ebikepsi.com/blog"
    }
  ]
}
```

---

### 2. ✅ Organization Schema on Homepage (1-2 hours) **COMPLETED**
**File:** `app/layout.tsx` or `app/(site)/page.tsx`

**What to add:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "E-Bike PSI",
  "url": "https://ebikepsi.com",
  "logo": "https://ebikepsi.com/logo.svg",
  "description": "Professional e-bike tire pressure calculator and guides",
  "sameAs": [] // Add social profiles if you have them
}
```

---

### 3. ✅ SoftwareApplication Schema for Calculator (2-3 hours) **COMPLETED**
**File:** `app/calculate/page.tsx`

**What to add:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "E-Bike Tire Pressure Calculator",
  "description": "Calculate optimal tire pressure for your e-bike based on weight, cargo, and terrain",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://ebikepsi.com/calculate"
}
```

---

### 4. ✅ HowTo Schema for Tutorial Content (4-6 hours) **COMPLETED**
**Files:** Create helper in `lib/schema.ts`, add to relevant blog posts

**What to add:**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate E-Bike Tire Pressure",
  "description": "Step-by-step guide to finding optimal PSI",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Select Your Bike Model",
      "text": "Choose your e-bike model from the database"
    }
  ]
}
```

---

### 5. ✅ Enhanced BlogPosting Schema (1-2 hours) **COMPLETED**
**File:** `app/blog/[slug]/page.tsx`

**What to fix:**
- Add `dateModified` field
- Add `articleSection` from tags
- Add `inLanguage: "en-US"`
- Consider adding `Article` schema alongside `BlogPosting`

---

### 6. ✅ Fix Author Schema (Person vs Organization) (1-2 hours) **COMPLETED**
**File:** `app/blog/[slug]/page.tsx`

**Change from:**
```json
"author": {
  "@type": "Organization",
  "name": "E-Bike PSI"
}
```

**To:**
```json
"author": {
  "@type": "Person",
  "name": "E-Bike PSI Team"
},
"publisher": {
  "@type": "Organization",
  "name": "E-Bike PSI"
}
```

---

### 7. ✅ Add Article Schema to Blog Posts (2-3 hours) **COMPLETED**
**File:** `app/blog/[slug]/page.tsx`

**Add alongside BlogPosting:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "image": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": {...},
  "publisher": {...}
}
```

---

### 8. ✅ Homepage FAQ Schema (1 hour) **COMPLETED**
**File:** `app/(site)/page.tsx`

**Add 3-5 key FAQs:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What PSI should I run on my e-bike?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

---

## 📋 Week 2: Content & Semantic SEO (8-12 hours)

### 9. ✅ Meta Description Audit (4-6 hours) **COMPLETED**
- ✅ Reviewed all key pages
- ✅ Optimized FAQ and Blog descriptions (now 150-160 chars)
- ✅ Model/brand pages use dynamic descriptions (optimal length, include keywords)
- ✅ All descriptions include primary keywords naturally
- ✅ Descriptions are unique per page
- ✅ All within 150-160 character optimal range

### 10. ✅ Image Alt Text Audit (3-4 hours) **COMPLETED**
- ✅ Fixed empty alt text on homepage feature icons
- ✅ Logo has proper alt text ("E-Bike PSI Logo")
- ✅ Blog post ogImages have ImageObject schema
- ✅ All decorative icons have descriptive alt text
- ✅ Note: MDX blog content images handled by Prose component (should have alt in MDX)

### 11. Table of Contents Schema (3-4 hours) ⚠️ **DEFERRED**
- ⚠️ Identify long articles (2000+ words) - Most blog posts are comprehensive
- ⚠️ Add visual TOC component
- ⚠️ Add structured data (Article with hasPart or TableOfContents)
- **Note:** This requires MDX parsing to extract headings. Can be added later as enhancement.

---

## 🔧 Week 3: Technical Enhancements (6-8 hours)

### 12. ✅ Product Schema Enhancements (2-3 hours) **COMPLETED**
- ✅ Added offers schema (free tool/service)
- ⚠️ aggregateRating - Not applicable (no user reviews yet)
- ⚠️ review schema - Not applicable (no reviews yet)
- ✅ Enhanced with offers (price: 0, availability: InStock)

### 13. ✅ Heading Hierarchy Audit (2-3 hours) **COMPLETED**
- ✅ Checked all pages - proper H1-H6 hierarchy
- ✅ One H1 per page (verified: homepage, blog posts, model pages, brand pages)
- ✅ Logical heading order maintained
- ✅ Headings used semantically (not just styling)

### 14. ✅ Category/Tag Schema (2-3 hours) **COMPLETED**
- ✅ Added keywords meta tag to blog posts (from tags array)
- ✅ articleSection already in Article schema (uses first tag)
- ⚠️ Tag pages - Can be added later if needed for content organization

---

## 🎯 Ongoing: Advanced Optimizations

### 15. Topic Clusters (8-12 hours)
- Map content into clusters
- Create pillar pages
- Improve internal linking

### 16. Author Bios (4-6 hours)
- Create author pages
- Add Person schema
- Link from blog posts

### 17. ✅ Last Updated Dates (2-3 hours) **COMPLETED**
- ✅ Added dateModified to BlogPost interface
- ✅ Extracts dateModified from frontmatter or uses file modification time
- ✅ Displays "Updated" date on blog posts when different from published date
- ✅ Uses dateModified in BlogPosting and Article schemas
- ✅ Falls back to published date if not specified

---

## ✅ Validation Checklist

After implementing each item, validate with:
- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Schema.org Validator: https://validator.schema.org/
- [ ] Google Search Console (monitor rich results)
- [ ] Test in Google SGE, Perplexity, ChatGPT

---

## 📊 Expected Impact

**Priority 1 (Week 1):**
- Rich snippets in search results
- AI search visibility
- Better click-through rates
- Knowledge Graph eligibility

**Priority 2 (Week 2):**
- Improved content understanding
- Better image search visibility
- Enhanced user experience

**Priority 3 (Week 3):**
- Technical SEO improvements
- Better content organization
- Enhanced semantic structure

---

## 🚨 Critical Missing Elements (Fix First)

1. ✅ **BreadcrumbList Schema** - ✅ COMPLETED - Added to blog, models, brands, FAQ pages
2. ✅ **Organization Schema** - ✅ COMPLETED - Added to root layout
3. ✅ **HowTo Schema** - ✅ COMPLETED - Added to calculator and tutorial blog posts
4. ✅ **SoftwareApplication Schema** - ✅ COMPLETED - Added to calculate page layout
5. ✅ **Article Schema** - ✅ COMPLETED - Added alongside BlogPosting on blog posts
6. ✅ **Author Person Schema** - ✅ COMPLETED - Changed from Organization to Person

---

## 💡 Quick Implementation Tips

1. **Start with schema helpers:** Create reusable functions in `lib/schema.ts`
2. **Test incrementally:** Validate each schema addition
3. **Monitor Search Console:** Watch for rich result errors
4. **Keep it simple:** Don't over-engineer, focus on accuracy
5. **Document changes:** Note what you added and why

---

**Last Updated:** January 2025  
**Status:** ✅ **14 of 15 Priority Items Completed (93%)**  
**See SEO_IMPLEMENTATION_SUMMARY.md for complete details**

