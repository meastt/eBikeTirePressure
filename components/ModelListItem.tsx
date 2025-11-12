"use client";

import Link from "next/link";
import type { ModelPreset } from "@/lib/types";

interface ModelListItemProps {
  model: ModelPreset;
}

export default function ModelListItem({ model }: ModelListItemProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-brand hover:shadow-card transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-text group-hover:text-brand transition-colors mb-1">
            {model.model}
          </h4>
          <div className="flex flex-wrap gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <span className="font-medium">Tire:</span> {model.stockTire.size}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">PSI:</span> {model.stockTire.minPSI}–{model.stockTire.maxPSI}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">Weight:</span> {model.bikeWeightLbs} lbs
            </span>
          </div>
        </div>
        
        <Link
          href={`/calculate?model=${model.slug}`}
          className="flex-shrink-0 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600 hover:shadow-hover transition-all duration-200 whitespace-nowrap"
        >
          Calculate
        </Link>
      </div>
    </div>
  );
}

