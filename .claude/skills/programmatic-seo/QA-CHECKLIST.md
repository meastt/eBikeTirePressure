# Quality Assurance Checklist

This document provides comprehensive QA checklists for programmatic SEO pages. Every page must pass these checks before deployment.

## Pre-Implementation Checklist

Before starting any programmatic page implementation:

- [ ] Reviewed `SKILL.md` for overall guidelines
- [ ] Reviewed `TECHNICAL-SEO.md` for technical requirements
- [ ] Reviewed `PAGE-TEMPLATES.md` for component structure
- [ ] Confirmed page type exists in `CONTENT-PLAN-DATA.md`
- [ ] Verified no duplicate/conflicting pages exist
- [ ] Confirmed data source (models.json) has required fields

---

## Development Checklist

### Code Quality

- [ ] TypeScript strict mode passes (`pnpm typecheck`)
- [ ] ESLint passes with no errors (`pnpm lint`)
- [ ] No `any` types used (use proper interfaces)
- [ ] No hardcoded strings that should be dynamic
- [ ] Components are properly exported
- [ ] Props interfaces are defined and exported
- [ ] Error boundaries handle edge cases

### File Structure

- [ ] Route file in correct directory
- [ ] `generateStaticParams()` implemented for dynamic routes
- [ ] `generateMetadata()` implemented with all required fields
- [ ] Shared components imported from correct paths
- [ ] No circular dependencies

### Data Handling

- [ ] Handles empty/missing data gracefully
- [ ] `notFound()` called when content doesn't exist
- [ ] Arrays are checked before mapping
- [ ] Numbers are validated/bounded
- [ ] Strings are trimmed and sanitized

---

## Content Quality Checklist

### H1 & Title

- [ ] H1 contains primary keyword naturally
- [ ] H1 is unique across the site
- [ ] Title tag is 50-60 characters
- [ ] Title includes brand/model name where relevant
- [ ] Title is compelling (not just keyword-stuffed)

### Meta Description

- [ ] Description is 150-160 characters
- [ ] Description includes primary keyword
- [ ] Description has clear value proposition
- [ ] Description includes call-to-action hint
- [ ] Description is unique for each page

### Body Content

- [ ] Minimum 300 words of unique content
- [ ] Content answers the search intent
- [ ] No obvious AI-generated filler
- [ ] Technical accuracy verified
- [ ] PSI values within realistic ranges
- [ ] No duplicate paragraphs from other pages

### Headings

- [ ] Only ONE H1 per page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] Headings are descriptive, not generic
- [ ] No skipped heading levels
- [ ] H2s include secondary keywords where natural

### Data Displays

- [ ] PSI tables show realistic values
- [ ] Model counts are accurate
- [ ] Brand names are spelled correctly
- [ ] Tire sizes display in readable format
- [ ] Numbers are formatted consistently (commas, decimals)

---

## Technical SEO Checklist

### Meta Tags

- [ ] Title tag present and unique
- [ ] Meta description present and unique
- [ ] Canonical URL set correctly
- [ ] No self-referencing canonical issues
- [ ] Open Graph title present
- [ ] Open Graph description present
- [ ] Open Graph type set (article/website)
- [ ] Twitter card meta present

### Schema Markup

- [ ] JSON-LD is valid (test with Google tool)
- [ ] BreadcrumbList schema present
- [ ] FAQPage schema present (if FAQ section exists)
- [ ] No schema errors in console
- [ ] Schema matches visible content
- [ ] All required schema fields populated

### URLs

- [ ] URL is lowercase
- [ ] URL uses hyphens (no underscores)
- [ ] No special characters in URL
- [ ] No trailing slash (or consistent trailing slash)
- [ ] URL is under 75 characters
- [ ] URL is human-readable

### Internal Linking

- [ ] Breadcrumb links work
- [ ] Related content links work
- [ ] Model/brand links resolve correctly
- [ ] Calculator CTA link works
- [ ] No broken internal links
- [ ] Anchor text is descriptive

### External Linking

- [ ] External links use `rel="noopener noreferrer"`
- [ ] External links open in new tab where appropriate
- [ ] No broken external links
- [ ] External links are to authoritative sources

---

## Accessibility Checklist

### Semantic HTML

- [ ] Uses proper landmark roles (main, nav, header, footer)
- [ ] Article/section elements used appropriately
- [ ] Lists use ul/ol/li elements
- [ ] Tables have proper thead/tbody structure

### Keyboard Navigation

- [ ] All interactive elements are focusable
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] Skip link present (if long page)

### Screen Readers

- [ ] Images have alt text
- [ ] Icons have aria-labels
- [ ] Form inputs have labels
- [ ] Tables have captions/headers
- [ ] Dynamic content is announced

### Visual

- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Text is readable without CSS
- [ ] No information conveyed by color alone
- [ ] Font size is minimum 16px for body

---

## Mobile Checklist

- [ ] Viewport meta tag present
- [ ] No horizontal scroll on 320px width
- [ ] Touch targets are minimum 44x44px
- [ ] Tables scroll horizontally if needed
- [ ] Text is readable without zooming
- [ ] Forms use appropriate input types
- [ ] No fixed-width elements breaking layout

---

## Performance Checklist

### Core Web Vitals

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTFB (Time to First Byte) < 600ms

### Optimization

- [ ] Images use Next.js Image component
- [ ] Images have width/height set
- [ ] No unnecessary client-side JavaScript
- [ ] Static generation used where possible
- [ ] No blocking resources

### Lighthouse Scores

- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

---

## Cross-Browser Checklist

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS
- [ ] Chrome Android

---

## Internationalization Checklist (UK/EU Pages)

- [ ] British spelling used consistently (tyre, colour, etc.)
- [ ] Bar units displayed with PSI conversion
- [ ] Lang attribute set to "en-GB"
- [ ] UK/EU brands featured prominently
- [ ] Hreflang tags set correctly
- [ ] No US-specific references without context

---

## Pre-Deploy Checklist

### Build

- [ ] `pnpm build` completes without errors
- [ ] No TypeScript errors
- [ ] No console warnings during build
- [ ] Static pages generated correctly
- [ ] Sitemap includes new pages

### Review

- [ ] Self-reviewed all changes
- [ ] Tested locally in production mode (`pnpm build && pnpm start`)
- [ ] Verified on mobile device/emulator
- [ ] Checked in multiple browsers
- [ ] Reviewed against design specifications

### Git

- [ ] Changes committed with descriptive message
- [ ] No sensitive data in commit
- [ ] Branch is up to date with main
- [ ] CI pipeline passes

---

## Post-Deploy Checklist

### Verification

- [ ] Page loads correctly in production
- [ ] All links work in production
- [ ] Schema validates in Google Rich Results Test
- [ ] Page appears in sitemap.xml
- [ ] No console errors in production

### Monitoring

- [ ] Add page to Search Console monitoring
- [ ] Verify Plausible analytics tracking
- [ ] Check for crawl errors after 24-48 hours
- [ ] Monitor Core Web Vitals in field data

---

## Common Issues & Solutions

### Issue: Page not appearing in sitemap

**Solution:** Check `next-sitemap.config.js` - ensure dynamic routes are included in `additionalPaths`.

### Issue: Schema validation errors

**Solution:** Use Google's Rich Results Test to identify specific errors. Common fixes:
- Add missing required fields
- Fix date formats (ISO 8601)
- Ensure URLs are absolute

### Issue: Poor Core Web Vitals

**Solution:**
- LCP: Optimize largest image, use priority loading
- CLS: Set explicit dimensions on images/embeds
- FID: Reduce JavaScript bundle size

### Issue: Content appears thin

**Solution:** Add more contextual content:
- Expand FAQ section
- Add terrain-specific recommendations
- Include safety warnings
- Add model-specific tips

### Issue: Duplicate content warnings

**Solution:**
- Ensure canonical URLs are unique
- Add unique intro paragraphs to each page
- Differentiate FAQs between similar pages

---

## Testing Tools Reference

| Tool | Purpose | URL |
|------|---------|-----|
| Google Rich Results Test | Schema validation | https://search.google.com/test/rich-results |
| PageSpeed Insights | Performance | https://pagespeed.web.dev/ |
| Lighthouse | Full audit | Built into Chrome DevTools |
| WAVE | Accessibility | https://wave.webaim.org/ |
| axe DevTools | Accessibility | Browser extension |
| Schema Validator | JSON-LD | https://validator.schema.org/ |
| Mobile-Friendly Test | Mobile UX | https://search.google.com/test/mobile-friendly |
| Screaming Frog | Crawl analysis | https://www.screamingfrog.co.uk/seo-spider/ |

---

## Sign-Off Template

```markdown
## Page QA Sign-Off

**Page URL:** /tire-size/20x4-0/
**Page Type:** Tire Size Directory
**Implementation Date:** YYYY-MM-DD
**Reviewed By:** [Name]

### Checklist Results

- [x] Pre-Implementation: PASS
- [x] Development: PASS
- [x] Content Quality: PASS
- [x] Technical SEO: PASS
- [x] Accessibility: PASS
- [x] Mobile: PASS
- [x] Performance: PASS (Lighthouse: 94/92/100/100)
- [x] Pre-Deploy: PASS
- [x] Post-Deploy: PASS

### Notes
- Minor CLS issue fixed by adding image dimensions
- FAQ section expanded to 5 questions

### Approval
Ready for production: YES
```
