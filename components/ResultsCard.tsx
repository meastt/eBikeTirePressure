"use client";

import { useState } from "react";
import type { CalculatorOutput, Surface } from "@/lib/types";
import { trackShare } from "@/lib/analytics";
import PSIBand from "./PSIBand";
import Button from "./Button";

interface ResultsCardContext {
  riderLbs: number;
  cargoLbs: number;
  tireSize: string;
  surface: Surface;
}

interface ResultsCardProps {
  results: CalculatorOutput | null;
  sidewallMax: number;
  modelSlug?: string;
  context?: ResultsCardContext;
}

export default function ResultsCard({ results, sidewallMax, modelSlug, context }: ResultsCardProps) {
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
        </div>

        {/* Context line */}
        {context && (
          <div className="text-sm text-muted leading-relaxed pb-2">
            Based on: {context.riderLbs} lb rider • {context.cargoLbs} lb cargo • {context.tireSize} • {context.surface.replace('_', '/')}
          </div>
        )}

        {/* Front tire */}
        <PSIBand result={front} sidewallMax={sidewallMax} label="Front" />

        {/* Rear tire */}
        <PSIBand result={rear} sidewallMax={sidewallMax} label="Rear" />
      </div>

      {/* Sticky Share button - Mobile only */}
      {modelSlug && (
        <div className="lg:hidden sticky bottom-4 mt-4">
          <Button
            onClick={handleShare}
            variant="primary"
            size="md"
            className="w-full shadow-lg"
            title="Share calculator settings"
          >
            {copySuccess ? '✓ Copied' : 'Share Results'}
          </Button>
        </div>
      )}

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
