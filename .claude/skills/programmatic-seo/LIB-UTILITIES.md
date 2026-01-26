# Library Utilities Specification

This document specifies the utility functions and modules needed in `lib/programmatic/` to support programmatic SEO page generation.

## Directory Structure

```
lib/
├── programmatic/
│   ├── index.ts              # Barrel exports
│   ├── tire-sizes.ts         # Tire size utilities
│   ├── categories.ts         # Category definitions & filters
│   ├── geo.ts                # GEO/regional utilities
│   ├── weights.ts            # Weight category utilities
│   ├── comparisons.ts        # Comparison page utilities
│   ├── learn-topics.ts       # Learn/glossary content
│   ├── schema-generators.ts  # JSON-LD schema helpers
│   ├── url-utils.ts          # URL normalization
│   └── psi-calculators.ts    # PSI calculation helpers
```

---

## tire-sizes.ts

```typescript
/**
 * Tire Size Utilities
 * 
 * Handles tire size normalization, grouping, and display formatting
 */

import type { ModelPreset } from '@/lib/types';
import modelsData from '@/data/models.json';

const models = modelsData as ModelPreset[];

/**
 * Normalize tire size for URL usage
 * "20x3.0" → "20x3-0"
 * "27.5x2.2" → "27-5x2-2"
 */
export function normalizeTireSizeForUrl(size: string): string {
  return size
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-x]/g, '')
    .replace(/-+/g, '-');
}

/**
 * Denormalize URL tire size back to display format
 * "20x3-0" → "20x3.0"
 * "27-5x2-2" → "27.5x2.2"
 */
export function denormalizeTireSize(urlSize: string): string {
  // Handle cases like "27-5x2-2" → "27.5x2.2"
  // But keep "20x4-0" as "20x4.0"
  return urlSize
    .replace(/(\d+)-(\d+)x/g, '$1.$2x')  // Before 'x'
    .replace(/x(\d+)-(\d+)/g, 'x$1.$2')  // After 'x'
    .replace(/-(\d+)$/g, '.$1');          // At end
}

/**
 * Get all unique tire sizes from models
 */
export function getAllTireSizes(): string[] {
  const sizes = new Set<string>();
  models.forEach(m => {
    if (m.stockTire?.size) {
      sizes.add(normalizeTireSizeForUrl(m.stockTire.size));
    }
  });
  return Array.from(sizes).sort();
}

/**
 * Get all tire sizes with metadata
 */
export interface TireSizeInfo {
  slug: string;           // URL-safe: "20x4-0"
  displaySize: string;    // Human-readable: "20x4.0"
  modelCount: number;
  brands: string[];
  avgMinPSI: number;
  avgMaxPSI: number;
  category: TireSizeCategory;
}

export type TireSizeCategory = 
  | 'Fat Tire' 
  | 'Standard' 
  | 'Commuter' 
  | 'Road' 
  | 'Cargo' 
  | 'Folding'
  | 'Mountain'
  | 'Moto';

export function getTireSizeInfo(normalizedSize: string): TireSizeInfo | null {
  const sizeModels = getModelsByTireSize(normalizedSize);
  if (sizeModels.length === 0) return null;
  
  const displaySize = denormalizeTireSize(normalizedSize);
  const brands = [...new Set(sizeModels.map(m => m.brand))];
  
  const psiValues = sizeModels
    .filter(m => m.stockTire.minPSI && m.stockTire.maxPSI)
    .map(m => ({ min: m.stockTire.minPSI!, max: m.stockTire.maxPSI! }));
  
  const avgMinPSI = psiValues.length > 0
    ? Math.round(psiValues.reduce((sum, p) => sum + p.min, 0) / psiValues.length)
    : estimateMinPSI(displaySize);
    
  const avgMaxPSI = psiValues.length > 0
    ? Math.round(psiValues.reduce((sum, p) => sum + p.max, 0) / psiValues.length)
    : estimateMaxPSI(displaySize);
  
  return {
    slug: normalizedSize,
    displaySize,
    modelCount: sizeModels.length,
    brands,
    avgMinPSI,
    avgMaxPSI,
    category: categorizeTireSize(displaySize),
  };
}

/**
 * Get models by normalized tire size
 */
export function getModelsByTireSize(normalizedSize: string): ModelPreset[] {
  return models.filter(m => 
    normalizeTireSizeForUrl(m.stockTire.size) === normalizedSize
  );
}

/**
 * Categorize tire size
 */
export function categorizeTireSize(displaySize: string): TireSizeCategory {
  const width = parseFloat(displaySize.split('x')[1] || '0');
  const diameter = displaySize.split('x')[0];
  
  if (width >= 4.0) return 'Fat Tire';
  if (width >= 3.0) return 'Fat Tire';
  if (displaySize.includes('700') || displaySize.includes('c')) return 'Road';
  if (diameter === '16' || diameter === '14') return 'Folding';
  if (diameter === '19' || diameter === '14x7') return 'Moto';
  if (width >= 2.4) return 'Mountain';
  if (width >= 1.9) return 'Commuter';
  return 'Standard';
}

/**
 * Estimate PSI when not provided
 */
export function estimateMinPSI(displaySize: string): number {
  const width = parseFloat(displaySize.split('x')[1] || '2.0');
  if (width >= 4.0) return 12;
  if (width >= 3.0) return 20;
  if (width >= 2.5) return 25;
  if (width >= 2.0) return 35;
  return 50;
}

export function estimateMaxPSI(displaySize: string): number {
  const width = parseFloat(displaySize.split('x')[1] || '2.0');
  if (width >= 4.0) return 25;
  if (width >= 3.0) return 35;
  if (width >= 2.5) return 50;
  if (width >= 2.0) return 65;
  return 85;
}

/**
 * Get related tire sizes for linking
 */
export function getRelatedTireSizes(currentSize: string, limit = 4): TireSizeInfo[] {
  const current = getTireSizeInfo(currentSize);
  if (!current) return [];
  
  const allSizes = getAllTireSizes()
    .map(s => getTireSizeInfo(s))
    .filter((s): s is TireSizeInfo => s !== null && s.slug !== currentSize);
  
  // Prefer same category, then by model count
  return allSizes
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return b.modelCount - a.modelCount;
    })
    .slice(0, limit);
}
```

