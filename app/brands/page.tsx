import type { Metadata } from 'next';
import Link from 'next/link';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { groupModelsByBrand, getAllBrandSlugs } from '@/lib/modelUtils';
import { getBrandMetadata, getAllBrandMetadata } from '@/lib/brandMetadata';

const models = modelsData as ModelPreset[];

export const metadata: Metadata = {
  title: 'E-Bike Brands | Tire Pressure Guides by Manufacturer',
  description:
    'Tire pressure guides for all major e-bike brands: Aventon, Rad Power, Lectric, Ride1Up, Velotric, Super73, and more. Find PSI recommendations for your bike model.',
  openGraph: {
    title: 'E-Bike Brands - Tire Pressure Guides',
    description: 'PSI guides for Aventon, Rad Power, Lectric, and all major e-bike brands.',
    type: 'website',
  },
};

export default function BrandsIndexPage() {
  const groupedModels = groupModelsByBrand(models);
  const brandSlugs = getAllBrandSlugs(models);
  const allBrandMetadata = getAllBrandMetadata();

  // Filter to only brands we have models for
  const availableBrands = allBrandMetadata
    .filter((brand) => brandSlugs.includes(brand.slug))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  return (
    <main className="min-h-screen bg-gradient-mesh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-5 bg-gradient-to-r from-text via-brand-700 to-text bg-clip-text text-transparent">
            E-Bike Brands
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Find tire pressure guides for your e-bike brand. We cover all major manufacturers
            with model-specific PSI recommendations based on rider weight, cargo, and terrain.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-brand mb-1">{availableBrands.length}</div>
            <div className="text-sm text-muted">Brands</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-brand mb-1">{models.length}</div>
            <div className="text-sm text-muted">Models</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-brand mb-1">100%</div>
            <div className="text-sm text-muted">Free</div>
          </div>
          <div className="card p-6 text-center">
            <Link href="/calculate" className="block hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">🧮</div>
              <div className="text-sm font-semibold text-brand">Calculator</div>
            </Link>
          </div>
        </div>

        {/* Brands grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableBrands.map((brand) => {
            const brandModels = groupedModels[brand.slug] || [];
            return (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group card card-hover p-6 bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading font-bold text-text group-hover:text-brand transition-colors mb-2">
                      {brand.displayName}
                    </h2>
                    <div className="text-sm text-muted font-medium">
                      {brandModels.length} {brandModels.length === 1 ? 'model' : 'models'}
                    </div>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-100 group-hover:bg-brand-200 rounded-xl transition-colors">
                    <span className="text-2xl font-bold text-brand">
                      {brand.displayName.charAt(0)}
                    </span>
                  </div>
                </div>

                <p className="text-muted text-sm mb-4 leading-relaxed">
                  {brand.shortDescription}
                </p>

                {/* Tire types */}
                {brand.tireTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {brand.tireTypes.slice(0, 2).map((type) => (
                      <span
                        key={type}
                        className="text-xs px-2 py-1 bg-surface-light text-muted rounded-md"
                      >
                        {type.replace(/\(.*\)/, '').trim()}
                      </span>
                    ))}
                    {brand.tireTypes.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-surface-light text-muted rounded-md">
                        +{brand.tireTypes.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 card bg-gradient-brand text-white p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
            Don&apos;t See Your Brand?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Use our universal calculator to get precise PSI recommendations for any e-bike.
            Just enter your tire size and riding conditions.
          </p>
          <Link
            href="/calculate"
            className="inline-block px-8 py-4 bg-white text-brand-600 font-bold rounded-xl hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Open Universal Calculator →
          </Link>
        </div>

        {/* Educational links */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link href="/blog" className="card card-hover p-6 bg-white">
            <h3 className="text-lg font-heading font-bold text-text mb-2">
              📚 Tire Pressure Guides
            </h3>
            <p className="text-muted text-sm">
              Learn about PSI optimization, weight effects, cargo adjustments, and terrain-specific
              recommendations.
            </p>
          </Link>
          <Link href="/faq" className="card card-hover p-6 bg-white">
            <h3 className="text-lg font-heading font-bold text-text mb-2">
              ❓ Common Questions
            </h3>
            <p className="text-muted text-sm">
              Get answers about pinch flats, sidewall max pressure, temperature effects, and more.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
