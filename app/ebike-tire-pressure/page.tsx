import type { Metadata } from "next";
import Link from "next/link";
import type { ModelPreset } from "@/lib/types";
import modelsData from "@/data/models.json";

const models = modelsData as ModelPreset[];

// Group models by category based on tire size
function categorizeModels(models: ModelPreset[]): Record<string, ModelPreset[]> {
  const categories: Record<string, ModelPreset[]> = {
    "Fat Tire E-Bikes": [],
    "Cargo E-Bikes": [],
    "Standard E-Bikes": [],
    "Compact/Folding E-Bikes": [],
    "Moto-Style E-Bikes": [],
  };

  for (const model of models) {
    const tireWidth = parseFloat(model.stockTire.size.split("x")[1] || "0");
    const tireSize = model.stockTire.size.toLowerCase();

    // Categorization logic
    if (tireWidth >= 3.5 || tireSize.includes("4.0")) {
      categories["Fat Tire E-Bikes"].push(model);
    } else if (
      model.bikeWeightLbs > 70 &&
      (model.brand.toLowerCase().includes("tern") ||
        model.brand.toLowerCase().includes("yuba") ||
        model.model.toLowerCase().includes("cargo") ||
        model.model.toLowerCase().includes("wagon") ||
        model.model.toLowerCase().includes("load"))
    ) {
      categories["Cargo E-Bikes"].push(model);
    } else if (
      tireSize.includes("16x") ||
      tireSize.includes("14x") ||
      model.brand.toLowerCase().includes("brompton")
    ) {
      categories["Compact/Folding E-Bikes"].push(model);
    } else if (
      model.bikeWeightLbs > 100 ||
      model.brand.toLowerCase().includes("sur-ron") ||
      model.brand.toLowerCase().includes("talaria") ||
      model.brand.toLowerCase().includes("ubco")
    ) {
      categories["Moto-Style E-Bikes"].push(model);
    } else {
      categories["Standard E-Bikes"].push(model);
    }
  }

  // Remove empty categories
  return Object.fromEntries(Object.entries(categories).filter(([_, models]) => models.length > 0));
}

export const metadata: Metadata = {
  title: "E-Bike Tire Pressure Guide | 20+ Popular Models | E-Bike PSI",
  description:
    "Tire pressure recommendations for 20+ popular e-bike models including Rad Power, Lectric, Aventon, Trek, Specialized, and more. Find PSI specs for your bike.",
  openGraph: {
    title: "E-Bike Tire Pressure Guide | 20+ Models",
    description: "Comprehensive tire pressure guide for popular e-bikes with PSI tables and calculators.",
    type: "website",
  },
};

export default function HubPage() {
  const categorizedModels = categorizeModels(models);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-3 tracking-tight">
          E-Bike Tire Pressure Guide
        </h1>
        <p className="text-xl text-muted">
          Find tire pressure recommendations for {models.length} popular e-bike models
        </p>
      </div>

      {/* Quick Calculator CTA */}
      <div className="p-6 bg-brand-50 border-2 border-brand-200 rounded-2xl shadow-card mb-8 text-center">
        <h2 className="text-lg font-bold text-brand-dark mb-2">Not sure which model you have?</h2>
        <p className="text-sm text-brand-dark mb-4">
          Use our universal calculator to get PSI recommendations for any e-bike
        </p>
        <Link
          href="/calculate"
          className="inline-block px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-sm"
        >
          Open Universal Calculator
        </Link>
      </div>

      {/* Model Categories */}
      <div className="space-y-8">
        {Object.entries(categorizedModels).map(([category, categoryModels]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-text mb-4">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryModels.map((model) => (
                <Link
                  key={model.slug}
                  href={`/models/${model.slug}`}
                  className="group p-5 bg-white rounded-xl shadow-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-brand-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-text group-hover:text-brand transition-colors">
                        {model.brand}
                      </h3>
                      <p className="text-sm text-muted">{model.model}</p>
                    </div>
                    <div className="text-xs px-2 py-1 bg-surface rounded text-muted font-medium">
                      {model.stockTire.size}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted">PSI Range:</span>
                      <div className="font-semibold text-text">
                        {model.stockTire.minPSI}–{model.stockTire.maxPSI}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted">Weight:</span>
                      <div className="font-semibold text-text">{model.bikeWeightLbs} lbs</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-brand font-medium group-hover:underline">
                    View PSI Table & Calculator →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-12 p-6 bg-surface rounded-xl">
        <h2 className="text-lg font-bold text-text mb-3">About This Guide</h2>
        <p className="text-sm text-muted leading-relaxed">
          Each model page includes detailed specifications, pre-calculated PSI tables for common
          scenarios, and a link to our calculator pre-configured for that specific bike. Tire pressure
          recommendations account for bike weight, tire specifications, rider weight, cargo, and terrain.
          Always check your tire sidewall for manufacturer max PSI limits.
        </p>
      </div>
    </div>
  );
}
