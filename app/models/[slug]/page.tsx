import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ModelPreset } from "@/lib/types";
import { generateProductSchema, generateFAQSchema, type FAQItem } from "@/lib/schema";
import { generatePSITable } from "@/calc/psiTable";
import modelsData from "@/data/models.json";
import { enrichModel } from "@/lib/modelUtils";

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

  const title = `${model.brand} ${model.model} Tire Pressure Guide | E-Bike PSI`;
  const description = `Tire pressure calculator and PSI recommendations for ${model.brand} ${model.model} e-bike. Tire size: ${model.stockTire.size}. PSI range: ${model.stockTire.minPSI}-${model.stockTire.maxPSI}.`;

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
      answer: `The recommended tire pressure for ${model.brand} ${model.model} depends on rider weight, cargo, and terrain. For an average 180 lb rider on pavement with tubed tires (${model.stockTire.size}), front tire should be around ${psiTable[1].frontPSI} PSI and rear around ${psiTable[1].rearPSI} PSI. Always stay within the tire's ${model.stockTire.minPSI}-${model.stockTire.maxPSI} PSI range marked on the sidewall.`,
    },
    {
      question: `What tire size does the ${model.brand} ${model.model} use?`,
      answer: `The ${model.brand} ${model.model} comes stock with ${model.stockTire.size} tires. The sidewall max is ${model.stockTire.maxPSI} PSI and minimum is ${model.stockTire.minPSI} PSI.`,
    },
    {
      question: `How much does the ${model.brand} ${model.model} weigh?`,
      answer: `The ${model.brand} ${model.model} weighs approximately ${model.bikeWeightLbs} lbs. This bike weight is factored into our PSI calculations along with rider weight, cargo, and terrain.`,
    },
    {
      question: "Should I adjust tire pressure for different terrain?",
      answer: `Yes! Lower your tire pressure by 8-15% for mixed terrain and gravel, and up to 30% for soft surfaces like sand or snow. This increases traction and comfort. Use our calculator above to get exact recommendations for your riding conditions.`,
    },
  ];

  // Generate JSON-LD structured data
  const productSchema = generateProductSchema(model);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2 tracking-tight">
            {model.brand} {model.model}
          </h1>
          <p className="text-xl text-muted">Tire Pressure Calculator & PSI Guide</p>
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
              <Link href={`/calculate?model=${model.slug}`} className="text-brand font-semibold underline">
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
            {models
              .filter((m) => m.slug !== model.slug)
              .slice(0, 4)
              .map((relatedModel) => (
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
