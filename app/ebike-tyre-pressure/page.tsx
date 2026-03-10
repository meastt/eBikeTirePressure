import type { Metadata } from 'next';
import Link from 'next/link';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { UK_PAGE, psiToBar, formatPressure } from '@/lib/programmatic/geo';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { ModelGrid, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const models = modelsData as ModelPreset[];

// Filter for UK/EU focused brands
const ukBrands = ['Tern', 'Brompton', 'GoCycle', 'Riese & Müller', 'Gazelle', 'Cube', 'Canyon', 'VanMoof'];
const ukModels = models.filter((m) => ukBrands.some((b) => m.brand.includes(b)));
const allBrands = [...new Set(models.map((m) => m.brand))];

export const metadata: Metadata = {
  title: 'E-Bike Tyre Pressure Guide UK | Bar & PSI Charts for All Models',
  description: UK_PAGE.description,
  alternates: {
    canonical: `${getBaseUrl()}/${UK_PAGE.slug}`,
    languages: {
      'en-GB': `${getBaseUrl()}/${UK_PAGE.slug}`,
      'en-US': `${getBaseUrl()}/ebike-tire-pressure`,
      'x-default': `${getBaseUrl()}/ebike-tire-pressure`,
    },
  },
  openGraph: {
    title: 'E-Bike Tyre Pressure Guide UK | Bar & PSI Charts',
    description: UK_PAGE.description,
    type: 'article',
    locale: 'en_GB',
  },
};

export default function UKTyrePressurePage() {
  const baseUrl = getBaseUrl();

  const faqs: FAQItem[] = [
    {
      question: 'What tyre pressure should I use for my e-bike in Bar?',
      answer: `Most e-bike tyres run between 2.0 and 4.5 Bar (30-65 PSI). Fat tyres use 1.0-1.7 Bar (15-25 PSI), commuter tyres typically need 2.5-3.5 Bar (35-50 PSI), and road-style e-bikes run 3.5-5.5 Bar (50-80 PSI). Check your tyre sidewall for the specific range.`,
    },
    {
      question: 'How do I convert PSI to Bar for my e-bike tyres?',
      answer: `To convert PSI to Bar, divide by 14.5. For example: 30 PSI ÷ 14.5 = 2.07 Bar. Common conversions: 20 PSI = 1.4 Bar, 30 PSI = 2.1 Bar, 40 PSI = 2.8 Bar, 50 PSI = 3.4 Bar, 60 PSI = 4.1 Bar.`,
    },
    {
      question: 'Why do UK e-bike owners use Bar instead of PSI?',
      answer: `Bar is the standard pressure unit in the UK and EU, matching Continental European bike pumps and tyre markings. Many European e-bike brands (Tern, Riese & Müller, Gazelle) list Bar as the primary unit. Most quality floor pumps show both Bar and PSI.`,
    },
    {
      question: 'What tyre pressure for a Brompton Electric?',
      answer: `Brompton Electric tyres (16x1.5") need 4.1-6.9 Bar (60-100 PSI)—higher than most e-bikes due to the small wheel size. Most Brompton riders run 5.5-6.2 Bar (80-90 PSI) for the best balance of efficiency and comfort.`,
    },
    {
      question: 'Should I adjust tyre pressure for UK weather?',
      answer: `Yes. Tyre pressure drops approximately 0.07 Bar (1 PSI) for every 5°C temperature drop. In winter, check and top up your tyres more frequently. Cold mornings may require 0.1-0.2 Bar extra to compensate for the temperature difference from when you last inflated.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'E-Bike Tyre Pressure UK', url: `${baseUrl}/${UK_PAGE.slug}` },
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
              { label: 'E-Bike Tyre Pressure UK' },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4 tracking-tight">
              E-Bike Tyre Pressure Guide
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Complete tyre pressure recommendations in Bar and PSI for UK and EU e-bike riders. 
              Weight-based charts for {models.length}+ models from {allBrands.length} brands.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand bg-brand-50 px-3 py-1.5 rounded-lg">
              <span>🇬🇧</span>
              <span>UK/EU Edition • Bar & PSI</span>
            </div>
          </header>

          <QuickStats
            items={[
              { label: 'Total Models', value: models.length },
              { label: 'UK/EU Brands', value: ukModels.length },
              { label: 'All Brands', value: allBrands.length },
              { label: 'Units', value: 'Bar + PSI' },
            ]}
          />

          {/* PSI to Bar Conversion */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              PSI to Bar Quick Reference
            </h2>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Tyre Type</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">PSI Range</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Bar Range</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Common Models</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Fat Tyres (4&quot;+)</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">15-25 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">1.0-1.7 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Rad Power, Lectric, Himiway</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Standard (2-3&quot;)</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">30-50 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">2.1-3.4 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Trek, Specialized, Cube</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Cargo Tyres</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">35-55 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">2.4-3.8 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Tern, Riese & Müller, Yuba</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Folding (16-20&quot;)</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">40-80 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">2.8-5.5 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Brompton, GoCycle, Tern</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Road/Commuter</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">50-85 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">3.4-5.9 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Gazelle, Canyon, VanMoof</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Weight-Based Recommendations */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Tyre Pressure by Rider Weight (Standard Tyres)
            </h2>
            <p className="text-muted mb-6">
              For standard 27.5&quot; e-bike tyres (2.0-2.4&quot; width). Adjust for your specific tyre size.
            </p>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Rider Weight</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Front Tyre</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Rear Tyre</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Feel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { weight: '60 kg (132 lbs)', front: 32, rear: 35, feel: 'Soft' },
                      { weight: '70 kg (154 lbs)', front: 35, rear: 38, feel: 'Balanced' },
                      { weight: '80 kg (176 lbs)', front: 38, rear: 42, feel: 'Balanced' },
                      { weight: '90 kg (198 lbs)', front: 42, rear: 46, feel: 'Balanced' },
                      { weight: '100 kg (220 lbs)', front: 45, rear: 50, feel: 'Firm' },
                      { weight: '110+ kg (242+ lbs)', front: 48, rear: 55, feel: 'Firm' },
                    ].map((row) => (
                      <tr key={row.weight}>
                        <td className="px-4 py-3 font-medium text-text">{row.weight}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-brand">{row.front} PSI</span>
                          <span className="text-muted text-sm ml-1">({psiToBar(row.front).toFixed(1)} Bar)</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-brand">{row.rear} PSI</span>
                          <span className="text-muted text-sm ml-1">({psiToBar(row.rear).toFixed(1)} Bar)</span>
                        </td>
                        <td className="px-4 py-3 text-center text-muted">{row.feel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* UK/EU Brands */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Popular UK &amp; EU E-Bike Brands ({ukModels.length} models)
            </h2>
            <p className="text-muted mb-6">
              These European brands are popular in the UK market. Click any model for detailed tyre pressure specs.
            </p>
            <ModelGrid models={ukModels.slice(0, 12)} showBrand={true} showPSIRange={true} columns={3} />
            {ukModels.length > 12 && (
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

          {/* UK-Specific Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              UK Weather &amp; Tyre Pressure Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🌧️</span> Wet Conditions
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  For wet UK roads, consider running 0.1-0.2 Bar (2-3 PSI) lower than normal. This
                  increases the contact patch for better grip on slippery surfaces. Don&apos;t go below
                  the minimum tyre rating.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>❄️</span> Winter Riding
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Cold temperatures reduce tyre pressure. Check your tyres weekly in winter and add
                  0.1-0.2 Bar to compensate. A tyre inflated to 2.5 Bar in a warm garage may drop to
                  2.3 Bar outside in cold weather.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🚴</span> Commuting
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  For UK urban commuting with potholes and kerbs, run slightly lower pressure for
                  puncture protection. The extra cushion helps absorb impacts. Run 0.1-0.2 Bar below
                  the &quot;firm&quot; recommendation.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>📏</span> Checking Pressure
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Use a quality floor pump with a Bar/PSI gauge. Check pressure weekly, or before any
                  ride longer than 30 minutes. Digital gauges are more accurate than dial gauges for
                  precise readings.
                </p>
              </div>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Calculate Your E-Bike Tyre Pressure"
            subtitle="Get personalised PSI and Bar recommendations based on your weight, tyre size, and riding conditions."
          />

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
                title: 'Cargo E-Bikes',
                href: '/cargo-ebike-tire-pressure',
                description: 'Load-based tyre pressure',
                icon: '📦',
              },
              {
                title: 'PSI Calculator',
                href: '/calculate',
                description: 'Personalised recommendations',
                icon: '🧮',
              },
            ]}
          />

          {/* US Version Link */}
          <div className="mt-8 text-center text-sm text-muted">
            Looking for US measurements?{' '}
            <Link href="/ebike-tire-pressure" className="text-brand hover:underline">
              View PSI-only version →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
