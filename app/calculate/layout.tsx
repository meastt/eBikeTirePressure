import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PSI Calculator - E-Bike Tire Pressure Tool | E-Bike PSI",
  description:
    "Calculate the perfect tire pressure for your e-bike. Input your weight, cargo, terrain, and bike model for instant PSI recommendations with safety warnings.",
  alternates: {
    canonical: "https://ebikepsi.com/calculate",
  },
  openGraph: {
    title: "E-Bike PSI Calculator",
    description: "Calculate optimal tire pressure based on weight, cargo, and terrain",
    type: "website",
    url: "https://ebikepsi.com/calculate",
  },
};

export default function CalculateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate E-Bike Tire Pressure',
    description: 'Calculate optimal PSI for your e-bike based on weight, cargo, and terrain conditions',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select Your E-Bike Model',
        text: 'Choose your e-bike model from our database or enter custom tire dimensions',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Weight Information',
        text: 'Input your rider weight, passenger weight (if applicable), and cargo weight for front and rear',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Terrain Type',
        text: 'Select your primary riding surface: pavement, gravel, sand, or snow',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Select Tire Construction',
        text: 'Choose between tubed or tubeless tire setup',
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Review PSI Recommendations',
        text: 'Get minimum, target, and maximum PSI values with real-time safety warnings',
        position: 5,
      },
    ],
    totalTime: 'PT2M',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {children}
    </>
  );
}
