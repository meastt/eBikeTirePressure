/**
 * Tire Size Utilities
 *
 * Handles tire size normalization, grouping, and display formatting
 */

import type { ModelPreset } from '@/lib/types';
import modelsData from '@/data/models.json';
import { normalizeTireSizeForUrl, denormalizeTireSize } from './url-utils';

const models = modelsData as ModelPreset[];

export type TireSizeCategory =
  | 'Fat Tire'
  | 'Standard'
  | 'Commuter'
  | 'Road'
  | 'Cargo'
  | 'Folding'
  | 'Mountain'
  | 'Moto';

export interface TireSizeInfo {
  slug: string; // URL-safe: "20x4-0"
  displaySize: string; // Human-readable: "20x4.0"
  modelCount: number;
  brands: string[];
  avgMinPSI: number;
  avgMaxPSI: number;
  category: TireSizeCategory;
  models: ModelPreset[];
}

/**
 * Get all unique tire sizes from models
 */
export function getAllTireSizes(): string[] {
  const sizes = new Set<string>();
  models.forEach((m) => {
    if (m.stockTire?.size) {
      sizes.add(normalizeTireSizeForUrl(m.stockTire.size));
    }
  });
  return Array.from(sizes).sort();
}

/**
 * Get models by normalized tire size
 */
export function getModelsByTireSize(normalizedSize: string): ModelPreset[] {
  return models.filter((m) => normalizeTireSizeForUrl(m.stockTire.size) === normalizedSize);
}

/**
 * Categorize tire size
 */
export function categorizeTireSize(displaySize: string): TireSizeCategory {
  const parts = displaySize.toLowerCase().split('x');
  const diameter = parts[0] || '';
  const widthPart = parts[1] || '2.0';

  // Extract numeric width
  const widthMatch = widthPart.match(/[\d.]+/);
  const width = widthMatch ? parseFloat(widthMatch[0]) : 2.0;

  if (width >= 4.0) return 'Fat Tire';
  if (width >= 3.0) return 'Fat Tire';
  if (displaySize.includes('700') || displaySize.includes('c')) return 'Road';
  if (diameter === '16' || diameter === '14') return 'Folding';
  if (diameter === '19' || displaySize.includes('14x7')) return 'Moto';
  if (width >= 2.4) return 'Mountain';
  if (width >= 1.9) return 'Commuter';
  return 'Standard';
}

/**
 * Estimate PSI when not provided
 */
export function estimateMinPSI(displaySize: string): number {
  const parts = displaySize.split('x');
  const widthPart = parts[1] || '2.0';
  const widthMatch = widthPart.match(/[\d.]+/);
  const width = widthMatch ? parseFloat(widthMatch[0]) : 2.0;

  if (width >= 4.0) return 12;
  if (width >= 3.0) return 20;
  if (width >= 2.5) return 25;
  if (width >= 2.0) return 35;
  return 50;
}

export function estimateMaxPSI(displaySize: string): number {
  const parts = displaySize.split('x');
  const widthPart = parts[1] || '2.0';
  const widthMatch = widthPart.match(/[\d.]+/);
  const width = widthMatch ? parseFloat(widthMatch[0]) : 2.0;

  if (width >= 4.0) return 25;
  if (width >= 3.0) return 35;
  if (width >= 2.5) return 50;
  if (width >= 2.0) return 65;
  return 85;
}

/**
 * Get tire size info with all metadata
 */
export function getTireSizeInfo(normalizedSize: string): TireSizeInfo | null {
  const sizeModels = getModelsByTireSize(normalizedSize);
  if (sizeModels.length === 0) return null;

  const displaySize = denormalizeTireSize(normalizedSize);
  const brands = [...new Set(sizeModels.map((m) => m.brand))];

  const psiValues = sizeModels
    .filter((m) => m.stockTire.minPSI && m.stockTire.maxPSI)
    .map((m) => ({ min: m.stockTire.minPSI!, max: m.stockTire.maxPSI! }));

  const avgMinPSI =
    psiValues.length > 0
      ? Math.round(psiValues.reduce((sum, p) => sum + p.min, 0) / psiValues.length)
      : estimateMinPSI(displaySize);

  const avgMaxPSI =
    psiValues.length > 0
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
    models: sizeModels,
  };
}

/**
 * Get all tire sizes with metadata (for directory pages)
 */
export function getAllTireSizeInfo(): TireSizeInfo[] {
  return getAllTireSizes()
    .map((size) => getTireSizeInfo(size))
    .filter((info): info is TireSizeInfo => info !== null)
    .sort((a, b) => b.modelCount - a.modelCount);
}

/**
 * Get related tire sizes for linking
 */
export function getRelatedTireSizes(currentSize: string, limit = 4): TireSizeInfo[] {
  const current = getTireSizeInfo(currentSize);
  if (!current) return [];

  const allSizes = getAllTireSizeInfo().filter((s) => s.slug !== currentSize);

  // Prefer same category, then by model count
  return allSizes
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return b.modelCount - a.modelCount;
    })
    .slice(0, limit);
}

/**
 * Parse tire width from size string
 */
export function parseTireWidth(displaySize: string): number {
  const parts = displaySize.split('x');
  const widthPart = parts[1] || '2.0';
  const widthMatch = widthPart.match(/[\d.]+/);
  return widthMatch ? parseFloat(widthMatch[0]) : 2.0;
}

/**
 * Check if a tire size is considered "fat"
 */
export function isFatTire(displaySize: string): boolean {
  return parseTireWidth(displaySize) >= 3.0;
}
