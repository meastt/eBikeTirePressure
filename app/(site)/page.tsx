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
      {/* Hero Section - BOLD & ENERGETIC */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-500 to-purple-600 py-24 sm:py-32 px-4 overflow-hidden">
        {/* Decorative background elements - MORE DYNAMIC */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-400/30 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent-400/40 rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-300/30 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>

          {/* Tire pressure gauge visual */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" fill="none" strokeDasharray="5,5"/>
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M50,50 L50,20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-semibold shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ok-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ok-300"></span>
              </span>
              Free forever • No signup required
            </div>
          </div>

          <div className="text-center">
            <h1 className="mb-6 text-white text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-none">
              The Only PSI Calculator<br />
              <span className="bg-gradient-to-r from-accent-300 via-accent-200 to-yellow-200 bg-clip-text text-transparent">
                That Does the Math Right
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
              Stop using generic pressure charts. Get precise PSI based on <span className="font-bold text-accent-200">your exact load</span>, <span className="font-bold text-accent-200">terrain</span>, and <span className="font-bold text-accent-200">tire specs</span>.
              Say goodbye to pinch flats and sketchy handling.
            </p>

            {/* Value Props Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                ⚡ Real-time safety checks
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                🎯 Load-aware calculations
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                🚴 20+ bike presets
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                href="/calculate"
                className="group relative px-12 py-5 bg-white text-brand-600 font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-out text-xl shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Calculate My PSI →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-200/20 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="#why-different"
                className="text-white hover:text-accent-200 font-semibold text-lg transition-colors duration-200 flex items-center gap-2 group underline decoration-white/50 hover:decoration-accent-200"
              >
                Why we&apos;re different
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>

            <p className="text-white/80 text-sm font-medium">
              100% free • No signup • Works on all bikes
            </p>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section id="why-different" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-brand-900 to-purple-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent-500/20 text-accent-300 rounded-full text-sm font-bold mb-6 border border-accent-500/30">
              THE PROBLEM WITH OTHER CALCULATORS
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-6">
              They&apos;re Guessing.<br />We&apos;re Not.
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Most calculators give you a single number based on tire size. That&apos;s like recommending shoes based only on foot length.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Problem */}
            <div className="relative p-8 bg-danger-950/40 border-2 border-danger-500/30 rounded-3xl backdrop-blur-sm">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-danger-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                ✗
              </div>
              <h3 className="text-2xl font-heading font-bold text-danger-200 mb-4 mt-4">Generic Calculators</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-danger-400 text-xl">→</span>
                  <span>Ignore rider weight completely</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-danger-400 text-xl">→</span>
                  <span>Don&apos;t factor in cargo loads</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-danger-400 text-xl">→</span>
                  <span>One-size-fits-all for all terrains</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-danger-400 text-xl">→</span>
                  <span>No safety warnings for extreme cases</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="relative p-8 bg-ok-950/40 border-2 border-ok-400/50 rounded-3xl backdrop-blur-sm shadow-lg shadow-ok-500/20">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-ok-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                ✓
              </div>
              <h3 className="text-2xl font-heading font-bold text-ok-200 mb-4 mt-4">Our Calculator</h3>
              <ul className="space-y-3 text-slate-200 font-medium">
                <li className="flex gap-3">
                  <span className="text-ok-300 text-xl">→</span>
                  <span>Factors total load (rider + cargo + passenger)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ok-300 text-xl">→</span>
                  <span>Adjusts for terrain type (pavement, gravel, sand)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ok-300 text-xl">→</span>
                  <span>Considers tire construction (tubeless, tube, insert)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ok-300 text-xl">→</span>
                  <span>Real-time safety checks & warnings</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/calculate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-glow-accent hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Try the Smart Calculator
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 max-w-6xl">

      {/* Features with PERSONALITY */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-heading font-extrabold text-text mb-4">
          Features That Actually Matter
        </h2>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          No fluff. Just the stuff that keeps your tires (and you) on the road.
        </p>
      </div>

      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="group card card-hover p-10 bg-gradient-to-br from-white to-brand-50/30 border-2 border-brand-100 hover:border-brand-300">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-brand rounded-3xl text-white shadow-xl group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Image src="/icons/precision.svg" alt="" width={32} height={32} className="brightness-0 invert" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-heading font-extrabold text-text mb-2 leading-tight">Load-Aware Math</h3>
              <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold">PHYSICS-BASED</span>
            </div>
          </div>
          <p className="text-text text-lg leading-relaxed mb-4">
            We calculate pressure distribution across your tires based on <span className="font-bold text-brand-600">actual load</span>. Hauling 50 lbs of groceries? We&apos;ve got you.
          </p>
          <p className="text-muted text-sm italic">
            Because &quot;just add 5 PSI&quot; isn&apos;t a methodology.
          </p>
        </div>

        <div className="group card card-hover p-10 bg-gradient-to-br from-white to-purple-50/30 border-2 border-purple-100 hover:border-purple-300">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl text-white shadow-xl group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Image src="/icons/presets.svg" alt="" width={32} height={32} className="brightness-0 invert" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-heading font-extrabold text-text mb-2 leading-tight">20+ Bike Presets</h3>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">VERIFIED DATA</span>
            </div>
          </div>
          <p className="text-text text-lg leading-relaxed mb-4">
            Rad Power, Lectric, Aventon, Tern, and more. We&apos;ve got <span className="font-bold text-purple-600">actual tire specs</span> from manufacturer data sheets.
          </p>
          <p className="text-muted text-sm italic">
            No more squinting at sidewall markings in your garage.
          </p>
        </div>

        <div className="group card card-hover p-10 bg-gradient-to-br from-white to-ok-50/30 border-2 border-ok-100 hover:border-ok-300">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-ok-500 to-ok-600 rounded-3xl text-white shadow-xl group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Image src="/icons/safety.svg" alt="" width={32} height={32} className="brightness-0 invert" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-heading font-extrabold text-text mb-2 leading-tight">Real-Time Safety Checks</h3>
              <span className="inline-block px-3 py-1 bg-ok-100 text-ok-700 rounded-full text-xs font-bold">LIVE WARNINGS</span>
            </div>
          </div>
          <p className="text-text text-lg leading-relaxed mb-4">
            Running too low? We&apos;ll warn you about <span className="font-bold text-ok-600">pinch flats</span>. Too high? We&apos;ll flag <span className="font-bold text-ok-600">blowout risk</span>. It&apos;s like having a mechanic in your pocket.
          </p>
          <p className="text-muted text-sm italic">
            Your sidewalls will thank you.
          </p>
        </div>

        <div className="group card card-hover p-10 bg-gradient-to-br from-white to-accent-50/30 border-2 border-accent-100 hover:border-accent-300">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-accent rounded-3xl text-white shadow-xl group-hover:shadow-glow-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Image src="/icons/trike.svg" alt="" width={32} height={32} className="brightness-0 invert" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-heading font-extrabold text-text mb-2 leading-tight">Trike Support</h3>
              <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-bold">3-WHEEL MATH</span>
            </div>
          </div>
          <p className="text-text text-lg leading-relaxed mb-4">
            Three wheels? No problem. We calculate <span className="font-bold text-accent-600">independent rear pressures</span> based on actual weight distribution.
          </p>
          <p className="text-muted text-sm italic">
            Because trikes deserve love too.
          </p>
        </div>
      </section>

      {/* Popular Bikes Section */}
      <section id="popular-bikes" className="mb-24">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-bold mb-4">
            QUICK START
          </span>
          <h2 className="text-4xl font-heading font-extrabold text-text mb-4">
            Got One of These? You&apos;re 10 Seconds Away.
          </h2>
          <p className="text-xl text-muted font-medium max-w-2xl mx-auto">
            We&apos;ve pre-loaded specs for the most popular e-bikes. Just click and go.
          </p>
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

      <section className="bg-gradient-to-br from-brand-50 via-purple-50/40 to-accent-50/30 py-20 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-200 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm text-brand-700 rounded-full text-sm font-bold mb-4 shadow-sm">
              SIMPLE AS THAT
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-text mb-4">
              Four Steps to Perfect PSI
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              No PhD required. Just honest answers and honest math.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-100 hover:border-brand-300">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-brand text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                1
              </div>
              <h3 className="text-2xl font-heading font-bold text-text mb-3 mt-4">Pick Your Ride</h3>
              <p className="text-lg text-muted leading-relaxed">
                Choose from 20+ presets or manually enter your tire size. Either way, we&apos;ve got the specs.
              </p>
            </div>

            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                2
              </div>
              <h3 className="text-2xl font-heading font-bold text-text mb-3 mt-4">Tell Us the Load</h3>
              <p className="text-lg text-muted leading-relaxed">
                Your weight, any passengers, cargo bags, groceries—everything that&apos;s riding along.
              </p>
            </div>

            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-ok-100 hover:border-ok-300">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-ok-500 to-ok-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                3
              </div>
              <h3 className="text-2xl font-heading font-bold text-text mb-3 mt-4">Choose Your Terrain</h3>
              <p className="text-lg text-muted leading-relaxed">
                Pavement? Gravel? Beach sand? Each surface needs different pressure. We&apos;ll dial it in.
              </p>
            </div>

            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-accent-100 hover:border-accent-300">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-accent text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                4
              </div>
              <h3 className="text-2xl font-heading font-bold text-text mb-3 mt-4">Get Smart PSI</h3>
              <p className="text-lg text-muted leading-relaxed">
                See your min/target/max pressure with live safety warnings. Screenshot it, pump it, ride it.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/calculate"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-brand text-white font-bold rounded-2xl hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300 text-xl shadow-xl"
            >
              Let&apos;s Do This
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
