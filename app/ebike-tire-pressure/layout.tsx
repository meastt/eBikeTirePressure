import type { Metadata } from "next";

import { getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "E-Bike Tire Pressure Database | 150+ Models | PSI Calculator (2026)",
  description:
    "Browse 150+ e-bike models from 40+ brands. Search and filter by type (Fat Tire, Cargo, Folding, Commuter, Moto-Style). Get weight-based PSI recommendations for your bike.",
  alternates: {
    canonical: `${getBaseUrl()}/ebike-tire-pressure`,
    languages: {
      "en-US": `${getBaseUrl()}/ebike-tire-pressure`,
      "en-GB": `${getBaseUrl()}/ebike-tyre-pressure`,
      "x-default": `${getBaseUrl()}/ebike-tire-pressure`,
    },
  },
  openGraph: {
    title: "E-Bike Tire Pressure Database | 150+ Models | PSI Calculator (2026)",
    description: "Complete e-bike tire pressure database: 150+ models, 40+ brands. Expert PSI recommendations by weight, terrain & cargo. Search, compare, and optimize.",
    type: "website",
    url: "https://ebikepsi.com/ebike-tire-pressure",
  },
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

