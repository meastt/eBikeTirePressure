import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ModelPreset } from "@/lib/types";
import { generateArticleSchema, generateFAQSchema, type FAQItem } from "@/lib/schema";
import { generatePSITable } from "@/calc/psiTable";
import modelsData from "@/data/models.json";
import { enrichModel } from "@/lib/modelUtils";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const models = modelsData as ModelPreset[];

// Generate static pages for all models
export async function generateStaticParams() {
  return models.map((model) => ({
    slug: model.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const modelData = models.find((m) => m.slug === slug);

  if (!modelData) {
    return {
      title: "Model Not Found",
    };
  }

  // Enrich with canonical URL
  const model = enrichModel(modelData);

  // UPDATED: Compelling Title with Year and Benefit
  const title = `${model.brand} ${model.model} Tire Pressure & Specs (2026 Guide)`;

  // Short, benefit-driven description (~150 chars) for all model pages
  const description = `${model.brand} ${model.model} 2026 tire pressure guide. Stock ${model.stockTire.size} tires with recommended PSI range and weight-based calculator for range, comfort and safety.`;

  return {
    title,
    description,
    alternates: {
      canonical: model.canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  // Generate PSI table for common scenarios
  const psiTable = generatePSITable(model);

  // Define FAQs for this model
  const faqs: FAQItem[] = [
    {
      question: `What is the recommended tire pressure for ${model.brand} ${model.model}?`,
      answer: `For 2026, the recommended tire pressure for the ${model.brand} ${model.model} usually falls between ${model.stockTire.minPSI} and ${model.stockTire.maxPSI} PSI. For an average 180 lb rider on pavement, we recommend starting around ${psiTable[1].frontPSI} PSI (Front) and ${psiTable[1].rearPSI} PSI (Rear). Use the calculator above for your specific weight.`,
    },
    {
      question: `What tire size does the ${model.brand} ${model.model} use?`,
      answer: `The ${model.brand} ${model.model} comes stock with ${model.stockTire.size} tires. These tires are designed to handle the bike's ${model.bikeWeightLbs} lb weight plus rider and cargo.`,
    },
    {
      question: `How does rider weight affect ${model.brand} ${model.model} tire pressure?`,
      answer: `Heavier riders should run higher pressures to prevent pinch flats and protect the rim, while lighter riders can run lower pressures for better traction and comfort. Our calculator adjusts for your specific weight to give you the optimal PSI.`,
    },
    {
      question: "Should I adjust tire pressure for different terrain?",
      answer: `Yes! Lower your tire pressure by 8-15% for mixed terrain and gravel, and up to 30% for soft surfaces like sand or snow. This increases traction and comfort.`,
    },
  ];

  // Generate JSON-LD structured data
  const articleSchema = generateArticleSchema(model);
  const faqSchema = generateFAQSchema(faqs);

  // Get related models (prefer same brand)
  const relatedModels = models
    .filter((m) => m.slug !== model.slug)
    .sort((a, b) => {
      // Prioritize same brand
      if (a.brand === model.brand && b.brand !== model.brand) return -1;
      if (a.brand !== model.brand && b.brand === model.brand) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Models', href: '/ebike-tire-pressure' },
            { label: `${model.brand} ${model.model}` },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2 tracking-tight">
            {model.brand} {model.model} Tire Pressure & Specs (2026 Guide)
          </h1>
          <p className="text-xl text-muted">Complete specifications, PSI calculator, and expert analysis.</p>
        </div>

        {/* Experience Signal / Expert Take Section */}
        <div className="mb-8 p-6 bg-surface rounded-2xl border border-brand-100">
           <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🚲</span>
              <h2 className="text-xl font-bold text-text">Our Expert Take</h2>
           </div>
           <p className="text-base text-text leading-relaxed mb-4">
             Based on our analysis of the <strong>{model.brand} {model.model}</strong> specs, this e-bike's <strong>{model.stockTire.size}</strong> tires and <strong>{model.bikeWeightLbs} lb</strong> curb weight require careful attention to tire pressure.
           </p>
           <p className="text-base text-text leading-relaxed mb-4">
             In our experience with similar <strong>{model.stockTire.casing === 'reinforced' ? 'reinforced' : 'standard'} casing</strong> tires, running the pressure too low (below {model.stockTire.minPSI} PSI) significantly increases the risk of pinch flats, especially given the bike's weight. Conversely, maximizing the pressure to {model.stockTire.maxPSI} PSI can make the ride feel harsh and reduce traction on loose surfaces.
           </p>
           <p className="text-base text-text leading-relaxed font-medium">
             We recommend most riders start at the "Balanced" setting in our calculator below and adjust +/- 2 PSI based on ride feel.
           </p>
        </div>

        {/* Introduction */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm">
          <p className="text-base text-text leading-relaxed mb-4">
            The <strong>{model.brand} {model.model}</strong> features <strong>{model.stockTire.size}</strong> tires with a recommended pressure range of <strong>{model.stockTire.minPSI}-{model.stockTire.maxPSI} PSI</strong>. Proper tire inflation is critical for this e-bike&apos;s performance, safety, and battery efficiency.
          </p>
          <p className="text-base text-text leading-relaxed">
            Running the correct tire pressure prevents pinch flats, improves handling, and maximizes your battery range. Use our calculator and reference tables below to find your ideal pressure based on rider weight, terrain type, and cargo load.
          </p>
        </div>

        {/* Quick Specs Card */}
        <div className="p-6 bg-white rounded-2xl shadow-card mb-6">
          <h2 className="text-xl font-bold text-text mb-4">Specifications</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted">Tire Size</div>
              <div className="text-lg font-semibold text-text">{model.stockTire.size}</div>
            </div>
            <div>
              <div className="text-sm text-muted">PSI Range</div>
              <div className="text-lg font-semibold text-text">
                {model.stockTire.minPSI}–{model.stockTire.maxPSI} PSI
              </div>
            </div>
            <div>
              <div className="text-sm text-muted">Bike Weight</div>
              <div className="text-lg font-semibold text-text">{model.bikeWeightLbs} lbs</div>
            </div>
            <div>
              <div className="text-sm text-muted">Tire Construction</div>
              <div className="text-lg font-semibold text-text">
                {model.stockTire.casing === "reinforced" ? "Reinforced" : "Standard"}
              </div>
            </div>
          </div>
        </div>

        {/* PSI Table */}
        <div className="p-6 bg-white rounded-2xl shadow-card mb-6">
          <h2 className="text-xl font-bold text-text mb-4">Quick Reference PSI Table</h2>

          {/* Context note */}
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-lg mb-4">
            <p className="text-sm text-text">
              <strong>Quick estimates</strong> for pavement with tubed tires.
              For your exact weight and riding conditions,
              <Link href={`/calculate?model=${model.slug}`} className="text-brand font-semibold underline ml-1">
                use the calculator
              </Link>.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 px-2 font-semibold text-text">Scenario</th>
                  <th className="text-center py-3 px-2 font-semibold text-text">Front PSI</th>
                  <th className="text-center py-3 px-2 font-semibold text-text">Rear PSI</th>
                </tr>
              </thead>
              <tbody>
                {psiTable.map((row, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    <td className="py-3 px-2 text-muted">{row.scenario}</td>
                    <td className="py-3 px-2 text-center font-semibold text-brand">
                      {row.frontPSI}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-brand">
                      {row.rearPSI}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 text-xs text-muted space-y-1">
            <p><strong>Surface:</strong> Pavement (reduce 10-30% for mixed/dirt/snow)</p>
            <p><strong>Construction:</strong> Tubed (tubeless: -1 PSI, reinforced: +2 PSI)</p>
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="p-6 bg-brand-50 border-2 border-brand-200 rounded-2xl shadow-card mb-6 text-center">
          <h3 className="text-lg font-bold text-brand-dark mb-2">
            Get Personalized PSI Recommendations
          </h3>
          <p className="text-sm text-brand-dark mb-4">
            Calculate exact tire pressure based on your weight, cargo, and riding conditions.
          </p>
          <Link
            href={`/calculate?model=${model.slug}`}
            className="inline-block px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-sm"
          >
            Open Calculator for This Bike
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="p-6 bg-white rounded-2xl shadow-card">
          <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="pb-4 border-b border-line last:border-0">
                <h3 className="text-base font-semibold text-text mb-2">{faq.question}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-line text-center">
            <Link
              href="/faq"
              className="text-brand hover:text-brand-600 font-medium transition-colors text-sm"
            >
              View All FAQs →
            </Link>
          </div>
        </div>

        {/* Related Models - Internal linking for SEO */}
        <div className="mt-8 p-6 bg-surface rounded-2xl">
          <h2 className="text-xl font-bold text-text mb-4">Related E-Bike Models</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {relatedModels.map((relatedModel) => (
                <Link
                  key={relatedModel.slug}
                  href={`/models/${relatedModel.slug}`}
                  className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-line hover:border-brand-200"
                >
                  <div className="text-sm font-semibold text-text group-hover:text-brand mb-1">
                    {relatedModel.brand} {relatedModel.model}
                  </div>
                  <div className="text-xs text-muted">
                    {relatedModel.stockTire.size} • {relatedModel.stockTire.minPSI}-{relatedModel.stockTire.maxPSI} PSI
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center">
            <Link
              href="/ebike-tire-pressure"
              className="text-brand hover:text-brand-600 font-medium transition-colors text-sm"
            >
              View All {models.length} E-Bike Models →
            </Link>
          </div>
        </div>

        {/* Back to directory */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-brand hover:text-brand-600 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
