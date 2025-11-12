# Lighthouse Testing Guide - Phase 4.5

## 🎯 Target Metrics

| Category | Target | Expected |
|----------|--------|----------|
| **Performance** | ≥ 90 | 92-98 |
| **Accessibility** | ≥ 90 | 95-100 |
| **Best Practices** | ≥ 90 | 95-100 |
| **SEO** | ≥ 90 | 95-100 |

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s → Expected: ~1.2s
- **FID** (First Input Delay): < 100ms → Expected: ~50ms
- **CLS** (Cumulative Layout Shift): < 0.1 → Expected: ~0.02

---

## 📋 Test Pages

### 1. Homepage (`/`)
**Expected Performance**: 95+

**Why High**:
- Static content (SSG)
- System fonts (Inter/Poppins preloaded)
- Small images (SVG icons only)
- No external resources except analytics
- Gradient CSS (no images)

**Potential Issues**:
- Google Analytics async script (~5 points)
- Plausible defer script (minimal impact)

### 2. Calculator Page (`/calculate`)
**Expected Performance**: 90-93

**Why Lower**:
- Client-side React state
- Live calculation updates
- More interactive elements
- Conditional rendering

**Optimizations**:
- Results panel uses `aria-live="polite"` not aggressive
- No heavy images
- Minimal re-renders

### 3. Models Page (`/ebike-tire-pressure`)
**Expected Performance**: 88-92

**Why Potentially Lower**:
- Client component (not SSG)
- Search/filter state management
- 20+ brands with models array
- Accordion animations

**Optimizations**:
- No images in grid
- UseMemo for filtered results
- Efficient re-renders

---

## 🧪 How to Test

### Option 1: Chrome DevTools (Recommended)
```bash
# Make sure dev server is running
pnpm run dev

# Then in Chrome:
1. Open http://localhost:3000
2. Open DevTools (F12 or Cmd+Opt+I)
3. Go to "Lighthouse" tab
4. Select: Mobile, All categories
5. Click "Analyze page load"
6. Save report
```

### Option 2: Production Build
```bash
# Build for production
pnpm run build

# Serve locally
pnpm start

# Test against http://localhost:3000 in Lighthouse
```

### Option 3: PageSpeed Insights (After Deploy)
```
https://pagespeed.web.dev/
Enter: https://ebikepsi.com
```

---

## 📊 Expected Results Breakdown

### Performance (92-98)

**What Helps** ✅:
- Next.js automatic code splitting
- Static generation for homepage
- Font preloading (`next/font`)
- Preconnect to analytics domains
- Optimized images (SVG only)
- No render-blocking CSS
- Compression enabled

**Potential Deductions** ⚠️:
- Google Analytics: ~3-5 points
- Plausible script: ~1-2 points
- Client components: ~2-3 points

**Metrics**:
- FCP: ~0.8s (Good)
- LCP: ~1.2s (Good)
- TBT: ~50ms (Good)
- CLS: ~0.02 (Good)
- Speed Index: ~1.5s (Good)

### Accessibility (95-100)

**What Helps** ✅:
- Proper ARIA labels
- Semantic HTML
- Focus indicators visible
- Color contrast ratios
- Touch targets ≥ 44px
- Form labels
- No missing alt text

**Potential Deductions** ⚠️:
- No skip-to-main link: -2 points (optional)
- Minor contrast on decorative elements: 0 points (acceptable)

### Best Practices (95-100)

**What Helps** ✅:
- HTTPS (when deployed)
- No console errors
- No deprecated APIs
- Security headers in vercel.json
- No vulnerable libraries
- Proper image aspect ratios

**Potential Deductions** ⚠️:
- Third-party cookies (GA): -2 points
- HTTP/2 not used locally: 0 points (prod only)

### SEO (95-100)

**What Helps** ✅:
- Meta descriptions on all pages
- Proper heading hierarchy (h1 → h2 → h3)
- Valid robots.txt
- Sitemap.xml exists
- Mobile-friendly viewport
- Descriptive link text
- Structured data (JSON-LD on model pages)

**Potential Deductions** ⚠️:
- None expected

---

## 🚨 Known Issues & Fixes

### Issue: CLS from Logo
**Symptom**: Logo image causes layout shift  
**Fix**: Already handled with `width` and `height` props on `<Image>`

### Issue: Font Flash
**Symptom**: Text shifts when fonts load  
**Fix**: Already handled with `next/font` and `display: swap`

### Issue: Search Input Autofocus
**Symptom**: Accessibility warning about autofocus  
**Fix**: No autofocus used anywhere ✅

### Issue: Tap Targets Too Small
**Symptom**: Links/buttons < 44x44px  
**Fix**: Global CSS rule added in `globals.css` ✅

---

## 📈 How to Improve Scores

### If Performance < 90

1. **Defer Analytics**:
   ```tsx
   // Already done - Plausible uses defer
   // GA uses async
   ```

2. **Reduce Client Components**:
   ```tsx
   // Consider moving search/filter to URL params
   // Use server components where possible
   ```

3. **Lazy Load Models**:
   ```tsx
   // If needed, virtualize the brand list
   import { Virtuoso } from 'react-virtuoso';
   ```

### If Accessibility < 90

1. **Add Skip Link**:
   ```tsx
   <a href="#main" className="sr-only focus:not-sr-only">
     Skip to main content
   </a>
   ```

2. **Check Contrast**:
   ```bash
   # Use browser extension: Axe DevTools
   ```

### If Best Practices < 90

1. **Check Console**:
   ```bash
   # Ensure no errors in browser console
   ```

2. **Update Dependencies**:
   ```bash
   pnpm update
   ```

---

## 🧪 Manual Testing Checklist

Before running Lighthouse:

- [ ] No console errors or warnings
- [ ] All images have alt text or role="presentation"
- [ ] All form inputs have labels
- [ ] All buttons have text or aria-label
- [ ] No broken links
- [ ] Mobile viewport is responsive
- [ ] Touch targets are adequate
- [ ] Focus indicators are visible

---

## 📄 Report Template

After running Lighthouse, document results:

```markdown
## Lighthouse Results - [Date]

### Homepage (/)
- Performance: XX/100
- Accessibility: XX/100
- Best Practices: XX/100
- SEO: XX/100
- **LCP**: X.Xs
- **CLS**: 0.0XX

### Calculator (/calculate)
- Performance: XX/100
- Accessibility: XX/100
- Best Practices: XX/100
- SEO: XX/100
- **LCP**: X.Xs
- **CLS**: 0.0XX

### Models (/ebike-tire-pressure)
- Performance: XX/100
- Accessibility: XX/100
- Best Practices: XX/100
- SEO: XX/100
- **LCP**: X.Xs
- **CLS**: 0.0XX

### Issues Found
1. [Issue description]
   - Impact: High/Medium/Low
   - Fix: [Action to take]

2. [Issue description]
   - Impact: High/Medium/Low
   - Fix: [Action to take]
```

---

## 🎯 Success Criteria

✅ **PASS** if all 3 pages have:
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90
- LCP < 2.5s
- CLS < 0.1

⚠️ **Review** if any page has:
- Performance < 90
- Accessibility < 95
- Any Core Web Vital failing

❌ **FAIL** if any page has:
- Accessibility < 80
- SEO < 80
- Critical issues flagged

---

## 🚀 Next Steps

1. **Run Lighthouse** on all 3 pages (dev or prod)
2. **Document results** using template above
3. **Fix any issues** below targets
4. **Re-test** after fixes
5. **Deploy** when all green

---

**Created**: November 12, 2025  
**Status**: Ready for Testing  
**Expected Overall**: 90+ on all metrics

