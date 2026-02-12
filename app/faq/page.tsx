import { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { getBaseUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'E-Bike Tire Pressure FAQ | Expert Answers to Common PSI Questions (2026)',
  description:
    'Frequently asked questions about e-bike tire pressure, PSI recommendations, pinch flats, cargo loading, and tire safety. Expert answers for optimal performance.',
  alternates: {
    canonical: 'https://ebikepsi.com/faq',
  },
  openGraph: {
    title: 'E-Bike Tire Pressure FAQ | Expert Answers to Common PSI Questions (2026)',
    description: 'Frequently asked questions about e-bike tire pressure, PSI recommendations, pinch flats, cargo loading, and tire safety.',
    type: 'website',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What PSI should I run on my e-bike?',
    answer:
      'It depends on your tire size, rider weight, cargo, and terrain. Most e-bikes run 20-50 PSI. Fat tires (3.0"+) typically use 20-30 PSI, while standard tires (2.0-2.5") use 35-50 PSI. Use our calculator to get personalized recommendations for your specific setup.',
  },
  {
    question: 'Can I go below my tire\'s minimum PSI for sand or snow?',
    answer:
      'Never go below the tire sidewall minimum (usually printed as "Min PSI"). Going lower risks rim damage, tire rolling off the bead, and voiding your warranty. For sand/snow, use the minimum PSI or switch to wider tires that allow lower pressure safely.',
  },
  {
    question: 'How much should I increase PSI when carrying cargo?',
    answer:
      'Add approximately 1 PSI rear per 20 lbs of cargo. For heavy loads (60+ lbs), also increase front by 1-2 PSI for stability. Example: 40 lbs rear cargo = +2 PSI rear. Always check you don\'t exceed tire sidewall maximum.',
  },
  {
    question: 'What about passengers on cargo bikes?',
    answer:
      'Passengers add 100% of their weight to the rear tire. For an 80 lb child, add 3 PSI rear. For a 120 lb adult, add 4-5 PSI rear and 1 PSI front for balance. Verify you\'re within tire limits before riding.',
  },
  {
    question: 'Does tubeless let me run lower PSI?',
    answer:
      'Yes, tubeless eliminates pinch flat risk, allowing 1-3 PSI lower than tubed tires. Fat tires can drop 2 PSI, standard tires can drop 3 PSI. Tubeless also self-seals small punctures with sealant, reducing flat frequency.',
  },
  {
    question: 'How often should I check my tire pressure?',
    answer:
      'Weekly for regular riders, before every ride for cargo/passenger use. Fat tires lose 1-2 PSI per week naturally. Temperature changes also affect pressure (1 PSI per 10°F change). Always check "cold" (before riding).',
  },
  {
    question: 'Why is my rear tire pressure higher than front?',
    answer:
      'E-bikes have rear weight bias from motor, battery, and cargo racks. Most setups require 3-5 PSI more in the rear for balanced handling. This prevents rear tire squirm and improves braking stability.',
  },
  {
    question: 'What\'s the risk of running PSI too low?',
    answer:
      'Low PSI increases pinch flat risk (tube gets pinched between tire and rim on impacts), causes tire squirm in corners, damages rims on rough terrain, and reduces efficiency. Stay above tire minimum and adjust for your weight.',
  },
  {
    question: 'What\'s the risk of running PSI too high?',
    answer:
      'High PSI creates harsh ride quality, reduces traction (especially on loose surfaces), increases vibration fatigue, and can damage tire casing. Never exceed tire sidewall maximum—this risks blowouts.',
  },
  {
    question: 'Can I use a gas station air pump for my e-bike?',
    answer:
      'Not recommended. Gas station pumps are designed for car tires (30-35 PSI) and are often inaccurate at e-bike pressures. Use a floor pump with accurate gauge or a digital gauge. For fat tires (< 30 PSI), gas station gauges are especially unreliable.',
  },
  {
    question: 'How does terrain affect tire pressure?',
    answer:
      'Drop PSI for softer terrain: pavement (baseline), mixed/gravel (-10%), dirt trails (-12%), sand/snow (-25%). Lower pressure increases traction and comfort but reduces efficiency. Always stay above tire minimum.',
  },
  {
    question: 'Should I adjust PSI for temperature changes?',
    answer:
      'Yes. Tire pressure changes ~1 PSI per 10°F temperature change. In winter, inflate 2-3 PSI higher to compensate for cold. In summer, start 1 PSI lower as pressure increases during riding. Always check when cold.',
  },
  {
    question: 'What if my calculated PSI exceeds my tire\'s maximum?',
    answer:
      'Never exceed tire sidewall maximum—this is a safety limit. If our calculator recommends more than your tire allows, you need higher-rated tires or must reduce cargo/passenger weight. Tire failure at high pressure is dangerous.',
  },
  {
    question: 'Why do fat tires use such low PSI?',
    answer:
      'Fat tires have large air volume, so lower PSI still provides adequate support. Wide contact patch at low pressure improves traction on soft surfaces (sand, snow) and provides cushioning. Most fat tires are rated 20-30 PSI maximum.',
  },
  {
    question: 'How accurate does my pressure gauge need to be?',
    answer:
      'For best results, use a gauge accurate to ±0.5 PSI. Digital gauges are most accurate. Cheap analog gauges can be off by 3-5 PSI. For fat tires at low PSI, accuracy matters more—2 PSI error is 10% at 20 PSI.',
  },
];

export default function FAQPage() {
  const baseUrl = getBaseUrl();
  
  // Generate FAQPage JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Generate BreadcrumbList schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'FAQ', url: `${baseUrl}/faq` },
  ]);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-white to-surface-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4 bg-gradient-to-r from-text via-brand-600 to-text bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted font-medium">
              Common questions about e-bike tire pressure, safety, and
              optimization.
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-line p-6 shadow-card"
              >
                <h2 className="font-heading text-xl font-semibold text-text mb-3">
                  {faq.question}
                </h2>
                <p className="text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-brand/5 to-brand/10 rounded-lg border border-brand/20 text-center">
            <h2 className="font-heading text-2xl font-semibold text-text mb-3">
              Get Personalized PSI Recommendations
            </h2>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              Our calculator accounts for your specific bike, weight, cargo, and
              terrain to give you precise front and rear PSI targets.
            </p>
            <a
              href="/calculate"
              className="inline-block px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-hover"
            >
              Open Calculator
            </a>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-8 border-t border-line text-center">
            <p className="text-muted">
              Still have questions?{' '}
              <a
                href="mailto:support@ebikepsi.com"
                className="text-brand hover:underline font-medium"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

