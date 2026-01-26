import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllTireSizes,
  getTireSizeInfo,
  getRelatedTireSizes,
  isFatTire,
} from '@/lib/programmatic/tire-sizes';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateItemListSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { ModelGrid, PSIQuickTable, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Generate static pages for all tire sizes
export async function generateStaticParams() {
  const sizes = getAllTireSizes();
  return sizes.map((size) => ({ size }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ size: string }>;
}): Promise<Metadata> {
  const { size } = await params;
  const info = getTireSizeInfo(size);

  if (!info) {
    return { title: 'Tire Size Not Found' };
  }

  const title = `${info.displaySize} E-Bike Tire Pressure Guide | ${info.modelCount} Models | PSI Chart`;
  const description = `Complete tire pressure guide for ${info.displaySize} e-bike tires. PSI charts for ${info.modelCount} models from ${info.brands.length} brands. Recommended range: ${info.avgMinPSI}-${info.avgMaxPSI} PSI.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${getBaseUrl()}/tire-size/${size}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function TireSizePage({
  params,
}: {
  params: Promise<{ size: string }>;
}) {
  const { size } = await params;
  const info = getTireSizeInfo(size);

  if (!info) {
    notFound();
  }

  const relatedSizes = getRelatedTireSizes(size, 4);
  const isFat = isFatTire(info.displaySize);
  const baseUrl = getBaseUrl();

  // Generate FAQs
  const faqs: FAQItem[] = [
    {
      question: `What PSI should I use for ${info.displaySize} tires?`,
      answer: `For ${info.displaySize} e-bike tires, recommended PSI typically ranges from ${info.avgMinPSI} to ${info.avgMaxPSI} depending on rider weight and terrain. A 180 lb rider on pavement should start around ${Math.round((info.avgMinPSI + info.avgMaxPSI) / 2)} PSI. Adjust lower for trails/comfort or higher for efficiency.`,
    },
    {
      question: `How does rider weight affect ${info.displaySize} tire pressure?`,
      answer: `Heavier riders need higher PSI to prevent pinch flats and tire squirm. For ${info.displaySize} tires, add roughly 1-2 PSI for every 20 lbs above 180 lbs, staying within the ${info.avgMinPSI}-${info.avgMaxPSI} PSI safe range. Lighter riders can run lower pressure for comfort.`,
    },
    {
      question: `What e-bikes use ${info.displaySize} tires?`,
      answer: `${info.modelCount} e-bike models use ${info.displaySize} tires, including models from ${info.brands.slice(0, 5).join(', ')}${info.brands.length > 5 ? ` and ${info.brands.length - 5} more brands` : ''}. This tire size is common on ${info.category.toLowerCase()} e-bikes.`,
    },
    {
      question: `Should I adjust PSI for different terrain on ${info.displaySize} tires?`,
      answer: isFat
        ? `Yes! ${info.displaySize} fat tires excel at low pressure. For sand/snow, run ${info.avgMinPSI}-${info.avgMinPSI + 3} PSI for flotation. For trails, try ${info.avgMinPSI + 3}-${Math.round((info.avgMinPSI + info.avgMaxPSI) / 2)} PSI. For pavement, run ${Math.round((info.avgMinPSI + info.avgMaxPSI) / 2)}-${info.avgMaxPSI} PSI for efficiency.`
        : `Yes! Lower pressure (${info.avgMinPSI}-${Math.round((info.avgMinPSI + info.avgMaxPSI) * 0.4)}) for trails and comfort, higher pressure (${Math.round((info.avgMinPSI + info.avgMaxPSI) * 0.6)}-${info.avgMaxPSI}) for pavement efficiency. Stay within the ${info.avgMinPSI}-${info.avgMaxPSI} PSI range marked on your tire sidewall.`,
    },
  ];

  // Generate schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Tire Sizes', url: `${baseUrl}/tire-size` },
    { name: `${info.displaySize}`, url: `${baseUrl}/tire-size/${size}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);

  const itemListSchema = generateItemListSchema({
    name: `E-bikes with ${info.displaySize} Tires`,
    description: `Complete list of ${info.modelCount} e-bike models featuring ${info.displaySize} tires`,
    models: info.models,
  });

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="min-h-screen bg-gradient-mesh">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tire Sizes', href: '/ebike-tire-pressure' },
              { label: info.displaySize },
            ]}
          />

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4 tracking-tight">
              {info.displaySize} E-Bike Tire Pressure Guide
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Complete PSI recommendations for {info.modelCount} e-bike models with {info.displaySize}{' '}
              {info.category.toLowerCase()} tires. Weight-based charts and terrain adjustments.
            </p>
          </header>

          {/* Quick Stats */}
          <QuickStats
            items={[
              { label: 'Models', value: info.modelCount },
              { label: 'PSI Range', value: `${info.avgMinPSI}-${info.avgMaxPSI}` },
              { label: 'Brands', value: info.brands.length },
              { label: 'Type', value: info.category },
            ]}
          />

          {/* PSI Table Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              PSI by Rider Weight for {info.displaySize} Tires
            </h2>
            <p className="text-muted mb-6">
              Use this table as a starting point. These values assume pavement riding with no cargo.
              Adjust for terrain and load using our{' '}
              <Link href="/calculate" className="text-brand underline">
                calculator
              </Link>
              .
            </p>
            <div className="card p-6">
              <PSIQuickTable
                minPSI={info.avgMinPSI}
                maxPSI={info.avgMaxPSI}
                riderWeights={[140, 160, 180, 200, 220, 240, 260]}
              />
            </div>
          </section>

          {/* Terrain Adjustments */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Terrain Adjustments for {info.displaySize} Tires
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🛣️</span> Pavement / Bike Paths
                </h3>
                <p className="text-sm text-muted mb-2">
                  Run {Math.round((info.avgMinPSI + info.avgMaxPSI) * 0.6)}-{info.avgMaxPSI} PSI for
                  maximum efficiency and speed.
                </p>
                <div className="text-xs text-brand font-medium">Efficiency focused</div>
              </div>

              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🌲</span> Gravel / Mixed Terrain
                </h3>
                <p className="text-sm text-muted mb-2">
                  Run {info.avgMinPSI + 3}-{Math.round((info.avgMinPSI + info.avgMaxPSI) / 2)} PSI for
                  better traction and comfort.
                </p>
                <div className="text-xs text-brand font-medium">Balanced</div>
              </div>

              {isFat && (
                <>
                  <div className="card p-5">
                    <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                      <span>🏖️</span> Sand / Beach
                    </h3>
                    <p className="text-sm text-muted mb-2">
                      Run {info.avgMinPSI}-{info.avgMinPSI + 5} PSI for maximum flotation on soft
                      surfaces.
                    </p>
                    <div className="text-xs text-brand font-medium">Flotation focused</div>
                  </div>

                  <div className="card p-5">
                    <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                      <span>❄️</span> Snow / Winter
                    </h3>
                    <p className="text-sm text-muted mb-2">
                      Run {info.avgMinPSI}-{info.avgMinPSI + 5} PSI for traction on packed snow.
                    </p>
                    <div className="text-xs text-brand font-medium">Traction focused</div>
                  </div>
                </>
              )}

              {!isFat && (
                <div className="card p-5">
                  <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                    <span>⛰️</span> Light Trails
                  </h3>
                  <p className="text-sm text-muted mb-2">
                    Run {info.avgMinPSI}-{info.avgMinPSI + 5} PSI for comfort and grip. Don&apos;t
                    go below {info.avgMinPSI} PSI to avoid pinch flats.
                  </p>
                  <div className="text-xs text-brand font-medium">Comfort focused</div>
                </div>
              )}
            </div>
          </section>

          {/* All Models Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              All {info.displaySize} E-Bike Models ({info.modelCount})
            </h2>
            <p className="text-muted mb-6">
              These e-bikes come stock with {info.displaySize} tires. Click any model for detailed
              specs and PSI recommendations.
            </p>
            <ModelGrid models={info.models} showBrand={true} showPSIRange={true} columns={3} />
          </section>

          {/* FAQ Section */}
          <FAQSection items={faqs} />

          {/* Calculator CTA */}
          <CalculatorCTA
            title={`Calculate Your ${info.displaySize} Tire Pressure`}
            subtitle="Get personalized PSI based on your exact weight, cargo, and riding conditions."
          />

          {/* Related Tire Sizes */}
          {relatedSizes.length > 0 && (
            <RelatedLinks
              heading="Related Tire Sizes"
              links={relatedSizes.map((s) => ({
                title: `${s.displaySize} Tires`,
                href: `/tire-size/${s.slug}`,
                description: `${s.modelCount} models • ${s.avgMinPSI}-${s.avgMaxPSI} PSI`,
                icon: s.category === 'Fat Tire' ? '🚴' : '🚲',
              }))}
            />
          )}

          {/* Additional Links */}
          <RelatedLinks
            heading="More Resources"
            links={[
              {
                title: 'All E-Bike Models',
                href: '/ebike-tire-pressure',
                description: 'Browse all brands and models',
                icon: '📚',
              },
              {
                title: 'PSI Calculator',
                href: '/calculate',
                description: 'Get personalized recommendations',
                icon: '🧮',
              },
              {
                title: 'Tire Pressure FAQ',
                href: '/faq',
                description: 'Common questions answered',
                icon: '❓',
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
