import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTireSizeInfo } from '@/lib/programmatic/tire-sizes';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const allSizes = getAllTireSizeInfo();

export const metadata: Metadata = {
  title: 'E-Bike Tire Sizes Directory | PSI Guide by Tire Size (2026)',
  description: `Browse ${allSizes.length} e-bike tire sizes with recommended PSI ranges. Find your tire size for weight-based pressure charts, terrain adjustments, and model compatibility.`,
  alternates: {
    canonical: 'https://ebikepsi.com/tire-size',
  },
  openGraph: {
    title: 'E-Bike Tire Sizes Directory | PSI Guide by Tire Size (2026)',
    description: `Browse ${allSizes.length} e-bike tire sizes with recommended PSI ranges and model compatibility.`,
    type: 'website',
  },
};

export default function TireSizeDirectoryPage() {
  const baseUrl = getBaseUrl();

  const totalModels = allSizes.reduce((sum, s) => sum + s.modelCount, 0);
  const fatTireSizes = allSizes.filter((s) => s.category === 'Fat Tire');
  const standardSizes = allSizes.filter((s) => s.category === 'Standard' || s.category === 'Commuter' || s.category === 'Mountain');
  const foldingSizes = allSizes.filter((s) => s.category === 'Folding');
  const motoSizes = allSizes.filter((s) => s.category === 'Moto');
  const roadSizes = allSizes.filter((s) => s.category === 'Road');

  const faqs: FAQItem[] = [
    {
      question: 'How do I find my e-bike tire size?',
      answer: 'Look on the tire sidewall for markings like "20x4.0" or "26x2.1". The first number is the wheel diameter in inches, the second is the tire width. Some tires use metric (e.g., "700x38c")—the 700 is the diameter and 38 is the width in millimeters.',
    },
    {
      question: 'Does tire size affect recommended PSI?',
      answer: 'Yes, significantly. Wider tires (like 4.0" fat tires) run much lower pressure (12-25 PSI) because their larger air volume provides support at low pressures. Narrow tires (like 1.5" commuter tires) need higher pressure (50-80 PSI) to support the same load.',
    },
    {
      question: 'Can I put a different tire size on my e-bike?',
      answer: 'Within limits. You can usually go slightly wider or narrower (e.g., 2.0" to 2.2") on the same rim. Major size changes require different rims. Always check rim width compatibility and frame/fork clearance before changing tire sizes.',
    },
    {
      question: 'Why do fat tire e-bikes use such low PSI?',
      answer: 'Fat tires (3.0"+) have large air volume—the wide tire holds more air, so lower pressure still provides adequate support. At 15-20 PSI, a 4.0" tire has a large, soft contact patch that floats over sand, snow, and roots instead of sinking.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Tire Sizes', url: `${baseUrl}/tire-size` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);

  const sizeGroups = [
    { title: 'Fat Tire Sizes', sizes: fatTireSizes, icon: '🏔️', description: 'Wide tires (3.0"+) for all-terrain riding' },
    { title: 'Standard & Mountain Sizes', sizes: standardSizes, icon: '🚲', description: 'Common e-bike tire sizes (1.9-2.9")' },
    { title: 'Road & Commuter Sizes', sizes: roadSizes, icon: '🛣️', description: 'Narrow tires for pavement efficiency' },
    { title: 'Folding E-Bike Sizes', sizes: foldingSizes, icon: '📂', description: 'Small wheel sizes for compact bikes' },
    { title: 'Moto-Style Sizes', sizes: motoSizes, icon: '🏍️', description: 'Electric dirt bike tire sizes' },
  ].filter((g) => g.sizes.length > 0);

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
              { label: 'Tire Sizes' },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4 tracking-tight">
              E-Bike Tire Sizes Directory
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Browse all {allSizes.length} e-bike tire sizes with PSI recommendations. Find your tire size
              for weight-based pressure charts, terrain adjustments, and compatible models.
            </p>
          </header>

          <QuickStats
            items={[
              { label: 'Tire Sizes', value: allSizes.length },
              { label: 'E-Bike Models', value: totalModels },
              { label: 'Categories', value: sizeGroups.length },
              { label: 'PSI Range', value: '8-85' },
            ]}
          />

          {/* Size Groups */}
          {sizeGroups.map((group) => (
            <section key={group.title} className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text mb-2 flex items-center gap-2">
                <span>{group.icon}</span> {group.title}
              </h2>
              <p className="text-muted mb-6">{group.description}</p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {group.sizes.map((size) => (
                  <Link
                    key={size.slug}
                    href={`/tire-size/${size.slug}`}
                    className="group card card-hover p-5 bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-heading font-bold text-text group-hover:text-brand transition-colors">
                        {size.displaySize}
                      </h3>
                      <span className="text-brand text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <div className="space-y-1 text-sm text-muted">
                      <div>{size.modelCount} model{size.modelCount !== 1 ? 's' : ''}</div>
                      <div>{size.avgMinPSI}-{size.avgMaxPSI} PSI range</div>
                      <div>{size.brands.length} brand{size.brands.length !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs px-2 py-1 bg-surface-light text-muted rounded-md">
                        {size.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Know Your Tire Size? Calculate Your PSI"
            subtitle="Enter your tire size, weight, and riding conditions for precise front and rear pressure recommendations."
          />

          <RelatedLinks
            heading="More Resources"
            links={[
              {
                title: 'All E-Bike Models',
                href: '/ebike-tire-pressure',
                description: 'Browse by brand and model',
                icon: '📚',
              },
              {
                title: 'Fat Tire Guide',
                href: '/fat-tire-ebike-tire-pressure',
                description: 'Wide tire PSI recommendations',
                icon: '🏔️',
              },
              {
                title: 'Commuter Guide',
                href: '/commuter-ebike-tire-pressure',
                description: 'Urban riding pressure',
                icon: '🏙️',
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
