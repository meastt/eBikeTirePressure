"use client";

import { useState } from "react";
import type { BrandInfo } from "@/lib/brands";
import ModelListItem from "./ModelListItem";

interface BrandCardProps {
  brand: BrandInfo;
  defaultExpanded?: boolean;
}

export default function BrandCard({ brand, defaultExpanded = false }: BrandCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Brand header - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-surface-light transition-colors duration-150 text-left"
        aria-expanded={isExpanded}
        aria-controls={`brand-${brand.slug}-models`}
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Brand avatar */}
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-brand to-brand-600 text-white rounded-lg font-heading font-bold text-base shadow-sm">
            {brand.initial}
          </div>

          {/* Brand info */}
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-text leading-tight">
              {brand.name}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {brand.modelCount} {brand.modelCount === 1 ? "model" : "models"}
            </p>
          </div>
        </div>

        {/* Chevron icon */}
        <div className="text-brand ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Models list - accordion content */}
      {isExpanded && (
        <div
          id={`brand-${brand.slug}-models`}
          className="border-t border-slate-200 bg-surface-light/50 p-3"
        >
          <div className="space-y-1.5">
            {brand.models.map((model) => (
              <ModelListItem key={model.slug} model={model} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

