# GEO Content Guidelines

This document defines standards for creating geographically-targeted content that serves international audiences and location-specific search intent.

## GEO Page Categories

### 1. International Market Pages

| Market | URL | Language | Units | Key Brands |
|--------|-----|----------|-------|------------|
| UK/EU | `/ebike-tyre-pressure/` | British English | Bar + PSI | Tern, Brompton, GoCycle, Riese & Müller, Gazelle |
| US (default) | All other pages | American English | PSI | All brands |

### 2. Climate-Based Pages

| Page | Climate Focus | Content Emphasis |
|------|---------------|------------------|
| `/hot-weather-ebike-tire-pressure/` | Hot/Desert | Heat expansion, max PSI safety |
| `/cold-weather-ebike-tire-pressure/` | Cold/Winter | PSI drop formulas, snow riding |
| `/beach-ebike-tire-pressure/` | Coastal/Sand | Low PSI flotation, salt protection |
| `/mountain-ebike-tire-pressure/` | High altitude | Altitude pressure changes, trail riding |

### 3. US State/Region Pages

| Page | Region | Climate Characteristics |
|------|--------|------------------------|
| `/california-ebike-tire-pressure/` | West Coast | Hot summers, varied terrain |
| `/florida-ebike-tire-pressure/` | Southeast | Humidity, beach, flat terrain |
| `/colorado-ebike-tire-pressure/` | Mountain | Altitude, temperature swings |
| `/arizona-ebike-tire-pressure/` | Southwest | Extreme heat, desert |
| `/texas-ebike-tire-pressure/` | South Central | Heat, varied terrain |
| `/new-york-ebike-tire-pressure/` | Northeast | Urban, seasonal changes |

## UK/EU Market Page Standards

### British English Usage

| American | British |
|----------|---------|
| Tire | Tyre |
| Sidewall | Sidewall (same) |
| PSI | Bar (with PSI conversion) |
| Color | Colour |
| Optimize | Optimise |
| Center | Centre |

### Content Template

```tsx
// UK Page Detection
const isUKPage = pathname.includes('tyre') || 
                 pathname.includes('uk') || 
                 pathname.includes('eu');

// Dynamic text
const tireWord = isUKPage ? 'Tyre' : 'Tire';
const pressureWord = isUKPage ? 'Bar' : 'PSI';

// PSI to Bar conversion helper
const psiToBar = (psi: number): string => (psi / 14.5038).toFixed(1);
const barToPsi = (bar: number): number => Math.round(bar * 14.5038);

// Display format for UK pages
const formatPressure = (psi: number, isUK: boolean): string => {
  if (isUK) {
    return `${psiToBar(psi)} Bar (${psi} PSI)`;
  }
  return `${psi} PSI`;
};
```

### UK Page H1 Examples

```
✅ "E-Bike Tyre Pressure Guide | Bar & PSI Charts"
✅ "Tern GSD Tyre Pressure | Cargo E-Bike Bar Settings"
✅ "Brompton Electric Tyre Pressure | Folding Bike Bar Guide"

❌ "E-Bike Tire Pressure Guide" (wrong spelling for UK)
❌ "Tern GSD Tire Pressure | PSI Charts" (should lead with Bar)
```

### UK Brand Prioritization

When displaying models on UK pages, prioritize these brands:
1. Tern (German/Taiwanese, popular in EU)
2. Brompton (British)
3. GoCycle (British)
4. Riese & Müller (German)
5. Gazelle (Dutch)
6. Cube (German)
7. Canyon (German)

### UK-Specific Content Sections

```markdown
## Bar vs PSI: Quick Reference

| Bar | PSI | Typical Use |
|-----|-----|-------------|
| 1.0 | 15 | Fat tyre, sand/snow |
| 1.5 | 22 | Fat tyre, trail |
| 2.0 | 29 | Fat tyre, pavement |
| 2.5 | 36 | Standard tyre, mixed |
| 3.0 | 44 | Commuter tyre |
| 3.5 | 51 | Road tyre |
| 4.0 | 58 | High-pressure road |

## UK E-Bike Regulations Note

In the UK, electrically assisted pedal cycles (EAPCs) must:
- Have a maximum power output of 250W
- Not propel the bike when travelling over 15.5mph
- Have pedals that can be used to propel it

Tyre pressure does not affect legal classification, but proper 
inflation is essential for safe braking at any speed.
```

## Climate-Based Page Standards

### Hot Weather Page Content

