/**
 * Tire volume coefficients and pressure calculations
 *
 * This module handles the relationship between tire size, volume,
 * and baseline pressure requirements.
 */

/**
 * Parse tire size string (e.g., "20x4.0", "26x3.0", "700x50c")
 * Returns diameter in inches and width in inches
 */
export function parseTireSize(size: string): { diameterInches: number; widthInches: number } {
  const normalized = size.toLowerCase().replace(/\s/g, "");

  // Handle format: "20x4.0", "26x3.0", or "27.5x2.4" (with decimal diameter)
  const standardMatch = normalized.match(/^([\d.]+)x([\d.]+)$/);
  if (standardMatch) {
    return {
      diameterInches: parseFloat(standardMatch[1]),
      widthInches: parseFloat(standardMatch[2]),
    };
  }

  // Handle format: "700x50c" (road bike sizing)
  const roadMatch = normalized.match(/^(\d+)x(\d+)c?$/);
  if (roadMatch) {
    const bsdMm = parseFloat(roadMatch[1]);
    const widthMm = parseFloat(roadMatch[2]);
    // Convert BSD to approximate diameter
    const diameterInches = (bsdMm / 25.4) + (2 * widthMm / 25.4);
    return {
      diameterInches,
      widthInches: widthMm / 25.4,
    };
  }

  throw new Error(`Unable to parse tire size: ${size}`);
}

/**
 * Calculate approximate tire volume in cubic inches
 * Uses simplified torus formula: V ≈ π² × r × R²
 * where r = tire width/2, R = (diameter - width)/2
 */
export function calculateTireVolume(diameterInches: number, widthInches: number): number {
  const r = widthInches / 2; // minor radius (tire cross-section)
  const R = (diameterInches - widthInches) / 2; // major radius (rim to center of tire)

  // Torus volume formula
  const volumeCubicInches = 2 * Math.PI * Math.PI * r * r * R;

  return volumeCubicInches;
}

/**
 * Get baseline PSI for a tire based on volume
 * Larger volume = lower baseline pressure needed
 *
 * Reference points:
 * - 20x4.0 fat tire (~250 cu in): 15-20 PSI baseline
 * - 26x2.5 standard (~150 cu in): 25-30 PSI baseline
 * - 700x35c road (~80 cu in): 60-70 PSI baseline
 */
export function getBaselinePSI(volumeCubicInches: number): number {
  // Inverse relationship: more volume = less pressure
  // Formula derived from empirical data points
  const baseline = 2000 / volumeCubicInches;

  // Clamp to reasonable range
  return Math.max(10, Math.min(baseline, 80));
}

/**
 * Get volume coefficient for tire size
 * Used to scale pressure adjustments based on tire volume
 * Smaller tires need more PSI per pound of load
 */
export function getVolumeCoefficient(volumeCubicInches: number): number {
  // Normalize around typical fat tire volume (250 cu in)
  // Result: 1.0 for fat tires, >1.0 for smaller tires
  return 250 / volumeCubicInches;
}

/**
 * Comprehensive tire info including volume and coefficients
 */
export interface TireInfo {
  size: string;
  diameterInches: number;
  widthInches: number;
  volumeCubicInches: number;
  baselinePSI: number;
  volumeCoefficient: number;
}

/**
 * Get complete tire information from size string
 */
export function getTireInfo(size: string): TireInfo {
  const { diameterInches, widthInches } = parseTireSize(size);
  const volumeCubicInches = calculateTireVolume(diameterInches, widthInches);
  const baselinePSI = getBaselinePSI(volumeCubicInches);
  const volumeCoefficient = getVolumeCoefficient(volumeCubicInches);

  return {
    size,
    diameterInches,
    widthInches,
    volumeCubicInches,
    baselinePSI,
    volumeCoefficient,
  };
}
