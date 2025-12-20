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
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
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
    url: "https://ebikepsi.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ebikepsi.com/brands?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "E-Bike PSI",
    url: "https://ebikepsi.com",
    logo: "https://ebikepsi.com/logo.svg",
    description: "Professional e-bike tire pressure calculator and guides",
    sameAs: [], // Add social profiles if available
  };
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function generateHowToSchema(name: string, description: string, steps: HowToStep[], image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image && { image }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "E-Bike Tire Pressure Calculator",
    description: "Calculate optimal tire pressure for your e-bike based on weight, cargo, and terrain",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://ebikepsi.com/calculate",
  };
}

export function generateImageObjectSchema(url: string, caption?: string, width?: number, height?: number) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url,
    ...(caption && { caption }),
    ...(width && height && { width, height }),
  };
}
