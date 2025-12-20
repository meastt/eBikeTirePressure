import type { Metadata } from "next";
import Link from "next/link";
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
      {/* Hero Section - Gauge-Inspired Precision Lab Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 py-24 sm:py-32 lg:py-40 px-4 overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-sky-300"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Gauge Rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-[600px] h-[600px]">
              {/* Outer ring - slow rotation */}
              <svg className="absolute inset-0 w-full h-full animate-gauge-spin opacity-20" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#0EA5E9" strokeWidth="0.5" strokeDasharray="4 4"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#06B6D4" strokeWidth="0.3" strokeDasharray="8 8"/>
              </svg>
              {/* Inner ring - reverse rotation */}
              <svg className="absolute inset-0 w-full h-full opacity-15" style={{animation: 'gauge-spin 30s linear infinite reverse'}} viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="70" fill="none" stroke="#F97316" strokeWidth="0.5" strokeDasharray="2 6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Technical Typography */}
            <div className="text-left space-y-8 animate-slide-in-right">
              <div className="inline-block px-4 py-2 bg-brand/10 border border-brand/30 rounded-lg backdrop-blur-sm">
                <span className="font-mono text-sm text-brand-300 tracking-wider">PRECISION_CALCULATOR_v2.0</span>
              </div>

              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-white drop-shadow-2xl">
                ENGINEERED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500">
                  PRECISION
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300 font-heading font-medium leading-relaxed max-w-xl">
                Laboratory-grade tire pressure calculations.
                <br />
                <span className="text-slate-400">Stop guessing. Start measuring.</span>
              </p>

              {/* Technical Specs List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand to-cyan-500 flex items-center justify-center shadow-glow">
                    <span className="font-mono font-bold text-white text-lg">Δ</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-sm">Load-Aware Algorithm</div>
                    <div className="text-slate-400 text-sm">Dynamic PSI adjustment for rider + cargo + terrain</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center shadow-glow-accent">
                    <span className="font-mono font-bold text-white text-lg">⚠</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-sm">Real-Time Safety Checks</div>
                    <div className="text-slate-400 text-sm">Pinch flat warnings • Blowout prevention • Terrain risk analysis</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="font-mono font-bold text-white text-lg">20+</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-sm">Verified E-Bike Database</div>
                    <div className="text-slate-400 text-sm">Pre-configured tire specs • Tested calculations</div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6">
                <Link
                  href="/calculate"
                  className="group relative px-10 py-5 bg-gradient-to-r from-brand to-cyan-500 text-white font-heading font-bold rounded-xl hover:shadow-glow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-out text-lg shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    CALCULATE PSI
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <div className="flex flex-col">
                  <span className="font-mono text-xs text-brand-300 tracking-wider">FREE_ACCESS</span>
                  <span className="text-slate-500 text-sm">All models • No signup</span>
                </div>
              </div>
            </div>

            {/* Right Side - Gauge Visualization */}
            <div className="hidden lg:flex justify-center items-center animate-slide-in-up">
              <div className="relative w-96 h-96">
                {/* Pressure Gauge SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                  {/* Gauge Background */}
                  <circle cx="100" cy="100" r="85" fill="url(#gaugeGradient)" stroke="#0EA5E9" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0C4A6E" />
                      <stop offset="50%" stopColor="#075985" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>
                  </defs>

                  {/* Pressure Arc - Low to High */}
                  <path
                    d="M 30 100 A 70 70 0 1 1 170 100"
                    fill="none"
                    stroke="url(#pressureGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="pressureGradient">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                  </defs>

                  {/* Tick Marks */}
                  {[...Array(9)].map((_, i) => {
                    const angle = -180 + (i * 20);
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 100 + 65 * Math.cos(rad);
                    const y1 = 100 + 65 * Math.sin(rad);
                    const x2 = 100 + 75 * Math.cos(rad);
                    const y2 = 100 + 75 * Math.sin(rad);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#38BDF8"
                        strokeWidth="2"
                        opacity="0.6"
                      />
                    );
                  })}

                  {/* Center Display */}
                  <circle cx="100" cy="100" r="45" fill="#0C4A6E" stroke="#0EA5E9" strokeWidth="2"/>
                  <text x="100" y="95" textAnchor="middle" className="font-mono font-bold text-2xl fill-sky-300">PSI</text>
                  <text x="100" y="115" textAnchor="middle" className="font-mono font-bold text-4xl fill-white">25</text>

                  {/* Needle */}
                  <line x1="100" y1="100" x2="100" y2="35" stroke="#F97316" strokeWidth="3" strokeLinecap="round" transform="rotate(45 100 100)">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="-90 100 100"
                      to="45 100 100"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <circle cx="100" cy="100" r="6" fill="#F97316"/>
                </svg>

                {/* Hexagonal Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
                      <path d="M25 0 L50 12.5 L50 30.9 L25 43.4 L0 30.9 L0 12.5 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

      {/* Technical Features Grid - Diagonal Layout */}
      <section className="grid md:grid-cols-2 gap-6 mb-20 relative">
        {/* Diagonal Line Accent */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-brand/20 via-brand/10 to-transparent transform -translate-x-1/2 hidden md:block"></div>

        {/* Feature Card 1 */}
        <div className="group relative card card-hover p-6 md:p-8 bg-white border-l-4 border-brand overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-brand to-cyan-600 rounded-lg text-white shadow-tech group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <span className="font-mono font-black text-2xl">Δ</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-text mb-1">Load-Aware Algorithm</h3>
                <span className="font-mono text-xs text-brand tracking-wider">DYNAMIC_CALC</span>
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              Proprietary formula accounts for rider weight, cargo load, and terrain conditions. Precision calculations, zero guesswork.
            </p>
          </div>
        </div>

        {/* Feature Card 2 */}
        <div className="group relative card card-hover p-6 md:p-8 bg-white border-l-4 border-purple-500 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg text-white shadow-tech group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <span className="font-mono font-black text-xl">DB</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-text mb-1">Verified Model Database</h3>
                <span className="font-mono text-xs text-purple-600 tracking-wider">20+_PRESETS</span>
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              Pre-configured tire specifications and tested pressure calculations for popular e-bike models. Instant accuracy.
            </p>
          </div>
        </div>

        {/* Feature Card 3 */}
        <div className="group relative card card-hover p-6 md:p-8 bg-white border-l-4 border-accent overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-accent to-orange-700 rounded-lg text-white shadow-tech group-hover:shadow-glow-accent group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <span className="font-mono font-black text-2xl">⚠</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-text mb-1">Real-Time Safety Checks</h3>
                <span className="font-mono text-xs text-accent tracking-wider">RISK_ANALYSIS</span>
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              Live monitoring for pinch flat risk, blowout warnings, and terrain-specific safety alerts. Ride with confidence.
            </p>
          </div>
        </div>

        {/* Feature Card 4 */}
        <div className="group relative card card-hover p-6 md:p-8 bg-white border-l-4 border-cyan-500 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg text-white shadow-tech group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <span className="font-mono font-black text-xl">3W</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-text mb-1">Trike Configuration</h3>
                <span className="font-mono text-xs text-cyan-600 tracking-wider">3_WHEEL_MODE</span>
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              Advanced three-wheel load distribution with independent rear tire calculations. Full trike support built-in.
            </p>
          </div>
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

      {/* Process Section - Technical Blueprint Style */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0EA5E9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          </svg>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-brand-300 tracking-widest mb-4">PROCESS_FLOW</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
              CALCULATION PROTOCOL
            </h2>
            <p className="text-slate-400 text-lg">Four-step precision measurement system</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="group relative bg-slate-800/50 border border-brand/20 rounded-xl p-6 backdrop-blur-sm hover:border-brand/50 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand to-cyan-600 rounded-lg flex items-center justify-center shadow-glow">
                  <span className="font-display font-black text-white text-2xl">01</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-xl mb-2">SELECT MODEL</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Choose from 20+ verified e-bike presets or input custom tire dimensions
                  </p>
                  <div className="mt-3 font-mono text-xs text-brand-400">bike_model → tire_specs</div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-slate-800/50 border border-accent/20 rounded-xl p-6 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-orange-700 rounded-lg flex items-center justify-center shadow-glow-accent">
                  <span className="font-display font-black text-white text-2xl">02</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-xl mb-2">CONFIGURE LOAD</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Input rider, passenger, and cargo weight variables for load distribution
                  </p>
                  <div className="mt-3 font-mono text-xs text-accent-400">weight_data → load_calc</div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="font-display font-black text-white text-2xl">03</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-xl mb-2">SET PARAMETERS</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Define terrain surface and tire construction type for environmental factors
                  </p>
                  <div className="mt-3 font-mono text-xs text-purple-400">terrain_params → adjust</div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center shadow-glow">
                  <span className="font-display font-black text-white text-2xl">04</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-xl mb-2">ANALYZE OUTPUT</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Receive min/target/max PSI range with live safety analysis and warnings
                  </p>
                  <div className="mt-3 font-mono text-xs text-cyan-400">algorithm → psi_output</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
