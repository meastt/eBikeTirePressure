/**
 * Generate pre-calculated PSI tables for common scenarios
 * Used for model pages and quick reference
 */

import type { ModelPreset, Surface, Construction } from "@/lib/types";
import { calculatePSI } from "./engine";

export interface PSITableRow {
  scenario: string;
  riderLbs: number;
  cargoLbs: number;
  surface: Surface;
  construction: Construction;
  frontPSI: number;
  rearPSI: number;
}

/**
 * Generate PSI table for common riding scenarios
 */
export function generatePSITable(model: ModelPreset): PSITableRow[] {
  const scenarios: PSITableRow[] = [];

  // Define common scenarios
  const commonScenarios: Omit<PSITableRow, "frontPSI" | "rearPSI">[] = [
    // Light rider, pavement
    {
      scenario: "Light rider, pavement",
      riderLbs: 140,
      cargoLbs: 0,
      surface: "pavement",
      construction: "tubed",
    },
    // Average rider, pavement
    {
      scenario: "Average rider, pavement",
      riderLbs: 180,
      cargoLbs: 0,
      surface: "pavement",
      construction: "tubed",
    },
    // Heavy rider, pavement
    {
      scenario: "Heavy rider, pavement",
      riderLbs: 250,
      cargoLbs: 0,
      surface: "pavement",
      construction: "tubed",
    },
    // Average rider with cargo
    {
      scenario: "Average rider + 40 lb cargo",
      riderLbs: 180,
      cargoLbs: 40,
      surface: "pavement",
      construction: "tubed",
    },
    // Average rider, mixed terrain
    {
      scenario: "Average rider, mixed terrain",
      riderLbs: 180,
      cargoLbs: 0,
      surface: "mixed",
      construction: "tubed",
    },
    // Average rider, dirt trails
    {
      scenario: "Average rider, dirt trails",
      riderLbs: 180,
      cargoLbs: 0,
      surface: "dirt",
      construction: "tubed",
    },
  ];

  for (const scenario of commonScenarios) {
    const result = calculatePSI({
      bike: model,
      riderLbs: scenario.riderLbs,
      cargoRearLbs: scenario.cargoLbs,
      surface: scenario.surface,
      construction: scenario.construction,
    });

    scenarios.push({
      ...scenario,
      frontPSI: result.front.target,
      rearPSI: result.rear.target,
    });
  }

  return scenarios;
}
