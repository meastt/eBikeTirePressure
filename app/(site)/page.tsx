import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <div>
      {/* Hero Section with Gradient */}
      <section className="bg-gradient-subtle py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text mb-4 tracking-tight">
            E-Bike Tire Pressure Calculator
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Load-aware PSI calculations for fat-tire, cargo, and trike e-bikes.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/calculate"
              className="px-8 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out text-lg"
            >
              Calculate PSI
            </Link>
            <Link
              href="/ebike-tire-pressure"
              className="px-8 py-3.5 bg-white text-text font-semibold rounded-lg border-2 border-slate-200 hover:border-brand hover:shadow-card transition-all duration-150 ease-out text-lg"
            >
              Browse Models
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="group card card-hover p-6">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg text-brand group-hover:text-brand-600 transition-colors duration-150">
              <Image src="/icons/precision.svg" alt="" width={20} height={20} />
            </div>
            <h2 className="text-xl font-heading font-semibold text-text flex-1">Load-Aware Math</h2>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Accounts for rider, cargo, and terrain. No guesswork.
          </p>
        </div>

        <div className="group card card-hover p-6">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg text-brand group-hover:text-brand-600 transition-colors duration-150">
              <Image src="/icons/presets.svg" alt="" width={20} height={20} />
            </div>
            <h2 className="text-xl font-heading font-semibold text-text flex-1">Model Database</h2>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            20+ presets with verified specs and tire data.
          </p>
        </div>

        <div className="group card card-hover p-6">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg text-brand group-hover:text-brand-600 transition-colors duration-150">
              <Image src="/icons/safety.svg" alt="" width={20} height={20} />
            </div>
            <h2 className="text-xl font-heading font-semibold text-text flex-1">Safety Checks</h2>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Live alerts for pinch-flat, sidewall max, and terrain risks.
          </p>
        </div>

        <div className="group card card-hover p-6">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-lg text-brand group-hover:text-brand-600 transition-colors duration-150">
              <Image src="/icons/trike.svg" alt="" width={20} height={20} />
            </div>
            <h2 className="text-xl font-heading font-semibold text-text flex-1">Trike Support</h2>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Three-wheel load split with independent rear calculations.
          </p>
        </div>
      </section>

      {/* Featured E-Bike Models Section - Internal Links for SEO */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-text mb-3 text-center">
          Common Models
        </h2>
        <p className="text-muted text-center mb-8">Quick-start for popular e-bikes</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/models/rad-power-radrunner-plus"
            className="group card card-hover p-6"
          >
            <h3 className="text-lg font-heading font-semibold text-text group-hover:text-brand mb-2 transition-colors duration-150">
              RadRunner Plus
            </h3>
            <p className="text-sm text-muted mb-3">
              20×3.3″ • 20–30 PSI
            </p>
            <span className="text-sm text-brand font-semibold group-hover:underline">
              Open Calculator →
            </span>
          </Link>

          <Link
            href="/models/aventon-aventure-2"
            className="group card card-hover p-6"
          >
            <h3 className="text-lg font-heading font-semibold text-text group-hover:text-brand mb-2 transition-colors duration-150">
              Aventon Aventure.2
            </h3>
            <p className="text-sm text-muted mb-3">
              26×4.0″ fat • 15–25 PSI
            </p>
            <span className="text-sm text-brand font-semibold group-hover:underline">
              Open Calculator →
            </span>
          </Link>

          <Link
            href="/models/tern-gsd-s10"
            className="group card card-hover p-6"
          >
            <h3 className="text-lg font-heading font-semibold text-text group-hover:text-brand mb-2 transition-colors duration-150">
              Tern GSD S10
            </h3>
            <p className="text-sm text-muted mb-3">
              20×2.4″ reinforced • 35–50 PSI
            </p>
            <span className="text-sm text-brand font-semibold group-hover:underline">
              Open Calculator →
            </span>
          </Link>

          <Link
            href="/models/lectric-xp-3"
            className="group card card-hover p-6"
          >
            <h3 className="text-lg font-heading font-semibold text-text group-hover:text-brand mb-2 transition-colors duration-150">
              Lectric XP 3.0
            </h3>
            <p className="text-sm text-muted mb-3">
              20×3.0″ • 20–30 PSI
            </p>
            <span className="text-sm text-brand font-semibold group-hover:underline">
              Open Calculator →
            </span>
          </Link>

          <Link
            href="/models/trek-allant-plus-7"
            className="group card card-hover p-6"
          >
            <h3 className="text-lg font-heading font-semibold text-text group-hover:text-brand mb-2 transition-colors duration-150">
              Trek Allant+ 7
            </h3>
            <p className="text-sm text-muted mb-3">
              27.5×2.4″ • 30–50 PSI
            </p>
            <span className="text-sm text-brand font-semibold group-hover:underline">
              Open Calculator →
            </span>
          </Link>

          <Link
            href="/ebike-tire-pressure"
            className="group card card-hover p-6 bg-gradient-to-br from-brand to-brand-600 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <h3 className="text-lg font-heading font-bold mb-2">
                All {models.length} Models
              </h3>
              <span className="text-sm font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-150">
                Browse Database →
              </span>
            </div>
          </Link>
        </div>
      </section>

      </div>

      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-heading font-bold text-text mb-6">How It Works</h2>
        <ol className="space-y-4 text-muted">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-semibold text-sm">
              1
            </span>
            <span className="leading-relaxed">
              Pick your bike or enter tire size
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-semibold text-sm">
              2
            </span>
            <span className="leading-relaxed">
              Set rider, passenger, and cargo weights
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-semibold text-sm">
              3
            </span>
            <span className="leading-relaxed">
              Select surface type and tire construction
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-semibold text-sm">
              4
            </span>
            <span className="leading-relaxed">
              Get min / target / max PSI with safety checks
            </span>
          </li>
        </ol>
        </div>
      </section>
    </div>
  );
}
