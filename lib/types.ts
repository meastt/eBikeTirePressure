// Core types for the calculator engine

export interface ModelPreset {
  slug: string;
  brand: string;
  model: string;
  bikeWeightLbs: number;
  stockTire: {
    size: string;
    minPSI?: number; // Optional - will use defaults based on tire size if not specified
    maxPSI?: number; // Optional - will use defaults based on tire size if not specified
    casing: "standard" | "reinforced";
  };
  axleBias: {
    front: number;
    rear: number;
  };
  isTrike?: boolean; // Whether this model is a tricycle
  expertTake?: string; // Expert opinion/review snippet for SEO
  // SEO-friendly URL fields (computed)
  brandSlug?: string;
  modelSlug?: string;
  canonicalUrl?: string;
}

export type Surface = "pavement" | "mixed" | "dirt" | "sand_snow";
export type Construction = "tubed" | "tubeless" | "reinforced";

export interface CalculatorInputs {
  bike: ModelPreset;
  riderLbs: number; // 80-300
  passengerLbs?: number; // 0-150
  cargoFrontLbs?: number; // 0-80
  cargoRearLbs?: number; // 0-120
  surface: Surface;
  construction: Construction;
  trikeMode?: boolean;
  tempF?: number; // optional temperature adjustment
}

export interface AxleResult {
  min: number;
  target: number;
  max: number;
}

export interface CalculatorWarnings {
  lowPinchRisk?: boolean;
  squirmRisk?: boolean;
  exceedsSidewallMax?: boolean;
}

export interface CalculatorOutput {
  front: AxleResult;
  rear: AxleResult;
  warnings: CalculatorWarnings;
  notes: string[]; // e.g., "+3 PSI rear for 30 lb cargo"
}
