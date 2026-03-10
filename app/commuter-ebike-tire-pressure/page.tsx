import type { Metadata } from 'next';
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

const category = CATEGORIES['commuter'];
const categoryModels = getModelsForCategory('commuter');

export const metadata: Metadata = {
  title: 'Commuter E-Bike Tire Pressure Guide | Urban PSI Charts (2026)',
  description:
    'Optimize your commuter e-bike tire pressure for daily riding. Weight-based PSI charts for urban, bike path, and mixed-surface commuting. Covers pothole protection and battery range.',
  alternates: {
    canonical: `https://ebikepsi.com/${category.slug}`,
  },
  openGraph: {
    title: 'Commuter E-Bike Tire Pressure Guide | Urban PSI Charts (2026)',
    description:
      'Optimize your commuter e-bike tire pressure for daily riding. Weight-based PSI charts for urban, bike path, and mixed-surface commuting.',
    type: 'article',
  },
};

export default function CommuterEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();
  const brands = [...new Set(categoryModels.map((m) => m.brand))];

  const psiValues = categoryModels
    .filter((m) => m.stockTire.minPSI && m.stockTire.maxPSI)
    .map((m) => ({ min: m.stockTire.minPSI!, max: m.stockTire.maxPSI! }));
  const avgMinPSI = Math.round(psiValues.reduce((sum, p) => sum + p.min, 0) / psiValues.length) || 35;
  const avgMaxPSI = Math.round(psiValues.reduce((sum, p) => sum + p.max, 0) / psiValues.length) || 65;

  const faqs: FAQItem[] = [
    {
      question: 'What tire pressure should I use for commuting on my e-bike?',
      answer: `For commuter e-bikes with standard 2.0-2.5" tires, run ${avgMinPSI + 5}-${avgMaxPSI - 5} PSI on smooth pavement. Higher pressure (toward ${avgMaxPSI} PSI) maximizes battery range and speed. Lower pressure (toward ${avgMinPSI} PSI) absorbs road vibrations and improves comfort on rough streets.`,
    },
    {
      question: 'How does tire pressure affect my e-bike battery range?',
      answer: `Under-inflated tires can reduce battery range by 10-15%. The extra rolling resistance forces the motor to work harder. For maximum efficiency on pavement, run your tires at 70-80% of the maximum PSI. This balances range with ride comfort for daily commuting.`,
    },
    {
      question: 'Should I lower tire pressure for pothole-heavy routes?',
      answer: `Yes. If your commute includes rough roads or potholes, drop PSI by 5-10% from your pavement baseline. This helps the tire absorb impacts instead of transmitting them to the rim. Stay above ${avgMinPSI} PSI to avoid pinch flats on hard edges.`,
    },
    {
      question: 'How often should I check tire pressure on my commuter e-bike?',
      answer: `Check weekly for daily commuters. Standard commuter tires lose 2-5 PSI per week naturally. Cold mornings can drop pressure further (about 1 PSI per 10°F). Always check before your first ride of the week using a floor pump with a gauge.`,
    },
    {
      question: 'What tire pressure works best for wet weather commuting?',
      answer: `In wet conditions, drop your PSI by 3-5 below your dry baseline. Lower pressure increases the tire contact patch, improving grip on wet pavement. For commuter tires, ${avgMinPSI + 3}-${avgMinPSI + 10} PSI provides good wet traction without excessive rolling resistance.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Commuter E-Bike Tire Pressure', url: `${baseUrl}/${category.slug}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);
  const itemListSchema = generateItemListSchema({
    name: 'Commuter E-Bikes',
    description: `${categoryModels.length} commuter and urban e-bikes with tire pressure specifications`,
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
              { label: 'Commuter E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Commuter E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Optimize your daily commute with the right tire pressure. Get weight-based PSI recommendations
              for urban riding, bike paths, and mixed-surface routes.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'Commuter Models', value: categoryModels.length },
              { label: 'PSI Range', value: `${avgMinPSI}-${avgMaxPSI}` },
              { label: 'Brands', value: brands.length },
              { label: 'Tire Width', value: '1.9-2.6"' },
            ]}
          />

          {/* Why Commuter PSI Matters */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Tire Pressure Matters for Commuting
            </h2>
            <div className="card p-6 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-text leading-relaxed mb-4">
                Commuter e-bikes face a unique balancing act: you need enough pressure for
                efficiency and battery range, but not so much that every pothole and crack
                rattles your spine. The right PSI can make or break your daily ride.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-text mb-1 text-sm">Too Low</h3>
                  <p className="text-xs text-muted">Sluggish ride, battery drain, pinch flat risk on curbs</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-400">
                  <h3 className="font-bold text-blue-700 mb-1 text-sm">Optimal</h3>
                  <p className="text-xs text-muted">Efficient, comfortable, protected against road hazards</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-text mb-1 text-sm">Too High</h3>
                  <p className="text-xs text-muted">Harsh ride, reduced traction, less control on wet roads</p>
                </div>
              </div>
            </div>
          </section>

          {/* Surface-Based PSI Adjustments */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              PSI by Commuting Surface
            </h2>
            <p className="text-muted mb-6">
              Adjust your tire pressure based on the primary surface of your commute route.
            </p>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Surface Type</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">PSI Range</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-muted">Smooth pavement / bike lanes</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 10}-{avgMaxPSI} PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Speed + Range</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Rough city streets / potholes</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 5}-{avgMinPSI + 15} PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Comfort + Protection</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Mixed paved + gravel paths</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 3}-{avgMinPSI + 12} PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Traction + Comfort</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Wet pavement / rain</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 3}-{avgMinPSI + 10} PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Grip + Safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Rider Weight Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Baseline PSI by Rider Weight
            </h2>
            <p className="text-muted mb-6">
              Start here for smooth pavement riding. Adjust down for rough surfaces using the table above.
            </p>
            <div className="card p-6">
              <PSIQuickTable
                minPSI={avgMinPSI}
                maxPSI={avgMaxPSI}
                riderWeights={[130, 150, 170, 190, 210, 230, 250]}
              />
            </div>
          </section>

          {/* Battery Range Impact */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Tire Pressure and Battery Range
            </h2>
            <div className="card p-6">
              <p className="text-text leading-relaxed mb-4">
                Your tire pressure directly impacts how far you can ride on a single charge.
                Under-inflated tires create more rolling resistance, forcing the motor to work harder.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-700 mb-1">+10-15%</div>
                  <div className="text-sm text-green-800">Extra range at optimal PSI vs. 10 PSI under-inflated</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-700 mb-1">-10-15%</div>
                  <div className="text-sm text-amber-800">Range loss when running 10+ PSI below optimal</div>
                </div>
              </div>
              <p className="text-sm text-muted mt-4">
                For maximum range on flat pavement, run tires at 70-80% of the sidewall maximum.
                This provides the best balance of efficiency and comfort for commuting.
              </p>
            </div>
          </section>

          {/* All Commuter Models */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              All Commuter E-Bike Models ({categoryModels.length})
            </h2>
            <p className="text-muted mb-6">
              Click any model for detailed tire pressure specifications and personalized PSI recommendations.
            </p>
            <ModelGrid models={categoryModels} showBrand={true} showPSIRange={true} columns={3} />
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Commuter E-Bike PSI"
            subtitle="Get precise front and rear tire pressure based on your weight, panniers, and commute surface."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Heavy Rider Guide',
                href: '/heavy-rider-ebike-tire-pressure',
                description: 'PSI for 220+ lb riders',
                icon: '⚖️',
              },
              {
                title: 'Folding E-Bikes',
                href: '/folding-ebike-tire-pressure',
                description: 'Compact commuter PSI guide',
                icon: '📂',
              },
              {
                title: 'Cold Weather PSI',
                href: '/cold-weather-ebike-tire-pressure',
                description: 'Winter commuting adjustments',
                icon: '❄️',
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
