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

const category = CATEGORIES['cargo'];
const categoryModels = getModelsForCategory('cargo');

export const metadata: Metadata = {
  title: 'Cargo E-Bike Tire Pressure Guide | Load-Based PSI Charts',
  description: category.description,
  alternates: {
    canonical: `${getBaseUrl()}/${category.slug}`,
  },
  openGraph: {
    title: 'Cargo E-Bike Tire Pressure Guide | Load-Based PSI Charts',
    description: category.description,
    type: 'article',
  },
};

export default function CargoEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();
  const brands = [...new Set(categoryModels.map((m) => m.brand))];

  // Calculate average PSI range for cargo bikes
  const psiValues = categoryModels
    .filter((m) => m.stockTire.minPSI && m.stockTire.maxPSI)
    .map((m) => ({ min: m.stockTire.minPSI!, max: m.stockTire.maxPSI! }));
  const avgMinPSI = Math.round(psiValues.reduce((sum, p) => sum + p.min, 0) / psiValues.length) || 20;
  const avgMaxPSI = Math.round(psiValues.reduce((sum, p) => sum + p.max, 0) / psiValues.length) || 50;

  const faqs: FAQItem[] = [
    {
      question: 'What tire pressure should I use for my cargo e-bike?',
      answer: `Cargo e-bikes typically need ${avgMinPSI}-${avgMaxPSI} PSI depending on load. Run higher pressure (toward ${avgMaxPSI} PSI) when carrying passengers or heavy cargo. The rear tire usually needs 3-5 PSI more than the front due to the rear-heavy weight distribution.`,
    },
    {
      question: 'How does cargo weight affect tire pressure?',
      answer: `For every 50 lbs of cargo, add approximately 2-3 PSI to your rear tire. Cargo bikes like Tern GSD, RadWagon, and Yuba have 58-62% weight on the rear, so the rear tire handles most of the load. Always stay within your tire&apos;s maximum PSI rating.`,
    },
    {
      question: 'Is it safe to carry passengers with low tire pressure?',
      answer: `No! Under-inflated tires with passengers is dangerous. Low pressure causes poor handling, longer braking distances, and risk of pinch flats. When carrying a child or passenger, run near maximum PSI on the rear tire and check pressure before every ride.`,
    },
    {
      question: 'Should I use different PSI for front and rear cargo bike tires?',
      answer: `Yes. Cargo bikes have rear-biased weight distribution (typically 58-62% rear). Run 3-5 PSI higher on the rear tire than the front. When loaded with cargo or passengers, increase rear pressure further while keeping front at normal levels.`,
    },
    {
      question: 'What happens if I overload my cargo bike tires?',
      answer: `Overloading causes excessive tire flex, heat buildup, and accelerated wear. It can lead to blowouts, especially on hot days. Always check your bike&apos;s maximum weight capacity and never exceed the tire&apos;s max PSI rating even when heavily loaded.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Cargo E-Bike Tire Pressure', url: `${baseUrl}/${category.slug}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);
  const itemListSchema = generateItemListSchema({
    name: 'Cargo E-Bikes',
    description: `${categoryModels.length} cargo and longtail e-bikes with tire pressure specifications`,
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
              { label: 'Cargo E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Cargo E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">{category.description}</p>
          </header>

          <QuickStats
            items={[
              { label: 'Cargo Models', value: categoryModels.length },
              { label: 'PSI Range', value: `${avgMinPSI}-${avgMaxPSI}` },
              { label: 'Brands', value: brands.length },
              { label: 'Rear Bias', value: '58-62%' },
            ]}
          />

          {/* Why Cargo Bikes Need Special Attention */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Cargo Bike Tire Pressure Matters More
            </h2>
            <div className="card p-6 bg-amber-50 border-l-4 border-amber-500">
              <p className="text-text leading-relaxed mb-4">
                Cargo e-bikes carry significantly more weight than standard bikes—often 200-400+ lbs total with
                rider, passengers, and cargo. This extra load makes proper tire pressure{' '}
                <strong>critical for safety</strong>.
              </p>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">⚠️</span>
                  <span>
                    <strong>Under-inflation risk:</strong> Pinch flats, rim damage, poor braking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">⚠️</span>
                  <span>
                    <strong>Over-inflation risk:</strong> Harsh ride, reduced traction, blowout risk in heat
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">⚠️</span>
                  <span>
                    <strong>With passengers:</strong> Always run maximum safe PSI on rear tire
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Load-Based PSI Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Cargo Load PSI Adjustments
            </h2>
            <p className="text-muted mb-6">
              Adjust your rear tire pressure based on cargo weight. Front tire typically stays at your
              baseline PSI unless carrying front basket loads.
            </p>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Load Scenario</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Rear PSI Adjustment</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-muted">Solo rider (no cargo)</td>
                      <td className="px-4 py-3 text-center font-medium text-text">Baseline</td>
                      <td className="px-4 py-3 text-center text-brand">{avgMinPSI + 5} PSI</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Light groceries (20-30 lbs)</td>
                      <td className="px-4 py-3 text-center font-medium text-text">+2 PSI</td>
                      <td className="px-4 py-3 text-center text-brand">{avgMinPSI + 7} PSI</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Child passenger (40-60 lbs)</td>
                      <td className="px-4 py-3 text-center font-medium text-text">+4-5 PSI</td>
                      <td className="px-4 py-3 text-center text-brand">{avgMinPSI + 10} PSI</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Heavy cargo (60-100 lbs)</td>
                      <td className="px-4 py-3 text-center font-medium text-text">+5-7 PSI</td>
                      <td className="px-4 py-3 text-center text-brand">{avgMinPSI + 12} PSI</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 text-red-800 font-medium">2 kids or max cargo (100+ lbs)</td>
                      <td className="px-4 py-3 text-center font-bold text-red-800">Near Max PSI</td>
                      <td className="px-4 py-3 text-center font-bold text-red-600">{avgMaxPSI - 2}-{avgMaxPSI} PSI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Rider Weight Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Baseline PSI by Rider Weight (No Cargo)
            </h2>
            <div className="card p-6">
              <PSIQuickTable
                minPSI={avgMinPSI}
                maxPSI={avgMaxPSI}
                riderWeights={[140, 160, 180, 200, 220, 240]}
                bikeWeight={75}
              />
            </div>
            <p className="text-sm text-muted mt-4">
              These are starting points for unloaded riding. Add PSI when carrying cargo as shown above.
            </p>
          </section>

          {/* All Cargo Models */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              All Cargo E-Bike Models ({categoryModels.length})
            </h2>
            <p className="text-muted mb-6">
              Click any model for detailed tire pressure specifications and weight-based recommendations.
            </p>
            <ModelGrid models={categoryModels} showBrand={true} showPSIRange={true} columns={3} />
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Cargo Bike PSI"
            subtitle="Get precise front and rear tire pressure based on your weight, cargo load, and riding conditions."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Fat Tire E-Bikes',
                href: '/fat-tire-ebike-tire-pressure',
                description: 'Wide tire pressure guide',
                icon: '🏔️',
              },
              {
                title: 'Heavy Rider Guide',
                href: '/heavy-rider-ebike-tire-pressure',
                description: 'PSI for 220+ lb riders',
                icon: '⚖️',
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
