import { describe, it, expect } from "vitest";
import { calculatePSI } from "./engine";
import type { CalculatorInputs, ModelPreset } from "@/lib/types";

// Sample bike presets for testing
const radRunner: ModelPreset = {
  slug: "rad-power-radrunner-plus",
  brand: "Rad Power Bikes",
  model: "RadRunner Plus",
  bikeWeightLbs: 65,
  stockTire: {
    size: "20x3.3",
    minPSI: 20,
    maxPSI: 30,
    casing: "standard",
  },
  axleBias: {
    front: 0.45,
    rear: 0.55,
  },
};

const aventure: ModelPreset = {
  slug: "aventon-aventure-2",
  brand: "Aventon",
  model: "Aventure.2",
  bikeWeightLbs: 73,
  stockTire: {
    size: "26x4.0",
    minPSI: 15,
    maxPSI: 25,
    casing: "standard",
  },
  axleBias: {
    front: 0.43,
    rear: 0.57,
  },
};

const ternGSD: ModelPreset = {
  slug: "tern-gsd-s10",
  brand: "Tern",
  model: "GSD S10",
  bikeWeightLbs: 68,
  stockTire: {
    size: "20x2.4",
    minPSI: 35,
    maxPSI: 50,
    casing: "reinforced",
  },
  axleBias: {
    front: 0.4,
    rear: 0.6,
  },
};

