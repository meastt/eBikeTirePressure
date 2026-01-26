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

const category = CATEGORIES['folding'];
const categoryModels = getModelsForCategory('folding');

export const metadata: Metadata = {
  title: 'Folding E-Bike Tire Pressure Guide | Small Wheel PSI Charts',
  description: category.description,
  alternates: {
    canonical: `${getBaseUrl()}/${category.slug}`,
  },
  openGraph: {
    title: 'Folding E-Bike Tire Pressure Guide | Small Wheel PSI Charts',
    description: category.description,
    type: 'article',
  },
};

export default function FoldingEbikeTirePressurePage() {
  const baseUrl = getBaseUrl();
  const brands = [...new Set(categoryModels.map((m) => m.brand))];

  // Calculate average PSI range
  const psiValues = categoryModels
    .filter((m) => m.stockTire.minPSI && m.stockTire.maxPSI)
    .map((m) => ({ min: m.stockTire.minPSI!, max: m.stockTire.maxPSI! }));
  const avgMinPSI = Math.round(psiValues.reduce((sum, p) => sum + p.min, 0) / psiValues.length) || 35;
  const avgMaxPSI = Math.round(psiValues.reduce((sum, p) => sum + p.max, 0) / psiValues.length) || 65;

  const faqs: FAQItem[] = [
    {
      question: 'Why do folding e-bikes need higher tire pressure?',
      answer: `Folding e-bikes use smaller wheels (typically 16-20 inches) which have less air volume than larger wheels. With less air cushion, they need higher pressure (${avgMinPSI}-${avgMaxPSI} PSI) to support the same weight and prevent pinch flats. Small wheels also roll better at higher pressure.`,
    },
    {
      question: 'What PSI should I use for my Brompton Electric?',
      answer: `Brompton Electric uses 16x1.5" tires which require 60-100 PSI—much higher than most e-bikes. The small tire volume needs this pressure to avoid pinch flats. Check your specific tire sidewall, but most Brompton riders run 80-90 PSI for pavement.`,
    },
    {
      question: 'Do folding bike tires lose pressure faster?',
      answer: `Yes, smaller tires tend to lose pressure faster because they have less air volume—a small loss represents a bigger percentage drop. Check folding bike tire pressure weekly, or before any ride if you haven't ridden in a few days.`,
    },
    {
      question: 'Should I lower PSI for comfort on a folding e-bike?',
      answer: `You can drop a few PSI for comfort, but don't go too low. Small wheels are more prone to pinch flats at low pressure. Stay within 5-10% of the recommended PSI. If you need more comfort, consider wider tires if your frame allows.`,
    },
    {
      question: 'How does folding affect tire pressure?',
      answer: `Folding itself doesn't change tire pressure, but stored bikes may slowly lose air over time. Always check pressure before riding a folded bike that's been stored. Temperature changes in storage can also affect PSI.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Folding E-Bike Tire Pressure', url: `${baseUrl}/${category.slug}` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);
  const itemListSchema = generateItemListSchema({
    name: 'Folding E-Bikes',
    description: `${categoryModels.length} folding and compact e-bikes with tire pressure specifications`,
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
              { label: 'Folding E-Bike Tire Pressure' },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                Folding E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">{category.description}</p>
          </header>

          <QuickStats
            items={[
              { label: 'Folding Models', value: categoryModels.length },
              { label: 'PSI Range', value: `${avgMinPSI}-${avgMaxPSI}` },
              { label: 'Brands', value: brands.length },
              { label: 'Wheel Sizes', value: '16-20"' },
            ]}
          />

          {/* Why Higher PSI */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Why Small Wheels Need Higher Pressure
            </h2>
            <div className="card p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-text mb-2">Less Air Volume</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    A 16" tire holds significantly less air than a 27.5" tire. This smaller air cushion
                    needs higher pressure to prevent bottoming out on bumps and avoid pinch flats.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text mb-2">Rolling Efficiency</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Small wheels benefit more from higher pressure for efficient rolling. The contact patch
                    is smaller, so deformation from low pressure has a bigger negative impact.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text mb-2">Pinch Flat Risk</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    With less air volume, small tires compress more easily. Running low PSI dramatically
                    increases pinch flat risk, especially when hitting curbs or potholes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text mb-2">Weight Concentration</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Folding bikes are often compact with concentrated weight. The same rider weight on
                    smaller wheels means higher pressure per square inch needed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PSI Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Recommended PSI by Rider Weight
            </h2>
            <p className="text-muted mb-6">
              Folding e-bikes generally need higher PSI than standard e-bikes. Use this as a starting
              point and adjust based on your comfort and tire specifications.
            </p>
            <div className="card p-6">
              <PSIQuickTable
                minPSI={avgMinPSI}
                maxPSI={avgMaxPSI}
                riderWeights={[120, 140, 160, 180, 200, 220]}
                bikeWeight={50}
              />
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Brompton and other 16" wheel bikes may need 60-100 PSI. Always
                check your specific tire sidewall for the recommended range.
              </p>
            </div>
          </section>

          {/* Common Tire Sizes */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Common Folding E-Bike Tire Sizes
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">16x1.5" (Brompton)</h3>
                <p className="text-2xl font-bold text-brand mb-1">60-100 PSI</p>
                <p className="text-sm text-muted">High pressure for small volume</p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">20x2.0-2.5" (Standard)</h3>
                <p className="text-2xl font-bold text-brand mb-1">40-65 PSI</p>
                <p className="text-sm text-muted">Most common folding size</p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2">20x3.0" (Fat Fold)</h3>
                <p className="text-2xl font-bold text-brand mb-1">20-30 PSI</p>
                <p className="text-sm text-muted">Wide tires, lower pressure</p>
              </div>
            </div>
          </section>

          {/* All Models */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              All Folding E-Bike Models ({categoryModels.length})
            </h2>
            <p className="text-muted mb-6">
              Click any model for specific tire pressure recommendations and specifications.
            </p>
            <ModelGrid models={categoryModels} showBrand={true} showPSIRange={true} columns={3} />
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your Folding Bike PSI"
            subtitle="Get precise tire pressure based on your weight, tire size, and riding conditions."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Commuter E-Bikes',
                href: '/commuter-ebike-tire-pressure',
                description: 'Urban riding PSI guide',
                icon: '🏙️',
              },
              {
                title: 'All E-Bike Models',
                href: '/ebike-tire-pressure',
                description: 'Browse all brands',
                icon: '📚',
              },
              {
                title: 'PSI Calculator',
                href: '/calculate',
                description: 'Get personalized PSI',
                icon: '🧮',
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