```markdown
## How Heat Affects Tyre Pressure

For every 10°F (5.5°C) increase in temperature, tyre pressure 
increases by approximately 1 PSI. On a hot summer day:

| Morning (70°F/21°C) | Afternoon (100°F/38°C) | Change |
|---------------------|------------------------|--------|
| 25 PSI | 28 PSI | +3 PSI |
| 35 PSI | 38 PSI | +3 PSI |
| 50 PSI | 53 PSI | +3 PSI |

### Hot Weather Recommendations

1. **Check pressure in the morning** before riding
2. **Set 2-3 PSI below target** if you'll ride in peak heat
3. **Never exceed sidewall max** even with temperature rise
4. **Avoid leaving e-bike in direct sun** - pressure can spike
5. **Carry a pressure gauge** on long rides
```

### Cold Weather Page Content

```markdown
## Winter Tyre Pressure Adjustments

For every 10°F (5.5°C) decrease in temperature, tyre pressure 
drops by approximately 1 PSI. Winter example:

| Garage (65°F/18°C) | Outdoor (25°F/-4°C) | Change |
|--------------------|---------------------|--------|
| 25 PSI | 21 PSI | -4 PSI |
| 35 PSI | 31 PSI | -4 PSI |

### Cold Weather Recommendations

1. **Check pressure outdoors** not in heated garage
2. **Add 2-4 PSI** if inflating indoors
3. **Lower pressure for snow/ice** (better traction)
4. **Use fat tyres** for winter riding (more flotation)
```

### State/Region Page Content

Each state page should include:

1. **Climate summary** - Average temperatures by season
2. **Terrain types** - Typical riding surfaces in that state
3. **Popular trails/routes** - Where e-bikers ride
4. **State regulations** - Any e-bike specific laws
5. **Recommended models** - Bikes suited to that climate
6. **Local resources** - E-bike shops, groups, trails

```markdown
## California E-Bike Tire Pressure Guide

### Climate Zones

California spans multiple climate zones:

| Region | Summer Avg | Winter Avg | Terrain |
|--------|------------|------------|---------|
| SoCal Coast | 75°F | 60°F | Beach, urban |
| SoCal Desert | 105°F | 65°F | Sand, pavement |
| Central Valley | 95°F | 50°F | Flat, agricultural |
| Bay Area | 70°F | 55°F | Urban, hills |
| Sierra Nevada | 80°F | 30°F | Mountain, trail |

### Regional Recommendations

**Southern California Beach Riding**
- Fat tire e-bikes recommended (26x4.0 or 20x4.0)
- Run 12-18 PSI for sand flotation
- Check for salt corrosion regularly

**Bay Area Commuting**
- Commuter tires (27.5x2.2 or 700c)
- Run 40-50 PSI for efficiency
- Adjust for hill climbing (slightly lower rear for traction)
```

## GEO Page Schema Markup

### Location-Specific Schema

```typescript
// For state/region pages
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "California E-Bike Tire Pressure Guide",
  "description": "...",
  "about": {
    "@type": "Place",
    "name": "California",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "CA",
      "addressCountry": "US"
    }
  }
};
```

### Hreflang Implementation

```tsx
// In generateMetadata for UK page
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://ebikepsi.com/ebike-tyre-pressure',
      languages: {
        'en-GB': 'https://ebikepsi.com/ebike-tyre-pressure',
        'en-US': 'https://ebikepsi.com/ebike-tire-pressure',
      },
    },
  };
}
```

## GEO Content Quality Checklist

- [ ] Correct spelling for target market (tire vs tyre)
- [ ] Appropriate units (PSI, Bar, or both)
- [ ] Region-specific brands prioritized
- [ ] Climate-appropriate recommendations
- [ ] Local regulations mentioned (if applicable)
- [ ] Hreflang tags set correctly
- [ ] Lang attribute matches content
- [ ] Schema includes geographic context

## Avoid These GEO Mistakes

1. **Don't auto-redirect** based on IP - let users choose
2. **Don't duplicate content** - each GEO page needs unique value
3. **Don't forget conversions** - always show both units for UK/EU
4. **Don't ignore cultural context** - e-bike culture differs by region
5. **Don't make assumptions** - verify local regulations before publishing

## GEO Page Internal Linking

```markdown
<!-- On UK page, link to US version -->
Looking for PSI-only measurements? See our 
[US tire pressure guide](/ebike-tire-pressure).

<!-- On US page, link to UK version -->
For Bar measurements and UK brands, see our 
[UK tyre pressure guide](/ebike-tyre-pressure).

<!-- On state pages, link to related states -->
Also see our guides for neighboring states:
- [Oregon E-Bike Tire Pressure](/oregon-ebike-tire-pressure)
- [Nevada E-Bike Tire Pressure](/nevada-ebike-tire-pressure)
```

## Content Freshness

GEO pages should be updated:
- **Annually**: Climate data, regulations
- **Quarterly**: Popular models, trails
- **As needed**: New regulations, major changes

Track update dates and show "Last updated" on pages to signal freshness to both users and search engines.
