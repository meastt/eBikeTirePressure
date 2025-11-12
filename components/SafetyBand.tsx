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
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-text">{label}</span>
        <div className="text-right">
          <div className="text-3xl font-heading font-bold text-brand">{target} PSI</div>
          <div className="text-xs text-text-muted">
            Range: {min}–{max} PSI
          </div>
        </div>
      </div>

      {/* Visual safety band with border and depth */}
      <div className="relative h-14 bg-gradient-to-b from-surface-light to-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
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

        {/* Min marker with tick */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-ok"
          style={{ left: `${minPercent}%` }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2">
            <div className="px-2 py-0.5 bg-ok text-white text-xs font-semibold rounded shadow-sm whitespace-nowrap">
              {min}
            </div>
          </div>
          {/* Tick mark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-ok" />
        </div>

        {/* Target marker (prominent with pill) */}
        <div
          className="absolute top-0 bottom-0 w-1.5 bg-brand shadow-md"
          style={{ left: `${targetPercent}%` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="px-3 py-1 bg-brand text-white text-sm font-bold rounded-lg shadow-md whitespace-nowrap">
              ▲ {target}
            </div>
          </div>
          {/* Tick mark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-brand" />
        </div>

        {/* Max marker with tick */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-ok"
          style={{ left: `${maxPercent}%` }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2">
            <div className="px-2 py-0.5 bg-ok text-white text-xs font-semibold rounded shadow-sm whitespace-nowrap">
              {max}
            </div>
          </div>
          {/* Tick mark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-ok" />
        </div>

        {/* Sidewall max label */}
        <div className="absolute bottom-1 right-2 px-2 py-0.5 bg-slate-100 text-text-muted text-xs font-medium rounded shadow-sm">
          {sidewallMax} max
        </div>
      </div>
    </div>
  );
}
