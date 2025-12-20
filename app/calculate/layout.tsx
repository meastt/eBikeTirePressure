import { generateSoftwareApplicationSchema, generateHowToSchema } from "@/lib/schema";

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
      {children}
    </>
  );
}

