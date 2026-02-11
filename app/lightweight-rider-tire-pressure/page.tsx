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
import { PSIQuickTable, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const models = modelsData as ModelPreset[];

export const metadata: Metadata = {
  title: 'Lightweight Rider E-Bike Tire Pressure Guide | PSI for 100-150 lb Riders (2026)',
  description:
    'Tire pressure guide for lighter e-bike riders (100-150 lbs). Lower PSI recommendations for comfort without risking flats. Covers fat tire, commuter, and folding e-bikes.',
  alternates: {
    canonical: 'https://ebikepsi.com/lightweight-rider-tire-pressure',
  },
  openGraph: {
    title: 'Lightweight Rider E-Bike Tire Pressure Guide | PSI for 100-150 lb Riders (2026)',
    description:
      'Tire pressure guide for lighter e-bike riders (100-150 lbs). Lower PSI for comfort without risking flats.',
    type: 'article',
  },
};

export default function LightweightRiderTirePressurePage() {
  const baseUrl = getBaseUrl();

  // Get representative PSI ranges for different tire types
  const fatTireModels = models.filter((m) => {
    const parts = m.stockTire.size.split('x');
    const w = parts[1] ? parseFloat(parts[1]) : 0;
    return w >= 3.5;
  });
  const standardModels = models.filter((m) => {
    const parts = m.stockTire.size.split('x');
    const w = parts[1] ? parseFloat(parts[1]) : 0;
    return w >= 1.9 && w < 3.0;
  });

  const faqs: FAQItem[] = [
    {
      question: 'What tire pressure should a 120 lb rider use on an e-bike?',
      answer: 'A 120 lb rider can typically run 3-5 PSI below the midpoint of their tire\'s recommended range. For fat tires (4.0"), try 15-18 PSI. For standard tires (2.0-2.5"), try 30-40 PSI. The lower pressure improves comfort and traction without pinch flat risk at your lighter weight.',
    },
    {
      question: 'Can lighter riders run lower tire pressure safely?',
      answer: 'Yes, lighter riders generate less force on the tire, so you can safely run lower pressures than heavier riders. The key is staying above the tire sidewall minimum. At 100-150 lbs, you\'re putting less total load on the tire (bike + rider), so the minimum safe PSI is lower than for a 200 lb rider.',
    },
    {
      question: 'Why do most PSI charts feel over-inflated for smaller riders?',
      answer: 'Most tire pressure charts and manufacturer recommendations are based on a 180 lb "average" rider. If you weigh 120-140 lbs, those charts result in over-inflation for your weight. Over-inflated tires feel harsh, bounce on bumps, and offer less traction. Our calculator adjusts for your actual weight.',
    },
    {
      question: 'Should lightweight riders worry about pinch flats?',
      answer: 'Less so than heavier riders. Pinch flats occur when the tire compresses against the rim under impact. At 100-150 lbs, you generate less compression force, so you can safely run lower pressures. That said, don\'t go below your tire\'s printed minimum—that limit accounts for rim protection too.',
    },
    {
      question: 'How does bike weight factor in for a lightweight rider?',
      answer: 'E-bikes weigh 45-80+ lbs, which is a larger percentage of total load for a 120 lb rider (40-65% of total) vs. a 200 lb rider (20-30% of total). This means bike weight matters more for your pressure calculation. Use our calculator which accounts for both rider and bike weight.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Lightweight Rider Tire Pressure', url: `${baseUrl}/lightweight-rider-tire-pressure` },
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
              { label: 'Lightweight Rider Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🪶</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Lightweight Rider Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              PSI recommendations specifically for riders weighing 100-150 lbs. Most charts are calibrated
              for 180 lb riders—here&apos;s what actually works for your weight.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'Weight Range', value: '100-150 lbs' },
              { label: 'PSI Adjustment', value: '-3-8 PSI' },
              { label: 'vs. Standard', value: 'Below Mid' },
              { label: 'Priority', value: 'Comfort' },
            ]}
          />

          {/* Why Standard Charts Don't Work */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Standard PSI Charts Over-Inflate for You
            </h2>
            <div className="card p-6 bg-purple-50 border-l-4 border-purple-500">
              <p className="text-text leading-relaxed mb-4">
                Most tire pressure recommendations assume a 170-180 lb rider. If you weigh 120 lbs,
                that&apos;s 50-60 lbs less load on the tires—a significant difference that changes
                the optimal pressure.
              </p>
              <p className="text-text leading-relaxed mb-4">
                Running pressure calibrated for a heavier rider means your tires are <strong>over-inflated
                for your weight</strong>. The result: a harsh, bouncy ride that transmits every crack and pebble,
                reduced traction in corners, and less control on loose surfaces.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-700 mb-1 text-sm">Over-Inflated (Too High for You)</h3>
                  <ul className="text-xs text-muted space-y-1">
                    <li>Harsh, uncomfortable ride</li>
                    <li>Bounces off bumps instead of absorbing</li>
                    <li>Less traction in turns</li>
                    <li>Faster tire center wear</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-700 mb-1 text-sm">Optimized for Your Weight</h3>
                  <ul className="text-xs text-muted space-y-1">
                    <li>Smooth, comfortable ride</li>
                    <li>Tires absorb road imperfections</li>
                    <li>Better traction and grip</li>
                    <li>Even tire wear pattern</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* PSI Tables by Tire Type */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Recommended PSI by Tire Type (100-150 lb Rider)
            </h2>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Tire Type</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">100 lbs</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">120 lbs</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">140 lbs</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">150 lbs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-muted">Fat Tire (4.0&quot;+)</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">12-15</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">14-18</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">16-20</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">17-22</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Wide (3.0-3.5&quot;)</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">18-22</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">20-25</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">22-28</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">24-30</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Standard (2.0-2.5&quot;)</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">28-35</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">30-38</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">33-42</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">35-45</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Road/Commuter (1.5-1.9&quot;)</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">40-50</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">42-55</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">45-58</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">48-60</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted">Folding (16&quot; wheels)</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">45-55</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">48-58</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">50-62</td>
                      <td className="px-4 py-3 text-center font-medium text-brand">52-65</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted mt-4">
                Values assume pavement riding with no cargo. Lower end for comfort/trails,
                upper end for speed/efficiency. Always respect tire sidewall min/max.
              </p>
            </div>
          </section>

          {/* Bike Weight Impact */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Bike Weight Matters More for You
            </h2>
            <div className="card p-6">
              <p className="text-text leading-relaxed mb-4">
                E-bikes weigh 45-80+ lbs. For a 120 lb rider on a 65 lb e-bike, the bike is
                <strong> 54% of the total load</strong>. For a 200 lb rider, the same bike is only 33%.
                This means tire pressure needs to account for bike weight proportionally more for lighter riders.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-surface-light rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand mb-1">120 + 65</div>
                  <div className="text-xs text-muted">Rider + Bike = 185 lbs total</div>
                  <div className="text-xs text-muted mt-1">Bike is 35% of load</div>
                </div>
                <div className="p-4 bg-surface-light rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand mb-1">140 + 65</div>
                  <div className="text-xs text-muted">Rider + Bike = 205 lbs total</div>
                  <div className="text-xs text-muted mt-1">Bike is 32% of load</div>
                </div>
                <div className="p-4 bg-surface-light rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand mb-1">100 + 75</div>
                  <div className="text-xs text-muted">Rider + Heavy E-bike = 175 lbs</div>
                  <div className="text-xs text-muted mt-1">Bike is 43% of load</div>
                </div>
              </div>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Exact PSI"
            subtitle="Our calculator accounts for your weight, your specific bike's weight, and riding conditions. No more guessing."
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
                title: 'Commuter E-Bikes',
                href: '/commuter-ebike-tire-pressure',
                description: 'Urban riding PSI',
                icon: '🏙️',
              },
              {
                title: 'Folding E-Bikes',
                href: '/folding-ebike-tire-pressure',
                description: 'Small wheel PSI guide',
                icon: '📂',
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
