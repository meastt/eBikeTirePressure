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

  // New scale logic: Center around recommended range
  // The recommended range should occupy 60-70% of the visual bar
  // Show extensions to tire limits as context

  const recommendedRange = recommendedMax - recommendedMin;
  const desiredRangePercentage = 0.65; // Recommended range should be ~65% of bar width

  // Calculate scale range to make recommended range visually prominent
  const calculatedScaleRange = recommendedRange / desiredRangePercentage;

  // Determine scale bounds
  // Start slightly below recommendedMin, end slightly above recommendedMax
  const scaleStart = Math.max(
    0,
    recommendedMin - (calculatedScaleRange * 0.175) // ~17.5% to the left
  );
  const scaleEnd = Math.min(
    sidewallMax + 2, // Allow showing slightly beyond sidewall max for context
    recommendedMax + (calculatedScaleRange * 0.175) // ~17.5% to the right
  );

  const scaleRange = scaleEnd - scaleStart;

  // Helper to convert PSI to percentage position on the bar
  const psiToPercent = (psi: number): number => {
    return ((psi - scaleStart) / scaleRange) * 100;
  };

  // Calculate positions
  const recommendedMinPercent = psiToPercent(recommendedMin);
  const targetPercent = psiToPercent(target);
  const recommendedMaxPercent = psiToPercent(recommendedMax);
  const sidewallMinPercent = psiToPercent(sidewallMin);
  const sidewallMaxPercent = psiToPercent(sidewallMax);

  // Badge positioning logic - flip if near edges
  const shouldFlipMin = recommendedMinPercent > 82;
  const shouldFlipTarget = targetPercent > 82;
  const shouldFlipMax = recommendedMaxPercent > 82;

  // Determine if we should show danger zones
  const showLeftDanger = scaleStart < sidewallMin;
  const showRightDanger = scaleEnd > sidewallMax;

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
        className="relative h-12 md:h-14 bg-gradient-to-b from-slate-50 to-white rounded-xl border-2 border-slate-200/60 overflow-visible shadow-inner px-4 mt-20"
        tabIndex={0}
        aria-label={`${label.toLowerCase()} tire band: recommended range ${recommendedMin} to ${recommendedMax} PSI, target ${target} PSI`}
        role="img"
      >
        {/* LEFT DANGER ZONE: Below tire minimum (if visible in scale) */}
        {showLeftDanger && (
          <div
            className="absolute top-0 bottom-0 bg-danger opacity-20"
            style={{
              left: 0,
              width: `${Math.max(0, sidewallMinPercent)}%`,
            }}
          />
        )}

        {/* LEFT CAUTION ZONE: Between tire min and recommended min (neutral/gray) */}
        {sidewallMin < recommendedMin && (
          <div
            className="absolute top-0 bottom-0 bg-slate-200 opacity-30"
            style={{
              left: `${Math.max(0, sidewallMinPercent)}%`,
              width: `${Math.max(0, recommendedMinPercent - Math.max(0, sidewallMinPercent))}%`,
            }}
          />
        )}

        {/* RECOMMENDED RANGE: The main green safe zone */}
        <div
          className="absolute top-0 bottom-0 bg-ok opacity-30 transition-all duration-300"
          style={{
            left: `${recommendedMinPercent}%`,
            width: `${recommendedMaxPercent - recommendedMinPercent}%`,
          }}
        />

        {/* RIGHT CAUTION ZONE: Between recommended max and tire max (neutral/gray) */}
        {recommendedMax < sidewallMax && (
          <div
            className="absolute top-0 bottom-0 bg-slate-200 opacity-30"
            style={{
              left: `${recommendedMaxPercent}%`,
              width: `${Math.min(100, sidewallMaxPercent) - recommendedMaxPercent}%`,
            }}
          />
        )}

        {/* RIGHT DANGER ZONE: Above tire maximum (if visible in scale) */}
        {showRightDanger && (
          <div
            className="absolute top-0 bottom-0 bg-danger opacity-20"
            style={{
              left: `${Math.min(100, sidewallMaxPercent)}%`,
              width: `${100 - Math.min(100, sidewallMaxPercent)}%`,
            }}
          />
        )}

        {/* Tire minimum marker (subtle, reference only) */}
        {sidewallMinPercent >= 0 && sidewallMinPercent <= 100 && sidewallMin !== recommendedMin && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-300 opacity-60"
            style={{ left: `${sidewallMinPercent}%` }}
          >
            <div className="absolute -top-6 -left-8 px-2 py-0.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 text-xs font-medium rounded shadow-sm whitespace-nowrap">
              {sidewallMin} min
            </div>
          </div>
        )}

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

        {/* Sidewall max marker (subtle, reference only) */}
        {sidewallMaxPercent >= 0 && sidewallMaxPercent <= 100 && sidewallMax !== recommendedMax && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-300 opacity-60 border-l-2 border-dashed border-slate-400/40"
            style={{ left: `${sidewallMaxPercent}%` }}
          >
            <div className="absolute bottom-1.5 -right-10 px-2 py-0.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 text-xs font-medium rounded shadow-sm whitespace-nowrap">
              {sidewallMax} max
            </div>
          </div>
        )}
      </div>

      {/* Tire range reference (below bar) */}
      <div className="text-xs text-slate-500 text-center">
        Tire sidewall range: {sidewallMin}–{sidewallMax} PSI
      </div>
    </div>
  );
}
