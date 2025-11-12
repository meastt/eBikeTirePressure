# Frontend UX/UI Improvement Checklist

**Document Version:** 1.0
**Created:** 2025-11-12
**Status:** Ready for Team Review

---

## Table of Contents

1. [Priority 0: Critical UX Blockers](#priority-0-critical-ux-blockers)
2. [Priority 1: High-Impact Improvements](#priority-1-high-impact-improvements)
3. [Priority 2: Polish & Enhancement](#priority-2-polish--enhancement)
4. [Priority 3: Performance & Accessibility](#priority-3-performance--accessibility)
5. [Estimation Summary](#estimation-summary)

---

## Priority 0: Critical UX Blockers
**Timeline:** Complete within 1-2 sprints
**Impact:** Directly affects conversion and user success

### ~~P0-1: Replace Model Dropdown with Searchable Combobox~~ ✅ **COMPLETED**
**Component:** `/components/PresetPicker.tsx`

**Problem:**
- Native `<select>` with 100+ options is unusable on mobile
- No search/filter within dropdown
- No brand grouping or fuzzy matching

**Solution:**
- Replace with Headless UI Combobox
- Implement:
  - Real-time search filtering (brand, model, tire size)
  - Fuzzy matching ("aventure 2" → "Aventure.2")
  - Grouped by brand (sections)
  - Recent selections (localStorage, max 3)
  - Keyboard navigation (arrow keys, Enter to select)

**Acceptance Criteria:**
- [x] User can type to filter models in real-time
- [x] Search works across brand, model name, and tire size
- [x] Mobile users can find their bike in <10 seconds
- [x] Recent selections appear at top when opening picker
- [x] Keyboard-only navigation fully functional
- [x] Empty state shows helpful message

**Complexity:** XL (3-5 days) | **Actual:** 1.5 hours
**Dependencies:** Install `@headlessui/react` or `@radix-ui/react-select`

---

### ~~P0-2: Add Floating Results Preview on Mobile~~ ✅ **COMPLETED**
**Component:** `/app/calculate/page.tsx`, `/components/ResultsCard.tsx`

**Problem:**
- Results are below-the-fold on mobile (3000px scroll)
- Users complete inputs without seeing output

**Solution:**
- Add sticky bottom bar on mobile (< 1024px) after model selection:
  ```tsx
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden p-4 z-40">
    <div className="flex justify-between items-center">
      <div>
        <div className="text-xs text-muted">Your PSI</div>
        <div className="text-lg font-bold text-brand">
          Front: {front.target} | Rear: {rear.target}
        </div>
      </div>
      <button onClick={scrollToResults} className="btn-secondary">
        Details →
      </button>
    </div>
  </div>
  ```
- Button scrolls to full results card
- Shows/hides based on scroll position (hide when results in viewport)

**Acceptance Criteria:**
- [x] Sticky bar appears after model selection on mobile only
- [x] Shows front/rear target PSI at a glance
- [x] "Details" button smooth-scrolls to full results
- [x] Bar auto-hides when full results are in viewport
- [x] Does not block inputs (z-index correct)
- [x] Safe area padding for iOS notch

**Complexity:** M (1-2 days) | **Actual:** 1.5 hours

---

### ~~P0-3: Add Contextual Help Tooltips to All Inputs~~ ✅ **COMPLETED**
**Components:** All calculator input components

**Problem:**
- No explanation of what "Construction," "Surface," or "Trike Mode" mean
- Users guess instead of understanding

**Solution:**
- Add `<TooltipIcon />` component next to each label:
  ```tsx
  <div className="flex items-center gap-1.5">
    <label>Tire Construction</label>
    <TooltipIcon
      content="Tubed: Inner tube inside tire (most common). Tubeless: Sealant instead of tube (can run lower PSI). Reinforced: Extra-thick casing for cargo bikes."
    />
  </div>
  ```
- Custom TooltipIcon component with hover/focus states
- Tooltips for:
  - **Tire Construction** (tubed/tubeless/reinforced)
  - **Surface Type** (with examples: "Mixed = gravel + pavement")
  - **Trike Mode** ("Splits rear load across two wheels")
  - **Passenger Weight** ("Includes child seats, adult passengers")
  - **Cargo Front/Rear** ("Panniers, baskets, trailers")

**Acceptance Criteria:**
- [x] All 5 input sections have tooltips
- [x] Tooltips open on hover (desktop) and tap (mobile)
- [x] Content is <50 words, uses plain language
- [x] Accessible via keyboard (focus + Enter)
- [x] `aria-describedby` links label to tooltip

**Complexity:** M (2-3 days) | **Actual:** 1.5 hours
**Dependencies:** Install `@radix-ui/react-tooltip` or `@floating-ui/react`

---

### ~~P0-4: Increase Slider Step Size & Add Numeric Inputs~~ ✅ **COMPLETED**
**Component:** `/components/WeightSliders.tsx`

**Problem:**
- Step size of 1 lb requires 220 drag events to go from 80→300 lbs
- No way to type exact value

**Solution:**
- Change step size to 5 lbs for all sliders
- Add optional numeric input next to each slider:
  ```tsx
  <div className="flex items-center gap-3">
    <input
      type="range"
      min={80}
      max={300}
      step={5}
      value={riderLbs}
      onChange={...}
      className="flex-1"
    />
    <input
      type="number"
      min={80}
      max={300}
      step={1}
      value={riderLbs}
      onChange={...}
      className="w-20 px-2 py-1 border rounded"
    />
  </div>
  ```
- Numeric input allows precise 1-lb adjustments

**Acceptance Criteria:**
- [x] All sliders use step=5 (except numeric input)
- [x] Numeric inputs accept 1-lb precision
- [x] Both controls stay in sync (two-way binding)
- [x] Max values increased: Cargo Rear → 200 lbs (from 120)
- [x] Slider background gradient updates smoothly

**Complexity:** S (4-6 hours) | **Actual:** 1 hour

---

### ~~P0-5: Fix SafetyBand Axis Labeling & Marker Consistency~~ ✅ **COMPLETED**
**Component:** `/components/SafetyBand.tsx`

**Problem:**
- No axis labels (users don't know scale is 0→sidewall max)
- Target marker above bar, min/max inside bar (inconsistent)
- Colors don't explain zones

**Solution:**
- Add axis labels:
  ```tsx
  <div className="flex justify-between text-xs text-muted mt-1">
    <span>0 PSI</span>
    <span>{sidewallMax} PSI (max)</span>
  </div>
  ```
- Move all markers to **same position** (either all above or all below bar)
- Add zone labels directly on gradient:
  ```tsx
  <div className="absolute inset-0 flex items-center justify-around text-xs text-white/70 font-medium pointer-events-none">
    <span>Too Low</span>
    <span>Safe Zone</span>
    <span>Too Firm</span>
  </div>
  ```

**Acceptance Criteria:**
- [x] Axis shows "0 PSI" on left, "{sidewallMax} PSI (max)" on right
- [x] All three markers (min/target/max) positioned consistently below bar
- [x] Zone labels visible but not distracting ("Too Low", "Safe Zone", "Too Firm")
- [x] Container height adjusted to accommodate markers below bar

**Complexity:** M (1 day) | **Actual:** 45 minutes

---

## Priority 1: High-Impact Improvements
**Timeline:** Complete within 2-3 sprints
**Impact:** Significantly improves usability and trust

### ~~P1-1: Rewrite Homepage Hero Copy~~ ✅ **COMPLETED**
**File:** `/app/(site)/page.tsx`

**Problem:**
- Current copy is jargon-heavy ("Load-aware PSI calculations")
- Doesn't communicate value to new users

**Solution:**
Replace hero section with benefit-focused copy:

```tsx
<h1>Stop Guessing Your Tire Pressure</h1>
<p>
  Get the perfect PSI for your e-bike based on your exact weight, cargo, and terrain.
  Avoid pinch flats, blowouts, and poor handling.
</p>
```

Rewrite feature cards with human language:

| Current | New |
|---------|-----|
| "Load-Aware Math" | "Handles Cargo & Passengers" → "Carrying your kid + groceries? We calculate exactly how much PSI you need." |
| "Model Database" | "100+ E-Bike Presets" → "Find your Rad Power, Aventon, or Trek—specs already loaded." |
| "Safety Checks" | "Live Safety Warnings" → "Get instant alerts if your pressure risks a flat or blowout." |
| "Trike Support" | "Three-Wheel Mode" → "Riding a trike? We split the load across your rear wheels." |

**Acceptance Criteria:**
- [x] Hero headline starts with action verb ("Stop," "Get," "Calculate")
- [x] Subheading explains outcome, not process
- [x] Feature cards use 2nd person ("You," "Your")
- [x] No jargon (PSI is OK, "axle bias" is not)
- [x] Copy approved by product/marketing

**Complexity:** S (2-3 hours) | **Actual:** 10 minutes

---

### ~~P1-2: Add Visual Bike Icons to Homepage Featured Models~~ ✅ **COMPLETED**
**Component:** `/app/(site)/page.tsx` featured models section

**Problem:**
- 6 text-only cards look identical
- No visual hierarchy or personality

**Solution:**
- Add bike category icons (custom SVG silhouettes):
  - Fat tire → wide tire bike icon
  - Cargo → bike with rack icon
- Inline SVGs for simplicity and performance
- Add to card header with category labels:
  ```tsx
  <div className="flex items-start gap-3 mb-2">
    <svg>/* bike icon */</svg>
    <div>
      <h3>Aventon Aventure</h3>
      <p className="text-xs text-brand font-semibold">Fat Tire Explorer</p>
      <p className="text-xs text-muted">26×4.0″</p>
    </div>
  </div>
  ```

**Acceptance Criteria:**
- [x] All 5 bike cards have category icons (fat tire/cargo)
- [x] Custom SVG icons (48×32px), monochrome (brand color)
- [x] Subcategory text added ("Fat Tire Cruiser," "Compact Cargo," etc.)
- [x] Cards visually distinct at a glance
- [x] Responsive: icons work on mobile

**Complexity:** M (1 day)
**Dependencies:** Create or source 5-6 bike icon SVGs

---

### P1-3: Replace Native Select in All Components with Custom UI
**Components:** `SurfaceSelector.tsx`, `ConstructionSelector.tsx`

**Problem:**
- If these are still native `<select>` elements, they're inconsistent with modern UI

**Solution:**
- Replace with button group (segmented control):
  ```tsx
  <div className="flex gap-2 flex-wrap">
    {surfaces.map((surface) => (
      <button
        key={surface.value}
        onClick={() => onSelect(surface.value)}
        className={cn(
          "flex-1 px-4 py-3 rounded-lg border-2 transition-all",
          selected === surface.value
            ? "border-brand bg-brand-100 text-brand font-semibold"
            : "border-line bg-white text-muted hover:border-brand-200"
        )}
      >
        <div className="text-sm font-medium">{surface.label}</div>
        {surface.description && (
          <div className="text-xs text-muted mt-0.5">{surface.description}</div>
        )}
      </button>
    ))}
  </div>
  ```
- Visual selection (not hidden in dropdown)
- Add icons to each option (pavement, dirt, snow, etc.)

**Acceptance Criteria:**
- [ ] Surface selector shows 4 options as buttons (no dropdown)
- [ ] Construction selector shows 3 options as segmented control
- [ ] Selected state has brand color border + background
- [ ] Mobile: buttons stack vertically if needed
- [ ] Icons added (optional but recommended)

**Complexity:** M (1-2 days)

---

### ~~P1-4: Add "Reset to Defaults" Button to Calculator~~ ✅ **COMPLETED**
**Component:** `/app/calculate/page.tsx`

**Problem:**
- No way to quickly reset all inputs after tweaking
- Users have to manually drag 5+ sliders back

**Solution:**
- Add button below TrikeToggle:
  ```tsx
  <button
    onClick={resetToDefaults}
    className="w-full py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light rounded-lg border border-line transition-colors"
  >
    Reset to Defaults
  </button>
  ```
- Resets to:
  - Rider: 180 lbs
  - Passenger: 0
  - Cargo Front: 0
  - Cargo Rear: 0
  - Surface: Pavement
  - Construction: Tubed
  - Trike Mode: Off

**Acceptance Criteria:**
- [x] Button resets all inputs to defaults
- [x] Shows confirmation if significant changes made (optional)
- [x] Works with keyboard (focus + Enter)
- [x] Positioned logically (below all inputs, above results)

**Complexity:** S (2-3 hours) | **Actual:** 15 minutes

---

### ~~P1-5: Improve Model Page PSI Table Context~~ ✅ **COMPLETED**
**Component:** `/app/models/[slug]/page.tsx`

**Problem:**
- Table shows 7 scenarios, but no legend or explanation
- Users don't know if they should use these numbers or calculator

**Solution:**
- Add explanatory note above table:
  ```tsx
  <div className="p-3 bg-brand-50 border border-brand-200 rounded-lg mb-4">
    <p className="text-sm text-text">
      <strong>Quick estimates</strong> for pavement with tubed tires.
      For your exact weight and riding conditions,
      <Link href={`/calculate?model=${model.slug}`} className="text-brand font-semibold underline">
        use the calculator
      </Link>.
    </p>
  </div>
  ```
- Add legend below table:
  ```tsx
  <div className="mt-4 text-xs text-muted space-y-1">
    <p><strong>Surface:</strong> Pavement (reduce 10-30% for mixed/dirt/snow)</p>
    <p><strong>Construction:</strong> Tubed (tubeless: -1 PSI, reinforced: +2 PSI)</p>
  </div>
  ```

**Acceptance Criteria:**
- [x] Note clarifies these are estimates, not prescriptions
- [x] CTA link directs to calculator with model preselected
- [x] Legend explains assumptions (pavement, tubed)
- [x] Copy reviewed for clarity

**Complexity:** S (1-2 hours) | **Actual:** 15 minutes

---

### ~~P1-6: Add Search Feedback to Models Directory~~ ✅ **COMPLETED**
**Component:** `/app/ebike-tire-pressure/page.tsx`

**Problem:**
- Search works, but no feedback (result count, suggestions)

**Solution:**
- Add result count header:
  ```tsx
  {searchQuery && (
    <div className="mb-4 text-sm text-muted">
      Showing {filteredBrands.length} of {allBrands.length} brands
      {selectedType !== "All" && ` (${selectedType} only)`}
    </div>
  )}
  ```
- Add "Did you mean?" suggestions for typos (optional, use Fuse.js)
- Show popular searches if no query entered:
  ```tsx
  <div className="text-xs text-muted mt-2">
    Popular: <button onClick={() => setSearchQuery("rad power")}>Rad Power</button>,
    <button onClick={() => setSearchQuery("aventon")}>Aventon</button>,
    <button onClick={() => setSearchQuery("fat tire")}>Fat Tire</button>
  </div>
  ```

**Acceptance Criteria:**
- [x] Result count shows after search with type filter info
- [x] Popular searches clickable (Rad Power, Aventon, Fat Tire, etc.)
- [x] "Did you mean?" for close matches (optional - not implemented)
- [x] Search feedback accessible via screen reader

**Complexity:** M (1 day, or S without fuzzy matching) | **Actual:** 20 minutes

---

### P1-7: Fix Mobile Navigation Overflow
**Component:** `/app/layout.tsx` header

**Problem:**
- 4 nav items + logo overflow on small screens (<375px)

**Solution:**
Option A: Hamburger menu on mobile (<768px)
- Use Headless UI Disclosure or Radix UI Navigation Menu
- Show only logo + hamburger icon on mobile
- Full nav in drawer

Option B: Footer-only nav for Blog/FAQ
- Keep Calculate + Models in header
- Move Blog/FAQ to footer
- Simpler, no JS needed

**Recommendation:** Option B (simpler, faster)

**Acceptance Criteria:**
- [ ] Header on mobile shows: Logo, Calculate, Models (3 items only)
- [ ] Blog + FAQ moved to footer
- [ ] No horizontal scroll on 320px screens (iPhone SE)
- [ ] All nav items remain keyboard-accessible

**Complexity:** S (3-4 hours for Option B, M for Option A)

---

### ~~P1-8: Remove or Replace "Beta" Pill~~ ✅ **COMPLETED**
**Component:** `/app/layout.tsx` header logo

**Problem:**
- "Beta" signals instability to users
- You have 100+ models and tested engine—not beta anymore

**Solution:**
Option A: Remove entirely
Option B: Replace with "Free" (if you plan to monetize later)
Option C: Replace with "v1.0" badge

**Recommendation:** Remove (Option A)

**Acceptance Criteria:**
- [x] Beta pill removed from header
- [x] No other references to "beta" in user-facing copy
- [x] Update meta tags if they mention beta

**Complexity:** XS (15 minutes) | **Actual:** 5 minutes

---

### ~~P1-9: Add Icons to Warning Chips (Not Just Colors)~~ ✅ **COMPLETED**
**Component:** `/components/ResultsCard.tsx`

**Problem:**
- Warnings use only color to indicate severity (inaccessible to colorblind users)
- Current icons are Unicode characters (`!`, `⚠`, `✕`)

**Solution:**
- Replace with proper icon components:
  ```tsx
  import { ExclamationTriangleIcon, AlertCircleIcon, ShieldXIcon } from '@heroicons/react/24/outline'

  {warnings.lowPinchRisk && (
    <div className="flex items-start gap-3 p-3 bg-danger/10 border-l-4 border-danger rounded-lg">
      <ExclamationTriangleIcon className="w-6 h-6 text-danger flex-shrink-0" />
      <div>
        <div className="text-sm font-semibold text-danger">Pinch-flat risk</div>
        <div className="text-xs text-muted mt-0.5">...</div>
      </div>
    </div>
  )}
  ```
- Use distinct shapes for each warning type

**Acceptance Criteria:**
- [x] All warnings use Heroicons (ExclamationTriangle, ExclamationCircle, ShieldExclamation)
- [x] Icons are distinct shapes (triangle, circle, shield)
- [x] Icon color matches text color (danger/warn)
- [x] Size is 24px (w-6 h-6)
- [x] Works without color (shape alone is meaningful)

**Complexity:** S (2-3 hours) | **Actual:** 30 minutes
**Dependencies:** Already have Heroicons installed (check)

---

## Priority 2: Polish & Enhancement
**Timeline:** Complete within 3-4 sprints
**Impact:** Improves delight and professionalism

### ~~P2-1: Improve Typography Scale~~ ✅ **COMPLETED**
**File:** `/tailwind.config.ts`

**Problem:**
- h1 and h2 are too close in size (48px vs 30px)
- Body text too small on mobile (14px)

**Solution:**
- Update Tailwind config with modular scale (1.25x):
  ```ts
  fontSize: {
    'xs': ['12px', { lineHeight: '16px' }],
    'sm': ['14px', { lineHeight: '20px' }],
    'base': ['16px', { lineHeight: '24px' }],
    'lg': ['18px', { lineHeight: '28px' }],
    'xl': ['20px', { lineHeight: '28px' }],
    '2xl': ['24px', { lineHeight: '32px' }],
    '3xl': ['30px', { lineHeight: '36px' }],
    '4xl': ['36px', { lineHeight: '40px' }],
    '5xl': ['48px', { lineHeight: '52px' }],
  }
  ```
- Update heading classes globally:
  - h1: `text-4xl md:text-5xl` (36-48px)
  - h2: `text-2xl md:text-3xl` (24-30px)
  - h3: `text-xl md:text-2xl` (20-24px)

**Acceptance Criteria:**
- [x] Clear visual hierarchy between h1/h2/h3
- [x] No body text smaller than 16px (except captions at 14px)
- [x] Labels/helpers increased to 14px minimum
- [x] Responsive typography with proper line heights
- [x] Updated homepage headings to use semantic styles

**Complexity:** M (1 day to audit and update all components)

---

### ~~P2-2: Add Hover States to All Interactive Elements~~ ✅ **COMPLETED**
**Files:** Multiple components

**Problem:**
- Buttons have hover, but no active (click) states
- Links have no visited state styling

**Solution:**
- Add active states to all buttons:
  ```tsx
  className="... hover:scale-105 active:scale-95 transition-transform"
  ```
- Add visited state to internal links:
  ```tsx
  className="... visited:text-brand-600"
  ```
- Add focus-visible styling (already exists, verify consistency)

**Acceptance Criteria:**
- [x] All buttons scale down on click (active state)
- [x] All links show visited state (optional: only for blog/model pages)
- [x] Focus-visible rings consistent (2px brand color)
- [x] No hover states on touch devices (use @media (hover: hover))

**Complexity:** S (4-6 hours) | **Actual:** 20 minutes

---

### ~~P2-3: Increase Mobile Card Padding~~ ✅ **COMPLETED**
**File:** `/app/globals.css` card utility

**Problem:**
- Cards use `p-6` (24px) on all screens—feels cramped on mobile

**Solution:**
- Update card utility:
  ```css
  .card {
    @apply bg-white border border-slate-200 rounded-2xl shadow-card p-6 md:p-8;
  }
  ```
- Add breathing room on desktop (32px vs 24px)

**Acceptance Criteria:**
- [x] Mobile cards have 24px padding
- [x] Desktop cards have 32px padding
- [x] Updated all card instances to use new utility
- [x] Test on iPhone SE and Pixel 4a (smallest common screens)

**Complexity:** XS (30 minutes) | **Actual:** 15 minutes

---

### ~~P2-4: Add Loading State to Calculator~~ ✅ **COMPLETED**
**Component:** `/app/calculate/page.tsx`

**Problem:**
- No loading indicator if calculation takes >200ms
- No error handling if engine fails

**Solution:**
- Add loading state with skeleton UI:
  ```tsx
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (!selectedModel) return;

    setIsCalculating(true);
    const timeout = setTimeout(() => {
      const output = calculatePSI(calculatorInputs);
      setResults(output);
      setIsCalculating(false);
    }, 600); // Natural calculation delay

    return () => clearTimeout(timeout);
  }, [inputs]);
  ```
- Created `ResultsCardSkeleton` component with animated placeholders
- Prevent floating bar from showing during calculation
- Reset button clears loading state

**Acceptance Criteria:**
- [x] Loading state shows if calculation pending (skeleton UI)
- [x] Skeleton shows when changing inputs (bike, weight, surface, etc.)
- [x] 600ms delay for natural feeling calculation experience
- [x] Accessible with proper aria-live region
- [x] Floating results bar doesn't appear during calculation
- [x] Reset button clears loading state

**Complexity:** M (1 day)

---

### P2-5: Add Color System Refinement
**File:** `/tailwind.config.ts`

**Problem:**
- Current brand blue (#2B59C3) is generic
- Color system lacks personality for "mechanic-grade" aesthetic

**Solution:**
Option A: Keep current colors (safe, accessible)
Option B: Add industrial accent (darker navy, safety orange)

If choosing Option B:
```ts
colors: {
  brand: {
    DEFAULT: '#1A365D', // Darker navy
    hover: '#2C5282',
    100: '#EBF4FF',
  },
  accent: {
    DEFAULT: '#FF6B35', // Safety orange
    hover: '#E85A2A',
  },
  // Keep semantic colors (ok, warn, danger)
}
```

**Recommendation:** Keep current colors for now, revisit in P3

**Acceptance Criteria:**
- [ ] If changing: contrast ratios meet WCAG AA (4.5:1)
- [ ] If changing: test on colorblind simulators
- [ ] If changing: update all brand references in CSS/components

**Complexity:** L (2-3 days if changing, XS if keeping)

---

### P2-6: Add Bike Type to Featured Models on Homepage
**Component:** `/app/(site)/page.tsx`

**Problem:**
- Featured models show only brand/model/tire/PSI
- No category context (is it a cargo bike? fat tire?)

**Solution:**
- Add subtitle to each card:
  ```tsx
  <h3>RadRunner Plus</h3>
  <p className="text-xs text-brand font-semibold mb-2">Compact Cargo</p>
  <p className="text-sm text-muted">20×3.3″ • 20–30 PSI</p>
  ```
- Use `getModelType()` utility from `/lib/brands.ts`

**Acceptance Criteria:**
- [ ] All featured models show type (Fat Tire, Cargo, Folding, Standard)
- [ ] Type is visually distinct (color, weight, or position)
- [ ] Types are consistent with model directory filtering

**Complexity:** S (2-3 hours)

---

### ~~P2-7: Add Pagination or Virtual Scroll to Model Directory~~ ✅ **COMPLETED**
**Component:** `/app/ebike-tire-pressure/page.tsx`

**Problem:**
- Renders 100+ models at once (performance risk as you scale)
- Initial page load is heavy

**Solution:**
Implemented pagination (24 brands per page) for better navigation:
- Page-based navigation with Previous/Next buttons and page numbers
- Show all results when searching (no pagination for search results)
- Reset to page 1 when filters change
- Pagination info showing current page and total
- Simple, accessible controls

```tsx
const BRANDS_PER_PAGE = 24;
const paginatedBrands = searchQuery 
  ? filteredBrands // Show all when searching
  : filteredBrands.slice((currentPage - 1) * BRANDS_PER_PAGE, currentPage * BRANDS_PER_PAGE);
```

**Acceptance Criteria:**
- [x] Initially shows 24 brands (page 1)
- [x] Pagination controls with Previous/Next buttons
- [x] Page number buttons for direct navigation
- [x] Show all results when searching (no pagination)
- [x] Reset to page 1 when changing filters
- [x] Button hidden when all brands visible
- [x] Accessible pagination controls

**Complexity:** M (1 day)

---

## Priority 3: Performance & Accessibility
**Timeline:** Ongoing improvements
**Impact:** Long-term quality and compliance

### P3-1: Debounce Calculator Inputs
**Component:** `/app/calculate/page.tsx`

**Problem:**
- Recalculates on every slider drag event (60+ times/sec)

**Solution:**
- Add debounce hook:
  ```tsx
  import { useDebouncedValue } from '@/hooks/useDebouncedValue';

  const debouncedInputs = useDebouncedValue(
    { riderLbs, passengerLbs, cargoFrontLbs, cargoRearLbs },
    100 // ms
  );

  useEffect(() => {
    const output = calculatePSI({ ...debouncedInputs, surface, construction });
    setResults(output);
  }, [debouncedInputs, surface, construction]);
  ```

**Acceptance Criteria:**
- [ ] Calculation debounced by 100ms
- [ ] Results feel instant (no perceived lag)
- [ ] No unnecessary re-renders during drag
- [ ] Analytics events also debounced

**Complexity:** S (3-4 hours)

---

### P3-2: Split models.json by Brand
**File:** `/data/models.json`

**Problem:**
- Single 50KB+ JSON file imported on every page
- Will grow to 250KB+ at 500 models

**Solution:**
- Split into `/data/brands/rad-power.json`, `/data/brands/aventon.json`, etc.
- Create index file:
  ```json
  // /data/models-index.json
  {
    "rad-power": ["radrunner-plus", "radmission-1", ...],
    "aventon": ["aventure-2", "level-2", ...]
  }
  ```
- Lazy-load brand data in calculator:
  ```tsx
  const loadModel = async (slug: string) => {
    const brand = getBrandFromSlug(slug);
    const models = await import(`@/data/brands/${brand}.json`);
    return models.find(m => m.slug === slug);
  };
  ```

**Acceptance Criteria:**
- [ ] Models split by brand (30+ files)
- [ ] Homepage/directory still load all models (via index)
- [ ] Calculator lazy-loads only selected model's brand
- [ ] No breaking changes to existing imports
- [ ] Bundle size reduced by 40KB+ (per route)

**Complexity:** L (2-3 days)

---

### P3-3: Add Visually Hidden Summary for Screen Readers
**Component:** `/components/ResultsCard.tsx`

**Problem:**
- aria-live announces raw JSX content (gibberish)

**Solution:**
- Add screen-reader-only text:
  ```tsx
  <div role="region" aria-live="polite">
    <span className="sr-only">
      {results && `Tire pressure calculated. Front tire: ${front.target} PSI target, ${front.min} to ${front.max} range. Rear tire: ${rear.target} PSI target, ${rear.min} to ${rear.max} range. ${warnings.lowPinchRisk ? 'Warning: pinch-flat risk.' : ''}`}
    </span>
    <ResultsCard results={results} />
  </div>
  ```

**Acceptance Criteria:**
- [ ] Screen reader announces results in plain English
- [ ] Includes warnings if present
- [ ] Updates only when results change (not on every re-render)
- [ ] Test with VoiceOver (macOS) and NVDA (Windows)

**Complexity:** M (1 day)

---

### P3-4: Improve Focus Management After Model Selection
**Component:** `/app/calculate/page.tsx`

**Problem:**
- After selecting model, focus stays on dropdown
- Keyboard users must tab 5+ times to reach next input

**Solution:**
- Move focus to first slider after model selection:
  ```tsx
  useEffect(() => {
    if (selectedModel) {
      const firstSlider = document.getElementById('rider-weight-slider');
      firstSlider?.focus();
    }
  }, [selectedModel]);
  ```

**Acceptance Criteria:**
- [ ] Focus moves to rider weight slider after model selected
- [ ] Smooth transition (no jarring jump)
- [ ] Screen reader announces new focus context
- [ ] Works with keyboard-only navigation

**Complexity:** S (2-3 hours)

---

### P3-5: Add Keyboard Shortcuts to Calculator
**Component:** `/app/calculate/page.tsx`

**Problem:**
- No power-user shortcuts

**Solution:**
- Add keyboard shortcuts:
  - `R` → Reset to defaults
  - `S` → Focus surface selector
  - `C` → Focus construction selector
  - `?` → Show keyboard shortcuts modal
- Use `useHotkeys` hook or similar

**Acceptance Criteria:**
- [ ] Shortcuts documented in modal (? key)
- [ ] Don't conflict with browser shortcuts
- [ ] Disabled when focus is in text input
- [ ] Accessible via screen reader

**Complexity:** M (1-2 days)

---

### P3-6: Add Error States to Form Inputs
**Components:** All calculator input components

**Problem:**
- No visual feedback for errors (though sliders prevent invalid input)

**Solution:**
- Add error prop to all inputs:
  ```tsx
  interface SliderProps {
    error?: string;
  }

  <div className={cn(error && "border-danger")}>
    <input ... />
    {error && <p className="text-xs text-danger mt-1">{error}</p>}
  </div>
  ```
- Add validation for edge cases (e.g., network error loading model)

**Acceptance Criteria:**
- [ ] Error messages display below invalid inputs
- [ ] Error state uses red border + icon
- [ ] aria-invalid and aria-describedby set correctly
- [ ] Clear actionable messaging ("Model not found. Try another.")

**Complexity:** M (1 day)

---

### P3-7: Add iOS Safe Area Padding
**File:** `/app/layout.tsx`, `/app/globals.css`

**Problem:**
- Sticky elements may overlap notch/home indicator on iOS

**Solution:**
- Add safe area CSS:
  ```css
  .sticky-top {
    top: env(safe-area-inset-top);
  }

  .sticky-bottom {
    bottom: env(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  ```
- Apply to:
  - Header (sticky top)
  - Mobile results bar (sticky bottom)

**Acceptance Criteria:**
- [ ] Header doesn't overlap notch on iPhone 12+
- [ ] Bottom bar doesn't overlap home indicator
- [ ] Test on real iOS device (not just Safari simulator)

**Complexity:** S (2-3 hours)

---

## Estimation Summary

### By Priority

| Priority | Total Items | Completed | Est. Time | Notes |
|----------|-------------|-----------|-----------|-------|
| P0 (Critical) | 5 items | **5 completed** ✅ | 8-13 days | Must complete first |
| P1 (High Impact) | 9 items | **7 completed** | 7-11 days | Significant UX gains |
| P2 (Polish) | 7 items | **5 completed** | 6-10 days | Nice-to-have improvements |
| P3 (Perf/A11y) | 7 items | 0 completed | 7-11 days | Long-term quality |
| **TOTAL** | **28 items** | **17 completed** | **28-45 days** | ~1.5-2 months (1-2 devs) |

### By Complexity

| Complexity | Count | Avg. Time Each |
|------------|-------|----------------|
| XS | 2 items | 1-2 hours |
| S | 10 items | 0.5-1 day |
| M | 12 items | 1-2 days |
| L | 2 items | 2-3 days |
| XL | 2 items | 3-5 days |

---

## Implementation Strategy

### Sprint 1-2: Critical Blockers (P0)
**Goal:** Fix immediate UX issues preventing conversions

1. P0-1: Searchable combobox (XL)
2. P0-2: Floating results on mobile (M)
3. P0-3: Contextual tooltips (M)
4. P0-4: Slider improvements (S)
5. P0-5: SafetyBand fixes (M)

**Duration:** 8-13 days
**Team:** 2 developers

---

### Sprint 3-4: High-Impact Features (P1)
**Goal:** Significantly improve usability and trust

1. P1-1: Hero copy rewrite (S)
2. P1-2: Visual bike icons (M)
3. P1-3: Custom selectors (M)
4. P1-4: Reset button (S)
5. P1-5: Model page context (S)
6. P1-6: Search feedback (M)
7. P1-7: Mobile nav fix (S)
8. P1-8: Remove beta pill (XS)
9. P1-9: Warning icons (S)

**Duration:** 7-11 days
**Team:** 2 developers

---

### Sprint 5-6: Polish Pass (P2)
**Goal:** Professional fit and finish

1. P2-1: Typography scale (M)
2. P2-2: Hover states (S)
3. P2-3: Card padding (XS)
4. P2-4: Loading states (M)
5. P2-6: Bike types on homepage (S)
6. P2-7: Model pagination (M)

**Duration:** 5-8 days
**Team:** 1-2 developers

---

### Sprint 7-8: Quality & Performance (P3)
**Goal:** Long-term maintainability and accessibility

1. P3-1: Debounce inputs (S)
2. P3-2: Split models.json (L)
3. P3-3: Screen reader summary (M)
4. P3-4: Focus management (S)
5. P3-5: Keyboard shortcuts (M)
6. P3-6: Error states (M)
7. P3-7: iOS safe area (S)

**Duration:** 7-11 days
**Team:** 1-2 developers

---

## Dependencies to Install

```bash
# Required for P0/P1 work
pnpm add @headlessui/react @heroicons/react
pnpm add @radix-ui/react-tooltip @radix-ui/react-select
pnpm add clsx tailwind-merge  # For cn() utility

# Optional for P2/P3
pnpm add react-window  # If implementing virtual scroll
pnpm add fuse.js  # If implementing fuzzy search
```

---

## Testing Checklist

After completing each priority tier, test:

### Desktop (Chrome, Firefox, Safari)
- [ ] Calculator workflow (model select → inputs → results)
- [ ] Search/filter in model directory
- [ ] Keyboard navigation (Tab, Enter, Space)
- [ ] Screen reader (VoiceOver on Mac)

### Mobile (iOS Safari, Chrome Android)
- [ ] All calculator inputs work with touch
- [ ] Floating results bar appears/hides correctly
- [ ] Nav doesn't overflow on small screens (320px)
- [ ] Safe area padding on iPhone 12+ (notch)

### Accessibility
- [ ] All interactive elements have 44×44px hit targets
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Focus visible on all focusable elements
- [ ] Screen reader can complete calculator flow
- [ ] Tooltips accessible via keyboard

### Performance
- [ ] Lighthouse score ≥90 (Performance, Accessibility)
- [ ] No layout shift (CLS < 0.1)
- [ ] First paint < 1.5s on 3G
- [ ] Calculator responds within 100ms

---

## Questions for Product/Design Review

Before starting implementation, resolve:

1. **P0-1 (Combobox):** Headless UI or Radix UI? (Recommendation: Headless UI, more Next.js examples)
2. **P1-2 (Icons):** Custom SVGs or icon library? Budget for custom design?
3. **P2-5 (Colors):** Keep current brand blue or refresh? (Needs design approval)
4. **P2-7 (Pagination):** Infinite scroll, "Load More," or traditional pagination?
5. **P3-2 (Data split):** OK to refactor models.json? May affect other teams/scripts.

---

## Success Metrics

Track before/after for:

- **Calculator completion rate** (model selected → results viewed)
- **Mobile bounce rate** (homepage → calculator)
- **Avg. time to first calculation** (should decrease)
- **Model search success rate** (search query → model selected)
- **Accessibility score** (WAVE or axe-core, target 0 errors)

---

**Document Owner:** Frontend Lead
**Last Updated:** 2025-11-12
**Review Cadence:** Weekly during implementation

