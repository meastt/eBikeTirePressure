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
import { getEffectivePSI } from "@/lib/tirePSIDefaults";

/**
 * Surface adjustment factors (as percentages)
 * Softer surfaces need lower pressure for traction and comfort
 */
const SURFACE_FACTORS: Record<Surface, number> = {
  pavement: 1.0, // baseline (0%)
  mixed: 0.90, // -10% for mixed surfaces
  dirt: 0.88, // -12% for dirt trails
  sand_snow: 0.75, // -25% for sand/snow (need max contact patch)
};

/**
 * Construction adjustment (in PSI, not percentage)
 */
const CONSTRUCTION_ADJUSTMENTS: Record<Construction, number> = {
  tubed: 0, // baseline
  tubeless: -1, // -1 PSI (runs slightly lower)
  reinforced: 2, // +2 PSI (stronger casing)
};

/**
 * Calculate total weight on each axle
 * Accounts for bike weight, rider, passenger, cargo, and trike configuration
 */
function calculateAxleLoads(inputs: CalculatorInputs): { front: number; rear: number } {
  const { bike, riderLbs, passengerLbs = 0, cargoFrontLbs = 0, cargoRearLbs = 0 } = inputs;

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

  // Trike: rear load splits between two wheels
  if (bike.isTrike) {
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

  // Apply surface factor (percentage)
  adjusted *= SURFACE_FACTORS[surface];

  // Apply construction adjustment (fixed PSI)
  adjusted += CONSTRUCTION_ADJUSTMENTS[construction];

  return adjusted;
}

/**
 * Calculate min/target/max range for a given target PSI
 * ALWAYS clamps to sidewall limits for safety (never recommends outside manufacturer specs)
 * Min: 85% of target (pinch-flat risk below this)
 * Max: 115% of target (harsh ride above this)
 * Safety buffer: stays 2 PSI away from sidewall limits
 */
function calculateRange(
  targetPSI: number,
  sidewallMin: number,
  sidewallMax: number
): { result: AxleResult; wasClamped: 'low' | 'high' | null } {
  // Define safe operating range (with 2 PSI safety buffer)
  const safeMin = sidewallMin + 2;
  const safeMax = sidewallMax - 2;

  // Clamp target to safe range FIRST (never exceed sidewall limits)
  const clampedTarget = Math.max(safeMin, Math.min(targetPSI, safeMax));

  // Track if we had to clamp
  let wasClamped: 'low' | 'high' | null = null;
  if (targetPSI < safeMin) {
    wasClamped = 'low';
  } else if (targetPSI > safeMax) {
    wasClamped = 'high';
  }

  // Calculate range around the CLAMPED target (±15%)
  let min = clampedTarget * 0.85;
  let max = clampedTarget * 1.15;

  // Ensure range stays within safe limits
  min = Math.max(min, safeMin);
  max = Math.min(max, safeMax);

  // Round values
  const roundedMin = Math.round(min);
  const roundedTarget = Math.round(clampedTarget);
  const roundedMax = Math.round(max);

  // Ensure target isn't exactly on the edge (creates visual clutter)
  // Always give at least 1 PSI separation between target and range edge
  let finalMin = roundedMin;
  let finalMax = roundedMax;

  // If target is at the minimum edge, expand max to create separation
  if (roundedTarget === roundedMin && roundedMax < safeMax) {
    finalMax = Math.min(roundedMax + 2, safeMax); // Add 2 PSI for better visual separation
  }
  // If target is at the maximum edge, expand min to create separation
  else if (roundedTarget === roundedMax && roundedMin > safeMin) {
    finalMin = Math.max(roundedMin - 2, safeMin); // Subtract 2 PSI for better visual separation
  }

  return {
    result: {
      min: finalMin,
      target: roundedTarget,
      max: finalMax
    },
    wasClamped
  };
}

/**
 * Detect warnings based on calculated PSI and tire limits
 * NOTE: Since we now clamp to sidewall limits, we won't trigger sidewall warnings
 * But we still check for edge cases like very low pressure on soft surfaces
 */
function detectWarnings(
  front: AxleResult,
  rear: AxleResult,
  inputs: CalculatorInputs,
  psiLimits: { min: number; max: number; isDefault: boolean }
): CalculatorWarnings {
  const warnings: CalculatorWarnings = {};

  // Squirm risk: very low pressure on soft surfaces (even if within sidewall limits)
  // This can happen on fat tires with low sidewall minimums
  if (inputs.surface === "sand_snow" && (front.target < 10 || rear.target < 10)) {
    warnings.squirmRisk = true;
  }

  // Note: We no longer check for pinch-flat or exceeds-sidewall warnings
  // because clamping ensures we stay within safe limits

  return warnings;
}

/**
 * Generate helpful notes about the calculation
 */
function generateNotes(
  inputs: CalculatorInputs,
  front: AxleResult,
  rear: AxleResult,
  frontClamped: 'low' | 'high' | null,
  rearClamped: 'low' | 'high' | null,
  psiLimits: { min: number; max: number }
): string[] {
  const notes: string[] = [];

  // PRIORITY: Clamping notes (show first for visibility)
  if (frontClamped === 'low' || rearClamped === 'low') {
    const totalWeight = inputs.riderLbs + (inputs.passengerLbs || 0) +
                       (inputs.cargoFrontLbs || 0) + (inputs.cargoRearLbs || 0);
    notes.push(
      `⚠️ Adjusted to tire's safe minimum (${psiLimits.min + 2} PSI) for your ${totalWeight} lb total weight and ${inputs.surface.replace('_', '/')} terrain. ` +
      `Consider wider tires (3.0"+) for softer surfaces.`
    );
  }

  if (frontClamped === 'high' || rearClamped === 'high') {
    const totalWeight = inputs.riderLbs + (inputs.passengerLbs || 0) +
                       (inputs.cargoFrontLbs || 0) + (inputs.cargoRearLbs || 0);
    notes.push(
      `⚠️ Adjusted to tire's safe maximum (${psiLimits.max - 2} PSI). Your load (${totalWeight} lbs) approaches tire capacity. ` +
      `Consider reinforced tires or reducing cargo.`
    );
  }

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

  // Trike configuration
  if (inputs.bike.isTrike) {
    notes.push("Rear PSI calculated per wheel (trike configuration)");
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
  // Get effective PSI limits (use defaults if manufacturer didn't specify)
  const psiLimits = getEffectivePSI(
    inputs.bike.stockTire.size,
    inputs.bike.stockTire.minPSI,
    inputs.bike.stockTire.maxPSI
  );

  // Calculate load on each axle
  const loads = calculateAxleLoads(inputs);

  // Calculate baseline PSI for each axle based on load
  const frontBasePSI = calculateLoadPSI(loads.front, inputs.bike.stockTire.size);
  const rearBasePSI = calculateLoadPSI(loads.rear, inputs.bike.stockTire.size);

  // Apply surface and construction adjustments
  const frontTargetPSI = applyAdjustments(frontBasePSI, inputs.surface, inputs.construction);
  const rearTargetPSI = applyAdjustments(rearBasePSI, inputs.surface, inputs.construction);

  // Calculate min/target/max ranges using effective PSI limits
  // This will clamp to safe limits and track if clamping occurred
  const frontCalc = calculateRange(
    frontTargetPSI,
    psiLimits.min,
    psiLimits.max
  );
  const rearCalc = calculateRange(
    rearTargetPSI,
    psiLimits.min,
    psiLimits.max
  );

  // Extract results
  const front = frontCalc.result;
  const rear = rearCalc.result;

  // Detect warnings (use effective PSI limits)
  const warnings = detectWarnings(front, rear, inputs, psiLimits);

  // Generate notes with clamping information
  const notes = generateNotes(
    inputs,
    front,
    rear,
    frontCalc.wasClamped,
    rearCalc.wasClamped,
    psiLimits
  );

  // Add note if using default PSI values
  if (psiLimits.isDefault) {
    notes.unshift("Using standard PSI range (manufacturer specs not available)");
  }

  return {
    front,
    rear,
    warnings,
    notes,
  };
}
