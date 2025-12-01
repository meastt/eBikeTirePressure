/**
 * Brand metadata and URL utilities for SEO-optimized brand pages
 */

export interface BrandMetadata {
  slug: string;
  displayName: string;
  description: string;
  shortDescription: string;
  websiteUrl?: string;
  tireTypes: string[];
}

/**
 * Generate a brand slug from the brand display name
 * Follows pattern: "Rad Power Bikes" → "rad-power"
 */
export function getBrandSlug(brandName: string): string {
  return brandName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/bikes?$/i, '') // Remove trailing "bike" or "bikes"
    .replace(/-+$/g, '') // Remove trailing hyphens
    .trim();
}

/**
 * Generate a model slug from the model name
 * Follows pattern: "RadRunner Plus" → "radrunner-plus"
 */
export function getModelSlug(modelName: string): string {
  return modelName
    .toLowerCase()
    .replace(/[^a-z0-9\s-.]/g, '') // Keep alphanumeric, spaces, hyphens, dots
    .replace(/\./g, '-') // Dots to hyphens
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/-+/g, '-') // Multiple hyphens to single
    .trim();
}

/**
 * Generate the canonical URL for a model's tire pressure guide
 */
export function getModelCanonicalUrl(brandSlug: string, modelSlug: string): string {
  return `/brands/${brandSlug}/${modelSlug}-tire-pressure`;
}

/**
 * Brand metadata database
 */
