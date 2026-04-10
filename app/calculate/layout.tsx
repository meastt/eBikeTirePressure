import type { Metadata } from "next";
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "E-Bike Tire Pressure Calculator | Precise PSI by Model, Weight & Terrain",
  description:
    "Free e-bike tire pressure calculator with weight-based front and rear PSI recommendations. Select your model or tire size, add rider and cargo weight, and get precise, safe pressures.",
  alternates: {
    canonical: "https://ebikepsi.com/calculate",
  },
};

export default function CalculateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = generateSoftwareApplicationSchema();
  
  // HowTo schema for calculator usage
  const howToSchema = generateHowToSchema(
    "How to Calculate E-Bike Tire Pressure",
    "Step-by-step guide to finding optimal tire pressure for your e-bike using our calculator based on bike model, rider weight, cargo, and terrain.",
    [
      {
        name: "Select Your Bike Model",
        text: "Choose your e-bike model from the database, or manually enter your tire size if your model isn't listed.",
      },
      {
        name: "Set Rider, Passenger, and Cargo Weights",
        text: "Enter your weight, any passenger weight, and cargo weight (front and rear). The calculator accounts for total load distribution.",
      },
      {
        name: "Select Surface Type",
        text: "Choose your primary riding surface: pavement, mixed terrain, dirt trails, or sand/snow. This adjusts PSI for optimal traction.",
      },
      {
        name: "Choose Tire Construction",
        text: "Select whether you have tubed or tubeless tires. Tubeless allows slightly lower PSI while maintaining safety.",
      },
      {
        name: "Review Results",
        text: "Get your personalized front and rear PSI recommendations with safety warnings for pinch flats, sidewall limits, and terrain risks.",
      },
    ]
  );

  // FAQ schema for the calculator page
  const faqSchema = generateFAQSchema([
    {
      question: "How accurate is this e-bike tire pressure calculator?",
      answer: "Our calculator uses a proven weight-based formula that accounts for rider weight, cargo load, tire size, surface type, and tire construction. It gives separate front and rear PSI recommendations tailored to e-bikes, which are heavier than standard bikes and need higher pressures. Results are always within the manufacturer's recommended tire sidewall range.",
    },
    {
      question: "Why do e-bikes need different tire pressure than regular bikes?",
      answer: "E-bikes weigh significantly more due to the motor and battery (often 50–80 lbs extra), and riders tend to carry more weight on cargo and commuter e-bikes. Higher tire pressure prevents pinch flats, reduces rolling resistance, and protects rims. Our calculator is built specifically for e-bike weight ranges.",
    },
    {
      question: "Should I use different PSI for front and rear tires?",
      answer: "Yes. Rear tires typically carry more weight (60% or more of total load), so they need higher pressure than front tires. Our calculator automatically splits the recommendation based on typical e-bike weight distribution. Adjust based on your actual feel and riding conditions.",
    },
    {
      question: "How does terrain affect e-bike tire pressure?",
      answer: "Lower PSI gives better traction on loose surfaces like dirt, gravel, or sand, while higher PSI reduces rolling resistance on pavement. Our calculator adjusts the target PSI based on your selected surface type — pavement, mixed, dirt, or sand/snow — while keeping you within safe pressure limits.",
    },
    {
      question: "Does tubeless vs tubed tires change the recommended PSI?",
      answer: "Tubeless tires can typically run 5–10 PSI lower than tubed tires for the same load because they're less prone to pinch flats. The calculator accounts for this — selecting tubeless will give you slightly lower PSI recommendations while maintaining safety margins.",
    },
  ]);

  return (
    <>
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}

