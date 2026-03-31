import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { getModelsByBrandSlug, getAllBrandSlugs } from '@/lib/modelUtils';
import { getBrandMetadata } from '@/lib/brandMetadata';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { getBaseUrl } from '@/lib/seo';

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
  
  // UPDATED: Title with Year and Benefit
  const title = `${brandMetadata.displayName} E-Bike Tire Pressure Guide (2026) | Expert PSI Charts`;

  // Use the brand-specific description from metadata, with PSI focus added
  const baseDesc = brandMetadata.description;
  const tireNote = brandMetadata.tireTypes.length > 0
    ? ` Tires range from ${brandMetadata.tireTypes[0]}${brandMetadata.tireTypes.length > 1 ? ` to ${brandMetadata.tireTypes[brandMetadata.tireTypes.length - 1]}` : ''}.`
    : '';
  const description = `${baseDesc} Find your specific model's tire pressure, weight-based PSI recommendations, and terrain adjustments. Updated for 2026.${tireNote}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://ebikepsi.com/brands/${brandSlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://ebikepsi.com/brands/${brandSlug}`,
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

  const baseUrl = getBaseUrl();
  const brandUrl = `${baseUrl}/brands/${brandSlug}`;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Brands', url: `${baseUrl}/brands` },
    { name: brandMetadata.displayName, url: brandUrl },
  ]);

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
            {brandMetadata.displayName} Tire Pressure Guide (2026)
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
            {brandMetadata.description} Find the perfect PSI for your {brandMetadata.displayName} e-bike to maximize range, comfort, and safety.
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
        
        {/* Experience Signal Section */}
        <div className="mb-12 p-8 bg-white rounded-2xl shadow-sm border border-brand-100">
           <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚴</span>
              <h2 className="text-2xl font-bold text-text">Our Experience with {brandMetadata.displayName} E-Bikes</h2>
           </div>
           <p className="text-lg text-text leading-relaxed mb-4">
             Having analyzed specifications for <strong>{brandModels.length} {brandMetadata.displayName} models</strong>, we've found that their stock tires typically favor {brandMetadata.displayName === 'Rad Power Bikes' ? 'stability and load capacity' : 'efficiency and comfort'}.
           </p>
           <p className="text-lg text-text leading-relaxed mb-4">
             Most {brandMetadata.displayName} riders we see are under-inflating their tires, which significantly reduces battery range. Our data suggests that for pavement riding, maintaining pressure near the upper 20% of the manufacturer's recommended range provides the best balance of speed and range for these bikes.
           </p>
           <div className="bg-surface-light p-4 rounded-xl border-l-4 border-brand">
             <p className="text-base text-muted font-medium">
               <strong>Pro Tip:</strong> Check your tire pressure weekly. {brandMetadata.displayName} e-bikes are often heavier than standard bikes, making them more susceptible to pinch flats if pressure drops too low.
             </p>
           </div>
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
              Common Tire Sizes for {brandMetadata.displayName}
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
        <div className="bg-gradient-brand text-white p-8 rounded-2xl text-center shadow-elevated mb-12">
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
    </>
  );
}
