// Site navigation and link helpers

export const links = {
  home: "/",
  calculate: "/calculate",
  hub: "/ebike-tire-pressure",
  model: (slug: string) => `/models/${slug}`,
} as const;

export const navigation = [
  { name: "Calculate", href: links.calculate, primary: true },
  { name: "Models", href: links.hub, primary: false },
] as const;

// Helper to generate calculator deep link with pre-filled model
export function getCalculatorLink(modelSlug?: string, params?: Record<string, string | number>) {
  const url = new URL(links.calculate, "http://localhost");

  if (modelSlug) {
    url.searchParams.set("model", modelSlug);
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  return `${url.pathname}${url.search}`;
}
