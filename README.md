# E-Bike PSI - Tire Pressure Calculator

A professional, mechanic-grade e-bike tire pressure calculator that provides precise PSI recommendations based on bike model, rider weight, cargo distribution, terrain, and tire construction.

## Project Purpose

This tool helps e-bike riders determine optimal tire pressure by accounting for multiple real-world factors that affect performance, comfort, and safety. Unlike generic tire pressure charts, our calculator considers:

- Specific bike weight and tire specifications
- Rider and passenger weight
- Front and rear cargo distribution
- Riding surface (pavement, mixed, dirt, sand/snow)
- Tire construction (tubed, tubeless, reinforced)
- Trike configurations with proper load distribution
- Temperature adjustments (optional)

The calculator provides min/target/max PSI values with visual safety bands and warnings for pinch-flat risk, sidewall limits, and terrain-specific concerns.

## Current Features

All MVP phases (0-5) are complete and deployed:

**Core Functionality:**
- ✅ Deterministic PSI calculator engine with 100+ bike models
- ✅ Interactive UI with real-time calculations
- ✅ Weight sliders with debouncing and numeric inputs
- ✅ Surface selector (pavement, mixed, dirt, sand/snow)
- ✅ Tire construction selector (tubed, tubeless, reinforced)
- ✅ Trike mode with proper load distribution
- ✅ Results visualization with safety bands and warnings
- ✅ Deep-link support for pre-filled values

**Content & SEO:**
- ✅ 100+ static model pages with JSON-LD structured data
- ✅ Model directory with search, filtering, and pagination
- ✅ Brand directory pages for popular manufacturers
- ✅ Blog with MDX support (5+ articles and growing)
- ✅ FAQ page with comprehensive Q&As
- ✅ Privacy policy and Terms of Service pages
- ✅ RSS feed for blog content
- ✅ Automated sitemap generation (30+ URLs)

**Technical & Infrastructure:**
- ✅ Next.js 15 App Router with TypeScript
- ✅ Tailwind CSS with custom design system
- ✅ PWA support (installable, offline-aware)
- ✅ Production deployment on Vercel
- ✅ Plausible analytics integration
- ✅ GitHub Actions CI/CD
- ✅ ESLint, Prettier, Husky pre-commit hooks
- ✅ Core Web Vitals optimization (90+ Lighthouse score)

**Recent UX Improvements:**
- ✅ Searchable bike model combobox with fuzzy matching
- ✅ Floating mobile results preview
- ✅ Contextual help tooltips
- ✅ Enhanced typography and color system
- ✅ Loading states and error handling
- ✅ Screen reader accessibility improvements
- ✅ iOS safe area support

## Non-Goals (Post-MVP)

- User accounts or cloud profiles
- TPMS (Tire Pressure Monitoring System) integrations
- Multi-language support
- Blog or CMS features
- Payment/subscription features
- Complex tire casing catalogs

## How to Run

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## How to Test

```bash
# Run tests (when available in Phase 1)
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format check
pnpm format:check
```

## How to Build

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
/app
  /(site)/page.tsx                    # Home page
  /calculate/page.tsx                 # Interactive calculator
  /models/[slug]/page.tsx             # Model-specific pages (100+)
  /ebike-tire-pressure/page.tsx       # Model directory with search
  /brands/page.tsx                    # Brand directory
  /brands/[brand]/page.tsx            # Brand-specific pages
  /blog/page.tsx                      # Blog index with pagination
  /blog/[slug]/page.tsx               # Blog article pages (MDX)
  /blog/rss.xml/route.ts              # RSS feed
  /faq/page.tsx                       # FAQ page
  /privacy/page.tsx                   # Privacy policy
  /terms/page.tsx                     # Terms of service
  /layout.tsx                         # Root layout with header/footer
  /globals.css                        # Global styles

/lib
  /types.ts                           # TypeScript interfaces
  /seo.ts                             # SEO utilities
  /schema.ts                          # JSON-LD helpers
  /links.ts                           # Site navigation
  /blog.ts                            # Blog/MDX utilities
  /readingTime.ts                     # Reading time calculation
  /rss.ts                             # RSS feed generation
  /useDebounce.ts                     # Debounce hook

/calc
  /engine.ts                          # PSI calculation algorithm
  /volume.ts                          # Tire volume coefficients
  /engine.test.ts                     # Unit tests

