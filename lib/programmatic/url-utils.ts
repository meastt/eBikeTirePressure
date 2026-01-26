/**
 * URL Normalization and Generation Utilities
 */

/**
 * Normalize any string for URL usage
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Normalize tire size for URL usage
 * "20x3.0" → "20x3-0"
 * "27.5x2.2" → "27-5x2-2"
 */
export function normalizeTireSizeForUrl(size: string): string {
  return size
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-x]/g, '')
    .replace(/-+/g, '-');
}

/**
 * Denormalize URL tire size back to display format
 * "20x3-0" → "20x3.0"
 * "27-5x2-2" → "27.5x2.2"
 */
export function denormalizeTireSize(urlSize: string): string {
  // Handle cases like "27-5x2-2" → "27.5x2.2"
  // Split by 'x' to handle each part separately
  const parts = urlSize.split('x');
  if (parts.length !== 2) return urlSize;

  const convertPart = (part: string): string => {
    // Replace hyphens with dots for numeric parts
    // "27-5" → "27.5", "2-2" → "2.2"
    return part.replace(/-(\d)/g, '.$1');
  };

  return `${convertPart(parts[0])}x${convertPart(parts[1])}`;
}

/**
 * Generate comparison URL from two model slugs
 */
export function generateComparisonUrl(modelASlug: string, modelBSlug: string): string {
  // Always alphabetize to create canonical URL
  const [first, second] = [modelASlug, modelBSlug].sort();
  return `/compare/${first}-vs-${second}`;
}

/**
 * Parse comparison URL to get model slugs
 */
export function parseComparisonUrl(slug: string): { modelA: string; modelB: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { modelA: match[1], modelB: match[2] };
}

/**
 * Generate tire size URL
 */
export function tireSizeToUrl(size: string): string {
  return `/tire-size/${normalizeTireSizeForUrl(size)}`;
}

/**
 * Generate absolute URL
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ebikepsi.com';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http') && !url.includes('ebikepsi.com');
}

/**
 * Get base URL for the site
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://ebikepsi.com';
}