---

## categories.ts

```typescript
/**
 * Category Definitions and Filters
 * 
 * Defines e-bike categories for programmatic pages
 */

import type { ModelPreset } from '@/lib/types';

export interface CategoryDefinition {
  slug: string;
  name: string;
  displayName: string;
  description: string;
  shortDescription: string;
  keywords: string[];
  filter: (model: ModelPreset) => boolean;
  contentFocus: string[];
  icon: string;
}

export const CATEGORIES: Record<string, CategoryDefinition> = {
  'cargo': {
    slug: 'cargo-ebike-tire-pressure',
    name: 'Cargo',
    displayName: 'Cargo E-Bike',
    description: 'Complete tire pressure guide for cargo and longtail e-bikes. Load-based PSI recommendations for hauling kids, groceries, and gear safely.',
    shortDescription: 'Longtail and compact cargo e-bikes for hauling',
    keywords: ['cargo ebike', 'longtail', 'family bike', 'hauling'],
    filter: (m) => {
      const isCargoBrand = ['Tern', 'Yuba', 'Benno'].some(b => m.brand.includes(b));
      const isCargoModel = /cargo|wagon|haul|load|abound|xpedition/i.test(m.model);
      const hasCargoGeometry = m.bikeWeightLbs > 70 && m.axleBias.rear >= 0.58;
      return isCargoBrand || isCargoModel || hasCargoGeometry;
    },
    contentFocus: [
      'Load-based PSI adjustments',
      'Passenger safety warnings',
      'Rear tire pressure priority',
      'Weight capacity limits'
    ],
    icon: '📦',
  },
  
  'folding': {
    slug: 'folding-ebike-tire-pressure',
    name: 'Folding',
    displayName: 'Folding E-Bike',
    description: 'Tire pressure recommendations for folding and compact e-bikes. Optimized PSI for small wheels, portability, and commuting.',
    shortDescription: 'Compact folding e-bikes for commuting and storage',
    keywords: ['folding ebike', 'foldable', 'compact', 'portable'],
    filter: (m) => {
      const size = m.stockTire.size.toLowerCase();
      const isFoldingSize = size.includes('16x') || size.includes('14x');
      const isFoldingBrand = ['Brompton', 'GoCycle'].some(b => m.brand.includes(b));
      const isFoldingModel = /fold|vektron|compact/i.test(m.model);
      const isLightweight = m.bikeWeightLbs < 55 && size.includes('20x');
      return isFoldingSize || isFoldingBrand || isFoldingModel || isLightweight;
    },
    contentFocus: [
      'Small wheel PSI requirements',
      'Higher pressure for efficiency',
      'Storage and transport tips'
    ],
    icon: '📂',
  },
  
  'fat-tire': {
    slug: 'fat-tire-ebike-tire-pressure',
    name: 'Fat Tire',
    displayName: 'Fat Tire E-Bike',
    description: 'Fat tire e-bike PSI guide for all-terrain riding. Low pressure recommendations for sand, snow, trails, and beach cruising.',
    shortDescription: 'Wide tire e-bikes for all-terrain riding',
    keywords: ['fat tire', 'all-terrain', 'beach', 'snow', 'wide tire'],
    filter: (m) => {
      const width = parseFloat(m.stockTire.size.split('x')[1] || '0');
      return width >= 3.5 || m.stockTire.size.includes('4.0');
    },
    contentFocus: [
      'Low PSI benefits',
      'Terrain flotation',
      'Sand and snow riding',
      'Trail traction'
    ],
    icon: '🏔️',
  },
  
  'commuter': {
    slug: 'commuter-ebike-tire-pressure',
    name: 'Commuter',
    displayName: 'Commuter E-Bike',
    description: 'Urban e-bike tire pressure for daily commuting. Optimize PSI for efficiency, comfort, and pothole protection.',
    shortDescription: 'Urban e-bikes for daily transportation',
    keywords: ['commuter', 'city', 'urban', 'daily rider'],
    filter: (m) => {
      const width = parseFloat(m.stockTire.size.split('x')[1] || '0');
      const size = m.stockTire.size.toLowerCase();
      const isCommuterSize = (width >= 1.9 && width <= 2.6) || size.includes('700');
      const isNotFat = width < 3.0;
      const isNotCargo = m.bikeWeightLbs < 70;
      const isNotMoto = m.bikeWeightLbs < 90;
      return isCommuterSize && isNotFat && isNotCargo && isNotMoto;
    },
    contentFocus: [
      'Efficiency optimization',
      'Battery range impact',
      'Pothole protection',
      'Wet weather adjustments'
    ],
    icon: '🏙️',
  },
  
  'moto-style': {
    slug: 'moto-style-ebike-tire-pressure',
    name: 'Moto-Style',
    displayName: 'Moto-Style E-Bike',
    description: 'Electric dirt bike and moto-style e-bike tire pressure. Off-road PSI settings for Sur-Ron, Talaria, and similar bikes.',
    shortDescription: 'Electric dirt bikes and moto-inspired e-bikes',
    keywords: ['sur-ron', 'talaria', 'dirt bike', 'moto', 'off-road'],
    filter: (m) => {
      const isMotoBrand = ['Sur-Ron', 'Talaria', 'UBCO'].some(b => m.brand.includes(b));
      const isHeavy = m.bikeWeightLbs > 100;
      const isMotoSize = m.stockTire.size.includes('19x') || m.stockTire.size.includes('14x7');
      return isMotoBrand || isHeavy || isMotoSize;
    },
    contentFocus: [
      'Off-road traction',
      'Jump/landing pressure',
      'Dirt vs street settings',
      'Suspension interaction'
    ],
    icon: '🏍️',
  },
  
  'class-3': {
    slug: 'class-3-ebike-tire-pressure',
    name: 'Class 3',
    displayName: 'Class 3 E-Bike',
    description: 'High-speed Class 3 e-bike tire pressure for safe 28 mph riding. PSI recommendations for braking, stability, and heat management.',
    shortDescription: 'High-speed e-bikes (28 mph)',
    keywords: ['class 3', '28 mph', 'high speed', 'speed pedelec'],
    filter: (m) => {
      // Class 3 bikes are typically commuter-style with higher-end specs
      const isSpeedBrand = ['Specialized', 'Trek', 'Giant', 'Serial 1'].some(b => m.brand.includes(b));
      const hasSpeedModel = /speed|class.?3|turbo/i.test(m.model);
      return isSpeedBrand || hasSpeedModel;
    },
    contentFocus: [
      'High-speed stability',
      'Braking distance',
      'Heat buildup on long rides',
      'Safety margins'
    ],
    icon: '⚡',
  },
};

/**
 * Get all categories
 */
export function getAllCategories(): CategoryDefinition[] {
  return Object.values(CATEGORIES);
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): CategoryDefinition | null {
  const key = Object.keys(CATEGORIES).find(
    k => CATEGORIES[k].slug === slug || k === slug
  );
  return key ? CATEGORIES[key] : null;
}

/**
 * Get models for a category
 */
export function getModelsForCategory(
  models: ModelPreset[], 
  categoryKey: string
): ModelPreset[] {
  const category = CATEGORIES[categoryKey];
  if (!category) return [];
  return models.filter(category.filter);
}

/**
 * Get category for a model
 */
export function getCategoryForModel(model: ModelPreset): CategoryDefinition | null {
  for (const category of Object.values(CATEGORIES)) {
    if (category.filter(model)) {
      return category;
    }
  }
  return null;
}
```

