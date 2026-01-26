/**
 * Category Definitions and Filters
 *
 * Defines e-bike categories for programmatic pages
 */

import type { ModelPreset } from '@/lib/types';
import modelsData from '@/data/models.json';

const models = modelsData as ModelPreset[];

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
  cargo: {
    slug: 'cargo-ebike-tire-pressure',
    name: 'Cargo',
    displayName: 'Cargo E-Bike',
    description:
      'Complete tire pressure guide for cargo and longtail e-bikes. Load-based PSI recommendations for hauling kids, groceries, and gear safely.',
    shortDescription: 'Longtail and compact cargo e-bikes for hauling',
    keywords: ['cargo ebike', 'longtail', 'family bike', 'hauling'],
    filter: (m) => {
      const isCargoBrand = ['Tern', 'Yuba', 'Benno'].some((b) => m.brand.includes(b));
      const isCargoModel = /cargo|wagon|haul|load|abound|xpedition|stretch|pakyak/i.test(m.model);
      const hasCargoGeometry = m.bikeWeightLbs > 70 && m.axleBias.rear >= 0.58;
      return isCargoBrand || isCargoModel || hasCargoGeometry;
    },
    contentFocus: [
      'Load-based PSI adjustments',
      'Passenger safety warnings',
      'Rear tire pressure priority',
      'Weight capacity limits',
    ],
    icon: '📦',
  },

  folding: {
    slug: 'folding-ebike-tire-pressure',
    name: 'Folding',
    displayName: 'Folding E-Bike',
    description:
      'Tire pressure recommendations for folding and compact e-bikes. Optimized PSI for small wheels, portability, and commuting.',
    shortDescription: 'Compact folding e-bikes for commuting and storage',
    keywords: ['folding ebike', 'foldable', 'compact', 'portable'],
    filter: (m) => {
      const size = m.stockTire.size.toLowerCase();
      const isFoldingSize = size.includes('16x') || size.includes('14x');
      const isFoldingBrand = ['Brompton', 'GoCycle'].some((b) => m.brand.includes(b));
      const isFoldingModel = /fold|vektron|compact/i.test(m.model);
      return isFoldingSize || isFoldingBrand || isFoldingModel;
    },
    contentFocus: [
      'Small wheel PSI requirements',
      'Higher pressure for efficiency',
      'Storage and transport tips',
    ],
    icon: '📂',
  },

  'fat-tire': {
    slug: 'fat-tire-ebike-tire-pressure',
    name: 'Fat Tire',
    displayName: 'Fat Tire E-Bike',
    description:
      'Fat tire e-bike PSI guide for all-terrain riding. Low pressure recommendations for sand, snow, trails, and beach cruising.',
    shortDescription: 'Wide tire e-bikes for all-terrain riding',
    keywords: ['fat tire', 'all-terrain', 'beach', 'snow', 'wide tire'],
    filter: (m) => {
      const parts = m.stockTire.size.split('x');
      const widthPart = parts[1] || '0';
      const widthMatch = widthPart.match(/[\d.]+/);
      const width = widthMatch ? parseFloat(widthMatch[0]) : 0;
      return width >= 3.5 || m.stockTire.size.includes('4.0');
    },
    contentFocus: ['Low PSI benefits', 'Terrain flotation', 'Sand and snow riding', 'Trail traction'],
    icon: '🏔️',
  },

  commuter: {
    slug: 'commuter-ebike-tire-pressure',
    name: 'Commuter',
    displayName: 'Commuter E-Bike',
    description:
      'Urban e-bike tire pressure for daily commuting. Optimize PSI for efficiency, comfort, and pothole protection.',
    shortDescription: 'Urban e-bikes for daily transportation',
    keywords: ['commuter', 'city', 'urban', 'daily rider'],
    filter: (m) => {
      const parts = m.stockTire.size.split('x');
      const widthPart = parts[1] || '0';
      const widthMatch = widthPart.match(/[\d.]+/);
      const width = widthMatch ? parseFloat(widthMatch[0]) : 0;
      const size = m.stockTire.size.toLowerCase();
      const isCommuterSize = (width >= 1.9 && width <= 2.6) || size.includes('700');
      const isNotFat = width < 3.0;
      const isNotCargo = m.bikeWeightLbs < 70 || m.axleBias.rear < 0.58;
      const isNotMoto = m.bikeWeightLbs < 90;
      return isCommuterSize && isNotFat && isNotCargo && isNotMoto;
    },
    contentFocus: [
      'Efficiency optimization',
      'Battery range impact',
      'Pothole protection',
      'Wet weather adjustments',
    ],
    icon: '🏙️',
  },

  'moto-style': {
    slug: 'moto-style-ebike-tire-pressure',
    name: 'Moto-Style',
    displayName: 'Moto-Style E-Bike',
    description:
      'Electric dirt bike and moto-style e-bike tire pressure. Off-road PSI settings for Sur-Ron, Talaria, and similar bikes.',
    shortDescription: 'Electric dirt bikes and moto-inspired e-bikes',
    keywords: ['sur-ron', 'talaria', 'dirt bike', 'moto', 'off-road'],
    filter: (m) => {
      const isMotoBrand = ['Sur-Ron', 'Talaria', 'UBCO'].some((b) => m.brand.includes(b));
      const isHeavy = m.bikeWeightLbs > 100;
      const isMotoSize = m.stockTire.size.includes('19x') || m.stockTire.size.includes('14x7');
      return isMotoBrand || isHeavy || isMotoSize;
    },
    contentFocus: [
      'Off-road traction',
      'Jump/landing pressure',
      'Dirt vs street settings',
      'Suspension interaction',
    ],
    icon: '🏍️',
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
  // Check both the full slug and the key
  const key = Object.keys(CATEGORIES).find((k) => CATEGORIES[k].slug === slug || k === slug);
  return key ? CATEGORIES[key] : null;
}

/**
 * Get models for a category
 */
export function getModelsForCategory(categoryKey: string): ModelPreset[] {
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

/**
 * Get all category keys
 */
export function getAllCategoryKeys(): string[] {
  return Object.keys(CATEGORIES);
}