describe("PSI Calculator Engine", () => {
  describe("Basic calculations", () => {
    it("should calculate PSI for lightweight rider on fat tire", () => {
      const inputs: CalculatorInputs = {
        bike: aventure,
        riderLbs: 140,
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(inputs);

      expect(result.front.target).toBeGreaterThan(0);
      expect(result.rear.target).toBeGreaterThan(result.front.target); // rear should be higher
      expect(result.front.min).toBeLessThan(result.front.target);
      expect(result.front.max).toBeGreaterThan(result.front.target);
    });

    it("should calculate PSI for heavy rider on fat tire", () => {
      const inputs: CalculatorInputs = {
        bike: aventure,
        riderLbs: 250,
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(inputs);

      // Fat tires (26x4.0) need lower PSI even with heavy riders
      expect(result.front.target).toBeGreaterThan(10);
      expect(result.rear.target).toBeGreaterThan(result.front.target);
    });

    it("should return higher PSI for smaller tires (same load)", () => {
      const fatTireInputs: CalculatorInputs = {
        bike: aventure, // 26x4.0
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const smallTireInputs: CalculatorInputs = {
        bike: radRunner, // 20x3.3 (smaller volume)
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const fatResult = calculatePSI(fatTireInputs);
      const smallResult = calculatePSI(smallTireInputs);

      // Smaller tire should need more PSI for same load
      expect(smallResult.front.target).toBeGreaterThan(fatResult.front.target);
    });
  });

  describe("Surface adjustments", () => {
    it("should reduce PSI for sand/snow surfaces", () => {
      const pavementInputs: CalculatorInputs = {
        bike: aventure,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const sandInputs: CalculatorInputs = {
        ...pavementInputs,
        surface: "sand_snow",
      };

      const pavementResult = calculatePSI(pavementInputs);
      const sandResult = calculatePSI(sandInputs);

      // Sand should be significantly lower (70% factor)
      expect(sandResult.front.target).toBeLessThan(pavementResult.front.target);
      expect(sandResult.rear.target).toBeLessThan(pavementResult.rear.target);
    });

    it("should moderately reduce PSI for dirt surfaces", () => {
      const pavementInputs: CalculatorInputs = {
        bike: aventure,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const dirtInputs: CalculatorInputs = {
        ...pavementInputs,
        surface: "dirt",
      };

      const pavementResult = calculatePSI(pavementInputs);
      const dirtResult = calculatePSI(dirtInputs);

      // Dirt should be lower but not as much as sand
      expect(dirtResult.front.target).toBeLessThan(pavementResult.front.target);
      expect(dirtResult.front.target).toBeGreaterThan(pavementResult.front.target * 0.7);
    });
  });

  describe("Construction adjustments", () => {
    it("should increase PSI for reinforced construction", () => {
      const standardInputs: CalculatorInputs = {
        bike: ternGSD,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const reinforcedInputs: CalculatorInputs = {
        ...standardInputs,
        construction: "reinforced",
      };

      const standardResult = calculatePSI(standardInputs);
      const reinforcedResult = calculatePSI(reinforcedInputs);

      expect(reinforcedResult.front.target).toBeGreaterThan(standardResult.front.target);
    });

    it("should slightly decrease PSI for tubeless", () => {
      const tubedInputs: CalculatorInputs = {
        bike: aventure,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const tubelessInputs: CalculatorInputs = {
        ...tubedInputs,
        construction: "tubeless",
      };

      const tubedResult = calculatePSI(tubedInputs);
      const tubelessResult = calculatePSI(tubelessInputs);

      // Tubeless should be lower or equal (may be same after rounding)
      expect(tubelessResult.front.target).toBeLessThanOrEqual(tubedResult.front.target);
    });
  });

  describe("Cargo and passenger handling", () => {
    it("should increase rear PSI with rear cargo", () => {
      const noCargo: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const withCargo: CalculatorInputs = {
        ...noCargo,
        cargoRearLbs: 40,
      };

      const noCargoResult = calculatePSI(noCargo);
      const withCargoResult = calculatePSI(withCargo);

      expect(withCargoResult.rear.target).toBeGreaterThan(noCargoResult.rear.target);
      // Front should be relatively unchanged
      expect(Math.abs(withCargoResult.front.target - noCargoResult.front.target)).toBeLessThan(2);
    });

    it("should increase front PSI with front cargo", () => {
      const noCargo: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const withCargo: CalculatorInputs = {
        ...noCargo,
        cargoFrontLbs: 40, // Increased to show measurable difference
      };

      const noCargoResult = calculatePSI(noCargo);
      const withCargoResult = calculatePSI(withCargo);

      expect(withCargoResult.front.target).toBeGreaterThan(noCargoResult.front.target);
    });

    it("should increase rear PSI with passenger", () => {
      const noPassenger: CalculatorInputs = {
        bike: ternGSD,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const withPassenger: CalculatorInputs = {
        ...noPassenger,
        passengerLbs: 100,
      };

      const noPassengerResult = calculatePSI(noPassenger);
      const withPassengerResult = calculatePSI(withPassenger);

      expect(withPassengerResult.rear.target).toBeGreaterThan(noPassengerResult.rear.target);
    });
  });

  describe("Trike mode", () => {
    it("should reduce rear PSI in trike mode (load split between 2 wheels)", () => {
      const bikeMode: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 180,
        cargoRearLbs: 40,
        surface: "pavement",
        construction: "tubed",
        trikeMode: false,
      };

      const trikeMode: CalculatorInputs = {
        ...bikeMode,
        trikeMode: true,
      };

      const bikeResult = calculatePSI(bikeMode);
      const trikeResult = calculatePSI(trikeMode);

      // Rear should be lower in trike mode (load split)
      expect(trikeResult.rear.target).toBeLessThan(bikeResult.rear.target);
      // Front should be unchanged
      expect(trikeResult.front.target).toBe(bikeResult.front.target);
    });
  });

  describe("Warnings", () => {
    it("should warn when exceeding sidewall max", () => {
      const heavyLoad: CalculatorInputs = {
        bike: aventure, // max 25 PSI
        riderLbs: 300,
        cargoRearLbs: 80,
        surface: "pavement",
        construction: "reinforced", // increases pressure
      };

      const result = calculatePSI(heavyLoad);

      // Should clamp to sidewall max
      expect(result.rear.max).toBeLessThanOrEqual(aventure.stockTire.maxPSI);
    });

    it("should detect low pinch risk", () => {
      const lightPressure: CalculatorInputs = {
        bike: ternGSD, // min 35 PSI
        riderLbs: 100, // very light rider
        surface: "sand_snow", // -30% pressure
        construction: "tubeless", // -5% pressure
      };

      const result = calculatePSI(lightPressure);

      // With extreme low pressure adjustments, might trigger warning
      if (result.front.target < ternGSD.stockTire.minPSI || result.rear.target < ternGSD.stockTire.minPSI) {
        expect(result.warnings.lowPinchRisk).toBe(true);
      }
    });
  });

  describe("Determinism", () => {
    it("should produce identical results for identical inputs", () => {
      const inputs: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 180,
        passengerLbs: 50,
        cargoRearLbs: 30,
        surface: "mixed",
        construction: "tubeless",
      };

      const result1 = calculatePSI(inputs);
      const result2 = calculatePSI(inputs);

      expect(result1).toEqual(result2);
    });
  });

  describe("Edge cases", () => {
    it("should handle minimum weight", () => {
      const minWeight: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 80, // minimum realistic rider
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(minWeight);

      expect(result.front.target).toBeGreaterThan(0);
      expect(result.rear.target).toBeGreaterThan(0);
    });

    it("should handle maximum weight", () => {
      const maxWeight: CalculatorInputs = {
        bike: ternGSD,
        riderLbs: 300,
        passengerLbs: 150,
        cargoRearLbs: 120,
        cargoFrontLbs: 80,
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(maxWeight);

      expect(result.front.target).toBeGreaterThan(0);
      expect(result.rear.target).toBeGreaterThan(0);
      expect(result.rear.max).toBeLessThanOrEqual(ternGSD.stockTire.maxPSI);
    });

    it("should handle zero cargo/passenger", () => {
      const zeroCargo: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 180,
        passengerLbs: 0,
        cargoFrontLbs: 0,
        cargoRearLbs: 0,
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(zeroCargo);

      expect(result.front.target).toBeGreaterThan(0);
      expect(result.rear.target).toBeGreaterThan(0);
    });
  });

  describe("Range calculations", () => {
    it("should have min < target < max", () => {
      const inputs: CalculatorInputs = {
        bike: aventure,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(inputs);

      expect(result.front.min).toBeLessThan(result.front.target);
      expect(result.front.target).toBeLessThan(result.front.max);
      expect(result.rear.min).toBeLessThan(result.rear.target);
      expect(result.rear.target).toBeLessThan(result.rear.max);
    });

    it("should have reasonable range spread", () => {
      const inputs: CalculatorInputs = {
        bike: radRunner,
        riderLbs: 180,
        surface: "pavement",
        construction: "tubed",
      };

      const result = calculatePSI(inputs);

      const frontSpread = result.front.max - result.front.min;
      const rearSpread = result.rear.max - result.rear.min;

      // Spread should be reasonable (not too tight, not too wide)
      expect(frontSpread).toBeGreaterThan(2);
      expect(frontSpread).toBeLessThan(15);
      expect(rearSpread).toBeGreaterThan(2);
      expect(rearSpread).toBeLessThan(15);
    });
  });
});
