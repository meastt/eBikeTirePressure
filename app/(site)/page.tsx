import type { Metadata } from "next";
import Link from "next/link";
import type { ModelPreset } from "@/lib/types";
import { generateFAQSchema } from "@/lib/schema";
import modelsData from "@/data/models.json";
import { getAllBrandMetadata } from "@/lib/brandMetadata";
import { getAllTireSizes, getTireSizeInfo } from "@/lib/programmatic/tire-sizes";

const models = modelsData as ModelPreset[];

export const metadata: Metadata = {
  title: "E-Bike PSI — Tire Pressure Calculator for 150+ Models (2026)",
  description:
    "Find the perfect tire pressure for your e-bike. Search 150+ models like Rad Power, Aventon, Lectric, and Specialized. Get personalized PSI recommendations based on your weight, cargo, and terrain.",
  alternates: {
    canonical: "https://ebikepsi.com",
  },
  openGraph: {
    title: "E-Bike PSI — Tire Pressure Calculator for 150+ Models",
    description:
      "Free e-bike tire pressure calculator. Search your exact model and get personalized PSI for your weight, cargo, and riding conditions.",
    type: "website",
    url: "https://ebikepsi.com",
  },
};

export default function Home() {
  const homepageFAQs = [
    {
      question: "What PSI should I run on my e-bike?",
      answer: "It depends on your tire size, rider weight, cargo, and terrain. Most e-bikes run 20-50 PSI. Fat tires (3.0\"+) typically use 20-30 PSI, while standard tires (2.0-2.5\") use 35-50 PSI. Use our calculator to get personalized recommendations.",
    },
    {
      question: "How does the free PSI calculator work?",
      answer: "Select your e-bike model (or enter your tire size), set your rider weight, add any cargo or passengers, and choose your terrain type. The calculator uses your bike's specific specs to give you front and rear PSI recommendations.",
    },
    {
      question: "Should I adjust tire pressure for different terrain?",
      answer: "Yes. Reduce pressure by 8-15% for gravel and mixed terrain, and up to 30% for sand or snow. This increases traction and ride comfort. Always stay above the minimum PSI printed on your tire sidewall.",
    },
    {
      question: "What happens if my e-bike tire pressure is wrong?",
      answer: "Too low: higher risk of pinch flats, rim damage, and poor handling. Too high: harsh ride, reduced traction, and risk of tire damage. Getting it right saves battery, extends tire life, and keeps you safer.",
    },
  ];

  const faqSchema = generateFAQSchema(homepageFAQs);

  const brandMetadata = getAllBrandMetadata();
  const allTireSizes = getAllTireSizes();
  const popularTireSizes = allTireSizes
    .map((slug) => getTireSizeInfo(slug))
    .filter((info) => !!info)
    .filter((info) => info!.modelCount <= 3)
    .slice(0, 24) as ReturnType<typeof getTireSizeInfo>[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-20 sm:py-28 lg:py-36 px-4 overflow-hidden">
        {/* Warm background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-100 to-cyan-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-orange-50 to-sky-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
              <span className="text-lg">🛞</span>
              Free e-bike tire pressure calculator
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
              The right PSI<br />
              <span className="text-sky-500">for your exact e-bike</span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Enter your make, model, and riding conditions. Get precise front and rear tire pressure in seconds — no account needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/calculate"
                className="group relative px-10 py-5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-sky-200 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-lg shadow-lg"
              >
                Find My PSI →
              </Link>
              <Link
                href="/ebike-tire-pressure"
                className="px-8 py-5 bg-white text-slate-600 font-semibold rounded-2xl border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Browse by Model
              </Link>
            </div>
          </div>

          {/* Quick stats strip */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-12">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">{models.length}+</div>
              <div className="text-sm text-slate-500 mt-1">E-Bike Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">150+</div>
              <div className="text-sm text-slate-500 mt-1">Brands Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">Free</div>
              <div className="text-sm text-slate-500 mt-1">Forever</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">60s</div>
              <div className="text-sm text-slate-500 mt-1">To Your PSI</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Three steps to your PSI
            </h2>
            <p className="text-xl text-slate-500">No signup. No email. Just your ideal tire pressure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-sky-500 text-2xl font-black">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Search your model</h3>
              <p className="text-slate-500 leading-relaxed">Pick your exact e-bike from 150+ models. Rad Power, Aventon, Specialized, Lectric, and more.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-sky-500 text-2xl font-black">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Set your details</h3>
              <p className="text-slate-500 leading-relaxed">Enter your weight, add any cargo or passengers, and choose your terrain — pavement, gravel, sand, or snow.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-sky-500 text-2xl font-black">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get your PSI</h3>
              <p className="text-slate-500 leading-relaxed">Instant front and rear PSI recommendations tailored to your bike, load, and riding surface.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/calculate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 shadow-xl"
            >
              Open the Calculator
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Find your e-bike
            </h2>
            <p className="text-xl text-slate-500">Click any model to see full PSI specs and our recommended settings</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Rad Power Bikes */}
            <Link href="/brands/rad-power-bikes" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">🚲</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Rad Power Bikes</h3>
              <p className="text-xs text-slate-400 mt-1">RadRunner, RadWagon, RadCity</p>
            </Link>

            {/* Aventon */}
            <Link href="/brands/aventon" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">🚴</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Aventon</h3>
              <p className="text-xs text-slate-400 mt-1">Aventure, Level, Abound</p>
            </Link>

            {/* Lectric */}
            <Link href="/brands/lectric" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Lectric</h3>
              <p className="text-xs text-slate-400 mt-1">XP 3, XP Lite, XP Step</p>
            </Link>

            {/* Specialized */}
            <Link href="/brands/specialized" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">🏁</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Specialized</h3>
              <p className="text-xs text-slate-400 mt-1">Vado, Como, Turbo</p>
            </Link>

            {/* Tern */}
            <Link href="/brands/tern" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Tern</h3>
              <p className="text-xs text-slate-400 mt-1">GSD, HSD, Quick Haul</p>
            </Link>

            {/* Cannondale */}
            <Link href="/brands/cannondale" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">🏔️</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Cannondale</h3>
              <p className="text-xs text-slate-400 mt-1">Treadwell, Habit Neo</p>
            </Link>

            {/* Gazelle */}
            <Link href="/brands/gazelle" className="group card card-hover p-5 bg-white text-center border border-slate-100 hover:border-sky-200">
              <div className="text-3xl mb-3">🌿</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Gazelle</h3>
              <p className="text-xs text-slate-400 mt-1">Medeo, Arlington, Ottawa</p>
            </Link>

            {/* All Models */}
            <Link href="/ebike-tire-pressure" className="group card card-hover p-5 bg-gradient-to-br from-sky-500 to-cyan-500 text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              <div className="text-3xl mb-3">+</div>
              <h3 className="text-base font-bold">All {models.length} Models</h3>
              <p className="text-xs text-sky-100 mt-1">Full database</p>
            </Link>
          </div>

          {/* Individual popular model links */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-medium">Popular models</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/models/rad-power-radrunner-plus" className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">RadRunner Plus</Link>
              <Link href="/models/aventon-aventure-2" className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">Aventon Aventure 2</Link>
              <Link href="/models/lectric-xp-3" className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">Lectric XP 3</Link>
              <Link href="/models/tern-gsd-s10" className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">Tern GSD</Link>
              <Link href="/models/rad-power-radwagon-4" className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">RadWagon 4</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why PSI matters */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-5">Why it matters</div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Wrong PSI costs you<br />more than you think
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Most e-bike riders run the wrong pressure without knowing it. Your tires might look fine, but the numbers on the sidewall are a range — and where you fall in that range depends on your actual load.
              </p>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg">🔋</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Battery range</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Under-inflated tires create more rolling resistance, draining your battery faster on every ride.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Pinch flats</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">E-bikes are heavy. Running too low on pressure is the #1 cause of pinch flats — and e-bike tires aren't cheap to replace.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg">🛞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Tire longevity</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Running 10% over the optimal pressure wears down the center tread faster. Too low and the sidewalls take uneven damage.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-3xl p-8 sm:p-10">
              <h3 className="font-bold text-2xl text-slate-900 mb-6">Our PSI calculator factors in:</h3>
              <ul className="space-y-4">
                {[
                  "Your exact e-bike model and tire specs",
                  "Rider weight (front axle load)",
                  "Cargo or passenger weight (rear axle load)",
                  "Terrain type: pavement, mixed, gravel, dirt, sand, snow",
                  "Tire construction: tubed, tubeless, or reinforced",
                  "Temperature adjustments for cold or hot days",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg mt-0.5">✓</span>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/calculate"
                className="mt-8 w-full block text-center px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
              >
                Get My Free PSI →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 mb-3">
                From the blog
              </h2>
              <p className="text-xl text-slate-500">Expert takes on e-bike tire pressure</p>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">
              All posts →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                href: "/blog/longtail-cargo-ebike-tire-pressure-guide",
                tag: "Cargo",
                title: "Longtail Cargo E-Bike Tire Pressure: Tern GSD, Yuba, RadWagon Guide",
                date: "March 28, 2026",
                read: "11 min",
              },
              {
                href: "/blog/fat-tire-ebike-tire-pressure-guide",
                tag: "Fat Tires",
                title: "Fat Tire E-Bike Tire Pressure Guide: 3.8\"–5\" Tires",
                date: "November 14, 2025",
                read: "8 min",
              },
              {
                href: "/blog/ebike-tire-pressure-heavy-riders-guide",
                tag: "Heavy Riders",
                title: "E-Bike Tire Pressure for Heavy Riders (200+ lbs)",
                date: "November 14, 2025",
                read: "7 min",
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group card card-hover bg-white p-6 border border-slate-100 hover:border-sky-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-md uppercase tracking-wide">{post.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-4">{post.title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.read} read</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-md transition-all duration-200">
              All posts →
            </Link>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-4xl mb-6">📬</div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-5">
            Get new PSI guides first
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
            New e-bike coverage, tire pressure guides, and riding tips — delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/ebikepsi"
            method="post"
            target="popupwindow"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent backdrop-blur-sm"
            />
            <input type="hidden" value="1" name="embed" />
            <button
              type="submit"
              className="px-8 py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-sm text-slate-500 mt-4">Join riders who get better PSI guidance. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Common questions
            </h2>
            <p className="text-xl text-slate-500">Everything most riders ask about e-bike tire pressure</p>
          </div>
          <div className="space-y-4">
            {homepageFAQs.map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-100">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 list-none hover:text-sky-600 transition-colors">
                  <span className="text-lg">{faq.question}</span>
                  <span className="ml-4 text-sky-500 group-open:rotate-180 transition-transform flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/faq" className="text-sky-600 font-semibold hover:underline">See all FAQs →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="font-display font-black text-xl text-slate-900 mb-3">E-Bike PSI</div>
              <p className="text-sm text-slate-500 leading-relaxed">Free tire pressure calculator and guide for 150+ e-bike models.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Tools</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/calculate" className="hover:text-sky-600 transition-colors">PSI Calculator</Link></li>
                <li><Link href="/ebike-tire-pressure" className="hover:text-sky-600 transition-colors">Browse Models</Link></li>
                <li><Link href="/brands" className="hover:text-sky-600 transition-colors">All Brands</Link></li>
                <li><Link href="/blog" className="hover:text-sky-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Popular</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/brands/rad-power-bikes" className="hover:text-sky-600 transition-colors">Rad Power Bikes</Link></li>
                <li><Link href="/brands/aventon" className="hover:text-sky-600 transition-colors">Aventon</Link></li>
                <li><Link href="/brands/lectric" className="hover:text-sky-600 transition-colors">Lectric</Link></li>
                <li><Link href="/brands/specialized" className="hover:text-sky-600 transition-colors">Specialized</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/faq" className="hover:text-sky-600 transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-sky-600 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-sky-600 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-slate-400 pt-8 border-t border-slate-200">
            © 2026 E-Bike PSI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
