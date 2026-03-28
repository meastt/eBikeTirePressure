# E-Bike PSI — SEO/GEO Growth Plan

**Created:** March 28, 2026
**Current Grade:** B+ (strong foundation, growth phase)
**Site:** https://ebikepsi.com

---

## Current State Summary

### What's Working Well ✅
- 152 e-bike models across 45 brands (strong programmatic content base)
- 17 blog posts covering key topics (tire pressure, safety, terrain, maintenance)
- ~350+ URLs in sitemap (models, brands, tire sizes, categories, blog)
- Structured data: Organization, WebSite+SearchAction, FAQPage, SoftwareApplication, HowTo, BreadcrumbList, Article/BlogPosting — 7+ schema types
- UK/EU page with Bar+PSI units (`/ebike-tyre-pressure`)
- hreflang cross-linking between en-US and en-GB variants
- PWA support (installable, offline-capable)
- llms.txt for AI search discovery
- CI pipeline passing (pnpm, Node 22)
- Vercel deployment stable
- All meta descriptions present and unique
- Clean URL structure with proper redirects
- robots.txt and sitemap correctly configured
- www and vercel.app domain redirects working

### Key Gaps to Address
- Limited GEO coverage (only UK, no DE/NL/AU/CA)
- Calculator page renders entirely client-side (minimal content for crawlers)
- Some programmatic pages could have richer content
- No video or visual content
- Limited backlink profile (no link building done)
- No Google Search Console data visible to us

---

## Phase 1: Technical Quick Wins (Week 1)

### 1.1 Calculator Server-Side Content
**Impact:** High | **Effort:** Medium

The `/calculate` page renders entirely client-side. Googlebot can execute JS, but server-rendered content indexes faster and more reliably.

**Action:**
- Add a server-rendered `<noscript>` section with static PSI reference charts
- Add server-rendered intro paragraph explaining the calculator
- Ensure the HowTo schema steps are server-rendered (not client-only)

### 1.2 Blog Content Expansion
**Impact:** High | **Effort:** Medium

Target high-volume search queries that are currently missing:

| Target Keyword | Est. Monthly Searches | Content Type |
|---|---|---|
| "ebike tire pressure chart" | 1,000+ | New blog post |
| "how much air in ebike tires" | 800+ | New blog post / FAQ |
| "ebike vs regular bike tire pressure" | 500+ | Comparison post |
| "best tire pressure gauge for ebike" | 400+ | Product roundup |
| "ebike tire pressure for winter" | 300+ | Seasonal guide |
| "tubeless ebike tire pressure chart" | 300+ | New blog post |
| "how to check ebike tire pressure" | 250+ | Tutorial |
| "ebike tire pressure for hills" | 200+ | Terrain-specific |

**Action:** Write 4-6 new blog posts targeting these keywords.

### 1.3 Internal Linking Strengthening
**Impact:** Medium | **Effort:** Low

- Add "Related Models" section to each model page (currently exists on some)
- Cross-link blog posts to relevant model/brand pages
- Add "Popular Tire Sizes" section linking to `/tire-size/[size]` pages
- Ensure every programmatic page links back to at least 2-3 other pages

---

## Phase 2: GEO Expansion (Weeks 2-3)

### 2.1 German (DE) Page
**Impact:** High | **Effort:** Medium

Germany is the #2 e-bike market globally. Create `/e-bike-reifendruck`:
- Translate key content to German
- PSI + Bar units (Bar is standard in DE)
- Feature German brands: Cube, Canyon, Riese & Müller, Gazelle, Kalkhoff
- Add hreflang tags: `de-DE`, `x-default` → en-US

### 2.2 Dutch (NL) Page
**Impact:** Medium | **Effort:** Medium

Netherlands has the highest e-bike adoption rate. Create `/e-bike-bandenspanning`:
- Dutch translation
- Feature Dutch/EU brands: Gazelle, VanMoof, Stella, Cortina
- hreflang: `nl-NL`

### 2.3 Australian (AU) Page
**Impact:** Low-Medium | **Effort:** Low

English variant — easy win. Create `/ebike-tyre-pressure-au` or reuse UK content with AU-specific brands and climate notes.
- hreflang: `en-AU`

### 2.4 Canadian (CA) Page
**Impact:** Low-Medium | **Effort:** Low

Large and growing e-bike market. English variant with cold-weather focus.
- hreflang: `en-CA`

