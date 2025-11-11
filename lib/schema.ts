// JSON-LD structured data helpers

import { ModelPreset } from "./types";

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateProductSchema(model: ModelPreset) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${model.brand} ${model.model}`,
    description: `Tire pressure specifications for ${model.brand} ${model.model} e-bike`,
    brand: {
      "@type": "Brand",
      name: model.brand,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Tire Size",
        value: model.stockTire.size,
      },
      {
        "@type": "PropertyValue",
        name: "Min PSI",
        value: model.stockTire.minPSI,
      },
      {
        "@type": "PropertyValue",
        name: "Max PSI",
        value: model.stockTire.maxPSI,
      },
      {
        "@type": "PropertyValue",
        name: "Bike Weight",
        value: `${model.bikeWeightLbs} lbs`,
      },
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "E-Bike PSI",
    description: "Professional e-bike tire pressure calculator",
    url: "https://ebike-psi.com",
  };
}