---

## geo.ts

```typescript
/**
 * GEO/Regional Content Utilities
 * 
 * Handles UK/EU content, climate-based pages, and US state pages
 */

export interface GeoPageDefinition {
  slug: string;
  name: string;
  description: string;
  language: 'en-US' | 'en-GB';
  units: 'PSI' | 'Bar' | 'Both';
  targetKeywords: string[];
  contentFocus: string[];
  featuredBrands?: string[];
  climate?: string;
  terrainTypes?: string[];
}

/**
 * UK/EU Market Page
 */
export const UK_PAGE: GeoPageDefinition = {
  slug: 'ebike-tyre-pressure',
  name: 'UK/EU E-Bike Tyre Pressure Guide',
  description: 'Complete e-bike tyre pressure guide for UK and EU riders. Bar and PSI recommendations for all major brands.',
  language: 'en-GB',
  units: 'Both',
  targetKeywords: [
    'ebike tyre pressure',
    'electric bike tyre pressure uk',
    'ebike tyre pressure bar',
    'electric bike bar pressure'
  ],
  contentFocus: [
    'Bar unit display',
    'UK/EU brand focus',
    'British spelling throughout'
  ],
  featuredBrands: ['Tern', 'Brompton', 'GoCycle', 'Riese & Müller', 'Gazelle', 'Cube', 'Canyon'],
};

/**
 * Climate-Based Pages
 */
export const CLIMATE_PAGES: GeoPageDefinition[] = [
  {
    slug: 'hot-weather-ebike-tire-pressure',
    name: 'Hot Weather E-Bike Tire Pressure',
    description: 'Tire pressure adjustments for summer riding and hot climates. Prevent blowouts and optimize PSI for heat.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['hot weather tire pressure', 'summer ebike psi', 'tire pressure heat'],
    contentFocus: ['Heat expansion formula', 'Max PSI safety', 'Morning inflation tips'],
    climate: 'Hot/Desert',
  },
  {
    slug: 'cold-weather-ebike-tire-pressure',
    name: 'Cold Weather E-Bike Tire Pressure',
    description: 'Winter e-bike tire pressure guide. Compensate for cold PSI drop and optimize for snow riding.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['winter ebike tire pressure', 'cold weather psi', 'tire pressure drop cold'],
    contentFocus: ['PSI drop formula', 'Indoor vs outdoor inflation', 'Snow riding tips'],
    climate: 'Cold/Winter',
  },
  {
    slug: 'beach-ebike-tire-pressure',
    name: 'Beach E-Bike Tire Pressure',
    description: 'Sand and beach riding tire pressure. Low PSI techniques for flotation on soft surfaces.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['beach ebike tire pressure', 'sand riding psi', 'beach cruiser pressure'],
    contentFocus: ['Sand flotation', 'Salt corrosion', 'Fat tire recommendations'],
    climate: 'Coastal',
    terrainTypes: ['Sand', 'Beach'],
  },
  {
    slug: 'mountain-ebike-tire-pressure',
    name: 'Mountain E-Bike Tire Pressure',
    description: 'Trail and mountain e-bike tire pressure for altitude and terrain changes.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['mountain ebike tire pressure', 'trail riding psi', 'altitude tire pressure'],
    contentFocus: ['Altitude effects', 'Trail traction', 'Descent safety'],
    climate: 'Mountain',
    terrainTypes: ['Trail', 'Rocky', 'Steep'],
  },
];

/**
 * US State Pages
 */
export const US_STATE_PAGES: GeoPageDefinition[] = [
  {
    slug: 'california-ebike-tire-pressure',
    name: 'California E-Bike Tire Pressure',
    description: 'E-bike tire pressure guide for California riders. From beach cruising to mountain trails.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['california ebike tire pressure', 'socal ebike psi'],
    contentFocus: ['Multiple climate zones', 'Beach to mountain', 'CA e-bike laws'],
    climate: 'Mediterranean/Desert',
    terrainTypes: ['Beach', 'Urban', 'Mountain', 'Desert'],
  },
  {
    slug: 'florida-ebike-tire-pressure',
    name: 'Florida E-Bike Tire Pressure',
    description: 'Florida e-bike tire pressure for humidity, heat, and beach riding.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['florida ebike tire pressure', 'florida beach bike psi'],
    contentFocus: ['High humidity', 'Beach riding', 'Flat terrain'],
    climate: 'Subtropical',
    terrainTypes: ['Beach', 'Urban', 'Flat'],
  },
  {
    slug: 'colorado-ebike-tire-pressure',
    name: 'Colorado E-Bike Tire Pressure',
    description: 'Colorado e-bike tire pressure for altitude and mountain riding.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['colorado ebike tire pressure', 'denver ebike psi', 'altitude tire pressure'],
    contentFocus: ['Altitude pressure changes', 'Temperature swings', 'Trail riding'],
    climate: 'Mountain/Semi-arid',
    terrainTypes: ['Mountain', 'Trail', 'Urban'],
  },
  {
    slug: 'texas-ebike-tire-pressure',
    name: 'Texas E-Bike Tire Pressure',
    description: 'Texas e-bike tire pressure for hot weather and varied terrain.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['texas ebike tire pressure', 'houston ebike psi', 'austin ebike'],
    contentFocus: ['Extreme heat', 'Urban commuting', 'Hill country'],
    climate: 'Hot/Humid to Arid',
    terrainTypes: ['Urban', 'Ranch', 'Hill Country'],
  },
  {
    slug: 'new-york-ebike-tire-pressure',
    name: 'New York E-Bike Tire Pressure',
    description: 'NYC and New York state e-bike tire pressure for urban and trail riding.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['new york ebike tire pressure', 'nyc ebike psi', 'brooklyn ebike'],
    contentFocus: ['Urban commuting', 'Pothole protection', 'Seasonal changes'],
    climate: 'Continental',
    terrainTypes: ['Urban', 'Trail'],
  },
  {
    slug: 'arizona-ebike-tire-pressure',
    name: 'Arizona E-Bike Tire Pressure',
    description: 'Arizona e-bike tire pressure for desert heat and terrain.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['arizona ebike tire pressure', 'phoenix ebike psi', 'desert ebike'],
    contentFocus: ['Extreme heat warnings', 'Desert riding', 'Sun exposure'],
    climate: 'Desert',
    terrainTypes: ['Desert', 'Urban'],
  },
];

/**
 * Unit conversion utilities
 */
export function psiToBar(psi: number): number {
  return psi / 14.5038;
}

export function barToPsi(bar: number): number {
  return bar * 14.5038;
}

export function formatPressure(psi: number, units: 'PSI' | 'Bar' | 'Both'): string {
  switch (units) {
    case 'PSI':
      return `${psi} PSI`;
    case 'Bar':
      return `${psiToBar(psi).toFixed(1)} Bar`;
    case 'Both':
      return `${psi} PSI (${psiToBar(psi).toFixed(1)} Bar)`;
  }
}

/**
 * Temperature adjustment formulas
 */
export function calculateTemperatureAdjustment(
  basePSI: number,
  inflationTempF: number,
  ridingTempF: number
): number {
  // Approximately 1 PSI per 10°F change
  const tempDiff = ridingTempF - inflationTempF;
  const psiChange = tempDiff / 10;
  return Math.round(basePSI + psiChange);
}

/**
 * Generate temperature PSI table
 */
export function generateTempPSITable(
  basePSI: number,
  inflationTemp: number = 70
): Array<{ temp: number; psi: number }> {
  const temps = [30, 40, 50, 60, 70, 80, 90, 100, 110];
  return temps.map(temp => ({
    temp,
    psi: calculateTemperatureAdjustment(basePSI, inflationTemp, temp),
  }));
}

/**
 * British spelling replacements
 */
export const UK_SPELLINGS: Record<string, string> = {
  'tire': 'tyre',
  'Tire': 'Tyre',
  'color': 'colour',
  'Color': 'Colour',
  'optimize': 'optimise',
  'Optimize': 'Optimise',
  'center': 'centre',
  'Center': 'Centre',
  'fiber': 'fibre',
  'Fiber': 'Fibre',
};

/**
 * Convert text to British English
 */
export function toBritishEnglish(text: string): string {
  let result = text;
  for (const [us, uk] of Object.entries(UK_SPELLINGS)) {
    result = result.replace(new RegExp(us, 'g'), uk);
  }
  return result;
}
```

