/**
 * JSON-LD Schema Generators for Programmatic Pages
 */

import type { ModelPreset } from '@/lib/types';
import { getBaseUrl } from './url-utils';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Organization',
      name: 'E-Bike PSI',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'E-Bike PSI',
      url: baseUrl,
    },
    datePublished: params.datePublished || '2024-01-01',
    dateModified: params.dateModified || new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url.startsWith('http') ? params.url : `${baseUrl}${params.url}`,
    },
  };
}

/**
 * Generate ItemList schema for model listings
 */
export function generateItemListSchema(params: { name: string; description: string; models: ModelPreset[] }) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    description: params.description,
    numberOfItems: params.models.length,
    itemListElement: params.models.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${model.brand} ${model.model}`,
      url: `${baseUrl}/models/${model.slug}`,
    })),
  };
}

/**
 * Generate WebPage schema for programmatic pages
 */
export function generateWebPageSchema(params: {
  title: string;
  description: string;
  url: string;
}) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.title,
    description: params.description,
    url: params.url.startsWith('http') ? params.url : `${baseUrl}${params.url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'E-Bike PSI',
      url: baseUrl,
    },
  };
}

/**
 * Combine multiple schemas into array for output
 */
export function combineSchemas(...schemas: object[]): string {
  return JSON.stringify(schemas.filter(Boolean));
}
