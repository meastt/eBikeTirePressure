# E-Bike PSI - Product Roadmap

**Last Updated:** January 2025
**Status:** Post-MVP - Continuous Improvement Phase

---

## Overview

The E-Bike PSI calculator has completed all initial development phases (0-5) and is now in production. This roadmap outlines remaining improvements and future enhancements.

**Current State:**
- ✅ Core calculator engine with 100+ bike models
- ✅ Interactive UI with real-time calculations
- ✅ Static model pages with SEO optimization
- ✅ Blog, FAQ, and legal pages
- ✅ PWA support (installable, offline-aware)
- ✅ Production deployment on Vercel
- ✅ 23/28 UX improvements completed

**Overall Maturity:** Production-ready with room for polish

---

## Pending UX/UI Improvements

### Priority 1: High-Impact Features

#### P1-3: Replace Native Selectors with Custom UI
**Status:** Not Started
**Effort:** 1-2 days
**Impact:** High

Replace remaining native `<select>` elements in `SurfaceSelector.tsx` and `ConstructionSelector.tsx` with custom button groups:

- Visual selection (no hidden dropdowns)
- Add icons to each option (pavement, dirt, snow icons)
- Segmented control design with brand color highlights
- Better mobile touch experience

**Acceptance Criteria:**
- [ ] Surface selector shows 4 options as buttons
- [ ] Construction selector shows 3 options as segmented control
- [ ] Selected state has brand color border + background
- [ ] Mobile-friendly with proper touch targets

---

#### P1-7: Fix Mobile Navigation Overflow
**Status:** Not Started
**Effort:** 3-4 hours
**Impact:** High

Current header overflows on small screens (<375px) with 4 nav items.

**Recommended Solution:** Move Blog/FAQ to footer-only navigation
- Keep Calculate + Models in header
- Simplifies header, no JS needed
- No horizontal scroll on 320px screens

**Alternative:** Hamburger menu (requires more effort)

**Acceptance Criteria:**
- [ ] Header on mobile shows: Logo, Calculate, Models only
- [ ] Blog + FAQ accessible from footer
- [ ] No horizontal scroll on iPhone SE (320px)
- [ ] All nav items keyboard-accessible

---

### Priority 2: Polish & Enhancement

#### P2-6: Add Bike Categories to Featured Models
**Status:** Not Started
**Effort:** 2-3 hours
**Impact:** Medium

Add category labels to homepage featured models for better context:

```tsx
<h3>RadRunner Plus</h3>
<p className="text-xs text-brand font-semibold mb-2">Compact Cargo</p>
<p className="text-sm text-muted">20×3.3″ • 20–30 PSI</p>
```

**Acceptance Criteria:**
- [ ] All featured models show type (Fat Tire, Cargo, Folding, Standard)
- [ ] Type visually distinct with brand color
- [ ] Consistent with model directory filtering

---

### Priority 3: Performance & Architecture

#### P3-2: Split models.json by Brand
**Status:** Not Started
**Effort:** 2-3 days
**Impact:** High (Performance)

Current `models.json` is a single 50KB+ file imported on every page. At 500 models, this will be 250KB+.

**Solution:**
- Split into `/data/brands/rad-power.json`, `/data/brands/aventon.json`, etc.
- Create index file for quick lookups
- Lazy-load brand data in calculator
- Homepage/directory use index only

**Expected Results:**
- 40KB+ bundle size reduction per route
- Faster initial page loads
- Better scalability

**Acceptance Criteria:**
- [ ] Models split by brand (30+ files)
- [ ] Homepage/directory still show all models via index
- [ ] Calculator lazy-loads only selected brand
- [ ] No breaking changes to existing imports

---

#### P3-5: Add Keyboard Shortcuts to Calculator
**Status:** Not Started
**Effort:** 1-2 days
**Impact:** Medium

Add power-user keyboard shortcuts:
- `R` → Reset to defaults
- `S` → Focus surface selector
- `C` → Focus construction selector
- `?` → Show keyboard shortcuts modal

**Acceptance Criteria:**
- [ ] Shortcuts documented in modal (? key)
- [ ] Don't conflict with browser shortcuts
- [ ] Disabled when focus is in text input
- [ ] Accessible via screen reader

---

## Future Feature Ideas

### Engagement & Value Proposition

Based on the comprehensive app audit, these features would significantly improve user engagement:

#### Save & Share Functionality
**Effort:** 3-5 days
**Impact:** Very High

