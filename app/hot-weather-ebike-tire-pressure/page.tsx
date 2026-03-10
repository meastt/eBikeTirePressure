import type { Metadata } from 'next';
import Link from 'next/link';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { generateTempPSITable } from '@/lib/programmatic/geo';
import { PSIQuickTable, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';


export const metadata: Metadata = {
  title: 'Hot Weather E-Bike Tire Pressure Guide | Summer PSI Adjustments (2026)',
  description:
    'Prevent blowouts and optimize e-bike tire pressure for summer heat. Learn how temperature affects PSI, when to deflate, and hot weather safety tips for all e-bike types.',
  alternates: {
    canonical: 'https://ebikepsi.com/hot-weather-ebike-tire-pressure',
  },
  openGraph: {
    title: 'Hot Weather E-Bike Tire Pressure Guide | Summer PSI Adjustments (2026)',
    description:
      'Prevent blowouts and optimize e-bike tire pressure for summer heat. Temperature-based PSI adjustment charts.',
    type: 'article',
  },
};

export default function HotWeatherEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();

  // Generate temperature PSI tables for common baseline pressures
  const fatTireTempTable = generateTempPSITable(22, 70);
  const standardTempTable = generateTempPSITable(45, 70);

  const faqs: FAQItem[] = [
    {
      question: 'How much does tire pressure increase in hot weather?',
      answer: 'Tire pressure increases approximately 1 PSI for every 10°F rise in temperature. On a 100°F day, tires inflated to 30 PSI at 70°F will read about 33 PSI. This is due to the gas law—air expands as it heats. Always check pressure when tires are cold (before riding).',
    },
    {
      question: 'Should I deflate my e-bike tires in summer?',
      answer: 'If you inflate at room temperature (68-72°F) and ride in 90-100°F heat, start 2-3 PSI below your normal target. The heat will bring pressure up to your ideal range during the ride. Never start at maximum PSI in hot weather—heat expansion could push you over the tire\'s safe limit.',
    },
    {
      question: 'Can hot pavement cause a tire blowout on my e-bike?',
      answer: 'Yes, but only if tires are already at or near maximum PSI. Hot pavement (which can reach 140-160°F in direct sun) heats tires from below while air temperature heats from above. Combined, this can push pressure 5-8 PSI above your cold fill. Keep cold-fill pressure at least 5 PSI below max in summer.',
    },
    {
      question: 'What time of day should I check tire pressure in summer?',
      answer: 'Always check and inflate in the morning before riding, when tires are at ambient temperature. Checking after a ride or in afternoon sun gives inaccurately high readings. If you must check mid-day, subtract 2-3 PSI from the reading to estimate true cold pressure.',
    },
    {
      question: 'Does storing my e-bike in a hot garage affect tire pressure?',
      answer: 'Yes. A garage that reaches 100-110°F will increase tire pressure by 3-4 PSI compared to a 70°F baseline. If you inflate in an air-conditioned space and store in a hot garage, your actual riding pressure will be higher than intended. Inflate where you store for the most accurate results.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Hot Weather E-Bike Tire Pressure', url: `${baseUrl}/hot-weather-ebike-tire-pressure` },
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
              { label: 'Hot Weather E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">☀️</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Hot Weather E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              How summer heat affects your e-bike tire pressure and what to do about it.
              Temperature-based PSI charts, blowout prevention, and hot weather riding tips.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'PSI per 10°F', value: '~1 PSI' },
              { label: 'Summer Risk', value: '+3-8 PSI' },
              { label: 'Check When', value: 'Cold/AM' },
              { label: 'Safety Buffer', value: '-3-5 PSI' },
            ]}
          />

          {/* How Heat Affects Pressure */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              How Temperature Affects Tire Pressure
            </h2>
            <div className="card p-6 bg-red-50 border-l-4 border-red-500">
              <p className="text-text leading-relaxed mb-4">
                Air pressure and temperature are directly linked. When air heats up, molecules move faster
                and push harder against the tire walls. For every <strong>10°F increase</strong> in temperature,
                your tire pressure rises by approximately <strong>1 PSI</strong>.
              </p>
              <p className="text-text leading-relaxed mb-4">
                On a 100°F summer day, tires inflated to spec at 70°F will be running <strong>3 PSI higher</strong> before
                you even start riding. Add friction heating from the road, and pressure can climb 5-8 PSI above
                your cold-fill level during a ride.
              </p>
              <div className="bg-white p-4 rounded-lg border border-red-200 mt-4">
                <p className="text-sm font-bold text-red-800">
                  ⚠️ Blowout Prevention: In summer, always inflate 3-5 PSI below your tire&apos;s maximum rating
                  to leave room for heat expansion.
                </p>
              </div>
            </div>
          </section>

          {/* Temperature PSI Tables */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Temperature vs. PSI Lookup Tables
            </h2>
            <p className="text-muted mb-6">
              These tables show how your tire pressure changes at different temperatures,
              assuming you inflated at 70°F (room temperature).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Fat Tire Table */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text mb-3">Fat Tires (Baseline: 22 PSI)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="px-3 py-2 text-left font-bold text-text">Temp (°F)</th>
                        <th className="px-3 py-2 text-center font-bold text-text">Actual PSI</th>
                        <th className="px-3 py-2 text-center font-bold text-text">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fatTireTempTable.map((row) => (
                        <tr key={row.temp} className={row.temp >= 90 ? 'bg-red-50' : ''}>
                          <td className="px-3 py-2 text-muted">{row.temp}°F</td>
                          <td className="px-3 py-2 text-center font-medium text-brand">{row.psi}</td>
                          <td className="px-3 py-2 text-center text-xs text-muted">
                            {row.psi - 22 >= 0 ? '+' : ''}{row.psi - 22}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Standard Tire Table */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-text mb-3">Standard Tires (Baseline: 45 PSI)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="px-3 py-2 text-left font-bold text-text">Temp (°F)</th>
                        <th className="px-3 py-2 text-center font-bold text-text">Actual PSI</th>
                        <th className="px-3 py-2 text-center font-bold text-text">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {standardTempTable.map((row) => (
                        <tr key={row.temp} className={row.temp >= 90 ? 'bg-red-50' : ''}>
                          <td className="px-3 py-2 text-muted">{row.temp}°F</td>
                          <td className="px-3 py-2 text-center font-medium text-brand">{row.psi}</td>
                          <td className="px-3 py-2 text-center text-xs text-muted">
                            {row.psi - 45 >= 0 ? '+' : ''}{row.psi - 45}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Summer Riding Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Summer Tire Pressure Tips
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">🌅 Inflate in the Morning</h3>
                <p className="text-sm text-muted">
                  Check and set pressure before 9 AM when tires are at ambient temperature.
                  Afternoon readings will be 2-4 PSI too high.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">📉 Start 2-3 PSI Low</h3>
                <p className="text-sm text-muted">
                  On days above 90°F, inflate 2-3 PSI below your normal target. Road heat
                  will bring pressure up to your ideal range.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">🚫 Never Fill to Max</h3>
                <p className="text-sm text-muted">
                  Keep at least 5 PSI below your tire&apos;s maximum rating in summer.
                  Heat expansion with no safety margin risks blowouts.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">🅿️ Watch Parking Conditions</h3>
                <p className="text-sm text-muted">
                  A bike parked in direct sun can see tire temps climb 20-30°F above ambient.
                  Park in shade when possible.
                </p>
              </div>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Summer PSI"
            subtitle="Our calculator accounts for temperature. Get precise front and rear pressure for hot weather riding."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Cold Weather PSI',
                href: '/cold-weather-ebike-tire-pressure',
                description: 'Winter pressure adjustments',
                icon: '❄️',
              },
              {
                title: 'Fat Tire E-Bikes',
                href: '/fat-tire-ebike-tire-pressure',
                description: 'Low PSI all-terrain guide',
                icon: '🏔️',
              },
              {
                title: 'Commuter E-Bikes',
                href: '/commuter-ebike-tire-pressure',
                description: 'Daily riding PSI guide',
                icon: '🏙️',
              },
              {
                title: 'All E-Bike Models',
                href: '/ebike-tire-pressure',
                description: 'Browse 150+ models',
                icon: '📚',
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
