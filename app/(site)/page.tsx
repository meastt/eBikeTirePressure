import type { Metadata } from "next";
import Link from "next/link";
import type { ModelPreset } from "@/lib/types";
import modelsData from "@/data/models.json";

const models = modelsData as ModelPreset[];

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

      <section className="text-center mb-16">
        <Link
          href="/calculate"
          className="inline-block px-8 py-4 bg-brand text-white text-lg font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-card"
        >
          Start Calculating
        </Link>
      </section>

      {/* Featured E-Bike Models Section - Internal Links for SEO */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-text mb-6 text-center">
          Popular E-Bike Tire Pressure Guides
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/models/rad-power-radrunner-plus"
            className="group p-6 bg-white rounded-2xl shadow-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
          >
            <h3 className="text-lg font-bold text-text group-hover:text-brand mb-2">
              Rad Power RadRunner Plus
            </h3>
            <p className="text-sm text-muted mb-3">
              20x3.3&quot; tires • 20-30 PSI range • Complete pressure guide for this popular utility e-bike
            </p>
            <span className="text-sm text-brand font-medium group-hover:underline">
              View PSI Calculator →
            </span>
          </Link>

          <Link
            href="/models/aventon-aventure-2"
            className="group p-6 bg-white rounded-2xl shadow-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
          >
            <h3 className="text-lg font-bold text-text group-hover:text-brand mb-2">
              Aventon Aventure.2
            </h3>
            <p className="text-sm text-muted mb-3">
              26x4.0&quot; fat tires • 15-25 PSI range • Tire pressure recommendations for fat tire adventures
            </p>
            <span className="text-sm text-brand font-medium group-hover:underline">
              View PSI Calculator →
            </span>
          </Link>

          <Link
            href="/models/tern-gsd-s10"
            className="group p-6 bg-white rounded-2xl shadow-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
          >
            <h3 className="text-lg font-bold text-text group-hover:text-brand mb-2">
              Tern GSD S10 Cargo
            </h3>
            <p className="text-sm text-muted mb-3">
              20x2.4&quot; reinforced • 35-50 PSI range • Cargo-specific pressure calculations with load distribution
            </p>
            <span className="text-sm text-brand font-medium group-hover:underline">
              View PSI Calculator →
            </span>
          </Link>

          <Link
            href="/models/lectric-xp-3"
            className="group p-6 bg-white rounded-2xl shadow-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
          >
            <h3 className="text-lg font-bold text-text group-hover:text-brand mb-2">
              Lectric XP 3.0
            </h3>
            <p className="text-sm text-muted mb-3">
              20x3.0&quot; tires • 20-30 PSI range • Folding e-bike tire pressure optimization guide
            </p>
            <span className="text-sm text-brand font-medium group-hover:underline">
              View PSI Calculator →
            </span>
          </Link>

          <Link
            href="/models/trek-allant-plus-7"
            className="group p-6 bg-white rounded-2xl shadow-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
          >
            <h3 className="text-lg font-bold text-text group-hover:text-brand mb-2">
              Trek Allant+ 7
            </h3>
            <p className="text-sm text-muted mb-3">
              27.5x2.4&quot; tires • 30-50 PSI range • Commuter e-bike tire pressure recommendations
            </p>
            <span className="text-sm text-brand font-medium group-hover:underline">
              View PSI Calculator →
            </span>
          </Link>

          <Link
            href="/ebike-tire-pressure"
            className="group p-6 bg-brand-50 rounded-2xl shadow-card hover:shadow-lg transition-shadow border-2 border-brand-200 hover:border-brand flex items-center justify-center"
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-brand mb-2">
                View All {models.length} Models
              </h3>
              <span className="text-sm text-brand-dark font-medium group-hover:underline">
                Browse Complete Guide →
              </span>
            </div>
          </Link>
        </div>
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
