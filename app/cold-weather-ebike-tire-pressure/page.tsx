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

const models = modelsData as ModelPreset[];

export const metadata: Metadata = {
  title: 'Cold Weather E-Bike Tire Pressure Guide | Winter PSI Adjustments (2026)',
  description:
    'Compensate for winter PSI drop on your e-bike. Temperature-based pressure charts, cold inflation tips, and snow riding settings for fat tire and commuter e-bikes.',
  alternates: {
    canonical: 'https://ebikepsi.com/cold-weather-ebike-tire-pressure',
  },
  openGraph: {
    title: 'Cold Weather E-Bike Tire Pressure Guide | Winter PSI Adjustments (2026)',
    description:
      'Compensate for winter PSI drop on your e-bike. Temperature-based pressure charts and cold weather riding tips.',
    type: 'article',
  },
};

export default function ColdWeatherEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();

  const fatTireTempTable = generateTempPSITable(22, 70);
  const standardTempTable = generateTempPSITable(45, 70);

  const faqs: FAQItem[] = [
    {
      question: 'How much does cold weather reduce tire pressure?',
      answer: 'Tire pressure drops approximately 1 PSI for every 10°F decrease in temperature. If you inflate to 30 PSI in a 70°F garage and ride at 30°F, your actual pressure will be about 26 PSI. This is enough to cause handling issues and increase flat risk, especially on heavier e-bikes.',
    },
    {
      question: 'Should I over-inflate my tires in winter?',
      answer: 'Yes, slightly. Add 2-4 PSI above your normal target when inflating in a warm space before riding in cold weather. This compensates for the temperature-based pressure drop. If you inflate in outdoor cold temperatures, use your normal target PSI since the tires are already at riding temperature.',
    },
    {
      question: 'What tire pressure should I use for snow riding?',
      answer: 'For snow on fat tires (4.0"+), run 8-15 PSI for maximum flotation on fresh snow and 15-20 PSI on packed snow. Standard tire e-bikes are not recommended for snow. If you must ride standard tires on light snow, stay at your normal pressure and focus on traction through cautious riding.',
    },
    {
      question: 'Should I inflate indoors or outdoors in winter?',
      answer: 'Both approaches work, but they require different strategies. Indoor inflation: add 2-4 PSI above target to compensate for cold. Outdoor inflation: inflate to your normal target since tires are already at riding temperature. Outdoor is more accurate but less comfortable in freezing weather.',
    },
    {
      question: 'How often should I check tire pressure in winter?',
      answer: 'Check before every ride in winter, or at minimum twice per week. Cold temperatures cause more rapid pressure loss than warm weather. A floor pump with a built-in gauge is the most accurate tool—digital pocket gauges can be unreliable below freezing.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Cold Weather E-Bike Tire Pressure', url: `${baseUrl}/cold-weather-ebike-tire-pressure` },
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
              { label: 'Cold Weather E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">❄️</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Cold Weather E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Winter drops your tire pressure without you touching a thing. Learn how to compensate for
              cold-weather PSI loss, set up for snow riding, and keep your e-bike safe through winter.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'PSI Drop per 10°F', value: '~1 PSI' },
              { label: 'Winter Loss', value: '-3-6 PSI' },
              { label: 'Over-inflate By', value: '+2-4 PSI' },
              { label: 'Check Frequency', value: 'Every Ride' },
            ]}
          />

          {/* How Cold Affects Pressure */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              How Cold Weather Affects Tire Pressure
            </h2>
            <div className="card p-6 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-text leading-relaxed mb-4">
                Cold air is denser than warm air—molecules slow down and exert less force on tire walls.
                For every <strong>10°F drop</strong> in temperature, your tire pressure decreases by roughly <strong>1 PSI</strong>.
              </p>
              <p className="text-text leading-relaxed mb-4">
                This means tires inflated to 30 PSI in a 70°F garage will only read <strong>26 PSI</strong> at
                30°F and <strong>24 PSI</strong> at 10°F. On heavier e-bikes (50-80+ lbs), this silent pressure loss
                significantly impacts handling, braking, and flat resistance.
              </p>
              <div className="bg-white p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-sm font-bold text-blue-800">
                  ❄️ Winter Strategy: If inflating indoors, add 2-4 PSI above your normal target
                  to compensate for the temperature drop when you ride outside.
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
              These tables show your actual tire pressure at different outdoor temperatures,
              assuming you inflated at 70°F (room temperature).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
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
                        <tr key={row.temp} className={row.temp <= 40 ? 'bg-blue-50' : ''}>
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
                        <tr key={row.temp} className={row.temp <= 40 ? 'bg-blue-50' : ''}>
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

          {/* Indoor vs Outdoor Inflation */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Indoor vs. Outdoor Inflation Strategy
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5 border-2 border-blue-200">
                <h3 className="font-bold text-text mb-2">🏠 Inflating Indoors (Warm)</h3>
                <p className="text-sm text-muted mb-3">
                  When inflating in a heated garage or home:
                </p>
                <ul className="text-sm text-muted space-y-1">
                  <li><strong>+2 PSI</strong> if riding temp is 40-50°F</li>
                  <li><strong>+3 PSI</strong> if riding temp is 25-40°F</li>
                  <li><strong>+4 PSI</strong> if riding temp is below 25°F</li>
                </ul>
              </div>
              <div className="card p-5 border-2 border-green-200">
                <h3 className="font-bold text-text mb-2">🌨️ Inflating Outdoors (Cold)</h3>
                <p className="text-sm text-muted mb-3">
                  When inflating at outdoor temperature:
                </p>
                <ul className="text-sm text-muted space-y-1">
                  <li>Use your <strong>normal target PSI</strong></li>
                  <li>Tires are already at riding temperature</li>
                  <li>No compensation needed</li>
                  <li>Most accurate method</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Snow Riding */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Snow Riding Tire Pressure
            </h2>
            <div className="card p-6">
              <p className="text-text leading-relaxed mb-4">
                Fat tire e-bikes excel in snow at very low pressures. The wide contact patch
                floats over snow instead of sinking through it.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Snow Condition</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Fat Tire PSI</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-muted">Fresh powder (3-6&quot;)</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">8-12 PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Maximum flotation</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Packed snow / groomed</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">12-18 PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Traction + efficiency</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Icy / hard-packed</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">15-20 PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Contact patch + control</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Mixed snow + pavement</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">15-22 PSI</td>
                      <td className="px-4 py-3 text-center text-xs text-muted">Compromise setting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted mt-4">
                Standard tire (2.0-2.5&quot;) e-bikes are not recommended for snow riding.
                If necessary, use studded tires and maintain normal pressure.
              </p>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Winter PSI"
            subtitle="Our calculator factors in temperature. Get precise pressure for cold weather riding conditions."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Hot Weather PSI',
                href: '/hot-weather-ebike-tire-pressure',
                description: 'Summer pressure adjustments',
                icon: '☀️',
              },
              {
                title: 'Fat Tire E-Bikes',
                href: '/fat-tire-ebike-tire-pressure',
                description: 'Snow-ready tire pressure',
                icon: '🏔️',
              },
              {
                title: 'Commuter E-Bikes',
                href: '/commuter-ebike-tire-pressure',
                description: 'Winter commuting PSI',
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
