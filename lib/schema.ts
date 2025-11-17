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

export function generateArticleSchema(model: ModelPreset) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${model.brand} ${model.model} Tire Pressure Guide`,
    description: `Complete tire pressure specifications and recommendations for ${model.brand} ${model.model} e-bike`,
    about: {
      "@type": "Thing",
      name: `${model.brand} ${model.model}`,
      description: `E-bike model with ${model.stockTire.size} tires`,
    },
    author: {
      "@type": "Organization",
      name: "E-Bike PSI",
      url: "https://ebikepsi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "E-Bike PSI",
      url: "https://ebikepsi.com",
    },
    mainEntity: {
      "@type": "Vehicle",
      name: `${model.brand} ${model.model}`,
      brand: {
        "@type": "Brand",
        name: model.brand,
      },
      vehicleConfiguration: `${model.stockTire.size} tires, ${model.bikeWeightLbs} lbs`,
    },
  };
}

// Keep this for backward compatibility - redirects to Article schema
export function generateProductSchema(model: ModelPreset) {
  return generateArticleSchema(model);
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "E-Bike PSI",
    description: "Professional e-bike tire pressure calculator",
    url: "https://ebikepsi.com",
  };
}
