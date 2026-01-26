import type { Metadata } from 'next';
import Link from 'next/link';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { WEIGHT_CATEGORIES, getWeightCategoryBySlug } from '@/lib/programmatic/geo';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { ModelGrid, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const models = modelsData as ModelPreset[];
const weightCategory = WEIGHT_CATEGORIES[0]; // Heavy rider category

// Filter models suitable for heavy riders (higher weight capacity implied by heavier bikes and reinforced tires)
const suitableModels = models.filter((m) => {
  const hasReinforcedTires = m.stockTire.casing === 'reinforced';
  const isSturdyBike = m.bikeWeightLbs >= 65;
  const hasHighMaxPSI = (m.stockTire.maxPSI || 30) >= 30;
  return hasReinforcedTires || isSturdyBike || hasHighMaxPSI;
});

export const metadata: Metadata = {
  title: 'Heavy Rider E-Bike Tire Pressure | 220-300+ lbs PSI Guide',
  description: weightCategory.description,
  alternates: {
    canonical: `${getBaseUrl()}/${weightCategory.slug}`,
  },
  openGraph: {
    title: 'Heavy Rider E-Bike Tire Pressure | 220-300+ lbs PSI Guide',
    description: weightCategory.description,
    type: 'article',
  },
};

export default function HeavyRiderTirePressurePage() {
  const baseUrl = getBaseUrl();

  const faqs: FAQItem[] = [
    {
      question: 'What tire pressure do I need as a 250 lb rider?',
      answer: `At 250 lbs, you'll need to run near the maximum PSI rating on most e-bike tires. For fat tires (26x4.0), run 22-28 PSI. For standard tires (27.5x2.2), run 50-60 PSI. Always check your tire sidewall for the max PSI and stay 2-3 PSI below to allow for temperature expansion.`,
    },
    {
      question: 'Why do heavy riders need higher tire pressure?',
      answer: `Higher body weight means more force on the tires. Without adequate pressure, the tire compresses too much, causing: 1) Pinch flats when hitting bumps, 2) Poor handling from tire squirm, 3) Faster tire wear, 4) Reduced efficiency and range. Higher PSI prevents these issues.`,
    },
    {
      question: 'What e-bikes are best for riders over 250 lbs?',
      answer: `Look for e-bikes with: 1) Weight capacity of 300+ lbs, 2) Reinforced tire casing, 3) Sturdy frame (steel or thick aluminum), 4) Higher PSI rated tires (50+ PSI max). Brands like Rad Power, Lectric, Magicycle, and Biktrix offer models designed for heavier riders.`,
    },
    {
      question: 'Should I use reinforced or tubeless tires as a heavy rider?',
      answer: `Reinforced tires are highly recommended for riders 220+ lbs. They have stronger sidewalls that resist pinch flats even at high pressure. Tubeless can work but requires careful setup. Add 2-3 PSI over standard recommendations when using reinforced tires.`,
    },
    {
      question: 'How do I prevent pinch flats as a heavy rider?',
      answer: `1) Run maximum or near-maximum PSI for your tires, 2) Use reinforced/puncture-resistant tires, 3) Avoid hard impacts (jumping curbs, hitting potholes at speed), 4) Check pressure before every ride, 5) Consider wider tires which have more air volume and lower pinch flat risk.`,
    },
    {
      question: 'Is there a weight limit for e-bike tires?',
      answer: `E-bike tires don't have individual weight limits, but e-bikes do. Most e-bikes support 250-300 lbs total (rider + cargo). Premium models like RadWagon 5 or Magicycle support 400+ lbs. The tire PSI rating accommodates these weights when properly inflated.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Heavy Rider Tire Pressure', url: `${baseUrl}/${weightCategory.slug}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);

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

      <main className="min-h-screen bg-gradient-mesh">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Heavy Rider Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">⚖️</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Heavy Rider E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              {weightCategory.description}
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'Weight Range', value: '220-300+ lbs' },
              { label: 'PSI Adjustment', value: '+10-20%' },
              { label: 'Suitable Models', value: suitableModels.length },
              { label: 'Key Factor', value: 'Max PSI' },
            ]}
          />

          {/* Why Weight Matters */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Tire Pressure Matters More for Heavy Riders
            </h2>
            <div className="card p-6 bg-amber-50 border-l-4 border-amber-500">
              <p className="text-text leading-relaxed mb-4">
                As a heavier rider, proper tire pressure isn&apos;t just about comfort—it&apos;s about{' '}
                <strong>safety and preventing damage</strong>. Under-inflated tires with heavy loads
                lead to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠️</span>
                    <span><strong>Pinch flats:</strong> Tube gets pinched between rim and obstacle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠️</span>
                    <span><strong>Rim damage:</strong> Bottoming out can dent or crack rims</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠️</span>
                    <span><strong>Poor handling:</strong> Tire squirm reduces control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠️</span>
                    <span><strong>Faster wear:</strong> Excessive flex wears tires quickly</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Weight-Based PSI Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Tire Pressure by Rider Weight (220+ lbs)
            </h2>
            <p className="text-muted mb-6">
              These recommendations are for standard e-bike tires (27.5x2.2-2.4&quot;). Adjust based on
              your specific tire type using the terrain guide below.
            </p>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Rider Weight</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Front PSI</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Rear PSI</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">220 lbs (100 kg)</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">45-50 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">50-55 PSI</td>
                      <td className="px-4 py-3 text-center text-muted text-sm">Standard range works</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">240 lbs (109 kg)</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">48-53 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">53-58 PSI</td>
                      <td className="px-4 py-3 text-center text-muted text-sm">Upper-mid range</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">260 lbs (118 kg)</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">50-55 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">55-60 PSI</td>
                      <td className="px-4 py-3 text-center text-muted text-sm">Near max range</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">280 lbs (127 kg)</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">52-57 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">58-63 PSI</td>
                      <td className="px-4 py-3 text-center text-muted text-sm">Consider reinforced tires</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-medium text-red-800">300+ lbs (136+ kg)</td>
                      <td className="px-4 py-3 text-center font-bold text-red-600">55-60 PSI</td>
                      <td className="px-4 py-3 text-center font-bold text-red-600">60-65 PSI</td>
                      <td className="px-4 py-3 text-center text-red-800 text-sm">Max PSI, reinforced required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted mt-4">
                <strong>Important:</strong> Never exceed your tire&apos;s maximum PSI rating. If these
                recommendations exceed your tire&apos;s max, you need higher-rated tires.
              </p>
            </div>
          </section>

          {/* Fat Tire PSI for Heavy Riders */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Fat Tire PSI for Heavy Riders
            </h2>
            <p className="text-muted mb-6">
              Fat tires (4&quot;+ wide) have more air volume, making them a good choice for heavy riders.
              You can run slightly lower PSI with better pinch flat protection.
            </p>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Rider Weight</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">26x4.0&quot; Tires</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">20x4.0&quot; Tires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">220-240 lbs</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">20-25 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">22-27 PSI</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">250-280 lbs</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">23-28 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">25-30 PSI</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">300+ lbs</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">26-30 PSI</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand">28-32 PSI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Recommended Models */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              E-Bikes Suitable for Heavy Riders ({suitableModels.length})
            </h2>
            <p className="text-muted mb-6">
              These models have sturdy frames, reinforced tires, or high PSI ratings suitable for
              riders 220+ lbs. Click any model for specific tire pressure recommendations.
            </p>
            <ModelGrid models={suitableModels.slice(0, 12)} showBrand={true} showPSIRange={true} columns={3} />
            {suitableModels.length > 12 && (
              <div className="text-center mt-6">
                <Link
                  href="/ebike-tire-pressure"
                  className="text-brand font-medium hover:underline"
                >
                  View all {models.length} models →
                </Link>
              </div>
            )}
          </section>

          {/* Tips for Heavy Riders */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Tips for Heavy Riders
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">✅ Use Reinforced Tires</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Reinforced casing provides extra puncture and pinch flat protection. Worth the
                  small weight penalty for the added durability.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">✅ Check Pressure Weekly</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Tires naturally lose 1-2 PSI per week. At higher pressures, this represents a
                  smaller percentage but still matters. Check before every ride if possible.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">✅ Consider Fat Tires</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Fat tires have more air volume, reducing pinch flat risk even at moderate pressure.
                  Great option if your frame fits them.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">✅ Avoid Hard Impacts</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Even with proper pressure, jumping curbs or hitting potholes hard increases pinch
                  flat risk. Slow down for obstacles.
                </p>
              </div>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Exact PSI"
            subtitle="Get personalized tire pressure based on your weight, bike, and riding conditions."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Fat Tire E-Bikes',
                href: '/fat-tire-ebike-tire-pressure',
                description: 'Wide tire PSI guide',
                icon: '🏔️',
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
