"use client";

import type { AxleResult } from "@/lib/types";

interface PSIBandProps {
  result: AxleResult;
  sidewallMax: number;
  label: string;
}

export default function PSIBand({ result, sidewallMax, label }: PSIBandProps) {
  const { min, target, max } = result;

  // Calculate positions as percentages of the sidewall max
  const minPercent = (min / sidewallMax) * 100;
  const targetPercent = (target / sidewallMax) * 100;
  const maxPercent = (max / sidewallMax) * 100;

  // Determine if badges should flip to inside when near right edge
  const shouldFlipMin = minPercent > 82; // Within 18% of right edge
  const shouldFlipTarget = targetPercent > 82;
  const shouldFlipMax = maxPercent > 82;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-text">{label}</span>
        <div className="text-right">
          <div className="text-3xl md:text-3xl text-2xl font-heading font-bold text-brand animate-smooth">
            {target} PSI
          </div>
          <div className="text-xs text-muted">
            {min}–{max} PSI
          </div>
        </div>
      </div>

      {/* PSI Band with improved height and padding */}
      <div
        className="relative h-9 md:h-10 bg-gradient-to-b from-surface-light to-white rounded-lg border border-slate-200 overflow-hidden shadow-inner px-3"
        tabIndex={0}
        aria-label={`${label.toLowerCase()} tire band: min ${min} PSI, target ${target} PSI, max ${max} PSI`}
        role="img"
      >
        {/* Low zone (below min) - Danger */}
        <div
          className="absolute top-0 bottom-0 bg-danger opacity-20"
          style={{
            left: 0,
            width: `${minPercent}%`,
          }}
        />

        {/* Safe zone (min to max) - Success */}
        <div
          className="absolute top-0 bottom-0 bg-ok opacity-30 transition-all duration-150"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* High zone (above max to sidewall) - Warning */}
        <div
          className="absolute top-0 bottom-0 bg-warn opacity-20"
          style={{
            left: `${maxPercent}%`,
            right: 0,
          }}
        />

        {/* Min marker with 4px tick and 14px badge */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-slate-400"
          style={{ left: `${minPercent}%` }}
        >
          <div className={`absolute ${shouldFlipMin ? 'top-1 -right-7' : 'top-1 -left-7'}`}>
            <div className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium rounded shadow-sm whitespace-nowrap">
              {min}
            </div>
          </div>
          {/* 4px tall tick mark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400" />
        </div>

        {/* Target marker (4px thick, blue brand) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brand shadow-sm transition-all duration-150"
          style={{ left: `${targetPercent}%` }}
        >
          <div className={`absolute ${shouldFlipTarget ? '-top-8 -right-9' : '-top-8 -left-9'}`}>
            <div className="px-2.5 py-1.5 bg-white border border-slate-200 text-brand text-lg font-semibold rounded shadow-sm whitespace-nowrap tracking-tight">
              {target}
              <div className="text-xs text-slate-500 mt-0.5">PSI</div>
            </div>
          </div>
          {/* 4px tall tick mark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand" />
        </div>

        {/* Max marker with 4px tick and 14px badge */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-slate-400"
          style={{ left: `${maxPercent}%` }}
        >
          <div className={`absolute ${shouldFlipMax ? 'top-1 -right-7' : 'top-1 -left-7'}`}>
            <div className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium rounded shadow-sm whitespace-nowrap">
              {max}
            </div>
          </div>
          {/* 4px tall tick mark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400" />
        </div>

        {/* Sidewall max label - right-aligned soft badge */}
        <div className="absolute bottom-1 right-3 px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 text-xs font-medium rounded shadow-sm">
          {sidewallMax} max
        </div>
      </div>
    </div>
  );
}