- Save calculations with shareable links
- localStorage history of recent calculations
- Export results as PDF or image
- QR code generation for quick mobile access

#### Comparison Mode
**Effort:** 3-4 days
**Impact:** High

- Compare multiple scenarios side-by-side
- "With cargo" vs "Without cargo" views
- Visual diff highlighting changes
- Helps users understand impact of different loads

#### Visual Explanations
**Effort:** 5-7 days
**Impact:** Very High

- Show tire deformation at different PSI levels
- Visualize contact patch size
- Animated demonstrations of pinch-flat risk
- Interactive diagrams explaining concepts

#### Enhanced Result Explanations
**Effort:** 2-3 days
**Impact:** High

- Don't just show numbers, explain WHY they matter
- Context-specific recommendations
- Link to related blog posts
- Safety tips based on user's scenario

---

### Content & Credibility

#### Expand Blog Content
**Current:** 5 posts
**Target:** 20+ posts
**Effort:** Ongoing

Topics to cover:
- Seasonal PSI adjustments
- Tire wear patterns and PSI
- Converting between tubed and tubeless
- Brand-specific guides for popular models
- Terrain-specific deep dives
- Maintenance and troubleshooting

#### Social Proof & Testimonials
**Effort:** 1-2 days

- Add testimonials section to homepage
- Usage statistics ("X calculations this month")
- User ratings and reviews
- "Featured in" section if covered by bike media

#### Video Content
**Effort:** 5-10 days

- Tutorial videos for first-time users
- PSI adjustment demonstrations
- Tire pressure gauge recommendations
- Common mistakes to avoid

---

### Mobile Experience

#### Native App Feel
**Effort:** 3-5 days

- Improve touch targets (minimum 44×44px)
- Add haptic feedback on iOS
- Better gesture support
- Smoother animations and transitions

#### Mobile-Specific Features
**Effort:** 2-3 days

- Quick action shortcuts
- Swipe gestures for navigation
- Optimized portrait/landscape layouts
- Better keyboard handling

---

## Technical Debt & Quality

### Remaining Test Coverage
**Priority:** Medium
**Effort:** 5-7 days

- Increase component test coverage (currently minimal)
- Add E2E tests for critical flows
- Visual regression testing
- Performance benchmarking

### Error Handling & Monitoring
**Priority:** High
**Effort:** 2-3 days

- Add error boundaries to all major components
- Implement error tracking (Sentry or similar)
- Performance monitoring (Core Web Vitals)
- Analytics for user behavior tracking

### Code Organization
**Priority:** Low
**Effort:** 3-4 days

- Split large components into smaller ones
- Extract duplicate logic into utilities
- Improve TypeScript types (reduce 'any' usage)
- Add JSDoc comments for complex functions

---

## Success Metrics

### Current Baseline
- Build passing: ✅
- Lighthouse Performance: ~90+
- Lighthouse Accessibility: ~90+
- Page count: 36 static pages
- Sitemap URLs: 30

### Target Improvements
- **User Engagement:** Increase time on site by 50%
- **Return Rate:** Achieve 30%+ return visitor rate
- **Calculator Completion:** 80%+ of users who start see results
- **Mobile Performance:** Maintain 90+ Lighthouse score
- **Content Depth:** 20+ blog posts, 5+ video tutorials

---

## Implementation Priority

### Immediate (Next Sprint)
1. P1-7: Fix mobile navigation overflow
2. P2-6: Add bike categories to featured models
3. P1-3: Replace native selectors with custom UI

### Short-term (Next Month)
1. Save & share functionality
2. Enhanced result explanations
3. Error boundaries and monitoring
4. 5+ new blog posts

### Medium-term (Next Quarter)
1. P3-2: Split models.json by brand
2. Comparison mode
3. Video content creation
4. Visual explanations (tire deformation)
5. Comprehensive test coverage

### Long-term (6+ months)
1. Native mobile apps (iOS/Android via Capacitor)
2. User accounts and saved profiles
3. TPMS integration (if feasible)
4. Multi-language support
5. Community features (forums, user-submitted models)

---

## Notes

- This roadmap is a living document and will be updated as priorities shift
- Items are organized by impact and effort, not strict chronological order
- Some features may be deprioritized based on user feedback and analytics
- Technical debt should be addressed continuously, not in large batches

**Questions or suggestions?** Open an issue or PR to discuss additions to this roadmap.
