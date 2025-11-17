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

  // Generate tick marks - create ticks at nice intervals
  const generateTicks = () => {
    const ticks = [];
    const tickInterval = totalRange > 30 ? 5 : totalRange > 15 ? 2 : 1;

    for (let psi = Math.ceil(scaleMin / tickInterval) * tickInterval; psi <= scaleMax; psi += tickInterval) {
      ticks.push({
        psi,
        percent: psiToPercent(psi)
      });
    }
    return ticks;
  };

  const ticks = generateTicks();

  return (
    <div className="mt-4 mb-8">
      {/* Header with label */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-brand">{label}</h3>
          <button
            className="inline-flex items-center justify-center text-brand-600 hover:text-brand-700 transition-colors group relative"
            aria-label="PSI chart information"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M12 16v-4m0-4h.01" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-64 text-left leading-relaxed">
              <strong>Recommended PSI for your setup.</strong> The vibrant zone shows your optimal range. Lighter areas show acceptable tire limits.
            </span>
          </button>
        </div>
        <div className="text-sm text-brand-600 font-semibold">
          Range: {recommendedMin}–{recommendedMax} PSI
        </div>
      </div>

      {/* PSI Band with full sidewall context */}
      <div
        className="relative h-16 md:h-20 rounded-xl overflow-visible mb-12"
        tabIndex={0}
        aria-label={`${label.toLowerCase()} tire band: recommended range ${recommendedMin} to ${recommendedMax} PSI, target ${target} PSI`}
        role="img"
      >
        {/* Background: Cool to hot gradient (cyan -> indigo -> pink) across sidewall range */}
        <div className="absolute inset-0 rounded-xl border-2 border-line shadow-inner overflow-hidden bg-surface-dark">
          {/* Base gradient background across full sidewall range - subtle cool to warm */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: `${sidewallMinPercent}%`,
              width: `${sidewallRangePct}%`,
              background: 'linear-gradient(to right, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)',
            }}
          />
        </div>

        {/* Danger zones (if recommendations exceed sidewall) - hot pink gradient */}
        {scaleMin < sidewallMin && (
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent-500/40 to-accent-400/20 border-r-2 border-accent-400/60 rounded-l-xl"
            style={{ width: `${sidewallMinPercent}%` }}
          />
        )}
        {scaleMax > sidewallMax && (
          <div
            className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-accent-500/40 to-accent-400/20 border-l-2 border-accent-400/60 rounded-r-xl"
            style={{ width: `${100 - sidewallMaxPercent}%` }}
          />
        )}

        {/* Recommended safe zone (vibrant indigo gradient overlay with soft edges) */}
        <div
          className="absolute top-0 bottom-0 transition-all duration-300 flex items-center justify-center"
          style={{
            left: `${recommendedMinPercent}%`,
            width: `${recommendedMaxPercent - recommendedMinPercent}%`,
            background: 'linear-gradient(to right, rgba(99, 102, 241, 0) 0%, rgba(99, 102, 241, 0.85) 20%, rgba(99, 102, 241, 0.85) 80%, rgba(99, 102, 241, 0) 100%)',
          }}
        >
          {/* Target PSI badge centered in the zone */}
          <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white font-bold rounded-lg shadow-lg border-2 border-white/40 text-lg">
            {target} <span className="text-xs font-semibold opacity-90">PSI</span>
          </div>
        </div>

        {/* Tick marks along the bottom */}
        {ticks.map((tick, index) => {
          const isMinOrMax = tick.psi === scaleMin || tick.psi === scaleMax;
          return (
            <div
              key={tick.psi}
              className="absolute flex flex-col items-center"
              style={{ left: `${tick.percent}%`, top: '100%', transform: 'translateX(-50%)' }}
            >
              {/* Tick mark line */}
              <div className={`w-px ${isMinOrMax ? 'h-3 bg-brand' : 'h-2 bg-text-subtle'}`}></div>
              {/* Tick label */}
              <span className={`mt-0.5 ${isMinOrMax ? 'text-sm font-bold text-brand' : 'text-xs font-medium text-text-light'}`}>
                {tick.psi}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scale reference and legend (below bar) */}
      <div className="mt-6 space-y-2">
        <div className="text-xs text-text-light text-center font-medium">
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 bg-brand-500/40 border border-brand-500/50 rounded inline-block" />
            Recommended: {recommendedMin}–{recommendedMax} PSI
          </span>
          <span className="mx-3 text-text-subtle">|</span>
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 bg-surface-darker border border-line rounded inline-block" />
            Tire limits: {sidewallMin}–{sidewallMax} PSI
          </span>
        </div>
        {(scaleMin < sidewallMin || scaleMax > sidewallMax) && (
          <div className="text-xs text-warn-600 text-center font-medium">
            ⚠️ Scale expanded to show full context
          </div>
        )}
      </div>
    </div>
  );
}
