import type { ModelPreset } from "./types";
import modelsData from "@/data/models.json";

const models = modelsData as ModelPreset[];

export interface BrandInfo {
  slug: string;
  name: string;
  models: ModelPreset[];
  modelCount: number;
  // Avatar initial for display
  initial: string;
}

/**
 * Get brand slug from brand name
 */
function getBrandSlug(brandName: string): string {
  return brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Get first letter of brand for avatar
 */
function getBrandInitial(brandName: string): string {
  return brandName.charAt(0).toUpperCase();
}

/**
 * Derive brands list from models
 */
export function getBrands(): BrandInfo[] {
  const brandMap = new Map<string, ModelPreset[]>();

  // Group models by brand
  models.forEach((model) => {
    const existing = brandMap.get(model.brand) || [];
    brandMap.set(model.brand, [...existing, model]);
  });

  // Convert to BrandInfo array
  const brands: BrandInfo[] = [];
  brandMap.forEach((brandModels, brandName) => {
    brands.push({
      slug: getBrandSlug(brandName),
      name: brandName,
      models: brandModels,
      modelCount: brandModels.length,
      initial: getBrandInitial(brandName),
    });
  });

  // Sort alphabetically
  return brands.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a single brand by slug
 */
export function getBrandBySlug(slug: string): BrandInfo | undefined {
  return getBrands().find((b) => b.slug === slug);
}

/**
 * Get model types/categories for filtering
 */
export type ModelType = "Fat Tire" | "Cargo" | "Folding" | "Standard" | "Moto-Style";

export function getModelType(model: ModelPreset): ModelType {
  const tireWidth = parseFloat(model.stockTire.size.split("x")[1] || "0");
  const tireSize = model.stockTire.size.toLowerCase();

  if (tireWidth >= 3.5 || tireSize.includes("4.0")) {
    return "Fat Tire";
  }
  if (
    model.bikeWeightLbs > 70 &&
    (model.brand.toLowerCase().includes("tern") ||
      model.brand.toLowerCase().includes("yuba") ||
      model.model.toLowerCase().includes("cargo") ||
      model.model.toLowerCase().includes("wagon") ||
      model.model.toLowerCase().includes("load"))
  ) {
    return "Cargo";
  }
  if (
    tireSize.includes("16x") ||
    tireSize.includes("14x") ||
    model.brand.toLowerCase().includes("brompton")
  ) {
    return "Folding";
  }
  if (
    model.bikeWeightLbs > 100 ||
    model.brand.toLowerCase().includes("sur-ron") ||
    model.brand.toLowerCase().includes("talaria") ||
    model.brand.toLowerCase().includes("ubco")
  ) {
    return "Moto-Style";
  }
  return "Standard";
}

/**
 * Filter brands by model type
 */
export function filterBrandsByType(brands: BrandInfo[], type: ModelType): BrandInfo[] {
  return brands
    .map((brand) => ({
      ...brand,
      models: brand.models.filter((model) => getModelType(model) === type),
      modelCount: brand.models.filter((model) => getModelType(model) === type).length,
    }))
    .filter((brand) => brand.modelCount > 0);
}

/**
 * Search brands/models by query
 */
export function searchBrands(brands: BrandInfo[], query: string): BrandInfo[] {
  if (!query.trim()) return brands;

  const q = query.toLowerCase();
  return brands
    .map((brand) => ({
      ...brand,
      models: brand.models.filter(
        (model) =>
          brand.name.toLowerCase().includes(q) ||
          model.model.toLowerCase().includes(q) ||
          model.stockTire.size.toLowerCase().includes(q)
      ),
      modelCount: brand.models.filter(
        (model) =>
          brand.name.toLowerCase().includes(q) ||
          model.model.toLowerCase().includes(q) ||
          model.stockTire.size.toLowerCase().includes(q)
      ).length,
    }))
    .filter((brand) => brand.modelCount > 0 || brand.name.toLowerCase().includes(q));
}

