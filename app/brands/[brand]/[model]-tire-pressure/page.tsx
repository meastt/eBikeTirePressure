import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { enrichModels, findModelByBrandAndModelSlug } from '@/lib/modelUtils';
import { getBrandMetadata } from '@/lib/brandMetadata';
import { generateFAQSchema, type FAQItem } from '@/lib/schema';

const models = modelsData as ModelPreset[];

// Generate static pages for all model guides
export async function generateStaticParams() {
  const enriched = enrichModels(models);
  return enriched.map((model) => ({
    brand: model.brandSlug!,
    model: model.modelSlug!,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug, model: modelSlug } = await params;
  const model = findModelByBrandAndModelSlug(models, brandSlug, modelSlug);

  if (!model) {
    return {
      title: 'Model Not Found',
    };
  }

  const minPSI = model.stockTire.minPSI || 15;
  const maxPSI = model.stockTire.maxPSI || 30;
  const title = `${model.brand} ${model.model} Tire Pressure Guide | ${model.stockTire.size} PSI Chart`;
  const description = `Complete tire pressure guide for ${model.brand} ${model.model}. Weight-based PSI chart for ${model.stockTire.size} tires (${minPSI}-${maxPSI} PSI). Includes cargo, terrain, and temperature adjustments.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function ModelTirePressureGuidePage({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const model = findModelByBrandAndModelSlug(models, brandSlug, modelSlug);

  if (!model) {
    notFound();
  }

  const brandMetadata = getBrandMetadata(brandSlug);
  const minPSI = model.stockTire.minPSI || 15;
  const maxPSI = model.stockTire.maxPSI || 30;
  const tireSize = model.stockTire.size;

  // Determine tire category for contextual info
  const tireWidth = parseFloat(tireSize.split('x')[1] || '0');
  const isFatTire = tireWidth >= 3.0;
  const isCargo = model.bikeWeightLbs > 70 && model.axleBias.rear >= 0.58;

  // Calculate sample PSI values for different rider weights
  const calculatePSI = (riderLbs: number, adjustment: number = 0) => {
    const totalLoad = riderLbs + model.bikeWeightLbs;
    const baselinePSI = minPSI + ((maxPSI - minPSI) * (totalLoad / 400));
    return Math.max(minPSI, Math.min(maxPSI, Math.round(baselinePSI + adjustment)));
  };

  // FAQ schema
  const faqItems: FAQItem[] = [
    {
      question: `What PSI should I use for my ${model.brand} ${model.model}?`,
      answer: `For the ${model.brand} ${model.model} with ${tireSize} tires, recommended PSI ranges from ${minPSI} to ${maxPSI} PSI depending on rider weight. A 180 lb rider should start around ${calculatePSI(180)} PSI. Adjust based on terrain and cargo load.`,
    },
    {
      question: `What is the factory tire pressure for ${model.brand} ${model.model}?`,
      answer: `The ${model.model} comes with ${tireSize} tires rated for ${minPSI}-${maxPSI} PSI. This is the maximum safe range. Your optimal pressure within this range depends on total load (rider + cargo + bike weight) and riding surface.`,
    },
    {
      question: `How does rider weight affect tire pressure?`,
      answer: `Heavier riders need higher PSI to prevent pinch flats and tire squirm. For every 20 lbs of rider weight, add approximately 1-2 PSI within the ${minPSI}-${maxPSI} PSI safe range for ${tireSize} tires.`,
    },
    {
      question: `Should I adjust PSI for cargo or passengers?`,
      answer: `Yes. For the ${model.model}, add 2-4 PSI rear when carrying cargo or a passenger. The rear tire bears ${Math.round(model.axleBias.rear * 100)}% of the load, so it needs more pressure when loaded.`,
    },
    {
      question: `What PSI for pavement vs off-road?`,
      answer: `For pavement riding, use ${calculatePSI(180, 2)}-${maxPSI} PSI for efficiency. For trails or gravel, drop to ${minPSI}-${calculatePSI(180, -2)} PSI for better traction and comfort. ${isFatTire ? 'Fat tires excel at low pressure off-road.' : `Don't go below ${minPSI} PSI to avoid pinch flats.`}`,
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm flex flex-wrap items-center gap-2">
            <Link href="/brands" className="text-brand hover:underline">
              Brands
            </Link>
            <span className="text-muted">/</span>
            <Link href={`/brands/${brandSlug}`} className="text-brand hover:underline">
              {model.brand}
            </Link>
            <span className="text-muted">/</span>
            <span className="text-muted">{model.model}</span>
          </nav>

          {/* H1 - Model Name + Tire Pressure */}
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-6 leading-tight">
            {model.brand} {model.model} Tire Pressure Guide
          </h1>

          {/* Quick summary */}
          <div className="card p-6 bg-brand-50/50 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted mb-1">Tire Size</div>
                <div className="text-2xl font-bold text-text">{tireSize}</div>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">PSI Range</div>
                <div className="text-2xl font-bold text-text">{minPSI}-{maxPSI}</div>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Bike Weight</div>
                <div className="text-2xl font-bold text-text">{model.bikeWeightLbs} lbs</div>
              </div>
            </div>
          </div>

          {/* Weight-Based PSI Table */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              PSI by Rider Weight
            </h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Use this table as a starting point for your {model.brand} {model.model}. These values
              assume pavement riding with no cargo. Adjust for terrain and load (see sections below).
            </p>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-6 py-4 text-left text-sm font-bold text-text">
                        Rider Weight
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text">
                        Front PSI
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text">
                        Rear PSI
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text">
                        Feel
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[120, 140, 160, 180, 200, 220, 240, 260].map((weight) => {
                      const basePSI = calculatePSI(weight);
                      const frontPSI = Math.max(minPSI, Math.round(basePSI * model.axleBias.front / 0.5));
                      const rearPSI = Math.max(minPSI, Math.round(basePSI * model.axleBias.rear / 0.5));
                      const feel = basePSI < (minPSI + (maxPSI - minPSI) * 0.4) ? 'Soft' :
                                   basePSI < (minPSI + (maxPSI - minPSI) * 0.7) ? 'Balanced' : 'Firm';

                      return (
                        <tr key={weight} className="hover:bg-surface-light/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-text">{weight} lbs</td>
                          <td className="px-6 py-4 text-text">{frontPSI} PSI</td>
                          <td className="px-6 py-4 text-text">{rearPSI} PSI</td>
                          <td className="px-6 py-4 text-muted">{feel}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 card p-4 bg-amber-50 border-l-4 border-amber-500">
              <p className="text-sm text-amber-900">
                <span className="font-bold">Note:</span> These are baseline recommendations. Use our{' '}
                <Link href="/calculate" className="text-brand underline font-semibold">
                  calculator
                </Link>{' '}
                for precise PSI based on your exact weight, cargo, and terrain.
              </p>
            </div>
          </section>

          {/* Factory Tire Specs */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              Factory Tire Specifications
            </h2>
            <div className="card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-text mb-4">Stock Tire Size</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-muted">Tire Size:</span>
                      <span className="font-semibold text-text">{tireSize}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-muted">Min PSI:</span>
                      <span className="font-semibold text-text">{minPSI}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-muted">Max PSI:</span>
                      <span className="font-semibold text-text">{maxPSI}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted">Casing:</span>
                      <span className="font-semibold text-text capitalize">{model.stockTire.casing}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text mb-4">Weight Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-muted">Front Weight:</span>
                      <span className="font-semibold text-text">{Math.round(model.axleBias.front * 100)}%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-muted">Rear Weight:</span>
                      <span className="font-semibold text-text">{Math.round(model.axleBias.rear * 100)}%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted">Bike Weight:</span>
                      <span className="font-semibold text-text">{model.bikeWeightLbs} lbs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Terrain-Based PSI Adjustments */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              PSI by Terrain Type
            </h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Adjust your {model.model}&apos;s tire pressure based on where you ride. Lower pressure = more traction
              and comfort. Higher pressure = more efficiency and speed.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="text-2xl">🛣️</span>
                  Pavement / Bike Paths
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted">Recommended PSI:</span>
                    <span className="font-bold text-text">{calculatePSI(180, 2)}-{maxPSI}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Goal:</span>
                    <span className="text-text">Efficiency</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Higher pressure reduces rolling resistance on smooth surfaces. Aim for the upper end
                  of your weight range for maximum speed and battery efficiency.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="text-2xl">🌲</span>
                  Gravel / Packed Dirt
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted">Recommended PSI:</span>
                    <span className="font-bold text-text">{minPSI + 3}-{calculatePSI(180)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Goal:</span>
                    <span className="text-text">Balance</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Medium pressure balances traction with efficiency. Drop 3-5 PSI from pavement settings
                  for better grip on loose surfaces.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="text-2xl">⛰️</span>
                  Trails / Rocky Terrain
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted">Recommended PSI:</span>
                    <span className="font-bold text-text">{minPSI}-{minPSI + 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Goal:</span>
                    <span className="text-text">Traction</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Lower pressure lets tires conform to obstacles and provides cushioning over roots and
                  rocks. {isFatTire ? 'Fat tires excel here.' : 'Stay above ' + minPSI + ' PSI to prevent pinch flats.'}
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏖️</span>
                  Sand / Snow
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted">Recommended PSI:</span>
                    <span className="font-bold text-text">{minPSI}-{minPSI + 2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Goal:</span>
                    <span className="text-text">Flotation</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {isFatTire
                    ? 'Fat tires shine here. Run minimum PSI for maximum flotation and prevent sinking into soft surfaces.'
                    : 'These ' + tireSize + ' tires are not ideal for sand/snow. If riding these surfaces, stay near minimum PSI.'}
                </p>
              </div>
            </div>
          </section>

          {/* Cargo & Passenger Adjustments */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              Cargo & Passenger PSI Adjustments
            </h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              {isCargo
                ? `The ${model.model} is designed for cargo. The rear tire bears ${Math.round(model.axleBias.rear * 100)}% of total load, so proper PSI adjustment is critical for safety and performance.`
                : `When carrying cargo or a passenger on your ${model.model}, adjust PSI to prevent tire squirm and maintain handling.`}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6 bg-brand-50/30">
                <h3 className="text-lg font-bold text-text mb-4">Passenger (Child Seat or Rear Rack)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted mb-2">Adjustment:</div>
                    <div className="text-2xl font-bold text-brand">+3-5 PSI (rear)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Example:</div>
                    <div className="text-sm text-text">
                      180 lb rider + 40 lb child<br />
                      Front: {calculatePSI(180)} PSI → {calculatePSI(180)} PSI (same)<br />
                      Rear: {calculatePSI(180)} PSI → {calculatePSI(180) + 4} PSI
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-brand-50/30">
                <h3 className="text-lg font-bold text-text mb-4">Cargo (Panniers, Baskets, Trailers)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted mb-2">Adjustment:</div>
                    <div className="text-2xl font-bold text-brand">+2-4 PSI (rear)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Example:</div>
                    <div className="text-sm text-text">
                      180 lb rider + 30 lbs groceries<br />
                      Front: {calculatePSI(180)} PSI → {calculatePSI(180)} PSI<br />
                      Rear: {calculatePSI(180)} PSI → {calculatePSI(180) + 3} PSI
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 card p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-sm text-red-900">
                <span className="font-bold">Safety Warning:</span> Never exceed {maxPSI} PSI (tire sidewall max) even with heavy cargo.
                If you need more support, consider upgrading to reinforced tires or reducing load.
              </p>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              Common Tire Pressure Mistakes
            </h2>
            <div className="space-y-4">
              <div className="card p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-text mb-2">
                  ❌ Using the Same PSI as Your Riding Buddy
                </h3>
                <p className="text-muted leading-relaxed">
                  Optimal PSI depends on total load (rider + bike + cargo). A 150 lb rider and a 220 lb
                  rider on the same bike need different pressure. Always calculate based on YOUR weight.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-text mb-2">
                  ❌ Ignoring Terrain Differences
                </h3>
                <p className="text-muted leading-relaxed">
                  Pavement PSI will feel harsh off-road and cause poor traction. Trail PSI on pavement wastes
                  battery and risks pinch flats. Adjust for where you actually ride.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-text mb-2">
                  ❌ Setting Front and Rear to the Same PSI
                </h3>
                <p className="text-muted leading-relaxed">
                  The {model.model} has {Math.round(model.axleBias.front * 100)}% / {Math.round(model.axleBias.rear * 100)}% weight
                  distribution. Rear tire needs more pressure to handle the extra load and prevent squirm.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-text mb-2">
                  ❌ Only Checking PSI When Tires Look Low
                </h3>
                <p className="text-muted leading-relaxed">
                  Tires lose 1-2 PSI per month naturally. Check weekly, especially before long rides or
                  when carrying cargo. Use a quality digital gauge for accuracy.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-text mb-2">
                  ❌ Exceeding Sidewall Max PSI
                </h3>
                <p className="text-muted leading-relaxed">
                  The {maxPSI} PSI limit on {tireSize} tires is for safety. Going over risks blowouts, especially
                  in hot weather or rough terrain. Always stay within the {minPSI}-{maxPSI} PSI range.
                </p>
              </div>
            </div>
          </section>

          {/* CTA to Calculator */}
          <section className="mb-16">
            <div className="card bg-gradient-brand text-white p-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                Get Precise PSI for Your {model.brand} {model.model}
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Our calculator uses your exact weight, cargo load, terrain type, and temperature to
                generate precise front and rear PSI recommendations with real-time safety warnings.
              </p>
              <Link
                href="/calculate"
                className="inline-block px-10 py-5 bg-white text-brand-600 font-bold rounded-xl hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300 text-lg shadow-xl"
              >
                Open PSI Calculator →
              </Link>
              <p className="text-sm mt-6 opacity-75">
                100% free • No signup • Works on mobile
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details key={index} className="card p-6 group">
                  <summary className="font-bold text-text cursor-pointer list-none flex items-center justify-between group-hover:text-brand transition-colors">
                    <span>{item.question}</span>
                    <span className="text-brand text-xl group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <div className="mt-4 text-muted leading-relaxed border-t border-slate-200 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related Content */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/brands/${brandSlug}`} className="card card-hover p-6 bg-white">
                <h3 className="text-lg font-heading font-bold text-text mb-2">
                  🏷️ All {brandMetadata?.displayName || model.brand} Models
                </h3>
                <p className="text-muted text-sm">
                  See tire pressure guides for other {brandMetadata?.displayName || model.brand} e-bikes.
                </p>
              </Link>
              <Link href="/blog" className="card card-hover p-6 bg-white">
                <h3 className="text-lg font-heading font-bold text-text mb-2">
                  📚 PSI Guides & Tips
                </h3>
                <p className="text-muted text-sm">
                  Learn about weight effects, cargo adjustments, and optimization strategies.
                </p>
              </Link>
              <Link href="/faq" className="card card-hover p-6 bg-white">
                <h3 className="text-lg font-heading font-bold text-text mb-2">
                  ❓ Common Questions
                </h3>
                <p className="text-muted text-sm">
                  Answers to pinch flats, blowouts, temperature effects, and more.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
