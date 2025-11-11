// Plausible analytics event tracking utilities

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
        callback?: () => void;
      }
    ) => void;
  }
}

/**
 * Track a custom event with Plausible Analytics
 * @param eventName - Name of the event to track
 * @param props - Optional properties to attach to the event (no PII!)
 */
export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;

  // Only track in production or if explicitly enabled
  const isEnabled =
    process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  if (!isEnabled) {
    console.log(`[Analytics] ${eventName}`, props);
    return;
  }

  if (window.plausible) {
    window.plausible(eventName, props ? { props } : undefined);
  }
}

/**
 * Track a calculator run event
 * No PII - only model slug, surface type, construction, and trike mode
 */
export function trackCalculatorRun(params: {
  model: string;
  surface: string;
  construction: string;
  trike: boolean;
}): void {
  trackEvent("calc_run", {
    model: params.model,
    surface: params.surface,
    construction: params.construction,
    trike: params.trike,
  });
}

/**
 * Track PWA install event
 */
export function trackPWAInstall(): void {
  trackEvent("pwa_install");
}

/**
 * Track PWA install prompt dismissed
 */
export function trackPWAInstallDismissed(): void {
  trackEvent("pwa_install_dismissed");
}

/**
 * Track model page view
 */
export function trackModelView(modelSlug: string): void {
  trackEvent("model_view", { model: modelSlug });
}

/**
 * Track deep link usage (when calculator is opened with pre-filled values)
 */
export function trackDeepLink(source: string): void {
  trackEvent("deep_link", { source });
}

/**
 * Track share button usage
 */
export function trackShare(method: "copy" | "native"): void {
  trackEvent("share", { method });
}
