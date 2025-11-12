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
            Stop Guessing Your Tire Pressure
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Get the perfect PSI for your e-bike based on your exact weight, cargo, and terrain.
            Avoid pinch flats, blowouts, and poor handling.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/calculate"
              className="px-8 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out text-lg"
            >
              Find My PSI
            </Link>
            <small className="text-muted text-sm mb-2">Free for all e-bike models</small>
            <Link
              href="#popular-bikes"
              className="text-brand hover:text-brand-hover font-medium text-sm transition-colors duration-150"
            >
              Popular Bikes ↓
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

      {/* Popular Bikes Section */}
      <section id="popular-bikes" className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-text mb-3 text-center">
          Popular Bikes
        </h2>
        <p className="text-muted text-center mb-8">Quick-start for the most popular e-bikes</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          {/* RadRunner Plus */}
          <Link
            href="/models/rad-power-radrunner-plus"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-150">
              R
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              RadRunner Plus
            </h3>
            <p className="text-xs text-muted">
              20×3.3″
            </p>
          </Link>

          {/* Lectric XP 3 */}
          <Link
            href="/models/lectric-xp-3"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-150">
              L
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              Lectric XP 3
            </h3>
            <p className="text-xs text-muted">
              20×3.0″
            </p>
          </Link>

          {/* Aventon Aventure 2 */}
          <Link
            href="/models/aventon-aventure-2"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-150">
              A
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              Aventon Aventure
            </h3>
            <p className="text-xs text-muted">
              26×4.0″
            </p>
          </Link>

          {/* Tern GSD */}
          <Link
            href="/models/tern-gsd-s10"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-150">
              T
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              Tern GSD
            </h3>
            <p className="text-xs text-muted">
              20×2.4″
            </p>
          </Link>

          {/* RadWagon 4 */}
          <Link
            href="/models/rad-power-radwagon-4"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-150">
              W
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              RadWagon 4
            </h3>
            <p className="text-xs text-muted">
              22×3.0″
            </p>
          </Link>

          {/* All Models Card */}
          <Link
            href="/ebike-tire-pressure"
            className="group card card-hover p-4 bg-gradient-to-br from-brand to-brand-600 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-150">
              +
            </div>
            <h3 className="text-sm font-heading font-bold text-white mb-1">
              All {models.length} Models
            </h3>
            <p className="text-xs text-white/80">
              Browse Database
            </p>
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
