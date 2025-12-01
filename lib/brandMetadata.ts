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
 * Updated to point to /models/ pages as the primary destination
 */
export function getModelCanonicalUrl(brandSlug: string, modelSlug: string, fullModelSlug?: string): string {
  // If fullModelSlug is provided, use it directly
  if (fullModelSlug) {
    return `/models/${fullModelSlug}`;
  }
  // Otherwise construct from brand and model slugs
  return `/models/${brandSlug}-${modelSlug}`;
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
  'addmotor': {
    slug: 'addmotor',
    displayName: 'Addmotor',
    shortDescription: 'Fat-tire e-bikes for all-terrain riding',
    description: 'Addmotor specializes in powerful fat-tire electric bikes designed for adventure and cargo. Their models feature 20x4.0" and 26x4.0" fat tires built for trails, snow, and beach riding.',
    websiteUrl: 'https://www.addmotor.com',
    tireTypes: ['Fat Tire (20x4.0")', 'Fat Tire (26x4.0")'],
  },
  'ariel-rider': {
    slug: 'ariel-rider',
    displayName: 'Ariel Rider',
    shortDescription: 'High-performance moto-style e-bikes',
    description: 'Ariel Rider creates powerful moto-style e-bikes with fat tire capability. Known for the Grizzly and X-Class models with 26x4.0" tires and high-speed performance.',
    websiteUrl: 'https://arielrider.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Fat Tire (20x4.0")'],
  },
  'benno': {
    slug: 'benno',
    displayName: 'Benno',
    shortDescription: 'Compact utility e-bikes',
    description: 'Benno Bikes offers compact utility e-bikes designed for urban cargo hauling. Models feature 20" and 24" tire sizes optimized for carrying groceries, kids, and gear.',
    websiteUrl: 'https://www.bennobikes.com',
    tireTypes: ['Utility (20x2.4")', 'Utility (24x2.4")'],
  },
  'biktrix': {
    slug: 'biktrix',
    displayName: 'Biktrix',
    shortDescription: 'Canadian fat-tire e-bikes',
    description: 'Biktrix manufactures high-quality fat-tire e-bikes in Canada. The Juggernaut series features 26x4.0" tires designed for all-season riding including snow and trails.',
    websiteUrl: 'https://www.biktrix.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Fat Tire (27.5x3.0")'],
  },
  'blix': {
    slug: 'blix',
    displayName: 'Blix',
    shortDescription: 'Swedish-designed commuter e-bikes',
    description: 'Blix offers Scandinavian-designed e-bikes for urban commuting. Models range from compact folders to cargo bikes with tire sizes from 20x2.15" to 24x2.3".',
    websiteUrl: 'https://www.blixbike.com',
    tireTypes: ['Commuter (24x2.3")', 'Folding (20x2.15")'],
  },
  'brompton': {
    slug: 'brompton',
    displayName: 'Brompton',
    shortDescription: 'Iconic British folding bikes',
    description: 'Brompton Electric brings the legendary folding bike to the e-bike world. Features compact 16x1.5" tires requiring high PSI (60-100) for efficient city riding.',
    websiteUrl: 'https://www.brompton.com',
    tireTypes: ['Folding (16x1.5")'],
  },
  'canyon': {
    slug: 'canyon',
    displayName: 'Canyon',
    shortDescription: 'German-engineered performance e-bikes',
    description: 'Canyon offers premium e-bikes across road, gravel, and mountain categories. Tire sizes range from 700c road tires to 29" mountain bike tires.',
    websiteUrl: 'https://www.canyon.com',
    tireTypes: ['Road (700x32c)', 'Gravel (700x40c)', 'Mountain (29x2.4")'],
  },
  'cube': {
    slug: 'cube',
    displayName: 'Cube',
    shortDescription: 'German touring and trekking e-bikes',
    description: 'Cube manufactures versatile e-bikes for touring and urban riding. Models typically feature 27.5" or 28" (700c) tires optimized for long-distance comfort.',
    websiteUrl: 'https://www.cube.eu',
    tireTypes: ['Touring (700x40c)', 'Hybrid (27.5x2.4")'],
  },
  'electric-bike-company': {
    slug: 'electric-bike-company',
    displayName: 'Electric Bike Company',
    shortDescription: 'Beach cruiser style e-bikes',
    description: 'Electric Bike Company creates American-made beach cruiser e-bikes. Models feature fat 26x4.0" tires perfect for sand, boardwalks, and casual riding.',
    websiteUrl: 'https://www.electricbikecompany.com',
    tireTypes: ['Fat Tire (26x4.0")'],
  },
  'espin': {
    slug: 'espin',
    displayName: 'Espin',
    shortDescription: 'Affordable folding and commuter e-bikes',
    description: 'Espin offers budget-friendly e-bikes for urban commuting. Models range from folding bikes with 20" tires to commuters with 27.5" tires.',
    websiteUrl: 'https://www.espinbikes.com',
    tireTypes: ['Commuter (27.5x2.2")', 'Folding (20x3.0")'],
  },
  'evelo': {
    slug: 'evelo',
    displayName: 'Evelo',
    shortDescription: 'Comfort-focused e-bikes',
    description: 'Evelo specializes in comfortable, upright-position e-bikes. Models feature 26" and 27.5" tires designed for stability and ease of use.',
    websiteUrl: 'https://evelo.com',
    tireTypes: ['Comfort (26x2.3")', 'Hybrid (27.5x2.2")'],
  },
  'gazelle': {
    slug: 'gazelle',
    displayName: 'Gazelle',
    shortDescription: 'Dutch commuter e-bikes',
    description: 'Gazelle is a premium Dutch brand known for comfortable upright bikes. Models typically use 28" (700c) tires optimized for European city riding.',
    websiteUrl: 'https://www.gazellebikes.com',
    tireTypes: ['City (28x1.75")', 'Touring (700x40c)'],
  },
  'gocycle': {
    slug: 'gocycle',
    displayName: 'GoCycle',
    shortDescription: 'High-tech folding e-bikes',
    description: 'GoCycle creates innovative folding e-bikes with proprietary technology. Features unique tire sizes and high PSI requirements for compact urban riding.',
    websiteUrl: 'https://gocycle.com',
    tireTypes: ['Folding (20x2.0")', 'Folding (16x1.5")'],
  },
  'gotrax': {
    slug: 'gotrax',
    displayName: 'GOTRAX',
    shortDescription: 'Budget-friendly urban e-bikes',
    description: 'GOTRAX offers affordable e-bikes for casual riders. Models feature 20" and 16" tires designed for urban commuting and recreational use.',
    websiteUrl: 'https://gotrax.com',
    tireTypes: ['Commuter (20x1.75")', 'Folding (16x1.5")'],
  },
  'himiway': {
    slug: 'himiway',
    displayName: 'Himiway',
    shortDescription: 'All-terrain fat-tire e-bikes',
    description: 'Himiway specializes in powerful fat-tire e-bikes for all conditions. The Cobra and Cruiser models feature 26x4.0" tires built for trails, snow, and beach riding.',
    websiteUrl: 'https://www.himiwaybike.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Fat Tire (20x4.0")'],
  },
  'juiced-bikes': {
    slug: 'juiced-bikes',
    displayName: 'Juiced Bikes',
    shortDescription: 'Long-range commuter e-bikes',
    description: 'Juiced Bikes creates high-capacity e-bikes for long commutes. Models range from 20" fat tire cruisers to 28" road-style commuters.',
    websiteUrl: 'https://www.juicedbikes.com',
    tireTypes: ['Fat Tire (20x4.0")', 'Commuter (28x1.95")', 'Hybrid (27.5x2.1")'],
  },
  'kbo': {
    slug: 'kbo',
    displayName: 'KBO',
    shortDescription: 'Urban commuter e-bikes',
    description: 'KBO offers practical city e-bikes at accessible prices. Models feature 27.5" and 26" tires optimized for urban commuting.',
    websiteUrl: 'https://www.kbo.bike',
    tireTypes: ['Commuter (27.5x2.2")', 'City (26x2.1")'],
  },
  'magicycle': {
    slug: 'magicycle',
    displayName: 'Magicycle',
    shortDescription: 'Fat-tire e-bikes for heavy riders',
    description: 'Magicycle builds robust fat-tire e-bikes designed for riders up to 350+ lbs. Models feature 26x4.0" tires with high load capacity.',
    websiteUrl: 'https://www.magicyclebike.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Fat Tire (20x4.0")'],
  },
  'magnum': {
    slug: 'magnum',
    displayName: 'Magnum',
    shortDescription: 'Versatile cruiser e-bikes',
    description: 'Magnum offers a range of cruiser and commuter e-bikes. Models feature various tire sizes from 26x2.3" commuters to 26x4.0" fat tire bikes.',
    websiteUrl: 'https://www.magnumbikes.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Cruiser (26x2.3")', 'Commuter (27.5x2.2")'],
  },
  'momentum': {
    slug: 'momentum',
    displayName: 'Momentum',
    shortDescription: 'Accessible city e-bikes',
    description: 'Momentum creates approachable city bikes with step-through frames. Models typically feature 27.5" or 700c tires for comfortable urban riding.',
    websiteUrl: 'https://www.momentum-biking.com',
    tireTypes: ['City (27.5x2.2")', 'Commuter (700x35c)'],
  },
  'pedego': {
    slug: 'pedego',
    displayName: 'Pedego',
    shortDescription: 'Premium cruiser e-bikes',
    description: 'Pedego is known for comfortable beach cruiser style e-bikes. Models feature 26" tires designed for relaxed, upright riding.',
    websiteUrl: 'https://www.pedegoelectricbikes.com',
    tireTypes: ['Cruiser (26x2.3")', 'Fat Tire (26x4.0")'],
  },
  'priority': {
    slug: 'priority',
    displayName: 'Priority',
    shortDescription: 'Low-maintenance belt-drive e-bikes',
    description: 'Priority manufactures e-bikes with carbon belt drives for minimal maintenance. Models feature 27.5" and 700c tires optimized for urban commuting.',
    websiteUrl: 'https://www.prioritybicycles.com',
    tireTypes: ['Commuter (27.5x2.2")', 'City (700x35c)'],
  },
  'riese-muller': {
    slug: 'riese-muller',
    displayName: 'Riese & Müller',
    shortDescription: 'German premium cargo and touring e-bikes',
    description: 'Riese & Müller creates high-end e-bikes including cargo models. The Load 75 features 20x2.4" reinforced tires designed for heavy loads.',
    websiteUrl: 'https://www.r-m.de',
    tireTypes: ['Cargo (20x2.4")', 'Touring (27.5x2.4")'],
  },
  'segway': {
    slug: 'segway',
    displayName: 'Segway',
    shortDescription: 'Innovative off-road e-bikes',
    description: 'Segway offers unique off-road capable e-bikes. Models like the Xafari feature fat tires designed for trail and adventure riding.',
    websiteUrl: 'https://www.segway.com',
    tireTypes: ['Fat Tire (26x4.0")', 'Off-Road (27.5x3.0")'],
  },
  'serial-1': {
    slug: 'serial-1',
    displayName: 'Serial 1',
    shortDescription: 'Harley-Davidson heritage e-bikes',
    description: 'Serial 1, born from Harley-Davidson, creates premium minimalist e-bikes. Models feature clean designs with 27.5" and 700c tire sizes.',
    websiteUrl: 'https://www.serial1.com',
    tireTypes: ['Urban (27.5x2.2")', 'Road (700x40c)'],
  },
  'sondors': {
    slug: 'sondors',
    displayName: 'Sondors',
    shortDescription: 'Affordable fat-tire e-bikes',
    description: 'Sondors offers budget-friendly fat-tire e-bikes. Models feature 20x4.0" and 26x4.0" tires designed for beach and trail riding.',
    websiteUrl: 'https://sondors.com',
    tireTypes: ['Fat Tire (20x4.0")', 'Fat Tire (26x4.0")'],
  },
  'sur-ron': {
    slug: 'sur-ron',
    displayName: 'Sur-Ron',
    shortDescription: 'Electric dirt bikes',
    description: 'Sur-Ron manufactures electric motorcycles/dirt bikes. The Light Bee features dirt bike tires requiring low PSI (8-15) for off-road traction.',
    websiteUrl: 'https://www.sur-ron.com',
    tireTypes: ['Off-Road (19x2.5")', 'Moto (14x2.5")'],
  },
  'talaria': {
    slug: 'talaria',
    displayName: 'Talaria',
    shortDescription: 'Electric motocross bikes',
    description: 'Talaria creates electric motocross bikes for serious off-road riding. Features moto-style tires with low PSI requirements for maximum traction.',
    websiteUrl: 'https://talariaebike.com',
    tireTypes: ['Motocross (19x2.5")', 'Off-Road (14x2.5")'],
  },
  'ubco': {
    slug: 'ubco',
    displayName: 'UBCO',
    shortDescription: 'Utility electric work bikes',
    description: 'UBCO manufactures utility electric bikes for work applications. The 2x2 features unique 14x7.0" tires with very low PSI (8-12) for extreme off-road capability.',
    websiteUrl: 'https://ubco.com',
    tireTypes: ['Utility (14x7.0")'],
  },
  'vanmoof': {
    slug: 'vanmoof',
    displayName: 'VanMoof',
    shortDescription: 'Smart city e-bikes',
    description: 'VanMoof created integrated smart city bikes with theft tracking. Models feature 27.5x2.4" tires optimized for urban riding. (Note: Company ceased operations in 2023)',
    websiteUrl: 'https://www.vanmoof.com',
    tireTypes: ['City (27.5x2.4")'],
  },
  'yuba': {
    slug: 'yuba',
    displayName: 'Yuba',
    shortDescription: 'Cargo e-bikes for families',
    description: 'Yuba specializes in longtail cargo bikes designed for hauling kids and gear. Models like the Spicy Curry feature 20x3.0" tires with high load capacity.',
    websiteUrl: 'https://yubabikes.com',
    tireTypes: ['Cargo (20x3.0")', 'Cargo (24x2.4")'],
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
