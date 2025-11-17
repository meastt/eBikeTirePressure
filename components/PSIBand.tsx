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

  // Calculate the actual display range to accommodate both sidewall limits and recommendations
  // This prevents markers from being slammed against edges when recommendations fall outside sidewall range
  const scaleMin = Math.min(sidewallMin, recommendedMin - 2); // Add 2 PSI buffer below recommendation
  const scaleMax = Math.max(sidewallMax, recommendedMax + 2); // Add 2 PSI buffer above recommendation
  const totalRange = scaleMax - scaleMin;

  // Helper to convert PSI to percentage position on the bar
  const psiToPercent = (psi: number): number => {
    return ((psi - scaleMin) / totalRange) * 100;
  };

  // Calculate positions for visual zones
  // New design: Always show full sidewall range with recommended zone highlighted

  const sidewallMinPercent = psiToPercent(sidewallMin);
  const sidewallMaxPercent = psiToPercent(sidewallMax);
  const sidewallRangePct = sidewallMaxPercent - sidewallMinPercent;

  // Calculate marker positions (clamp to 0-100%)
  const recommendedMinPercent = Math.max(0, Math.min(100, psiToPercent(recommendedMin)));
  const targetPercent = Math.max(0, Math.min(100, psiToPercent(target)));
  const recommendedMaxPercent = Math.max(0, Math.min(100, psiToPercent(recommendedMax)));

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
        <strong className="text-text">Recommended PSI for your setup.</strong> The green zone shows your optimal range. Gray shows acceptable tire limits.
      </div>

      {/* PSI Band with full sidewall context */}
      <div
        className="relative h-16 md:h-20 rounded-xl overflow-visible mt-20"
        tabIndex={0}
        aria-label={`${label.toLowerCase()} tire band: recommended range ${recommendedMin} to ${recommendedMax} PSI, target ${target} PSI`}
        role="img"
      >
        {/* Background: Gradient from red (danger) through yellow/orange to green (safe) across sidewall range */}
        <div className="absolute inset-0 rounded-xl border-2 border-slate-300/60 shadow-inner overflow-hidden">
          {/* Base gradient background across full sidewall range */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-red-400/40 via-yellow-400/40 to-orange-400/40"
            style={{
              left: `${sidewallMinPercent}%`,
              width: `${sidewallRangePct}%`,
            }}
          />
        </div>

        {/* Red danger zones (if recommendations exceed sidewall) */}
        {scaleMin < sidewallMin && (
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-red-500/50 to-red-400/40 border-r-2 border-red-400 rounded-l-xl"
            style={{ width: `${sidewallMinPercent}%` }}
          />
        )}
        {scaleMax > sidewallMax && (
          <div
            className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-red-500/50 to-red-400/40 border-l-2 border-red-400 rounded-r-xl"
            style={{ width: `${100 - sidewallMaxPercent}%` }}
          />
        )}

        {/* Recommended safe zone (vibrant green overlay with soft edges) */}
        <div
          className="absolute top-0 bottom-0 transition-all duration-300"
          style={{
            left: `${recommendedMinPercent}%`,
            width: `${recommendedMaxPercent - recommendedMinPercent}%`,
            background: 'linear-gradient(to right, rgba(74, 222, 128, 0) 0%, rgba(34, 197, 94, 0.7) 15%, rgba(34, 197, 94, 0.8) 50%, rgba(34, 197, 94, 0.7) 85%, rgba(74, 222, 128, 0) 100%)',
          }}
        >
          {/* Bright glow at target position */}
          <div
            className="absolute top-0 bottom-0 w-24 bg-green-400/30 blur-lg"
            style={{
              left: `${((targetPercent - recommendedMinPercent) / (recommendedMaxPercent - recommendedMinPercent)) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>

        {/* Sidewall minimum label (below bar, aligned left) */}
        <div
          className="absolute -bottom-6 text-xs font-semibold text-slate-500"
          style={{ left: 0 }}
        >
          {sidewallMin}
        </div>

        {/* Target marker (prominent badge above bar) */}
        <div
          className="absolute z-30"
          style={{ left: `${targetPercent}%`, transform: 'translateX(-50%)', top: '-90px' }}
        >
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold rounded-xl shadow-xl border-2 border-blue-400">
              {target}
              <div className="text-xs font-medium opacity-90 mt-0.5">PSI</div>
            </div>
            {/* Arrow pointing down to target position */}
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-500 -mt-0.5" />
          </div>
        </div>

        {/* Target position indicator (dot on bar) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg z-30"
          style={{ left: `${targetPercent}%`, transform: 'translate(-50%, -50%)' }}
        />

        {/* Sidewall maximum label (below bar, aligned right) */}
        <div
          className="absolute -bottom-6 text-xs font-semibold text-slate-500"
          style={{ right: 0 }}
        >
          {sidewallMax}
        </div>
      </div>

      {/* Scale reference and legend (below bar) */}
      <div className="mt-8 space-y-2">
        <div className="text-xs text-slate-600 text-center font-medium">
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500/30 border border-green-500/40 rounded inline-block" />
            Recommended: {recommendedMin}–{recommendedMax} PSI
          </span>
          <span className="mx-3 text-slate-400">|</span>
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 bg-slate-200/50 border border-slate-300 rounded inline-block" />
            Tire limits: {sidewallMin}–{sidewallMax} PSI
          </span>
        </div>
        {(scaleMin < sidewallMin || scaleMax > sidewallMax) && (
          <div className="text-xs text-orange-600 text-center font-medium">
            ⚠️ Scale expanded to show full context
          </div>
        )}
      </div>
    </div>
  );
}
