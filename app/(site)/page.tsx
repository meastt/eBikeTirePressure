import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { ModelPreset } from "@/lib/types";
import { generateFAQSchema } from "@/lib/schema";
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
  // Key FAQs for homepage
  const homepageFAQs = [
    {
      question: "What PSI should I run on my e-bike?",
      answer: "It depends on your tire size, rider weight, cargo, and terrain. Most e-bikes run 20-50 PSI. Fat tires (3.0\"+) typically use 20-30 PSI, while standard tires (2.0-2.5\") use 35-50 PSI. Use our calculator to get personalized recommendations for your specific setup.",
    },
    {
      question: "How do I calculate the right tire pressure for my e-bike?",
      answer: "Use our free calculator! Select your bike model (or enter tire size), set your rider weight, cargo weight, and choose your terrain type. The calculator accounts for bike weight, load distribution, and tire construction to give you precise front and rear PSI recommendations.",
    },
    {
      question: "Should I adjust tire pressure for different terrain?",
      answer: "Yes! Lower your tire pressure by 8-15% for mixed terrain and gravel, and up to 30% for soft surfaces like sand or snow. This increases traction and comfort. Always stay above your tire's minimum PSI (marked on the sidewall).",
    },
    {
      question: "What happens if I run my tire pressure too low or too high?",
      answer: "Too low: Increases pinch flat risk, causes tire squirm, damages rims, and reduces efficiency. Too high: Creates harsh ride quality, reduces traction (especially on loose surfaces), and can damage tire casing. Never exceed the tire sidewall maximum—this risks blowouts.",
    },
  ];

  const faqSchema = generateFAQSchema(homepageFAQs);

  return (
    <>
      {/* Homepage FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <div>
      {/* Hero Section with Clean Gradient */}
      <section className="relative bg-gradient-to-br from-white via-surface-light to-white py-24 sm:py-32 px-4 overflow-hidden">
        {/* Decorative background elements - very subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        </div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="mb-8 bg-gradient-to-r from-text via-brand-600 to-text bg-clip-text text-transparent">
            Stop Guessing Your Tire Pressure
          </h1>
          <div className="max-w-3xl mx-auto mb-12">
            <ul className="text-left text-lg sm:text-xl text-muted space-y-3 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-brand text-2xl flex-shrink-0 leading-none mt-0.5">✓</span>
                <span>Get the perfect PSI based on your exact weight, cargo, and terrain</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand text-2xl flex-shrink-0 leading-none mt-0.5">✓</span>
                <span>Avoid pinch flats and blowouts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand text-2xl flex-shrink-0 leading-none mt-0.5">✓</span>
                <span>Eliminate poor handling and optimize ride quality</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/calculate"
              className="px-12 py-4.5 bg-gradient-brand text-white font-semibold rounded-xl hover:shadow-glow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-out text-lg shadow-lg"
            >
              Find My PSI →
            </Link>
            <small className="text-muted text-sm mb-2 font-medium">Free for all e-bike models</small>
            <Link
              href="#popular-bikes"
              className="text-brand-600 hover:text-brand-700 font-semibold text-sm transition-all duration-200 flex items-center gap-2 group"
            >
              Popular Bikes
              <span className="group-hover:translate-y-1 transition-transform duration-200">↓</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

      <section className="grid md:grid-cols-2 gap-4 md:gap-6 mb-20">
        <div className="group card card-hover p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-md">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-brand rounded-xl sm:rounded-2xl text-white shadow-lg group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 flex-shrink-0">
              <Image src="/icons/precision.svg" alt="Precision icon" width={28} height={28} className="brightness-0 invert w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-text flex-1 leading-tight">Load-Aware Math</h2>
          </div>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            Accounts for rider, cargo, and terrain. No guesswork.
          </p>
        </div>

        <div className="group card card-hover p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-md">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-purple rounded-xl sm:rounded-2xl text-white shadow-lg group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 flex-shrink-0">
              <Image src="/icons/presets.svg" alt="Presets icon" width={28} height={28} className="brightness-0 invert w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-text flex-1 leading-tight">Model Database</h2>
          </div>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            20+ presets with verified specs and tire data.
          </p>
        </div>

        <div className="group card card-hover p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-md">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-cyan rounded-xl sm:rounded-2xl text-white shadow-lg group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 flex-shrink-0">
              <Image src="/icons/safety.svg" alt="Safety icon" width={28} height={28} className="brightness-0 invert w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-text flex-1 leading-tight">Safety Checks</h2>
          </div>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            Live alerts for pinch-flat, sidewall max, and terrain risks.
          </p>
        </div>

        <div className="group card card-hover p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-md">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-accent rounded-xl sm:rounded-2xl text-white shadow-lg group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 flex-shrink-0">
              <Image src="/icons/trike.svg" alt="Trike icon" width={28} height={28} className="brightness-0 invert w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-text flex-1 leading-tight">Trike Support</h2>
          </div>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            Three-wheel load split with independent rear calculations.
          </p>
        </div>
      </section>

      {/* Popular Bikes Section */}
      <section id="popular-bikes" className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-text mb-4">
            Popular Bikes
          </h2>
          <p className="text-muted text-lg font-medium">Quick-start for the most popular e-bikes</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          {/* RadRunner Plus */}
          <Link
            href="/models/rad-power-radrunner-plus"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-brand group-hover:text-brand-600 transition-colors duration-150">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="36" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="18" width="32" height="2" rx="1" fill="currentColor"/>
                <rect x="6" y="12" width="36" height="2" rx="1" fill="currentColor"/>
                {/* Fat tires - wider */}
                <circle cx="12" cy="24" r="3" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="36" cy="24" r="3" stroke="currentColor" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              RadRunner Plus
            </h3>
            <p className="text-xs text-brand font-semibold mb-1">Fat Tire Cruiser</p>
            <p className="text-xs text-muted">
              20×3.3″
            </p>
          </Link>

          {/* Lectric XP 3 */}
          <Link
            href="/models/lectric-xp-3"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-brand group-hover:text-brand-600 transition-colors duration-150">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="36" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="18" width="32" height="2" rx="1" fill="currentColor"/>
                <rect x="6" y="12" width="36" height="2" rx="1" fill="currentColor"/>
                {/* Fat tires - wider */}
                <circle cx="12" cy="24" r="3" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="36" cy="24" r="3" stroke="currentColor" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              Lectric XP 3
            </h3>
            <p className="text-xs text-brand font-semibold mb-1">Fat Tire Cruiser</p>
            <p className="text-xs text-muted">
              20×3.0″
            </p>
          </Link>

          {/* Aventon Aventure 2 */}
          <Link
            href="/models/aventon-aventure-2"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-brand group-hover:text-brand-600 transition-colors duration-150">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="36" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="18" width="32" height="2" rx="1" fill="currentColor"/>
                <rect x="6" y="12" width="36" height="2" rx="1" fill="currentColor"/>
                {/* Fat tires - wider */}
                <circle cx="12" cy="24" r="3" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="36" cy="24" r="3" stroke="currentColor" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              Aventon Aventure
            </h3>
            <p className="text-xs text-brand font-semibold mb-1">Fat Tire Explorer</p>
            <p className="text-xs text-muted">
              26×4.0″
            </p>
          </Link>

          {/* Tern GSD */}
          <Link
            href="/models/tern-gsd-s10"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-brand group-hover:text-brand-600 transition-colors duration-150">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="36" cy="24" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="18" width="32" height="2" rx="1" fill="currentColor"/>
                <rect x="6" y="12" width="36" height="2" rx="1" fill="currentColor"/>
                {/* Cargo rack */}
                <rect x="18" y="8" width="12" height="2" rx="1" fill="currentColor"/>
                <rect x="20" y="6" width="8" height="2" rx="1" fill="currentColor"/>
                <rect x="22" y="4" width="4" height="2" rx="1" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              Tern GSD
            </h3>
            <p className="text-xs text-brand font-semibold mb-1">Compact Cargo</p>
            <p className="text-xs text-muted">
              20×2.4″
            </p>
          </Link>

          {/* RadWagon 4 */}
          <Link
            href="/models/rad-power-radwagon-4"
            className="group card card-hover p-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-brand group-hover:text-brand-600 transition-colors duration-150">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="36" cy="24" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="18" width="32" height="2" rx="1" fill="currentColor"/>
                <rect x="6" y="12" width="36" height="2" rx="1" fill="currentColor"/>
                {/* Cargo rack */}
                <rect x="18" y="8" width="12" height="2" rx="1" fill="currentColor"/>
                <rect x="20" y="6" width="8" height="2" rx="1" fill="currentColor"/>
                <rect x="22" y="4" width="4" height="2" rx="1" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-sm font-heading font-semibold text-text group-hover:text-brand mb-1 transition-colors duration-150">
              RadWagon 4
            </h3>
            <p className="text-xs text-brand font-semibold mb-1">Electric Cargo</p>
            <p className="text-xs text-muted">
              22×3.0″
            </p>
          </Link>

          {/* All Models Card */}
          <Link
            href="/ebike-tire-pressure"
            className="group card card-hover p-6 bg-gradient-brand flex flex-col items-center justify-center text-center shadow-lg hover:shadow-glow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
              +
            </div>
            <h3 className="text-base font-heading font-bold text-white mb-1">
              All {models.length} Models
            </h3>
            <p className="text-sm text-white/90">
              Browse Database
            </p>
          </Link>
        </div>
      </section>

      </div>

      <section className="bg-gradient-to-br from-slate-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-heading font-bold text-text mb-10 text-center">How It Works</h2>
        <ol className="space-y-6 text-muted">
          <li className="flex gap-5 items-start">
            <span className="flex-shrink-0 w-12 h-12 bg-gradient-brand text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
              1
            </span>
            <span className="leading-relaxed text-base pt-2">
              Pick your bike or enter tire size
            </span>
          </li>
          <li className="flex gap-5 items-start">
            <span className="flex-shrink-0 w-12 h-12 bg-gradient-brand text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
              2
            </span>
            <span className="leading-relaxed text-base pt-2">
              Set rider, passenger, and cargo weights
            </span>
          </li>
          <li className="flex gap-5 items-start">
            <span className="flex-shrink-0 w-12 h-12 bg-gradient-brand text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
              3
            </span>
            <span className="leading-relaxed text-base pt-2">
              Select surface type and tire construction
            </span>
          </li>
          <li className="flex gap-5 items-start">
            <span className="flex-shrink-0 w-12 h-12 bg-gradient-brand text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
              4
            </span>
            <span className="leading-relaxed text-base pt-2">
              Get min / target / max PSI with safety checks
            </span>
          </li>
        </ol>
        </div>
      </section>
    </div>
    </>
  );
}