export const BRAND_METADATA: Record<string, BrandMetadata> = {
  'rad-power': {
    slug: 'rad-power',
    displayName: 'Rad Power Bikes',
    shortDescription: 'Popular cargo and utility e-bikes with fat tires',
    description: 'Rad Power Bikes is one of the largest direct-to-consumer e-bike brands in North America, known for their affordable cargo bikes, utility models, and fat-tire designs. Their bikes typically feature 20-26" fat tires (3.0-4.0" wide) optimized for versatility across pavement, gravel, and light trails.',
    websiteUrl: 'https://www.radpowerbikes.com',
    tireTypes: ['Fat Tire (20x3.3")', 'Fat Tire (22x3.0")', 'Fat Tire (26x4.0")', 'Standard (27.5x2.4")'],
  },
  'aventon': {
    slug: 'aventon',
    displayName: 'Aventon',
    shortDescription: 'Performance-focused commuter and fat-tire e-bikes',
    description: 'Aventon specializes in high-performance e-bikes ranging from sleek commuters to adventure-ready fat-tire models. Their lineup includes the Aventure series (26x4.0" fat tires), Level series (27.5x2.2" commuter), and Abound cargo bikes with reinforced tires.',
    websiteUrl: 'https://www.aventon.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Fat Tire (20x4.0")', 'Commuter (27.5x2.2")', 'Cargo (20x3.0")'],
  },
  'lectric': {
    slug: 'lectric',
    displayName: 'Lectric',
    shortDescription: 'Affordable folding and utility e-bikes',
    description: 'Lectric eBikes offers budget-friendly folding e-bikes and cargo models. Known for the XP series with 20x3.0" fat tires, XPedition cargo bikes, and the XPeak off-road model with 26x4.0" tires. Their bikes balance affordability with solid performance.',
    websiteUrl: 'https://lectricebikes.com',
    tireTypes: ['Fat Tire (20x3.0")', 'Fat Tire (26x4.0")', 'Compact (20x2.3")', 'Commuter (27.5x2.2")'],
  },
  'super73': {
    slug: 'super73',
    displayName: 'Super73',
    shortDescription: 'Moto-inspired e-bikes with fat tires',
    description: 'Super73 creates moto-style e-bikes with bold aesthetics and fat tire capability. Their models feature 20x4.0" tires designed for urban riding, beach cruising, and light trails. Known for aggressive styling and solid build quality.',
    websiteUrl: 'https://super73.com',
    tireTypes: ['Fat Tire (20x4.0")'],
  },
  'ride1up': {
    slug: 'ride1up',
    displayName: 'Ride1Up',
    shortDescription: 'Value-focused commuter and recreational e-bikes',
    description: 'Ride1Up delivers high-quality e-bikes at competitive prices. Their 700 Series features 27.5x2.2" commuter tires, while the Portola offers 20x3.0" fat tires for versatile riding. Focus on practical, everyday e-bikes.',
    websiteUrl: 'https://ride1up.com',
    tireTypes: ['Commuter (27.5x2.2")', 'Fat Tire (20x3.0")'],
  },
  'velotric': {
    slug: 'velotric',
    displayName: 'Velotric',
    shortDescription: 'Modern commuter and fat-tire e-bikes',
    description: 'Velotric offers sleek urban e-bikes and fat-tire models. The Discover series features 27.5x1.95" tires for city riding, while the Nomad 1 packs 20x4.0" fat tires for all-terrain capability. Known for integrated batteries and clean designs.',
    websiteUrl: 'https://www.velotricbike.com',
    tireTypes: ['Fat Tire (20x4.0")', 'Commuter (27.5x1.95")', 'Folding (20x3.0")'],
  },
  'heybike': {
    slug: 'heybike',
    displayName: 'HeyBike',
    shortDescription: 'Affordable fat-tire and folding e-bikes',
    description: 'HeyBike specializes in budget-friendly fat-tire e-bikes. The Mars 2.0 features 20x4.0" tires, while the Ranger S offers 26x4.0" tires for trail and beach riding. Great entry point for fat-tire e-biking.',
    websiteUrl: 'https://www.heybike.com',
    tireTypes: ['Fat Tire (20x4.0")', 'Fat Tire (26x4.0")'],
  },
  'trek': {
    slug: 'trek',
    displayName: 'Trek',
    shortDescription: 'Premium e-bikes with traditional cycling heritage',
    description: 'Trek brings decades of cycling expertise to their e-bike lineup. Models range from road (700x32c) to hybrid (27.5x2.4") tire sizes. Known for quality components, excellent warranty, and dealer support.',
    websiteUrl: 'https://www.trekbikes.com',
    tireTypes: ['Commuter (27.5x2.4")', 'Road (700x32c)', 'Hybrid (27.5x2.0")'],
  },
  'specialized': {
    slug: 'specialized',
    displayName: 'Specialized',
    shortDescription: 'High-performance e-bikes for every riding style',
    description: 'Specialized offers premium e-bikes across all categories. From lightweight road (27.5x1.95") to cargo (20x3.0") to trail (27.5x2.6"), they leverage cycling industry expertise to deliver top-tier e-bikes.',
    websiteUrl: 'https://www.specialized.com',
    tireTypes: ['Commuter (27.5x2.2")', 'Road (27.5x1.95")', 'Cargo (20x3.0")', 'Trail (27.5x2.6")'],
  },
  'tern': {
    slug: 'tern',
    displayName: 'Tern',
    shortDescription: 'Compact cargo e-bikes with reinforced tires',
    description: 'Tern specializes in compact cargo e-bikes with 20x2.4" reinforced tires. The GSD, HSD, and Quick Haul models are designed for hauling kids, groceries, and gear with high PSI ratings (35-50 PSI) for load capacity.',
    websiteUrl: 'https://www.ternbicycles.com',
    tireTypes: ['Cargo (20x2.4" reinforced)'],
  },
  'mokwheel': {
    slug: 'mokwheel',
    displayName: 'Mokwheel',
    shortDescription: 'Fat-tire e-bikes for adventure and cargo hauling',
    description: 'Mokwheel offers robust fat-tire e-bikes designed for all-terrain riding and cargo capacity. Their lineup features primarily 26x4.0" and 20x4.0" fat tires optimized for trail riding, beach cruising, and heavy loads. Models include the Basalt series, Obsidian, Tor Plus, and Granite Trike.',
    websiteUrl: 'https://www.mokwheel.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Fat Tire (20x4.0")', 'Fat Tire (20x3.0")', 'Commuter (27.5x2.4")'],
  },
  'urtopia': {
    slug: 'urtopia',
    displayName: 'Urtopia',
    shortDescription: 'Smart carbon fiber e-bikes with integrated technology',
    description: 'Urtopia creates lightweight carbon fiber e-bikes with integrated smart technology. Their models feature road-focused tire sizes (700x40c, 29x2.05", 18x2.0") designed for urban commuting and fitness riding. Known for ultra-light frames, fingerprint unlock, and connected app features.',
    websiteUrl: 'https://www.urtopia.com',
    tireTypes: ['Road (700x40c)', 'Trail (29x2.05")', 'Folding (18x2.0")', 'Compact (20x3.0")'],
  },
  'euphree': {
    slug: 'euphree',
    displayName: 'Euphree',
    shortDescription: 'Versatile commuter and trail e-bikes',
    description: 'Euphree offers practical e-bikes for commuting and recreational riding. Their lineup features 27.5" tire sizes ranging from 2.4" to 2.8" width, providing a balance between efficiency and comfort. Models like the City Robin and Stellar Falcon are designed for urban and light trail use.',
    websiteUrl: 'https://www.euphreebike.com',
    tireTypes: ['Trail (27.5x2.8")', 'Commuter (27.5x2.4")'],
  },
  'propella': {
    slug: 'propella',
    displayName: 'Propella',
    shortDescription: 'Lightweight single-speed and 7-speed commuter e-bikes',
    description: 'Propella creates ultra-lightweight e-bikes designed for efficient urban commuting. The 7S features 700x32c tires (50-85 PSI), the 9S Pro uses 700x35c tires (50-80 PSI), and the Mini folding model has 20x1.75" tires (40-65 PSI). Known for minimalist design, low weight, and road bike-style performance.',
    websiteUrl: 'https://www.propellabike.com',
    tireTypes: ['Road (700x35c)', 'Road (700x32c)', 'Folding (20x1.75")'],
  },
};

/**
 * Get brand metadata by slug
 */
export function getBrandMetadata(brandSlug: string): BrandMetadata | undefined {
  return BRAND_METADATA[brandSlug];
}

/**
 * Get all brand metadata
 */
export function getAllBrandMetadata(): BrandMetadata[] {
  return Object.values(BRAND_METADATA);
}