/data
  /models.json                        # E-bike model presets (100+)
  /brands.json                        # Brand metadata

/content/blog
  /*.mdx                              # Blog articles (MDX format)

/components
  /PresetPicker.tsx                   # Searchable bike model selector
  /WeightSliders.tsx                  # Weight input sliders
  /SurfaceSelector.tsx                # Terrain type selector
  /ConstructionSelector.tsx           # Tire construction selector
  /TrikeToggle.tsx                    # Three-wheel mode toggle
  /ResultsCard.tsx                    # PSI results display
  /SafetyBand.tsx                     # Visual PSI safety indicator
  /Footer.tsx                         # Global footer
  /BlogCard.tsx                       # Blog post preview card
  /TagPill.tsx                        # Tag display component
  /Prose.tsx                          # MDX typography wrapper
```

## How to Contribute

This project is actively maintained and welcomes contributions:

1. Create feature branches from `main`: `feature/your-feature-name`
2. All PRs must pass CI checks (build, lint, typecheck, tests)
3. Pre-commit hooks automatically run lint and typecheck
4. Follow the existing code style (Prettier enforced)
5. Add tests for new calculator features
6. Update documentation for significant changes
7. See [ROADMAP.md](./ROADMAP.md) for planned features and improvements

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **PWA**: next-pwa (installable, offline-aware)
- **Testing**: (Jest/Vitest to be added in Phase 1)
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky
- **CI/CD**: GitHub Actions + Vercel
- **Analytics**: Plausible (privacy-friendly)
- **SEO**: next-seo, next-sitemap, JSON-LD structured data

## Brand & Design

**Tone**: Mechanic-grade, trustworthy, non-racer. Think "torque-spec manual," not "gravel race poster."

**Color Palette**:
- Brand Blue: `#1E88E5` (primary actions)
- Success/OK: `#16A34A` (optimal PSI range)
- Warning: `#F59E0B` (borderline values)
- Danger: `#DC2626` (pinch/sidewall risk)
- Surface: `#F7F8FA` (cards, inputs)
- Text: `#0F172A` (primary)

**Typography**: Inter font family, mobile-first responsive design

## Progressive Web App (PWA)

This app is a fully-featured PWA that can be installed on iOS and Android devices.

### Features

- **Installable**: Add to home screen from Safari (iOS) or Chrome (Android)
- **Offline-aware**: Service worker caches static assets for instant loading
- **Native feel**: Standalone display mode hides browser UI
- **Install prompt**: Smart prompt appears after first use (dismissible)
- **Offline banner**: Shows when network is unavailable

### PWA Icons

PWA icons are located in `/public/icons/`. You'll need to create:

- `icon-192.png` - 192x192px standard icon
- `icon-512.png` - 512x512px standard icon
- `maskable-512.png` - 512x512px maskable icon (80% safe zone)

See `/public/icons/README.md` for design guidelines.

### Testing PWA Locally

```bash
# Build for production (PWA only works in production mode)
pnpm build

# Start production server
pnpm start

# Open http://localhost:3000
# You should see "Install" option in browser menu
```

### Mobile App Wrapping (Optional)

For native app store distribution, use Capacitor:

```bash
# Install Capacitor
pnpm add -D @capacitor/cli
pnpm add @capacitor/core @capacitor/ios @capacitor/android

# Initialize
npx cap init "E-Bike PSI" "app.ebikepsi" --web-dir=out

# For static export, enable in next.config.ts:
# output: 'export'

# Add platforms
npx cap add ios
npx cap add android

# Build and sync
pnpm build
npx cap copy
npx cap open ios    # or android
```

## License

Proprietary - All Rights Reserved

This software is proprietary and confidential. See LICENSE file for details.

## Development Status

**Current Status**: ✅ All MVP phases complete (0-5) and deployed to production

**Completed Phases:**
- ✅ Phase 0: Repository skeleton and infrastructure
- ✅ Phase 1: Calculator engine and model database
- ✅ Phase 2: Interactive calculator UI
- ✅ Phase 3: Static model pages and SEO optimization
- ✅ Phase 4: Production deployment and analytics
- ✅ Phase 5: Blog, FAQ, and content layer

**Next Steps**: See [ROADMAP.md](./ROADMAP.md) for upcoming features and improvements.
