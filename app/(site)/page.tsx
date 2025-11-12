import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-Bike Tire Pressure Calculator | Professional PSI Recommendations",
  description:
    "Calculate optimal tire pressure for your e-bike based on rider weight, cargo, and terrain. Supports 20+ popular models with real-time PSI calculations and safety warnings.",
  openGraph: {
    title: "E-Bike Tire Pressure Calculator",
    description: "Professional PSI recommendations for fat tire, cargo, and standard e-bikes.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text mb-4 tracking-tight">
          E-Bike Tire Pressure Calculator
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Get professional tire pressure recommendations for your e-bike based on rider weight,
          cargo, terrain, and your specific bike model.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-2xl font-bold text-text mb-3">Precision PSI</h2>
          <p className="text-muted">
            Our calculator accounts for bike weight, rider weight, passenger, cargo distribution,
            terrain type, and tire construction to give you exact min/target/max PSI values.
          </p>
        </div>

        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-2xl font-bold text-text mb-3">Model Presets</h2>
          <p className="text-muted">
            Choose from popular e-bike models with pre-loaded specs, or use our size-based
            calculator for custom builds.
          </p>
        </div>

        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-2xl font-bold text-text mb-3">Safety First</h2>
          <p className="text-muted">
            Get warnings for pinch-flat risk, sidewall limits, and terrain-specific concerns.
            Built with mechanic-grade precision.
          </p>
        </div>

        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-2xl font-bold text-text mb-3">Trike Support</h2>
          <p className="text-muted">
            Toggle trike mode for proper three-wheel load distribution with independent rear tire
            calculations.
          </p>
        </div>
      </section>

      <section className="text-center">
        <Link
          href="/calculate"
          className="inline-block px-8 py-4 bg-brand text-white text-lg font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-card"
        >
          Start Calculating
        </Link>
      </section>

      <section className="mt-16 border-t border-line pt-8">
        <h2 className="text-2xl font-bold text-text mb-4">How It Works</h2>
        <ol className="space-y-4 text-muted">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <span>
              Select your e-bike model from our database or enter tire size for custom builds.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <span>
              Input your weight, any passenger or cargo, and select your typical riding surface.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <span>
              Choose tire construction (tubed, tubeless, or reinforced) and enable trike mode if
              applicable.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
              4
            </span>
            <span>
              Get instant min/target/max PSI for front and rear tires with visual safety bands and
              warnings.
            </span>
          </li>
        </ol>
      </section>
    </div>
  );
}