### 2.5 hreflang Infrastructure
**Action:** Update the root layout and all relevant pages to include hreflang cross-references:
```html
<link rel="alternate" hreflang="en-US" href="https://ebikepsi.com/ebike-tire-pressure" />
<link rel="alternate" hreflang="en-GB" href="https://ebikepsi.com/ebike-tyre-pressure" />
<link rel="alternate" hreflang="de-DE" href="https://ebikepsi.com/e-bike-reifendruck" />
<link rel="alternate" hreflang="nl-NL" href="https://ebikepsi.com/e-bike-bandenspanning" />
<link rel="alternate" hreflang="x-default" href="https://ebikepsi.com/ebike-tire-pressure" />
```

---

## Phase 3: Content Authority (Weeks 3-6)

### 3.1 Expert E-E-A-T Signals
**Impact:** High | **Effort:** Medium

Google's Helpful Content system rewards Experience, Expertise, Authoritativeness, Trust.

**Actions:**
- Add an `/about` page with:
  - Who built the calculator and why
  - Expertise credentials (cycling background, engineering, data methodology)
  - How the PSI algorithm works (technical explanation)
- Add author bios to blog posts
- Add "Last reviewed: [date]" to model pages
- Cite sources (tire manufacturer specs, ISO standards)

### 3.2 Programmatic Content Enrichment
**Impact:** Medium | **Effort:** Medium

Current model pages have good content but could be richer:
- Add "Comparison" sections (e.g., "RadRunner Plus vs Lectric XP 3: tire pressure differences")
- Add seasonal adjustment notes per model
- Add real-world range impact data (e.g., "Under-inflated tires reduce range by 5-15%")
- Add tire brand recommendations per model size

### 3.3 Video Content (Future)
**Impact:** High | **Effort:** High

- YouTube channel with "How to check e-bike tire pressure" tutorials
- Model-specific tire pressure walkthroughs
- Embed videos on relevant pages (VideoObject schema)

---

## Phase 4: AI Search Optimization (Ongoing)

### 4.1 llms.txt (Done ✅)
Created at `/llms.txt`. Monitor adoption by AI crawlers.

### 4.2 Structured Q&A Content
**Impact:** Medium | **Effort:** Low

AI models (ChatGPT, Perplexity, Gemini) pull from well-structured Q&A content.

**Actions:**
- Ensure every blog post has a clear Q&A section
- Format answers concisely (40-60 words) for AI extraction
- Add "Quick Answer" boxes at the top of long-form content

### 4.3 Citation-Ready Content
**Impact:** Medium | **Effort:** Low

Make content easy for AI to cite:
- Use definitive statements with data ("Most e-bikes run 20-50 PSI")
- Include specific numbers and ranges
- Avoid hedging language in factual sections

---

## Phase 5: Link Building & Off-Page (Weeks 6+)

### 5.1 Community Participation
- Reddit r/ebikes — Answer tire pressure questions, link to calculator
- Pedelecforum.de (German e-bike forum)
- ElectricBikeReview.com forums
- Facebook e-bike groups

### 5.2 Guest Posts & Partnerships
- Write tire pressure guides for e-bike publications (Electrek, CleanTechnica, BikeRadar)
- Partner with tire manufacturers for spec data links
- Get listed on e-bike resource pages

### 5.3 Tool Embeds
- Create an embeddable widget for e-bike blogs
- "Powered by E-Bike PSI" backlink

---

## KPIs to Track

### Technical
- [ ] All pages indexed in Google Search Console
- [ ] 0 crawl errors
- [ ] Core Web Vitals all green
- [ ] CI always passing

### Organic Search
- [ ] Organic traffic growth (target: 2x in 6 months)
- [ ] Top 10 rankings for "ebike tire pressure calculator"
- [ ] Top 10 rankings for "[brand] tire pressure" (top 10 brands)
- [ ] Featured snippets for FAQ questions

### AI Discovery
- [ ] llms.txt crawled by AI bots
- [ ] Cited in AI search results (ChatGPT, Perplexity, Gemini)
- [ ] Referral traffic from AI sources

### GEO
- [ ] German page ranking in google.de
- [ ] UK page ranking in google.co.uk
- [ ] Dutch page ranking in google.nl

---

## Execution Priority

| Order | Task | Phase | Impact | Effort |
|---|---|---|---|---|
| 1 | Calculator SSR content | 1 | High | Medium |
| 2 | Blog post: "ebike tire pressure chart" | 1 | High | Medium |
| 3 | Blog post: "how much air in ebike tires" | 1 | High | Medium |
| 4 | German (DE) page | 2 | High | Medium |
| 5 | About page + E-E-A-T | 3 | High | Medium |
| 6 | Dutch (NL) page | 2 | Medium | Medium |
| 7 | Internal linking audit | 1 | Medium | Low |
| 8 | Blog post: "best tire pressure gauge" | 1 | Medium | Medium |
| 9 | Australian page | 2 | Low-Med | Low |
| 10 | Community participation | 5 | Medium | Ongoing |

---

*This plan should be reviewed and updated monthly.*
