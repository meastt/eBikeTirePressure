// SEO utilities and metadata helpers

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  };
}

export function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  return "http://localhost:3000";
}

export function generateMetadata(config: SEOConfig) {
  const baseUrl = getBaseUrl();
  const canonical = config.canonical ? `${baseUrl}${config.canonical}` : undefined;

  return {
    title: config.title,
    description: config.description,
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: canonical,
      siteName: "E-Bike PSI",
      type: "website",
      ...(config.openGraph?.images && { images: config.openGraph.images }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      ...(config.openGraph?.images && { images: config.openGraph.images }),
    },
  };
}
