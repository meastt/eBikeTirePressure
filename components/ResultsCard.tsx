"use client";

import { useState } from "react";
import type { CalculatorOutput } from "@/lib/types";
import { trackShare } from "@/lib/analytics";
import SafetyBand from "./SafetyBand";

interface ResultsCardProps {
  results: CalculatorOutput | null;
  sidewallMax: number;
  modelSlug?: string;
}

export default function ResultsCard({ results, sidewallMax, modelSlug }: ResultsCardProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    if (!modelSlug) return;

    const url = `${window.location.origin}/calculate?model=${modelSlug}`;

    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'E-Bike PSI Calculator',
          text: 'Check out this tire pressure calculator',
          url,
        });
        trackShare('native');
        return;
      } catch {
        // User cancelled or share not available
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      trackShare('copy');
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };
  if (!results) {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl mb-3">🔧</div>
        <p className="text-muted">Select a bike model to calculate PSI</p>
      </div>
    );
  }

  const { front, rear, warnings, notes } = results;
  const hasWarnings = Object.values(warnings).some((w) => w);

  // Calculate distance from sidewall max for warnings
  const rearMaxDistance = sidewallMax - rear.max;
  
  return (
    <div className="space-y-4">
      {/* Results header with gradient */}
      <div className="card p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text">Your PSI</h2>
          {modelSlug && (
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-sm font-medium text-brand hover:text-brand-hover hover:bg-brand-100 rounded-lg transition-all duration-150"
              title="Share calculator settings"
            >
              {copySuccess ? '✓ Copied' : 'Share'}
            </button>
          )}
        </div>

        {/* Front tire */}
        <SafetyBand result={front} sidewallMax={sidewallMax} label="Front" />

        {/* Rear tire */}
        <SafetyBand result={rear} sidewallMax={sidewallMax} label="Rear" />
      </div>

      {/* Warnings - Color chip style */}
      {hasWarnings && (
        <div className="space-y-2">
          {warnings.lowPinchRisk && (
            <div className="flex items-start gap-3 p-3 bg-danger/10 border-l-4 border-danger rounded-lg">
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-danger text-white rounded-full text-sm font-bold">
                !
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-danger">Pinch-flat risk</div>
                <div className="text-xs text-muted mt-0.5">Pressure below tire minimum. Add air to avoid rim damage.</div>
              </div>
            </div>
          )}
          {warnings.squirmRisk && (
            <div className="flex items-start gap-3 p-3 bg-warn/10 border-l-4 border-warn rounded-lg">
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-warn text-white rounded-full text-sm font-bold">
                ⚠
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-warn">Possible squirm on pavement</div>
                <div className="text-xs text-muted mt-0.5">&lt;15 PSI may feel unstable. OK for sand/snow only.</div>
              </div>
            </div>
          )}
          {warnings.exceedsSidewallMax && (
            <div className="flex items-start gap-3 p-3 bg-danger/10 border-l-4 border-danger rounded-lg">
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-danger text-white rounded-full text-sm font-bold">
                ✕
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-danger">
                  {rearMaxDistance <= 2 && rearMaxDistance >= 0
                    ? `Approaching sidewall max (${rearMaxDistance} PSI away)`
                    : 'Exceeds sidewall maximum'}
                </div>
                <div className="text-xs text-muted mt-0.5">Never exceed rating printed on tire sidewall.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="p-3 bg-surface-light rounded-lg border border-slate-200">
          <ul className="text-sm text-muted space-y-1">
            {notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety reminder - Concise */}
      <div className="p-3 bg-brand-100 border border-brand/20 rounded-lg">
        <div className="text-xs text-text leading-relaxed">
          <strong className="text-brand">Check when cold.</strong> Never exceed sidewall max. Adjust ±2 PSI for comfort within safe range.
        </div>
      </div>
    </div>
  );
}
