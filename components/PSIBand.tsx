"use client";

import type { AxleResult } from "@/lib/types";

interface PSIBandProps {
  result: AxleResult;
  sidewallMin: number;  // Tire minimum PSI (from manufacturer or defaults)
  sidewallMax: number;  // Tire maximum PSI (from manufacturer or defaults)
  label: string;
}

export default function PSIBand({ result, sidewallMin, sidewallMax, label }: PSIBandProps) {
  const { min: recommendedMin, target, max: recommendedMax } = result;

  // Use the full sidewall range as the scale base
  // This ensures the bar always fills 100% with proper danger zones
  const totalRange = sidewallMax - sidewallMin;

  // Helper to convert PSI to percentage position on the bar
  const psiToPercent = (psi: number): number => {
    return ((psi - sidewallMin) / totalRange) * 100;
  };

  // Calculate segment widths based on sidewall range
  // Left caution zone: from sidewallMin to recommendedMin
  const leftCautionPct = Math.max(0, Math.min(100, ((recommendedMin - sidewallMin) / totalRange) * 100));

  // Safe zone: the recommended range (green)
  const safePct = Math.max(0, Math.min(100 - leftCautionPct, ((recommendedMax - recommendedMin) / totalRange) * 100));

  // Right caution zone: from recommendedMax to sidewallMax
  const rightCautionPct = Math.max(0, 100 - leftCautionPct - safePct);

  // Calculate marker positions (clamp to 0-100%)
  const recommendedMinPercent = Math.max(0, Math.min(100, psiToPercent(recommendedMin)));
  const targetPercent = Math.max(0, Math.min(100, psiToPercent(target)));
  const recommendedMaxPercent = Math.max(0, Math.min(100, psiToPercent(recommendedMax)));

  // Badge positioning logic - flip if near edges
  const shouldFlipMin = recommendedMinPercent > 82;
  const shouldFlipTarget = targetPercent > 82;
  const shouldFlipMax = recommendedMaxPercent > 82;

  return (
    <div className="space-y-6 mt-4 mb-8">
      {/* Header with label and prominent target PSI */}
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-text">{label}</span>
        <div className="text-right">
          <div className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent animate-smooth">
            {target}
          </div>
          <div className="text-sm font-semibold text-brand-600 mt-0.5">PSI</div>
          <div className="text-xs text-muted mt-1 font-medium">
            Range: {recommendedMin}–{recommendedMax}
          </div>
        </div>
      </div>

      {/* Explanatory text */}
      <div className="text-xs text-muted leading-relaxed">
        <strong className="text-text">Recommended PSI for your setup.</strong> The green band shows the safe range for your weight, tire size, and terrain.
      </div>

      {/* PSI Band with recommended range focus */}
      <div
        className="relative h-12 md:h-14 bg-gradient-to-b from-slate-50 to-white rounded-xl border-2 border-slate-200/60 overflow-visible shadow-inner flex mt-20"
        tabIndex={0}
        aria-label={`${label.toLowerCase()} tire band: recommended range ${recommendedMin} to ${recommendedMax} PSI, target ${target} PSI`}
        role="img"
      >
        {/* LEFT CAUTION ZONE: Below recommended minimum but within tire limits */}
        {leftCautionPct > 0 && (
          <div
            className="relative h-full bg-slate-200 opacity-40"
            style={{
              width: `${leftCautionPct}%`,
            }}
          />
        )}

        {/* SAFE RANGE: Recommended range (green) */}
        <div
          className="relative h-full bg-ok opacity-30 transition-all duration-300"
          style={{
            width: `${safePct}%`,
          }}
        />

        {/* RIGHT CAUTION ZONE: Above recommended maximum but within tire limits */}
        {rightCautionPct > 0 && (
          <div
            className="relative h-full bg-slate-200 opacity-40"
            style={{
              width: `${rightCautionPct}%`,
            }}
          />
        )}

        {/* Tire minimum marker (on left edge) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 opacity-60"
          style={{ left: '0%' }}
        >
          <div className="absolute -top-6 -left-8 px-2 py-0.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 text-xs font-medium rounded shadow-sm whitespace-nowrap">
            {sidewallMin} min
          </div>
        </div>

        {/* Recommended Min marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-ok"
          style={{ left: `${recommendedMinPercent}%` }}
        >
          <div className={`absolute ${shouldFlipMin ? 'top-6 -right-7' : 'top-6 -left-7'}`}>
            <div className="px-2 py-0.5 bg-ok-light border border-ok text-ok text-xs font-bold rounded shadow-sm whitespace-nowrap">
              {recommendedMin}
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-ok" />
        </div>

        {/* Target marker (prominent) */}
        <div
          className="absolute top-0 bottom-0 w-1.5 bg-gradient-brand shadow-md transition-all duration-300"
          style={{ left: `${targetPercent}%` }}
        >
          <div className={`absolute ${shouldFlipTarget ? '-top-20 -right-9' : '-top-20 -left-9'}`}>
            <div className="px-3 py-2 bg-white border-2 border-brand text-brand text-lg font-bold rounded-xl shadow-lg whitespace-nowrap tracking-tight">
              {target}
              <div className="text-xs text-brand-600 mt-0.5 font-medium">PSI</div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand rounded-full" />
        </div>

        {/* Recommended Max marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-ok"
          style={{ left: `${recommendedMaxPercent}%` }}
        >
          <div className={`absolute ${shouldFlipMax ? 'top-6 -right-7' : 'top-6 -left-7'}`}>
            <div className="px-2 py-0.5 bg-ok-light border border-ok text-ok text-xs font-bold rounded shadow-sm whitespace-nowrap">
              {recommendedMax}
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-ok" />
        </div>

        {/* Tire maximum marker (on right edge) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 opacity-60"
          style={{ left: '100%' }}
        >
          <div className="absolute bottom-1.5 -right-10 px-2 py-0.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 text-xs font-medium rounded shadow-sm whitespace-nowrap">
            {sidewallMax} max
          </div>
        </div>
      </div>

      {/* Tire range reference (below bar) */}
      <div className="text-xs text-slate-500 text-center">
        Tire sidewall range: {sidewallMin}–{sidewallMax} PSI
      </div>
    </div>
  );
}
