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

## Scope - MVP Features

Phase 0 (Current):
- Next.js App Router with TypeScript and Tailwind CSS
- Route structure: home, calculator, model pages, hub index
- ESLint, Prettier, Husky pre-commit hooks
- GitHub Actions CI (build, lint, typecheck)
- next-sitemap and next-seo scaffolding
- Plausible analytics placeholder
- **PWA (Progressive Web App) support**
  - Installable on iOS and Android
  - Offline-aware with service worker caching
  - Web app manifest with theme colors
  - Install prompt component
  - Offline message banner

Phase 1 (Next):
- Calculator engine with deterministic PSI algorithm
- Model presets database (20+ popular e-bikes)
- Unit tests for edge cases
- Tire volume coefficients and axle bias calculations

Phase 2:
- Interactive calculator UI with real-time updates
- Weight sliders, surface selector, construction selector
- Results visualization with safety bands
- Deep-link support for pre-filled values

Phase 3:
- Static site generation for model pages
- SEO optimization with JSON-LD structured data
- Hub index page with model directory
- Pre-calculated PSI tables for common scenarios

Phase 4:
- Production deployment to Vercel
- Plausible analytics integration
- Performance optimization (Core Web Vitals)
- Google Search Console integration

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
  /(site)/page.tsx              # Home page
  /calculate/page.tsx           # Calculator (Phase 2)
  /models/[slug]/page.tsx       # Model-specific pages (Phase 3)
  /ebike-tire-pressure/page.tsx # Hub index (Phase 3)
  /layout.tsx                   # Root layout with header/footer
  /globals.css                  # Global styles

/lib
  /types.ts                     # TypeScript interfaces
  /seo.ts                       # SEO utilities
  /schema.ts                    # JSON-LD helpers
  /links.ts                     # Site navigation

/calc (Phase 1)
  /engine.ts                    # PSI calculation algorithm
  /volume.ts                    # Tire volume coefficients
  /engine.test.ts               # Unit tests

/data (Phase 1)
  /models.json                  # E-bike model presets

/components (Phase 2)
  /PresetPicker.tsx
  /WeightSliders.tsx
  /SurfaceSelector.tsx
  /ConstructionSelector.tsx
  /TrikeToggle.tsx
  /ResultsCard.tsx
  /SafetyBand.tsx
```

## How to Contribute

This project follows a phased development approach:

1. Create feature branches per phase: `phase-0/skeleton`, `phase-1/engine-and-data`, etc.
2. PR titles must start with `phase-X:` to indicate the phase
3. All PRs must pass CI checks (build, lint, typecheck)
4. Pre-commit hooks automatically run lint and typecheck
5. Follow the existing code style (Prettier enforced)

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

**Current Phase**: Phase 0 - Repository Skeleton ✅
**Next Phase**: Phase 1 - Data Model & Calculator Engine

See the main project plan document for detailed phase breakdown and acceptance criteria.
