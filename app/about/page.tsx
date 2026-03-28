import { Metadata } from 'next';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getBaseUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About E-Bike PSI | How Our Tire Pressure Calculator Works',
  description:
    'How E-Bike PSI calculates tire pressure for 152+ e-bike models. Our deterministic algorithm accounts for bike weight, rider load, terrain, and tire construction to give you safe, precise PSI recommendations.',
  alternates: {
    canonical: 'https://ebikepsi.com/about',
  },
  openGraph: {
    title: 'About E-Bike PSI | How Our Tire Pressure Calculator Works',
    description:
      'How we calculate tire pressure for 152+ e-bike models. Deterministic algorithm, manufacturer specs, physics-based methodology.',
    type: 'website',
  },
};

export default function AboutPage() {
  const baseUrl = getBaseUrl();
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'About', url: `${baseUrl}/about` },
  ]);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-white to-surface-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4 bg-gradient-to-r from-text via-brand-600 to-text bg-clip-text text-transparent">
              About E-Bike PSI
            </h1>
            <p className="text-lg text-muted font-medium">
              The engineering behind e-bike tire pressure calculations.
            </p>
          </div>

          {/* What is E-Bike PSI */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
              What is E-Bike PSI
            </h2>
            <div className="bg-white rounded-lg border border-line p-6 sm:p-8 shadow-card space-y-4 text-muted leading-relaxed">
              <p>
                E-Bike PSI is a tire pressure calculator built specifically for electric bicycles. We
                built it because generic bike tire charts fall short — they don't account for the
                extra weight of e-bike motors, batteries, and cargo systems that change the pressure
                math entirely.
              </p>
              <p>
                Our database covers 152 e-bike models across 45 brands. Each entry includes the
                stock tire size, manufacturer-specified PSI range, bike weight, and axle weight
                distribution. When you pick your bike, the calculator starts from real specs — not
                guesses.
              </p>
              <p>
                The tool gives you front and rear PSI targets (not a single number for both), a
                safe operating range, and warnings if your load pushes against tire limits. It
                takes about ten seconds.
              </p>
            </div>
          </section>

          {/* How the Calculator Works */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
              How the Calculator Works
            </h2>
            <div className="bg-white rounded-lg border border-line p-6 sm:p-8 shadow-card space-y-4 text-muted leading-relaxed">
              <p>
                The engine takes five inputs: your bike model, rider weight, passenger weight (if
                any), cargo split between front and rear racks, and terrain type. From there it
                runs through a deterministic pipeline.
              </p>
              <p>
                <strong className="text-text">Load distribution.</strong> We split total weight
                between front and rear axles using each bike's axle bias ratio. Rider weight
                distributes roughly 40% front / 60% rear for upright e-bike geometry. Passengers
                go 100% rear. Cargo goes where you put it — front rack or rear rack.
              </p>
              <p>
                <strong className="text-text">Surface factors.</strong> Pavement is the baseline.
                Mixed terrain drops PSI by 10%, dirt trails by 12%, and sand/snow by 25%. Softer
                surfaces need lower pressure to increase the contact patch for traction.
              </p>
              <p>
                <strong className="text-text">Construction adjustments.</strong> Tubed tires are
                the baseline. Tubeless setups subtract 1 PSI (they handle lower pressure without
                pinch flats). Reinforced tires add 2 PSI (stronger casing supports higher
                pressure).
              </p>
              <p>
                <strong className="text-text">Trike mode.</strong> For three-wheel e-bikes, the
                rear load splits equally between the two rear wheels. The engine recalculates per-
                wheel PSI accordingly.
              </p>
              <p>
                The final output is a min/target/max range for each axle, clamped to the tire's
                sidewall limits with a 2 PSI safety buffer on each side. We never recommend
                pressure outside the tire manufacturer's rated range.
              </p>
            </div>
          </section>

          {/* Our Data */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
              Our Data
            </h2>
            <div className="bg-white rounded-lg border border-line p-6 sm:p-8 shadow-card space-y-4 text-muted leading-relaxed">
              <p>
                We source tire specs and bike weights directly from manufacturer documentation —
                owner manuals, spec sheets, and product pages. When a manufacturer doesn't publish
                PSI limits, we apply conservative defaults based on tire size category (fat, plus,
                standard, or road).
              </p>
              <p>
                Current coverage: <strong className="text-text">152 models</strong> across{' '}
                <strong className="text-text">45 brands</strong>. We add new models regularly. If
                your bike isn't listed, you can enter custom tire size and bike weight to get a
                calculation.
              </p>
              <p>
                Each model record stores the stock tire size (e.g., 27.5×2.8"), min and max PSI,
                total bike weight in pounds, and the front/rear axle weight bias ratio. These
                values feed directly into the calculation engine.
              </p>
            </div>
          </section>

          {/* Why E-Bike Tire Pressure is Different */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
              Why E-Bike Tire Pressure is Different
            </h2>
            <div className="bg-white rounded-lg border border-line p-6 sm:p-8 shadow-card space-y-4 text-muted leading-relaxed">
              <p>
                A typical Class 2 e-bike weighs 55–75 lbs. Add a 180 lb rider, 20 lbs of cargo,
                and you're looking at 255–275 lbs total — nearly double what a conventional bike
                setup weighs. That weight change demands different tire pressure.
              </p>
              <p>
                Motor placement shifts weight distribution too. Hub motors concentrate weight at
                one axle. Mid-drive motors sit lower but still add 8–12 lbs at the bottom bracket.
                Both change how load distributes across front and rear tires compared to an analog
                bike.
              </p>
              <p>
                E-bikes also get used differently. Cargo e-bikes carry groceries, kids, tools.
                Commuters ride year-round in wet and cold conditions. Fat-tire e-bikes hit sand
                and snow. Each use case calls for a specific pressure range, and a generic 40 PSI
                recommendation doesn't cut it.
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
              Methodology
            </h2>
            <div className="bg-white rounded-lg border border-line p-6 sm:p-8 shadow-card space-y-4 text-muted leading-relaxed">
              <p>
                Our calculator is deterministic. Given the same inputs, it produces the same
                outputs every time — no machine learning, no black-box models, no training data.
                Just physics applied to tire mechanics.
              </p>
              <p>
                The core calculation estimates load per contact patch. A heavier rider or more
                cargo means more weight on the tire, which means you need higher pressure to
                maintain the correct tire deformation. We use tire volume coefficients (derived
                from tire width and diameter) to scale the pressure response — wider tires need
                less pressure per pound of load because they have more air volume.
              </p>
              <p>
                The math: baseline PSI plus load multiplied by a volume coefficient scaled by a
                constant. Surface factor is applied as a percentage reduction. Construction
                adjustment is a fixed PSI offset. The result gets clamped to sidewall limits with
                a ±15% operating range around the target.
              </p>
              <p>
                We built this to be transparent. If you want to verify a result, the logic is
                straightforward: distribute load, calculate base PSI from tire volume, apply
                surface and construction modifiers, clamp to safe limits. No magic numbers hiding
                behind a UI.
              </p>
            </div>
          </section>

          {/* Safety Disclaimer */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
              Safety Disclaimer
            </h2>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-6 sm:p-8 shadow-card space-y-4 text-muted leading-relaxed">
              <p className="font-semibold text-amber-800">
                Never exceed the maximum PSI printed on your tire sidewall.
              </p>
              <p>
                Tire sidewall ratings are safety limits set by the manufacturer. Exceeding them
                risks blowouts, loss of control, and serious injury. Our calculator enforces a 2
                PSI buffer below sidewall maximums as a safety margin.
              </p>
              <p>
                Our recommendations are starting points. Actual optimal pressure depends on riding
                style, specific trail conditions, tire wear, and personal preference for ride
                feel. Check your tires regularly, inspect for damage, and adjust within the safe
                range until the handling feels right to you.
              </p>
              <p>
                This tool provides general guidance for informational purposes. It does not
                replace manufacturer recommendations, professional bike fitting, or your own
                judgment as a rider.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 bg-gradient-to-br from-brand/5 to-brand/10 rounded-lg border border-brand/20 text-center">
            <h2 className="font-heading text-2xl font-semibold text-text mb-3">
              Try the Calculator
            </h2>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              Select your e-bike model, enter your weight and cargo, pick your terrain. Get front
              and rear PSI in seconds.
            </p>
            <a
              href="/calculate"
              className="inline-block px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-hover"
            >
              Open Calculator
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
