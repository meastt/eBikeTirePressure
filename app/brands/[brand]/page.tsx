import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { getModelsByBrandSlug, getAllBrandSlugs } from '@/lib/modelUtils';
import { getBrandMetadata } from '@/lib/brandMetadata';

const models = modelsData as ModelPreset[];

// Generate static pages for all brands
export async function generateStaticParams() {
  const brandSlugs = getAllBrandSlugs(models);
  return brandSlugs.map((slug) => ({
    brand: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brandMetadata = getBrandMetadata(brandSlug);

  if (!brandMetadata) {
    return {
      title: 'Brand Not Found',
    };
  }

  const brandModels = getModelsByBrandSlug(models, brandSlug);
  const title = `${brandMetadata.displayName} E-Bike Tire Pressure Guide | PSI for All Models`;
  const description = `Tire pressure guides for all ${brandMetadata.displayName} e-bike models. ${brandModels.length} models with weight-based PSI recommendations, terrain settings, and cargo adjustments.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const brandMetadata = getBrandMetadata(brandSlug);

  if (!brandMetadata) {
    notFound();
  }

  const brandModels = getModelsByBrandSlug(models, brandSlug);

  if (brandModels.length === 0) {
    notFound();
  }

  // Sort models alphabetically
  const sortedModels = brandModels.sort((a, b) => a.model.localeCompare(b.model));

  return (
    <main className="min-h-screen bg-gradient-mesh">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/brands" className="text-brand hover:underline">
            Brands
          </Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-muted">{brandMetadata.displayName}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-5 bg-gradient-to-r from-text via-brand-700 to-text bg-clip-text text-transparent">
            {brandMetadata.displayName} Tire Pressure Guide
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
            {brandMetadata.description}
          </p>
          {brandMetadata.websiteUrl && (
            <a
              href={brandMetadata.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-brand hover:underline text-sm font-medium"
            >
              Visit {brandMetadata.displayName} website →
            </a>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card p-6">
            <div className="text-2xl font-bold text-brand mb-1">{brandModels.length}</div>
            <div className="text-sm text-muted">Models Covered</div>
          </div>
          <div className="card p-6">
            <div className="text-2xl font-bold text-brand mb-1">{brandMetadata.tireTypes.length}</div>
            <div className="text-sm text-muted">Tire Types</div>
          </div>
          <div className="card p-6">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm text-muted">Weight-based PSI</div>
          </div>
          <div className="card p-6">
            <Link href="/calculate" className="block hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">🧮</div>
              <div className="text-sm font-semibold text-brand">Calculator</div>
            </Link>
          </div>
        </div>

        {/* Common tire types for this brand */}
        {brandMetadata.tireTypes.length > 0 && (
          <div className="card p-6 mb-12 bg-brand-50/50">
            <h2 className="text-lg font-heading font-bold text-text mb-4">
              Common Tire Sizes
            </h2>
            <div className="flex flex-wrap gap-3">
              {brandMetadata.tireTypes.map((type) => (
                <div key={type} className="px-4 py-2 bg-white rounded-lg border border-brand-200">
                  <div className="text-sm font-semibold text-text">{type}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Models list */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-text mb-6">
            All {brandMetadata.displayName} Models ({sortedModels.length})
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sortedModels.map((model) => {
              const minPSI = model.stockTire.minPSI || 15;
              const maxPSI = model.stockTire.maxPSI || 30;

              return (
                <Link
                  key={model.slug}
                  href={model.canonicalUrl!}
                  className="group card card-hover p-6 bg-white"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-text group-hover:text-brand transition-colors mb-2">
                        {model.model}
                      </h3>
                      <div className="text-sm text-muted space-y-1">
                        <div>
                          <span className="font-semibold">Tire:</span> {model.stockTire.size}
                        </div>
                        <div>
                          <span className="font-semibold">PSI Range:</span> {minPSI}-{maxPSI}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-brand text-2xl group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-surface-light text-muted rounded-md">
                      {model.bikeWeightLbs} lbs
                    </span>
                    <span className="text-xs px-2 py-1 bg-surface-light text-muted rounded-md capitalize">
                      {model.stockTire.casing}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA to calculator */}
        <div className="card bg-gradient-brand text-white p-8 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
            Get Precise PSI for Your {brandMetadata.displayName}
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Use our calculator to get weight-based PSI recommendations with cargo, terrain, and
            temperature adjustments.
          </p>
          <Link
            href="/calculate"
            className="inline-block px-8 py-4 bg-white text-brand-600 font-bold rounded-xl hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Open Calculator →
          </Link>
        </div>

        {/* Related content */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/blog" className="card card-hover p-6 bg-white">
            <h3 className="text-lg font-heading font-bold text-text mb-2">📚 Guides</h3>
            <p className="text-muted text-sm">
              Learn about tire pressure optimization and common mistakes.
            </p>
          </Link>
          <Link href="/brands" className="card card-hover p-6 bg-white">
            <h3 className="text-lg font-heading font-bold text-text mb-2">🏷️ All Brands</h3>
            <p className="text-muted text-sm">
              Browse tire pressure guides for other e-bike manufacturers.
            </p>
          </Link>
          <Link href="/faq" className="card card-hover p-6 bg-white">
            <h3 className="text-lg font-heading font-bold text-text mb-2">❓ FAQ</h3>
            <p className="text-muted text-sm">
              Common questions about e-bike tire pressure answered.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
