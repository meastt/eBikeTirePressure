import Link from 'next/link';

interface CalculatorCTAProps {
  title?: string;
  subtitle?: string;
  modelSlug?: string;
}

export function CalculatorCTA({
  title = 'Get Precise PSI Recommendations',
  subtitle = 'Enter your weight and terrain for personalized tire pressure calculations.',
  modelSlug,
}: CalculatorCTAProps) {
  const href = modelSlug ? `/calculate?model=${modelSlug}` : '/calculate';

  return (
    <div className="bg-gradient-brand text-white p-8 md:p-10 rounded-2xl text-center shadow-elevated">
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{title}</h2>
      <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">{subtitle}</p>
      <Link
        href={href}
        className="inline-block px-8 py-4 bg-white text-brand-600 font-bold rounded-xl hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
      >
        Open PSI Calculator →
      </Link>
      <p className="text-sm mt-4 opacity-75">100% free • No signup • Works on mobile</p>
    </div>
  );
}