---

## schema-generators.ts

```typescript
/**
 * JSON-LD Schema Generators for Programmatic Pages
 */

import type { ModelPreset } from '@/lib/types';

const BASE_URL = 'https://ebikepsi.com';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Organization',
      name: 'E-Bike PSI',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'E-Bike PSI',
      url: BASE_URL,
    },
    datePublished: params.datePublished || '2024-01-01',
    dateModified: params.dateModified || new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url.startsWith('http') ? params.url : `${BASE_URL}${params.url}`,
    },
  };
}

/**
 * Generate ItemList schema for model listings
 */
export function generateItemListSchema(params: {
  name: string;
  description: string;
  models: ModelPreset[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    description: params.description,
    numberOfItems: params.models.length,
    itemListElement: params.models.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${model.brand} ${model.model}`,
      url: `${BASE_URL}/models/${model.slug}`,
    })),
  };
}

/**
 * Generate Product comparison schema
 */
export function generateComparisonSchema(modelA: ModelPreset, modelB: ModelPreset) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${modelA.brand} ${modelA.model} vs ${modelB.brand} ${modelB.model}`,
    description: `Tire pressure comparison between ${modelA.brand} ${modelA.model} and ${modelB.brand} ${modelB.model}`,
    about: [
      {
        '@type': 'Product',
        name: `${modelA.brand} ${modelA.model}`,
        brand: {
          '@type': 'Brand',
          name: modelA.brand,
        },
      },
      {
        '@type': 'Product',
        name: `${modelB.brand} ${modelB.model}`,
        brand: {
          '@type': 'Brand',
          name: modelB.brand,
        },
      },
    ],
  };
}

/**
 * Generate HowTo schema for guides
 */
export function generateHowToSchema(params: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Combine multiple schemas into array
 */
export function combineSchemas(...schemas: object[]): object[] {
  return schemas.filter(Boolean);
}
```

---

## url-utils.ts

```typescript
/**
 * URL Normalization and Generation Utilities
 */

/**
 * Normalize any string for URL usage
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate comparison URL from two model slugs
 */
export function generateComparisonUrl(modelASlug: string, modelBSlug: string): string {
  // Always alphabetize to create canonical URL
  const [first, second] = [modelASlug, modelBSlug].sort();
  return `/compare/${first}-vs-${second}`;
}

/**
 * Parse comparison URL to get model slugs
 */
export function parseComparisonUrl(slug: string): { modelA: string; modelB: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { modelA: match[1], modelB: match[2] };
}

/**
 * Generate tire size URL
 */
export function tireSizeToUrl(size: string): string {
  return `/tire-size/${size
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-x]/g, '')}`;
}

/**
 * Generate absolute URL
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ebikepsi.com';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http') && !url.includes('ebikepsi.com');
}
```

---

## Index Barrel Export

```typescript
// lib/programmatic/index.ts

export * from './tire-sizes';
export * from './categories';
export * from './geo';
export * from './schema-generators';
export * from './url-utils';
```
