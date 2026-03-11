import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCATIONS, getAllLocations } from '@/lib/programmatic/locations';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  return getAllLocations().map((loc) => ({
    location: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const locData = LOCATIONS[location];

  if (!locData) {
    return { title: 'Location Not Found' };
  }

  const title = `${locData.name} E-Bike Tire Pressure Guide | Local PSI Charts (2026)`;
  const description = `Optimize your e-bike tire pressure for riding in ${locData.name}. Local climate, terrain, and road conditions require specific PSI adjustments for safety and range.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${getBaseUrl()}/${locData.slug}-ebike-tire-pressure`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function LocationEbikeTirePressurePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const locData = LOCATIONS[location];

  if (!locData) notFound();
  
  const baseUrl = getBaseUrl();

  const faqs: FAQItem[] = [
    {
      question: `What tire pressure should I run for my e-bike in ${locData.name}?`,
      answer: `In ${locData.name}, because of its ${locData.climate} climate and ${locData.terrain} terrain, you should start at a balanced pressure. ${locData.description} For an exact number, use our calculator based on your weight and bike model.`,
    },
    {
      question: `Does the weather in ${locData.name} impact my tire pressure?`,
      answer: `Yes. If the weather drops into freezing temperatures, you'll lose about 1 PSI for every 10 degree drop. If it gets extremely hot, pressure expands. In ${locData.climate} conditions, monitor your PSI before major rides.`,
    },
    {
      question: `How does ${locData.name}'s terrain affect required PSI?`,
      answer: `${locData.name} is generally ${locData.terrain}. On steep hills, a lower rear PSI gives the motor better traction. On flat, fast pavement, higher PSI increases your battery range. Let a specific local commute layout dictate whether you favor grip vs. range.`,
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: `${locData.name} E-Bike Tire Pressure`, url: `${baseUrl}/${locData.slug}-ebike-tire-pressure` },
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
              { label: `${locData.name} Tire Pressure` },
            ]}
          />

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">📍</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight">
                {locData.name} E-Bike Tire Pressure Guide
              </h1>
            </div>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Optimize your daily commute with the right tire pressure tailored to <strong>{locData.name}&apos;s</strong> unique {locData.climate} climate and {locData.terrain} terrain.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'Location', value: locData.name },
              { label: 'Climate Type', value: locData.climate },
              { label: 'Terrain', value: locData.terrain },
              { label: 'Adjustments Needed', value: 'Yes' },
            ]}
          />

          {/* Local Insight */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Riding in {locData.name}: Local PSI Insights
            </h2>
            <div className="card p-6 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-text leading-relaxed mb-4">
                When riding an e-bike in <strong>{locData.name}</strong>, standard manual recommendations don't always apply. 
                {locData.description}
              </p>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title={`Calculate Your PSI for ${locData.name}`}
            subtitle="Get precise front and rear tire pressure based on your weight and exact e-bike model, accounting for your local conditions."
          />

          <RelatedLinks
            heading="Related Guides"
            links={[
              {
                title: 'Commuter E-Bikes',
                href: '/commuter-ebike-tire-pressure',
                description: 'Urban and city PSI guide',
                icon: '🏙️',
              },
              {
                title: 'Cold Weather PSI',
                href: '/cold-weather-ebike-tire-pressure',
                description: 'Winter commuting adjustments',
                icon: '❄️',
              },
              {
                title: 'Hot Weather PSI',
                href: '/hot-weather-ebike-tire-pressure',
                description: 'Summer pressure management',
                icon: '☀️',
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
