export interface LocationData {
  slug: string;
  name: string;
  country: "US" | "UK" | "CA" | "AU";
  climate: "wet" | "dry" | "mixed" | "cold";
  terrain: "hilly" | "flat" | "mixed";
  description: string;
}

export const LOCATIONS: Record<string, LocationData> = {
  seattle: {
    slug: "seattle",
    name: "Seattle",
    country: "US",
    climate: "wet",
    terrain: "hilly",
    description: "Seattle's steep hills and frequent rain necessitate lower tire pressures for traction and pinch-flat protection on wet streets.",
  },
  portland: {
    slug: "portland",
    name: "Portland",
    country: "US",
    climate: "wet",
    terrain: "mixed",
    description: "Portland's vast network of bike lanes and frequent light rain means slightly lower PSI (5-10% below max) provides the perfect balance of grip and speed.",
  },
  denver: {
    slug: "denver",
    name: "Denver",
    country: "US",
    climate: "cold",
    terrain: "mixed",
    description: "Denver's altitude and cold winter mornings cause rapid PSI drops. E-bike riders here should regularly check pressure and adjust for mixed urban/trail riding.",
  },
  london: {
    slug: "london",
    name: "London",
    country: "UK",
    climate: "wet",
    terrain: "flat",
    description: "London's damp streets and varied tarmac quality require a balanced tyre pressure. Lower your PSI slightly to improve grip on wet city streets.",
  },
  manchester: {
    slug: "manchester",
    name: "Manchester",
    country: "UK",
    climate: "wet",
    terrain: "mixed",
    description: "Manchester's frequent rain and urban terrain make running at 80% of your maximum PSI ideal for both safety and battery range.",
  },
  "new-york": {
    slug: "new-york",
    name: "New York",
    country: "US",
    climate: "mixed",
    terrain: "flat",
    description: "NYC's infamous potholes require dropping your PSI by 5-10% to protect your rims and improve ride comfort on rigid commuter e-bikes.",
  },
  "san-francisco": {
    slug: "san-francisco",
    name: "San Francisco",
    country: "US",
    climate: "mixed",
    terrain: "hilly",
    description: "San Francisco's steep gradients demand maximum traction. A slightly lower rear PSI helps high-torque e-bike motors grip the pavement on ascents.",
  },
  chicago: {
    slug: "chicago",
    name: "Chicago",
    country: "US",
    climate: "cold",
    terrain: "flat",
    description: "Chicago's flat terrain allows for higher PSI for speed, but brutal winters mean you must drop pressure significantly when riding in snow or slush.",
  },
};

export const getAllLocations = (): LocationData[] => Object.values(LOCATIONS);
