"use client";

import type { AxleResult } from "@/lib/types";

interface SafetyBandProps {
  result: AxleResult;
  sidewallMax: number;
  label: string;
}

export default function SafetyBand({ result, sidewallMax, label }: SafetyBandProps) {
  const { min, target, max } = result;

  // Calculate positions as percentages of the sidewall max
  const minPercent = (min / sidewallMax) * 100;
  const targetPercent = (target / sidewallMax) * 100;
  const maxPercent = (max / sidewallMax) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-text">{label}</span>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand">{target} PSI</div>
          <div className="text-xs text-muted">
            Range: {min}–{max} PSI
          </div>
        </div>
      </div>

      {/* Visual safety band */}
      <div className="relative h-12 bg-surface rounded-lg overflow-hidden">
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
          className="absolute top-0 bottom-0 bg-success opacity-30"
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

        {/* Min marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-success"
          style={{ left: `${minPercent}%` }}
        >
          <div className="absolute -top-1 -left-2 text-xs font-medium text-success">{min}</div>
        </div>

        {/* Target marker (prominent) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brand shadow-sm"
          style={{ left: `${targetPercent}%` }}
        >
          <div className="absolute -bottom-5 -left-3 text-xs font-bold text-brand whitespace-nowrap">
            ▲ {target}
          </div>
        </div>

        {/* Max marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-success"
          style={{ left: `${maxPercent}%` }}
        >
          <div className="absolute -top-1 -right-2 text-xs font-medium text-success">{max}</div>
        </div>

        {/* Sidewall max marker */}
        <div className="absolute -top-1 right-0 text-xs font-medium text-muted">
          {sidewallMax} max
        </div>
      </div>
    </div>
  );
}
