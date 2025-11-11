/**
 * E-Bike Tire Pressure Calculator Engine
 *
 * Deterministic PSI calculation based on:
 * - Bike weight and tire specifications
 * - Rider + passenger + cargo weight
 * - Load distribution (axle bias + cargo placement)
 * - Surface type (pavement, mixed, dirt, sand/snow)
 * - Tire construction (tubed, tubeless, reinforced)
 * - Trike mode (3-wheel load distribution)
 */

import type {
  CalculatorInputs,
  CalculatorOutput,
  AxleResult,
  CalculatorWarnings,
  Surface,
  Construction,
} from "@/lib/types";
import { getTireInfo } from "./volume";

/**
 * Surface adjustment factors
 * Softer surfaces need lower pressure for traction and comfort
 */
const SURFACE_FACTORS: Record<Surface, number> = {
  pavement: 1.0, // baseline
  mixed: 0.92, // -8% for mixed surfaces
  dirt: 0.85, // -15% for dirt trails
  sand_snow: 0.7, // -30% for sand/snow (need max contact patch)
};

/**
 * Construction adjustment factors
 * Reinforced tires can handle more pressure, tubeless slightly less
 */
const CONSTRUCTION_FACTORS: Record<Construction, number> = {
  tubed: 1.0, // baseline
  tubeless: 0.95, // -5% (runs slightly lower)
  reinforced: 1.08, // +8% (stronger casing)
};

/**
 * Calculate total weight on each axle
 * Accounts for bike weight, rider, passenger, cargo, and trike mode
 */
function calculateAxleLoads(inputs: CalculatorInputs): { front: number; rear: number } {
  const { bike, riderLbs, passengerLbs = 0, cargoFrontLbs = 0, cargoRearLbs = 0, trikeMode } = inputs;

  // Start with bike weight distributed by axle bias
  let frontLoad = bike.bikeWeightLbs * bike.axleBias.front;
  let rearLoad = bike.bikeWeightLbs * bike.axleBias.rear;

  // Add rider (assume 40% front, 60% rear for upright e-bike position)
  frontLoad += riderLbs * 0.4;
  rearLoad += riderLbs * 0.6;

  // Add passenger (assume rear-mounted, 100% rear)
  rearLoad += passengerLbs;

  // Add cargo
  frontLoad += cargoFrontLbs;
  rearLoad += cargoRearLbs;

  // Trike mode: rear load splits between two wheels
  if (trikeMode) {
    rearLoad = rearLoad / 2;
  }

  return { front: frontLoad, rear: rearLoad };
}

/**
 * Calculate baseline PSI for a given load on one tire
 * Uses tire volume to determine PSI per pound
 */
function calculateLoadPSI(loadLbs: number, tireSize: string): number {
  const tireInfo = getTireInfo(tireSize);

  // Base calculation: PSI increases with load
  // Formula: baseline + (load × volume coefficient × scaling factor)
  const psiPerPound = 0.08 * tireInfo.volumeCoefficient;
  const loadPSI = tireInfo.baselinePSI + loadLbs * psiPerPound;

  return loadPSI;
}

/**
 * Apply surface and construction adjustments
 */
function applyAdjustments(
  basePSI: number,
  surface: Surface,
  construction: Construction
): number {
  let adjusted = basePSI;

  // Apply surface factor
  adjusted *= SURFACE_FACTORS[surface];

  // Apply construction factor
  adjusted *= CONSTRUCTION_FACTORS[construction];

  return adjusted;
}

/**
 * Calculate min/target/max range for a given target PSI
 * Min: 85% of target (pinch-flat risk below this)
 * Max: 115% of target (harsh ride above this)
 */
function calculateRange(targetPSI: number, sidewallMax: number): AxleResult {
  const min = Math.round(targetPSI * 0.85);
  const target = Math.round(targetPSI);
  const max = Math.min(Math.round(targetPSI * 1.15), sidewallMax);

  return { min, target, max };
}

/**
 * Detect warnings based on calculated PSI and tire limits
 */
function detectWarnings(
  front: AxleResult,
  rear: AxleResult,
  inputs: CalculatorInputs
): CalculatorWarnings {
  const warnings: CalculatorWarnings = {};

  // Pinch-flat risk: target PSI below tire's min
  if (front.target < inputs.bike.stockTire.minPSI || rear.target < inputs.bike.stockTire.minPSI) {
    warnings.lowPinchRisk = true;
  }

  // Squirm risk: very low pressure on soft surfaces
  if (inputs.surface === "sand_snow" && (front.target < 10 || rear.target < 10)) {
    warnings.squirmRisk = true;
  }

  // Exceeds sidewall max
  if (front.max > inputs.bike.stockTire.maxPSI || rear.max > inputs.bike.stockTire.maxPSI) {
    warnings.exceedsSidewallMax = true;
  }

  return warnings;
}

/**
 * Generate helpful notes about the calculation
 */
function generateNotes(inputs: CalculatorInputs, front: AxleResult, rear: AxleResult): string[] {
  const notes: string[] = [];

  // Cargo notes
  const totalCargo = (inputs.cargoFrontLbs || 0) + (inputs.cargoRearLbs || 0);
  if (totalCargo > 0) {
    notes.push(`+${Math.round((rear.target - front.target) * 0.3)} PSI rear for ${totalCargo} lb cargo`);
  }

  // Passenger notes
  if (inputs.passengerLbs && inputs.passengerLbs > 0) {
    notes.push(`+${Math.round(inputs.passengerLbs * 0.05)} PSI rear for passenger`);
  }

  // Surface notes
  if (inputs.surface === "sand_snow") {
    notes.push("Low pressure maximizes contact patch for sand/snow");
  } else if (inputs.surface === "dirt") {
    notes.push("Reduced pressure improves traction on loose surfaces");
  }

  // Trike mode
  if (inputs.trikeMode) {
    notes.push("Rear PSI calculated per wheel (trike mode)");
  }

  // Construction notes
  if (inputs.construction === "reinforced") {
    notes.push("Reinforced tires support higher pressure");
  } else if (inputs.construction === "tubeless") {
    notes.push("Tubeless setup allows slightly lower pressure");
  }

  return notes;
}

/**
 * Main calculator engine
 * Pure function: same inputs always produce same outputs
 */
export function calculatePSI(inputs: CalculatorInputs): CalculatorOutput {
  // Calculate load on each axle
  const loads = calculateAxleLoads(inputs);

  // Calculate baseline PSI for each axle based on load
  const frontBasePSI = calculateLoadPSI(loads.front, inputs.bike.stockTire.size);
  const rearBasePSI = calculateLoadPSI(loads.rear, inputs.bike.stockTire.size);

  // Apply surface and construction adjustments
  const frontTargetPSI = applyAdjustments(frontBasePSI, inputs.surface, inputs.construction);
  const rearTargetPSI = applyAdjustments(rearBasePSI, inputs.surface, inputs.construction);

  // Calculate min/target/max ranges
  const front = calculateRange(frontTargetPSI, inputs.bike.stockTire.maxPSI);
  const rear = calculateRange(rearTargetPSI, inputs.bike.stockTire.maxPSI);

  // Detect warnings
  const warnings = detectWarnings(front, rear, inputs);

  // Generate notes
  const notes = generateNotes(inputs, front, rear);

  return {
    front,
    rear,
    warnings,
    notes,
  };
}
