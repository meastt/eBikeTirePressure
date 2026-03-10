import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Bike Tire Pressure Database | 150+ Models | PSI Guide (2026)",
  description:
    "Browse 150+ e-bike models from 40+ brands. Search and filter by type (Fat Tire, Cargo, Folding, Commuter, Moto-Style). Get weight-based PSI recommendations for your bike.",
  alternates: {
    canonical: "https://ebikepsi.com/ebike-tire-pressure",
    languages: {
      "en-US": "https://ebikepsi.com/ebike-tire-pressure",
      "en-GB": "https://ebikepsi.com/ebike-tyre-pressure",
    },
  },
  openGraph: {
    title: "E-Bike Tire Pressure Database | 150+ Models | PSI Guide (2026)",
    description: "Browse 150+ e-bike models from 40+ brands. Search, filter, and get weight-based PSI recommendations.",
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

