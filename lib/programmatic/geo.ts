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
  description:
    'Complete e-bike tyre pressure guide for UK and EU riders. Bar and PSI recommendations for all major brands.',
  language: 'en-GB',
  units: 'Both',
  targetKeywords: [
    'ebike tyre pressure',
    'electric bike tyre pressure uk',
    'ebike tyre pressure bar',
    'electric bike bar pressure',
  ],
  contentFocus: ['Bar unit display', 'UK/EU brand focus', 'British spelling throughout'],
  featuredBrands: ['Tern', 'Brompton', 'GoCycle', 'Riese & Müller', 'Gazelle', 'Cube', 'Canyon'],
};

/**
 * Climate-Based Pages
 */
export const CLIMATE_PAGES: GeoPageDefinition[] = [
  {
    slug: 'hot-weather-ebike-tire-pressure',
    name: 'Hot Weather E-Bike Tire Pressure',
    description:
      'Tire pressure adjustments for summer riding and hot climates. Prevent blowouts and optimize PSI for heat.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['hot weather tire pressure', 'summer ebike psi', 'tire pressure heat'],
    contentFocus: ['Heat expansion formula', 'Max PSI safety', 'Morning inflation tips'],
    climate: 'Hot/Desert',
  },
  {
    slug: 'cold-weather-ebike-tire-pressure',
    name: 'Cold Weather E-Bike Tire Pressure',
    description:
      'Winter e-bike tire pressure guide. Compensate for cold PSI drop and optimize for snow riding.',
    language: 'en-US',
    units: 'PSI',
    targetKeywords: ['winter ebike tire pressure', 'cold weather psi', 'tire pressure drop cold'],
    contentFocus: ['PSI drop formula', 'Indoor vs outdoor inflation', 'Snow riding tips'],
    climate: 'Cold/Winter',
  },
];

/**
 * Weight Category Pages
 */
export interface WeightCategoryDefinition {
  slug: string;
  name: string;
  weightRange: [number, number];
  description: string;
  targetKeywords: string[];
  contentFocus: string[];
}

export const WEIGHT_CATEGORIES: WeightCategoryDefinition[] = [
  {
    slug: 'heavy-rider-ebike-tire-pressure',
    name: 'Heavy Rider',
    weightRange: [220, 300],
    description:
      'E-bike tire pressure guide for heavier riders (220-300+ lbs). Higher PSI recommendations to prevent pinch flats and tire squirm.',
    targetKeywords: [
      'heavy rider ebike tire pressure',
      'ebike psi 250 lbs',
      'overweight rider tire pressure',
      'heavy person electric bike psi',
    ],
    contentFocus: [
      'Higher PSI requirements',
      'Weight capacity limits',
      'Reinforced tire options',
      'Preventing pinch flats',
    ],
  },
  {
    slug: 'lightweight-rider-tire-pressure',
    name: 'Lightweight Rider',
    weightRange: [100, 150],
    description:
      'E-bike tire pressure for lighter riders (100-150 lbs). Lower PSI for comfort without risking flats.',
    targetKeywords: ['lightweight rider tire pressure', 'small rider ebike psi', 'low weight tire pressure'],
    contentFocus: ['Comfort vs efficiency', 'Avoiding over-inflation', 'Minimum safe PSI'],
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
  return temps.map((temp) => ({
    temp,
    psi: calculateTemperatureAdjustment(basePSI, inflationTemp, temp),
  }));
}

/**
 * British spelling replacements
 */
export const UK_SPELLINGS: Record<string, string> = {
  tire: 'tyre',
  Tire: 'Tyre',
  color: 'colour',
  Color: 'Colour',
  optimize: 'optimise',
  Optimize: 'Optimise',
  center: 'centre',
  Center: 'Centre',
  fiber: 'fibre',
  Fiber: 'Fibre',
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

/**
 * Get weight category by slug
 */
export function getWeightCategoryBySlug(slug: string): WeightCategoryDefinition | null {
  return WEIGHT_CATEGORIES.find((w) => w.slug === slug) || null;
}
