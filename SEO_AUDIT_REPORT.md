# SEO & AI-Search SEO Audit Report
**Date:** January 2025  
**Site:** ebikepsi.com  
**Focus:** Traditional SEO + AI-Search Optimization

---

## Executive Summary

Your site has a solid SEO foundation with meta tags, structured data, and good technical setup. However, there are significant opportunities to improve AI-search visibility (Google's AI Overviews, Perplexity, ChatGPT) and traditional search rankings. This report prioritizes improvements by impact and effort.

---

## Priority 1: Critical AI-Search SEO (High Impact, Medium Effort)

### 1.1 Add BreadcrumbList Structured Data ⚠️ **MISSING**
**Impact:** HIGH - Enables rich snippets and AI understanding of site hierarchy  
**Current State:** Visual breadcrumbs exist but no structured data  
**Action Required:**
- Add `BreadcrumbList` JSON-LD to all pages with breadcrumbs
- Implement in: blog posts, model pages, brand pages, FAQ
- Example locations: `/app/blog/[slug]/page.tsx`, `/app/models/[slug]/page.tsx`

**Expected Benefit:** 
- Rich breadcrumb snippets in search results
- Better AI understanding of content relationships
- Improved click-through rates

---

### 1.2 Add Organization Schema to Homepage ⚠️ **MISSING**
**Impact:** HIGH - Establishes brand authority for AI systems  
**Current State:** No Organization schema on homepage  
**Action Required:**
- Add `Organization` JSON-LD to root layout or homepage
- Include: name, logo, url, description, sameAs (social profiles if any)
- Add `WebSite` schema with `potentialAction` (SearchAction) for site search

**Expected Benefit:**
- Brand recognition in AI responses
- Knowledge Graph eligibility
- Enhanced brand authority signals

---

### 1.3 Add HowTo Schema for Calculator/Tutorial Content ⚠️ **MISSING**
**Impact:** HIGH - Enables step-by-step rich results and AI citations  
**Current State:** No HowTo schema despite having tutorial content  
**Action Required:**
- Create `HowTo` schema for:
  - Calculator usage guide
  - "How to check tire pressure" tutorial
  - "How to adjust PSI for terrain" guides
- Add to relevant blog posts and FAQ entries
- Include step-by-step instructions with `HowToStep` items

**Expected Benefit:**
- Rich "How to" snippets in search
- AI systems can cite your step-by-step instructions
- Higher visibility in voice search

---

### 1.4 Add SoftwareApplication Schema for Calculator Tool ⚠️ **MISSING**
**Impact:** HIGH - Positions calculator as a tool, not just content  
**Current State:** Calculator exists but no structured data  
**Action Required:**
- Add `SoftwareApplication` or `WebApplication` schema to `/calculate` page
- Include: name, description, applicationCategory, operatingSystem, offers (free)
- Link to `HowTo` schema for usage instructions

**Expected Benefit:**
- Calculator appears as a tool in search results
- AI systems understand it's an interactive application
- Better categorization in search engines

---

### 1.5 Enhance BlogPosting Schema with Missing Fields ⚠️ **INCOMPLETE**
**Impact:** MEDIUM-HIGH - Better article understanding  
**Current State:** Basic BlogPosting schema exists but missing key fields  
**Action Required:**
- Add `dateModified` (currently only has `datePublished`)
- Add `articleSection` (category/tag)
- Add `keywords` from tags array
- Add `inLanguage` ("en-US")
- Consider adding `Article` schema alongside `BlogPosting` for better compatibility

**Expected Benefit:**
- More complete article understanding
- Better freshness signals
- Improved categorization

---

## Priority 2: Content & Semantic SEO (High Impact, Low-Medium Effort)

### 2.1 Add Article Schema to Blog Posts ⚠️ **MISSING**
**Impact:** MEDIUM-HIGH - Better article recognition  
**Current State:** Only BlogPosting schema, no Article schema  
**Action Required:**
- Add `Article` schema alongside `BlogPosting`
- Include: headline, description, image, datePublished, dateModified, author
- Use `mainEntityOfPage` properly

**Expected Benefit:**
- Dual schema coverage (some systems prefer Article)
- Better article recognition
- Enhanced rich snippets

---

### 2.2 Implement Proper Author Schema (Person vs Organization) ⚠️ **INCOMPLETE**
**Impact:** MEDIUM - Author authority signals  
**Current State:** Author is Organization, should be Person for blog posts  
**Action Required:**
- Change blog post author from `Organization` to `Person`
- Add Person schema with name, jobTitle, affiliation
- Keep Organization for publisher

**Expected Benefit:**
- Better author attribution
- E-A-T (Expertise, Authoritativeness, Trustworthiness) signals
- Author recognition in search

---

### 2.3 Add FAQ Schema to Homepage ⚠️ **MISSING**
**Impact:** MEDIUM - Homepage FAQ rich snippets  
**Current State:** FAQ schema only on `/faq` page  
**Action Required:**
- Extract 3-5 most important FAQs
- Add FAQPage schema to homepage
- Link to full FAQ page

**Expected Benefit:**
- FAQ rich snippets on homepage
- AI systems can answer questions directly
- Higher click-through rates

---

### 2.4 Optimize Meta Descriptions Length & Quality ⚠️ **NEEDS REVIEW**
**Impact:** MEDIUM - Click-through rate optimization  
**Current State:** Descriptions exist but may be too long/short  
**Action Required:**
- Audit all meta descriptions
- Ensure 150-160 characters (optimal length)
- Include primary keyword naturally
- Add call-to-action where appropriate
- Check for uniqueness across pages

**Expected Benefit:**
- Better search result appearance
- Higher click-through rates
- Improved relevance signals

---

### 2.5 Add Image Structured Data & Alt Text Audit ⚠️ **NEEDS REVIEW**
**Impact:** MEDIUM - Image search visibility  
**Current State:** Unknown alt text coverage  
**Action Required:**
- Audit all images for descriptive alt text
- Add `ImageObject` schema for important images
- Ensure logo has proper alt text
- Add `og:image` dimensions (width/height) to all pages

**Expected Benefit:**
- Image search visibility
- Better accessibility
- Rich image snippets

---

## Priority 3: Technical SEO Enhancements (Medium Impact, Low Effort)

### 3.1 Add Table of Contents Schema for Long Articles ⚠️ **MISSING**
**Impact:** MEDIUM - Better article structure understanding  
**Current State:** Long blog posts exist but no TOC schema  
**Action Required:**
- Identify blog posts with 2000+ words
- Add visual table of contents
- Add `TableOfContents` or use `Article` with `hasPart` for sections

**Expected Benefit:**
- Better article structure understanding
- Jump-to links in search results
- Improved user experience

---

### 3.2 Enhance Product Schema with Reviews/Ratings ⚠️ **MISSING**
**Impact:** MEDIUM - Product rich snippets  
**Current State:** Basic Product schema, no ratings  
**Action Required:**
- Add `aggregateRating` to Product schema (if you collect reviews)
- Add `review` schema if you have user reviews
- Consider adding `offers` if applicable

**Expected Benefit:**
- Star ratings in search results
- Higher click-through rates
- Trust signals

---

### 3.3 Add Category/Tag Schema for Blog Posts ⚠️ **MISSING**
**Impact:** LOW-MEDIUM - Better content organization  
**Current State:** Tags exist but no structured data  
**Action Required:**
- Add `keywords` meta tag from tags
- Consider adding `articleSection` in Article schema
- Add tag pages with proper schema

**Expected Benefit:**
- Better content categorization
- Tag page indexing
- Improved internal linking

---

### 3.4 Optimize Heading Hierarchy ⚠️ **NEEDS AUDIT**
**Impact:** MEDIUM - Content structure understanding  
**Current State:** Unknown - needs audit  
**Action Required:**
- Audit all pages for proper H1-H6 hierarchy
- Ensure one H1 per page
- Verify logical heading order
- Use headings semantically (not just styling)

**Expected Benefit:**
- Better content understanding
- Improved accessibility
- Enhanced semantic structure

---

### 3.5 Add Last Modified Dates to Sitemap ⚠️ **INCOMPLETE**
**Impact:** LOW-MEDIUM - Freshness signals  
**Current State:** Sitemap has lastmod but may not be accurate  
**Action Required:**
- Ensure accurate `lastmod` dates in sitemap
- Update when content changes
- Consider adding `changefreq` more strategically

**Expected Benefit:**
- Better freshness signals
- More frequent crawling of updated content
- Improved indexing

---

## Priority 4: Advanced AI-Search Optimizations (Medium Impact, High Effort)

### 4.1 Create Comprehensive Topic Clusters ⚠️ **NEEDS IMPROVEMENT**
**Impact:** HIGH - Authority building  
**Current State:** Content exists but may not be optimally clustered  
**Action Required:**
- Map content into topic clusters (e.g., "Fat Tire PSI", "Cargo Bike PSI", "Terrain Adjustments")
- Create pillar pages for each cluster
- Add internal linking between related content
- Use consistent terminology

**Expected Benefit:**
- Topic authority
- Better AI understanding of expertise
- Improved rankings for cluster topics

---

### 4.2 Add VideoObject Schema (Future-Proofing) ⚠️ **MISSING**
**Impact:** MEDIUM - Video search visibility  
**Current State:** No video content currently  
**Action Required:**
- If adding video tutorials, add `VideoObject` schema
- Include: name, description, thumbnailUrl, uploadDate, duration
- Add to relevant pages

**Expected Benefit:**
- Video search visibility
- Rich video snippets
- Future-proofing for video content

---

### 4.3 Implement Entity Markup for E-Bike Brands/Models ⚠️ **MISSING**
**Impact:** MEDIUM - Brand/model recognition  
**Current State:** Models listed but no entity markup  
**Action Required:**
- Add entity recognition for bike brands/models
- Use proper capitalization and consistent naming
- Consider adding brand pages with proper schema

**Expected Benefit:**
- Better brand recognition
- Knowledge Graph connections
- Improved brand search visibility

---

### 4.4 Add LocalBusiness Schema (If Applicable) ⚠️ **N/A**
**Impact:** LOW - Only if you have physical location  
**Current State:** Appears to be online-only  
**Action Required:**
- Only if you have a physical business location
- Add LocalBusiness schema with address, hours, etc.

**Expected Benefit:**
- Local search visibility (if applicable)
- Google Business Profile integration

---

## Priority 5: Content Quality & E-A-T Signals (Ongoing)

### 5.1 Add Author Bios with Person Schema ⚠️ **MISSING**
**Impact:** MEDIUM - E-A-T signals  
**Current State:** Author is just a name  
**Action Required:**
- Create author bio pages
- Add Person schema with credentials, expertise
- Link from blog posts to author pages

**Expected Benefit:**
- Enhanced E-A-T signals
- Author authority
- Trust signals

---

### 5.2 Add "Last Updated" Dates to Content ⚠️ **MISSING**
**Impact:** MEDIUM - Freshness and accuracy signals  
**Current State:** Only publication dates  
**Action Required:**
- Add `dateModified` to all content
- Display "Last updated" on pages
- Update when content changes

**Expected Benefit:**
- Freshness signals
- Accuracy indicators
- Better user trust

---

### 5.3 Add Citations and Sources ⚠️ **NEEDS IMPROVEMENT**
**Impact:** MEDIUM - Authority signals  
**Current State:** Unknown citation practices  
**Action Required:**
- Cite authoritative sources (tire manufacturers, bike specs)
- Add reference links
- Use proper attribution

**Expected Benefit:**
- Authority signals
- Better AI understanding of sources
- Trust indicators

---

## Priority 6: Technical Performance (Already Good, Monitor)

### 6.1 Core Web Vitals Optimization ✅ **GOOD**
**Current State:** Appears optimized  
**Action Required:** Monitor and maintain

---

### 6.2 Mobile Optimization ✅ **GOOD**
**Current State:** Responsive design  
**Action Required:** Continue monitoring

---

### 6.3 Page Speed ✅ **GOOD**
**Current State:** Static generation, optimized  
**Action Required:** Monitor performance

---

## Implementation Priority Matrix

| Priority | Task | Impact | Effort | Estimated Time |
|----------|------|--------|--------|----------------|
| P1 | BreadcrumbList Schema | HIGH | Low | 2-3 hours |
| P1 | Organization Schema | HIGH | Low | 1-2 hours |
| P1 | HowTo Schema | HIGH | Medium | 4-6 hours |
| P1 | SoftwareApplication Schema | HIGH | Low | 2-3 hours |
| P1 | Enhanced BlogPosting | MEDIUM-HIGH | Low | 2-3 hours |
| P2 | Article Schema | MEDIUM-HIGH | Low | 2-3 hours |
| P2 | Author Schema (Person) | MEDIUM | Low | 1-2 hours |
| P2 | Homepage FAQ Schema | MEDIUM | Low | 1 hour |
| P2 | Meta Description Audit | MEDIUM | Medium | 4-6 hours |
| P2 | Image Alt Text Audit | MEDIUM | Medium | 3-4 hours |
| P3 | Table of Contents Schema | MEDIUM | Medium | 3-4 hours |
| P3 | Product Schema Enhancements | MEDIUM | Low | 2-3 hours |
| P3 | Heading Hierarchy Audit | MEDIUM | Medium | 2-3 hours |
| P4 | Topic Clusters | HIGH | High | 8-12 hours |
| P4 | VideoObject Schema | MEDIUM | Low | 1-2 hours (when needed) |
| P5 | Author Bios | MEDIUM | Medium | 4-6 hours |
| P5 | Last Updated Dates | MEDIUM | Low | 2-3 hours |

---

## Quick Wins (Do First - 1-2 Days)

1. ✅ Add BreadcrumbList schema (2-3 hours)
2. ✅ Add Organization schema to homepage (1-2 hours)
3. ✅ Add SoftwareApplication schema to calculator (2-3 hours)
4. ✅ Enhance BlogPosting with dateModified (1 hour)
5. ✅ Add Article schema to blog posts (2-3 hours)
6. ✅ Fix Author schema (Person vs Organization) (1-2 hours)
7. ✅ Add FAQ schema to homepage (1 hour)

**Total Quick Wins Time:** ~12-18 hours (1.5-2 days)

---

## AI-Search Specific Recommendations

### For Google AI Overviews / SGE:
- ✅ Comprehensive FAQ schema (you have this)
- ✅ HowTo schema for step-by-step content (MISSING - add this)
- ✅ Clear, concise answers to common questions
- ✅ Structured data for all key entities
- ✅ Author expertise signals

### For Perplexity / ChatGPT:
- ✅ Well-structured content with clear sections
- ✅ Comprehensive coverage of topics
- ✅ Proper citations and sources
- ✅ Entity recognition (brands, models, specifications)
- ✅ Clear, factual language

### For Voice Search:
- ✅ FAQ schema (you have this)
- ✅ HowTo schema (MISSING)
- ✅ Natural language in content
- ✅ Conversational question-answer format

---

## Testing & Validation

After implementation, validate with:
1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema.org Validator:** https://validator.schema.org/
3. **Google Search Console:** Monitor rich result performance
4. **AI Search Testing:** Test queries in Google SGE, Perplexity, ChatGPT

---

## Next Steps

1. **Week 1:** Implement Priority 1 items (Quick Wins)
2. **Week 2:** Implement Priority 2 items
3. **Week 3:** Audit and implement Priority 3 items
4. **Ongoing:** Monitor performance, iterate on Priority 4-5 items

---

## Notes

- Your current SEO foundation is solid
- Focus on structured data gaps for AI-search visibility
- Most improvements are low-to-medium effort with high impact
- Prioritize schema markup that AI systems can easily parse
- Continue creating high-quality, comprehensive content

---

**Report Generated:** January 2025  
**Next Review:** After Priority 1-2 implementation

