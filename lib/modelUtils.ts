/**
 * Utilities for enriching and working with model data
 */

import type { ModelPreset } from './types';
import { getBrandSlug, getModelSlug, getModelCanonicalUrl } from './brandMetadata';

/**
 * Enrich a model with computed SEO fields
 */
export function enrichModel(model: ModelPreset): ModelPreset {
  const brandSlug = getBrandSlug(model.brand);
  const modelSlug = getModelSlug(model.model);
  const canonicalUrl = getModelCanonicalUrl(brandSlug, modelSlug);

  return {
    ...model,
    brandSlug,
    modelSlug,
    canonicalUrl,
  };
}

/**
 * Enrich an array of models
 */
export function enrichModels(models: ModelPreset[]): ModelPreset[] {
  return models.map(enrichModel);
}

/**
 * Find a model by brand slug and model slug
 */
export function findModelByBrandAndModelSlug(
  models: ModelPreset[],
  brandSlug: string,
  modelSlug: string
): ModelPreset | undefined {
  const enrichedModels = enrichModels(models);
  return enrichedModels.find(
    (m) => m.brandSlug === brandSlug && m.modelSlug === modelSlug
  );
}

/**
 * Get all models for a specific brand
 */
export function getModelsByBrandSlug(
  models: ModelPreset[],
  brandSlug: string
): ModelPreset[] {
  const enrichedModels = enrichModels(models);
  return enrichedModels.filter((m) => m.brandSlug === brandSlug);
}

/**
 * Group models by brand slug
 */
export function groupModelsByBrand(models: ModelPreset[]): Record<string, ModelPreset[]> {
  const enrichedModels = enrichModels(models);
  const grouped: Record<string, ModelPreset[]> = {};

  enrichedModels.forEach((model) => {
    const brandSlug = model.brandSlug!;
    if (!grouped[brandSlug]) {
      grouped[brandSlug] = [];
    }
    grouped[brandSlug].push(model);
  });

  return grouped;
}

/**
 * Get all unique brand slugs from models
 */
export function getAllBrandSlugs(models: ModelPreset[]): string[] {
  const enrichedModels = enrichModels(models);
  const slugs = new Set<string>();
  enrichedModels.forEach((model) => {
    if (model.brandSlug) {
      slugs.add(model.brandSlug);
    }
  });
  return Array.from(slugs).sort();
}
