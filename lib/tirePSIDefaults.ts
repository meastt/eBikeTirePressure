/**
 * Default PSI ranges based on tire width
 * Used when manufacturer doesn't specify PSI ratings
 */

/**
 * Parse tire size and extract width in inches
 * Formats: "20x3.0", "26x4.0", "27.5x2.4", "700x35c"
 */
function parseTireWidth(tireSize: string): number {
  const normalized = tireSize.toLowerCase().replace(/\s/g, '');
  
  // Handle 700c format (e.g., "700x35c")
  if (normalized.includes('700')) {
    const match = normalized.match(/(\d+)c?$/);
    if (match) {
      const widthMM = parseInt(match[1]);
      return widthMM / 25.4; // Convert mm to inches
    }
  }
  
  // Handle standard format (e.g., "26x4.0", "27.5x2.4")
  const match = normalized.match(/x([\d.]+)/);
  if (match) {
    return parseFloat(match[1]);
  }
  
  // Default to medium width if can't parse
  return 2.5;
}

/**
 * Get default PSI range based on tire width
 * These are conservative, safe ranges based on industry standards
 */
export function getDefaultPSIRange(tireSize: string): { min: number; max: number } {
  const widthInches = parseTireWidth(tireSize);
  
  // Fat tires (3.0" and wider)
  if (widthInches >= 3.0) {
    if (widthInches >= 4.5) {
      // Super fat (4.5"+): very low pressure capability
      return { min: 8, max: 25 };
    } else if (widthInches >= 4.0) {
      // Fat (4.0-4.5"): low pressure
      return { min: 10, max: 30 };
    } else {
      // Compact fat (3.0-3.9"): moderate pressure
      return { min: 15, max: 35 };
    }
  }
  
  // Plus-size tires (2.5-2.9")
  if (widthInches >= 2.5) {
    return { min: 25, max: 45 };
  }
  
  // Standard mountain/hybrid (2.0-2.4")
  if (widthInches >= 2.0) {
    return { min: 30, max: 50 };
  }
  
  // Narrow/road (1.5-1.9")
  if (widthInches >= 1.5) {
    return { min: 50, max: 65 };
  }
  
  // Very narrow road (<1.5")
  return { min: 60, max: 80 };
}

/**
 * Get effective PSI values, using defaults if not specified
 */
export function getEffectivePSI(
  tireSize: string,
  specifiedMin?: number,
  specifiedMax?: number
): { min: number; max: number; isDefault: boolean } {
  if (specifiedMin !== undefined && specifiedMax !== undefined) {
    return { 
      min: specifiedMin, 
      max: specifiedMax, 
      isDefault: false 
    };
  }
  
  const defaults = getDefaultPSIRange(tireSize);
  return {
    min: specifiedMin ?? defaults.min,
    max: specifiedMax ?? defaults.max,
    isDefault: true
  };
}

