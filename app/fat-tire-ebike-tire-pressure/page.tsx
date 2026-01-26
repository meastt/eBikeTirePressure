import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, getModelsForCategory } from '@/lib/programmatic/categories';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateItemListSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { ModelGrid, PSIQuickTable, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const category = CATEGORIES['fat-tire'];
const categoryModels = getModelsForCategory('fat-tire');

export const metadata: Metadata = {
  title: 'Fat Tire E-Bike Tire Pressure Guide | Low PSI for All Terrain',
  description: category.description,
  alternates: {
    canonical: `${getBaseUrl()}/${category.slug}`,
  },
  openGraph: {
    title: 'Fat Tire E-Bike Tire Pressure Guide | Low PSI for All Terrain',
    description: category.description,
    type: 'article',
  },
};

export default function FatTireEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();
  const brands = [...new Set(categoryModels.map((m) => m.brand))];

  // Fat tires typically run lower PSI
  const avgMinPSI = 12;
  const avgMaxPSI = 25;

  const faqs: FAQItem[] = [
    {
      question: 'What PSI should I run on fat tire e-bike?',
      answer: `Fat tire e-bikes typically run ${avgMinPSI}-${avgMaxPSI} PSI—much lower than standard bikes. For pavement, run 18-25 PSI. For trails, try 15-20 PSI. For sand or snow, go as low as 8-15 PSI for maximum flotation. Adjust based on your weight and terrain.`,
    },
    {
      question: 'Why do fat tires run such low pressure?',
      answer: `Fat tires (4"+ wide) have huge air volume, allowing low pressure without pinch flat risk. Low PSI lets the tire conform to terrain, providing excellent traction and flotation on sand, snow, and rough trails. The large contact patch compensates for the soft tire.`,
    },
    {
      question: 'What PSI for fat tires on sand or beach?',
      answer: `For sand riding, run 8-15 PSI on fat tires. Lower pressure creates a larger contact patch that floats on soft sand instead of digging in. Start around 12 PSI and go lower if you're still sinking. Some riders go as low as 5-8 PSI on very soft sand.`,
    },
    {
      question: 'What PSI for fat tires in snow?',
      answer: `For packed snow, run 10-15 PSI. For fresh powder, try 8-12 PSI for better flotation. If riding on ice, slightly higher pressure (15-18 PSI) with studded tires works best. The key is maximizing the contact patch while maintaining enough structure for control.`,
    },
    {
      question: 'Can I run fat tires at high PSI on pavement?',
      answer: `Yes, for pavement-only riding, you can run 20-25 PSI on fat tires for better efficiency and speed. However, this defeats the comfort advantage of fat tires. Most riders run 18-22 PSI on pavement for a balance of efficiency and comfort.`,
    },
    {
      question: 'Do I need different PSI for front and rear fat tires?',
      answer: `Generally, run 1-2 PSI higher in the rear due to weight distribution. For aggressive trail riding, some riders run slightly lower front pressure for better steering traction. The difference is smaller than standard bikes due to the large tire volume.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Fat Tire E-Bike Tire Pressure', url: `${baseUrl}/${category.slug}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);
  const itemListSchema = generateItemListSchema({
    name: 'Fat Tire E-Bikes',
    description: `${categoryModels.length} fat tire e-bikes with tire pressure specifications`,
    models: categoryModels,
  });

  return (
    <>
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
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Fat Tire E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Fat Tire E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">{category.description}</p>
          </header>

          <QuickStats
            items={[
              { label: 'Fat Tire Models', value: categoryModels.length },
              { label: 'PSI Range', value: `${avgMinPSI}-${avgMaxPSI}` },
              { label: 'Brands', value: brands.length },
              { label: 'Tire Width', value: '3.5-5"' },
            ]}
          />

          {/* Why Low PSI */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Fat Tires Run Low Pressure
            </h2>
            <div className="card p-6 bg-brand-50/30">
              <p className="text-text leading-relaxed mb-4">
                Fat tires (3.5" to 5" wide) have <strong>massive air volume</strong> compared to standard
                bike tires. This allows them to run very low pressure without risking pinch flats or rim
                damage—the same low PSI that would destroy a standard tire works perfectly on fat tires.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2">🏖️</div>
                  <h3 className="font-bold text-text mb-1">Flotation</h3>
                  <p className="text-sm text-muted">
                    Low PSI creates huge contact patch that floats on sand and snow
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h3 className="font-bold text-text mb-1">Comfort</h3>
                  <p className="text-sm text-muted">
                    Large air volume absorbs bumps better than any suspension
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-bold text-text mb-1">Traction</h3>
                  <p className="text-sm text-muted">
                    More rubber on ground means better grip on all surfaces
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Terrain-Based PSI */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Fat Tire PSI by Terrain
            </h2>
            <p className="text-muted mb-6">
              The magic of fat tires is adjusting pressure for conditions. Here&apos;s your terrain guide:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5 border-l-4 border-blue-500">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🛣️</span> Pavement / Hard Pack
                </h3>
                <p className="text-2xl font-bold text-brand mb-2">18-25 PSI</p>
                <p className="text-sm text-muted">
                  Higher pressure for speed and efficiency. Reduces rolling resistance but still
                  comfortable due to high volume.
                </p>
              </div>

              <div className="card p-5 border-l-4 border-green-500">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🌲</span> Trails / Gravel
                </h3>
                <p className="text-2xl font-bold text-brand mb-2">14-20 PSI</p>
                <p className="text-sm text-muted">
                  Balanced pressure for traction and comfort. Tire conforms to roots and rocks.
                </p>
              </div>

              <div className="card p-5 border-l-4 border-yellow-500">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🏖️</span> Sand / Beach
                </h3>
                <p className="text-2xl font-bold text-brand mb-2">8-15 PSI</p>
                <p className="text-sm text-muted">
                  Low pressure for maximum flotation. The tire spreads out to float on soft sand.
                </p>
              </div>

              <div className="card p-5 border-l-4 border-cyan-500">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>❄️</span> Snow / Winter
                </h3>
                <p className="text-2xl font-bold text-brand mb-2">8-15 PSI</p>
                <p className="text-sm text-muted">
                  Similar to sand—maximize contact patch. Slightly higher for packed snow/ice.
                </p>
              </div>
            </div>
          </section>

          {/* Weight-Based Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Fat Tire PSI by Rider Weight (Trail Riding)
            </h2>
            <p className="text-muted mb-6">
              Starting points for mixed trail riding. Reduce by 3-5 PSI for sand/snow, increase by 3-5
              PSI for pavement.
            </p>
            <div className="card p-6">
              <PSIQuickTable
                minPSI={avgMinPSI}
                maxPSI={avgMaxPSI}
                riderWeights={[140, 160, 180, 200, 220, 240, 260]}
                bikeWeight={70}
              />
            </div>
          </section>

          {/* Common Fat Tire Sizes */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Common Fat Tire Sizes
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">20x4.0"</h3>
                <p className="text-lg font-bold text-brand mb-1">15-25 PSI</p>
                <p className="text-sm text-muted">Compact fat tire, folding bikes</p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">26x4.0"</h3>
                <p className="text-lg font-bold text-brand mb-1">12-25 PSI</p>
                <p className="text-sm text-muted">Most popular fat tire size</p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">26x4.8-5.0"</h3>
                <p className="text-lg font-bold text-brand mb-1">8-20 PSI</p>
                <p className="text-sm text-muted">Extra-wide for extreme terrain</p>
              </div>
            </div>
          </section>

          {/* All Models */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              All Fat Tire E-Bike Models ({categoryModels.length})
            </h2>
            <p className="text-muted mb-6">
              Click any model for specific tire pressure recommendations and specifications.
            </p>
            <ModelGrid models={categoryModels} showBrand={true} showPSIRange={true} columns={3} />
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Fat Tire PSI"
            subtitle="Get personalized pressure for your weight, terrain, and riding style."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Beach Riding Guide',
                href: '/beach-ebike-tire-pressure',
                description: 'Sand & coastal riding tips',
                icon: '🏖️',
              },
              {
                title: 'Cargo E-Bikes',
                href: '/cargo-ebike-tire-pressure',
                description: 'Load-based PSI guide',
                icon: '📦',
              },
              {
                title: 'All E-Bike Models',
                href: '/ebike-tire-pressure',
                description: 'Browse all brands',
                icon: '📚',
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
