# SEO/GEO Priority Action Plan (Updated)
**Site:** ebikepsi.com  
**Updated:** March 28, 2026  
**Scope:** Traditional SEO + AI-driven search (AI Overviews, LLM answer engines) + international/geo SEO

---

## 1) What was reviewed

### Root SEO/GEO planning docs found
- `SEO_AUDIT_REPORT.md` (January 2025 baseline audit)
- `SEO_PRIORITY_ACTIONS.md` (this execution plan)
- `SEO_IMPLEMENTATION_SUMMARY.md` (implementation summary)
- `TECHNICAL_SEO_GEO_AUDIT_2026.md` (March 9, 2026 technical audit)
- `SEO-CONTENT-PLAN.md` (content planning)

### Current implementation spot checks (March 28, 2026)
- Technical SEO fundamentals in place: `metadataBase`, structured data scripts (Organization/WebSite), robots/sitemap wiring, and production redirect policy.
- GEO foundation in place: UK variant page with language alternates + dynamic location pages route.
- Mixed canonical implementation patterns remain (some dynamic, some hardcoded absolute URLs).

---

## 2) Current state summary (as of March 28, 2026)

## ✅ Strong / already implemented
1. **Core schema coverage is strong**: Organization + WebSite schema in root layout, FAQ schema on homepage, and broad use of structured data across key templates.
2. **Geo-intent coverage exists**: US (`/ebike-tire-pressure`) + UK (`/ebike-tyre-pressure`) setup and location-based dynamic route (`/[location]-ebike-tire-pressure`).
3. **Crawl control is healthy**: robots.txt includes host + sitemap, next-sitemap configured with dynamic paths and strategic exclusions.
4. **Domain canonicalization protection exists**: www → apex redirect configured at edge level.

## ⚠️ Gaps that still need completion
1. **Canonical URL consistency is incomplete**
   - Multiple templates still hardcode production URL strings while others use helper-based URLs.
   - Risk: drift between preview/staging/prod signals and inconsistent maintenance.

2. **Hreflang architecture is only partially expanded**
   - US/UK pair is implemented for the model index pages, but equivalent language alternates are not systematically deployed where region variants are semantically paired.

3. **Sitemap freshness strategy is partly synthetic**
   - Many entries still use build-time `new Date().toISOString()` for `lastmod` instead of true content update timestamps.
   - This can weaken freshness trust in crawlers and AI retrievers over time.

4. **AI-search readiness instrumentation is missing from plan execution**
   - Existing docs focus mostly on classic on-page/schema technical SEO.
   - No explicit monitoring loop for AI citation visibility, entity consistency, or answer extraction quality.

5. **High-intent trust pages are excluded from sitemap**
   - Privacy and Terms are currently excluded; this is acceptable technically, but including them can support trust and transparency signals.

---

## 3) Updated priority plan (what to do next)

## Phase 1 (Week 1): Canonical + hreflang stabilization
**Goal:** Eliminate conflicting URL signals.

1. **Unify canonical generation strategy**
   - Standardize metadata generation to one source of truth (production canonical domain for indexed pages).
   - Remove template-by-template hardcoded canonical literals where not necessary.

2. **Create hreflang parity matrix**
   - Inventory all US/UK counterpart pages.
   - Ensure bidirectional `alternates.languages` for each counterpart pair.
   - Add `x-default` where a neutral default is needed.

3. **Validate in production**
   - Run URL-level checks for canonical + hreflang reciprocity.
   - Re-submit sitemap after rollout.

**Definition of done:**
- No mixed canonical strategy across indexable templates.
- 100% reciprocal hreflang for all mapped US/UK pairs.

---

## Phase 2 (Weeks 2–3): Sitemap and indexing quality improvements
**Goal:** Improve crawler trust and recrawl quality.

1. **Replace synthetic `lastmod` where possible**
   - Use source-of-truth timestamps (content frontmatter, model data update timestamp, or persisted content revision date).

2. **Review exclusions for trust/support pages**
   - Decide whether to include `/privacy` and `/terms` in sitemap.
   - Keep only truly non-indexable/system endpoints excluded.

3. **Run indexing QA**
   - Verify top templates return expected canonical, robots directives, and schema without conflicts.

**Definition of done:**
- `lastmod` reflects real update cadence for key templates.
- Sitemap policy intentionally documented and consistent.

---

## Phase 3 (Weeks 3–6): GEO expansion + AI-search optimization
**Goal:** Win more long-tail discovery from both SERPs and AI answers.

1. **Scale location-page quality controls**
   - Maintain minimum unique-local-content standards (climate, terrain, commuting context, FAQs).
   - Prevent thin/copy-variant city pages by enforcing unique local variables + useful comparative guidance.

2. **Strengthen entity consistency for AI retrievers**
   - Keep organization/profile metadata consistent across schema, on-page mentions, and about/trust sections.
   - Add/expand “methodology” and “how recommendations are derived” sections on key pages.

3. **Improve answer extraction for LLM systems**
   - Add concise Q/A blocks and summary tables on high-intent pages.
   - Keep heading hierarchy and direct-answer formatting strict and consistent.

4. **Add AI-search performance tracking loop**
   - Track: impressions/clicks for question-led queries, branded vs non-branded growth, and referral patterns from AI surfaces where detectable.
   - Establish monthly audit: “Which pages are being cited? Which answers are missing?”

**Definition of done:**
- GEO templates have quality guardrails and no obvious thin-page patterns.
- Monthly AI-search/answer-visibility review process is active.

---

## 4) KPI framework (to measure success)

### Technical KPIs
- % indexable templates with standardized canonical implementation
- % mapped regional page pairs with reciprocal hreflang
- % sitemap URLs with authoritative (non-synthetic) lastmod values

### Organic search KPIs
- Non-branded clicks/impressions (GSC)
- CTR change on key landing pages
- Ranking coverage for “[model] tire pressure”, “[city] ebike tire pressure”, and “how to” query families

### AI-discovery KPIs
- Frequency of citation/mention in AI answers for target query sets
- Share of pages with explicit extractable answer blocks
- Growth in question-intent landing page sessions

---

## 5) Immediate execution checklist

## This sprint (next 7 days)
- [ ] Canonical normalization spec written and approved
- [ ] US/UK hreflang map documented and implemented for mapped pairs
- [ ] Template QA pass for canonical/hreflang/schema conflicts

## Next sprint (days 8–21)
- [ ] Sitemap `lastmod` refactor to real update dates for core templates
- [ ] Decision and implementation on Privacy/Terms sitemap inclusion
- [ ] AI-answer formatting improvements on top 10 organic landing pages

## Ongoing (monthly)
- [ ] Technical SEO regression audit
- [ ] AI answer-surface/citation audit
- [ ] GEO page quality review (thinness + duplication checks)

---

## 6) Notes for maintainers
- This plan supersedes older completion percentages that reflected an earlier implementation snapshot.
- Keep this file as the single source of truth for “current state vs remaining work.”
