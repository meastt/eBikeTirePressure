import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Bike Models | Tire Pressure Guide | E-Bike PSI",
  description:
    "Browse 20+ popular e-bike models by brand. Search and filter by type (Fat Tire, Cargo, Folding). Get instant PSI recommendations for your bike.",
  openGraph: {
    title: "E-Bike Models | Tire Pressure Guide",
    description: "Search and filter 20+ e-bike models. Instant pressure calculators for each bike.",
    type: "website",
  },
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

