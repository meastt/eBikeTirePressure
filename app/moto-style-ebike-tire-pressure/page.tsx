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

const category = CATEGORIES['moto-style'];
const categoryModels = getModelsForCategory('moto-style');

export const metadata: Metadata = {
  title: 'Moto-Style E-Bike Tire Pressure Guide | Off-Road PSI Charts (2026)',
  description:
    'Tire pressure guide for Sur-Ron, Talaria, UBCO, and moto-style e-bikes. Off-road, dirt, and street PSI settings for electric dirt bikes and moto-inspired models.',
  alternates: {
    canonical: `https://ebikepsi.com/${category.slug}`,
  },
  openGraph: {
    title: 'Moto-Style E-Bike Tire Pressure Guide | Off-Road PSI Charts (2026)',
    description:
      'Tire pressure guide for Sur-Ron, Talaria, UBCO, and moto-style e-bikes. Off-road and street PSI settings.',
    type: 'article',
  },
};

export default function MotoStyleEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();
  const brands = [...new Set(categoryModels.map((m) => m.brand))];

  const psiValues = categoryModels
    .filter((m) => m.stockTire.minPSI && m.stockTire.maxPSI)
    .map((m) => ({ min: m.stockTire.minPSI!, max: m.stockTire.maxPSI! }));
  const avgMinPSI = Math.round(psiValues.reduce((sum, p) => sum + p.min, 0) / psiValues.length) || 18;
  const avgMaxPSI = Math.round(psiValues.reduce((sum, p) => sum + p.max, 0) / psiValues.length) || 35;

  const faqs: FAQItem[] = [
    {
      question: 'What tire pressure should I use on my Sur-Ron or Talaria?',
      answer: `Most Sur-Ron and Talaria riders run ${avgMinPSI}-${avgMinPSI + 8} PSI for dirt/trail riding and ${avgMinPSI + 8}-${avgMaxPSI} PSI for street use. Lower pressure provides better traction on loose surfaces, while higher pressure improves handling and reduces flats on pavement.`,
    },
    {
      question: 'What PSI is best for dirt and trail riding on a moto-style e-bike?',
      answer: `For dirt trails, run ${avgMinPSI}-${avgMinPSI + 5} PSI for maximum traction. Soft or muddy terrain benefits from the lower end of this range. Hard-packed trails can handle ${avgMinPSI + 3}-${avgMinPSI + 8} PSI. Always use tube-rated minimums as your floor to prevent rim damage on rocks and roots.`,
    },
    {
      question: 'Should I adjust tire pressure for jumps and drops?',
      answer: `Yes. For jump sessions, increase pressure by 3-5 PSI above your trail baseline. This reduces the chance of pinch flats on landing impacts and prevents the tire from bottoming out against the rim. For a 180 lb rider, ${avgMinPSI + 5}-${avgMinPSI + 10} PSI is a common range for jump riding.`,
    },
    {
      question: 'How does the weight of moto-style e-bikes affect tire pressure?',
      answer: `Moto-style e-bikes weigh 90-150+ lbs, far more than standard e-bikes. This extra weight means you need higher base pressure to support the combined rider + bike load. Under-inflation is more dangerous on heavy bikes—it accelerates tire wear and increases pinch flat risk.`,
    },
    {
      question: 'Can I run tubeless on my moto-style e-bike?',
      answer: `Some moto-style e-bikes support tubeless conversion, which allows 2-3 PSI lower pressure without pinch flat risk. Check your rim compatibility first—many Sur-Ron and Talaria models use motorcycle-style rims that require tubes. If tubeless-compatible, it&apos;s a worthwhile upgrade for trail riding.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Moto-Style E-Bike Tire Pressure', url: `${baseUrl}/${category.slug}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);
  const itemListSchema = generateItemListSchema({
    name: 'Moto-Style E-Bikes',
    description: `${categoryModels.length} electric dirt bikes and moto-style e-bikes with tire pressure specifications`,
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
              { label: 'Moto-Style E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Moto-Style E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              PSI recommendations for electric dirt bikes and moto-inspired e-bikes. Covers dirt, trail,
              street, and jump settings for Sur-Ron, Talaria, UBCO, and similar models.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'Moto Models', value: categoryModels.length },
              { label: 'PSI Range', value: `${avgMinPSI}-${avgMaxPSI}` },
              { label: 'Brands', value: brands.length },
              { label: 'Bike Weight', value: '90-150+ lbs' },
            ]}
          />

          {/* Dirt vs Street Settings */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Dirt vs. Street Tire Pressure Settings
            </h2>
            <div className="card p-6 bg-orange-50 border-l-4 border-orange-500">
              <p className="text-text leading-relaxed mb-4">
                Moto-style e-bikes are unique because many riders switch between off-road trails
                and public streets. Each surface demands different pressure settings for safety and performance.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-5 rounded-lg border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <span>🏔️</span> Dirt / Trail
                  </h3>
                  <div className="text-2xl font-bold text-orange-700 mb-2">{avgMinPSI}-{avgMinPSI + 8} PSI</div>
                  <ul className="text-sm text-muted space-y-1">
                    <li>Maximum traction on loose surfaces</li>
                    <li>Better bump absorption on roots/rocks</li>
                    <li>Lower speed, higher impact forces</li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span>🛣️</span> Street / Pavement
                  </h3>
                  <div className="text-2xl font-bold text-blue-700 mb-2">{avgMinPSI + 8}-{avgMaxPSI} PSI</div>
                  <ul className="text-sm text-muted space-y-1">
                    <li>Reduced rolling resistance</li>
                    <li>Better handling at higher speeds</li>
                    <li>Less tire wear on hard surfaces</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Terrain-Specific Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              PSI by Terrain Type
            </h2>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Terrain</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Front PSI</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Rear PSI</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-muted">Soft dirt / mud</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI}-{avgMinPSI + 3}</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 1}-{avgMinPSI + 4}</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Max traction</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Hard-packed trails</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 3}-{avgMinPSI + 6}</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 4}-{avgMinPSI + 8}</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Balanced</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Jumps / drops</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 5}-{avgMinPSI + 10}</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 7}-{avgMinPSI + 12}</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Impact protection</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Street / pavement</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 8}-{avgMaxPSI - 2}</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">{avgMinPSI + 10}-{avgMaxPSI}</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Speed + efficiency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted mt-4">
                Values are for a 180 lb rider. Add 2-3 PSI per 30 lbs above 180 lbs. These bikes weigh
                90-150+ lbs, which is already factored into the recommendations above.
              </p>
            </div>
          </section>

          {/* Rider Weight Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Baseline PSI by Rider Weight (Street Riding)
            </h2>
            <div className="card p-6">
              <PSIQuickTable
                minPSI={avgMinPSI}
                maxPSI={avgMaxPSI}
                riderWeights={[140, 160, 180, 200, 220, 240]}
                bikeWeight={110}
              />
            </div>
            <p className="text-sm text-muted mt-4">
              Reduce by 5-8 PSI for trail riding. These values assume paved surfaces.
            </p>
          </section>

          {/* All Moto Models */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              All Moto-Style E-Bike Models ({categoryModels.length})
            </h2>
            <p className="text-muted mb-6">
              Click any model for detailed tire pressure specifications and riding-style recommendations.
            </p>
            <ModelGrid models={categoryModels} showBrand={true} showPSIRange={true} columns={3} />
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Moto E-Bike PSI"
            subtitle="Get precise tire pressure for your weight, riding style, and terrain."
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
