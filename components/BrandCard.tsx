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
    <div className="card overflow-hidden">
      {/* Brand header - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-surface-light transition-colors duration-150 text-left"
        aria-expanded={isExpanded}
        aria-controls={`brand-${brand.slug}-models`}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Brand avatar */}
          <div className="w-11 h-11 flex items-center justify-center bg-brand-100 text-brand rounded-lg font-heading font-bold text-lg">
            {brand.initial}
          </div>

          {/* Brand info */}
          <div className="flex-1">
            <h3 className="text-base font-heading font-semibold text-text">
              {brand.name}
            </h3>
            <p className="text-sm text-muted">
              {brand.modelCount} {brand.modelCount === 1 ? "model" : "models"}
            </p>
          </div>
        </div>

        {/* Expand icon */}
        <div className={`text-muted transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5 L10 12.5 L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Models list - accordion content */}
      {isExpanded && (
        <div
          id={`brand-${brand.slug}-models`}
          className="border-t border-slate-200 bg-surface-light/50 p-4"
        >
          <div className="space-y-2">
            {brand.models.map((model) => (
              <ModelListItem key={model.slug} model={model} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

